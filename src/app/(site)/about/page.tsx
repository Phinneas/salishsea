import type { Metadata } from 'next'
import { SectionHero } from '@/components/site/SectionHero'
import { SectionCTA } from '@/components/site/SectionCTA'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Chester Beard — sustainability copywriter and researcher with 20 years inside the sustainable business world. Brand copywriting, sustainability research reports, and grant writing for purpose-driven organizations.',
}

const credentials = [
  {
    label: 'Sierra Club Executive Council, Washington State',
    detail:
      "Not an advisory role. Not a committee seat. The Executive Council — the governing body of one of North America's most respected environmental organizations in its most environmentally active state. I understand sustainability advocacy from the inside, which means I understand what rigorous environmental commitment actually looks like versus what it just sounds like.",
  },
  {
    label: '1 million+ article reads on sustainable business',
    detail:
      "A body of published work on sustainable business read by over a million people. This isn't a portfolio of client content — it's independent writing, built on research and earned by relevance. It means I've spent years figuring out what sustainability audiences actually read, share, and act on.",
  },
  {
    label: '24,000+ engaged audience',
    detail:
      "An audience built on substance, not spectacle — people who follow because the thinking is worth following. It also means I understand how sustainability content performs in the real world, not just how it reads on a brief.",
  },
  {
    label: '20 years of experience',
    detail:
      'Long enough to have watched every trend in sustainable marketing arrive, peak, and either prove out or collapse. Long enough to know what works, what just looks like it works, and what your audience has already learned to distrust.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <SectionHero
        eyebrow='About'
        title='Not every writer understands what moves people who actually care.'
        subtitle="I've spent 20 years inside the sustainable business world — not observing it from the outside. That's the difference."
      />

      {/* Why Sustainable Brands Specifically */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-8 text-2xl font-bold tracking-tight'>
            Why sustainable brands, specifically.
          </h2>
          <div className='space-y-6 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <p>
              Sustainability communications is harder than conventional marketing.
              Your audience has done the research. They can smell greenwashing from a paragraph away. They know the difference
              between a brand that&apos;s made operational changes and one that just found a better way to talk about doing nothing.
              Earning their trust isn&apos;t a messaging problem — it&apos;s a credibility problem. And credibility can&apos;t be
              written. It can only be reflected.
            </p>
            <p>
              That&apos;s why I work exclusively with sustainable brands. Not because it&apos;s a good niche, but because this is
              the work I actually know how to do. I understand your audience from the inside — the values they hold, the skepticism
              they carry, and exactly what it takes to move them from curious to convinced.
            </p>
            <p>
              When your communications come from someone who genuinely understands what you&apos;re building, it shows. Every time.
            </p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* Credentials */}
      <section className='px-4 py-16 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-4 text-2xl font-bold tracking-tight'>
            The work behind the work.
          </h2>
          <p className='mb-8' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Two decades in sustainable business — in the field, in the writing, and at the table where decisions get made.
          </p>
          <div className='space-y-6'>
            {credentials.map(cred => (
              <div key={cred.label} className='rounded-[var(--ssc-r)] border bg-white p-6' style={{ borderColor: 'var(--ssc-line-light)' }}>
                <h3 className='font-serif mb-2 font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>{cred.label}</h3>
                <p className='text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>{cred.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* The Integration Argument */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-8 text-2xl font-bold tracking-tight'>
            Why copy and research from the same mind changes everything.
          </h2>
          <div className='space-y-6 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <p>
              Most organizations have to hire separately for this: a copywriter who can tell the story, and a researcher or
              consultant who can build the evidence base. The problem is that these two things rarely talk to each other the way
              they should. The copy goes one direction. The data goes another. The result is communications that feel internally
              inconsistent — persuasive in some places, credible in others, but never fully both at once.
            </p>
            <p>
              I write the copy and I do the research. Not as two separate services that happen to be available from the same
              person — but as a single integrated process, because that&apos;s how the best sustainability communications actually work.
            </p>
            <p>
              The argument your brand makes publicly and the evidence that backs it up need to come from the same understanding
              of what your audience cares about, what they&apos;ll scrutinize, and what will move them. When they do, your website
              and your impact report don&apos;t feel like they were made by different teams. They feel like they&apos;re telling the
              same true story, in the same voice, with the same confidence.
            </p>
            <p className='font-medium' style={{ color: 'var(--ssc-text-dark)' }}>
              That integration is what I offer. It&apos;s harder to find than either skill alone.
            </p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* Pacific Northwest Context */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-8 text-2xl font-bold tracking-tight'>
            Built in the most sustainability-conscious market in North America.
          </h2>
          <div className='space-y-6 leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <p className='font-serif text-lg font-medium' style={{ color: 'var(--ssc-text-dark)' }}>
              The Pacific Northwest isn&apos;t just a location. It&apos;s a proving ground.
            </p>
            <p>
              This region — the Salish Sea corridor from Vancouver to Portland — is home to the most sophisticated, most
              discerning, most sustainability-literate consumer market on the continent. This is where B Corps are clustered,
              where outdoor brands have had their environmental commitments interrogated in public for decades, where consumers
              have been comparing supply chain transparency since before it was a mainstream expectation.
            </p>
            <p>
              Writing and researching sustainability communications in this market means your standards are set by the hardest
              audience in the game. What works here works everywhere. What doesn&apos;t gets exposed here first.
            </p>
            <p>
              I&apos;m not visiting this world. I&apos;m embedded in it — and that means the communications I build for your brand
              have been stress-tested against the most demanding sustainability audience there is.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <SectionCTA
        title="If this sounds like the kind of thinking your brand needs, let's find out."
        subtitle='Book a 30-minute call. No pitch, no pressure — just a conversation about where your communications are and where they could go.'
        href='https://cal.com/chester-beard/30min'
        label='Book a 30-Minute Call'
        external
      />
    </div>
  )
}
