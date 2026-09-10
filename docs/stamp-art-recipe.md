# Stamp art recipe — /work page

How the `/public/stamps/*.jpg` images were made, and how to make matching ones.

## What's CSS vs. what's an image

The stamp *object* is CSS, not art. `src/app/globals.css` (`.stamp-paper`, `.stamp-art`,
`.stamp-pm`) draws the perforated edge (radial-gradient mask), the cream paper, the
"Salish Sea" / denomination header, the postmark rings, and the name/category footer.
`StampCollection.tsx` supplies denom, year, rotation, and postmark year from
`src/lib/stamp-data.ts`.

**The only asset you produce is the rectangular illustration that sits inside the frame.**
Do not draw a perforated edge or add any lettering — the CSS does that.

## Specs

| | Normal card (`wide: false`) | Wide card (`wide: true`) |
|---|---|---|
| Size | **548 × 680** (portrait) | **680 × 456** (landscape) |
| Grid | 1 column | spans 2 columns |

- JPEG, sRGB, quality ~82, no EXIF (all 20 existing files are exactly this).
- `.stamp-art img` uses `height: auto`, so aspect ratio is preserved — an off-ratio
  image won't crop, it'll just make that card taller/shorter than its neighbors.
- Save to `/public/stamps/<slug>.jpg`, matching the `slug` in `stamp-data.ts`.

## Visual DNA

Vintage mid-century **linocut / wood-engraving** poster illustration:

- **Paper:** warm aged cream (`#EFE7D6`–`#F2EAD9`) with visible paper grain/speckle.
  Some existing pieces bleed art to the edge; most leave a cream margin with a thin
  printed inner rule.
- **Line work:** dense engraved hatching and parallel-line shading for all volume —
  no soft gradients, no airbrush, no photographic rendering.
- **Palette (tight, 4–6 colors, matched to the `--ssc-*` tokens):** deep teal `#14515e`,
  sea green, muted slate blue, ochre/antique gold, sepia brown, one muted terracotta
  accent. Desaturated throughout — nothing neon.
- **Composition:** one centered symbolic subject that reads at 184px wide. Generous
  negative space. Symbol, not scene detail.
- **No real text.** A few pieces include decorative fake glyphs (see `my-mcp-shelf.jpg`
  book spines); actual words never appear.

## Prompt template

> A vintage 1950s linocut / wood-engraving poster illustration of **{SUBJECT}**.
> Printed on warm aged cream paper (#EFE7D6) with visible paper grain. Dense engraved
> parallel-line hatching for all shading — no gradients, no photorealism. Tight
> desaturated palette: deep teal, sea green, muted slate blue, antique ochre gold,
> sepia brown, one muted terracotta accent. Single centered symbolic subject, generous
> negative space, thin printed inner border rule. Flat mid-century letterpress
> aesthetic. No text, no lettering, no words. **{portrait 548×680 | landscape 680×456}**.

Subject examples from the existing set:
- `solar-currents` — mid-century modern house with rooftop solar panels, radiant sun with a face
- `gaia-verity` — engraved globe beside a brass balance scale weighing charts against leaves
- `my-mcp-shelf` — wooden bookshelf of teal-and-gold spines with a glowing constellation network overlaid

## Queue — art still needed

Seven stamps are wired into `stamp-data.ts` but have no image yet. Prompts below are
ready to paste as-is — no assembly needed. Perforation may be baked in or omitted; the
existing set is already inconsistent on this and reads fine either way.

Shared suffix (already appended to each prompt below):
> *Printed on warm aged cream paper (#EFE7D6) with visible paper grain. Dense engraved
> parallel-line hatching for all shading — no gradients, no photorealism. Tight
> desaturated palette: deep teal, sea green, muted slate blue, antique ochre gold, sepia
> brown, one muted terracotta accent. Single centered symbolic subject, generous negative
> space, thin printed inner border rule. Flat mid-century letterpress aesthetic. No text,
> no lettering, no words.*

### `gannet.jpg` — 548×680 portrait
> A vintage 1950s linocut poster illustration of a gannet seabird in mid-dive, wings folded sharply back, plunging toward the water surface; below the surface, a scattering of engraved quotation marks and citation glyphs it is diving for. [shared suffix] Vertical portrait composition.

### `barnacle.jpg` — 548×680 portrait
> A vintage 1950s linocut poster illustration of a cluster of barnacles encrusting a weathered ship's hull plank, a hand scraper resting against it, clean stripped wood emerging in the swath already scraped. [shared suffix] Vertical portrait composition.

### `portage.jpg` — 680×456 landscape
> A vintage 1950s linocut poster illustration of two figures carrying an overturned canoe on their shoulders along a forest trail between two lakes, cargo lashed intact beneath the hull. [shared suffix] Horizontal landscape composition.

### `contrast-map.jpg` — 548×680 portrait
> A vintage 1950s linocut poster illustration of a cedar sauna room and a cold plunge tub side by side, shown cut away in architectural section; radiating heat lines rising above one, frost crystals forming above the other, a tall thermometer standing between them. [shared suffix] Vertical portrait composition.

### `signal-field.jpg` — 548×680 portrait
> A vintage 1950s linocut poster illustration of a field of tall grass with a single antenna mast rising from it, concentric signal rings emanating outward, small birds perched along the guy-wires. [shared suffix] Vertical portrait composition.

### `solarpunk-currents.jpg` — 680×456 landscape
> A vintage 1950s linocut poster illustration of a hillside of terraced gardens threaded with slender wind turbines and solar arrays, greenhouses built into the slope, a river of flowing current lines running through the terraces. [shared suffix] Horizontal landscape composition.

### `salish-sea-creatives.jpg` — 680×456 landscape
> A vintage 1950s linocut poster illustration of a letterpress composing stick and an open drawer of wooden type on a workbench, a rolled architectural plan beside them, Pacific Northwest islands and water visible through the window behind. [shared suffix] Horizontal landscape composition.

Denominations, years, and rotations for these were assigned to fit the existing set —
all cosmetic, change freely in `stamp-data.ts`.

## Generating (automated)

`scripts/generate-stamps.mjs` drives WaveSpeed FLUX Kontext, using two existing stamps
as style anchors so new art matches the set. Needs `WAVESPEED_API_KEY` in `.env.local`
(gitignored) and `magick` on PATH.

```sh
node scripts/generate-stamps.mjs                 # every stamp with no art yet
node scripts/generate-stamps.mjs gannet          # one slug — do this first to test
node scripts/generate-stamps.mjs --force gannet  # re-roll one that already exists
```

Slugs with existing art are skipped unless `--force`, so re-running is safe. The script
normalizes output to the exact dims, stripped metadata, sRGB, q82 — matching the
existing 20.

Kontext is an *editing* model, so asking it for a new subject in a referenced style is
slightly off-label. Test one slug before committing credits to the whole queue.

## Post-processing (manual)

If you generate art elsewhere (Midjourney, ChatGPT, etc.), normalize it the same way:

```sh
magick in.png -resize 548x680^ -gravity center -extent 548x680 \
  -strip -quality 82 -colorspace sRGB public/stamps/<slug>.jpg
```

## Then wire it up

Add the entry to the right chapter in `src/lib/stamp-data.ts` (`name`, `slug`, `url`,
`category`, `denom`, `year`, `rotation` ±1.0–2.9deg alternating sign, `wide`,
`comingSoon`, `image`, `description`) and bump the three counts in the
`StampCollection.tsx` hero (Destinations / Now Open / Forthcoming).

## Provenance note

No generation script exists in this repo, and none ever did — a search of all branches
turns up no deleted generator, and `package.json` has no image dependency (`sharp`,
`canvas`, `openai`, `replicate`, etc.). `content-pipeline/` is text-only (DeepSeek +
Reddit/Exa, for social copy) and `skills/salish-sea-skills/` is markdown only.

All 20 images were added in a single commit (`fc47082`, "Unify site to homepage design
system and add stamp collection work page") with identical file mtimes and stripped
EXIF — i.e. generated externally in a batch via an AI image model, then resized and
committed by hand. `scripts/generate-stamps.mjs` was added later to automate the next
batch; it did not produce the original 20.
