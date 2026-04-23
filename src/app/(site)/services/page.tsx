import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Leaf, Fish, BarChart3, FileSearch, Map, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Environmental consulting services from Salish Sea Consulting — assessments, strategy, compliance, and more.'
}

const services = [
  {
    icon: Leaf,
    title: 'Environmental Impact Assessment',
    description:
      'Rigorous, science-based EIAs that meet regulatory standards while clearly communicating risks and opportunities to stakeholders. We work with developers, governments, and First Nations on projects of all scales.',
    areas: ['Baseline ecological surveys', 'Mitigation planning', 'Stakeholder consultation support', 'Report preparation']
  },
  {
    icon: Fish,
    title: 'Marine & Coastal Ecosystem Consulting',
    description:
      'Deep expertise in Salish Sea marine ecosystems — from salmon habitat and orca populations to intertidal zones and watershed management. We help clients understand and protect marine biodiversity.',
    areas: ['Species-at-risk assessments', 'Habitat mapping', 'Marine protected area planning', 'Fisheries consulting']
  },
  {
    icon: BarChart3,
    title: 'Sustainability Strategy',
    description:
      'Developing long-term sustainability roadmaps grounded in ecological science and community values. We work with businesses, municipalities, and Indigenous organizations to set meaningful targets and track progress.',
    areas: ['GHG accounting', 'Net-zero pathway development', 'ESG reporting support', 'Stakeholder engagement']
  },
  {
    icon: FileSearch,
    title: 'Regulatory Compliance',
    description:
      'Expert guidance navigating federal, provincial, and local environmental regulations — from CEAA and Species at Risk Act to BC Environmental Assessment Act and local bylaws.',
    areas: ['Permit applications', 'Compliance audits', 'Regulatory gap analysis', 'Agency liaison']
  },
  {
    icon: Map,
    title: 'Land Use & Resource Planning',
    description:
      'Integrated land use planning that balances ecological integrity with social and economic needs. We bring ecological expertise to official community plans, resource management plans, and protected area design.',
    areas: ['Ecosystem mapping', 'Cumulative effects assessment', 'Conservation area design', 'OCP support']
  },
  {
    icon: Users,
    title: 'Training & Capacity Building',
    description:
      'Workshops, field training, and technical capacity building for government agencies, First Nations, and non-profits. We build internal capacity so organizations can manage environmental responsibilities with confidence.',
    areas: ['Environmental monitoring training', 'Species ID workshops', 'Policy literacy sessions', 'Customized curricula']
  }
]

export default function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <section className='bg-gradient-to-br from-teal-950 to-slate-900 px-4 py-20 text-white sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>Our Services</h1>
          <p className='mt-4 text-lg text-teal-100/80'>
            Science-based environmental consulting across the full project lifecycle.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className='px-4 py-20 sm:px-6'>
        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {services.map(service => (
              <Card key={service.title} className='border-border/50'>
                <CardHeader>
                  <service.icon className='mb-3 h-8 w-8 text-teal-600' />
                  <CardTitle className='text-lg'>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <p className='text-sm text-muted-foreground leading-relaxed'>{service.description}</p>
                  <ul className='space-y-1'>
                    {service.areas.map(area => (
                      <li key={area} className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <span className='h-1 w-1 rounded-full bg-teal-500 flex-shrink-0' />
                        {area}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-muted/30 px-4 py-16 sm:px-6'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-2xl font-bold tracking-tight'>Not sure which service fits?</h2>
          <p className='mt-3 text-muted-foreground'>
            Reach out and describe your project. We&apos;ll help you figure out the right approach.
          </p>
          <Button asChild size='lg' className='mt-8 bg-teal-600 hover:bg-teal-700'>
            <Link href='/contact'>
              Contact Us <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
