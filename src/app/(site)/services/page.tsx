import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Globe, FileText, Users, Briefcase, BookOpen, Scroll } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Conversion copywriting, website design, grant writing, and marketing strategy for sustainable brands. See all services and pricing from Salish Sea Consulting.'
}

const websiteServices = [
  {
    icon: Globe,
    title: 'Sustainable Entrepreneur Website',
    tagline: 'Turn visitors into customers in seconds.',
    description:
      'You have just a few seconds to capture and hold the interest of website visitors. This complete website bundle gives you the words that will do it — written for the conscious consumer and optimized for search.',
    includes: [
      '5 pages of website copy',
      '10 product/service descriptions',
      'Website audit with SEO analysis and recommendations',
      'SEO alt text, meta descriptions, and header texts',
    ],
    price: 'Starting at $2,000',
    badge: 'Most Popular',
  },
  {
    icon: Briefcase,
    title: 'New Green Entrepreneur Website',
    tagline: 'Launch with the right foundation.',
    description:
      'Launching a new website or product? This package gives you competitive intelligence, a high-converting landing page, and a complete launch email sequence — plus a personal strategy call to review everything.',
    includes: [
      'Competition report including SEO recommendations',
      '1 product landing page (1,000 words)',
      '1 opt-in landing page',
      '3 product ads',
      '3 opt-in website or product emails',
      '45-minute Zoom call to review results and recommendations',
    ],
    price: 'Starting at $1,800',
    badge: null,
  },
  {
    icon: BookOpen,
    title: 'Sustainable Website — Monthly Retainer',
    tagline: 'Drive organic traffic month after month.',
    description:
      'Provide ongoing value and grow your search presence with high-quality, evergreen content built around a clear strategy. Includes regular SEO audits to keep your site competitive as search evolves.',
    includes: [
      'Content strategy development',
      '4 SEO blogs (1,000–1,500 words each)',
      'Bimonthly email newsletters',
      'Ongoing website audits with SEO recommendations',
    ],
    price: '$1,500 / month',
    badge: 'Retainer',
  },
]

const grantServices = [
  {
    icon: Scroll,
    title: 'Grant Funding Strategy',
    tagline: 'Know exactly what to pursue and when.',
    description:
      'What change would you make if you knew you had the money? A Funding Strategy gives you a clear road map — specifying which grants to pursue over the next 12–18 months, in what order, and why. The process typically takes three to five weeks and results in a vetted list of 20+ potential funding sources. We interview funders to confirm eligibility, project fit, and competitiveness before you invest time in a full application.',
    includes: [
      '20+ vetted funding sources',
      'Funder interview and eligibility screening',
      '12–18 month grant calendar',
      'Positioning recommendations for each opportunity',
    ],
    price: 'Starting at $1,500',
    badge: null,
  },
  {
    icon: FileText,
    title: 'Grant Writing',
    tagline: 'Journalism-quality narrative meets meticulous detail.',
    description:
      'Grants are complex, time-consuming projects. My writing technique combines the narrative storytelling of journalism with meticulous attention to detail — clearly and concisely displaying your vision to ensure the highest chance of success. Some grants are complex 100+ hour efforts; others begin with a letter of inquiry before a full proposal is invited. Pricing is determined case-by-case based on the complexity of the application.',
    includes: [
      'Full application writing and editing',
      'Letter of inquiry (where required)',
      'Budget narrative support',
      'Funder-specific language and formatting',
    ],
    price: 'Priced per project',
    badge: null,
  },
  {
    icon: Users,
    title: 'Power Prospectus / Investor Letter',
    tagline: 'Hook funders with one powerful page.',
    description:
      'A one-page overview of your organization and the project or program you want to fund. The Power Prospectus succinctly describes what you do and why it matters, then summarizes the project and its impact — all in a visually compelling PDF. Used by nonprofits and NGOs for grant funding, and by tech startups as an investor letter.',
    includes: [
      'One-page PDF copy and structure',
      'Impact summary and program overview',
      'Persuasive organizational narrative',
      'Suitable for grants and investor outreach',
    ],
    price: 'Starting at $500',
    badge: 'Quick Win',
  },
  {
    icon: BookOpen,
    title: 'White Paper — Technical Writing',
    tagline: 'Educate, persuade, and establish authority.',
    description:
      'A white paper is a hybrid of a magazine article and a corporate brochure — it communicates your organization\'s complex message simply, professionally, and compellingly. Readers learn about the solutions to their problems in an educational format, while the persuasive brochure element moves them toward action. Ideal for thought leadership, policy advocacy, and B2B sales.',
    includes: [
      'Research and outline development',
      'Educational narrative section',
      'Persuasive call-to-action section',
      'Formatted for digital and print distribution',
    ],
    price: 'Starting at $1,200',
    badge: null,
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <section className='bg-gradient-to-br from-teal-950 to-slate-900 px-4 py-20 text-white sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>Services &amp; Pricing</h1>
          <p className='mt-4 text-lg text-teal-100/80'>
            Conversion copywriting, website strategy, grant writing, and marketing tools — built for sustainable
            brands.
          </p>
        </div>
      </section>

      {/* Website Design & Copywriting */}
      <section id='website' className='px-4 py-20 sm:px-6 scroll-mt-20'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-10'>
            <h2 className='text-2xl font-bold tracking-tight'>Website Design &amp; Copywriting</h2>
            <p className='mt-2 text-muted-foreground'>
              Copy and content strategy that turns visitors into customers — optimized for search and written for the
              conscious consumer.
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {websiteServices.map(service => (
              <Card key={service.title} className='relative border-border/50 flex flex-col'>
                {service.badge && (
                  <Badge className='absolute -top-2.5 left-5 bg-teal-600 text-white text-xs'>
                    {service.badge}
                  </Badge>
                )}
                <CardHeader>
                  <service.icon className='mb-3 h-7 w-7 text-teal-600' />
                  <CardTitle className='text-base leading-snug'>{service.title}</CardTitle>
                  <p className='text-sm font-medium text-teal-600'>{service.tagline}</p>
                </CardHeader>
                <CardContent className='flex flex-col flex-1 space-y-4'>
                  <p className='text-sm text-muted-foreground leading-relaxed'>{service.description}</p>
                  <div className='flex-1'>
                    <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-foreground'>Includes</p>
                    <ul className='space-y-1.5'>
                      {service.includes.map(item => (
                        <li key={item} className='flex items-start gap-2 text-sm text-muted-foreground'>
                          <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0' />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='border-t border-border pt-4'>
                    <p className='text-base font-bold text-foreground'>{service.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className='border-t border-border' />

      {/* Grant Writing & Investor Services */}
      <section id='grants' className='bg-muted/20 px-4 py-20 sm:px-6 scroll-mt-20'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-10'>
            <h2 className='text-2xl font-bold tracking-tight'>Grant Writing &amp; Investor Services</h2>
            <p className='mt-2 text-muted-foreground'>
              Translate your impact into powerful narratives that secure funding and fuel your mission.
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2'>
            {grantServices.map(service => (
              <Card key={service.title} className='relative border-border/50 flex flex-col'>
                {service.badge && (
                  <Badge className='absolute -top-2.5 left-5 bg-teal-600 text-white text-xs'>
                    {service.badge}
                  </Badge>
                )}
                <CardHeader>
                  <service.icon className='mb-3 h-7 w-7 text-teal-600' />
                  <CardTitle className='text-base leading-snug'>{service.title}</CardTitle>
                  <p className='text-sm font-medium text-teal-600'>{service.tagline}</p>
                </CardHeader>
                <CardContent className='flex flex-col flex-1 space-y-4'>
                  <p className='text-sm text-muted-foreground leading-relaxed'>{service.description}</p>
                  <div className='flex-1'>
                    <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-foreground'>Includes</p>
                    <ul className='space-y-1.5'>
                      {service.includes.map(item => (
                        <li key={item} className='flex items-start gap-2 text-sm text-muted-foreground'>
                          <span className='mt-1.5 h-1.5 w-1.5 rounded-full bg-teal-500 flex-shrink-0' />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='border-t border-border pt-4'>
                    <p className='text-base font-bold text-foreground'>{service.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='px-4 py-16 sm:px-6'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-2xl font-bold tracking-tight'>Not sure which service is the right fit?</h2>
          <p className='mt-3 text-muted-foreground'>
            Schedule a free 30-minute call. We&apos;ll look at where your marketing system has gaps and figure out
            the highest-leverage place to start — no obligation.
          </p>
          <Button asChild size='lg' className='mt-8 bg-teal-600 hover:bg-teal-700'>
            <Link href='https://cal.com/chester-beard/30min' target='_blank' rel='noopener noreferrer'>
              Schedule a Free Call <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
