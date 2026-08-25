import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Skill } from '@/config/skills'
import { getRelatedSkills } from '@/config/skills'
import { skillContent } from '@/config/skill-content'

/** Skill page sidebar: 2-3 related skills with relationship labels (mesh navigation). */
export function RelatedSkills({ skill }: { skill: Skill }) {
  const content = skillContent[skill.slug]
  const relationships = new Map((content?.related ?? []).map(r => [r.slug, r.relationship]))
  const related = getRelatedSkills(skill)
  if (related.length === 0) return null

  return (
    <aside>
      <h2 className='font-serif mb-4 text-lg font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>
        Related skills
      </h2>
      <ul className='space-y-3'>
        {related.map(({ category, skill: relatedSkill }) => (
          <li key={`${category.slug}/${relatedSkill.slug}`}>
            <Link
              href={`/skills/${category.slug}/${relatedSkill.slug}/`}
              className='group block rounded-[var(--ssc-r)] border bg-white p-4 transition-all duration-300 hover:-translate-y-[1px] hover:shadow-md'
              style={{ borderColor: 'var(--ssc-line-light)' }}
            >
              <span className='font-space-mono text-[0.64rem] uppercase tracking-[0.14em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
                {category.name}
              </span>
              <span className='mt-1 flex items-center justify-between gap-2 font-serif font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>
                {relatedSkill.name}
                <ArrowRight className='h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5' style={{ color: 'var(--ssc-seafoam-deep)' }} />
              </span>
              {relationships.get(relatedSkill.slug) && (
                <span className='mt-1 block text-xs leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                  {relationships.get(relatedSkill.slug)}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
