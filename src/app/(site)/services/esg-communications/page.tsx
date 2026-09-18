import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { SectionHero } from '@/components/site/SectionHero'
import { SectionCTA } from '@/components/site/SectionCTA'

export const metadata: Metadata = {
  title: 'ESG Communications Agency | Salish Sea Consulting',
  description:
    'ESG communications that reach the audiences that matter. Stakeholder-specific messaging for investors, customers, and partners. Not a generic sustainability report.',
  alternates: {
    canonical: '/services/esg-communications/',
  },
}

const services = [
  {
    title: 'ESG communications audit',
    price: '$3,500',
    desc: 'I score your current materials against the three failure modes that trip up most companies: investor, customer, and partner messaging. You get a prioritized fix list, not a 40-page report nobody reads.',
  },
  {
    title: 'Investor-facing messaging',
    price: '$5,000',
    desc: 'I lead with the handful of metrics investors actually weight, not the ones that feel comprehensive. Investor letters, ESG data sheets, and stakeholder briefings written for the room that reads them.',
  },
  {
    title: 'Consumer-facing messaging',
    price: '$3,500',
    desc: 'Brand voice and claims that hold up under an ASA or FTC review. Sustainability messaging that earns trust without creating liability.',
  },
  {
    title: 'Crisis response',
    price: 'Custom quote',
    desc: 'Fast-turn messaging when a claim gets challenged or a rule shifts. Available as a standalone engagement or as part of an ongoing relationship.',
  },
]

const faqItems = [
  {
    q: 'What is ESG communication?',
    a: "ESG communication is how a company shares its environmental, social, and governance performance with the people who rely on it: investors, customers, and business partners. It is not a single document. It is stakeholder-specific messaging built from the same underlying data, shaped for each audience's decision-making needs.",
  },
  {
    q: 'How is ESG communication different from a sustainability report?',
    a: 'A sustainability report is one deliverable. ESG communication is the strategy behind all your sustainability-related messaging. Most companies write one report and try to serve three audiences. That is why most ESG communications fail. Investors need metrics and risk framing. Customers need claims they can trust. Partners need supply chain specifics. One document cannot do all three well.',
  },
  {
    q: 'What does an ESG communications audit include?',
    a: 'I score your existing materials against the three failure modes: investor messaging that lacks the metrics investors actually weight, customer messaging that makes claims the evidence does not support, and partner messaging that skips the supply chain specifics. You get a scored assessment plus a prioritized fix list.',
  },
  {
    q: 'Do you write ESG reports?',
    a: 'Yes. I write the narrative sections of ESG disclosures, sustainability reports, and impact reports. But I also write the investor letters, customer-facing sustainability pages, and stakeholder briefings that most companies leave to whoever is available. The report is one piece. The communications strategy is the work.',
  },
  {
    q: 'How much does ESG communications consulting cost?',
    a: 'Most engagements start with the audit plus one messaging track, in the $5,000 to $7,500 range. That is a fraction of what a full-service agency charges for the same scope, because you are working with me directly. No account manager. No junior copywriter on the actual deliverable.',
  },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'ESG Communications',
  description:
    'Stakeholder-specific ESG messaging for investors, customers, and business partners. Audits, investor-facing messaging, consumer-facing messaging, and crisis response.',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Salish Sea Consulting',
    url: 'https://www.salishseaconsulting.com',
  },
  areaServed: 'US',
  serviceType: 'ESG Communications Consulting',
  url: 'https://www.salishseaconsulting.com/services/esg-communications/',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

export default function ESGCommunicationsPage() {
  return (
    <div>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <SectionHero
        eyebrow='Services'
        title='ESG Communications'
        subtitle='I help sustainable brands turn ESG data into messaging that actually reaches investors, customers, and partners. Not a generic sustainability report. Not a one-size narrative that tries to serve three audiences at once and serves none of them well.'
      >
        <p className='mt-4' style={{ color: 'var(--ssc-text-mute)', opacity: 0.7 }}>
          Stakeholder-specific messaging built from the same underlying data, shaped for each audience&apos;s decision-making needs.
        </p>
      </SectionHero>

      {/* Why most ESG communications fail */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>Why most ESG communications fail</h2>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Most ESG communications are built as a single document for three different readers with three different jobs. Investors need metrics and risk framing. Customers need claims they can trust. Partners need supply chain specifics. One document cannot do all three well, and the result is a report that serves none of them.
          </p>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            I fix that by building stakeholder-specific messaging from the start. Same underlying data. Different framing for each audience. Each piece is written for the person who actually reads it.
          </p>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <Link href='/blog/why-esg-communications-fall-flat/' style={{ color: 'var(--ssc-seafoam-deep)' }}>
              Read the full breakdown of why ESG communications fall flat with the audiences that matter most
            </Link>
          </p>
        </div>
      </section>

      {/* What I deliver */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-6xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>What I deliver</h2>
          <p className='mt-2 mb-10' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Most engagements start with the audit plus one messaging track, in the $5,000 to $7,500 range.
          </p>
          <div className='grid gap-8 md:grid-cols-2'>
            {services.map((service, i) => (
              <article
                key={i}
                className='group relative flex flex-col overflow-hidden rounded-[var(--ssc-r)] border bg-white p-[38px_32px_34px] transition-all duration-[450ms] hover:-translate-y-[8px] hover:shadow-[0_40px_70px_-38px_rgba(10,30,41,.4)] hover:border-transparent'
                style={{ borderColor: 'var(--ssc-line-light)' }}
              >
                <h3 className='font-serif mb-3 text-[1.18rem] font-bold leading-[1.04] tracking-[-0.02em]' style={{ color: 'var(--ssc-text-dark)' }}>
                  {service.title}
                </h3>
                <p className='mt-3 flex-1 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{service.desc}</p>
                <div className='mt-auto border-t pt-4' style={{ borderColor: 'var(--ssc-line-light)' }}>
                  <p className='font-serif text-base font-bold' style={{ color: 'var(--ssc-text-dark)' }}>{service.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why boutique */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>Why work with a boutique consultancy instead of an agency</h2>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Bigger agencies bill for a layer of people you never talk to. I do the audit, write the messaging, and stay on the account through crisis response if you need it. You get one person who knows your brand, not a rotating team relearning it each quarter.
          </p>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            The research behind this service is mine.{' '}
            <Link href='/blog/why-esg-communications-fall-flat/' style={{ color: 'var(--ssc-seafoam-deep)' }}>
              Why ESG Communications Fall Flat
            </Link>{' '}
            breaks down what investors, customers, and partners actually need from your sustainability communications, and why the standard omnibus ESG report serves none of them well. This page is where that analysis becomes a deliverable.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>Frequently asked questions</h2>
          <div className='mt-8 space-y-8'>
            {faqItems.map((item, i) => (
              <div key={i}>
                <h3 className='font-serif text-lg font-bold' style={{ color: 'var(--ssc-text-dark)' }}>{item.q}</h3>
                <p className='mt-2 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SectionCTA
        title="If your ESG communications are not landing with the people who matter"
        subtitle="Book a call to talk through what you need, or start with the free guides if you are not ready to reach out yet."
        href="https://cal.com/chester-beard/30min"
        label="Book a call"
        external
      />
    </div>
  )
}