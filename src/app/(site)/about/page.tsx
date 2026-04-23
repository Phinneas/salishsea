import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Salish Sea Consulting — our mission, approach, and team.'
}

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className='bg-gradient-to-br from-teal-950 to-slate-900 px-4 py-20 text-white sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>About Us</h1>
          <p className='mt-4 text-lg text-teal-100/80'>
            Rooted in the Pacific Northwest. Committed to its future.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className='px-4 py-20 sm:px-6'>
        <div className='mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground'>
          <h2 className='text-2xl font-bold text-foreground'>Our Mission</h2>
          <p>
            Salish Sea Consulting was founded on a simple belief: good environmental decisions require both rigorous
            science and deep community understanding. We work at that intersection — bringing ecological expertise to
            the people and organizations navigating the complex challenges of the Pacific Northwest.
          </p>
          <p>
            The Salish Sea — the interconnected network of coastal waterways stretching from Puget Sound through the
            Strait of Georgia — is one of the most ecologically rich and human-impacted regions on the continent. It
            is our home, our area of expertise, and the inspiration for everything we do.
          </p>

          <h2 className='pt-6 text-2xl font-bold text-foreground'>Our Approach</h2>
          <p>
            We don&apos;t believe in one-size-fits-all solutions. Every watershed, coastline, and community is
            different. We take time to understand the specific ecological, cultural, and regulatory context of each
            project before recommending a path forward.
          </p>
          <p>
            We work collaboratively — with clients, regulators, Indigenous rights holders, and local communities —
            because durable environmental outcomes are built on relationships, not just reports.
          </p>

          <h2 className='pt-6 text-2xl font-bold text-foreground'>Who We Work With</h2>
          <ul className='ml-4 list-disc space-y-2'>
            <li>Municipal and regional governments</li>
            <li>First Nations and Indigenous organizations</li>
            <li>Developers and resource companies seeking responsible project pathways</li>
            <li>Non-profits and conservation organizations</li>
            <li>Federal and provincial agencies</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-muted/30 px-4 py-16 sm:px-6'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-2xl font-bold tracking-tight'>Let&apos;s work together</h2>
          <p className='mt-3 text-muted-foreground'>
            Tell us about your project and we&apos;ll be in touch within one business day.
          </p>
          <Button asChild size='lg' className='mt-8 bg-teal-600 hover:bg-teal-700'>
            <Link href='/contact'>
              Get in Touch <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
