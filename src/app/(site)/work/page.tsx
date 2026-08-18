import type { Metadata } from 'next'
import { StampCollection } from '@/components/site/StampCollection'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Sites, directories, tools, and networks built by Salish Sea Consulting across sustainability, wellness, food, and the outdoors.',
  alternates: {
    canonical: '/work/',
  },
}

export default function WorkPage() {
  return <StampCollection />
}
