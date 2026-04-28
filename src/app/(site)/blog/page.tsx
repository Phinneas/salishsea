import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getPosts } from '@/lib/sonicjs'
import type { Post } from '@/lib/sonicjs'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on environmental consulting, conservation, and Pacific Northwest ecology.'
}

export default async function BlogPage() {
  let posts: Post[] = []
  let errorOccurred = false

  try {
    posts = await getPosts({ limit: 50 })
  } catch (error) {
    console.error('[BlogPage] Failed to fetch posts:', error)
    errorOccurred = true
  }

  return (
    <div>
      {/* Header */}
      <section className='bg-gradient-to-br from-teal-950 to-slate-900 px-4 py-20 text-white sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>Insights</h1>
          <p className='mt-4 text-lg text-teal-100/80'>
            Perspectives on environmental consulting, ecology, and the Salish Sea.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className='px-4 py-20 sm:px-6'>
        <div className='mx-auto max-w-4xl'>
          {errorOccurred ? (
            <div className='py-20 text-center text-muted-foreground'>
              <p className='text-lg'>Unable to load blog posts.</p>
              <p className='mt-2 text-sm'>We're experiencing technical difficulties. Please try again later.</p>
            </div>
          ) : posts.length === 0 ? (
            <div className='py-20 text-center text-muted-foreground'>
              <p className='text-lg'>No posts yet.</p>
              <p className='mt-2 text-sm'>Check back soon — content is on its way.</p>
            </div>
          ) : (
            <div className='divide-y divide-border'>
              {posts.map(post => (
                <article key={post.id} className='py-8 first:pt-0'>
                  <Link href={`/blog/${post.slug}`} className='group block space-y-3'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <time className='text-xs text-muted-foreground'>
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      {post.tags?.map(tag => (
                        <Badge key={tag} variant='secondary' className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h2 className='text-xl font-semibold tracking-tight group-hover:text-teal-600'>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className='line-clamp-2 text-sm leading-relaxed text-muted-foreground'>{post.excerpt}</p>
                    )}
                    <span className='text-sm font-medium text-teal-600 group-hover:underline'>Read more →</span>
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
