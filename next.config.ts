import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      // SonicJS media — update with your Cloudflare R2/Workers URL
      {
        protocol: 'https',
        hostname: '*.r2.dev'
      },
      {
        protocol: 'https',
        hostname: '*.workers.dev'
      }
    ]
  }
}

export default nextConfig
