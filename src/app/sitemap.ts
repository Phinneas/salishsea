import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/sonicjs'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.salishseaconsulting.com'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: 'yearly' },
  ]

  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const slugs = await getAllPostSlugs()
    postRoutes = slugs.map(slug => ({
      url: `${BASE}/blog/${slug}/`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }))
  } catch {
    // SonicJS unavailable at build time — sitemap will lack post URLs
  }

  return [...staticRoutes, ...postRoutes]
}
