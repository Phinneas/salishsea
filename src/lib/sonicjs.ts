/**
 * SonicJS CMS client
 * SonicJS runs on Cloudflare Workers + D1.
 * Set NEXT_PUBLIC_SONICJS_URL in your environment to your deployed Workers URL.
 * e.g. https://cms.salishseaconsulting.com or https://salishsea-cms.your-account.workers.dev
 */

const SONICJS_URL = process.env.NEXT_PUBLIC_SONICJS_URL ?? ''

export interface Post {
  id: string
  slug: string
  title: string
  excerpt?: string
  content?: string
  html?: string
  feature_image?: string
  published_at: string
  updated_at?: string
  tags?: string[]
  author?: string
  reading_time?: number
}

export interface PostsResponse {
  data: Post[]
  meta?: {
    total: number
    page: number
    per_page: number
  }
}

async function fetchSonic<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  if (!SONICJS_URL) {
    console.warn('[sonicjs] NEXT_PUBLIC_SONICJS_URL is not set — returning empty data')
    return { data: [] } as T
  }

  const url = new URL(`${SONICJS_URL}${path}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)))

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 } // ISR: revalidate every 60s
  })

  if (!res.ok) {
    throw new Error(`SonicJS fetch failed: ${res.status} ${res.statusText} — ${url}`)
  }

  return res.json() as Promise<T>
}

/** Get all published blog posts */
export async function getPosts(opts: { limit?: number; page?: number } = {}): Promise<Post[]> {
  const { limit = 20, page = 1 } = opts
  try {
    const res = await fetchSonic<PostsResponse>('/api/posts', {
      limit,
      page,
      'filters[status]': 'published',
      sort: 'published_at:desc'
    })
    return res.data ?? []
  } catch (e) {
    console.error('[sonicjs] getPosts error:', e)
    return []
  }
}

/** Get a single post by slug */
export async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetchSonic<PostsResponse>('/api/posts', {
      'filters[slug]': slug,
      limit: 1
    })
    return res.data?.[0] ?? null
  } catch (e) {
    console.error('[sonicjs] getPost error:', e)
    return null
  }
}

/** Get all post slugs (for generateStaticParams) */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const res = await fetchSonic<PostsResponse>('/api/posts', {
      limit: 500,
      'fields[posts]': 'slug',
      'filters[status]': 'published'
    })
    return (res.data ?? []).map(p => p.slug).filter(Boolean)
  } catch (e) {
    console.error('[sonicjs] getAllPostSlugs error:', e)
    return []
  }
}
