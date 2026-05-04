#!/usr/bin/env node

/**
 * Check all posts and their categories to see what's wrong
 */

const SONICJS_URL = 'https://sonicjscms.buzzuw2.workers.dev'
const BLOG_COLLECTION = 'col-blog-posts-94b7858e'
const ALLOWED_SLUGS = new Set([
  // Grant Writing
  'sample-letter-of-support',
  'grant-writing-vs-proposal-writing',
  'sustainable-grant-proposal',
  'grant-funding-letter-of-inquiry',
  'grants-for-restoring-historic-buildings',
  'how-to-pay-a-grant-writer',
  'theory-of-change-vs-logic-models',
  'grant-funding-logic-models',
  'ai-in-grant-writing',
  'grant-writing-challenges',
  'nsf-sbir-grants',
  'startup-funding-grants',
  'grant-research-tools',
  'common-nonprofit-grants-in-2025',
  // Nonprofit
  'the-collective-impact-model',
  'nonprofit-funding-models',
  'developing-logic-models',
  'starting-an-oregon-nonprofit',
  'nonprofit-registration-guide',
  'nonprofit-copywriter',
  'nonprofit-copywriting',
  'artificial-intelligence-for-nonprofits',
  // Sustainability
  'sustainability-content-writer',
  '10-sustainability-trends-2025',
  'sustainability-certifications',
  '3-pillars-of-sustainability',
  'environmental-consulting',
  'green-living',
  'esg-certification',
  'the-four-pillars-of-sustainability',
  'green-cloud',
  'strategy-pillars',
  // Copywriting
  'opposite-of-evergreen-content',
  'storytelling-copywriter',
  'benefits-vs-features-copywriting',
  'golden-thread-copywriting',
  'conscious-copywriting',
  'sales-funnel-copywriter',
  'storytelling-for-copywriting',
  'author-pr-campaign',
  'copywriter-job-description',
  'business-letter-format',
  // Tech/Tools
  'pikapods',
  'jenni-ai-review',
  'firecrawl',
  'carrd-website-builder',
  'walling-app-review',
  'ghost-website',
  'best-ai-note-taking-apps',
  'showit-websites',
  'snovio-email-tracker-review',
  'artificial-narrow-intelligence',
  'folk-crm',
  'attio-crm',
  'seranking-seo-tool',
  'entity-based-semantic-seo-keywords',
  'n8n-alternatives',
  'dubsado-crm-for-creatives',
])

async function checkPosts() {
  console.log('🔍 Checking all SonicJS posts...\n')
  
  const url = `${SONICJS_URL}/api/content?collectionId=${BLOG_COLLECTION}&limit=300&offset=0`
  
  try {
    const res = await fetch(url)
    const json = await res.json()
    const allPosts = json.data || []
    
    console.log(`Total posts in collection: ${allPosts.length}\n`)
    
    if (allPosts.length === 0) {
      console.log('⚠️  No posts found in this collection')
      return
    }
    
    console.log('Posts overview:')
    allPosts.forEach((post, i) => {
      const category = post.data?.category || 'NO CATEGORY'
      const slug = post.slug || 'no-slug'
      const allowed = ALLOWED_SLUGS.has(slug) ? '✓' : '✗'
      
      console.log(`[${i}] ${allowed} ${category.padEnd(15)} - ${post.title} (${slug})`)
    })
    
    console.log('\n📊 Summary:')
    const categories = {}
    let allowedCount = 0
    
    allPosts.forEach(post => {
      const cat = post.data?.category || 'undefined'
      categories[cat] = (categories[cat] || 0) + 1
      
      if (ALLOWED_SLUGS.has(post.slug || '')) {
        allowedCount++
      }
    })
    
    console.log('Categories:')
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`)
    })
    
    console.log(`\nAllowed slugs (from migration): ${allowedCount}`)
    
    // Show only salishsea category
    const salishPosts = allPosts.filter(p => p.data?.category === 'salishsea')
    
    if (salishPosts.length === 0) {
      console.log('\n❌ No posts with category="salishsea" found!')
      console.log('\n💡 To fix this:')
      console.log('   1. Log into SonicJS admin panel')
      console.log('   2. Go to the col-blog-posts-94b7858e collection')
      console.log('   3. Edit each post and set the category field to: salishsea')
      console.log('   4. Save each post')
    } else {
      console.log(`\n✅ Found ${salishPosts.length} posts with category="salishsea":`)
      salishPosts.forEach(p => console.log(`   - ${p.title}`))
    }
    
  } catch (error) {
    console.error('❌ Failed to fetch:', error.message)
  }
}

checkPosts().catch(console.error)
