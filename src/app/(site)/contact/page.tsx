'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CheckCircle, Calendar, Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { SectionHero } from '@/components/site/SectionHero'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // TODO: wire to Resend, Mailgun, or a Cloudflare Worker email endpoint
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <div>
      {/* Hero */}
      <SectionHero
        eyebrow='Contact'
        title="Let's Talk"
        subtitle='A 30-minute call to look at your communications honestly — no pitch, no obligation.'
      />

      <section className='px-4 py-16 sm:px-6' style={{ background: 'var(--ssc-paper)', color: 'var(--ssc-text-dark)' }}>
        <div className='mx-auto max-w-6xl'>
          {/* Direct email fallback */}
          <p className='mb-8 text-center text-sm' style={{ color: 'var(--ssc-text-dark-mute)' }}>
            Prefer email?{' '}
            <a href='mailto:chesterbeard@salishseaconsulting.com' className='font-semibold transition-colors hover:underline' style={{ color: 'var(--ssc-seafoam-deep)' }}>
              chesterbeard@salishseaconsulting.com
            </a>
          </p>
          <div className='grid gap-12 lg:grid-cols-[1fr_420px]'>

            {/* Cal.com direct booking */}
            <div>
              <div className='mb-6 flex items-center gap-2'>
                <Calendar className='h-5 w-5' style={{ color: 'var(--ssc-seafoam-deep)' }} />
                <h2 className='font-serif text-xl font-semibold'>Book a free 30-minute call</h2>
              </div>
              <p className='mb-6 text-sm' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                Pick a time directly from my calendar. No back-and-forth needed.
              </p>
              
              <div className='rounded-[var(--ssc-r)] border bg-white p-6' style={{ borderColor: 'var(--ssc-line-light)' }}>
                <div className='mb-4 text-center'>
                  <p className='text-sm mb-4' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                    Click below to open my scheduling calendar:
                  </p>
                </div>
                
                <Link
                  href='https://cal.com/chester-beard/30min'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex w-full items-center justify-center gap-2 rounded-full px-[1.6em] py-[0.95em] text-[0.98rem] font-semibold text-white transition-all duration-300 hover:-translate-y-[3px]'
                  style={{
                    background: 'var(--ssc-seafoam)',
                    color: 'var(--ssc-ink)',
                    boxShadow: '0 10px 30px -10px rgba(95,227,201,.6)',
                  }}
                >
                  Schedule a Free 30-Min Call <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
                
                <div className='mt-6 rounded-lg p-4' style={{ background: 'var(--ssc-fog)' }}>
                  <p className='text-xs text-center' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                    <strong style={{ color: 'var(--ssc-text-dark)' }}>What to expect:</strong><br />
                    • 30-minute no-obligation call<br />
                    • Discuss your project and goals<br />
                    • See if we&apos;re a good fit to work together<br />
                    • Clear next steps, whether we work together or not
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <div className='mb-6 flex items-center gap-2'>
                <Mail className='h-5 w-5' style={{ color: 'var(--ssc-seafoam-deep)' }} />
                <h2 className='font-serif text-xl font-semibold'>Or send a message</h2>
              </div>
              {sent ? (
                <div className='flex flex-col items-center gap-4 py-12 text-center'>
                  <CheckCircle className='h-12 w-12' style={{ color: 'var(--ssc-seafoam)' }} />
                  <h3 className='font-serif text-xl font-bold' style={{ color: 'var(--ssc-text-dark)' }}>Message sent!</h3>
                  <p className='text-sm' style={{ color: 'var(--ssc-text-dark-mute)' }}>
                    I&apos;ll get back to you within one business day.
                  </p>
                </div>
              ) : (
                <Card className='border bg-white' style={{ borderColor: 'var(--ssc-line-light)' }}>
                  <CardHeader className='pb-4'>
                    <CardTitle className='font-serif text-base' style={{ color: 'var(--ssc-text-dark)' }}>Quick message</CardTitle>
                    <CardDescription style={{ color: 'var(--ssc-text-dark-mute)' }}>
                      Prefer to write first? Describe your project and I&apos;ll follow up.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                      <div className='grid gap-4 sm:grid-cols-2'>
                        <div className='space-y-2'>
                          <Label htmlFor='name'>Name</Label>
                          <Input id='name' name='name' required placeholder='Your name' />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='email'>Email</Label>
                          <Input id='email' name='email' type='email' required placeholder='you@example.com' />
                        </div>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='organization'>Organization (optional)</Label>
                        <Input id='organization' name='organization' placeholder='Company or organization' />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='service-type'>What are you interested in?</Label>
                        <Select name='service-type'>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a service' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='website-copy'>Website copy</SelectItem>
                            <SelectItem value='research-report'>Research report</SelectItem>
                            <SelectItem value='grant-writing'>Grant writing</SelectItem>
                            <SelectItem value='not-sure-yet'>Not sure yet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='message'>Message</Label>
                        <Textarea
                          id='message'
                          name='message'
                          required
                          rows={6}
                          placeholder="Tell me about your project — what you're working on, your goals, and any specific questions..."
                        />
                      </div>
                      <button
                        type='submit'
                        disabled={loading}
                        className='inline-flex w-full items-center justify-center gap-2 rounded-full px-[1.6em] py-[0.95em] text-[0.98rem] font-semibold transition-all duration-300 hover:-translate-y-[2px] disabled:opacity-70'
                        style={{
                          background: 'var(--ssc-seafoam)',
                          color: 'var(--ssc-ink)',
                          boxShadow: '0 10px 30px -10px rgba(95,227,201,.6)',
                        }}
                      >
                        {loading ? 'Sending\u2026' : 'Send Message'}
                      </button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
