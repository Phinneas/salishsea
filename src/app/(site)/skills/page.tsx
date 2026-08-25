import Link from 'next/link'
import { ArrowRight, ArrowDown } from 'lucide-react'
import type { Metadata } from 'next'
import { SectionHero } from '@/components/site/SectionHero'
import { categories, getSkill } from '@/config/skills'

export const metadata: Metadata = {
  title: 'Skills Library',
  description:
    "The frameworks behind Salish Sea Consulting's client work — documented methods with the reasoning that makes them work, free to take and run.",
  alternates: {
    canonical: '/skills/',
  },
}

// The six featured methods (all published from the content-strategy line of work).
// Each links to its full skill page under /skills/content-strategy/<slug>/.
const collection = [
  {
    slug: 'content-plan-reasoning-lift',
    name: 'Content Plan',
    description:
      "Most content plans start with search volume. That's the wrong end of the problem. This one starts with the questions a buyer actually asks across five stages, then checks how AI answers them today and where you're absent.",
  },
  {
    slug: 'design-what-if',
    name: 'Design What-If',
    description:
      'Design feedback usually stalls at taste. Four passes fix that. Hidden Truth, What If, Feel, and Combine. You come out with one idea the project commits to and an emotional target you can test against.',
  },
  {
    slug: 'market-research',
    name: 'Market Research',
    description:
      "Your buyers already wrote your copy. It's sitting in forum threads and review complaints. This pulls their exact language and turns it into a messaging framework instead of a word cloud.",
  },
  {
    slug: 'seranking-dataforseo',
    name: 'SE Ranking + DataForSEO',
    description:
      "An AI visibility audit tells you where you're invisible. A keyword tool tells you what people search. Run separately, they both underperform. Joined, they produce a four-week calendar with a reason behind every slot.",
  },
  {
    slug: 'seo-technical-audit',
    name: 'SEO Technical Audit',
    description:
      'A crawl returns 400 issues. Nine of them move anything. After 100+ audits, this is the pass I use to find which nine and ignore the rest.',
  },
  {
    slug: 'design-brief-enforcer',
    name: 'Design Brief Enforcer',
    description:
      '"Make it modern" produces slop. This forces the opposite. Named aesthetic vocabulary, decomposed references, hard spec values, and a critique pass held separate from the build.',
  },
]

export default function SkillsPage() {
  const methods = collection
    .map(item => ({ item, found: getSkill('content-strategy', item.slug) }))
    .filter((entry): entry is { item: (typeof collection)[number]; found: NonNullable<ReturnType<typeof getSkill>> } => Boolean(entry.found))

  return (
    <div>
      {/* Hero */}
      <SectionHero
        eyebrow='Skills Library'
        title='Every method I use, published in full.'
        subtitle='These are the frameworks behind my client work. Not prompt tricks. Actual staged methods, with the reasoning that makes them work, free to take and run.'
      >
        <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
          <a
            href='#collection'
            className='inline-flex items-center gap-2 rounded-full px-[1.5em] py-[0.85em] text-[0.95rem] font-semibold transition-all duration-300 hover:-translate-y-[2px]'
            style={{
              background: 'var(--ssc-seafoam)',
              color: 'var(--ssc-ink)',
              boxShadow: '0 10px 30px -10px rgba(95,227,201,.6)',
            }}
          >
            Browse the collection <ArrowDown className='h-4 w-4' />
          </a>
          <Link
            href='/work/'
            className='inline-flex items-center gap-2 rounded-full border px-[1.5em] py-[0.85em] text-[0.95rem] font-semibold transition-all duration-300 hover:-translate-y-[2px]'
            style={{ borderColor: 'rgba(255,255,255,.35)', color: 'var(--ssc-text-light)' }}
          >
            How I use these on client work
          </Link>
        </div>
      </SectionHero>

      {/* The Argument */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-8 text-2xl font-bold tracking-tight'>The Argument</h2>
          <div className='space-y-6 text-lg leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <p>
              Anyone can run a tool. The hard part is knowing what to ask it.
            </p>
            <p>
              Most AI resources are a prompt with a personality. They work once. Then the situation shifts and they fall apart,
              because there was never a method underneath.
            </p>
            <p>
              What I publish here is the method. The stages, in order, and why that order. The questions each stage forces you
              to answer. The failure mode each one is designed to catch.
            </p>
            <p className='font-medium' style={{ color: 'var(--ssc-text-dark)' }}>
              The files are real. I run these on paid work. You get the same version I do.
            </p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* The Collection */}
      <section id='collection' className='scroll-mt-20 px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-6xl'>
          <h2 className='font-serif mb-2 text-2xl font-bold tracking-tight'>The Collection</h2>
          <p className='mb-10' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Six methods, documented end to end.
          </p>

          <div className='grid gap-6 md:grid-cols-2'>
            {methods.map(({ item, found }) => (
              <article
                key={item.slug}
                className='flex flex-col rounded-[var(--ssc-r)] border bg-white p-6'
                style={{ borderColor: 'var(--ssc-line-light)' }}
              >
                <h3 className='font-serif text-xl font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>
                  {item.name}
                </h3>
                <p className='mt-3 flex-1 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                  {item.description}
                </p>
                <Link
                  href={`/skills/${found.category.slug}/${found.skill.slug}/`}
                  className='mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold transition-colors hover:underline'
                  style={{ color: 'var(--ssc-seafoam-deep)' }}
                >
                  Learn the methodology <ArrowRight className='h-4 w-4' />
                </Link>
              </article>
            ))}
          </div>

          {/* Full library by category */}
          <div className='mt-14 border-t pt-8' style={{ borderColor: 'var(--ssc-line-light)' }}>
            <p className='font-space-mono mb-4 text-[0.7rem] font-bold uppercase tracking-[0.16em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
              The rest of the library
            </p>
            <div className='flex flex-wrap gap-2'>
              {categories.map(category => (
                <Link
                  key={category.slug}
                  href={`/skills/${category.slug}/`}
                  className='rounded-full border bg-white px-4 py-1.5 font-space-mono text-xs transition-colors hover:border-[var(--ssc-seafoam-deep)]'
                  style={{ borderColor: 'var(--ssc-line-light)', color: 'var(--ssc-text-dark-mute)' }}
                >
                  {category.name} · {category.skills.length}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* Limits */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-2 text-2xl font-bold tracking-tight'>Limits</h2>
          <p className='mb-8 font-serif text-lg font-medium' style={{ color: 'var(--ssc-text-dark)' }}>
            What these are not.
          </p>
          <div className='space-y-6 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <p>
              They&apos;re not turnkey. Each one assumes you can judge the output and push back on it. They&apos;re built for my
              stack and my clients, so some steps will need reshaping for yours.
            </p>
            <p>
              They also won&apos;t tell you what your business should be. That part is still yours.
            </p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* Why Free */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-2 text-2xl font-bold tracking-tight'>Why Free</h2>
          <p className='mb-8 font-serif text-lg font-medium' style={{ color: 'var(--ssc-text-dark)' }}>
            Why I give these away.
          </p>
          <div className='space-y-6 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <p>
              I don&apos;t sell files. I sell judgment applied to a specific situation, which is the part that doesn&apos;t
              travel in a download.
            </p>
            <p>
              Publishing the method is also the fastest way to show you how I think. Read one. If the reasoning holds up, you
              already know what working together looks like.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className='px-4 py-20 text-center sm:px-6'
        style={{
          background: 'radial-gradient(900px 460px at 50% 120%, #1e4633, var(--ssc-ink) 55%, var(--ssc-navy))',
          color: 'var(--ssc-text-light)',
        }}
      >
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-3xl font-bold tracking-tight text-white'>
            Take the method. Or bring me the problem.
          </h2>
          <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
            <a
              href='#collection'
              className='inline-flex items-center gap-2 rounded-full px-[1.6em] py-[0.95em] text-[0.98rem] font-semibold transition-all duration-300 hover:-translate-y-[3px]'
              style={{
                background: 'var(--ssc-seafoam)',
                color: 'var(--ssc-ink)',
                boxShadow: '0 10px 30px -10px rgba(95,227,201,.6)',
              }}
            >
              Download the collection <ArrowDown className='h-4 w-4' />
            </a>
            <a
              href='https://cal.com/chester-beard/30min'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-full border px-[1.6em] py-[0.95em] text-[0.98rem] font-semibold transition-all duration-300 hover:-translate-y-[3px]'
              style={{ borderColor: 'rgba(255,255,255,.35)', color: 'var(--ssc-text-light)' }}
            >
              Book a call
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
