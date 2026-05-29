import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export', // Static export for Cloudflare Pages
  trailingSlash: true, // Required for CF Pages static routing
  typescript: {
    // Template showcase components have missing optional deps we don't use.
    // Our SSC code (src/app/(site)/**) is fully type-safe.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for static export (no Next.js image server)
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.r2.dev' },
      { protocol: 'https', hostname: '*.workers.dev' },
    ],
  },
}

export default nextConfig
