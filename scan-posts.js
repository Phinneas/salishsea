#!/usr/bin/env node

/**
 * Scan all SonicJS posts for malformed data
 */

const SONICJS_URL = 'https://sonicjscms.buzzuw2.workers.dev'
const BLOG_COLLECTION = 'col-blog-posts-94b7858e'
const SITE_CATEGORY = 'salishsea'

async function scanPosts() {
  console.log('🔍 Scanning all SonicJS posts for malformed data...\n')
  
  const url = `${SONICJS_URL}/api/content?collectionId=${BLOG_COLLECTION}&status=published&limit=300&offset=0`
  
  try {
    const res = await fetch(url)
    const text = await res.text()
    
    let json
    try {
      json = JSON.parse(text)
    } catch (e) {
      console.log('❌ Invalid JSON in main response')
      console.log('Error:', e.message)
      
      // Try to find the bad post by parsing individually
      console.log('\n🧩 Attempting to parse posts individually...')
      
      // Split by "{"id": to try to isolate posts
      const postChunks = text.split('{"id":')
      
      for (let i = 1; i < postChunks.length; i++) {
        const chunk = '{"id":' + postChunks[i]
        // Find the end of this post (look for next closing brace of main object)
        try {
          JSON.parse(chunk.substring(0, chunk.indexOf('"updated_at"') + 60))
        } catch (postError) {
          console.log(`  Potential issue near post ${i}`)
          console.log(`  First 200 chars: ${chunk.substring(0, 200)}`)
        }
      }
      
      return
    }
    
    const posts = json.data || []
    console.log(`Total posts: ${posts.length}\n`)
    
    let corrupted = []
    let malformed = []
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      try {
        // Validate each field individually
        const title = post.title
        const slug = post.slug
        const status = post.status
        const data = post.data
        
        // Check if data exists
        if (!data) {
          malformed.push({ index: i, id: post.id, reason: 'Missing data object' })
          continue
        }
        
        // Try to stringify the entire post to catch any JSON errors
        JSON.stringify(post)
        
        // Try to stringify nested fields
        if (data.content) JSON.stringify(data.content)
        if (data.excerpt) JSON.stringify(data.excerpt)
        
      } catch (e) {
        corrupted.push({
          index: i,
          id: post.id,
          title: post.title || 'Untitled',
          slug: post.slug || 'no-slug',
          error: e.message
        })
      }
    }
    
    if (malformed.length > 0) {
      console.log(`⚠️  Found ${malformed.length} malformed posts:`)
      malformed.forEach(p => console.log(`  - Post ${p.index}: ${p.id} - ${p.reason}`))
    }
    
    if (corrupted.length > 0) {
      console.log(`❌ Found ${corrupted.length} corrupted posts:`)
      corrupted.forEach(p => console.log(`  - Post ${p.index}: ${p.title} (${p.slug}) - ${p.error}`))
    } else {
      console.log('✅ All posts are valid JSON!')
    }
    
    // Now filter to only show salishsea category posts
    console.log('\n🏷️  Filtering by salishsea category...\n')
    
    const salishPosts = posts.filter(p => p.data?.category === SITE_CATEGORY)
    console.log(`Found ${salishPosts.length} posts with "salishsea" category\n`)
    
    salishPosts.forEach(p => {
      console.log(`  - ${p.title} (${p.slug || 'no-slug'})`)
    })
    
    if (salishPosts.length === 0) {
      console.log('\n💡 No posts have the "salishsea" category.')
      console.log('Check that your posts are tagged correctly in SonicJS admin.')
    }
    
  } catch (error) {
    console.error('❌ Failed to fetch:', error.message)
  }
}

scanPosts().catch(console.error)
