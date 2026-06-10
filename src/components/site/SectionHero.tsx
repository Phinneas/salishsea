interface SectionHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export function SectionHero({ eyebrow, title, subtitle, children }: SectionHeroProps) {
  return (
    <section
      className='relative px-4 py-20 text-center sm:px-6'
      style={{
        background: 'radial-gradient(900px 520px at 50% -10%, #1e4633, var(--ssc-ink) 55%, var(--ssc-navy))',
        color: 'var(--ssc-text-light)',
      }}
    >
      <div className='mx-auto max-w-3xl'>
        {eyebrow && (
          <span className='mb-4 inline-flex items-center gap-[0.6em] font-space-mono text-[0.74rem] font-bold uppercase tracking-[0.28em] text-[var(--ssc-seafoam)] justify-center'>
            <span className='h-px w-[26px] bg-[var(--ssc-seafoam)] opacity-70' />
            {eyebrow}
            <span className='h-px w-[26px] bg-[var(--ssc-seafoam)] opacity-70' />
          </span>
        )}
        <h1
          className='font-serif text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl'
        >
          {title}
        </h1>
        {subtitle && (
          <p className='mt-4 text-lg leading-relaxed' style={{ color: 'var(--ssc-text-mute)' }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
