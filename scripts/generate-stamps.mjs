#!/usr/bin/env node
// Generates missing /work stamp art via WaveSpeed FLUX Kontext, conditioned on the
// existing stamps so new art matches the set. See docs/stamp-art-recipe.md.
//
//   node scripts/generate-stamps.mjs            # all missing stamps
//   node scripts/generate-stamps.mjs gannet     # just one (use this to test first)
//   node scripts/generate-stamps.mjs --force gannet   # regenerate even if the file exists
//
// Needs WAVESPEED_API_KEY in .env.local, and `magick` on PATH.

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'public', 'stamps')
const MODEL = 'wavespeed-ai/flux-kontext-pro/multi'
const API = 'https://api.wavespeed.ai/api/v3'

// Public URLs of existing stamps, used as style anchors. Live site serves the same
// bytes as public/stamps, so Kontext sees exactly the aesthetic we're matching.
const REF = {
  portrait: [
    'https://www.salishseaconsulting.com/stamps/solar-currents.jpg',
    'https://www.salishseaconsulting.com/stamps/my-mcp-shelf.jpg',
  ],
  landscape: [
    'https://www.salishseaconsulting.com/stamps/gaia-verity.jpg',
    'https://www.salishseaconsulting.com/stamps/brain-scriblr.jpg',
  ],
}

const STYLE =
  'Match the reference images exactly in style: vintage 1950s linocut / wood-engraving ' +
  'poster illustration on warm aged cream paper (#EFE7D6) with visible paper grain. ' +
  'Every surface shaded with dense fine cross-hatching and closely-spaced parallel ' +
  'engraved burin lines, in the manner of a mid-century woodblock print or an antique ' +
  'banknote vignette — the linework itself must be visible everywhere, never flat fills, ' +
  'never smooth gradients, never soft vector shading, never photorealism. ' +
  'Strictly limited palette, every single element tinted into it: deep teal, sea green, ' +
  'muted slate blue, antique ochre gold, sepia brown, one muted terracotta accent. ' +
  'Nothing may be neutral white or plain grey — render whites as warm cream and greys as ' +
  'sepia brown, including any animal, figure or object in the foreground. ' +
  'Fill the entire frame edge to edge with engraved detail and texture: skies carry ' +
  'hatched cloud banks and ray lines, water carries dense engraved wave hatching and ' +
  'cross-hatched shadow. No large flat empty areas, no plain untextured background. ' +
  'Single centered symbolic subject, thin printed inner border rule, narrow cream margin.'

// Kontext added a fake artist's signature and a two-headed bird on the first run, so
// these are called out explicitly rather than left to the positive prompt.
const NEGATIVE =
  'Absolutely no text, lettering, words, numbers, captions or labels anywhere. ' +
  'No artist signature, no scrawled autograph, no monogram, no initials, no watermark — ' +
  'the lower corners must be clean artwork with nothing written in them. ' +
  'One single unified scene filling the whole frame: never split into two or more panels, ' +
  'never a diptych, never a grid or side-by-side comparison layout. ' +
  'Anatomy must be correct and singular: exactly one head, one neck and one pair of eyes ' +
  'per creature — no duplicated, merged, doubled or extra limbs, heads or faces.'

const STAMPS = [
  { slug: 'gannet', o: 'portrait', subject: 'one single gannet seabird — a lone bird with exactly one head and one beak — shown in mid-dive from the side, body arrow-straight and wings folded sharply back against it, beak entering the water; below the surface a scattering of engraved quotation marks it is diving for' },
  { slug: 'barnacle', o: 'portrait', subject: "a dense colony of acorn barnacles encrusting the weathered planks of a ship's hull at the waterline, seen close up — each barnacle a small chalky white-grey cone of overlapping ridged calcium plates with a diamond-shaped opening at its peak, like a miniature volcano, packed tightly together in overlapping clusters; a long-handled iron hull scraper lies across them, and a broad swath has already been scraped clean down to bare tarred wood" },
  { slug: 'portage', o: 'landscape', subject: 'two figures carrying an overturned canoe on their shoulders along a forest trail between two lakes, cargo lashed intact beneath the hull' },
  { slug: 'contrast-map', o: 'portrait', subject: 'one single continuous interior scene of a cedar bathhouse: a slatted cedar sauna bench on the left with waves of heat rising from hot stones, and on the right a round cold plunge tub of steaming icy water with frost on its rim, one tall wall thermometer hanging on the cedar planks between them, all in one unbroken room' },
  { slug: 'signal-field', o: 'portrait', subject: 'a tall slender lattice radio tower standing in a meadow of wind-bent grass, three delicate arcing signal waves radiating from its tip up into a hatched sky, a few small songbirds perched on its guy-wires' },
  { slug: 'solarpunk-currents', o: 'landscape', subject: 'a hillside of terraced gardens threaded with slender wind turbines and solar arrays, greenhouses built into the slope, a river of flowing current lines running through the terraces' },
  { slug: 'salish-sea-creatives', o: 'landscape', subject: 'a letterpress composing stick and an open drawer of wooden type on a workbench, a rolled architectural plan beside them, Pacific Northwest islands and water visible through the window behind' },
]

// Final on-disk dimensions. Generate ~2x then downscale — cheaper than fighting the
// model for exact pixels, and the downscale tightens the engraved linework.
const DIMS = { portrait: [548, 680], landscape: [680, 456] }
const GEN = { portrait: '1096*1360', landscape: '1360*912' }

// Checked in order, so the key never has to live in the repo if you'd rather it didn't.
// Note: an `export` typed into a separate terminal will NOT be visible here — env vars
// inherit parent to child, not between sibling processes. Use the profile or keychain.
function apiKey() {
  // 1. Environment — covers `KEY=... node scripts/...` and a ~/.zshrc export.
  if (process.env.WAVESPEED_API_KEY) return process.env.WAVESPEED_API_KEY

  // 2. macOS keychain — nothing in plaintext on disk, nothing near the repo.
  try {
    const k = execFileSync('security',
      ['find-generic-password', '-s', 'wavespeed', '-w'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
    if (k) return k
  } catch { /* not in keychain, fall through */ }

  // 3. .env.local in the repo (gitignored).
  const envFile = join(ROOT, '.env.local')
  if (existsSync(envFile)) {
    const m = readFileSync(envFile, 'utf8').match(/^\s*WAVESPEED_API_KEY\s*=\s*"?([^"\n\r]+)"?/m)
    if (m) return m[1].trim()
  }

  throw new Error(
    'WAVESPEED_API_KEY not found. Tried: env var, macOS keychain (service "wavespeed"), .env.local.\n' +
    '  keychain:  security add-generic-password -s wavespeed -a "$USER" -w \'<key>\'\n' +
    '  profile :  echo \'export WAVESPEED_API_KEY=<key>\' >> ~/.zshrc\n' +
    '  repo    :  echo \'WAVESPEED_API_KEY=<key>\' >> .env.local',
  )
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function submit(key, stamp) {
  const body = {
    prompt: `Create a new illustration depicting ${stamp.subject}. ${STYLE} ${NEGATIVE}`,
    images: REF[stamp.o],
    size: GEN[stamp.o],
    output_format: 'jpeg',
    enable_base64_output: false,
    safety_tolerance: '2',
  }
  const res = await fetch(`${API}/${MODEL}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`submit ${res.status}: ${JSON.stringify(json).slice(0, 400)}`)

  const id = json?.data?.id ?? json?.id
  if (!id) throw new Error(`no prediction id in response: ${JSON.stringify(json).slice(0, 400)}`)

  return id
}

async function poll(key, id, { timeoutMs = 300_000 } = {}) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    const res = await fetch(`${API}/predictions/${id}/result`, {
      headers: { Authorization: `Bearer ${key}` },
    })
    const json = await res.json().catch(() => ({}))
    const d = json?.data ?? json
    const status = d?.status

    if (status === 'completed' || status === 'succeeded') {
      const url = d?.outputs?.[0] ?? d?.output?.[0]
      if (!url) throw new Error(`completed but no output url: ${JSON.stringify(d).slice(0, 400)}`)

      return url
    }
    if (status === 'failed' || status === 'error') {
      throw new Error(`generation failed: ${d?.error ?? JSON.stringify(d).slice(0, 400)}`)
    }
    await sleep(2500)
  }
  throw new Error(`timed out after ${timeoutMs / 1000}s`)
}

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`download ${res.status}`)
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()))
}

// Match the existing 20 exactly: exact dims, stripped metadata, sRGB, q82.
function normalize(src, dest, [w, h]) {
  execFileSync('magick', [
    src, '-resize', `${w}x${h}^`, '-gravity', 'center', '-extent', `${w}x${h}`,
    '-strip', '-colorspace', 'sRGB', '-quality', '82', dest,
  ])
}

const args = process.argv.slice(2)
const force = args.includes('--force')
const only = args.filter(a => !a.startsWith('--'))

const key = apiKey()

mkdirSync(OUT_DIR, { recursive: true })

const queue = STAMPS
  .filter(s => (only.length ? only.includes(s.slug) : true))
  .filter(s => force || !existsSync(join(OUT_DIR, `${s.slug}.jpg`)))

if (!queue.length) {
  console.log('Nothing to generate. Use --force to regenerate existing files.')
  process.exit(0)
}

console.log(`Generating ${queue.length} stamp(s) via ${MODEL}\n`)

let failed = 0

for (const stamp of queue) {
  const dest = join(OUT_DIR, `${stamp.slug}.jpg`)
  const tmp = `/tmp/stamp-${stamp.slug}.jpg`
  process.stdout.write(`  ${stamp.slug.padEnd(22)} `)
  try {
    const id = await submit(key, stamp)
    const url = await poll(key, id)

    await download(url, tmp)
    normalize(tmp, dest, DIMS[stamp.o])
    console.log(`ok  -> public/stamps/${stamp.slug}.jpg  ${DIMS[stamp.o].join('x')}`)
  } catch (err) {
    failed++
    console.log(`FAILED: ${err.message}`)
  }
}

console.log(`\nDone. ${queue.length - failed} generated, ${failed} failed.`)
process.exit(failed ? 1 : 0)
