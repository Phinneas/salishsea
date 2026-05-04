#!/usr/bin/env node

/**
 * Raw inspection of SonicJS response
 */

const SONICJS_URL = 'https://sonicjscms.buzzuw2.workers.dev'
const BLOG_COLLECTION = 'col-blog-posts-94b7858e'

async function rawInspect() {
  console.log('🔬 Raw inspection of SonicJS response...\n')
  
  const url = `${SONICJS_URL}/api/content?collectionId=${BLOG_COLLECTION}&limit=300&offset=0`
  
  try {
    const res = await fetch(url)
    const text = await res.text()
    
    console.log('Response info:')
    console.log(`  Status: ${res.status}`)
    console.log(`  Status text: ${res.statusText}`)
    console.log(`  Content-Type: ${res.headers.get('content-type')}`)
    console.log(`  Length: ${text.length} characters`)
    console.log()
    
    // Try to parse
    let parsed
    try {
      parsed = JSON.parse(text)
      console.log('✅ Parse successful!')
      console.log('  Top-level keys:', Object.keys(parsed).join(', '))
      console.log()
      
      if (parsed.error) {
        console.log('❌ API returned error:', parsed.error)
        if (parsed.details) console.log('  Details:', parsed.details)
        return
      }
      
      if (parsed.data) {
        console.log('📊 Data structure:')
        console.log(`  Type: ${Array.isArray(parsed.data) ? 'Array' : typeof parsed.data}`)
        
        if (Array.isArray(parsed.data)) {
          console.log(`  Length: ${parsed.data.length}`)
          if (parsed.data.length > 0) {
            console.log('  First item structure:', Object.keys(parsed.data[0]))
            console.log('\n  First item preview:')
            console.log(JSON.stringify(parsed.data[0], null, 2).substring(0, 500))
          }
        }
      } else {
        console.log('⚠️  No "data" field in response')
        console.log('Raw response:')
        console.log(text.substring(0, 500))
      }
      
    } catch (e) {
      console.log('❌ Parse failed:', e.message)
      console.log('\nRaw text (first 500 chars):')
      console.log(text.substring(0, 500))
      
      // Look for the word "error"
      const errorIndex = text.toLowerCase().indexOf('error')
      if (errorIndex > -1) {
        console.log(`\nFound "error" at position ${errorIndex}`)
        console.log('Context:', text.substring(errorIndex - 50, errorIndex + 100))
      }
    }
    
  } catch (error) {
    console.error('❌ Failed to fetch:', error.message)
  }
}

rawInspect().catch(console.error)
