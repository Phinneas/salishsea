/**
 * Set non-shortlisted SSC posts to draft status in SonicJS.
 *
 * Usage:
 *   node scripts/unpublish-removed-posts.mjs
 *
 * Optional env overrides:
 *   SONICJS_EMAIL=admin@sonicjs.com
 *   SONICJS_PASS=sonicjs!
 */

const SONICJS_URL   = 'https://sonicjscms.buzzuw2.workers.dev'
const COLLECTION_ID = 'col-blog-posts-94b7858e'
const SITE_CATEGORY = 'salishsea'
const EMAIL = process.env.SONICJS_EMAIL ?? 'admin@sonicjs.com'
const PASS  = process.env.SONICJS_PASS  ?? 'sonicjs!'

// Approved slugs — keep these published
const ALLOWED_SLUGS = new Set([
  // Grant Writing
  'sample-letter-of-support','grant-writing-vs-proposal-writing','sustainable-grant-proposal',
  'grant-funding-letter-of-inquiry','grants-for-restoring-historic-buildings','how-to-pay-a-grant-writer',
  'theory-of-change-vs-logic-models','grant-funding-logic-models','ai-in-grant-writing',
  'grant-writing-challenges','nsf-sbir-grants','startup-funding-grants','grant-research-tools',
  'common-nonprofit-grants-in-2025',
  // Nonprofit
  'the-collective-impact-model','nonprofit-funding-models','developing-logic-models',
  'starting-an-oregon-nonprofit','nonprofit-registration-guide','nonprofit-copywriter',
  'nonprofit-copywriting','artificial-intelligence-for-nonprofits',
  // Sustainability
  'sustainability-content-writer','10-sustainability-trends-2025','sustainability-certifications',
  '3-pillars-of-sustainability','environmental-consulting','green-living','esg-certification',
  'the-four-pillars-of-sustainability','green-cloud','strategy-pillars',
  // Copywriting
  'opposite-of-evergreen-content','storytelling-copywriter','benefits-vs-features-copywriting',
  'golden-thread-copywriting','conscious-copywriting','sales-funnel-copywriter',
  'storytelling-for-copywriting','author-pr-campaign','copywriter-job-description','business-letter-format',
  // Tech/Tools (Consider — approved)
  'pikapods','jenni-ai-review','firecrawl','carrd-website-builder','walling-app-review',
  'ghost-website','best-ai-note-taking-apps','showit-websites','snovio-email-tracker-review',
  'artificial-narrow-intelligence','folk-crm','attio-crm','seranking-seo-tool',
  'entity-based-semantic-seo-keywords','n8n-alternatives','dubsado-crm-for-creatives',
])

async function main() {
  console.log('\n🌊  SonicJS — unpublish non-shortlisted SSC posts\n')

  // Auth
  const loginRes = await fetch(`${SONICJS_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASS }),
  })
  if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.status}`)
  const { token } = await loginRes.json()
  console.log('🔑  Authenticated\n')

  // Fetch all SSC posts
  const res = await fetch(
    `${SONICJS_URL}/api/content?collectionId=${COLLECTION_ID}&status=published&limit=300`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`)
  const { data } = await res.json()

  const sscPosts = data.filter(i => i.data?.category === SITE_CATEGORY)
  console.log(`   Found ${sscPosts.length} published SSC posts`)

  const toUnpublish = sscPosts.filter(i => !ALLOWED_SLUGS.has(i.slug ?? i.data?.slug))
  const toKeep      = sscPosts.filter(i =>  ALLOWED_SLUGS.has(i.slug ?? i.data?.slug))

  console.log(`   Keeping  : ${toKeep.length} posts`)
  console.log(`   Drafting : ${toUnpublish.length} posts\n`)

  if (toUnpublish.length === 0) {
    console.log('✅  Nothing to unpublish.')
    return
  }

  let ok = 0, fail = 0
  for (const post of toUnpublish) {
    const slug = post.slug ?? post.data?.slug
    try {
      const upd = await fetch(`${SONICJS_URL}/api/content/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...post, status: 'draft' }),
      })
      if (!upd.ok) {
        const txt = await upd.text()
        throw new Error(`${upd.status}: ${txt.slice(0, 120)}`)
      }
      console.log(`   ✅  drafted: ${slug}`)
      ok++
    } catch (e) {
      console.error(`   ❌  failed : ${slug} — ${e.message}`)
      fail++
    }
    await new Promise(r => setTimeout(r, 100))
  }

  console.log(`\n✨  Done — ${ok} drafted, ${fail} failed`)
}

main().catch(e => { console.error('Fatal:', e); process.exit(1) })
