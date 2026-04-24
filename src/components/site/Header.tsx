'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/site/ThemeToggle'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' }
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/ssc-logo.png'
            alt='Salish Sea Consulting'
            className='h-9 w-auto'
            onError={(e) => {
              // Fallback to text if image not found
              const el = e.currentTarget
              el.style.display = 'none'
              el.nextElementSibling?.removeAttribute('hidden')
            }}
          />
          <span hidden className='text-lg font-semibold tracking-tight text-foreground'>
            Salish Sea <span className='text-teal-600'>Consulting</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-6 md:flex'>
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-foreground',
                pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='hidden md:flex items-center gap-2'>
          <ThemeToggle />
          <Button asChild size='sm' className='bg-teal-600 hover:bg-teal-700'>
            <Link href='/contact'>Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <div className='flex items-center gap-2 md:hidden'>
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label='Toggle menu'>
          {open ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className='border-t border-border md:hidden'>
          <nav className='flex flex-col gap-1 px-4 py-3'>
            {nav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                  pathname === item.href ? 'bg-muted text-foreground' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size='sm' className='mt-2 bg-teal-600 hover:bg-teal-700'>
              <Link href='/contact' onClick={() => setOpen(false)}>
                Get in Touch
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
