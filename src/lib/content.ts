import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const CONTENT_DIR = path.join(process.cwd(), 'src/content/blog')

marked.setOptions({ gfm: true, breaks: false })

function cleanGhostContent(html: string): string {
  return html
    // Remove <figure> blocks containing Ghost image URLs
    .replace(/<figure[^>]*>[\s\S]*?__GHOST_URL__[\s\S]*?<\/figure>/gi, '')
    // Remove standalone <img> tags with Ghost URLs in src
    .replace(/<img[^>]*src="[^"]*__GHOST_URL__[^"]*"[^>]*>/gi, '')
    // Fix internal links: __GHOST_URL__/blog/... -> /blog/...
    .replace(/__GHOST_URL__\/blog\//gi, '/blog/')
    // Fix any remaining Ghost URLs (non-blog paths) to relative paths
    .replace(/__GHOST_URL__/gi, '')
}

function markdownToHtml(markdown: string): string {
  return cleanGhostContent(marked.parse(markdown) as string)
}

export interface BlogPost {
  slug: string
  title: string
  excerpt?: string
  content: string
  html: string
  feature_image?: string
  published_at: string
  updated_at?: string
  author?: string
  reading_time?: number
  featured?: boolean
  tags?: string[]
}

function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))

  const posts = files.map(file => {
    const slug = file.replace(/\.mdx$/, '')
    const filePath = path.join(CONTENT_DIR, file)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug,
      title: data.title ?? slug,
      excerpt: data.excerpt ?? undefined,
      content,
      html: markdownToHtml(content),
      feature_image: data.featuredImage && !String(data.featuredImage).includes('__GHOST_URL__')
        ? String(data.featuredImage)
        : undefined,
      published_at: data.publishedAt && data.publishedAt !== ''
        ? String(data.publishedAt)
        : '1970-01-01T00:00:00.000Z',
      updated_at: data.updatedAt ?? undefined,
      author: data.author ?? undefined,
      reading_time: data.readTime ?? estimateReadTime(content),
      featured: data.featured ?? false,
      tags: data.tags
        ? String(data.tags).split(',').map((t: string) => t.trim()).filter(Boolean)
        : [],
    } satisfies BlogPost
  })

  return posts.sort((a, b) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  )
}

export function getPost(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? undefined,
    content,
    html: markdownToHtml(content),
    feature_image: data.featuredImage && !String(data.featuredImage).includes('__GHOST_URL__')
      ? String(data.featuredImage)
      : undefined,
    published_at: data.publishedAt ?? new Date().toISOString(),
    updated_at: data.updatedAt ?? undefined,
    author: data.author ?? undefined,
    reading_time: data.readTime ?? estimateReadTime(content),
    featured: data.featured ?? false,
    tags: data.tags
      ? String(data.tags).split(',').map((t: string) => t.trim()).filter(Boolean)
      : [],
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}
