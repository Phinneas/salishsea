import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getPost, getAllPostSlugs } from '@/lib/sonicjs'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(slug => ({ slug }))
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
        {post.html ? (
          <div
            className='prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-teal-600 prose-img:rounded-lg'
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        ) : post.content ? (
          <div className='prose prose-neutral max-w-none dark:prose-invert'>
            {post.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        ) : null}
      </article>
    </div>
  )
}
