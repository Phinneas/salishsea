import { ExternalLink, Github, Sparkles, CheckCircle2, Clock, Wrench } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/site/skills/Breadcrumb'
import { RelatedSkills } from '@/components/site/skills/RelatedSkills'
import { SkillSpecLink } from '@/components/site/skills/SkillSpecLink'
import { getSkill, categories } from '@/config/skills'
import { skillContent } from '@/config/skill-content'

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
  const content = skillContent[found.skill.slug]

  return {
    title: `${content?.seoHeadline ?? found.skill.name} — Skills`,
    description: content?.whatItDoes?.[0] ?? found.skill.tagline,
    keywords: content?.keywordTargets,
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className='font-space-mono mb-2 text-[0.7rem] font-bold uppercase tracking-[0.16em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
      {children}
    </p>
  )
}

export default async function SkillPage({ params }: Props) {
  const { category: categorySlug, skill: skillSlug } = await params
  const found = getSkill(categorySlug, skillSlug)
  if (!found) notFound()
  const { category, skill } = found
  const content = skillContent[skill.slug]

  /* Resolve next-skill links (from content.nextSkillSlugs) to real pages. */
  const nextSkillLinks = (content?.nextSkillSlugs ?? []).map(slug => {
    for (const c of categories) {
      const s = c.skills.find(x => x.slug === slug)
      if (s) return { href: `/skills/${c.slug}/${s.slug}/`, name: s.name }
    }
    return null
  }).filter((x): x is { href: string; name: string } => Boolean(x))

  const body = content && (
    <div className='space-y-6'>
      {/* Section 1 — What it does */}
      {content.whatItDoes.length > 0 && (
        <SectionCard>
          <SectionHeading>What it does</SectionHeading>
          <div className='space-y-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            {content.whatItDoes.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          {content.coreComponents.length > 0 && (
            <ul className='mt-6 space-y-3'>
              {content.coreComponents.map(component => (
                <li key={component.name} className='flex gap-3 text-sm leading-relaxed sm:text-base'>
                  <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0' style={{ color: 'var(--ssc-seafoam-deep)' }} />
                  <span style={{ color: 'var(--ssc-text-dark-mute)' }}>
                    <strong style={{ color: 'var(--ssc-text-dark)' }}>{component.name}.</strong> {component.why}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      )}

      {/* Section 2 — When to use it */}
      {content.useCases.length > 0 && (
        <SectionCard>
          <SectionHeading>When to use it</SectionHeading>
          <ul className='space-y-4'>
            {content.useCases.map((useCase, i) => (
              <li key={i} className='flex gap-3 text-sm leading-relaxed sm:text-base'>
                <CheckCircle2 className='mt-0.5 h-4 w-4 shrink-0' style={{ color: 'var(--ssc-seafoam-deep)' }} />
                <span style={{ color: 'var(--ssc-text-dark-mute)' }}>
                  <strong style={{ color: 'var(--ssc-text-dark)' }}>{useCase.scenario}:</strong> {useCase.example}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Section 3 — The methodology */}
      {content.methodology.length > 0 && (
        <SectionCard>
          <SectionHeading>The methodology</SectionHeading>
          <ol className='space-y-5'>
            {content.methodology.map((step, i) => (
              <li key={i} className='flex gap-4'>
                <span
                  className='flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-space-mono text-xs font-bold'
                  style={{ background: 'var(--ssc-seafoam)', color: 'var(--ssc-ink)' }}
                >
                  {i + 1}
                </span>
                <div className='min-w-0'>
                  <p className='font-serif font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>{step.title}</p>
                  <p className='mt-1.5 text-sm leading-relaxed sm:text-base' style={{ color: 'var(--ssc-text-dark-mute)' }}>{step.detail}</p>
                  <div className='mt-2 flex flex-wrap items-center gap-2'>
                    <span className='inline-flex items-center gap-1.5 font-space-mono text-xs' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                      <Clock className='h-3.5 w-3.5' style={{ color: 'var(--ssc-seafoam-deep)' }} />
                      {step.time}
                    </span>
                    {step.tools?.map(tool => (
                      <span key={tool} className='rounded-full border px-2.5 py-0.5 font-space-mono text-xs' style={{ borderColor: 'var(--ssc-line-light)', color: 'var(--ssc-text-dark-mute)' }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </SectionCard>
      )}

      {/* Section 4 — Real example */}
      {content.realExample && (
        <SectionCard>
          <SectionHeading>Real example</SectionHeading>
          <div className='rounded-lg p-5' style={{ background: 'var(--ssc-fog)' }}>
            <p className='font-space-mono mb-1 text-xs font-bold uppercase tracking-[0.14em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
              Property: {content.realExample.property}
            </p>
            <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{content.realExample.summary}</p>
          </div>
          <div className='mt-4 space-y-3 text-sm leading-relaxed sm:text-base' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <p><strong style={{ color: 'var(--ssc-text-dark)' }}>What I found.</strong> {content.realExample.findings}</p>
            <p><strong style={{ color: 'var(--ssc-text-dark)' }}>What I did.</strong> {content.realExample.action}</p>
            <p><strong style={{ color: 'var(--ssc-text-dark)' }}>What changed.</strong> {content.realExample.result}</p>
            {content.realExample.quote && (
              <blockquote className='border-l-2 pl-4 font-serif text-base italic' style={{ borderColor: 'var(--ssc-seafoam-deep)', color: 'var(--ssc-text-dark)' }}>
                {content.realExample.quote}
              </blockquote>
            )}
            {content.realExample.timeInvestment && (
              <p><strong style={{ color: 'var(--ssc-text-dark)' }}>Time investment.</strong> {content.realExample.timeInvestment}</p>
            )}
          </div>
        </SectionCard>
      )}

      {/* Section 5 — Common mistakes */}
      {content.commonMistakes.length > 0 && (
        <SectionCard>
          <SectionHeading>Common mistakes</SectionHeading>
          <ul className='space-y-4'>
            {content.commonMistakes.map((item, i) => (
              <li key={i} className='flex gap-3 text-sm leading-relaxed sm:text-base'>
                <span aria-hidden='true' className='mt-1 h-1.5 w-1.5 shrink-0 rounded-full' style={{ background: 'var(--ssc-seafoam-deep)' }} />
                <span style={{ color: 'var(--ssc-text-dark-mute)' }}>
                  <strong style={{ color: 'var(--ssc-text-dark)' }}>{item.mistake}</strong> — {item.impact}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      {/* Section 6 — Output */}
      {content.output && (
        <SectionCard>
          <SectionHeading>Output</SectionHeading>
          <p className='text-sm leading-relaxed sm:text-base' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            {content.output.description}
          </p>
          <div className='mt-4 rounded-lg p-4' style={{ background: 'var(--ssc-fog)' }}>
            <Eyebrow>Format</Eyebrow>
            <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{content.output.format}</p>
            <div className='mt-3' style={{ borderTop: '1px solid var(--ssc-line-light)' }} />
            <Eyebrow>Feeds into</Eyebrow>
            <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{content.output.feedsInto}</p>
          </div>
        </SectionCard>
      )}

      {/* Section 7 — Next steps */}
      {content.nextSteps && (
        <SectionCard>
          <SectionHeading>Next steps</SectionHeading>
          <p className='text-sm leading-relaxed sm:text-base' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            {content.nextSteps}
          </p>
          {nextSkillLinks.length > 0 && (
            <div className='mt-4 flex flex-wrap gap-2'>
              {nextSkillLinks.map(link => (
                <Link key={link.href} href={link.href} className='rounded-full border px-4 py-1.5 font-space-mono text-xs transition-colors hover:border-[var(--ssc-seafoam-deep)]' style={{ borderColor: 'var(--ssc-line-light)', color: 'var(--ssc-seafoam-deep)' }}>
                  {link.name} →
                </Link>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {/* Section 8 — Time & resources */}
      {content.timeResources && (
        <SectionCard>
          <SectionHeading>Time &amp; resources</SectionHeading>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='rounded-lg p-4' style={{ background: 'var(--ssc-fog)' }}>
              <Eyebrow>First run</Eyebrow>
              <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{content.timeResources.firstRun}</p>
            </div>
            <div className='rounded-lg p-4' style={{ background: 'var(--ssc-fog)' }}>
              <Eyebrow>Iterations</Eyebrow>
              <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{content.timeResources.iterations}</p>
            </div>
          </div>
          <div className='mt-4 flex flex-wrap items-center gap-2'>
            <Wrench className='h-4 w-4' style={{ color: 'var(--ssc-seafoam-deep)' }} />
            {content.timeResources.tools.map(tool => (
              <span key={tool} className='rounded-full border px-3 py-1 font-space-mono text-xs' style={{ borderColor: 'var(--ssc-line-light)', color: 'var(--ssc-text-dark-mute)' }}>
                {tool}
              </span>
            ))}
          </div>
          <p className='mt-4 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            {content.timeResources.learningCurve}
          </p>
        </SectionCard>
      )}

      {/* Section 10 + 11 — GitHub SKILL.md + Use in Claude */}
      <SectionCard>
        <SectionHeading>Take it with you</SectionHeading>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <div className='flex-1'>
            {content.githubUrl ? (
              <a
                href={content.githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-full px-[1.4em] py-[0.8em] text-sm font-semibold transition-all duration-300 hover:-translate-y-[2px]'
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
            ) : (
              <p className='rounded-lg p-4 text-sm leading-relaxed' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark-mute)' }}>
                {content.githubNote ?? 'Technical SKILL.md coming soon — this page is the reference until it ships.'}
              </p>
            )}
            <p className='mt-3 text-xs leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
              Want to run this in Claude? This page is the strategic overview. The GitHub SKILL.md is the full technical
              specification — import it and run the method.
            </p>
          </div>
          <div className='flex flex-1 items-center gap-3 rounded-lg p-4' style={{ background: 'var(--ssc-fog)' }}>
            <Sparkles className='h-5 w-5 shrink-0' style={{ color: 'var(--ssc-seafoam-deep)' }} />
            <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
              {content.useInClaude}
            </p>
          </div>
        </div>
      </SectionCard>
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
          {content?.seoHeadline ?? skill.name}
        </h1>
        <p className='mt-3 text-lg leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
          {skill.tagline}
        </p>
      </header>

      {body ? (
        <div className='mx-auto max-w-6xl px-4 pb-20 sm:px-6'>
          <div className='grid gap-10 lg:grid-cols-[1fr_300px]'>
            <div className='min-w-0'>{body}</div>
            <div className='space-y-6 lg:pt-2'>
              <SkillSpecLink categorySlug={category.slug} skillSlug={skill.slug} skillName={skill.name} />
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
            <div className='mt-6 text-left'>
              <SkillSpecLink categorySlug={category.slug} skillSlug={skill.slug} skillName={skill.name} />
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
