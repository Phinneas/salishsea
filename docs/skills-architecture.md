# Skills Library — Content Architecture & Site Taxonomy

The information architecture behind `salishseaconsulting.com/skills/`. This is the
reference for how the library is organized, how pages link to each other, and how
new skills are added.

---

## 1. URL structure

```
/skills/                                          → hub (taxonomy + category overview)
/skills/[category]/                               → category landing page
/skills/[category]/[skill]/                       → individual skill page
```

### Full map

```
/skills/
├── /skills/grant-writing/                        (7 skills)
│   ├── nofo-decoder
│   ├── grant-fit-scorer
│   ├── logic-model-builder
│   ├── budget-narrative-writer
│   ├── letter-of-support-kit
│   ├── post-award-reporting
│   └── grant-deadline-scout
├── /skills/esg-sustainability/                   (5 skills)
│   ├── scope-inventory
│   ├── greenwashing-check
│   ├── materiality-interview
│   ├── impact-report-ghostwriter
│   └── b-corp-gap-reader
├── /skills/ai-visibility/                        (3 skills)
│   ├── can-ai-find-you
│   ├── llms-txt-schema-starter
│   └── answer-page-rebuilder
├── /skills/small-org-operations/                 (4 skills)
│   ├── board-packet-generator
│   ├── rfp-response
│   ├── volunteer-onboarding
│   └── meeting-minutes-compliance
├── /skills/content-strategy/                     (6 skills)
│   ├── seo-technical-audit
│   ├── seranking-dataforseo
│   ├── content-plan-reasoning-lift
│   ├── market-research
│   ├── design-what-if
│   └── design-brief-enforcer
└── /skills/tools/                                (3 tools)
    ├── portage-ghost2astro
    ├── linkcanary
    └── agent-hygiene-score
```

**28 total items** (25 skills + 3 tools). All URLs end with a trailing slash
(site-wide `trailingSlash: true`).

## 2. Breadcrumb logic

| Page | Breadcrumb |
|---|---|
| Hub | Home / Skills |
| Category page | Home / Skills / [Category] |
| Skill page | Home / Skills / [Category] / [Skill] |

- Every crumb except the current page is a link.
- Implemented once in `src/components/site/skills/Breadcrumb.tsx` — pass items,
  the component renders the full trail (Home is implicit).
- No breadcrumb on the hub itself (it is the top of the section).

## 3. Page templates

### Hub (`/skills/`)
- Hero: "The frameworks I've built and tested on my own properties."
- Intro: 2–3 paragraphs — what the library is (frameworks, not tools/templates;
  validated across 100+ properties).
- **Category cards** (6): name, tagline, skill count, "Explore" → category page.
- "What you get" section: open SKILL.md specs, a page per skill, free access.
- Closing CTA → booking call.

### Category landing page (`/skills/[category]/`)
- Breadcrumb + header: category name + 2–3 sentence description.
- **Skill cards** grid: skill name, one-line tagline, "When to use this",
  "Learn the methodology" → skill page.
- "Why these frameworks matter" — one paragraph on the category's strategic value.
- "Browse all skills" → back to hub.

### Individual skill page (`/skills/[category]/[skill]/`)
Template sections (rendered only when content exists):

1. **What it does** — 1–2 paragraphs on purpose
2. **When to use it** — 3–4 scenario bullets
3. **The methodology** — ordered steps, tools used, expected output
4. **Real example** — from a live property
5. **Common mistakes** — 3–4 patterns people get wrong
6. **Next steps** — connection to other skills
7. **GitHub SKILL.md** — "View the full specification" button
8. **Use in Claude** — "Run this in Claude" import instructions

Sidebar: **Related skills** (2–3 links, mesh navigation). Skills without content
render the shell: breadcrumb, header, "Full breakdown coming soon" panel with the
when-to-use summary, and related skills.

## 4. Components

`src/components/site/skills/`

| Component | Used in | Purpose |
|---|---|---|
| `Breadcrumb.tsx` | category + skill pages | trail: Home / Skills / … |
| `CategoryCard.tsx` | hub | name, tagline, count, Explore CTA |
| `SkillCard.tsx` | category pages | name, tagline, when-to-use, Learn CTA |
| `RelatedSkills.tsx` | skill pages | 2–3 related skill links (mesh) |

Shared site components: `SectionHero` (hub), `SectionCTA` (hub closer).
CTA buttons use the existing seafoam pill style (no new button system).

## 5. Data model & adding a skill

Single source of truth: `src/config/skills.ts`.

- `SkillCategory` — slug, name, tagline, description, strategicValue, skills[]
- `Skill` — slug, name, tagline, whenToUse, status (`published` / `coming-soon`),
  and the 8 content sections (optional), relatedSlugs[]

**To add a skill:** create the entry in its category, fill the sections, set
`status: 'published'`, add `relatedSlugs` → the page, sitemap entry, and card
all generate automatically. No routing or component changes needed.

## 6. Naming conventions

- URLs: lowercase, hyphenated, descriptive, self-documenting.
  `/skills/grant-writing/nofo-decoder/` — you know what it is from the URL.
- Categories: full words, no abbreviations (`esg-sustainability`, never `esg`).
- Skill slugs: the deliverable or action, not the audience
  (`budget-narrative-writer`, not `funders-budgets`).
- Tools keep their product names (`portage-ghost2astro`, `linkcanary`).
- Header nav label: **Skills** (points to `/skills/`).

## 7. Navigation & internal linking

- Header nav + footer: Skills → `/skills/`.
- Breadcrumbs on every category and skill page.
- **Related skills on every skill page** — a mesh, not a tree. Each skill lists
  2–3 neighbors (mostly same category + occasional cross-category links, e.g.
  `post-award-reporting` → `meeting-minutes-compliance`).
- Category pages cross-reference where relevant (e.g. AI Visibility ↔
  Content Strategy via `seo-technical-audit` ↔ `can-ai-find-you`).
- Sitemap (`src/app/sitemap.ts`) emits: `/skills` (0.8), each category (0.7),
  each skill (0.6).

## 8. Design system

- Existing SSC tokens only: `--ssc-paper`, `--ssc-fog`, `--ssc-text-dark`,
  `--ssc-text-dark-mute`, `--ssc-seafoam(-deep)`, `--ssc-ink`, `--ssc-line-light`,
  `--ssc-r`.
- Fonts: `font-serif` for headings, `font-space-mono` for eyebrows/labels.
- Minimal, content-first layout; no hero imagery, no heavy animation.
- Mobile-first: cards collapse to single column, related skills stack below.
- Code/SKILL.md snippets: no custom syntax highlighting shipped yet — if embedded
  snippets arrive with published skills, add a `CodeBlock` component then.

## 9. Measurement (post-launch)

- **Bounce rate on /skills/** — should be low; the hub exists to send people deeper.
- **Time on category pages** — moderate (scanning, not reading).
- **Click-through to individual skill pages** — high; cards carry clear CTAs.
- **Exit rate from skill pages to GitHub** — meaningful; people want the spec.

Track in GA4 (or your analytics of choice) with page paths `/skills*`.

## 10. Current status

- Hub, category pages, skill page template, and all 28 entries are built and live.
- **Phase 1 (content-strategy, 6 skills) is fully documented** — what it does,
  scenarios, methodology with time estimates and tools, mistakes with impact,
  output, workflow connections, time & resources, use-in-Claude. Published.
- Phases 2–3 remain `coming-soon` shells; their documentation ships per the
  rollout below.

## 11. Rollout phases & content state

| Phase | Categories | Skills | Status |
|---|---|---|---|
| 1 | content-strategy | 6 | ✅ documented + published |
| 2 | grant-writing, esg-sustainability | 12 | shell (coming-soon) |
| 3 | ai-visibility, small-org-operations, tools | 13 | shell (coming-soon) |

### Keyword targets (per Phase 1 skill page)

| Skill | Keyword targets |
|---|---|
| Content Plan | content planning · AI-era SEO · editorial roadmap · content strategy · search visibility |
| Design What-If | design feedback · design critique · creative direction · design review process · emotional target |
| Market Research | market research · buyer language · messaging framework · ICP research · voice of customer |
| SE Ranking + DataForSEO | keyword research · SE Ranking · DataForSEO · AI visibility audit · keyword strategy |
| SEO Technical Audit | technical SEO audit · crawl issues · site architecture · search visibility · SEO fixes |
| Design Brief Enforcer | creative brief · design brief · art direction · design specs · creative review process |

### Estimated time budget (Phase 1)

| Skill | First run | Iterations |
|---|---|---|
| Content Plan | 6–8 h | 2–3 h / quarter |
| Design What-If | 3–4 h | 1–2 h |
| Market Research | 5–7 h | 2–3 h |
| SE Ranking + DataForSEO | 5–6 h | 2–3 h / month |
| SEO Technical Audit | 4–6 h | 1–2 h / quarter |
| Design Brief Enforcer | 2–3 h | 1 h / project |

### Real Example sections

The page template includes a Real Example section (findings, action, result,
quote, time investment) that renders when `realExample` is set in
`src/config/skill-content.ts`. It is intentionally driven by production data
from the user's own properties (BinLocators, Soak Colorado, GaiaVerity,
Salish Sea Consulting, etc.) — drop the run's findings into the content file
when documented. No fabricated metrics are shipped.

### GitHub SKILL.md state

The `salish-sea-skills` monorepo lives in this repo at `skills/salish-sea-skills/`
(README, LICENSE, GITHUB_SETUP, and one folder per skill). Phase 1 skills have
real `SKILL.md` + `README.md` files; the 22 Phase 2-3 skill folders are empty
(kept with `.gitkeep`).

Phase 1 pages link to the GitHub spec:
`github.com/Phinneas/salish-sea-skills/blob/main/skills/content-strategy/<dir>/SKILL.md`.
Note the directory-name differences: repo `content-plan` == site slug
`content-plan-reasoning-lift`; repo `portage` == site slug `portage-ghost2astro`.

Push `skills/salish-sea-skills` to GitHub (see its GITHUB_SETUP.md) to make the
links resolve; until then the buttons 404.

## 12. Content authoring

Deep documentation lives in `src/config/skill-content.ts`, keyed by skill slug.
Adding a skill's documentation:
1. Fill the `SkillContent` entry (sections 1–11 per the template).
2. Set the skill's `status` to `'published'` in `src/config/skills.ts`.
3. Optionally add `realExample` from production data.
4. Pages, metadata, related links, and sitemap update automatically.
