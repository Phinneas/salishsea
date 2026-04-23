import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Leaf, Fish, BarChart3, FileSearch } from 'lucide-react'
import { getPosts } from '@/lib/sonicjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Salish Sea Consulting — environmental and sustainability consulting for the Pacific Northwest.'
}

const services = [
  {
    icon: Leaf,
    title: 'Environmental Assessment',
    description: 'Comprehensive environmental impact assessments and ecological evaluations for development projects.'
  },
  {
    icon: Fish,
    title: 'Marine Ecosystem Consulting',
    description: 'Specialized expertise in Salish Sea ecosystems, species habitat, and marine conservation planning.'
  },
  {
    icon: BarChart3,
    title: 'Sustainability Strategy',
    description:
      'Long-term sustainability roadmaps for businesses, municipalities, and First Nations organizations.'
  },
  {
    icon: FileSearch,
    title: 'Regulatory Compliance',
    description: 'Navigating federal, provincial, and local environmental regulations with confidence and clarity.'
  }
]

export default async function HomePage() {
  const posts = await getPosts({ limit: 3 })

  return (
    <>
      {/* Hero */}
      <section className='relative bg-gradient-to-br from-teal-950 via-teal-900 to-slate-900 px-4 py-24 text-white sm:px-6 sm:py-32'>
        <div className='mx-auto max-w-4xl text-center'>
          <Badge className='mb-6 border-teal-400/30 bg-teal-400/10 text-teal-300' variant='outline'>
            Pacific Northwest Environmental Consultants
          </Badge>
          <h1 className='text-4xl font-bold tracking-tight sm:text-6xl'>
            Navigating Complex <span className='text-teal-400'>Environmental Challenges</span>
          </h1>
          <p className='mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-teal-100/80'>
            We help organizations understand, protect, and responsibly develop within the unique ecosystems of the
            Salish Sea region. Science-based, community-focused consulting.
          </p>
          <div className='mt-10 flex flex-wrap justify-center gap-4'>
            <Button asChild size='lg' className='bg-teal-500 hover:bg-teal-400 text-white'>
              <Link href='/services'>
                Our Services <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button
              asChild
              size='lg'
              variant='outline'
              className='border-white/30 text-white hover:bg-white/10 bg-transparent'
            >
              <Link href='/contact'>Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className='px-4 py-20 sm:px-6'>
        <div className='mx-auto max-w-6xl'>
          <div className='mb-12 text-center'>
            <h2 className='text-3xl font-bold tracking-tight'>What We Do</h2>
            <p className='mt-3 text-muted-foreground'>
              Practical expertise at the intersection of ecology, policy, and sustainability.
            </p>
          </div>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {services.map(service => (
              <Card key={service.title} className='border-border/50 transition-shadow hover:shadow-md'>
                <CardHeader className='pb-3'>
                  <service.icon className='mb-2 h-8 w-8 text-teal-600' />
                  <CardTitle className='text-base'>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-sm text-muted-foreground'>{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className='mt-10 text-center'>
            <Button asChild variant='outline'>
              <Link href='/services'>
                View All Services <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog preview */}
      {posts.length > 0 && (
        <section className='bg-muted/30 px-4 py-20 sm:px-6'>
          <div className='mx-auto max-w-6xl'>
            <div className='mb-12 flex items-end justify-between'>
              <div>
                <h2 className='text-3xl font-bold tracking-tight'>Latest Insights</h2>
                <p className='mt-2 text-muted-foreground'>Perspectives on environmental consulting and conservation.</p>
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
                          day: 'numeric'
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
      <section className='px-4 py-20 sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl font-bold tracking-tight'>Ready to work together?</h2>
          <p className='mx-auto mt-4 max-w-xl text-muted-foreground'>
            Every project is different. Tell us about yours and we&apos;ll find the right approach.
          </p>
          <Button asChild size='lg' className='mt-8 bg-teal-600 hover:bg-teal-700'>
            <Link href='/contact'>
              Start a Conversation <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
