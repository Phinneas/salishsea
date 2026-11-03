# AI Visibility Audit — Salish Sea Consulting
**Date:** September 15, 2026  
**Method:** Technical audit of site infrastructure, content extractability, and structured data. Live AI platform testing requires manual queries (see recommended queries below).

---

## Executive Summary

Salish Sea Consulting has strong content but significant technical gaps that limit AI visibility. The site's best content (ESG frameworks, greenwashing analysis) is highly citable on substance but invisible to AI systems due to missing schema markup, no `llms.txt`, and inconsistent content structure across the blog.

**Priority fixes (in order):**
1. Add JSON-LD Article/BlogPosting schema to all blog posts
2. Create `llms.txt` for AI context
3. Add FAQ schema to high-value posts
4. Add author attribution and "last updated" dates

---

## 1. AI Bot Access — robots.txt

**Status: ✅ Excellent**

All major AI bots are explicitly allowed:
- GPTBot / ChatGPT-User (OpenAI) — Allowed
- Google-Extended (Gemini/AI Overviews) — Allowed
- anthropic-ai (Claude) — Allowed
- PerplexityBot — Allowed (via `User-agent: *`)
- Bingbot (Copilot) — Allowed (via `User-agent: *`)
- CCBot — Allowed (note: this is Common Crawl's training bot, not a search bot)

**Recommendation:** No changes needed. If you want to prevent training data scraping while keeping search bots active, consider blocking CCBot specifically — but this is a business decision, not a technical one.

---

## 2. llms.txt — Machine-Readable Context

**Status: ❌ Missing**

No `llms.txt` file exists at `/llms.txt` or in the `public/` directory. AI systems have no structured overview of what Salish Sea Consulting does, who it's for, or which pages matter.

**Impact:** AI agents evaluating your services have to parse full page content instead of reading a concise summary. Competitors with `llms.txt` get preferential treatment in AI-mediated discovery.

**Fix:** Create `public/llms.txt` with:
- One-line description of the business
- Key services (copywriting, ESG communications, grant writing)
- Links to priority pages (services, about, top 3-5 blog posts)
- Link to pricing/contact

---

## 3. Schema Markup / Structured Data

**Status: ❌ Zero structured data**

No JSON-LD schema exists anywhere in the site. No `Article`, `BlogPosting`, `FAQPage`, `HowTo`, or `Organization` schema was found in the codebase.

**Impact:** Content with proper schema shows 30-40% higher AI visibility (Princeton GEO / KDD 2024 research). Every blog post is missing this signal.

**What's needed per content type:**

| Page Type | Schema Needed | Priority |
|-----------|--------------|----------|
| Blog posts | `Article` or `BlogPosting` (author, datePublished, dateModified, publisher) | **Critical** |
| ESG frameworks post | `Article` + `FAQPage` for the "Which one applies to you" section | **High** |
| Greenwashing post | `Article` + `FAQPage` | **High** |
| Services page | `Service` or `ProfessionalService` | **Medium** |
| About page | `Organization` + `Person` (Chester Beard) | **Medium** |
| Grant writing hub | `Article` + `FAQPage` | **Medium** |

---

## 4. Content Extractability — Priority Pages

### 4a. ESG Frameworks Explained (`/blog/esg-frameworks-explained/`)
**Citation readiness: 🟢 Strong**

| Check | Status |
|-------|--------|
| Clear definition in first paragraph? | ✅ Excellent — directly corrects a common misconception |
| Self-contained answer blocks? | ✅ Each framework section is standalone |
| Comparison tables? | ✅ Quick Reference table with 6 columns |
| Statistics with sources? | ✅ 8 cited sources with links |
| Specific dates? | ✅ "as of August 2026" throughout |
| Expert attribution? | ⚠️ No author bio or credentials on the page |
| "Last updated" visible? | ⚠️ Only `publishedAt` shown (Aug 5, 2026), no updated date |
| FAQ section? | ❌ Missing — the "Which one applies to you" section could be converted to FAQ |
| Schema markup? | ❌ None |
| Heading structure matches queries? | ✅ H2s match how people search ("What is GRI", "CSRD requirements") |

**Why this post is your best AI citation candidate:** It corrects outdated information that AI systems currently have wrong (TCFD still active, SASB still standalone, CSRD unchanged). AI platforms reward content that updates their understanding. The comparison table is directly extractable.

### 4b. What Greenwashing Actually Is (`/blog/what-greenwashing-actually-is/`)
**Citation readiness: 🟡 Good but improvable**

| Check | Status |
|-------|--------|
| Clear definition in first paragraph? | ✅ Opens with the misconception and corrects it |
| Self-contained answer blocks? | ✅ Each enforcement case is standalone |
| Comparison tables? | ❌ No structured comparisons — enforcement cases are narrative |
| Statistics with sources? | ✅ Specific dollar amounts, dates, jurisdictions |
| Expert attribution? | ⚠️ No author bio on page |
| "Last updated" visible? | ⚠️ Only `publishedAt` (Aug 26, 2026) |
| FAQ section? | ❌ Missing — common questions like "What counts as greenwashing?" would be extractable |
| Schema markup? | ❌ None |

**Why this post matters for AI:** It defines "greenwashing" using the current enforcement standard (reasonable consumer, not intent) — a framing that most existing AI training data doesn't have. This is exactly the kind of content AI systems will cite once they index it.

### 4c. Green Living (`/blog/green-living/`)
**Citation readiness: 🔴 Weak**

| Check | Status |
|-------|--------|
| Clear definition in first paragraph? | ⚠️ Generic — "making conscious choices that reduce your environmental impact" |
| Self-contained answer blocks? | ⚠️ Some sections are, others are Ghost-era filler |
| Comparison tables? | ✅ Metrics table exists (Energy, Water, Waste, Carbon, Transportation) |
| Statistics with sources? | ❌ No cited statistics |
| Expert attribution? | ❌ No author bio |
| "Last updated" visible? | ❌ Published April 2025, no update date |
| FAQ section? | ❌ Missing |
| Schema markup? | ❌ None |
| Content quality? | ⚠️ Ghost migration — some sections are generic, some have broken image references |

**Why this post underperforms despite high impressions:** It ranks (2,971 impressions, pos 8.7) but lacks the specificity and authority signals that make AI systems cite a source. It's a good candidate for a content refresh — add original data, expert quotes, and current statistics.

### 4d. Sustainability Content Writer (`/blog/sustainability-content-writer/`)
**Citation readiness: 🔴 Weak**

Ghost-migrated content with generic framing. Lacks specificity, data, and authority signals. Not a priority for AI optimization — this is a service-positioning post, not an informational one.

---

## 5. Missing Pages Referenced in Internal Linking Plan

The internal linking plan from your GSC audit references several pages that don't exist:

| Page | Status |
|------|--------|
| `/blog/sustainability-claims/` | ❌ Does not exist |
| `/blog/blue-standard-vs-b-corp` | ❌ Does not exist |
| ESG communications service page | ❌ Does not exist |
| Sustainability-copywriter service page | ❌ Does not exist |

These are gaps in your content coverage that competitors may be filling.

---

## 6. Key Queries to Test Manually

Since live AI platform testing requires manual queries, here are the 15 most important queries to test across ChatGPT, Perplexity, and Google AI Overviews:

### High-priority (your best content should get cited):
1. "ESG frameworks GRI SASB TCFD CSRD comparison 2026"
2. "what is greenwashing in 2026"
3. "CSRD requirements after Omnibus package 2026"
4. "ESG reporting requirements for small businesses"
5. "what happened to TCFD and SASB"

### Medium-priority (content exists but may not be strong enough):
6. "sustainability certifications for businesses"
7. "what does green living mean"
8. "ESG certification guide"
9. "sustainability report vs impact report"
10. "sustainability content writer"

### Brand/service queries:
11. "sustainability copywriter Pacific Northwest"
12. "ESG communications consultant"
13. "greenwashing consulting services"
14. "sustainable brand marketing Seattle"
15. "grant writing for sustainability organizations"

**How to test:** Run each query in ChatGPT (with search), Perplexity, and Google. Record: Is SSC cited? What page? Who else is cited? Log in a spreadsheet.

---

## 7. Third-Party Presence

AI systems cite third-party sources more than your own domain (6.5x more likely per research). Check:

| Platform | Status | Action Needed |
|----------|--------|---------------|
| Wikipedia page | ❌ Likely doesn't exist | Not actionable yet (need notability) |
| Reddit discussions | ❓ Unknown | Participate authentically in r/sustainability, r/nonprofit |
| Industry publications | ❓ Unknown | Guest posts on ESG/sustainability sites |
| Review sites | ❓ Not applicable (service business) | LinkedIn recommendations |
| YouTube | ❓ Unknown | How-to videos for key queries |

---

## 8. Recommended Implementation Order

### Week 1: Foundation
1. Create `public/llms.txt`
2. Add `Article` schema to blog post template (affects all posts at once)
3. Add `Organization` schema to site layout

### Week 2: High-value content
4. Add `FAQPage` schema to ESG frameworks post (convert "Which one applies" to FAQ)
5. Add `FAQPage` schema to greenwashing post
6. Add author attribution to all posts (name + credentials)

### Week 3: Content refresh
7. Refresh `green-living.mdx` — add current statistics, remove Ghost filler
8. Add "Last updated" date display to blog post template
9. Create FAQ sections for 3-5 highest-traffic posts

### Week 4: Monitoring
10. Run the 15-query manual audit across AI platforms
11. Log baseline results in a tracking spreadsheet
12. Set up monthly monitoring cadence

---

## 9. Biggest Quick Win

**The ESG Frameworks Explained post** is your single best AI citation opportunity. Here's why:

- It corrects information that AI systems currently have wrong (TCFD, SASB, CSRD status)
- It has a comparison table that's directly extractable
- It cites 8 authoritative sources
- It's dated August 2026 — recent enough to be weighted by freshness algorithms

Adding `Article` + `FAQPage` schema and an author bio to this one post would likely produce measurable AI citation improvement within 30 days.
