import { FileCode2, BookOpen, Unlock } from 'lucide-react'
import type { Metadata } from 'next'
import { SectionHero } from '@/components/site/SectionHero'
import { SectionCTA } from '@/components/site/SectionCTA'
import { CategoryCard } from '@/components/site/skills/CategoryCard'
import { categories, totalSkills } from '@/config/skills'

export const metadata: Metadata = {
  title: 'Skills Library',
  description:
    'The frameworks Salish Sea Consulting builds on — documented methods with overviews, methodology, use cases, and open SKILL.md specifications. Free to read, fork, and run.',
  alternates: {
    canonical: '/skills/',
  },
}

const whatYouGet = [
  {
    icon: FileCode2,
    title: 'Open SKILL.md specs',
    detail:
      'Every skill ships as a plain, inspectable SKILL.md file on GitHub. Read the full specification, fork it, and run the method yourself.',
  },
  {
    icon: BookOpen,
    title: 'A page per skill',
    detail:
      'Each skill gets its own page here: what it does, when to use it, the methodology step by step, real examples, and the mistakes to avoid.',
  },
  {
    icon: Unlock,
    title: 'Free access',
    detail:
      'No paywall, no gated content. These frameworks are published to be used — the point is that they get out into the world and work.',
  },
]

export default function SkillsPage() {
  return (
    <div>
      {/* Hero */}
      <SectionHero
        eyebrow='Skills Library'
        title='The frameworks I&apos;ve built and tested on my own properties.'
        subtitle='Not tools. Not templates. Frameworks built and validated across 100+ properties — documented, open, and free to use.'
      />

      {/* Intro */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-8 text-2xl font-bold tracking-tight'>What this library is</h2>
          <div className='space-y-6 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <p>
              This is the operating system for how I do my best work — the frameworks I&apos;ve built, broken, rebuilt, and
              validated on my own properties before ever using them with a client. Every framework here has been run for real,
              on real projects, and kept because it earned its place.
            </p>
            <p>
              These are not tools and they are not templates. A template tells you what a document should look like; a framework
              tells you how to think about the problem, what to look for, what to do in what order, and how to know it worked.
              Each skill is published as a <em>SKILL.md</em> — a plain, inspectable specification of the method, so the process
              is as transparent as the results.
            </p>
            <p>
              Browse by domain below. Every category is a collection of skills that share a discipline — grant writing,
              sustainability measurement, AI visibility, operations, content strategy, and the tools that keep it all running.
            </p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* Category cards */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-6xl'>
          <h2 className='font-serif mb-2 text-2xl font-bold tracking-tight'>Browse the library</h2>
          <p className='mb-10' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            {totalSkills} frameworks across six domains.
          </p>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {categories.map(category => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* What you get */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-5xl'>
          <h2 className='font-serif mb-10 text-center text-2xl font-bold tracking-tight'>What you get with every skill</h2>
          <div className='grid gap-6 md:grid-cols-3'>
            {whatYouGet.map(item => (
              <div key={item.title} className='rounded-[var(--ssc-r)] border bg-white p-6 text-center' style={{ borderColor: 'var(--ssc-line-light)' }}>
                <item.icon className='mx-auto mb-4 h-7 w-7' style={{ color: 'var(--ssc-seafoam-deep)' }} />
                <h3 className='font-serif mb-2 font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>{item.title}</h3>
                <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <SectionCTA
        title='Want these frameworks applied to your organization?'
        subtitle='Book a 30-minute call — we can walk through which skills fit your next project.'
        href='https://cal.com/chester-beard/30min'
        label='Book a 30-Minute Call'
        external
      />
    </div>
  )
}
