import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPost, getAllPostSlugs } from '@/lib/content'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Post not found' }

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: {
      canonical: `/blog/${slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.published_at,
      images: post.feature_image ? [{ url: post.feature_image }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) notFound()

  const baseUrl = 'https://www.salishseaconsulting.com'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author ?? 'Chester Beard',
      ...(post.author_title ? { jobTitle: post.author_title } : {}),
      url: `${baseUrl}/about/`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Salish Sea Consulting',
      url: baseUrl,
    },
    datePublished: post.published_at,
    ...(post.updated_at ? { dateModified: post.updated_at } : {}),
    mainEntityOfPage: `${baseUrl}/blog/${slug}/`,
    ...(post.feature_image ? { image: post.feature_image } : {}),
    keywords: post.tags?.join(', '),
  }

  const faqSchema = post.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      }
    : null

  return (
    <div style={{ color: 'var(--ssc-text-dark)' }}>
      {/* JSON-LD Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {/* Back button */}
      <div className='mx-auto max-w-3xl px-4 pt-8 sm:px-6'>
        <Link
          href='/blog'
          className='inline-flex items-center gap-2 rounded-full px-[1.2em] py-[0.5em] font-space-mono text-[0.82rem] font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-[1px]'
          style={{
            background: 'var(--ssc-fog)',
            color: 'var(--ssc-text-dark-mute)',
          }}
        >
          <ArrowLeft className='h-4 w-4' />
          All posts
        </Link>
      </div>

      {/* Header */}
      <header className='mx-auto max-w-3xl px-4 py-8 sm:px-6'>
        <div className='space-y-4'>
          <div className='flex flex-wrap items-center gap-3 font-space-mono text-sm' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <time>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.updated_at && post.updated_at !== post.published_at && (
              <span>
                · Updated {new Date(post.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
          <h1 className='font-serif text-3xl font-bold tracking-tight sm:text-4xl' style={{ color: 'var(--ssc-text-dark)' }}>{post.title}</h1>
          {post.excerpt && <p className='text-lg leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{post.excerpt}</p>}
          {post.author && (
            <div className='flex items-center gap-2 pt-2'>
              <div className='h-8 w-8 rounded-full' style={{ background: 'linear-gradient(140deg,#0e2b38,#14515e)' }} />
              <div>
                <p className='text-sm font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>{post.author}</p>
                {post.author_title && (
                  <p className='text-xs' style={{ color: 'var(--ssc-text-dark-mute)' }}>{post.author_title}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Feature image */}
      {post.feature_image && (
        <div className='mx-auto mb-8 max-w-4xl overflow-hidden rounded-[var(--ssc-r)] px-4 sm:px-6'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.feature_image}
            alt={post.title}
            className='h-64 w-full rounded-[var(--ssc-r)] object-cover sm:h-96'
          />
        </div>
      )}

      {/* Content */}
      <article className='mx-auto max-w-3xl px-4 pb-20 sm:px-6' style={{ background: 'var(--ssc-paper)' }}>
        <div
          className={[
            'prose prose-neutral max-w-none',
            'dark:prose-invert',
            'prose-headings:font-bold prose-headings:tracking-tight prose-headings:font-serif',
            'prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg',
            'prose-a:no-underline hover:prose-a:underline',
            'prose-img:rounded-lg prose-img:shadow-sm',
            'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none',
            'prose-pre:bg-muted prose-pre:text-foreground prose-pre:rounded-lg',
          ].join(' ')}
          style={{ '--tw-prose-links': 'var(--ssc-seafoam-deep)' } as React.CSSProperties}
        >
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        {/* FAQ Section */}
        {post.faq && post.faq.length > 0 && (
          <div className='mt-12 border-t pt-8' style={{ borderColor: 'var(--ssc-line-light)' }}>
            <h2 className='font-serif text-2xl font-bold tracking-tight' style={{ color: 'var(--ssc-text-dark)' }}>
              Frequently Asked Questions
            </h2>
            <div className='mt-6 space-y-6'>
              {post.faq.map((item, i) => (
                <div key={i}>
                  <h3 className='font-serif text-lg font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>{item.q}</h3>
                  <p className='mt-2 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
