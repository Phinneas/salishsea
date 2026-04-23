/**
 * SonicJS CMS client
 * Instance: https://sonicjscms.buzzuw2.workers.dev
 *
 * All SSC posts are tagged with category: "salishsea" to separate them
 * from other projects sharing this SonicJS instance.
 *
 * Set NEXT_PUBLIC_SONICJS_URL in Cloudflare Pages env vars.
 */

const SONICJS_URL =
  process.env.NEXT_PUBLIC_SONICJS_URL ?? 'https://sonicjscms.buzzuw2.workers.dev'

// SonicJS collection ID for blog posts
const BLOG_COLLECTION = 'col-blog-posts-94b7858e'

// Category value used to scope content to this site
const SITE_CATEGORY = 'salishsea'

// ── Migration shortlist ────────────────────────────────────────────────────
// Only these slugs appear on the site. Source: migration_shortlist.xlsx
// ✅ Migrate = confirmed keeps. Add ⚠️ Consider slugs here if approved.
const ALLOWED_SLUGS = new Set([
  // Grant Writing
  'sample-letter-of-support',
  'grant-writing-vs-proposal-writing',
  'sustainable-grant-proposal',
  'grant-funding-letter-of-inquiry',
  'grants-for-restoring-historic-buildings',
  'how-to-pay-a-grant-writer',
  'theory-of-change-vs-logic-models',
  'grant-funding-logic-models',
  'ai-in-grant-writing',
  'grant-writing-challenges',
  'nsf-sbir-grants',
  'startup-funding-grants',
  'grant-research-tools',
  'common-nonprofit-grants-in-2025',
  // Nonprofit
  'the-collective-impact-model',
  'nonprofit-funding-models',
  'developing-logic-models',
  'starting-an-oregon-nonprofit',
  'nonprofit-registration-guide',
  'nonprofit-copywriter',
  'nonprofit-copywriting',
  'artificial-intelligence-for-nonprofits',
  // Sustainability
  'sustainability-content-writer',
  '10-sustainability-trends-2025',
  'sustainability-certifications',
  '3-pillars-of-sustainability',
  'environmental-consulting',
  'green-living',
  'esg-certification',
  'the-four-pillars-of-sustainability',
  'green-cloud',
  'strategy-pillars',
  // Copywriting
  'opposite-of-evergreen-content',
  'storytelling-copywriter',
  'benefits-vs-features-copywriting',
  'golden-thread-copywriting',
  'conscious-copywriting',
  'sales-funnel-copywriter',
  'storytelling-for-copywriting',
  'author-pr-campaign',
  'copywriter-job-description',
  'business-letter-format',
  // Tech/Tools (⚠️ Consider — high traffic, approved)
  'pikapods',
  'jenni-ai-review',
  'firecrawl',
  'carrd-website-builder',
  'walling-app-review',
  'ghost-website',
  'best-ai-note-taking-apps',
  'showit-websites',
  'snovio-email-tracker-review',
  'artificial-narrow-intelligence',
  'folk-crm',
  'attio-crm',
  'seranking-seo-tool',
  'entity-based-semantic-seo-keywords',
  'n8n-alternatives',
  'dubsado-crm-for-creatives',
])

// ── Types ──────────────────────────────────────────────────────────────────

/** Shape of the nested `data` field inside each SonicJS item */
interface SonicPostData {
  title: string
  slug: string
  content?: string
  excerpt?: string
  featuredImage?: string
  author?: string
  category?: string
  readTime?: number
  featured?: boolean
  publishedAt?: string
  status?: string
}

/** Top-level SonicJS item */
interface SonicItem {
  id: string
  title: string
  slug: string
  status: string
  collectionId: string
  created_at: string
  updated_at: string
  data: SonicPostData
}

interface SonicResponse {
  data: SonicItem[]
  meta?: { total?: number; offset?: number; limit?: number }
}

/** Normalised post shape used by the Next.js pages */
export interface Post {
  id: string
  slug: string
  title: string
  excerpt?: string
  /** HTML body from Ghost — rendered via dangerouslySetInnerHTML */
  content?: string
  html?: string
  feature_image?: string
  published_at: string
  updated_at?: string
  author?: string
  reading_time?: number
  featured?: boolean
  tags?: string[]
}

// ── Helpers ────────────────────────────────────────────────────────────────

function normalize(item: SonicItem): Post {
  const d = item.data ?? {}
  return {
    id: item.id,
    slug: item.slug ?? d.slug,
    title: item.title ?? d.title,
    excerpt: d.excerpt ?? undefined,
    content: d.content ?? undefined,
    feature_image: d.featuredImage ?? undefined,
    published_at: d.publishedAt ?? item.created_at,
    updated_at: item.updated_at ?? undefined,
    author: d.author ?? undefined,
    reading_time: d.readTime ?? undefined,
    featured: d.featured ?? false,
    tags: d.tags ? String(d.tags).split(',').map(t => t.trim()).filter(Boolean) : [],
  }
}

async function fetchSonic(params: Record<string, string | number> = {}): Promise<SonicItem[]> {
  const url = new URL(`${SONICJS_URL}/api/content`)

  // NOTE: SonicJS ignores nested data.* filters in query params —
  // we over-fetch and filter client-side by data.category === SITE_CATEGORY
  const defaults: Record<string, string | number> = {
    collectionId: BLOG_COLLECTION,
    status: 'published',
    limit: 300, // fetch all, then filter
    offset: 0,
  }

  Object.entries({ ...defaults, ...params }).forEach(([k, v]) =>
    url.searchParams.set(k, String(v))
  )

  const res = await fetch(url.toString(), { cache: 'force-cache' })

  if (!res.ok) {
    throw new Error(`SonicJS ${res.status} — ${url}`)
  }

  const json: SonicResponse = await res.json()
  return json.data ?? []
}

// ── Public API ─────────────────────────────────────────────────────────────

/** Filter to only approved SSC posts and sort newest first */
function sscOnly(items: SonicItem[]): SonicItem[] {
  return items
    .filter(i => {
      const slug = i.slug ?? i.data?.slug
      return i.data?.category === SITE_CATEGORY && i.status === 'published' && ALLOWED_SLUGS.has(slug)
    })
    .sort((a, b) => {
      const dateA = new Date(a.data?.publishedAt ?? a.created_at ?? 0).getTime()
      const dateB = new Date(b.data?.publishedAt ?? b.created_at ?? 0).getTime()
      return dateB - dateA // newest first
    })
}

/** List published SSC blog posts, newest first */
export async function getPosts(opts: { limit?: number; offset?: number } = {}): Promise<Post[]> {
  try {
    const all = await fetchSonic()
    const filtered = sscOnly(all)
    const { limit = 20, offset = 0 } = opts
    return filtered.slice(offset, offset + limit).map(normalize)
  } catch (e) {
    console.error('[sonicjs] getPosts:', e)
    return []
  }
}

/** Get a single post by slug */
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const all = await fetchSonic()
    const item = sscOnly(all).find(i => (i.slug ?? i.data?.slug) === slug)
    return item ? normalize(item) : null
  } catch (e) {
    console.error('[sonicjs] getPost:', e)
    return null
  }
}

/** Get all published slugs — used by generateStaticParams */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const all = await fetchSonic()
    return sscOnly(all).map(i => i.slug ?? i.data?.slug).filter(Boolean)
  } catch (e) {
    console.error('[sonicjs] getAllPostSlugs:', e)
    return []
  }
}
