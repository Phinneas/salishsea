---
name: content-plan
description: >-
  Build an AI-visibility content plan using the Reasoning Lift framework — a
  5-stage buyer-journey audit across minimal and high reasoning modes, organized
  into pillars with publishing cadence, headline bank, and SEO/AEO angles.
  Delivers the report to the Notion "Content Plan" database. Use whenever the
  user types /content-plan or asks for a Reasoning Lift audit, an AI-visibility
  content plan, a buyer-journey content audit, or a website content pivot plan.
---

# content-plan

Build an AI-visibility content plan using the Reasoning Lift framework — 5-stage buyer journey audit across minimal and high reasoning modes, organized into actionable pillars with publishing cadence, headline bank, and SEO/AEO angles.

Source research: Kevin Indig, Growth Memo — Reasoning Lift (May 18, 2026)

Reference examples:
- `reference/batterytrail-example.md` — Consumer Tech site with regulatory overlap (RV/battery safety codes)
- `reference/gaiaverity-example.md` — Health/Lifestyle (gardening, mushroom safety, university extension strategy)
- `reference/salishsea-website-pivot-example.md` — Website-pivot format (when positioning needs to change, not just content volume)

---

## Trigger

`/content-plan`

---

## Delivery

Reports are sent to Notion as database entries — not saved locally, not output to the desktop.

**Target database:** Content Plan (Dashboard → Work Orbit → Content Plan)
**Data source ID:** `1a171d3a-6824-80bc-b34a-000bed169abc`
**Database URL:** https://www.notion.so/1a171d3a682480e39cbec77a15b17c17

After generating the report, use the `notion-create-pages` MCP tool to create a new entry in the database:

```
parent: { "type": "data_source_id", "data_source_id": "1a171d3a-6824-80bc-b34a-000bed169abc" }
```

**Properties to populate:**

| Property | Value |
|---|---|
| Name (title) | `Content Plan: [Site Name] — [Month YYYY]` (e.g. "Content Plan: BatteryTrail — May 2026") |
| Status | `Not started` |
| Site URL | the site's URL |
| Vertical | one of: `Finance`, `Health/Lifestyle`, `B2B SaaS`, `Consumer Tech`, `Mixed` — use the **effective** vertical from the Vertical Reality Check, not the surface one |
| Reasoning Delta | `High (+24pp+)` for Finance/Health, `Medium (+16pp)` for B2B SaaS, `Low (+4pp)` for Consumer Tech |
| Audience | one-line description of primary audience |
| Source Research | `Kevin Indig, Growth Memo — Reasoning Lift, May 2026` |
| Report Date | today's date (ISO 8601) |

**Content:** the full report in Notion-flavored Markdown. Before calling `notion-create-pages`, fetch the spec from `notion://docs/enhanced-markdown-spec` — do not guess at Notion Markdown syntax.

After the entry is created, return the Notion URL to the user so they can open it directly.

---

## Output format

There are two output types. Determine which applies before writing:

**Standard content plan** — when the site's positioning is solid and the gap is content depth, structure, and new posts. The common case.

**Website-pivot plan** — when the site's current positioning is misaligned with what the content strategy requires, or when the primary gap is homepage/services page clarity. Output includes actual page copy, service descriptions, pricing tables, and a blog strategy section. See `reference/salishsea-website-pivot-example.md`.

---

## What you need from the user

Before starting, collect:
1. **Site / brand name and URL**
2. **Content categories** — what topics does the site cover?
3. **Primary audience(s)** — who is buying, what decisions are they making? (may be multiple segments)
4. **Known competitors** — who they're typically stacked against
5. **Existing content strengths** — what's already working (comparisons, roundups, guides, etc.)
6. **Existing content gaps or weaknesses** — what stages or topics are thin

Ask for 1–3 at minimum. 4–6 can be inferred from context.

---

## Output structure (standard content plan)

Produce all sections below. Be specific, opinionated, and actionable throughout — match the specificity of the reference examples, not a generic framework.

---

### Core Thesis

One paragraph in a blockquote. Name what the site currently wins at under minimal reasoning, and state the strategic gap under high reasoning. This is the frame for everything that follows.

---

### Vertical Reality Check

**This is the most important judgment call in the plan.** Don't just accept the surface category. Every site in the examples has a "useful intersection" — a regulatory, compliance, safety, or financial complexity angle that earns a higher delta than the surface vertical suggests.

| Vertical | Low | High | Delta |
|---|---|---|---|
| Finance | 52% | 80% | +28pp |
| Health/Lifestyle | 48% | 72% | +24pp |
| B2B SaaS | ~54% | ~70% | +16pp |
| Consumer Tech | 60% | 64% | +4pp |

Explicitly argue the case. Examples from the reference plans:
- BatteryTrail: surface = Consumer Tech (+4pp), but RVIA/NFPA codes + UL certifications = Finance/Health level
- GaiaVerity: mushroom toxicity + USDA extension = Health/Lifestyle (+24pp)
- Salish Sea grant writing: regulatory docs, IRS compliance, foundation guidelines = Finance (+28pp)
- Solar Currents: utility interconnection + NEC codes + net metering = Finance (+28pp) for home solar content

If the site is genuinely Consumer Tech with no compliance dimension, say so and note that reasoning-mode optimization is low ROI — focus on Reddit/review-site presence and brand mention volume instead.

---

### Data Foundation

Restate only the stats relevant to the site's vertical(s). Don't include Finance stats for a Consumer Tech site. Do include site-specific data (avg cost per incident, market size, usage stats) when available.

Standard set to adapt:

| Finding | Stat |
|---|---|
| Median information gain score (top-3 organic pages) | 52 / 100 |
| Pages with ≤1 unique data point | avg info gain score 40.2 |
| Pages with 15+ unique data points | avg info gain score 62.1 |
| Avg unique data points, top-3 organic results | 4 — surpassing this is achievable and meaningful |
| High reasoning citation rate | 68% vs. 50% minimal (+18pp) |
| [Relevant vertical] citation lift | [X%] → [Y%] (+[Z]pp) |
| Domain overlap between modes | 25.6% — 3 in 4 cited domains are different |
| Fan-out queries at Comparison stage | 24 (high) vs. 5.5 (minimal) |
| Fan-out queries at Selection stage | 15.4 (high) vs. 2.6 (minimal) |
| Reddit citations | 15% → 7% under high reasoning |
| UGC / review sites | 14.3% → 6% under high reasoning |
| Official docs / support pages | 12.4% → 17.5% under high reasoning |
| Gov / academic sources | 1.9% → 8.8% under high reasoning (quadruples) |
| Brand persistence Problem→Selection | 0/20 journeys (minimal) vs. 4/20 (high) |

---

### Pillars

4–6 named pillars per site. Name them for what they actually address — not generic numbers. Pillar names should reflect the site's specific situation (e.g., "The Mushroom Cluster", "Honest Math Positioning", "Grant Writing as Regulatory Content"). Each pillar gets a table:

| Format | Title | Core angle |
|---|---|---|
| ... | ... | ... |

**Recurring pillar patterns** (adapt or drop as relevant):

**Pillar: Two Strategies (Minimal vs. High Reasoning)**
What the site already wins at under minimal reasoning. What content category closes the high-reasoning gap. Almost always includes an internal content audit as the first deliverable.

**Pillar: Site's Core Strength / Content Moat**
If the site has a specific content area where it has more depth than competitors (e.g., GaiaVerity's mushroom content, BatteryTrail's comparison library, Solar Currents' honest-math positioning), lead with that. Identify the Problem and Safety stage gaps within it.

**Pillar: Sub-Query Optimization**
Almost always the highest-ROI opportunity. For the site's main comparison queries, list the specific sub-queries that fire under high reasoning (aim for 8–12, domain-specific). These become structured sections in retrofitted comparison posts and new spec-level content.

Always include:
- Content upgrade/retrofit of existing comparison posts (highest ROI — always Week 1)
- Deep-dive spec series per major brand/product
- Lead magnet or downloadable template

**Pillar: Problem-Stage / TOFU Gaps**
Map the full 5-stage buyer journey per audience segment. Identify which stages are thin. Problem and Exploration stage content is almost always the gap. Produce a journey map per segment:
1. Problem — "Why is X happening?" / "I can't do Y"
2. Exploration — "What types of X exist?" / "What options do I have?"
3. Comparison — "[A] vs [B] for [use case]"
4. Validation — "Is [Brand/approach] worth it for [segment]?"
5. Selection — "Best X under $[price]" / "How to get started with [Brand]"

If there are multiple audience segments, map each separately (e.g., Solar Currents: camping, RV/van life, renters).

**Pillar: Reddit/UGC Replacement**
Reddit drops 15%→7% under high reasoning. Position the site as the authoritative alternative. Structured FAQ series (one question per URL, direct answer in first paragraph) and structured owner/user reviews attached to editorial pages.

**Pillar: Regulatory / Certification / Authority Content**
Gov/academic sources quadruple under high reasoning. Find the regulatory or compliance angle — certifications, safety codes, legal requirements, funder guidelines — and publish structured evergreen guides at that authority level. Skip this pillar only for pure Consumer Tech with zero compliance dimension.

**Pillar: Regional Specificity**
Recurring across most sites. Regional content is structurally harder to replicate and surfaces for locally-specific sub-queries. Appears in BatteryTrail (RVIA codes), GaiaVerity (Pacific Northwest climate), Salish Sea (PNW funding landscape), Solar Currents (balcony solar by state).

**Pillar: First-Party Data Inventory**

Most brands are sitting on publishable data they've never surfaced. Use this pillar when the client has a product, service operation, or book of business that generates behavioral or outcome data. The goal is to identify what they already own and structure a publishing plan around it — because pages with more unique data points earn meaningfully higher information gain scores, and the bar to beat (4 unique data points per top-ranking page on average) is low.

Map the client's data assets to one or more of these six plays:

1. **Benchmark reports from usage/product telemetry** — Anonymized, aggregated behavioral data competitors can't replicate. SaaS teams especially: what does "normal" look like across your user base? (avg task completion time, deal-stage velocity by industry, etc.) Decision-makers forward these.
2. **Economic indicators from transaction/payments data** — Companies that move money can build recurring "index" content (hiring trends, wage data, seasonal spending). Gets cited as an economic signal, which is high-authority placement.
3. **"What actually works" studies from anonymized customer outcomes** — Instead of one case study, aggregate: "across 4,000 accounts, the ones who did X saw Y." Uses the full book of business, not cherry-picked wins.
4. **"Real questions" content from support/sales conversation data** — Mine ticket logs, sales call transcripts, and in-app search queries for the actual language buyers use. Answers the questions that ranking pages demonstrably leave open.
5. **Original test results from internal experiments** — A/B tests, pricing experiments, feature rollouts the client runs anyway but never publishes. "We tested X across N users and here's what happened" is first-hand evidence that's nearly impossible to replicate.
6. **"Say vs. do" content from surveys + behavioral data combined** — Survey the audience, then cross-reference against what those same users actually do in-product. The gap between stated intent and real behavior is genuinely original and very hard to fake.

For each play: confirm whether the data exists, whether it's publishable (anonymized/aggregated), and which stage of the buyer journey it answers most directly.

**Pillar: Content Audit / Blog Refocus**
When the existing blog has off-topic or scattered content (e.g., Salish Sea's CRM reviews, Solar Currents' off-niche posts), include an audit pillar: what to retire, what to retrofit, what to consolidate. This cleans up topical authority signals for both modes.

---

### Buyer Journey Prompt Maps

One per primary audience segment. Use authentic buyer language — sourced from the way real buyers phrase problems, not internal keyword lists.

| Stage | Example prompt | Minimal presence | High presence |
|---|---|---|---|
| Problem | ... | Y / Partial / No / ? | Y / Partial / No / ? |
| Exploration | ... | | |
| Comparison | ... | | |
| Validation | ... | | |
| Selection | ... | | |

Mark unknowns `?` — these become the first prompt-tracking tasks.

---

### Publishing Cadence

8-week sprint. Week 1 is always the content audit + retrofit of existing comparison posts (highest ROI, internal only). Problem-stage content ships weeks 2–3. Spec/authority/regulatory content fills weeks 4–8.

| Week | Lead piece | Supporting |
|---|---|---|
| 1 | Content audit + retrofit: top comparison posts | Internal only |
| 2–8 | ... | ... |

---

### Page Structure for AI Extraction

Owning original data earns the right to be cited — but structure determines whether AI actually lifts it. Citation analysis of 18,012 verified ChatGPT citations shows a ski-ramp distribution: 44.2% of citations come from the first 30% of a page. The 10–20% band is the hottest citation zone in every vertical studied. Content buried in the bottom 10% earns 2.4–4.4% of citations regardless of quality.

Apply this structure to every high-stakes page in the plan, especially any page built on first-party data:

| Rule | What to do |
|---|---|
| Lead with the headline stat | Strongest number in the 10–20% band — immediately after the title block, before any narrative setup |
| Define the metric immediately | One sentence: what the number measures and the population it covers |
| Box the methodology | Short labeled block: sample size, time window, collection method — gives AI attribution confidence |
| Front-load secondary findings | Rank findings strongest-first, not built toward — the payoff-at-the-end structure costs machine citations |
| No suspense close | Conclusions go early; the long narrative buildup is a human-retention pattern that works against extraction |

When retrofitting existing posts (Week 1), check where the key stat currently lives. If it's buried past the 30% mark, that's the first edit.

---

### Headline Bank

10–12 titles. Each should name the actual tension or insight — not just the topic. Cover the range of pillars. Usable as blog titles, email subjects, or social hooks.

---

### Key SEO / AEO Angles

12–20 keyword phrases. Mix:
- Sub-query-level specifics (spec names, certification codes, model numbers, regulation names)
- Problem-stage queries ("why does X happen", "why can't I Y")
- Comparison queries with explicit use case
- Regulatory/compliance queries
- AI-search-oriented phrases where relevant

---

## Key principles

- **Always find the "useful intersection."** Every site has regulatory, compliance, safety, or financial complexity that earns a higher delta than the surface vertical. Make the argument explicitly in the Vertical Reality Check.
- **Pillar names are site-specific.** Name pillars for what they actually address, not generic numbers.
- **Sub-queries are the real game.** List them explicitly and domain-specifically for each site. These drive the retrofit and spec content strategy.
- **Multiple audience segments get separate journey maps.** Don't blend camping, RV, and renter audiences into one journey.
- **Problem-stage content is almost always thin.** Every site reviewed had this gap.
- **Retrofit first.** Content audit + existing comparison post upgrades is always Week 1 — highest ROI before any new content.
- **Regional specificity is a recurring differentiator.** Most sites have a regional angle they're underusing.
- **One journey at a time.** Map one buyer persona thoroughly before starting the next.
- **Use authentic prompts.** Source from sales calls, search console, community forums — not internal keyword lists.
- **Blank presence cells are strategy.** A gap is an opportunity, not a formatting error.
- **Prioritize Comparison and Validation first.** These stages fire the most fan-out queries.
- **Rerun monthly.** Citation sources shift. Prompt tracking is a recurring operation.
- **Don't average across modes.** Minimal and high reasoning are different systems — report and plan for each separately.
