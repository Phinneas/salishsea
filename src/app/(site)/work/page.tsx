import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Sites, directories, tools, and networks built by Salish Sea Consulting across sustainability, wellness, food, and the outdoors.',
}

type Project = {
  name: string
  url: string
  descriptor: string
  tag: string
  comingSoon?: boolean
}

type Cluster = {
  label: string
  intro: string
  projects: Project[]
}

const clusters: Cluster[] = [
  {
    label: 'Sustainability & Energy',
    intro:
      'The projects most directly connected to the consulting work — built to make clean energy and sustainability information more accessible.',
    projects: [
      {
        name: 'Solar Currents',
        url: 'https://www.solarcurrents.co',
        descriptor:
          'A resource for solar energy information, news, and guidance for homeowners and businesses navigating the transition to clean energy.',
        tag: 'Sustainability / Energy',
      },
      {
        name: 'Battery Trail',
        url: 'https://www.batterytrail.com',
        descriptor:
          'Tracking the battery storage and energy transition landscape — products, news, and resources for the emerging home energy ecosystem.',
        tag: 'Sustainability / Energy',
      },
      {
        name: 'Gaia Verity',
        url: 'https://www.gaiaverity.com',
        descriptor:
          'A platform exploring environmental truth and sustainability accountability — where data and values intersect.',
        tag: 'Sustainability',
      },
      {
        name: 'Harvest Map',
        url: 'https://www.harvestmap.co',
        comingSoon: true,
        descriptor:
          'A directory mapping local farms, u-picks, and harvest experiences — connecting communities to the land that feeds them.',
        tag: 'Sustainability / Food',
      },
    ],
  },
  {
    label: 'The Soak Network',
    intro:
      "Seven interconnected hot springs and outdoor soaking directories covering the American West. Built independently, grown organically, and collectively one of the most comprehensive soaking resources on the web. This is what a publishing network looks like when it's built by someone who actually goes to these places.",
    projects: [
      {
        name: 'Soak Colorado',
        url: 'https://www.soakcolorado.com',
        descriptor:
          'Hot springs, wild soaks, and thermal pools across Colorado — the most comprehensive guide to soaking in the Rockies.',
        tag: 'Directory / Outdoors',
      },
      {
        name: 'Soak the Rockies',
        url: 'https://www.soaktherockies.com',
        descriptor:
          'A regional overview of hot springs and soaking destinations across the Rocky Mountain corridor.',
        tag: 'Directory / Outdoors',
      },
      {
        name: 'Washington Hot Springs',
        url: 'https://www.washingtonhotsprings.com',
        descriptor:
          'The definitive guide to hot springs in Washington State — from roadside soaks to backcountry pools.',
        tag: 'Directory / Outdoors',
      },
      {
        name: 'Desert Soak',
        url: 'https://www.desertsoak.com',
        descriptor:
          'Hot springs and soaking destinations across the American Southwest desert regions.',
        tag: 'Directory / Outdoors',
      },
      {
        name: 'Shasta Hot Springs',
        url: 'https://www.shastahotsprings.com',
        descriptor:
          'A focused guide to hot springs and soaking near Mount Shasta and Northern California.',
        tag: 'Directory / Outdoors',
      },
      {
        name: 'Sound Dip',
        url: 'https://www.sounddip.com',
        descriptor:
          'Cold water and wild swimming in the Puget Sound region — where outdoor dipping culture meets the Pacific Northwest.',
        tag: 'Directory / Outdoors',
      },
      {
        name: 'Soak Trail',
        url: 'https://www.soaktrail.com',
        descriptor:
          'A trail-based approach to soaking — linking hot springs to hiking routes and outdoor itineraries across the West.',
        tag: 'Directory / Outdoors',
      },
    ],
  },
  {
    label: 'Food, Wellness & Land',
    intro:
      'Projects at the intersection of nourishment, place, and conscious living — the consumer side of sustainability.',
    projects: [
      {
        name: 'Nourished Journeys',
        url: 'https://www.nourishedjourneys.com',
        descriptor:
          'Travel and wellness content for the intentional traveler — where to go, what to eat, and how to move through the world with care.',
        tag: 'Wellness / Travel',
      },
      {
        name: 'The Juice Index',
        url: 'https://www.thejuiceindex.com',
        descriptor:
          'A guide to juice bars, cold press, and functional beverages — mapping the wellness beverage landscape for conscious consumers.',
        tag: 'Directory / Wellness',
      },
      {
        name: 'Keystone Nurseries',
        url: 'https://www.keystonenurseries.com',
        descriptor:
          'A resource for native plants, keystone species, and ecological gardening — growing landscapes that support biodiversity.',
        tag: 'Land / Sustainability',
      },
    ],
  },
  {
    label: 'Tools & Platforms',
    intro:
      'Builder range — platforms, tools, and resources that solve specific problems for specific audiences.',
    projects: [
      {
        name: 'Link Canary',
        url: 'https://www.linkcanary.io',
        comingSoon: true,
        descriptor:
          'A link monitoring and management tool — built for publishers and site owners who need to know when their links break or redirect.',
        tag: 'Tool / Publishing',
      },
      {
        name: 'My MCP Shelf',
        url: 'https://www.mymcpshelf.com',
        descriptor:
          'A resource for Model Context Protocol tools and integrations — built for developers and AI practitioners exploring the MCP ecosystem.',
        tag: 'Tool / AI',
      },
      {
        name: 'Bin Locators',
        url: 'https://www.binlocators.com',
        comingSoon: true,
        descriptor:
          'A directory for finding recycling, composting, and waste diversion resources by location — making responsible disposal easier.',
        tag: 'Tool / Sustainability',
      },
      {
        name: 'Find Frolf',
        url: 'https://www.findfrolf.com',
        comingSoon: true,
        descriptor:
          'A disc golf course finder and community directory — because not everything has to be serious.',
        tag: 'Directory / Recreation',
      },
      {
        name: 'Brain Scriblr',
        url: 'https://www.brainscriblr.world',
        descriptor:
          'A newsletter at the edges of ideas — technology, culture, and the things worth thinking about.',
        tag: 'Newsletter',
      },
      {
        name: 'Admit Writers',
        url: 'https://www.admitwriters.com',
        descriptor:
          'A platform connecting college applicants with essay coaches and admissions writers — because the right words open doors.',
        tag: 'Platform / Education',
      },
    ],
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className='flex h-full flex-col border-border/50'>
      <CardHeader>
        <CardTitle className='text-base leading-snug'>
          {project.comingSoon ? (
            <span className='text-foreground'>{project.name}</span>
          ) : (
            <Link
              href={project.url}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 text-foreground transition-colors hover:text-teal-600'
            >
              {project.name}
              <ArrowUpRight className='h-4 w-4 shrink-0' />
            </Link>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col space-y-4'>
        <p className='text-sm leading-relaxed text-muted-foreground'>{project.descriptor}</p>
        <div className='mt-auto flex items-center gap-2 border-t border-border pt-4'>
          <Badge variant='outline' className='text-xs'>
            {project.tag}
          </Badge>
          {project.comingSoon && (
            <Badge className='bg-teal-600 text-xs text-white'>Coming soon</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function WorkPage() {
  return (
    <div>
      {/* Hero / intro */}
      <section className='bg-gradient-to-br from-teal-950 to-slate-900 px-4 py-20 text-white sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>Work</h1>
          <p className='mt-4 text-lg text-teal-100/80'>
            I write about the spaces I build in. I build in the spaces I write about. That&apos;s not a coincidence — it&apos;s how I stay close to what&apos;s actually happening.
          </p>
          <p className='mt-4 text-teal-100/60'>
            These are projects I&apos;ve built and own: directories, platforms, tools, and networks across sustainability, wellness, food, and the outdoors. They&apos;re the reason my sustainability communications work is grounded in something real — I&apos;m not theorizing about conscious consumer audiences. I&apos;m building for them.
          </p>
        </div>
      </section>

      {/* Project clusters */}
      {clusters.map((cluster, index) => (
        <div key={cluster.label}>
          <section
            className={cn(
              'px-4 py-20 sm:px-6',
              index % 2 === 1 ? 'bg-muted/20' : undefined
            )}
          >
            <div className='mx-auto max-w-6xl'>
              <div className='mb-10'>
                <h2 className='text-2xl font-bold tracking-tight'>{cluster.label}</h2>
                <p className='mt-2 max-w-3xl text-muted-foreground leading-relaxed'>{cluster.intro}</p>
              </div>
              <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {cluster.projects.map(project => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </div>
          </section>
          {index < clusters.length - 1 && <div className='border-t border-border' />}
        </div>
      ))}

      {/* Closing note */}
      <section className='border-t border-border bg-muted/30 px-4 py-20 sm:px-6'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif text-2xl font-bold tracking-tight'>
            These aren&apos;t client projects. They&apos;re mine.
          </h2>
          <p className='mt-6 text-muted-foreground leading-relaxed'>
            Every site on this page was built by me, for an audience I wanted to serve. That distinction matters: it means the research, the content strategy, the SEO thinking, and the writing all came from the same place — genuine interest in the subject and genuine commitment to the reader. That&apos;s the same way I approach client work.
          </p>
        </div>
      </section>
    </div>
  )
}
