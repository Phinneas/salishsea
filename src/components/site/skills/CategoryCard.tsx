import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { SkillCategory } from '@/config/skills'

/** Hub page card: category name, tagline, skill count, explore CTA. */
export function CategoryCard({ category }: { category: SkillCategory }) {
  const count = category.skills.length
  const label = category.slug === 'tools' ? 'tools' : 'skills'

  return (
    <Link
      href={`/skills/${category.slug}/`}
      className='group flex flex-col rounded-[var(--ssc-r)] border bg-white p-6 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg'
      style={{ borderColor: 'var(--ssc-line-light)' }}
    >
      <div className='mb-3 flex items-center justify-between gap-4'>
        <h3 className='font-serif text-xl font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>
          {category.name}
        </h3>
        <span className='shrink-0 rounded-full border px-2.5 py-0.5 font-space-mono text-[0.7rem] font-medium uppercase tracking-[0.08em]' style={{ borderColor: 'var(--ssc-line-light)', color: 'var(--ssc-seafoam-deep)' }}>
          {count} {label}
        </span>
      </div>
      <p className='mb-6 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
        {category.tagline}
      </p>
      <span className='mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-colors group-hover:gap-3' style={{ color: 'var(--ssc-seafoam-deep)' }}>
        Explore <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' />
      </span>
    </Link>
  )
}
