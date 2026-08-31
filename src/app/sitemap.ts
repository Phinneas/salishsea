import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/content'
import { categories } from '@/config/skills'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.salishseaconsulting.com'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1.0, changeFrequency: 'monthly' },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE}/work`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/skills`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/templates`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${BASE}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/contact`, priority: 0.7, changeFrequency: 'yearly' },
  ]

  const skillRoutes: MetadataRoute.Sitemap = categories.flatMap(category => [
    {
      url: `${BASE}/skills/${category.slug}/`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    ...category.skills.map(skill => ({
      url: `${BASE}/skills/${category.slug}/${skill.slug}/`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    })),
  ])

  let postRoutes: MetadataRoute.Sitemap = []
  try {
    const slugs = getAllPostSlugs()
    postRoutes = slugs.map(slug => ({
      url: `${BASE}/blog/${slug}/`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    }))
  } catch {
    // Content unavailable at build time — sitemap will lack post URLs
  }

  return [...staticRoutes, ...skillRoutes, ...postRoutes]
}
