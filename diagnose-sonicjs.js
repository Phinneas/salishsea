#!/usr/bin/env node

/**
 * Diagnose SonicJS JSON corruption
 * Identifies which post has the "Bad escaped character" error
 */

const SONICJS_URL = 'https://sonicjscms.buzzuw2.workers.dev'
const BLOG_COLLECTION = 'col-blog-posts-94b7858e'

async function diagnose() {
  console.log('🔍 Diagnosing SonicJS JSON corruption...\n')
  
  const url = `${SONICJS_URL}/api/content?collectionId=${BLOG_COLLECTION}&status=published&limit=300&offset=0`
  
  try {
    const response = await fetch(url)
    const text = await response.text()
    
    console.log('Total response length:', text.length, 'characters\n')
    
    // Try to parse individual posts
    // SonicJS returns: { data: [...posts...] }
    try {
      const json = JSON.parse(text)
      console.log('✅ JSON parsed successfully!')
      console.log('Total posts found:', json.data?.length || 0)
      
      if (json.data && json.data.length > 0) {
        console.log('\n📊 Posts in collection:')
        json.data.forEach((post, i) => {
          console.log(`  [${i}] ${post.title || 'Untitled'} (ID: ${post.id})`)
        })
      }
      
      return
    } catch (jsonError) {
      console.log('❌ JSON parsing failed at character', jsonError.message.match(/position (\d+)/)?.[1])
      console.log('Error:', jsonError.message, '\n')
    }
    
    // If direct parsing fails, try to find the bad character
    console.log('🔬 Looking for malformed JSON around position 757...\n')
    
    // Extract the problematic area
    const start = Math.max(0, 757 - 100)
    const end = Math.min(text.length, 757 + 100)
    const problemArea = text.substring(start, end)
    
    console.log('Problem area (character', start, 'to', end, '):')
    console.log('='.repeat(60))
    console.log(problemArea)
    console.log('='.repeat(60))
    console.log()
    
    // Look for common JSON errors
    const lines = problemArea.split('\n')
    
    console.log('🔍 Common issues detected:')
    
    // Check for unescaped newlines in strings
    if (problemArea.match(/"[^"]*\n[^"]*"/)) {
      console.log('  ❌ Found unescaped newline in string')
    }
    
    // Check for invalid escape sequences
    if (problemArea.match(/\\[^"\\/bfnrtu]/)) {
      console.log('  ❌ Found invalid escape sequence (like \\x or \\Z)')
    }
    
    // Check for backslashes that should be escaped
    const backslashMatches = problemArea.match(/\\(?!["\\/bfnrt])/g)
    if (backslashMatches) {
      console.log('  ❌ Found', backslashMatches.length, 'unescaped backslashes')
    }
    
    // Check for malformed Unicode escapes
    if (problemArea.match(/\\u[0-9a-fA-F]{0,3}[^0-9a-fA-F]/)) {
      console.log('  ❌ Found malformed Unicode escape sequence')
    }
    
    console.log('\n📋 To identify the exact post, look at the data near the character position')
    console.log('   and search for that content in your SonicJS admin panel.')
    
  } catch (error) {
    console.error('❌ Failed to fetch from SonicJS:', error.message)
  }
}

// Run the diagnosis
diagnose().catch(console.error)
