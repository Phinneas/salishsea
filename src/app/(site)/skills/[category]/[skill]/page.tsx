import { ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/site/skills/Breadcrumb'
import { RelatedSkills } from '@/components/site/skills/RelatedSkills'
import { getSkill, categories } from '@/config/skills'

interface Props {
  params: Promise<{ category: string; skill: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return categories.flatMap(category =>
    category.skills.map(skill => ({ category: category.slug, skill: skill.slug })),
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, skill: skillSlug } = await params
  const found = getSkill(categorySlug, skillSlug)
  if (!found) return { title: 'Skills' }

  return {
    title: `${found.skill.name} — Skills`,
    description: found.skill.tagline,
    alternates: {
      canonical: `/skills/${categorySlug}/${skillSlug}/`,
    },
  }
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className='font-serif mb-4 text-xl font-bold tracking-tight sm:text-2xl' style={{ color: 'var(--ssc-text-dark)' }}>
      {children}
    </h2>
  )
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <section className='rounded-[var(--ssc-r)] border bg-white p-6 sm:p-8' style={{ borderColor: 'var(--ssc-line-light)' }}>
      {children}
    </section>
  )
}

export default async function SkillPage({ params }: Props) {
  const { category: categorySlug, skill: skillSlug } = await params
  const found = getSkill(categorySlug, skillSlug)
  if (!found) notFound()
  const { category, skill } = found

  const published = skill.status === 'published'

  const body = (
    <div className='space-y-6'>
      {/* Section 1 — What it does */}
      {skill.whatItDoes && (
        <SectionCard>
          <SectionHeading>What it does</SectionHeading>
          <div className='space-y-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            {skill.whatItDoes.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Section 2 — When to use it */}
      {skill.useCases && skill.useCases.length > 0 && (
        <SectionCard>
          <SectionHeading>When to use it</SectionHeading>
          <ul className='space-y-3'>
            {skill.useCases.map((useCase, i) => (
              <li key={i} className='flex gap-3 text-sm leading-relaxed sm:text-base' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0' style={{ color: 'var(--ssc-seafoam-deep)' }} />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Section 3 — The methodology */}
      {(skill.methodology || skill.toolsUsed || skill.expectedOutput) && (
        <SectionCard>
          <SectionHeading>The methodology</SectionHeading>
          {skill.methodology && skill.methodology.length > 0 && (
            <ol className='space-y-4'>
              {skill.methodology.map((step, i) => (
                <li key={i} className='flex gap-4'>
                  <span
                    className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-space-mono text-xs font-bold'
                    style={{ background: 'var(--ssc-seafoam)', color: 'var(--ssc-ink)' }}
                  >
                    {i + 1}
                  </span>
                  <p className='text-sm leading-relaxed sm:text-base' style={{ color: 'var(--ssc-text-dark-mute)' }}>{step}</p>
                </li>
              ))}
            </ol>
          )}
          {skill.toolsUsed && skill.toolsUsed.length > 0 && (
            <div className='mt-6'>
              <p className='font-space-mono mb-2 text-[0.7rem] font-bold uppercase tracking-[0.16em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
                Tools used
              </p>
              <div className='flex flex-wrap gap-2'>
                {skill.toolsUsed.map(tool => (
                  <span key={tool} className='rounded-full border px-3 py-1 font-space-mono text-xs' style={{ borderColor: 'var(--ssc-line-light)', color: 'var(--ssc-text-dark-mute)' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
          {skill.expectedOutput && (
            <div className='mt-6 rounded-lg p-4' style={{ background: 'var(--ssc-fog)' }}>
              <p className='font-space-mono mb-1 text-[0.7rem] font-bold uppercase tracking-[0.16em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
                Expected output
              </p>
              <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{skill.expectedOutput}</p>
            </div>
          )}
        </SectionCard>
      )}

      {/* Section 4 — Real example */}
      {skill.realExample && (
        <SectionCard>
          <SectionHeading>Real example</SectionHeading>
          <p className='text-sm leading-relaxed sm:text-base' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            {skill.realExample}
          </p>
        </SectionCard>
      )}

      {/* Section 5 — Common mistakes */}
      {skill.commonMistakes && skill.commonMistakes.length > 0 && (
        <SectionCard>
          <SectionHeading>Common mistakes</SectionHeading>
          <ul className='space-y-3'>
            {skill.commonMistakes.map((mistake, i) => (
              <li key={i} className='flex gap-3 text-sm leading-relaxed sm:text-base' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                <span aria-hidden='true' className='mt-1 h-1.5 w-1.5 shrink-0 rounded-full' style={{ background: 'var(--ssc-seafoam-deep)' }} />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Section 6 — Next steps */}
      {skill.nextSteps && (
        <SectionCard>
          <SectionHeading>Next steps</SectionHeading>
          <p className='text-sm leading-relaxed sm:text-base' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            {skill.nextSteps}
          </p>
        </SectionCard>
      )}

      {/* Section 7 + 8 — GitHub SKILL.md + Use in Claude */}
      {(skill.githubUrl || skill.useInClaude) && (
        <SectionCard>
          <SectionHeading>Take it with you</SectionHeading>
          <div className='flex flex-col gap-4 sm:flex-row'>
            {skill.githubUrl && (
              <a
                href={skill.githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center gap-2 rounded-full px-[1.4em] py-[0.8em] text-sm font-semibold transition-all duration-300 hover:-translate-y-[2px]'
                style={{
                  background: 'var(--ssc-seafoam)',
                  color: 'var(--ssc-ink)',
                  boxShadow: '0 8px 24px -10px rgba(95,227,201,.5)',
                }}
              >
                <Github className='h-4 w-4' />
                View the full SKILL.md specification
                <ExternalLink className='h-3.5 w-3.5' />
              </a>
            )}
            {skill.useInClaude && (
              <div className='flex flex-1 items-center gap-3 rounded-lg p-4' style={{ background: 'var(--ssc-fog)' }}>
                <Sparkles className='h-5 w-5 shrink-0' style={{ color: 'var(--ssc-seafoam-deep)' }} />
                <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                  {skill.useInClaude}
                </p>
              </div>
            )}
          </div>
        </SectionCard>
      )}
    </div>
  )

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Skills', href: '/skills/' },
          { label: category.name, href: `/skills/${category.slug}/` },
          { label: skill.name },
        ]}
      />

      {/* Header */}
      <header className='mx-auto max-w-3xl px-4 pb-10 pt-8 sm:px-6'>
        <p className='font-space-mono text-xs uppercase tracking-[0.16em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
          {category.name}
        </p>
        <h1 className='font-serif mt-2 text-3xl font-bold tracking-tight sm:text-4xl' style={{ color: 'var(--ssc-text-dark)' }}>
          {skill.name}
        </h1>
        <p className='mt-3 text-lg leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
          {skill.tagline}
        </p>
      </header>

      {published ? (
        <div className='mx-auto max-w-6xl px-4 pb-20 sm:px-6'>
          <div className='grid gap-10 lg:grid-cols-[1fr_300px]'>
            <div className='min-w-0'>{body}</div>
            <div className='lg:pt-2'>
              <RelatedSkills skill={skill} />
            </div>
          </div>
        </div>
      ) : (
        <div className='mx-auto max-w-3xl px-4 pb-20 sm:px-6'>
          {/* Coming-soon shell */}
          <div className='rounded-[var(--ssc-r)] border border-dashed p-8 text-center' style={{ borderColor: 'var(--ssc-line-light)' }}>
            <p className='font-serif text-xl font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>
              Full breakdown coming soon
            </p>
            <p className='mx-auto mt-3 max-w-md text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
              The complete methodology, real examples, and common mistakes for this skill are being written. In the meantime,
              explore what it does, when to use it, and the related skills below.
            </p>
            <div className='mt-6 rounded-lg p-4 text-left' style={{ background: 'var(--ssc-fog)' }}>
              <p className='font-space-mono mb-1 text-[0.7rem] font-bold uppercase tracking-[0.16em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
                When to use this
              </p>
              <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{skill.whenToUse}</p>
            </div>
          </div>

          {/* Related skills */}
          <div className='mt-12'>
            <RelatedSkills skill={skill} />
          </div>
        </div>
      )}
    </div>
  )
}
