/**
 * Import Ghost blog posts → SonicJS
 *
 * Two modes:
 *
 * A) From Ghost export JSON file (easiest):
 *    GHOST_EXPORT=/path/to/your-ghost-export.json \
 *    node scripts/import-ghost-to-sonicjs.mjs
 *
 * B) From live Ghost Content API:
 *    GHOST_URL=https://your-pikapods-url.pikapods.com \
 *    GHOST_KEY=your_content_api_key \
 *    node scripts/import-ghost-to-sonicjs.mjs
 *
 * Ghost export: Ghost Admin → Settings → Labs → Export your content
 * Ghost API key: Ghost Admin → Settings → Integrations → Custom integration → Content API Key
 *
 * Script is idempotent — skips slugs already in SonicJS.
 */

import { readFileSync } from 'fs'

const GHOST_EXPORT = process.env.GHOST_EXPORT ?? ''
const GHOST_URL    = process.env.GHOST_URL ?? ''
const GHOST_KEY    = process.env.GHOST_KEY ?? ''

const SONICJS_URL    = 'https://sonicjscms.buzzuw2.workers.dev'
const SONICJS_EMAIL  = process.env.SONICJS_EMAIL ?? 'admin@sonicjs.com'
const SONICJS_PASS   = process.env.SONICJS_PASS  ?? 'sonicjs!'
const COLLECTION_ID  = 'col-blog-posts-94b7858e'
const SITE_CATEGORY  = 'salishsea'

// ── 1. Load Ghost posts ───────────────────────────────────────────────────

async function loadFromExportFile(filepath) {
  console.log(`📂  Reading export file: ${filepath}`)
  const raw = readFileSync(filepath, 'utf8')
  const json = JSON.parse(raw)
  // Ghost export format: { db: [{ data: { posts: [...] } }] }
  const posts = json?.db?.[0]?.data?.posts ?? []
  const tags  = json?.db?.[0]?.data?.tags ?? []
  const postsTags = json?.db?.[0]?.data?.posts_tags ?? []

  // Attach tag names to each post
  const tagMap = Object.fromEntries(tags.map(t => [t.id, t.name]))
  const postTagMap = {}
  for (const pt of postsTags) {
    if (!postTagMap[pt.post_id]) postTagMap[pt.post_id] = []
    postTagMap[pt.post_id].push(tagMap[pt.tag_id] ?? '')
  }

  return posts
    .filter(p => p.status === 'published')
    .map(p => ({
      title:         p.title ?? '',
      slug:          p.slug ?? '',
      html:          p.html ?? '',
      excerpt:       p.custom_excerpt ?? p.plaintext?.slice(0, 200) ?? '',
      feature_image: p.feature_image ?? '',
      published_at:  p.published_at ?? p.created_at,
      reading_time:  p.reading_time ?? 5,
      tags:          (postTagMap[p.id] ?? []).filter(Boolean),
    }))
}

async function loadFromGhostApi() {
  if (!GHOST_KEY) throw new Error('GHOST_KEY is required for API mode')
  console.log(`🌐  Fetching from Ghost API: ${GHOST_URL}`)

  let posts = []
  let page = 1

  while (true) {
    const url =
      `${GHOST_URL}/ghost/api/content/posts/` +
      `?key=${GHOST_KEY}` +
      `&limit=50&page=${page}` +
      `&include=tags,authors` +
      `&fields=id,slug,title,excerpt,html,feature_image,published_at,reading_time`

    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Ghost API ${res.status}: ${text.slice(0, 300)}`)
    }

    const json = await res.json()
    const batch = json.posts ?? []
    posts = [...posts, ...batch]
    if (batch.length < 50) break
    page++
  }

  return posts.map(p => ({
    title:         p.title ?? '',
    slug:          p.slug ?? '',
    html:          p.html ?? '',
    excerpt:       p.excerpt ?? '',
    feature_image: p.feature_image ?? '',
    published_at:  p.published_at,
    reading_time:  p.reading_time ?? 5,
    tags:          (p.tags ?? []).map(t => t.name),
  }))
}

// ── 2. Check existing SonicJS slugs ──────────────────────────────────────

async function getExistingSlugs() {
  const res = await fetch(
    `${SONICJS_URL}/api/content?collectionId=${COLLECTION_ID}&category=${SITE_CATEGORY}&limit=500`
  )
  if (!res.ok) return new Set()
  const json = await res.json()
  return new Set((json.data ?? []).map(i => i.slug))
}

// ── 3. Insert a post ──────────────────────────────────────────────────────

async function insertPost(post) {
  const body = {
    collectionId: COLLECTION_ID,
    title:        post.title,
    slug:         post.slug,
    status:       'published',
    data: {
      title:        post.title,
      slug:         post.slug,
      content:      post.html ?? '',
      excerpt:      post.excerpt ?? '',
      featuredImage:post.feature_image ?? '',
      author:       'Salish Sea Consulting',
      category:     SITE_CATEGORY,
      readTime:     post.reading_time ?? 5,
      featured:     false,
      publishedAt:  post.published_at,
      status:       'published',
      tags:         (post.tags ?? []).join(', '),
    },
  }

  const res = await fetch(`${SONICJS_URL}/api/content`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${insertPost._token}` },
    body:    JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`${res.status}: ${text.slice(0, 200)}`)
  }

  return res.json()
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌊  Ghost → SonicJS  |  Salish Sea Consulting')
  console.log(`   SonicJS: ${SONICJS_URL}`)
  console.log(`   Category filter: ${SITE_CATEGORY}\n`)

  // Authenticate with SonicJS
  const loginRes = await fetch(`${SONICJS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: SONICJS_EMAIL, password: SONICJS_PASS })
  })
  if (!loginRes.ok) throw new Error(`SonicJS login failed: ${loginRes.status}`)
  const { token } = await loginRes.json()
  insertPost._token = token
  console.log('🔑  Authenticated to SonicJS\n')

  // Load posts
  let posts
  if (GHOST_EXPORT) {
    posts = await loadFromExportFile(GHOST_EXPORT)
  } else if (GHOST_URL && GHOST_KEY) {
    posts = await loadFromGhostApi()
  } else {
    console.error('❌  Provide either GHOST_EXPORT=/path/to/export.json')
    console.error('   or GHOST_URL=https://... and GHOST_KEY=...')
    process.exit(1)
  }

  console.log(`   Found ${posts.length} published posts in Ghost\n`)

  // Check existing
  console.log('🔍  Checking existing SonicJS content…')
  const existingSlugs = await getExistingSlugs()
  console.log(`   ${existingSlugs.size} SSC posts already in SonicJS\n`)

  const toImport = posts.filter(p => !existingSlugs.has(p.slug))
  if (toImport.length === 0) {
    console.log('✅  All posts already imported. Nothing to do.')
    return
  }
  console.log(`📤  Importing ${toImport.length} posts…\n`)

  let ok = 0, fail = 0
  for (const post of toImport) {
    try {
      await insertPost(post)
      console.log(`   ✅  ${post.title.slice(0, 72)}`)
      ok++
    } catch (e) {
      console.error(`   ❌  ${post.title.slice(0, 50)} — ${e.message}`)
      fail++
    }
    await new Promise(r => setTimeout(r, 150))
  }

  console.log(`\n✨  Done — ${ok} imported, ${fail} failed`)
}

main().catch(e => { console.error('Fatal:', e); process.exit(1) })
