'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { chapters, type Stamp } from '@/lib/stamp-data'

export function StampCollection() {
  const gridRefs = useRef<Map<string, HTMLDivElement | null>>(new Map())

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function layout() {
      gridRefs.current.forEach(g => {
        if (!g) return
        const row = parseFloat(getComputedStyle(g).gridAutoRows) || 6
        g.querySelectorAll<HTMLElement>('.stamp-card').forEach(it => {
          it.style.gridRowEnd = 'auto'
          const mb = parseFloat(getComputedStyle(it).marginBottom) || 0
          const span = Math.max(1, Math.ceil((it.offsetHeight + mb) / row))
          it.style.gridRowEnd = `span ${span}`
        })
      })
    }

    let t: ReturnType<typeof setTimeout>
    function relayout() { clearTimeout(t); t = setTimeout(layout, 80) }

    layout()
    setTimeout(layout, 300)
    window.addEventListener('resize', relayout)

    document.querySelectorAll<HTMLImageElement>('.stamp-art img').forEach(img => {
      if (!img.complete) img.addEventListener('load', relayout)
    })

    if (document.fonts?.ready) document.fonts.ready.then(layout)

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            const i = parseInt(el.style.getPropertyValue('--i') || '0')
            el.style.transitionDelay = `${(i % 6) * 55}ms`
            el.classList.add('in')
            io.unobserve(el)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    document.querySelectorAll('.stamp-card').forEach(s => {
      if (reduce) { s.classList.add('in'); return }
      io.observe(s)
    })

    setTimeout(layout, 1200)
    return () => { window.removeEventListener('resize', relayout); io.disconnect() }
  }, [])

  return (
    <div style={{ background: 'var(--ssc-paper)' }}>
      <div className='stamp-airmail' />

      <div className='mx-auto max-w-[1180px] px-[22px] pb-[70px]' style={{ position: 'relative', zIndex: 1 }}>

        {/* Hero */}
        <header
          className='relative -mx-[22px] overflow-hidden px-[22px] pb-[64px] pt-[78px] text-center'
          style={{
            background: 'radial-gradient(900px 520px at 50% -10%, #1e4633, var(--ssc-ink) 55%, var(--ssc-navy))',
            color: 'var(--ssc-text-light)',
          }}
        >
          <svg className='pointer-events-none absolute left-1/2 top-[18px] w-[330px] opacity-10' style={{ transform: 'translateX(-50%)', color: 'var(--ssc-text-light)' }} viewBox='0 0 100 100' aria-hidden='true'>
            <circle cx='50' cy='50' r='48' fill='none' stroke='currentColor' strokeWidth='0.6' />
            <circle cx='50' cy='50' r='38' fill='none' stroke='currentColor' strokeWidth='0.4' />
            <g stroke='currentColor' strokeWidth='0.5'>
              <line x1='50' y1='2' x2='50' y2='98' /><line x1='2' y1='50' x2='98' y2='50' />
              <line x1='15' y1='15' x2='85' y2='85' /><line x1='85' y1='15' x2='15' y2='85' />
            </g>
            <polygon points='50,8 56,50 50,46 44,50' fill='currentColor' />
          </svg>

          <p className='mb-4 inline-flex items-center gap-[0.6em] font-space-mono text-[11px] font-bold uppercase tracking-[0.4em]' style={{ color: 'var(--ssc-seafoam)', paddingLeft: '.4em' }}>
            <span className='h-px w-[26px] bg-[var(--ssc-seafoam)] opacity-70' />
            Salish Sea Postal Service
            <span className='h-px w-[26px] bg-[var(--ssc-seafoam)] opacity-70' />
          </p>

          <h1 className='font-space-grotesk m-0 font-bold leading-[1.02] tracking-[-0.02em] text-white' style={{ fontSize: 'clamp(40px,8vw,86px)' }}>
            Made, <em style={{ fontStyle: 'normal', color: 'var(--ssc-seafoam)' }}>Not Assigned</em>
          </h1>

          <p className='mx-auto mt-[22px] max-w-[680px] font-sans text-[clamp(15px,2vw,18px)] font-normal leading-[1.65]' style={{ color: 'var(--ssc-text-mute)' }}>
            These are the platforms, directories, and tools I&apos;ve built for real audiences. When sustainability, wellness, gardening, or the outdoors is your market, I already know your reader.
          </p>

          <div className='mt-[26px] flex flex-wrap items-center justify-center gap-4 font-space-mono text-[11px] font-normal uppercase tracking-[0.16em]' style={{ color: 'var(--ssc-text-mute)' }}>
            <span><b className='font-bold text-white'>20</b> Destinations</span>
            <span style={{ color: 'var(--ssc-seafoam)' }}>&bull;</span>
            <span><b className='font-bold text-white'>16</b> Now Open</span>
            <span style={{ color: 'var(--ssc-seafoam)' }}>&bull;</span>
            <span><b className='font-bold text-white'>4</b> Forthcoming</span>
          </div>

          <p className='mt-[30px] font-space-mono text-[10px] uppercase tracking-[0.3em]' style={{ color: 'var(--ssc-text-mute)', opacity: 0.7 }}>
            &darr; &nbsp; Begin the journey &nbsp; &darr;
          </p>
        </header>

        {chapters.map(chapter => (
          <section key={chapter.numeral} className='mt-[18px]'>
            <div className='my-[30px] flex items-center gap-[18px]'>
              <span className='stamp-chapter-num'>{chapter.numeral}</span>
              <div>
                <h2 className='font-space-grotesk m-0 font-bold leading-[1.04] tracking-[-0.02em]' style={{ color: 'var(--ssc-text-dark)', fontSize: 'clamp(20px,2.8vw,28px)' }}>
                  {chapter.title}
                </h2>
                <p className='m-0 mt-1 text-sm font-normal' style={{ color: 'var(--ssc-text-dark-mute)' }}>{chapter.intro}</p>
              </div>
              <span className='stamp-chapter-route' aria-hidden='true' />
            </div>

            <div
              ref={el => { if (el) gridRefs.current.set(chapter.numeral, el) }}
              className='stamp-grid'
            >
              {chapter.stamps.map((stamp, i) => (
                <StampCard key={stamp.slug} stamp={stamp} index={i} />
              ))}
            </div>
          </section>
        ))}

        <footer className='stamp-foot-band'>
          <div className='mx-auto max-w-[660px]'>
            <h3 className='m-0 mb-[14px] font-kalam text-[clamp(24px,3.6vw,34px)] font-bold leading-[1.25] text-white'>
              These aren&apos;t client projects. They&apos;re mine.
            </h3>
            <p className='mx-auto mb-6 max-w-[540px] text-[15px] leading-[1.65]' style={{ color: 'var(--ssc-text-mute)' }}>
              Every destination here was built by me, for an audience I wanted to serve &mdash; the research, the content strategy, the SEO thinking, and the writing all from the same place: genuine interest in the subject, and genuine commitment to the reader.
            </p>
            <Link
              href='/'
              className='inline-block font-space-mono text-[12px] font-bold uppercase tracking-[0.12em] no-underline transition-all duration-200 hover:-translate-y-[2px]'
              style={{ color: '#fff', background: 'var(--ssc-teal)', padding: '13px 24px', borderRadius: '3px' }}
            >
              Return to Salish Sea Consulting
            </Link>
            <p className='stamp-colophon'>
              Postmarked by the Salish Sea Postal Service &bull; Pacific Northwest
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

function StampCard({ stamp, index }: { stamp: Stamp; index: number }) {
  const Tag = stamp.comingSoon ? 'div' : 'a'
  const linkProps = stamp.comingSoon
    ? {}
    : { href: stamp.url, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <Tag
      className={`stamp-card${stamp.wide ? ' wide' : ''}${stamp.comingSoon ? ' coming' : ''}`}
      style={{ '--rot': stamp.rotation, '--i': index } as React.CSSProperties}
      {...linkProps}
      title={stamp.description}
    >
      {stamp.comingSoon && <span className='stamp-ribbon'>Coming soon</span>}

      <span className='stamp-paper'>
        <span className='stamp-matte'>
          <span className='stamp-head'>
            <span className='stamp-issuer'>Salish&nbsp;Sea</span>
            <span className='stamp-denom'>{stamp.denom}</span>
          </span>
          <span className='stamp-art'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stamp.image}
              alt={`${stamp.name} — ${stamp.description}`}
              loading={index < 3 ? 'eager' : 'lazy'}
            />
            <svg
              className={`stamp-pm${stamp.comingSoon ? ' soon' : ''}`}
              viewBox='0 0 178 100'
              aria-hidden='true'
            >
              <circle className='pm-ring' cx='50' cy='50' r='44' />
              <circle className='pm-ring thin' cx='50' cy='50' r='38' />
              <text className='pm-ctr' x='50' y='54'>{stamp.year}</text>
              <line className='pm-bar' x1='5' y1='80' x2='95' y2='80' />
            </svg>
          </span>
          <span className='stamp-foot'>
            <span className='stamp-pname'>
              {stamp.name}
              {!stamp.comingSoon && <span className='stamp-visit'>&#8599;</span>}
            </span>
            <span className='stamp-pcat'>{stamp.category}</span>
          </span>
        </span>
      </span>
    </Tag>
  )
}
