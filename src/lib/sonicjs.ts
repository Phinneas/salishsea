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
  content?: string
  feature_image?: string
  published_at: string
  updated_at?: string
  author?: string
  reading_time?: number
  featured?: boolean
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
  }
}

async function fetchSonic(params: Record<string, string | number> = {}): Promise<SonicItem[]> {
  const url = new URL(`${SONICJS_URL}/api/content`)

  const defaults: Record<string, string | number> = {
    collectionId: BLOG_COLLECTION,
    status: 'published',
    category: SITE_CATEGORY,
    limit: 50,
    offset: 0,
  }

  Object.entries({ ...defaults, ...params }).forEach(([k, v]) =>
    url.searchParams.set(k, String(v))
  )

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`SonicJS ${res.status} — ${url}`)
  }

  const json: SonicResponse = await res.json()
  return json.data ?? []
}

// ── Public API ─────────────────────────────────────────────────────────────

/** List published SSC blog posts, newest first */
export async function getPosts(opts: { limit?: number; offset?: number } = {}): Promise<Post[]> {
  try {
    const items = await fetchSonic({ limit: opts.limit ?? 20, offset: opts.offset ?? 0 })
    return items.map(normalize)
  } catch (e) {
    console.error('[sonicjs] getPosts:', e)
    return []
  }
}

/** Get a single post by slug */
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const items = await fetchSonic({ slug, limit: 1 })
    return items[0] ? normalize(items[0]) : null
  } catch (e) {
    console.error('[sonicjs] getPost:', e)
    return null
  }
}

/** Get all published slugs — used by generateStaticParams */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const items = await fetchSonic({ limit: 500 })
    return items.map(i => i.slug ?? i.data?.slug).filter(Boolean)
  } catch (e) {
    console.error('[sonicjs] getAllPostSlugs:', e)
    return []
  }
}
