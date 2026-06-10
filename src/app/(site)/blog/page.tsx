import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { getAllPosts } from '@/lib/content'
import type { BlogPost } from '@/lib/content'
import { SectionHero } from '@/components/site/SectionHero'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on environmental consulting, conservation, and Pacific Northwest ecology.',
}

export default function BlogPage() {
  const posts: BlogPost[] = getAllPosts()

  return (
    <div>
      {/* Hero */}
      <SectionHero
        eyebrow='Insights'
        title='Perspectives on sustainable business, marketing, and conservation.'
        subtitle='Ideas, research, and frameworks for brands that lead with purpose.'
      />

      {/* Posts */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-4xl'>
          {posts.length === 0 ? (
            <div className='py-20 text-center'>
              <p className='font-space-grotesk text-lg font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>No posts yet.</p>
              <p className='mt-2 text-sm' style={{ color: 'var(--ssc-text-dark-mute)' }}>Check back soon — content is on its way.</p>
            </div>
          ) : (
            <div className='divide-y' style={{ borderColor: 'var(--ssc-line-light)' }}>
              {posts.map(post => (
                <article key={post.slug} className='py-8 first:pt-0'>
                  <Link href={`/blog/${post.slug}`} className='group block space-y-3'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <time className='font-space-mono text-xs' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      {post.tags?.map(tag => (
                        <Badge key={tag} variant='outline' className='font-space-mono text-xs' style={{ borderColor: 'var(--ssc-line-light)', color: 'var(--ssc-seafoam-deep)' }}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className='font-space-grotesk text-xl font-semibold tracking-tight transition-colors group-hover:text-[var(--ssc-seafoam-deep)]'>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className='line-clamp-2 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{post.excerpt}</p>
                    )}
                    <span className='text-sm font-semibold' style={{ color: 'var(--ssc-seafoam-deep)' }}>Read more →</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
