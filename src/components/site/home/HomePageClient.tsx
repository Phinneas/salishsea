'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type SlimPost = {
  slug: string
  title: string
  excerpt?: string
  published_at: string
  tags?: string[]
}

// ─── Wave Divider ────────────────────────────────────────────────────────────

const WAVE_FILLS = {
  fog:   ['#eef4f4', '#e1ecec'],
  navy2: ['#0e2b38', '#0a222d'],
  ink:   ['#07151d', '#04111a'],
} as const

function WaveDivider({ variant }: { variant: keyof typeof WAVE_FILLS }) {
  const [f1, f2] = WAVE_FILLS[variant]
  return (
    <div
      aria-hidden='true'
      className='absolute left-0 right-0 bottom-[-1px] z-[2] w-full overflow-hidden leading-none pointer-events-none'
    >
      <svg
        viewBox='0 0 2880 120'
        preserveAspectRatio='none'
        style={{ width: '200%', display: 'block', height: 'clamp(50px,7vw,96px)' }}
      >
        <path
          className='ssc-wave-2'
          d='M0,60 C240,100 480,100 720,60 C960,20 1200,20 1440,60 C1680,100 1920,100 2160,60 C2400,20 2640,20 2880,60 L2880,120 L0,120 Z'
          fill={f2}
        />
        <path
          className='ssc-wave-1'
          d='M0,70 C240,40 480,40 720,72 C960,104 1200,104 1440,72 C1680,40 1920,40 2160,72 C2400,104 2640,104 2880,72 L2880,120 L0,120 Z'
          fill={f1}
        />
      </svg>
    </div>
  )
}

// ─── Eyebrow Label ───────────────────────────────────────────────────────────

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-[0.6em] font-space-mono text-[0.74rem] font-bold uppercase tracking-[0.28em] text-[var(--ssc-seafoam)] ${center ? 'justify-center' : ''}`}
    >
      <span className='h-px w-[26px] bg-[var(--ssc-seafoam)] opacity-70' />
      {children}
      {center && <span className='h-px w-[26px] bg-[var(--ssc-seafoam)] opacity-70' />}
    </span>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function HomePageClient({ posts }: { posts: SlimPost[] }) {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const heroMediaRef  = useRef<HTMLDivElement>(null)
  const quoteBgRef    = useRef<HTMLDivElement>(null)
  const ctaBgRef      = useRef<HTMLDivElement>(null)

  // Hero entrance
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  // Scroll reveals via IntersectionObserver
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = document.querySelectorAll<HTMLElement>('.ssc-reveal')

    if (reduce) {
      els.forEach(el => el.classList.add('in'))
      return
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'))
      return
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Count-up stats
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nums = document.querySelectorAll<HTMLElement>('.ssc-count[data-count]')

    function animateCount(el: HTMLElement) {
      const target = parseFloat(el.dataset.count ?? '0')
      const suffix = el.dataset.suffix ?? ''
      const dec = target % 1 !== 0 ? 1 : 0
      if (reduce) { el.textContent = target + suffix; return }
      const dur = 1600
      let start: number | null = null
      function step(ts: number) {
        if (!start) start = ts
        const p = Math.min((ts - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        const val = target * eased
        el.textContent = (dec ? val.toFixed(1) : Math.round(val)) + suffix
        if (p < 1) requestAnimationFrame(step)
        else el.textContent = target + suffix
      }
      requestAnimationFrame(step)
    }

    if (!('IntersectionObserver' in window)) {
      nums.forEach(animateCount)
      return
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            animateCount(e.target as HTMLElement)
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.6 },
    )
    nums.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Parallax
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    let ticking = false
    function parallax() {
      const y = window.scrollY
      if (heroMediaRef.current) {
        heroMediaRef.current.style.transform = `translate3d(0,${y * 0.2}px,0)`
      }
      ;[quoteBgRef, ctaBgRef].forEach(ref => {
        if (!ref.current) return
        const r = ref.current.parentElement!.getBoundingClientRect()
        const offset = r.top + r.height / 2 - window.innerHeight / 2
        ref.current.style.transform = `translate3d(0,${offset * -0.12}px,0) scale(1.12)`
      })
      ticking = false
    }

    function onScroll() {
      if (!ticking) { requestAnimationFrame(parallax); ticking = true }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    parallax()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section
        className={`relative flex min-h-[100svh] items-center overflow-hidden ${heroLoaded ? 'ssc-hero-loaded' : ''}`}
        style={{ isolation: 'isolate' }}
        id='top'
      >
        {/* Parallax image */}
        <div
          ref={heroMediaRef}
          className='absolute inset-x-0 top-[-12%] bottom-0 z-[-2] will-change-transform'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className='ssc-hero-img w-full object-cover object-[center_42%]'
            style={{ height: '126%' }}
            src='https://images.unsplash.com/photo-1659951231548-9aa2de9c20cc?fm=jpg&q=82&w=2400&fit=crop'
            alt='Aerial view of the forested islands of the Salish Sea with Mount Baker on the horizon'
          />
        </div>

        {/* Scrim */}
        <div
          className='absolute inset-0 z-[-1]'
          style={{
            background: [
              'radial-gradient(120% 90% at 18% 78%,rgba(7,21,29,.92),rgba(7,21,29,.34) 55%,transparent 78%)',
              'linear-gradient(180deg,rgba(7,21,29,.78) 0%,rgba(7,21,29,.12) 30%,rgba(7,21,29,.30) 62%,rgba(7,21,29,.95) 100%)',
            ].join(','),
          }}
        />

        {/* Content */}
        <div className='mx-auto w-full max-w-[1060px] px-[clamp(20px,5vw,48px)] pb-[118px] pt-[138px]'>
          <span className='ssc-stagger ssc-d1 eyebrow font-space-mono text-[0.74rem] font-bold uppercase tracking-[0.28em] text-[var(--ssc-seafoam)] inline-flex items-center gap-[0.6em]'>
            <span className='h-px w-[26px] bg-[var(--ssc-seafoam)] opacity-70' />
            Content &amp; Communications · Sustainability-Conscious Brands
          </span>

          <h1
            className='font-space-grotesk mt-6 text-white leading-[1.04] tracking-[-0.02em] font-bold'
            style={{ fontSize: 'clamp(2.4rem,5.2vw,4.8rem)', textShadow: '0 2px 40px rgba(0,0,0,.35)' }}
          >
            <span className='ssc-reveal-word'><span>Your sustainable brand</span></span>
            <br />
            <span className='ssc-reveal-word'><span>deserves communications</span></span>
            <br />
            <span className='ssc-reveal-word'>
              <span>that match your <span className='ssc-grad'>impact</span>.</span>
            </span>
          </h1>

          <p
            className='ssc-stagger ssc-d2 mt-[26px] leading-[1.6] opacity-[0.94]'
            style={{
              fontSize: 'clamp(1.08rem,1.7vw,1.4rem)',
              color: 'var(--ssc-text-light)',
              maxWidth: '620px',
            }}
          >
            Brand copywriting and sustainability research reports, built to earn trust, drive action, and reflect the depth of your work.
          </p>

          <div className='ssc-stagger ssc-d3 mt-10 flex flex-wrap gap-4'>
            <Link
              href='https://cal.com/chester-beard/30min'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-full px-[1.6em] py-[0.95em] text-[0.98rem] font-semibold transition-all duration-300 hover:-translate-y-[3px]'
              style={{
                background: 'var(--ssc-seafoam)',
                color: 'var(--ssc-ink)',
                boxShadow: '0 10px 30px -10px rgba(95,227,201,.6)',
              }}
            >
              Schedule a Free 30-Min Call <span aria-hidden='true'>→</span>
            </Link>
            <Link
              href='/services'
              className='inline-flex items-center gap-2 rounded-full border px-[1.6em] py-[0.95em] text-[0.98rem] font-semibold transition-all duration-300 hover:-translate-y-[3px] hover:border-[var(--ssc-seafoam)] hover:bg-white/10'
              style={{
                background: 'rgba(255,255,255,.04)',
                color: 'var(--ssc-text-light)',
                borderColor: 'rgba(220,236,236,.28)',
              }}
            >
              See Services &amp; Pricing
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden='true'
          className='absolute bottom-[30px] left-1/2 -translate-x-1/2 z-[1] flex flex-col items-center gap-[10px] font-space-mono text-[0.66rem] uppercase tracking-[0.22em]'
          style={{ color: 'var(--ssc-text-mute)' }}
        >
          <div
            className='ssc-cue-dot relative h-[38px] w-[24px] rounded-[14px] border-[1.5px]'
            style={{ borderColor: 'rgba(220,236,236,.4)' }}
          />
          Scroll
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section
        aria-label='Credibility'
        className='relative pb-24 pt-[72px]'
        style={{ background: 'var(--ssc-navy)' }}
      >
        <div className='mx-auto max-w-[1200px] px-[clamp(20px,5vw,48px)]'>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
            {[
              { count: '1', suffix: 'M+', label: 'Article reads on sustainable business', isText: false },
              { count: '24', suffix: 'k+', label: 'Combined audience across platforms', isText: false },
              { count: '20', suffix: '', label: 'Years of real-world marketing experience', isText: false },
              { count: null, textVal: 'Sierra Club', label: 'Former Executive Council, Washington', isText: true },
            ].map((stat, i) => (
              <div
                key={i}
                className={`ssc-reveal ${['d1','d2','d3','d4'][i]} relative py-[6px] pl-[26px] pr-[8px]`}
                style={{
                  ['--before-bg' as string]: 'var(--ssc-seafoam)',
                }}
              >
                <div
                  className='absolute left-0 top-[6px] bottom-[6px] w-[2px] rounded-[2px]'
                  style={{ background: 'linear-gradient(var(--ssc-seafoam),transparent)' }}
                />
                {stat.isText ? (
                  <div
                    className='font-space-grotesk font-bold leading-none tracking-[-0.03em] text-white'
                    style={{ fontSize: 'clamp(1.5rem,2.4vw,2rem)' }}
                  >
                    {stat.textVal}
                  </div>
                ) : (
                  <div
                    className='ssc-count font-space-grotesk font-bold leading-none tracking-[-0.03em] text-white'
                    style={{ fontSize: 'clamp(2.4rem,4vw,3.4rem)' }}
                    data-count={stat.count}
                    data-suffix={stat.suffix}
                  >
                    0
                  </div>
                )}
                <div
                  className='mt-[10px] max-w-[200px] text-[0.92rem]'
                  style={{ color: 'var(--ssc-text-mute)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <WaveDivider variant='fog' />
      </section>

      {/* ─── PROBLEM ──────────────────────────────────────────── */}
      <section
        className='relative py-[clamp(80px,11vw,150px)]'
        style={{ background: 'linear-gradient(180deg,#eef4f4,#e3edee)', color: 'var(--ssc-text-dark)' }}
        id='problem'
      >
        <div className='mx-auto max-w-[1200px] px-[clamp(20px,5vw,48px)]'>
          {/* Top: text + image */}
          <div className='grid items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-[1.05fr_0.95fr]'>
            <div>
              <div className='ssc-reveal'>
                <Eyebrow>The Gap</Eyebrow>
              </div>
              <h2
                className='ssc-reveal font-space-grotesk mt-[18px] font-bold leading-[1.04] tracking-[-0.02em]'
                style={{ fontSize: 'clamp(2rem,4.4vw,3.4rem)', color: 'var(--ssc-text-dark)' }}
              >
                Your impact is real. But it is not landing.
              </h2>
              <p
                className='ssc-reveal d1 mt-[22px] leading-[1.7]'
                style={{ fontSize: 'clamp(1.05rem,1.5vw,1.28rem)', color: 'var(--ssc-text-dark-mute)' }}
              >
                The work matters. But somewhere between the doing and the telling, the story gets lost: buried in jargon, buried in data, or simply never told with the clarity it deserves.
              </p>
            </div>
            <div
              className='ssc-reveal d2 overflow-hidden rounded-[var(--ssc-r)] aspect-[4/3] shadow-[0_40px_80px_-40px_rgba(10,30,41,.4)]'
              style={{ position: 'relative' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='https://images.unsplash.com/photo-1750660154268-6ecab87ba4ef?fm=jpg&q=80&w=1200&fit=crop'
                alt='Fog rolling over a calm, open sea'
                className='h-full w-full object-cover transition-transform duration-[1200ms]'
              />
              <div
                className='absolute inset-0'
                style={{ background: 'linear-gradient(120deg,rgba(20,81,94,.12),transparent)' }}
              />
            </div>
          </div>

          {/* Problem cards */}
          <div className='mt-[clamp(46px,6vw,72px)] grid gap-[22px] md:grid-cols-3'>
            {[
              {
                n: '01',
                title: 'Your website is not pulling its weight.',
                body: "You have built something worth believing in. But visitors cannot feel it. The copy is generic, the story is vague, and the people you most want to reach leave without acting.",
              },
              {
                n: '02',
                title: 'Your story gets lost in translation.',
                body: 'Between the doing and the telling, the meaning slips away: diluted by jargon, flattened into data, or never told with the clarity that earns trust.',
              },
              {
                n: '03',
                title: 'Your report does not build trust.',
                body: 'You have published the numbers. Stakeholders skim it, investors file it, the public never connects. A report that does not move people does not move the needle.',
              },
            ].map((card, i) => (
              <article
                key={card.n}
                className={`ssc-reveal ${['d1','d2','d3'][i]} rounded-[var(--ssc-r)] border bg-white p-[32px_28px] transition-all duration-[400ms] hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-34px_rgba(10,30,41,.3)]`}
                style={{ borderColor: 'var(--ssc-line-light)' }}
              >
                <div
                  className='font-space-mono text-[0.78rem] font-bold tracking-[0.1em]'
                  style={{ color: 'var(--ssc-seafoam-deep)' }}
                >
                  {card.n}
                </div>
                <h3
                  className='font-space-grotesk mt-[14px] mb-[12px] text-[1.24rem] font-bold leading-[1.04] tracking-[-0.02em]'
                  style={{ color: 'var(--ssc-text-dark)' }}
                >
                  {card.title}
                </h3>
                <p className='text-[0.98rem] leading-[1.62]' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
        <WaveDivider variant='navy2' />
      </section>

      {/* ─── APPROACH ─────────────────────────────────────────── */}
      <section
        className='py-[clamp(80px,11vw,150px)]'
        style={{ background: 'var(--ssc-navy-2)' }}
        id='approach'
      >
        <div className='mx-auto grid max-w-[1200px] items-center gap-[clamp(36px,6vw,80px)] px-[clamp(20px,5vw,48px)] md:grid-cols-2'>
          {/* Image */}
          <div
            className='ssc-reveal group relative overflow-hidden rounded-[var(--ssc-r)] aspect-[5/6] shadow-[0_50px_90px_-45px_rgba(0,0,0,.7)]'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='https://images.unsplash.com/photo-1760840083757-6df908736937?fm=jpg&q=82&w=1300&fit=crop'
              alt='Evergreen headland meeting deep blue Pacific Northwest surf'
              className='h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]'
            />
            <span
              className='absolute bottom-5 left-5 rounded-full border px-[1.1em] py-[0.5em] font-space-mono text-[0.7rem] uppercase tracking-[0.16em] backdrop-blur-[8px]'
              style={{
                background: 'rgba(8,21,29,.6)',
                borderColor: 'var(--ssc-line-dark)',
                color: 'var(--ssc-seafoam)',
              }}
            >
              One partner · Mission + Metrics
            </span>
          </div>

          {/* Text */}
          <div>
            <div className='ssc-reveal'>
              <Eyebrow>Why an integrated approach</Eyebrow>
            </div>
            <h2
              className='ssc-reveal d1 font-space-grotesk mt-[18px] font-bold leading-[1.04] tracking-[-0.02em]'
              style={{ fontSize: 'clamp(1.9rem,3.6vw,3rem)', color: '#fff' }}
            >
              Most sustainable brands are stuck between people who do not speak each other&#39;s language.
            </h2>
            <p
              className='ssc-reveal d2 mt-[22px] leading-[1.7]'
              style={{ fontSize: 'clamp(1.05rem,1.5vw,1.28rem)', color: 'var(--ssc-text-mute)' }}
            >
              Copywriters who do not understand your tech. Developers who do not grasp your mission. Fragmented marketing dilutes your impact and drains your budget.{' '}
              <strong style={{ color: 'var(--ssc-text-light)', fontWeight: 600 }}>I do both</strong>: marketing tools built around your values, copy synchronized with your technology, and funding narratives that actually win.
            </p>

            <div className='mt-[38px] flex flex-col gap-1'>
              {[
                {
                  icon: (
                    <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M3 12h4l3 8 4-16 3 8h4' />
                    </svg>
                  ),
                  title: 'End the vendor chaos',
                  body: 'One strategic partner who understands both your mission and your metrics from day one. No more gaps between your copywriter and your developer.',
                  delay: 'd1',
                },
                {
                  icon: (
                    <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                      <circle cx='11' cy='11' r='7' /><path d='m20 20-3.2-3.2' />
                    </svg>
                  ),
                  title: 'Guide conscious consumers',
                  body: 'Custom search catalogs and user journeys that make your sustainable options intuitive to find, built around how your audience actually thinks.',
                  delay: 'd2',
                },
                {
                  icon: (
                    <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
                      <path d='M3 17l6-6 4 4 8-8' /><path d='M17 7h4v4' />
                    </svg>
                  ),
                  title: 'Turn values into conversions',
                  body: 'High-impact copy and intelligent automation in perfect sync, so your message resonates at the moments that matter most.',
                  delay: 'd3',
                },
              ].map(pt => (
                <div
                  key={pt.title}
                  className={`ssc-reveal ${pt.delay} flex gap-5 border-t py-6`}
                  style={{ borderColor: 'var(--ssc-line-dark)' }}
                >
                  <div
                    className='flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[13px] border'
                    style={{
                      background: 'rgba(95,227,201,.1)',
                      borderColor: 'var(--ssc-line-dark)',
                      color: 'var(--ssc-seafoam)',
                    }}
                  >
                    {pt.icon}
                  </div>
                  <div>
                    <h3
                      className='font-space-grotesk mb-[6px] text-[1.16rem] font-bold leading-[1.04] tracking-[-0.02em] text-white'
                    >
                      {pt.title}
                    </h3>
                    <p className='text-[0.96rem] leading-[1.6]' style={{ color: 'var(--ssc-text-mute)' }}>
                      {pt.body}
                    </p>
                  </div>
                </div>
              ))}
              <div className='border-t' style={{ borderColor: 'var(--ssc-line-dark)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PARALLAX QUOTE ──────────────────────────────────── */}
      <section
        aria-label='Approach statement'
        className='relative flex min-h-[62vh] items-center overflow-hidden'
        style={{ isolation: 'isolate' }}
      >
        <div
          ref={quoteBgRef}
          className='absolute inset-0 z-[-2] bg-cover bg-center will-change-transform'
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1625628748830-639e59adbcfc?fm=jpg&q=82&w=2200&fit=crop')",
          }}
        />
        <div
          className='absolute inset-0 z-[-1]'
          style={{
            background:
              'linear-gradient(90deg,rgba(7,21,29,.92),rgba(7,21,29,.55) 60%,rgba(7,21,29,.3))',
          }}
        />
        <div className='mx-auto max-w-[1200px] px-[clamp(20px,5vw,48px)]'>
          <blockquote className='ssc-reveal max-w-[880px]'>
            <p
              className='font-space-grotesk font-semibold leading-[1.22] tracking-[-0.02em] text-white'
              style={{ fontSize: 'clamp(1.5rem,3.4vw,2.7rem)' }}
            >
              I do both: the words <span className='ssc-grad'>and</span> the technology. Nothing about your impact gets lost in translation.
            </p>
            <span
              className='mt-[26px] block font-space-mono text-[0.78rem] uppercase tracking-[0.2em]'
              style={{ color: 'var(--ssc-seafoam)' }}
            >
              The Salish Sea Approach
            </span>
          </blockquote>
        </div>
      </section>

      {/* ─── SERVICES ─────────────────────────────────────────── */}
      <section
        className='relative py-[clamp(80px,11vw,150px)]'
        style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}
        id='services'
      >
        <div className='mx-auto max-w-[1200px] px-[clamp(20px,5vw,48px)]'>
          <div className='ssc-reveal max-w-[720px]'>
            <Eyebrow>Services</Eyebrow>
            <h2
              className='font-space-grotesk mt-5 font-bold leading-[1.04] tracking-[-0.02em]'
              style={{ fontSize: 'clamp(2rem,4.4vw,3.4rem)', color: 'var(--ssc-text-dark)' }}
            >
              Everything your sustainable brand needs, from website copy to grant funding.
            </h2>
          </div>

          <div className='mt-[56px] grid gap-6 md:grid-cols-3'>
            {[
              {
                icon: (
                  <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round'>
                    <rect x='3' y='4' width='18' height='14' rx='2' /><path d='M3 9h18M8 21h8' />
                  </svg>
                ),
                title: 'Website Design and Copywriting',
                body: 'Complete website bundles, landing pages, and ongoing content strategies designed to convert conscious consumers. From SEO copy to CRM automation.',
                href: '/services#website',
                delay: 'd1',
              },
              {
                icon: (
                  <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M12 2v20M5 6h11a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h11' />
                  </svg>
                ),
                title: 'Grant Writing and Investor Services',
                body: 'Funding strategies, grant applications, prospectuses, and white papers that translate your mission into capital. Proven narrative techniques that win.',
                href: '/services#grants',
                delay: 'd2',
              },
              {
                icon: (
                  <svg width='26' height='26' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.7' strokeLinecap='round' strokeLinejoin='round'>
                    <path d='M4 20V10M10 20V4M16 20v-7M22 20H2' />
                  </svg>
                ),
                title: 'Marketing Strategy',
                body: 'Audience research, competitive analysis, SEO audits, and roadmaps tailored to sustainable brands. No generic playbooks: everything built for your market.',
                href: '/services',
                delay: 'd3',
              },
            ].map(svc => (
              <article
                key={svc.title}
                className={`ssc-reveal ${svc.delay} group relative overflow-hidden rounded-[var(--ssc-r)] border bg-white p-[38px_32px_34px] transition-all duration-[450ms] hover:-translate-y-[8px] hover:shadow-[0_40px_70px_-38px_rgba(10,30,41,.4)] hover:border-transparent`}
                style={{ borderColor: 'var(--ssc-line-light)' }}
              >
                {/* Top bar reveal on hover */}
                <div
                  className='absolute left-0 top-0 h-[4px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100'
                  style={{ background: 'linear-gradient(90deg,var(--ssc-seafoam),var(--ssc-seafoam-deep))' }}
                />
                <div
                  className='mb-6 grid h-[56px] w-[56px] place-items-center rounded-[15px]'
                  style={{
                    background: 'linear-gradient(140deg,#0e2b38,#14515e)',
                    color: 'var(--ssc-seafoam)',
                  }}
                >
                  {svc.icon}
                </div>
                <h3
                  className='font-space-grotesk mb-3 text-[1.32rem] font-bold leading-[1.04] tracking-[-0.02em]'
                  style={{ color: 'var(--ssc-text-dark)' }}
                >
                  {svc.title}
                </h3>
                <p className='text-[0.98rem] leading-[1.62]' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                  {svc.body}
                </p>
                <Link
                  href={svc.href}
                  className='mt-5 inline-flex items-center gap-[0.5em] text-[0.92rem] font-semibold transition-transform duration-300 hover:translate-x-1'
                  style={{ color: 'var(--ssc-seafoam-deep)' }}
                >
                  Explore <span aria-hidden='true'>→</span>
                </Link>
              </article>
            ))}
          </div>

          <div className='ssc-reveal mt-[46px] flex justify-center'>
            <Link
              href='/services'
              className='inline-flex items-center gap-2 rounded-full border px-[1.6em] py-[0.95em] text-[0.98rem] font-semibold transition-all duration-300 hover:-translate-y-[3px] hover:bg-[var(--ssc-ink)]'
              style={{
                background: 'var(--ssc-navy)',
                color: 'var(--ssc-text-light)',
                borderColor: 'transparent',
              }}
            >
              View All Services &amp; Pricing <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
        <WaveDivider variant='fog' />
      </section>

      {/* ─── INSIGHTS ─────────────────────────────────────────── */}
      <section
        className='relative py-[clamp(80px,11vw,150px)]'
        style={{ background: 'linear-gradient(180deg,#eef4f4,#e3edee)', color: 'var(--ssc-text-dark)' }}
        id='insights'
      >
        <div className='mx-auto max-w-[1200px] px-[clamp(20px,5vw,48px)]'>
          <div className='ssc-reveal max-w-[720px]'>
            <Eyebrow>Latest Insights</Eyebrow>
            <h2
              className='font-space-grotesk mt-5 font-bold leading-[1.04] tracking-[-0.02em]'
              style={{ fontSize: 'clamp(2rem,4.4vw,3.4rem)', color: 'var(--ssc-text-dark)' }}
            >
              Perspectives on sustainable business, marketing, and conservation.
            </h2>
          </div>

          {posts.length > 0 && (
            <div className='mt-[56px] grid gap-6 md:grid-cols-3'>
              {posts.map((post, i) => {
                const gradients = [
                  'linear-gradient(135deg,#0e2b38,#14515e)',
                  'linear-gradient(135deg,#14515e,#2bb7a3)',
                  'linear-gradient(135deg,#1d6f5f,#5fe3c9)',
                ]
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`ssc-reveal ${['d1','d2','d3'][i]} group flex flex-col overflow-hidden rounded-[var(--ssc-r)] border bg-white transition-all duration-[450ms] hover:-translate-y-[6px] hover:shadow-[0_36px_64px_-38px_rgba(10,30,41,.35)]`}
                    style={{ borderColor: 'var(--ssc-line-light)' }}
                  >
                    <div className='p-[26px_26px_0]'>
                      <div
                        className='flex h-[120px] items-end rounded-[14px] p-4'
                        style={{ background: gradients[i] }}
                      >
                        <span className='font-space-mono relative z-[1] text-[0.72rem] uppercase tracking-[0.16em] text-white'>
                          {post.tags?.[0] ?? 'Insights'}
                        </span>
                      </div>
                    </div>
                    <div className='flex flex-1 flex-col p-[22px_26px_30px]'>
                      <span
                        className='font-space-mono text-[0.74rem] tracking-[0.05em]'
                        style={{ color: 'var(--ssc-text-dark-mute)' }}
                      >
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <h3
                        className='font-space-grotesk mb-3 mt-[10px] text-[1.18rem] font-bold leading-[1.25] tracking-[-0.02em] transition-colors group-hover:text-[var(--ssc-teal)]'
                        style={{ color: 'var(--ssc-text-dark)' }}
                      >
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p
                          className='flex-1 text-[0.95rem] leading-[1.6]'
                          style={{ color: 'var(--ssc-text-dark-mute)' }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                      <span
                        className='mt-[18px] inline-flex items-center gap-[0.4em] text-[0.9rem] font-semibold'
                        style={{ color: 'var(--ssc-seafoam-deep)' }}
                      >
                        Read article <span aria-hidden='true'>→</span>
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
        <WaveDivider variant='ink' />
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section
        className='relative overflow-hidden text-center'
        style={{ isolation: 'isolate' }}
        id='contact'
      >
        <div
          ref={ctaBgRef}
          className='absolute inset-0 z-[-2] bg-cover bg-center will-change-transform'
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/34155535/pexels-photo-34155535.jpeg?auto=compress&cs=tinysrgb&w=2000')",
          }}
        />
        <div
          className='absolute inset-0 z-[-1]'
          style={{
            background:
              'radial-gradient(80% 120% at 50% 30%,rgba(7,21,29,.7),rgba(7,21,29,.92))',
          }}
        />
        <div
          className='mx-auto max-w-[1200px] px-[clamp(20px,5vw,48px)]'
          style={{ padding: 'clamp(90px,13vw,160px) clamp(20px,5vw,48px)' }}
        >
          <div className='ssc-reveal flex justify-center'>
            <Eyebrow center>Let&apos;s talk</Eyebrow>
          </div>
          <h2
            className='ssc-reveal d1 font-space-grotesk mx-auto mt-[18px] max-w-[880px] font-bold leading-[1.04] tracking-[-0.02em] text-white'
            style={{ fontSize: 'clamp(2.1rem,5vw,4rem)' }}
          >
            Ready to build marketing that matches your mission?
          </h2>
          <p
            className='ssc-reveal d2 mx-auto mt-6 max-w-[620px] leading-[1.7] opacity-[0.92]'
            style={{ fontSize: 'clamp(1.02rem,1.5vw,1.22rem)', color: 'var(--ssc-text-light)' }}
          >
            A no-obligation 30-minute call to find the biggest gaps in your marketing system. No pressure, no pitch. Just an honest conversation about what would move the needle.
          </p>
          <div className='ssc-reveal d3 mt-10'>
            <Link
              href='https://cal.com/chester-beard/30min'
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 rounded-full px-[1.6em] py-[0.95em] text-[0.98rem] font-semibold transition-all duration-300 hover:-translate-y-[3px]'
              style={{
                background: 'var(--ssc-seafoam)',
                color: 'var(--ssc-ink)',
                boxShadow: '0 10px 30px -10px rgba(95,227,201,.6)',
              }}
            >
              Schedule Your Free Call <span aria-hidden='true'>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
