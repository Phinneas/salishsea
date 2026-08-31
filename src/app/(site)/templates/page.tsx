import { Download, FileText, FileSpreadsheet, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { SectionHero } from '@/components/site/SectionHero'
import { SectionCTA } from '@/components/site/SectionCTA'
import { templates } from '@/config/templates'
import type { Template } from '@/config/templates'

export const metadata: Metadata = {
  title: 'Templates',
  description:
    'Free working templates from Salish Sea Consulting — grant budgets, logic models, letters of support, SOPs, competitor analysis, and SEO audit documents. Download, adapt, and use them on your own work.',
  alternates: {
    canonical: '/templates/',
  },
}

function FileButton({ template, file }: { template: Template; file: Template['files'][number] }) {
  const Icon = file.format === 'Excel' ? FileSpreadsheet : FileText
  return (
    <a
      href={`/templates/${file.name}`}
      download
      className="inline-flex items-center gap-2 rounded-full px-[1.2em] py-[0.65em] font-space-mono text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:-translate-y-[1px]"
      style={{
        background: template.status === 'paid' ? 'var(--ssc-seafoam)' : 'var(--ssc-fog)',
        color: template.status === 'paid' ? 'var(--ssc-ink)' : 'var(--ssc-text-dark)',
        border: '1px solid var(--ssc-line-light)',
      }}
    >
      <Icon className='h-3.5 w-3.5' />
      {file.format === 'Excel' ? 'Excel' : 'Word'}
      <Download className='h-3.5 w-3.5' />
    </a>
  )
}

export default function TemplatesPage() {
  return (
    <div>
      {/* Hero */}
      <SectionHero
        eyebrow='Templates'
        title='The working documents behind the work.'
        subtitle='Six templates built on paid client work — grant budgets, logic models, support letters, SOPs, competitor analysis, and SEO audits. Free to download, adapt, and run on your own projects.'
      />

      {/* Template grid */}
      <section className='px-4 py-20 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-6 md:grid-cols-2'>
            {templates.map(template => (
              <article
                key={template.slug}
                className='flex flex-col rounded-[var(--ssc-r)] border bg-white p-6'
                style={{ borderColor: 'var(--ssc-line-light)' }}
              >
                <div className='mb-3 flex items-center justify-between gap-4'>
                  <h2 className='font-serif text-xl font-semibold' style={{ color: 'var(--ssc-text-dark)' }}>
                    {template.name}
                  </h2>
                  {template.status === 'free' ? (
                    <span
                      className='shrink-0 rounded-full border px-2.5 py-0.5 font-space-mono text-[0.7rem] font-medium uppercase tracking-[0.08em]'
                      style={{ borderColor: 'var(--ssc-line-light)', color: 'var(--ssc-seafoam-deep)' }}
                    >
                      Free
                    </span>
                  ) : (
                    <span
                      className='shrink-0 rounded-full px-2.5 py-0.5 font-space-mono text-[0.7rem] font-medium uppercase tracking-[0.08em]'
                      style={{ background: 'var(--ssc-seafoam)', color: 'var(--ssc-ink)' }}
                    >
                      {template.price ?? 'Paid'}
                    </span>
                  )}
                </div>

                <p className='mb-5 flex-1 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                  {template.bestUse}
                </p>

                <div className='mb-4 flex flex-wrap gap-2'>
                  {template.files.map(file => (
                    <FileButton key={file.name} template={template} file={file} />
                  ))}
                </div>

                {template.relatedSkill && (
                  <Link
                    href={`/skills/${template.relatedSkill.category}/${template.relatedSkill.slug}/`}
                    className='inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:underline'
                    style={{ color: 'var(--ssc-seafoam-deep)' }}
                  >
                    {template.relatedSkill.label} <ArrowRight className='h-4 w-4' />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid var(--ssc-line-light)' }} />

      {/* Terms / use notice */}
      <section className='px-4 py-16 sm:px-6' style={{ background: 'var(--ssc-fog)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-3xl'>
          <h2 className='font-serif mb-4 text-2xl font-bold tracking-tight'>How you can use these</h2>
          <div className='space-y-4 text-sm leading-relaxed' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            <p>
              You may download, copy, and adapt these templates for your own personal or organizational use, and share
              completed documents created from them. You may not sell, sublicense, or redistribute the original or
              substantially unchanged SSC-branded template files as a competing template product without written permission.
            </p>
            <p>
              These resources are general planning and communication tools, provided without warranties or guarantees. They
              are not legal, tax, accounting, certification, financial, cybersecurity, accessibility-conformance, or
              professional engineering advice. Review final materials with the appropriate qualified professional.
            </p>
            <p>
              Green-tinted cells and bracketed text are for your input; blue-gray cells contain guidance or formulas. Preserve
              an untouched master copy of each file before you start editing.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <SectionCTA
        title='Want these templates applied to your specific situation?'
        subtitle='Templates are a starting point. The judgment that makes them fit your funder, your market, and your evidence — that is the work.'
        href='https://cal.com/chester-beard/30min'
        label='Book a 30-Minute Call'
        external
      />
    </div>
  )
}
