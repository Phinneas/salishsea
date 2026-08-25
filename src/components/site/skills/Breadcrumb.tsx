import Link from 'next/link'

export interface Crumb {
  label: string
  href?: string
}

/**
 * Breadcrumb: Home > Skills > [Category] > [Skill]
 * Last item renders as plain text (current page); all others link.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label='Breadcrumb' className='mx-auto max-w-3xl px-4 pt-8 sm:px-6'>
      <ol className='flex flex-wrap items-center gap-1.5 font-space-mono text-[0.72rem] uppercase tracking-[0.1em]' style={{ color: 'var(--ssc-text-dark-mute)' }}>
        <li>
          <Link href='/' className='transition-colors hover:text-[var(--ssc-seafoam-deep)]'>
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className='flex items-center gap-1.5'>
            <span aria-hidden='true'>/</span>
            {item.href ? (
              <Link href={item.href} className='transition-colors hover:text-[var(--ssc-seafoam-deep)]'>
                {item.label}
              </Link>
            ) : (
              <span aria-current='page' style={{ color: 'var(--ssc-text-dark)' }}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
