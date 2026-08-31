import { ExternalLink, Github } from 'lucide-react'
import { getSkillSpecUrl } from '@/config/skills'

interface Props {
  categorySlug: string
  skillSlug: string
  skillName: string
}

/**
 * Card linking to a skill's published SKILL.md specification on GitHub.
 * Renders nothing when the spec has not shipped yet.
 */
export function SkillSpecLink({ categorySlug, skillSlug, skillName }: Props) {
  const url = getSkillSpecUrl(categorySlug, skillSlug)
  if (!url) return null

  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='group block rounded-[var(--ssc-r)] border bg-white p-4 transition-all duration-300 hover:-translate-y-[1px] hover:shadow-md'
      style={{ borderColor: 'var(--ssc-line-light)' }}
    >
      <span className='flex items-center gap-2 font-space-mono text-[0.64rem] uppercase tracking-[0.14em]' style={{ color: 'var(--ssc-seafoam-deep)' }}>
        <Github className='h-3.5 w-3.5' />
        SKILL.md specification
        <ExternalLink className='ml-auto h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5' />
      </span>
      <span className='mt-1 block font-serif font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>
        {skillName}
      </span>
      <span className='mt-1 block text-xs leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
        Not just a prompt — the full production framework, versioned on GitHub. Import it into Claude and run the method.
      </span>
    </a>
  )
}
