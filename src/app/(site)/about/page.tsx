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
      'My writing has reached over one million readers. Building an audience of 24,000 across Medium, LinkedIn, YouTube, and email from scratch is proof I understand how attention works — and how to build it for you.',
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
        <div className='mx-auto max-w-5xl'>
          <div className='grid gap-12 lg:grid-cols-[280px_1fr] lg:items-start'>
            {/* Headshot */}
            <div className='flex justify-center lg:justify-start'>
              <div className='h-80 w-64 overflow-hidden rounded-2xl shadow-lg lg:h-96 lg:w-72'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='/chester-beard.jpg'
                  alt='Chester Beard — Salish Sea Consulting'
                  className='h-full w-full object-cover object-top'
                />
              </div>
            </div>
            {/* Text */}
            <div className='space-y-6 text-base leading-relaxed text-muted-foreground'>
          <p className='text-lg text-foreground font-medium leading-relaxed'>
            I&apos;m Chester Beard — a sustainability copywriter and marketing strategist who believes AI replaces the appearance of expertise, not expertise itself. For over 20 years I&apos;ve helped mission-driven brands grow without losing their voice, building systems where the technology serves the mission rather than the other way around.
          </p>

          <h2 className='pt-4 text-2xl font-bold text-foreground'>My Background</h2>
          <p>
            My background isn&apos;t typical for a marketing consultant. I came up through environmental leadership — as an Executive Council member for Sierra Club Washington and a photographer for The Nature Conservancy — which means I understand what messaging actually resonates with conscious consumers, not just what tests well.
          </p>
          <p>
            I&apos;ve spent two decades building my own audience around sustainable business, reaching over one million readers. And I&apos;ve run my own small business for 19 years, so the technical and financial pressures you face aren&apos;t abstract to me.
          </p>

          <h2 className='pt-4 text-2xl font-bold text-foreground'>My Approach</h2>
          <p>
            Most consultants specialize in either copywriting or technology. I work at the intersection of both — with sustainability as the through line. That means the AI-augmented tools I build, from search catalogs to content pipelines and marketing automation, are designed around your values from the start, not bolted on afterward.
          </p>
          <p>
            The copywriting and the technology inform each other. Your message doesn&apos;t just resonate at one touchpoint — it carries through the entire system. The result is a single coherent operation instead of a patchwork of vendors pulling in different directions.
          </p>

          <h2 className='pt-4 text-2xl font-bold text-foreground'>Why Work With Me?</h2>
          <p>
            Because I understand the unique challenges of sustainable brands from the inside. I&apos;ve secured grant funding, built loyal audiences, and created marketing systems for organizations where the mission isn&apos;t a marketing angle — it&apos;s the whole point.
          </p>
          <p>
            I don&apos;t just talk about sustainability. I&apos;ve lived it for two decades, and I&apos;m skeptical enough about the tools I use — including AI — to make sure they serve your values rather than undermine them.
          </p>
            </div>
          </div>
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
