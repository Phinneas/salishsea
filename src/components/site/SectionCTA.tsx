import Link from 'next/link'

interface SectionCTAProps {
  title: string
  subtitle?: string
  href: string
  label: string
  external?: boolean
}

export function SectionCTA({ title, subtitle, href, label, external }: SectionCTAProps) {
  return (
    <section
      className='px-4 py-20 text-center sm:px-6'
      style={{
        background: 'radial-gradient(900px 460px at 50% 120%, #1e4633, var(--ssc-ink) 55%, var(--ssc-navy))',
        color: 'var(--ssc-text-light)',
      }}
    >
      <div className='mx-auto max-w-3xl'>
        <h2 className='font-serif text-3xl font-bold tracking-tight text-white'>
          {title}
        </h2>
        {subtitle && (
          <p className='mx-auto mt-4 max-w-xl leading-relaxed' style={{ color: 'var(--ssc-text-mute)' }}>
            {subtitle}
          </p>
        )}
        <Link
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className='mt-8 inline-flex items-center gap-2 rounded-full px-[1.6em] py-[0.95em] text-[0.98rem] font-semibold transition-all duration-300 hover:-translate-y-[3px]'
          style={{
            background: 'var(--ssc-seafoam)',
            color: 'var(--ssc-ink)',
            boxShadow: '0 10px 30px -10px rgba(95,227,201,.6)',
          }}
        >
          {label} <span aria-hidden='true'>→</span>
        </Link>
      </div>
    </section>
  )
}
