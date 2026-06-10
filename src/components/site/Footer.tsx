import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ background: 'var(--ssc-navy-2)', color: 'var(--ssc-text-light)', borderTop: '1px solid var(--ssc-line-dark)' }}>
      <div className='mx-auto max-w-6xl px-4 py-12 sm:px-6'>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='sm:col-span-2 lg:col-span-2'>
            <p className='font-space-grotesk text-base font-semibold' style={{ color: 'var(--ssc-text-light)' }}>
              Salish Sea <span style={{ color: 'var(--ssc-seafoam)' }}>Consulting</span>
            </p>
            <p className='mt-2 max-w-xs text-sm' style={{ color: 'var(--ssc-text-mute)' }}>
              Content and communications for sustainability conscious brands. Conversion copywriting, grant writing, and custom
              marketing tools for mission-driven organizations.
            </p>
          </div>

          <div>
            <p className='font-space-grotesk text-sm font-semibold' style={{ color: 'var(--ssc-text-light)' }}>Navigation</p>
            <ul className='mt-3 space-y-2'>
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/work', label: 'Work' },
                { href: '/about', label: 'About' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
              ].map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className='font-space-mono text-sm transition-colors hover:text-[var(--ssc-seafoam)]'
                    style={{ color: 'var(--ssc-text-mute)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='font-space-grotesk text-sm font-semibold' style={{ color: 'var(--ssc-text-light)' }}>Contact</p>
            <ul className='mt-3 space-y-2 text-sm' style={{ color: 'var(--ssc-text-mute)' }}>
              <li>Pacific Northwest</li>
              <li>
                <Link href='/contact' className='transition-colors hover:text-[var(--ssc-seafoam)]'>
                  Send a message
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-10 pt-6 text-center font-space-mono text-xs' style={{ borderTop: '1px solid var(--ssc-line-dark)', color: 'var(--ssc-text-mute)' }}>
          &copy; {new Date().getFullYear()} Salish Sea Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
