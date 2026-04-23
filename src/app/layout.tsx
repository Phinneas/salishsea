import type { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import './globals.css'

const fontSans = Geist({ subsets: ['latin'], variable: '--font-sans' })
const fontMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.salishseaconsulting.com'

export const metadata: Metadata = {
  title: {
    template: '%s | Salish Sea Consulting',
    default: 'Salish Sea Consulting',
  },
  description:
    'Environmental and sustainability consulting for the Pacific Northwest. Helping organizations navigate complex ecological challenges.',
  keywords: ['environmental consulting', 'sustainability', 'Pacific Northwest', 'Salish Sea', 'ecology'],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Salish Sea Consulting',
    description: 'Environmental and sustainability consulting for the Pacific Northwest.',
    type: 'website',
    siteName: 'Salish Sea Consulting',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salish Sea Consulting',
    description: 'Environmental and sustainability consulting for the Pacific Northwest.',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={cn(fontSans.variable, fontMono.variable, 'scroll-smooth')}>
      <body className='flex min-h-full w-full flex-auto flex-col bg-background text-foreground antialiased'>
        <ThemeProvider attribute='class' defaultTheme='light' disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
