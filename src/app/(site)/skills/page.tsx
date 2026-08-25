import { ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import { SectionHero } from '@/components/site/SectionHero'
import { SectionCTA } from '@/components/site/SectionCTA'
import { skills } from '@/config/skills'

export const metadata: Metadata = {
  title: 'Skills',
  description:
    'The Salish Sea Consulting skills library — documented, repeatable methods with overviews, methodology, use cases, and the SKILL.md behind each one.',
  alternates: {
    canonical: '/skills/',
  },
}

export default function SkillsPage() {
  return (
    <div>
      {/* Hero */}
      <SectionHero
        eyebrow='Skills'
        title='The methods behind the work, documented.'
        subtitle='A library of repeatable frameworks — each one with an overview, the methodology it formalizes, the use cases it was built for, and the source file behind it.'
      />

      {/* Intro */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-8 text-2xl font-bold tracking-tight'>Why a skills library?</h2>
          <div className='space-y-6 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <p>
              Great sustainability communications don&apos;t come from improvisation — they come from method. Every engagement
              here runs on a documented, repeatable process: the steps, the evidence, and the judgment calls made along the way.
            </p>
            <p>
              This library is the hub for those methods. Each skill is published as a <em>SKILL.md</em> — a plain, inspectable
              file that says exactly how the work is done, so the process is as transparent as the results.
            </p>
            <p>
              Six skills are being staged here. As each one is published, it appears below with its overview, methodology,
              use cases, and a link to the full source file.
            </p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* Skills grid */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-6xl'>
          <h2 className='font-serif mb-2 text-2xl font-bold tracking-tight'>The library</h2>
          <p className='mb-10' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Six skills, one standard: documented, inspectable, repeatable.
          </p>

          <div className='grid gap-6 md:grid-cols-2'>
            {skills.map(skill =>
              skill.status === 'live' ? (
                <article
                  key={skill.id}
                  className='flex flex-col rounded-[var(--ssc-r)] border bg-white p-6'
                  style={{ borderColor: 'var(--ssc-line-light)' }}
                >
                  <div className='mb-4 flex items-baseline justify-between gap-4'>
                    <h3 className='font-serif text-xl font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>
                      {skill.name}
                    </h3>
                    <span className='font-space-mono text-xs' style={{ color: 'var(--ssc-seafoam-deep)' }}>
                      {skill.number}
                    </span>
                  </div>

                  <p className='mb-5 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                    {skill.overview}
                  </p>

                  <div className='mb-5 space-y-4'>
                    <div>
                      <h4 className='mb-2 font-space-mono text-[0.72rem] font-bold uppercase tracking-[0.16em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
                        Methodology
                      </h4>
                      <ol className='list-decimal space-y-1.5 pl-5 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                        {skill.methodology.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h4 className='mb-2 font-space-mono text-[0.72rem] font-bold uppercase tracking-[0.16em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
                        Use cases
                      </h4>
                      <ul className='list-disc space-y-1.5 pl-5 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                        {skill.useCases.map((useCase, i) => (
                          <li key={i}>{useCase}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {skill.skillMdUrl && (
                    <a
                      href={skill.skillMdUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline'
                      style={{ color: 'var(--ssc-seafoam-deep)' }}
                    >
                      View SKILL.md <ExternalLink className='h-3.5 w-3.5' />
                    </a>
                  )}
                </article>
              ) : (
                <article
                  key={skill.id}
                  className='flex min-h-[220px] flex-col items-start justify-center rounded-[var(--ssc-r)] border border-dashed bg-white/60 p-6'
                  style={{ borderColor: 'var(--ssc-line-light)' }}
                >
                  <span className='font-space-mono text-xs' style={{ color: 'var(--ssc-seafoam-deep)' }}>
                    {skill.number}
                  </span>
                  <h3 className='font-serif mt-2 text-xl font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>
                    Coming soon
                  </h3>
                  <p className='mt-2 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                    Overview, methodology, use cases, and the SKILL.md link will appear here once this skill is published.
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <SectionCTA
        title="Want to see these methods applied to your communications?"
        subtitle='Book a 30-minute call — we can walk through which skills fit your next project.'
        href='https://cal.com/chester-beard/30min'
        label='Book a 30-Minute Call'
        external
      />
    </div>
  )
}
