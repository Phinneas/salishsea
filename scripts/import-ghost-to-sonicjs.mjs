/**
 * Import Ghost blog posts → SonicJS
 *
 * Usage:
 *   GHOST_URL=https://salishseaconsulting.com \
 *   GHOST_KEY=your_content_api_key \
 *   node scripts/import-ghost-to-sonicjs.mjs
 *
 * Ghost Content API key: Ghost Admin → Integrations → Custom integration → Content API Key
 * The script is idempotent — it checks for duplicate slugs before inserting.
 */

const GHOST_URL = process.env.GHOST_URL ?? 'https://salishseaconsulting.com'
const GHOST_KEY = process.env.GHOST_KEY ?? ''

const SONICJS_URL = 'https://sonicjscms.buzzuw2.workers.dev'
const COLLECTION_ID = 'col-blog-posts-94b7858e'
const SITE_CATEGORY = 'salishsea'

if (!GHOST_KEY) {
  console.error('❌  Set GHOST_KEY env var to your Ghost Content API key')
  process.exit(1)
}

// ── 1. Fetch all Ghost posts ───────────────────────────────────────────────

async function fetchGhostPosts() {
  let posts = []
  let page = 1

  while (true) {
    const url =
      `${GHOST_URL}/ghost/api/content/posts/` +
      `?key=${GHOST_KEY}` +
      `&limit=50&page=${page}` +
      `&fields=id,slug,title,excerpt,html,feature_image,published_at,reading_time,tags,authors` +
      `&include=tags,authors`

    const res = await fetch(url)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Ghost API ${res.status}: ${text.slice(0, 200)}`)
    }

    const json = await res.json()
    const page_posts = json.posts ?? []
    posts = [...posts, ...page_posts]

    if (page_posts.length < 50) break
    page++
  }

  return posts
}

// ── 2. Check existing SonicJS slugs ───────────────────────────────────────

async function getExistingSlugs() {
  const res = await fetch(
    `${SONICJS_URL}/api/content?collectionId=${COLLECTION_ID}&category=${SITE_CATEGORY}&limit=500`
  )
  if (!res.ok) return new Set()
  const json = await res.json()
  return new Set((json.data ?? []).map(i => i.slug))
}

// ── 3. Insert a post into SonicJS ─────────────────────────────────────────

async function insertPost(ghost_post) {
  const body = {
    collectionId: COLLECTION_ID,
    title: ghost_post.title,
    slug: ghost_post.slug,
    status: 'published',
    data: {
      title: ghost_post.title,
      slug: ghost_post.slug,
      content: ghost_post.html ?? '',
      excerpt: ghost_post.excerpt ?? ghost_post.custom_excerpt ?? '',
      featuredImage: ghost_post.feature_image ?? '',
      author: ghost_post.authors?.[0]?.name ?? 'Salish Sea Consulting',
      category: SITE_CATEGORY,
      readTime: ghost_post.reading_time ?? 5,
      featured: false,
      publishedAt: ghost_post.published_at,
      status: 'published',
      tags: (ghost_post.tags ?? []).map(t => t.name).join(', '),
    },
  }

  const res = await fetch(`${SONICJS_URL}/api/content`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Insert failed (${res.status}): ${text.slice(0, 200)}`)
  }

  return res.json()
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🌊  Ghost → SonicJS import for Salish Sea Consulting`)
  console.log(`   Ghost: ${GHOST_URL}`)
  console.log(`   SonicJS: ${SONICJS_URL}\n`)

  console.log('📥  Fetching Ghost posts…')
  const ghostPosts = await fetchGhostPosts()
  console.log(`   Found ${ghostPosts.length} posts in Ghost\n`)

  console.log('🔍  Checking existing SonicJS slugs…')
  const existingSlugs = await getExistingSlugs()
  console.log(`   ${existingSlugs.size} SSC posts already in SonicJS\n`)

  const toImport = ghostPosts.filter(p => !existingSlugs.has(p.slug))
  console.log(`📤  Importing ${toImport.length} new posts…\n`)

  let ok = 0
  let fail = 0

  for (const post of toImport) {
    try {
      await insertPost(post)
      console.log(`   ✅  ${post.title.slice(0, 70)}`)
      ok++
    } catch (e) {
      console.error(`   ❌  ${post.title.slice(0, 50)} — ${e.message}`)
      fail++
    }

    // small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 150))
  }

  console.log(`\n✨  Done — ${ok} imported, ${fail} failed, ${existingSlugs.size} already existed`)
}

main().catch(e => {
  console.error('Fatal:', e)
  process.exit(1)
})
