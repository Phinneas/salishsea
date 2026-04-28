'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CheckCircle, Calendar, Mail } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [calReady, setCalReady] = useState(false)
  const [calError, setCalError] = useState(false)

  // Load Cal.com embed
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('cal-embed-script')) {
      // If script exists, try to initialize calendar
      const w = window as any
      if (w.Cal) {
        initializeCal(w.Cal)
      }
      return
    }

    // Create and load script
    const script = document.createElement('script')
    script.id = 'cal-embed-script'
    script.src = 'https://cal.com/embed.js'
    script.async = true

    script.onload = () => {
      const w = window as any
      if (w.Cal) {
        initializeCal(w.Cal)
      }
    }

    script.onerror = () => {
      console.error('Failed to load Cal.com embed script')
      setCalError(true)
      setCalReady(false)
    }

    document.head.appendChild(script)

    // Cleanup function
    return () => {
      // Don't remove script on unmount to avoid reloads
    }
  }, [])

  // Separate initialization function with retry logic
  const initializeCal = (Cal: any) => {
    const maxRetries = 3
    let attempts = 0

    const tryInit = () => {
      attempts++
      try {
        Cal('init', { origin: 'https://cal.com' })
        Cal('inline', {
          elementOrSelector: '#cal-inline',
          calLink: 'chester-beard/30min',
          layout: 'month_view',
        })
        Cal('ui', { 
          hideEventTypeDetails: false, 
          layout: 'month_view',
          theme: 'light'
        })
        setCalReady(true)
        console.log('Cal.com calendar initialized successfully')
      } catch (error) {
        console.error(`Failed to initialize Cal.com calendar (attempt ${attempts}):`, error)
        if (attempts < maxRetries) {
          setTimeout(tryInit, 500 * attempts) // Retry with exponential backoff
        } else {
          setCalReady(false)
          setCalError(true)
        }
      }
    }

    tryInit()
  }

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
      {/* Header */}
      <section className='bg-gradient-to-br from-teal-950 to-slate-900 px-4 py-20 text-white sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>Let&apos;s Talk</h1>
          <p className='mt-4 text-lg text-teal-100/80'>
            Pick a time that works for you, or send a message and I&apos;ll reply within one business day.
          </p>
        </div>
      </section>

      <section className='px-4 py-16 sm:px-6'>
        <div className='mx-auto max-w-6xl'>
          {/* Direct email fallback */}
          <p className='mb-8 text-center text-sm text-muted-foreground'>
            Prefer email?{' '}
            <a href='mailto:chesterbeard@salishseaconsulting.com' className='text-teal-600 hover:underline'>
              chesterbeard@salishseaconsulting.com
            </a>
          </p>
          <div className='grid gap-12 lg:grid-cols-[1fr_420px]'>

            {/* Cal.com inline embed */}
            <div>
              <div className='mb-6 flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-teal-600' />
                <h2 className='text-xl font-semibold'>Book a free 30-minute call</h2>
              </div>
              <p className='mb-6 text-sm text-muted-foreground'>
                Pick a time directly from my calendar. No back-and-forth needed.
              </p>
              {/* Cal.com embed target */}
              <div
                id='cal-inline'
                className='min-h-[600px] w-full rounded-lg border border-border overflow-hidden bg-background'
                style={{ minHeight: 600 }}
              />
              {!calReady && !calError && (
                <div className='flex min-h-[600px] items-center justify-center rounded-lg border border-border text-muted-foreground text-sm'>
                  Loading calendar…
                </div>
              )}
              {calError && (
                <div className='flex min-h-[600px] flex-col items-center justify-center rounded-lg border border-border text-center'>
                  <p className='text-muted-foreground text-sm mb-4'>
                    Unable to load the calendar. 
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    You can still book a call using the link below.
                  </p>
                </div>
              )}
              {/* Fallback direct link */}
              <p className='mt-3 text-center text-xs text-muted-foreground'>
                Or{' '}
                <Link
                  href='https://cal.com/chester-beard/30min'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-teal-600 hover:underline'
                >
                  open the scheduling page directly →
                </Link>
              </p>
            </div>

            {/* Contact form */}
            <div>
              <div className='mb-6 flex items-center gap-2'>
                <Mail className='h-5 w-5 text-teal-600' />
                <h2 className='text-xl font-semibold'>Or send a message</h2>
              </div>
              {sent ? (
                <div className='flex flex-col items-center gap-4 py-12 text-center'>
                  <CheckCircle className='h-12 w-12 text-teal-600' />
                  <h3 className='text-xl font-bold'>Message sent!</h3>
                  <p className='text-muted-foreground text-sm'>
                    I&apos;ll get back to you within one business day.
                  </p>
                </div>
              ) : (
                <Card className='border-border/50'>
                  <CardHeader className='pb-4'>
                    <CardTitle className='text-base'>Quick message</CardTitle>
                    <CardDescription>
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
                        <Label htmlFor='message'>Message</Label>
                        <Textarea
                          id='message'
                          name='message'
                          required
                          rows={6}
                          placeholder="Tell me about your project — what you're working on, your goals, and any specific questions..."
                        />
                      </div>
                      <Button
                        type='submit'
                        className='w-full bg-teal-600 hover:bg-teal-700'
                        disabled={loading}
                      >
                        {loading ? 'Sending…' : 'Send Message'}
                      </Button>
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
