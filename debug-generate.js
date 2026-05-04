#!/usr/bin/env node

/**
 * Debug generateStaticParams to see where the error is occurring
 */

const SONICJS_URL = 'https://sonicjscms.buzzuw2.workers.dev'
const BLOG_COLLECTION = 'col-blog-posts-94b7858e'
const SITE_CATEGORY = 'salishsea'

// Simulate the exact function logic
async function getAllPostSlugs() {
  console.log('1. Starting getAllPostSlugs()')
  try {
    const url = `${SONICJS_URL}/api/content?collectionId=${BLOG_COLLECTION}&status=published&limit=300&offset=0`
    console.log('2. Fetching:', url)
    
    const res = await fetch(url)
    console.log('3. Response status:', res.status)
    
    if (!res.ok) {
      console.error('4. Response not OK:', res.status)
      throw new Error(`SonicJS ${res.status} — ${url}`)
    }
    
    console.log('5. Reading response text...')
    const text = await res.text()
    console.log('6. Response text length:', text.length)
    
    console.log('7. Parsing JSON...')
    const json = JSON.parse(text)
    console.log('8. JSON parsed, data length:', json.data?.length)
    
    const slugs = json.data
      .filter(i => i.data?.category === SITE_CATEGORY)
      .map(i => i.slug ?? i.data?.slug)
      .filter(Boolean)
    
    console.log('9. Filtered slugs:', slugs.length)
    return slugs
    
  } catch (error) {
    console.error('Error in getAllPostSlugs:', error.message)
    return []
  }
}

// Test the generateStaticParams logic
console.log('🔍 Testing generateStaticParams logic...\n')

console.log('Calling getAllPostSlugs()...\n')
const slugs = await getAllPostSlugs()

console.log('\n✅ Success! Slugs:', slugs)
console.log('\nMapped to:', slugs.map(s => ({ slug: s })))
