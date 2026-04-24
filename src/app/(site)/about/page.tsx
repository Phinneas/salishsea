import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Chester Beard is a conversion copywriter and marketing strategist with 20 years of experience helping mission-driven sustainable brands turn their values into conversions.'
}

const credentials = [
  {
    label: 'Environmental Leadership',
    detail:
      'Former Executive Council member, Sierra Club Washington. Photographer for The Nature Conservancy. Deep roots in the environmental movement and a first-hand understanding of what messaging truly resonates with conscious consumers.',
  },
  {
    label: 'Audience Building',
    detail:
      'My writing on sustainable business has reached over one million readers. My combined audience across Medium, LinkedIn, YouTube, and email subscribers exceeds 24,000 — proof that I know how to capture the attention of this specific audience.',
  },
  {
    label: 'Marketing & Business Ownership',
    detail:
      '20 years of marketing experience and 19 years running my own small business. I understand the real-world technical and financial challenges you face every day — not just the theory.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className='bg-gradient-to-br from-teal-950 to-slate-900 px-4 py-20 text-white sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>About Chester Beard</h1>
          <p className='mt-4 text-lg text-teal-100/80'>
            Conversion copywriter. Marketing strategist. Environmental advocate.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className='px-4 py-20 sm:px-6'>
        <div className='mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground'>
          <p className='text-lg text-foreground font-medium leading-relaxed'>
            I&apos;m Chester Beard — a conversion copywriter and marketing strategist with a passion for
            sustainability. For over 20 years, I&apos;ve helped mission-driven brands turn their values into
            conversions, without the chaos of juggling multiple vendors who don&apos;t understand your goals.
          </p>

          <h2 className='pt-4 text-2xl font-bold text-foreground'>My Background</h2>
          <p>
            My journey began in environmental leadership, where I served as a former Executive Council member for
            Sierra Club Washington and contributed as a photographer for The Nature Conservancy. These experiences
            gave me a deep understanding of the environmental movement and what messaging truly resonates with
            conscious consumers.
          </p>
          <p>
            I didn&apos;t stop there. I&apos;ve spent the last two decades building my own audience, with my
            writing on sustainable business reaching over one million readers. I&apos;ve also run my own small
            business for 19 years — giving me firsthand insight into the technical and financial challenges you
            face every day.
          </p>

          <h2 className='pt-4 text-2xl font-bold text-foreground'>My Approach</h2>
          <p>
            Most consultants specialize in either copywriting or technology. I do both. I create custom marketing
            tools — from search catalogs to CRM automation — designed to reflect your sustainable values and guide
            your audience toward meaningful action.
          </p>
          <p>
            My copywriting isn&apos;t just compelling — it&apos;s perfectly synchronized with your technology,
            ensuring your message resonates at every touchpoint. The result is one seamless system instead of a
            patchwork of vendors pulling in different directions.
          </p>

          <h2 className='pt-4 text-2xl font-bold text-foreground'>Why Work With Me?</h2>
          <p>
            Because I understand the unique challenges of sustainable brands. I know what it takes to secure grant
            funding, build loyal audiences, and create marketing systems that work as seamlessly as your mission.
            I don&apos;t just talk about sustainability — I live it, and I bring that commitment to every project I
            take on.
          </p>
        </div>
      </section>

      {/* Credentials */}
      <section className='bg-muted/20 px-4 py-16 sm:px-6'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-8 text-2xl font-bold tracking-tight'>
            A Unique Foundation — Not Just Theory
          </h2>
          <p className='mb-8 text-muted-foreground'>
            Most consultants can do one of these. I do all three — and that&apos;s what allows me to build
            solutions where the tech and the mission work together seamlessly.
          </p>
          <div className='space-y-6'>
            {credentials.map(cred => (
              <div key={cred.label} className='rounded-lg border border-border/50 bg-background p-6'>
                <h3 className='mb-2 font-semibold text-foreground'>{cred.label}</h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>{cred.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='px-4 py-16 sm:px-6'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-2xl font-bold tracking-tight'>Let&apos;s Connect</h2>
          <p className='mt-3 text-muted-foreground leading-relaxed'>
            If you&apos;re ready to build marketing that aligns with your mission, I&apos;d love to hear from
            you. Schedule a call to discuss how we can create a system that amplifies your impact.
          </p>
          <Button asChild size='lg' className='mt-8 bg-teal-600 hover:bg-teal-700'>
            <Link href='https://cal.com/chester-beard/30min' target='_blank' rel='noopener noreferrer'>
              Schedule a Call <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
