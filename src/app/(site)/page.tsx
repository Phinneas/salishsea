import { getAllPosts } from '@/lib/content'
import { HomePageClient } from '@/components/site/home/HomePageClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Salish Sea Consulting | Communications that match your impact',
  description:
    'Brand copywriting and sustainability research reports for sustainability-conscious brands, built to earn trust, drive action, and reflect the depth of your work.',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3).map(({ slug, title, excerpt, published_at, tags }) => ({
    slug,
    title,
    excerpt,
    published_at,
    tags,
  }))
  return <HomePageClient posts={posts} />
}
