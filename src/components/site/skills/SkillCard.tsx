import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Skill, SkillCategory } from '@/config/skills'

/** Category page card: skill name, tagline, when-to-use, learn CTA. */
export function SkillCard({ category, skill }: { category: SkillCategory; skill: Skill }) {
  return (
    <article
      className='flex flex-col rounded-[var(--ssc-r)] border bg-white p-6'
      style={{ borderColor: 'var(--ssc-line-light)' }}
    >
      <h3 className='font-serif text-lg font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>
        {skill.name}
      </h3>
      <p className='mt-2 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
        {skill.tagline}
      </p>

      <div className='mt-4 rounded-lg p-3' style={{ background: 'var(--ssc-fog)' }}>
        <p className='font-space-mono text-[0.68rem] font-bold uppercase tracking-[0.14em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
          When to use this
        </p>
        <p className='mt-1 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
          {skill.whenToUse}
        </p>
      </div>

      <Link
        href={`/skills/${category.slug}/${skill.slug}/`}
        className='mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold transition-colors hover:underline'
        style={{ color: 'var(--ssc-seafoam-deep)' }}
      >
        Learn the methodology <ArrowRight className='h-4 w-4' />
      </Link>
    </article>
  )
}
