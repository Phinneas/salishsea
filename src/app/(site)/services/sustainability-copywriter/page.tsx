import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import type { Metadata } from 'next'
import { SectionHero } from '@/components/site/SectionHero'
import { SectionCTA } from '@/components/site/SectionCTA'

export const metadata: Metadata = {
  title: 'Sustainability Copywriter | Salish Sea Consulting',
  description:
    'A sustainability copywriter verifies the claim before writing the sentence. ESG-aware copywriting for brands that need their messaging to hold up under scrutiny.',
  alternates: {
    canonical: '/services/sustainability-copywriter/',
  },
}

const comparisonRows = [
  {
    deliverable: 'Website copy',
    generalist: 'Writes brand voice and positioning',
    sustainability: 'Writes brand voice and verifies every sustainability claim against source data before it ships',
    risk: 'An unsupported claim on your homepage is a greenwashing liability',
  },
  {
    deliverable: 'Product / packaging copy',
    generalist: 'Highlights features and benefits',
    sustainability: 'Highlights features and benefits while confirming the claim matches what the product actually does end-to-end',
    risk: 'Recyclable labels on non-recyclable packaging have triggered $1.75M+ in settlements',
  },
  {
    deliverable: 'Email and newsletter',
    generalist: 'Writes for open rates and clicks',
    sustainability: 'Writes for open rates and clicks without overstating impact or using vague eco-language',
    risk: 'A single unsupported claim in a campaign email can become an exhibit in a regulatory action',
  },
  {
    deliverable: 'Sustainability report narrative',
    generalist: 'Ghostwrites from your notes',
    sustainability: 'Ghostwrites from your notes and cross-references claims against your actual data and reporting framework requirements',
    risk: "A narrative that doesn't match the data behind it is the most common audit finding",
  },
  {
    deliverable: 'Social copy',
    generalist: 'Writes platform-optimized captions',
    sustainability: 'Writes platform-optimized captions and flags language that could be read as a broader claim than the evidence supports',
    risk: 'Social posts are the #1 source of consumer greenwashing complaints',
  },
  {
    deliverable: 'Brand voice and messaging guide',
    generalist: 'Defines tone, vocabulary, and personality',
    sustainability: 'Defines tone, vocabulary, and personality plus a claim-verification framework your team can use after the engagement ends',
    risk: 'Without a verification framework, every new piece of copy is a new liability',
  },
]

const checklist = [
  'Can I point to the specific data behind this claim?',
  'Would this claim hold up if a regulator read it the way a consumer would?',
  'Am I stating what the evidence supports, or what I wish it supported?',
  'Does this language apply to the whole product, or just a component?',
  'Have I checked this claim against the actual system it describes (the recycling stream, the supply chain, the emissions data)?',
]

const faqItems = [
  {
    q: 'What is the difference between a sustainability copywriter and a regular copywriter?',
    a: 'A regular copywriter writes for clarity, persuasion, and brand voice. A sustainability copywriter does all of that and also verifies every claim against source data before it ships. The difference is a verification step: a regular copywriter can write "recyclable packaging" because it sounds good, and a sustainability copywriter checks whether the packaging is actually recyclable in the markets where the product is sold.',
  },
  {
    q: 'How do you avoid greenwashing claims in copy?',
    a: 'The short version: verify the claim before you write the sentence, not the reverse. Every sustainability claim in the copy I write is backed by a specific, checkable fact. If the evidence supports a narrow claim, I write a narrow claim. If the evidence is not there, I flag it. The goal is language that would survive being read by a regulator or a customer who does their own research.',
  },
  {
    q: 'Do you write ESG and sustainability reports?',
    a: 'Yes. I write the narrative sections of sustainability reports, impact reports, and ESG disclosures. I also write investor-facing ESG communications, consumer-facing sustainability messaging, and stakeholder briefings. If the document needs to communicate sustainability performance to a specific audience, that is in scope.',
  },
  {
    q: 'What industries do you work with?',
    a: 'I work with brands in the $5-50M range across consumer products, food and beverage, fashion, outdoor and CPG, clean energy, and B2B services. The common thread is not the industry. It is that the brand is doing real sustainability work and needs the copy to reflect that without overstating it.',
  },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Sustainability Copywriting',
  description:
    'ESG-aware copywriting that verifies every sustainability claim before it ships. Website copy, product copy, sustainability reports, brand voice guides, and more.',
  provider: {
    '@type': 'ProfessionalService',
    name: 'Salish Sea Consulting',
    url: 'https://www.salishseaconsulting.com',
  },
  areaServed: 'US',
  serviceType: 'Sustainability Copywriting',
  url: 'https://www.salishseaconsulting.com/services/sustainability-copywriter/',
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

export default function SustainabilityCopywriterPage() {
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
        title='Sustainability Copywriter'
        subtitle='A sustainability copywriter verifies the claim before writing the sentence. If your copy needs to hold up under scrutiny, that verification step is the difference between messaging that earns trust and messaging that creates liability.'
      >
        <p className='mt-4' style={{ color: 'var(--ssc-text-mute)', opacity: 0.7 }}>
          ESG-aware copywriting for brands that have done the work and need the words to reflect it.
        </p>
      </SectionHero>

      {/* What a sustainability copywriter actually does */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>What a sustainability copywriter actually does</h2>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            A sustainability copywriter is a copywriter who works at the intersection of brand communication and claim verification. The job is not just writing clear, persuasive copy. It is writing clear, persuasive copy where every sustainability claim has been checked against the data, the regulatory standard, and the system the claim describes.
          </p>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            That distinction matters because the cost of getting a sustainability claim wrong is not a style problem. It is a liability. Greenwashing enforcement no longer requires intent. Regulators ask whether a reasonable consumer would form a false impression. A generalist copywriter can write the words. A sustainability copywriter makes sure the words are defensible before they ship.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-6xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>Sustainability copywriter vs. general copywriter</h2>
          <p className='mt-2 mb-10' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            The difference is not talent. It is a verification step that most generalists are not trained to do.
          </p>
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm' style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--ssc-line-light)' }}>
                  <th className='pb-3 pr-4 font-serif font-bold' style={{ color: 'var(--ssc-text-dark)' }}>Deliverable</th>
                  <th className='pb-3 pr-4 font-serif font-bold' style={{ color: 'var(--ssc-text-dark)' }}>General copywriter</th>
                  <th className='pb-3 pr-4 font-serif font-bold' style={{ color: 'var(--ssc-text-dark)' }}>Sustainability copywriter</th>
                  <th className='pb-3 font-serif font-bold' style={{ color: 'var(--ssc-text-dark)' }}>What is at risk without verification</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--ssc-line-light)' }}>
                    <td className='py-4 pr-4 font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>{row.deliverable}</td>
                    <td className='py-4 pr-4' style={{ color: 'var(--ssc-text-dark-mute)' }}>{row.generalist}</td>
                    <td className='py-4 pr-4' style={{ color: 'var(--ssc-text-dark)' }}>{row.sustainability}</td>
                    <td className='py-4' style={{ color: 'var(--ssc-text-dark-mute)' }}>{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why this is a different discipline */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>Why this is a different discipline</h2>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            In most copywriting, the worst outcome of a bad sentence is a missed conversion. In sustainability copywriting, the worst outcome is a regulatory action, a settlement, or a brand crisis. The wrong word choice here is not a style problem. It is a liability.
          </p>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Greenwashing enforcement has shifted. Regulators no longer ask whether a company intended to deceive. They ask whether a reasonable consumer would form a false impression. That means every sustainability claim in your copy is being read against a standard most generalist copywriters are not aware of. The verification step is not optional. It is the job.
          </p>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <Link href='/blog/what-greenwashing-actually-is/' style={{ color: 'var(--ssc-seafoam-deep)' }}>
              Read the full breakdown of what greenwashing actually is and how enforcement works now
            </Link>
          </p>
        </div>
      </section>

      {/* 5-point checklist */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>The greenwashing-avoidance checklist</h2>
          <p className='mt-2 mb-8' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Every piece of sustainability copy I write passes through these five questions. If a claim cannot clear all five, it does not ship.
          </p>
          <ol className='space-y-4'>
            {checklist.map((item, i) => (
              <li key={i} className='flex items-start gap-3'>
                <span
                  className='mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-space-mono text-xs font-bold'
                  style={{ background: 'var(--ssc-seafoam)', color: 'var(--ssc-ink)' }}
                >
                  {i + 1}
                </span>
                <span className='leading-relaxed' style={{ color: 'var(--ssc-text-dark)' }}>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Deliverables breakdown */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>What is included</h2>
          <p className='mt-2 mb-8' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Every deliverable includes the verification step. That is what you are paying for.
          </p>
          <div className='space-y-6'>
            {[
              { title: 'Website copy', desc: 'Full website copywriting with every sustainability claim verified against your source data. Includes Home, About, Services, and any sustainability-focused landing pages.' },
              { title: 'Product and packaging copy', desc: 'Product descriptions, packaging copy, and claims that match what the product actually does end-to-end. Not just what the marketing team hopes it does.' },
              { title: 'Email and newsletter', desc: 'Campaign copy, nurture sequences, and newsletter content that communicates your sustainability work without overstating it.' },
              { title: 'Sustainability and impact report narrative', desc: 'The narrative sections of your sustainability report, written to match your data and your reporting framework. Not ghostwritten from a template.' },
              { title: 'Social copy', desc: 'Platform-optimized captions and social content that flags language that could be read as a broader claim than the evidence supports.' },
              { title: 'Brand voice and messaging guide', desc: 'Tone, vocabulary, and personality plus a claim-verification framework your team can use after the engagement ends. So every future piece of copy has the same protection.' },
            ].map((item, i) => (
              <div key={i} className='flex items-start gap-3'>
                <CheckCircle className='mt-0.5 h-5 w-5 shrink-0' style={{ color: 'var(--ssc-seafoam-deep)' }} />
                <div>
                  <h3 className='font-serif font-bold' style={{ color: 'var(--ssc-text-dark)' }}>{item.title}</h3>
                  <p className='mt-1 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>How we work</h2>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            The process is simple: verify the claim, then write the sentence. Not the reverse.
          </p>
          <ol className='mt-8 space-y-6'>
            {[
              { step: 'Discovery', desc: 'I learn what your brand actually does, what data you have, and what claims you want to make.' },
              { step: 'Claim audit', desc: 'I map every sustainability claim you want to make against your source data, your reporting framework, and the regulatory standard it will be read against.' },
              { step: 'Write', desc: 'I write the copy. Every claim has already been verified. The writing is the easy part when the foundation is solid.' },
              { step: 'Review', desc: 'You review the copy. I flag any changes that would introduce an unsupported claim. One round of revisions is included.' },
            ].map((item, i) => (
              <li key={i} className='flex items-start gap-4'>
                <span
                  className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-space-mono text-sm font-bold'
                  style={{ background: 'var(--ssc-seafoam)', color: 'var(--ssc-ink)' }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className='font-serif font-bold' style={{ color: 'var(--ssc-text-dark)' }}>{item.step}</h3>
                  <p className='mt-1 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* When should you hire */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>When should you hire a sustainability copywriter instead of a generalist?</h2>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            If your brand makes sustainability claims in any customer-facing channel, you need a copywriter who understands the verification standard those claims will be held to. That is especially true if:
          </p>
          <ul className='mt-6 space-y-3'>
            {[
              'Your brand is in the $5-50M range and sustainability is part of your positioning, not a footnote',
              'You sell into markets where greenwashing enforcement is active (the EU, California, Australia, the UK)',
              'You have had a claim challenged or you are worried one could be',
              'Your team writes sustainability copy but nobody owns the verification step',
              'You are preparing a sustainability report or ESG disclosure and the narrative needs to match the data',
            ].map((item, i) => (
              <li key={i} className='flex items-start gap-3'>
                <CheckCircle className='mt-0.5 h-5 w-5 shrink-0' style={{ color: 'var(--ssc-seafoam-deep)' }} />
                <span className='leading-relaxed' style={{ color: 'var(--ssc-text-dark)' }}>{item}</span>
              </li>
            ))}
          </ul>
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

      {/* Why Salish Sea Consulting */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>Why Salish Sea Consulting</h2>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            I wrote the research this service is built on.{' '}
            <Link href='/blog/what-greenwashing-actually-is/' style={{ color: 'var(--ssc-seafoam-deep)' }}>
              What Greenwashing Actually Is
            </Link>{' '}
            breaks down the enforcement shift that makes verification non-negotiable.{' '}
            <Link href='/blog/the-sustainable-brand-voice/' style={{ color: 'var(--ssc-seafoam-deep)' }}>
              The Sustainable Brand Voice
            </Link>{' '}
            covers the communication framework. This page is where that analysis becomes a deliverable.
          </p>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            You work with me directly. No account manager. No junior copywriter on the actual deliverable. One person who knows your brand and stays on the account through the engagement.
          </p>
          <p className='mt-4 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <Link href='/about/' style={{ color: 'var(--ssc-seafoam-deep)' }}>
              More about the practice
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <SectionCTA
        title="Ready to make your sustainability copy defensible?"
        subtitle="Book a call to talk through what you need, or start with the free guides if you are not ready to reach out yet."
        href="https://cal.com/chester-beard/30min"
        label="Book a call"
        external
      />
    </div>
  )
}