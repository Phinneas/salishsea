'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeToggle } from '@/components/site/ThemeToggle'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' style={{ borderColor: 'var(--ssc-line-light)' }}>
      <div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/ssc-logo.png'
            alt='Salish Sea Consulting'
            className='h-9 w-auto'
            onError={(e) => {
              const el = e.currentTarget
              el.style.display = 'none'
              el.nextElementSibling?.removeAttribute('hidden')
            }}
          />
          <span hidden className='text-lg font-semibold tracking-tight' style={{ color: 'var(--ssc-text-dark)' }}>
            Salish Sea <span style={{ color: 'var(--ssc-seafoam)' }}>Consulting</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-6 md:flex'>
          {nav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'font-space-mono text-[0.82rem] font-medium uppercase tracking-[0.08em] transition-colors',
                pathname === item.href ? 'text-[var(--ssc-text-dark)]' : 'text-[var(--ssc-text-dark-mute)] hover:text-[var(--ssc-text-dark)]',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='hidden items-center gap-2 md:flex'>
          <ThemeToggle />
          <Link
            href='/contact'
            className='inline-flex items-center gap-2 rounded-full px-[1.2em] py-[0.6em] text-[0.85rem] font-semibold transition-all duration-300 hover:-translate-y-[2px]'
            style={{
              background: 'var(--ssc-seafoam)',
              color: 'var(--ssc-ink)',
              boxShadow: '0 6px 18px -8px rgba(95,227,201,.5)',
            }}
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className='flex items-center gap-2 md:hidden'>
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label='Toggle menu' style={{ color: 'var(--ssc-text-dark)' }}>
            {open ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className='border-t md:hidden' style={{ borderColor: 'var(--ssc-line-light)' }}>
          <nav className='flex flex-col gap-1 px-4 py-3'>
            {nav.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2 font-space-mono text-[0.82rem] font-medium uppercase tracking-[0.08em] transition-colors',
                  pathname === item.href ? 'text-[var(--ssc-text-dark)]' : 'text-[var(--ssc-text-dark-mute)]',
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href='/contact'
              onClick={() => setOpen(false)}
              className='mt-2 inline-flex items-center justify-center gap-2 rounded-full px-[1.2em] py-[0.6em] text-[0.85rem] font-semibold transition-all duration-300'
              style={{
                background: 'var(--ssc-seafoam)',
                color: 'var(--ssc-ink)',
              }}
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
