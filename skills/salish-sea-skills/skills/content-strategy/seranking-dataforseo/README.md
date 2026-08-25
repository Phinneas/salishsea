# Seranking + DataforSEO Content Planning

**What:** AI Search visibility audit + keyword expansion → 4-week content calendar.  
**When:** Planning content for a property that doesn't yet exist or needs a refresh.  
**Output:** Ranked keyword opportunities + publishing calendar + target pages.

## Use Cases

- You're launching a new site or section and need a launch content plan
- Your property has traffic but no content strategy — let's fix that
- You need to rank for high-value long-tail keywords competitors don't own
- You're pivoting audience or positioning — reset your content north star

## The Skill

This skill chains two datasets:

1. **SE Ranking (AI Search visibility):** Which AI models cite you? For which keywords? Who's winning the AI search result?
2. **DataforSEO (keyword expansion):** Which keywords can you realistically rank for? Volume? Difficulty? Traffic potential?

Output: A 4-week content calendar with 8–12 target pages, ranked by strategic value (traffic × effort).

**Key insight:** Ranking in Google and being cited by ChatGPT/Claude/Perplexity are two different problems. This skill solves both.

## Prerequisites

- **SE Ranking MCP** connected (for AI visibility audit)
- **DataforSEO MCP** connected (for keyword research + difficulty scoring)
- **Claude's web search tool** (optional, for supplementary SERP research)

## Getting Started

```
Use the seranking-dataforseo methodology to plan content for [your domain] in [your niche]
```

Claude will:
1. Audit your current AI visibility (who cites you in ChatGPT? Why?)
2. Expand keywords you don't rank for yet (long-tail expansion)
3. Score each keyword: traffic potential × ranking difficulty × your current relevance
4. Build a 4-week editorial calendar with suggested posts

## Time Investment

- **First run:** 4–6 hours
- **Iterations:** 1–2 hours (if refreshing the calendar quarterly)

## Workflow

This skill usually follows **seo-technical-audit** and feeds into **content-plan** (Reasoning Lift).

```
seo-technical-audit → seranking-dataforseo → content-plan → design-what-if
```

## Next Steps

- **Build the content:** Use the calendar to assign posts and deadlines
- **Use design-what-if** to determine the strategic angle for your category
- **Use design-brief-enforcer** to spec each page before design/development

## Technical Docs

- **Full SKILL.md:** See [SKILL.md](./SKILL.md) for the complete technical specification.
- **On SSC site:** [Read the full methodology and examples](https://salishseaconsulting.com/skills/content-strategy/seranking-dataforseo)

## License

MIT. Use freely. Attribute appreciated.
