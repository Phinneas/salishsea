import type { ReactNode } from 'react'
import { Montserrat, Merriweather } from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import './globals.css'

const fontSans = Montserrat({ subsets: ['latin'], variable: '--font-sans', weight: ['400', '500', '600', '700'] })
const fontSerif = Merriweather({ subsets: ['latin'], variable: '--font-serif', weight: ['400', '700'] })

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.salishseaconsulting.com'

export const metadata: Metadata = {
  title: {
    template: '%s | Salish Sea Consulting',
    default: 'Salish Sea Consulting',
  },
  description:
    'Conscious marketing for sustainable brands. Conversion copywriting, grant writing, and custom marketing tools for mission-driven organizations.',
  keywords: ['sustainable marketing', 'conversion copywriter', 'grant writing', 'sustainability consulting', 'Pacific Northwest', 'Salish Sea', 'environmental marketing'],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Salish Sea Consulting',
    description: 'Conscious marketing for sustainable brands. Conversion copywriting, grant writing, and custom marketing tools.',
    type: 'website',
    siteName: 'Salish Sea Consulting',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salish Sea Consulting',
    description: 'Conscious marketing for sustainable brands. Conversion copywriting, grant writing, and custom marketing tools.',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={cn(fontSans.variable, fontSerif.variable, 'scroll-smooth')}>
      <body className='flex min-h-full w-full flex-auto flex-col bg-background text-foreground antialiased'>
        <ThemeProvider attribute='class' defaultTheme='light' disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
