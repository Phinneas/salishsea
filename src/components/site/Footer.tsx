import Link from 'next/link'

export function Footer() {
  return (
    <footer className='border-t border-border bg-muted/30'>
      <div className='mx-auto max-w-6xl px-4 py-12 sm:px-6'>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          <div className='sm:col-span-2 lg:col-span-2'>
            <p className='text-base font-semibold text-foreground'>
              Salish Sea <span className='text-teal-600'>Consulting</span>
            </p>
            <p className='mt-2 max-w-xs text-sm text-muted-foreground'>
              Conscious marketing for sustainable brands. Conversion copywriting, grant writing, and custom
              marketing tools for mission-driven organizations.
            </p>
          </div>

          <div>
            <p className='text-sm font-semibold text-foreground'>Navigation</p>
            <ul className='mt-3 space-y-2'>
              {['/', '/services', '/about', '/blog', '/contact'].map((href, i) => (
                <li key={href}>
                  <Link href={href} className='text-sm text-muted-foreground hover:text-foreground'>
                    {['Home', 'Services', 'About', 'Blog', 'Contact'][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className='text-sm font-semibold text-foreground'>Contact</p>
            <ul className='mt-3 space-y-2 text-sm text-muted-foreground'>
              <li>Pacific Northwest</li>
              <li>
                <Link href='/contact' className='hover:text-foreground'>
                  Send a message
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground'>
          © {new Date().getFullYear()} Salish Sea Consulting. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
