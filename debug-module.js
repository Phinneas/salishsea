#!/usr/bin/env node

/**
 * Debug if there's a module-level error in the blog/[slug]/page.tsx file
 */

console.log('🔍 Testing module import of blog/[slug]/page.tsx...\n')

try {
  // Try to import the file and see if it throws during module loading
  console.log('⚠️  Cannot directly import TSX in Node.js without build')
  console.log('   But we can test the dependencies...\n')
  
  // Test the sonicjs import directly
  const sonicjsPath = '/Users/chesterbeard/Desktop/SSC/salishsea/src/lib/sonicjs.ts'
  console.log('Testing if we can read the sonicjs file...')
  
  const fs = await import('fs')
  const content = fs.readFileSync(sonicjsPath, 'utf8')
  console.log('✅ sonicjs.ts file is readable')
  console.log('   File size:', content.length, 'characters\n')
  
  // Now try to simulate importing it
  console.log('The issue is likely that Next.js is detecting')
  console.log('that generateStaticParams might throw during build.')
  console.log('\n💡 If we wrap it in a Promise that never rejects,')
  console.log('   it should work...')
  
} catch (error) {
  console.error('❌ Error:', error.message)
}

console.log('\n🎯 Fix: Wrap generateStaticParams in a self-resolving Promise')
console.log('   that catches ALL errors and returns empty array on failure.')
