# SEO Technical Audit

**What:** One-pass technical SEO audit for a domain.  
**When:** You need crawlability, indexability, security, mobile, structured data, and JS rendering health.  
**Output:** Severity-sorted issue list + top-10 fix list ranked by impact × effort.

## Use Cases

- Baseline health check on a new domain acquisition
- Troubleshooting why a site isn't ranking (after content/links are solid)
- Quarterly regression check
- Pre-launch QA before major site redesign
- Post-migration verification (Ghost → Astro, etc.)

## The Skill

This skill runs a one-shot technical SEO audit via SE Ranking. It pulls:
- Crawl health (robots.txt, sitemap, crawlability)
- Indexability (noindex, canonical, canonicalization errors)
- Mobile UX (viewport, responsive design)
- Security (HTTPS, security headers, CSP)
- Structured data (schema.org, JSON-LD, error detection)
- Performance (Core Web Vitals field data via CrUX, if configured)
- Modern signals (JS-rendered canonical drift, soft-404s from JS errors, AI-crawler robots.txt rules)

**Key difference from `seo-drift`:** This is a snapshot, not a diff. It tells you "what's broken right now." Use `seo-drift` to track changes between audits.

## Prerequisites

- **SE Ranking MCP server** connected and authenticated
- **Claude WebFetch tool** (for header inspection, robots.txt verification)
- Optional: **Firecrawl** for modern signals (JS canonical divergence, soft-404 detection)
- Optional: **Google APIs** (Tier 0+ for CrUX field data; Tier 1+ for GSC URL Inspection)

## Getting Started

```
Use the seo-technical-audit methodology on example.com
```

Claude will:
1. Check if an audit already exists (reuse if fresh, refresh if stale)
2. Pull the audit report and categorize issues
3. Sense-check critical files (robots.txt, sitemap.xml)
4. Score findings by impact × effort
5. Produce a top-10 fix list

## Time Investment

- **First run:** 6–8 hours (includes learning curve, understanding your domain)
- **Iterations:** 2–3 hours (same domain, incremental changes)
- **Very large sites** (10k+ pages): 30+ minutes for crawl to complete; can stream results while waiting

## Next Steps

After running this:
- Fix the top-10 items (prioritized by score)
- Use `seo-drift` to baseline before major changes, then re-run after fixes
- Use `seo-sitemap` (coming soon) to find orphan pages the audit missed

Or move directly to content strategy:
- Run `seranking-dataforseo` to research high-value keywords
- Feed findings into `content-plan` for your editorial roadmap

## Technical Docs

- **Full SKILL.md:** See [SKILL.md](./SKILL.md) for the complete technical specification, tool requirements, and API calls.
- **On SSC site:** [Read the full methodology and examples](https://salishseaconsulting.com/skills/content-strategy/seo-technical-audit)

## License

MIT. Use freely. Attribute appreciated.
