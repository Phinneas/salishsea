import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPost, getAllPostSlugs } from '@/lib/sonicjs'

// Import SONICJS_URL for validation
const SONICJS_URL = process.env.NEXT_PUBLIC_SONICJS_URL ?? 'https://sonicjscms.buzzuw2.workers.dev'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

// Make generateStaticParams absolutely bulletproof - cannot throw any errors
// Critical for static export: this function must always return an array
export async function generateStaticParams() {
  // Layer 1: Immediate return with empty array if API is unreachable
  // This prevents any async operations that might throw
  if (!SONICJS_URL || SONICJS_URL.includes('YOUR_ACCOUNT')) {
    console.warn('[Blog] SonicJS URL not configured, returning empty static params')
    return []
  }

  try {
    // Layer 2: Wrap the async call in its own try-catch
    const slugs = await getAllPostSlugs()
    
    // Layer 3: Validate result type
    if (!Array.isArray(slugs)) {
      console.error('[Blog] getAllPostSlugs did not return an array:', typeof slugs, slugs)
      return []
    }
    
    // Layer 4: Map and filter safely
    const mapped = slugs
      .map(slug => {
        // Validate each slug
        if (typeof slug === 'string' && slug.trim()) {
          return { slug: slug.trim() }
        }
        console.warn('[Blog] Invalid slug encountered:', slug, 'type:', typeof slug)
        return null
      })
      .filter(Boolean)
    
    console.log(`[Blog] Generated ${mapped.length} static params`)
    return mapped
    
  } catch (error) {
    // Layer 5: Catch absolutely everything
    console.error('[Blog] generateStaticParams error:', error)
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post not found' }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.published_at,
      images: post.feature_image ? [{ url: post.feature_image }] : []
    }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  return (
    <div>
      {/* Back button */}
      <div className='mx-auto max-w-3xl px-4 pt-8 sm:px-6'>
        <Button asChild variant='ghost' size='sm' className='-ml-2'>
          <Link href='/blog'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            All posts
          </Link>
        </Button>
      </div>

      {/* Header */}
      <header className='mx-auto max-w-3xl px-4 py-8 sm:px-6'>
        <div className='space-y-4'>
          <time className='text-sm text-muted-foreground'>
            {new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>{post.title}</h1>
          {post.excerpt && <p className='text-lg text-muted-foreground leading-relaxed'>{post.excerpt}</p>}
        </div>
      </header>

      {/* Feature image */}
      {post.feature_image && (
        <div className='mx-auto mb-8 max-w-4xl overflow-hidden rounded-lg px-4 sm:px-6'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.feature_image}
            alt={post.title}
            className='h-64 w-full rounded-lg object-cover sm:h-96'
          />
        </div>
      )}

      {/* Content */}
      <article className='mx-auto max-w-3xl px-4 pb-20 sm:px-6'>
        <div
          className={[
            'prose prose-neutral max-w-none',
            'dark:prose-invert',
            'prose-headings:font-bold prose-headings:tracking-tight',
            'prose-h2:text-2xl prose-h3:text-xl',
            'prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline',
            'prose-img:rounded-lg prose-img:shadow-sm',
            'prose-blockquote:border-teal-500 prose-blockquote:text-muted-foreground',
            'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none',
            'prose-pre:bg-muted prose-pre:rounded-lg',
          ].join(' ')}
          dangerouslySetInnerHTML={{ __html: post.content ?? post.html ?? '' }}
        />
      </article>
    </div>
  )
}
