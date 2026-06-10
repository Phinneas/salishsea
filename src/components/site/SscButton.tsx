import Link from 'next/link'

type SscButtonVariant = 'primary' | 'secondary' | 'outline'

interface SscButtonProps {
  variant?: SscButtonVariant
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
  size?: 'sm' | 'lg'
}

const styles: Record<SscButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--ssc-seafoam)',
    color: 'var(--ssc-ink)',
    boxShadow: '0 10px 30px -10px rgba(95,227,201,.6)',
  },
  secondary: {
    background: 'var(--ssc-navy)',
    color: 'var(--ssc-text-light)',
    borderColor: 'transparent',
  },
  outline: {
    background: 'rgba(255,255,255,.04)',
    color: 'var(--ssc-text-light)',
    borderColor: 'rgba(220,236,236,.28)',
  },
}

const sizeClasses: Record<string, string> = {
  sm: 'px-[1.2em] py-[0.6em] text-[0.85rem]',
  lg: 'px-[1.6em] py-[0.95em] text-[0.98rem]',
}

export function SscButton({ variant = 'primary', href, children, external, className = '', size = 'lg' }: SscButtonProps) {
  const isOutline = variant === 'outline'
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-[3px] ${isOutline ? 'border hover:border-[var(--ssc-seafoam)] hover:bg-white/10' : ''} ${sizeClasses[size]} ${className}`}
      style={styles[variant]}
    >
      {children}
    </Link>
  )
}
