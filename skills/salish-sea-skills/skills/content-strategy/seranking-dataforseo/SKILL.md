---
name: seraking-dataforseo
description: >-
  Build a data-driven content plan by auditing AI Search visibility (SE Ranking)
  and expanding keywords (DataForSEO), then producing a 4-week content calendar.
  Use this skill whenever the user asks for a content plan, content strategy,
  content calendar, editorial calendar, AI search visibility audit, AI Overview
  / LLM citation analysis, keyword gap analysis for content, or says things like
  "what should we write about", "plan our blog content", "find content gaps",
  or "make us more citeable by AI" — even if they don't name SE Ranking or
  DataForSEO explicitly.
compatibility: Requires SE Ranking MCP and DataForSEO MCP connectors. Web search (Tavily/WebSearch) used for Reddit/forum mining. Notion MCP optional for publishing.
---

# AI-Era Content Strategy (Audit → Expand → Plan)

Produce a content plan grounded in two real data sources, not guesswork:

1. **SE Ranking** — who AI engines (AI Overviews, ChatGPT, etc.) currently cite for the target topics, and where answers are thin.
2. **DataForSEO** — which long-tail keywords are winnable (low difficulty) and worth winning (commercial intent), plus the real questions people ask.

The deliverable is always a **markdown report** saved to the outputs folder, containing the audit, the keyword expansion, and a 4-week content calendar. Offer to also publish the calendar to **Notion** if a Notion connector is available.

## Tool access

The MCP tool names below are suffixes — the full names carry a server prefix that varies per install. Load them with ToolSearch (e.g. `select:` the exact names you find, or keyword-search "AiSearch", "keyword_ideas", etc.) before calling. If a tool listed here doesn't exist in this session, don't fail the whole run: note the gap in the report and substitute the closest available tool or a web search.

| Purpose | Tool (suffix) |
|---|---|
| List SE Ranking projects | `PROJECT_listProjects`, `PROJECT_listKeywords`, `PROJECT_listCompetitors` |
| AI visibility overview for a domain/keywords | `DATA_getAiSearchOverview` |
| Who AI engines cite (leaderboard) | `DATA_getAiSearchLeaderboard` |
| Brand presence in AI answers | `DATA_getAiSearchBrand`, `DATA_getAiSearchPromptsByTarget` |
| Keyword metrics — volume, CPC, difficulty (SE Ranking) | `DATA_getKeywordsMetrics` |
| Long-tail / related / question keywords (SE Ranking) | `DATA_getLongTailKeywords`, `DATA_getRelatedKeywords`, `DATA_getKeywordQuestions` |
| Keyword *discovery only* — Ads-grouped volumes (DataForSEO) | `dataforseo_labs_google_keyword_ideas`, `dataforseo_labs_google_keyword_suggestions` |
| Corrected keyword metrics (DataForSEO Labs) | `dataforseo_labs_google_keyword_overview` |
| Bulk keyword difficulty | `dataforseo_labs_bulk_keyword_difficulty` |
| Search intent classification | `dataforseo_labs_search_intent` |
| Live SERP incl. People Also Ask | `serp_organic_live_advanced` (parse `people_also_ask` items) |
| Google Maps / local entities | `business_data_business_listings_search` |
| LLM mention tracking (optional cross-check) | `ai_opt_llm_ment_search`, `ai_opt_llm_ment_top_domains` |

## A critical note on search volumes

The discovery endpoints (`keyword_ideas`, `keyword_suggestions`) report volumes sourced from Google Ads, which **groups close variants**: a long-tail phrase like "sol duc hot springs washington" inherits the combined volume of "sol duc hot springs" plus all its variants. Taken at face value this inflates long-tail volumes 5–30x, which corrupts prioritization, tempts you into cannibalizing pages for what is really one query cluster, and sets traffic expectations the plan can never meet.

So treat keyword data in two tiers:

- **Discovery tier** (Ads-grouped): `keyword_ideas` / `keyword_suggestions` — use only to *find* candidates, never to *report* volumes.
- **Reporting tier** (corrected): `dataforseo_labs_google_keyword_overview` (DataForSEO's own clickstream-informed metrics) and/or SE Ranking `DATA_getKeywordsMetrics`. Every volume printed in the final report must come from this tier.

**The tell for variant grouping:** a long-tail keyword reporting a volume identical to its head term (e.g. modifier phrase = 33,100 and head term = 33,100). When you see it, collapse the variants into one cluster, assign the volume to the head term, and note the cluster in the report. One cluster = one page in the calendar.

## Stage 0 — Gather inputs

The skill needs: **project name or URL**, **niche**, **target audience**, and **up to 5 seed keywords**. Pull as much as possible from what the user already wrote, then:

1. Call `PROJECT_listProjects` (SE Ranking). If a project plausibly matches the user's site/brand, pull its keywords (`PROJECT_listKeywords`) and competitors (`PROJECT_listCompetitors`) and propose them as defaults — many of the user's projects are tracked there, but not all.
2. For anything still missing (especially seed keywords and audience), ask with AskUserQuestion — one short round, offering the SE Ranking-derived defaults as options. Don't block on niceties you can infer (e.g. niche is usually obvious from the keywords).

If the user gave everything in their prompt, skip the questions entirely and start Stage 1.

## Stage 1 — AI Search Visibility Audit (SE Ranking)

For each of the (up to 5) seed keywords:

1. **Visibility**: `DATA_getAiSearchOverview` for the user's domain against these keywords — is the user cited at all today?
2. **Citation Leaders**: `DATA_getAiSearchLeaderboard` — which domains AI engines pull into AI Overviews / LLM answers for these topics. Record the top 3–5 per keyword and note *why* they win where evident (structured data, original stats, definitional clarity).
3. **Knowledge Gaps**: Inspect the actual AI answers (`DATA_getAiSearchPromptsByTarget` / prompt answers where available; supplement with `serp_organic_live_advanced` AI Overview content). Flag answers that are **thin** (generic, few sources), **outdated** (stale dates, superseded facts), or **generic** (no niche-specific detail). These gaps are the raw material for Stage 3 — be concrete about *what's missing*, not just that something is.

If SE Ranking AI Search data is unavailable for a keyword (low volume, unsupported locale), say so in the report and fall back to reading the live AI Overview from `serp_organic_live_advanced`.

## Stage 2 — Keyword Expansion (DataForSEO)

Aim the expansion at the Stage 1 gaps, not just the seed keywords:

1. **Candidates (discovery tier)**: `dataforseo_labs_google_keyword_ideas` + `_keyword_suggestions` seeded from the gap topics. Collect ~60–100 candidates. Don't trust these volumes yet.
2. **Correct and cluster (reporting tier)**: run the shortlist through `dataforseo_labs_google_keyword_overview` (batch keywords into single calls) and/or SE Ranking `DATA_getKeywordsMetrics`. Apply the variant-grouping tell from the note above and collapse clusters. If corrected data is unavailable for a keyword, print "—" or label the number explicitly "(grouped variant volume)" — never present it as exact-phrase volume.
3. **Filter to 20**: `dataforseo_labs_bulk_keyword_difficulty` + `dataforseo_labs_search_intent` + corrected volume/CPC. Keep keywords that are **low difficulty** (≤ ~40, adjust to what the niche offers) and show **commercial or transactional intent** (or informational with clear buying adjacency — CPC > $0 is a useful tell). Present the final 20 in a table: keyword, corrected volume, difficulty, CPC, intent, cluster head where collapsed.
4. **Real-world questions**: `serp_organic_live_advanced` on the strongest candidates — harvest People Also Ask questions verbatim. These become H2s and FAQ schema entries.
5. **Local entities**: `business_data_business_listings_search` for the niche + relevant geography — named local entities (businesses, places) to mention for entity-richness. Skip gracefully if the niche has no local dimension.
6. **Community signal**: web search (Tavily/WebSearch) with queries like `site:reddit.com <gap topic>` and forum-targeted searches. Pull 3–5 live discussions: what people complain about, what vocabulary they actually use. This vocabulary should leak into the calendar's titles.

Run independent lookups in parallel where the tools allow. Keep API thrift in mind: batch keywords into single calls when the tool accepts arrays.

## Stage 3 — The 4-Week Content Calendar

Synthesize Stages 1–2 into 8 pieces (2/week, adjust if the user asks). Every piece must trace back to data — a gap found in Stage 1 or a keyword scored in Stage 2. No filler topics. **One variant cluster = one page**: never schedule separate pieces for keywords collapsed into the same cluster in Stage 2; pick the head term as the primary keyword and list variants as secondary targets.

ALWAYS use this exact structure for the report:

```markdown
# Content Strategy: [Project] — [Niche]
*Audience: [audience] · Generated [date] · Sources: SE Ranking, DataForSEO[, Reddit]*

## 1. AI Search Visibility Audit
### Current visibility (your domain)
### Citation Leaders
| Keyword | Top cited domains | Why they win |
### Knowledge Gaps
(numbered, each with: the gap, evidence, opportunity)

## 2. Keyword Expansion
### The 20 target keywords
| Keyword | Volume (corrected) | Difficulty | CPC | Intent | Cluster |
(state the volume source under the table; flag any grouped-variant volumes)
### People Also Ask
### Local entities (if applicable)
### Community insights (Reddit/forums)

## 3. 4-Week Content Calendar
### Week N: [theme]
For each piece:
- **Title & Primary Keyword** — SERP-optimized title + the keyword it targets
  (+ secondary variant keywords from the same cluster)
- **AI-Optimization Angle** — the specific citeable element: a unique statistic to
  compute/source, a crisp definition, a structured list/table, or an original
  comparison. Name the element concretely ("a table comparing X vs Y on price,
  durability, and warranty"), not vaguely ("add structure").
- **Target Intent** — Informational / Navigational / Transactional
- **Supporting PAA questions** — 2–3 to answer in-page

## 4. Measurement
(which SE Ranking prompts/keywords to track to verify the plan is working;
base any traffic expectations on corrected volumes only)
```

Why the AI-Optimization Angle matters: LLMs and AI Overviews preferentially cite content with extractable atoms — statistics with stated provenance, one-sentence definitions, and well-labeled tables. Each calendar entry should hand the writer one such atom to build.

## Output & publishing

1. Save the report as `content-strategy-<project>-<YYYY-MM-DD>.md` in the outputs folder and present it.
2. Then offer Notion: if a Notion connector is connected, ask whether to publish; on yes, create a page with the report and a database for the calendar (columns: Title, Primary Keyword, Week, Intent, AI Angle, Status). If Notion isn't connected, mention it can be and move on.

## Degradation rules

Real connectors fail. The report is still useful with partial data — prefer shipping a report with an explicit "Data limitations" note over stalling or inventing numbers. Never fabricate volumes, difficulty scores, or citation data; if a number didn't come from a tool call, don't print it. And never present an Ads-grouped discovery volume as an exact-phrase volume — corrected, flagged, or omitted are the only three options.
