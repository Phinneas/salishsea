import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Globe, PenLine, DollarSign, CheckCircle } from 'lucide-react'
import { getPosts } from '@/lib/sonicjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Salish Sea Consulting — conscious marketing for sustainable brands. Conversion copywriting, custom marketing tools, and grant writing for mission-driven organizations.'
}

const stats = [
  { value: '1M+', label: 'Article Reads on Sustainable Business' },
  { value: '24k+', label: 'Combined Audience Across Platforms' },
  { value: '20 Years', label: 'Real-World Marketing Experience' },
  { value: 'Sierra Club', label: 'Former Executive Council, Washington' },
]

const valueProp = [
  {
    title: 'End the Vendor Chaos',
    description:
      'One strategic partner who understands both your mission and your metrics from day one. No more gaps between your copywriter and your developer.',
  },
  {
    title: 'Guide Conscious Consumers',
    description:
      'Custom search catalogs and user journeys that make your sustainable options intuitive and easy to find — built around how your audience actually thinks.',
  },
  {
    title: 'Turn Your Values into Conversions',
    description:
      'High-impact copy and intelligent automation working in perfect sync. Your message resonates at the moments that matter most.',
  },
]

const servicesSummary = [
  {
    icon: Globe,
    title: 'Website Design & Copywriting',
    description:
      'Complete website bundles, landing pages, and ongoing content strategies designed to convert conscious consumers. From SEO copy to CRM automation.',
    href: '/services#website',
    cta: 'Starting at $1,500',
  },
  {
    icon: PenLine,
    title: 'Grant Writing & Investor Services',
    description:
      'Funding strategies, grant applications, power prospectuses, and white papers that translate your mission into capital. Proven narrative techniques that win.',
    href: '/services#grants',
    cta: 'Starting at $500',
  },
  {
    icon: DollarSign,
    title: 'Marketing Strategy',
    description:
      'Audience research, competition reports, SEO analysis, and roadmaps tailored to sustainable brands. No generic playbooks — everything is built for your specific market.',
    href: '/services',
    cta: 'See all services',
  },
]

export default async function HomePage() {
  const posts = await getPosts({ limit: 3 })

  return (
    <>
      {/* Hero */}
      <section className='relative bg-gradient-to-br from-teal-950 via-teal-900 to-slate-900 px-4 py-24 text-white sm:px-6 sm:py-32'>
        <div className='mx-auto max-w-4xl text-center'>
          <Badge className='mb-6 border-teal-400/30 bg-teal-400/10 text-teal-300' variant='outline'>
            Conscious Marketing for Sustainable Brands
          </Badge>
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            Your Mission Deserves{' '}
            <span className='text-teal-400'>Marketing That Converts</span>
          </h1>
          <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-teal-100/80'>
            Stop letting your message get lost between a copywriter who doesn&apos;t get your tech and a developer
            who doesn&apos;t get your mission. I&apos;m the conversion copywriter who builds your custom marketing
            tools — one seamless system for sustainable brands.
          </p>
          <div className='mt-10 flex flex-wrap justify-center gap-4'>
            <Button asChild size='lg' className='bg-teal-500 hover:bg-teal-400 text-white'>
              <Link href='https://cal.com/chester-beard/30min' target='_blank' rel='noopener noreferrer'>
                Schedule a Free 30-Min Call <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button
              asChild
              size='lg'
              variant='outline'
              className='border-white/30 text-white hover:bg-white/10 bg-transparent'
            >
              <Link href='/services'>See Services &amp; Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className='border-b border-border bg-muted/20 px-4 py-12 sm:px-6'>
        <div className='mx-auto max-w-6xl'>
          <div className='grid grid-cols-2 gap-6 sm:grid-cols-4'>
            {stats.map(stat => (
              <div key={stat.label} className='text-center'>
                <p className='text-2xl font-bold text-teal-600 sm:text-3xl'>{stat.value}</p>
                <p className='mt-1 text-xs text-muted-foreground sm:text-sm'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Integrated */}
      <section className='px-4 py-20 sm:px-6'>
        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-12 lg:grid-cols-2 lg:items-center'>
            <div>
              <h2 className='text-3xl font-bold tracking-tight'>
                Why Sustainable Brands Choose an Integrated Approach
              </h2>
              <p className='mt-4 text-muted-foreground leading-relaxed'>
                Most sustainable brands get stuck between copywriters who don&apos;t understand their tech and
                developers who don&apos;t grasp their mission. Fragmented marketing dilutes your impact and wastes
                your budget.
              </p>
              <p className='mt-3 text-muted-foreground leading-relaxed'>
                I do both. Custom marketing tools designed around your values, copy perfectly synchronized with your
                technology, and funding narratives that actually win grants — all from one partner who lives and
                breathes sustainability.
              </p>
              <Button asChild className='mt-8 bg-teal-600 hover:bg-teal-700'>
                <Link href='/about'>
                  My Background &amp; Approach <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </div>
            <div className='flex flex-col gap-6'>
              {valueProp.map(item => (
                <div key={item.title} className='flex gap-4 rounded-lg border border-border/50 p-5'>
                  <CheckCircle className='mt-0.5 h-5 w-5 flex-shrink-0 text-teal-500' />
                  <div>
                    <p className='font-semibold text-foreground'>{item.title}</p>
                    <p className='mt-1 text-sm text-muted-foreground leading-relaxed'>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services summary */}
      <section className='bg-muted/20 px-4 py-20 sm:px-6'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-12 text-center'>
            <h2 className='text-3xl font-bold tracking-tight'>Services</h2>
            <p className='mt-3 text-muted-foreground'>
              From website copy to grant funding — everything your sustainable brand needs.
            </p>
          </div>
          <div className='grid gap-6 md:grid-cols-3'>
            {servicesSummary.map(service => (
              <Card key={service.title} className='border-border/50 transition-shadow hover:shadow-md'>
                <CardHeader className='pb-3'>
                  <service.icon className='mb-2 h-8 w-8 text-teal-600' />
                  <CardTitle className='text-base'>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <p className='text-sm text-muted-foreground leading-relaxed'>{service.description}</p>
                  <Link
                    href={service.href}
                    className='inline-flex items-center text-sm font-medium text-teal-600 hover:underline'
                  >
                    {service.cta} <ArrowRight className='ml-1 h-3 w-3' />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className='mt-10 text-center'>
            <Button asChild variant='outline'>
              <Link href='/services'>
                View All Services &amp; Pricing <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      {posts.length > 0 && (
        <section className='px-4 py-20 sm:px-6'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-12 flex items-end justify-between'>
              <div>
                <h2 className='text-3xl font-bold tracking-tight'>Latest Insights</h2>
                <p className='mt-2 text-muted-foreground'>
                  Perspectives on sustainable business, marketing, and conservation.
                </p>
              </div>
              <Button asChild variant='ghost' className='hidden sm:flex'>
                <Link href='/blog'>
                  All posts <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>
            </div>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className='group block'>
                  <Card className='h-full border-border/50 transition-shadow group-hover:shadow-md'>
                    <CardHeader>
                      <p className='text-xs text-muted-foreground'>
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <CardTitle className='mt-1 line-clamp-2 text-base group-hover:text-teal-600'>
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    {post.excerpt && (
                      <CardContent>
                        <p className='line-clamp-3 text-sm text-muted-foreground'>{post.excerpt}</p>
                      </CardContent>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className='bg-gradient-to-br from-teal-950 to-slate-900 px-4 py-20 text-white sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight'>Ready to build marketing that matches your mission?</h2>
          <p className='mx-auto mt-4 max-w-xl text-teal-100/80 leading-relaxed'>
            A no-obligation 30-minute call to identify the biggest gaps in your marketing system. No pressure,
            no pitch — just an honest conversation about what would move the needle for your brand.
          </p>
          <Button asChild size='lg' className='mt-8 bg-teal-500 hover:bg-teal-400 text-white'>
            <Link href='https://cal.com/chester-beard/30min' target='_blank' rel='noopener noreferrer'>
              Schedule Your Free Call <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
