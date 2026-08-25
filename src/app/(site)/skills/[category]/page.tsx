import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/site/skills/Breadcrumb'
import { SkillCard } from '@/components/site/skills/SkillCard'
import { getCategory, categories } from '@/config/skills'

interface Props {
  params: Promise<{ category: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return categories.map(category => ({ category: category.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params
  const category = getCategory(categorySlug)
  if (!category) return { title: 'Skills' }

  return {
    title: `${category.name} Skills`,
    description: category.description,
    alternates: {
      canonical: `/skills/${category.slug}/`,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params
  const category = getCategory(categorySlug)
  if (!category) notFound()

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Skills', href: '/skills/' }, { label: category.name }]} />

      {/* Header */}
      <header className='mx-auto max-w-3xl px-4 py-10 sm:px-6'>
        <h1 className='font-serif text-3xl font-bold tracking-tight sm:text-4xl' style={{ color: 'var(--ssc-text-dark)' }}>
          {category.name}
        </h1>
        <p className='mt-4 text-lg leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
          {category.description}
        </p>
      </header>

      {/* Skill grid */}
      <section className='mx-auto max-w-6xl px-4 pb-16 sm:px-6'>
        <div className='grid gap-6 md:grid-cols-2'>
          {category.skills.map(skill => (
            <SkillCard key={skill.slug} category={category} skill={skill} />
          ))}
        </div>
      </section>

      {/* Why these frameworks matter */}
      <section className='px-4 py-16 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-4 text-2xl font-bold tracking-tight'>Why these frameworks matter</h2>
          <p className='leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            {category.strategicValue}
          </p>
        </div>
      </section>

      {/* Back to hub */}
      <section className='px-4 py-12 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl text-center'>
          <Link href='/skills/' className='inline-flex items-center gap-2 font-semibold transition-colors hover:underline' style={{ color: 'var(--ssc-seafoam-deep)' }}>
            <ArrowLeft className='h-4 w-4' />
            Browse all skills
          </Link>
        </div>
      </section>
    </div>
  )
}
