'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

// Note: metadata can't be exported from a 'use client' component.
// Move to a server wrapper if you need custom OG tags on /contact.

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // TODO: wire to your preferred email service (Resend, Mailgun, etc.)
    // For now, simulate a submission
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <div>
      {/* Header */}
      <section className='bg-gradient-to-br from-teal-950 to-slate-900 px-4 py-20 text-white sm:px-6'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>Get in Touch</h1>
          <p className='mt-4 text-lg text-teal-100/80'>
            Tell us about your project. We respond within one business day.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className='px-4 py-20 sm:px-6'>
        <div className='mx-auto max-w-lg'>
          {sent ? (
            <div className='flex flex-col items-center gap-4 py-16 text-center'>
              <CheckCircle className='h-12 w-12 text-teal-600' />
              <h2 className='text-2xl font-bold'>Message sent!</h2>
              <p className='text-muted-foreground'>
                Thank you for reaching out. We&apos;ll be in touch within one business day.
              </p>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
                <CardDescription>
                  Describe your project or question and we&apos;ll get back to you shortly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className='space-y-5'>
                  <div className='grid gap-5 sm:grid-cols-2'>
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
                      rows={5}
                      placeholder="Tell us about your project — what you're working on, your timeline, and any specific questions..."
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
      </section>
    </div>
  )
}
