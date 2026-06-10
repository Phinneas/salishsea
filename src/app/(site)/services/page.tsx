import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Globe, Rocket, Calendar, FileText, BarChart3, BookOpen, Scroll } from 'lucide-react'
import type { Metadata } from 'next'
import { SectionHero } from '@/components/site/SectionHero'
import { SectionCTA } from '@/components/site/SectionCTA'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Sustainable brand copywriting, sustainability research reports, and grant writing for purpose-driven organizations. See all services and pricing from Salish Sea Consulting.',
}

const brandCopywriting = [
  {
    icon: Globe,
    title: 'Website Bundle',
    price: '$3,500',
    bestFor: 'brands launching, rebranding, or finally getting their story straight online.',
    description:
      "Full website copywriting — typically 5–7 pages including Home, About, Services, and Contact. Includes a discovery call, one round of revisions, and a brand voice guide so your copy stays consistent long after we're done working together.",
    badge: 'Most Popular',
  },
  {
    icon: Rocket,
    title: 'Launch Package',
    price: '$2,800',
    bestFor: 'product launches, rebrands, and campaign moments that need to land.',
    description:
      "Copy for a specific launch or campaign: landing pages, launch emails, social captions, and supporting materials. Everything you need to make your moment count — written in a voice that's unmistakably yours.",
    badge: null,
  },
  {
    icon: Calendar,
    title: 'Monthly Retainer',
    price: '$2,200/month',
    bestFor: 'brands that need a consistent, sustainability-fluent voice on an ongoing basis.',
    description:
      'A monthly partnership for brands that are always communicating — website updates, blog content, email newsletters, campaign copy, and more. Priority scheduling, no project minimums, and a collaborator who knows your brand as well as you do.',
    badge: 'Retainer',
  },
]

const researchReports = [
  {
    icon: FileText,
    title: 'Impact Report',
    price: '$5,000',
    bestFor: 'annual or milestone impact reports for organizations ready to account for their progress publicly.',
    description:
      "Research, narrative development, and full copy for your impact report — structured to tell your sustainability story with honesty and intention. Includes data synthesis, stakeholder-appropriate framing, and a document that you're genuinely proud to put your name on.",
    badge: null,
  },
  {
    icon: BarChart3,
    title: 'ESG Communications',
    price: '$3,200',
    bestFor: 'organizations communicating ESG performance to investors and key stakeholders.',
    description:
      'Copy and communications strategy for ESG-related content: investor letters, sustainability disclosures, stakeholder briefings, and supporting materials. Written to meet the expectations of sophisticated audiences without losing the human behind the data.',
    badge: null,
  },
  {
    icon: BookOpen,
    title: 'White Paper',
    price: '$2,200',
    bestFor: 'research-backed thought leadership for organizations with a point of view worth publishing.',
    description:
      'A fully researched and written white paper positioned to establish authority in your space. Includes secondary research, argument development, and final copy — ready for download, distribution, or press.',
    badge: null,
  },
  {
    icon: Scroll,
    title: 'Power Prospectus',
    price: '$750',
    bestFor: 'funding conversations, partnership pitches, or stakeholder introductions.',
    description:
      "One tight, high-impact document — 4–8 pages — that says everything essential and nothing extra. Perfect for grant applications, investor decks, or first-impression moments.",
    badge: 'Quick Win',
  },
]

function ServiceCard({ service }: { service: typeof brandCopywriting[number] | typeof researchReports[number] }) {
  const Icon = service.icon
  return (
    <article
      className='group relative flex flex-col overflow-hidden rounded-[var(--ssc-r)] border bg-white p-[38px_32px_34px] transition-all duration-[450ms] hover:-translate-y-[8px] hover:shadow-[0_40px_70px_-38px_rgba(10,30,41,.4)] hover:border-transparent'
      style={{ borderColor: 'var(--ssc-line-light)' }}
    >
      {service.badge && (
        <Badge
          className='absolute -top-2.5 left-5 text-xs text-white'
          style={{ background: 'var(--ssc-seafoam-deep)' }}
        >
          {service.badge}
        </Badge>
      )}
      <div
        className='mb-6 grid h-[56px] w-[56px] place-items-center rounded-[15px]'
        style={{ background: 'linear-gradient(140deg,#0e2b38,#14515e)', color: 'var(--ssc-seafoam)' }}
      >
        <Icon className='h-7 w-7' />
      </div>
      <h3 className='font-serif mb-3 text-[1.18rem] font-bold leading-[1.04] tracking-[-0.02em]' style={{ color: 'var(--ssc-text-dark)' }}>
        {service.title}
      </h3>
      <p className='text-sm font-medium' style={{ color: 'var(--ssc-seafoam-deep)' }}>Best for: {service.bestFor}</p>
      <p className='mt-3 flex-1 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{service.description}</p>
      <div className='mt-auto border-t pt-4' style={{ borderColor: 'var(--ssc-line-light)' }}>
        <p className='font-serif text-base font-bold' style={{ color: 'var(--ssc-text-dark)' }}>{service.price}</p>
      </div>
    </article>
  )
}

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <SectionHero
        eyebrow='Services'
        title='Words that move sustainability forward.'
        subtitle="Salish Sea Consulting writes the copy, reports, and research that help purpose-driven organizations communicate with clarity — and earn the trust they've worked hard to deserve."
      >
        <p className='mt-4' style={{ color: 'var(--ssc-text-mute)', opacity: 0.7 }}>
          Whether you&apos;re a brand building sustainability into your identity from day one, an organization ready to report on your impact, or a mission-driven team seeking funding — the right words make the difference. Here&apos;s how we work together.
        </p>
      </SectionHero>

      {/* Sustainable Brand Copywriting */}
      <section id='brand-copywriting' className='px-4 py-20 sm:px-6 scroll-mt-20' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-10'>
            <h2 className='font-serif text-2xl font-bold tracking-tight'>Sustainable Brand Copywriting</h2>
            <p className='mt-2' style={{ color: 'var(--ssc-text-dark-mute)' }}>
              For brands that lead with purpose — and need copy that holds up to scrutiny.
            </p>
          </div>
          <p className='mb-10 max-w-3xl leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Sustainability copywriting isn&apos;t greenwashing patrol. It&apos;s building a voice that&apos;s honest, specific, and genuinely compelling — copy that earns attention because it deserves it. I write for brands who&apos;ve done the work and are ready to say so.
          </p>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {brandCopywriting.map(service => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
          <div className='mt-10 text-center'>
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
              Let&apos;s Talk <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* Sustainability Research Reports */}
      <section id='research-reports' className='px-4 py-20 sm:px-6 scroll-mt-20' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-10'>
            <h2 className='font-serif text-2xl font-bold tracking-tight'>Sustainability Research Reports</h2>
            <p className='mt-2' style={{ color: 'var(--ssc-text-dark-mute)' }}>
              Credibility-building documents for organizations with a story backed by data.
            </p>
          </div>
          <p className='mb-10 max-w-3xl leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Impact doesn&apos;t speak for itself — it needs a translator. I research, write, and shape sustainability reports that meet stakeholders where they are: clear enough for a general audience, rigorous enough for the room that matters.
          </p>
          <div className='grid gap-8 md:grid-cols-2'>
            {researchReports.map(service => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
          <div className='mt-10 text-center'>
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
              Start a Project <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* Grant Writing */}
      <section id='grant-writing' className='px-4 py-20 sm:px-6 scroll-mt-20' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>Grant Writing</h2>
          <p className='mt-2' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            A retained specialty — for the right partnership.
          </p>
          <p className='mt-6 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Grant writing is among the most specialized work I do, and I approach it selectively. I bring grant writing expertise to long-term client relationships — particularly for sustainability-focused organizations navigating complex funding landscapes. If you&apos;re exploring grant opportunities and looking for a collaborator who already understands your mission deeply, I&apos;d love to hear where you are in the process.
          </p>
          <Link
            href='https://cal.com/chester-beard/30min'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-8 inline-flex items-center gap-2 rounded-full px-[1.6em] py-[0.95em] text-[0.98rem] font-semibold transition-all duration-300 hover:-translate-y-[3px]'
            style={{
              background: 'var(--ssc-seafoam)',
              color: 'var(--ssc-ink)',
              boxShadow: '0 10px 30px -10px rgba(95,227,201,.6)',
            }}
          >
            Get in Touch <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </div>
      </section>

      {/* Salish Sea Creatives Callout */}
      <section className='px-4 py-12 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-2xl text-center'>
          <h3 className='font-serif text-lg font-semibold tracking-tight'>Writing a book? Building an author platform?</h3>
          <p className='mt-2 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Salish Sea Creatives is a sister studio focused exclusively on web design for authors and creative professionals — built for the moment when your writing career needs a home online that&apos;s as intentional as your work.
          </p>
          <Link
            href='https://www.instagram.com/salishseacreatives'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-4 inline-flex items-center text-sm font-semibold transition-colors'
            style={{ color: 'var(--ssc-seafoam-deep)' }}
          >
            Explore Salish Sea Creatives <ArrowRight className='ml-1 h-3.5 w-3.5' />
          </Link>
        </div>
      </section>
    </div>
  )
}
