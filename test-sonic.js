#!/usr/bin/env node

/**
 * Test SonicJS collection directly
 */

const SONICJS_URL = 'https://sonicjscms.buzzuw2.workers.dev'
const BLOG_COLLECTION = 'col-blog-posts-94b7858e'

async function testSonic() {
  console.log('🧪 Testing SonicJS...\n')
  
  const urls = [
    `${SONICJS_URL}/api/content`,
    `${SONICJS_URL}/api/content?collectionId=${BLOG_COLLECTION}`,
    `${SONICJS_URL}/api/content?collectionId=${BLOG_COLLECTION}&status=published`,
  ]
  
  for (const url of urls) {
    console.log(`Testing: ${url}`)
    try {
      const res = await fetch(url)
      const text = await res.text()
      
      console.log(`  Status: ${res.status}`)
      console.log(`  Response length: ${text.length} characters`)
      console.log(`  First 200 chars: ${text.substring(0, 200)}`)
      
      try {
        const json = JSON.parse(text)
        console.log(`  ✅ Valid JSON! Posts: ${json.data?.length || 0}`)
      } catch (e) {
        console.log(`  ❌ JSON Error: ${e.message}`)
        // Show characters around the error position
        const pos = parseInt(e.message.match(/position (\d+)/)?.[1] || '0')
        const start = Math.max(0, pos - 50)
        const end = Math.min(text.length, pos + 50)
        console.log(`  Context: ...${text.substring(start, end)}...`)
      }
      
      console.log()
    } catch (error) {
      console.log(`  ❌ Request failed: ${error.message}\n`)
    }
  }
}

testSonic().catch(console.error)
