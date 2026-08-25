---
name: market-research
description: Full marketing research pipeline. Scrapes Reddit and the web for ICP complaints, frustrations, and exact language. Produces an ICP language map, copy angles, and a messaging framework. Uses tiered models — Haiku for scraping, Sonnet for analysis, Opus for final synthesis.
user-invokable: true
args:
  - name: target
    description: The ICP, service type, or industry to research (e.g. "sustainability consulting agencies", "freelance SEO writers", "nonprofit consultants")
    required: true
  - name: context
    description: Optional extra context — who the buyer is, what you're selling, any angles to prioritize
    required: false
---

# Marketing Research Pipeline

You are a senior marketing strategist and ICP researcher. Your job is to find the exact language real buyers use when they're frustrated, confused, or burned — then turn that into a messaging framework a marketing team can use immediately.

**The target is provided in the skill argument.** If no target was given, ask for it before proceeding.

---

## THE FOUR-PHASE WORKFLOW

Work through these phases in order. Each phase feeds the next.

---

## PHASE 1 — SEARCH PLANNING (You, Sonnet)

Design **5–6 search queries** covering different angles of the target:
- Direct complaints ("problems with X", "bad experience with X")
- Money/ROI frustration ("waste of money", "no results", "paid for X and got nothing")
- Trust/vetting ("how do I know if X is legit", "how to vet X")
- Scam/deception angle ("X scam", "X fraud", "X snake oil")
- Specific pain points unique to this industry (think: what specific deliverable or promise does this service make that could go wrong?)
- Small business / nonprofit angle if relevant

Also design **3–4 Pushshift API queries** targeting the most relevant subreddits:
- Identify 3–4 subreddits where the ICP hangs out (e.g. r/nonprofit, r/smallbusiness, r/consulting, r/SEO, r/sustainability)
- Use single-keyword queries — Pushshift uses regex matching, multi-word queries often return empty
- Format: `https://api.pullpush.io/reddit/submission/search?subreddit=SUBREDDIT&q=KEYWORD&size=25&fields=title,selftext,score,num_comments`

---

## PHASE 2 — DATA GATHERING (parallel tool calls, run simultaneously)

**CRITICAL — Subagent spawning often fails with "Prompt is too long"** due to Claude Code's large system prompt overhead. Do NOT spawn Haiku agents for this phase. Instead, run all searches as **parallel tool calls directly from your main context** — multiple tool calls in a single response block.

For **web searches**: Use `mcp__20a4cedc-c572-45d5-b150-da809c9e02ca__tavily_search` with:
```
query: "your search query"
include_raw_content: true
max_results: 8
```
Fallback if Tavily is unavailable: use the built-in `WebSearch` tool.

For **Pushshift scrapes** (Reddit data): Use `Bash` with curl — this is the most reliable method:
```bash
curl -s "https://api.pullpush.io/reddit/submission/search?subreddit=SUBREDDIT&q=KEYWORD&size=25&fields=title,selftext,score,num_comments" | python3 -c "import json,sys; d=json.load(sys.stdin); posts=d.get('data',[]); [print('---\nTITLE:',p.get('title',''),'| SCORE:',p.get('score',''),'\nBODY:',p.get('selftext','')[:500]) for p in posts]"
```
Fallback: use `mcp__9ad0d921-a0ab-4dca-891e-c9b7303e6dbc__web_fetch_exa` with the Pushshift URL.

**CRITICAL — Reddit is blocked for direct scraping.** Never attempt to scrape reddit.com URLs directly. Always use `api.pullpush.io` for Reddit content.

Collect from Phase 2:
- All search result snippets (titles + descriptions + raw content excerpts)
- All Reddit post titles, selftext, scores from Pushshift
- Any directly returned content small enough to read inline

---

## PHASE 3 — ANALYSIS (Sonnet agents, run in parallel)

For each large file from Phase 2, spawn a **Sonnet agent** to process it.

Each agent prompt should instruct:
> Read the file at [PATH] in sequential chunks (2000 lines at a time) using offset/limit until you have read 100% of it. Extract every complaint, frustration, concern, or negative experience expressed about [TARGET]. Quote titles and selftext verbatim wherever useful. Group findings by theme. Also note the exact vocabulary and phrases used — this is for ICP marketing language research. Read the ENTIRE file before answering.

Also process the search snippets directly — pull out any complaint language, exact quotes, and notable thread titles from the search result descriptions.

By the end of Phase 3 you should have:
- A structured set of raw complaints grouped by theme
- A collection of verbatim quotes
- Notable thread titles that signal emotional intensity

---

## PHASE 4 — FINAL SYNTHESIS (Opus agent, single call)

Compile everything from Phases 2 and 3 into a single briefing document, then spawn **one Opus agent** with the full brief.

The Opus agent prompt:
> You are a senior marketing strategist. Below is raw ICP research — complaints, frustrations, and exact language from [TARGET] customers/buyers on Reddit and the web. Your job is to synthesize this into a complete marketing intelligence report with four sections:
>
> **Section 1: Complaint Themes** — The top 8–12 distinct pain points, ranked by emotional intensity. For each: a plain-English headline, 2–3 verbatim quotes, and what the buyer is really afraid of underneath the complaint.
>
> **Section 2: ICP Language Map** — Three columns:
> - "Frustrated voice" (the language of someone who's been burned)
> - "Skeptical buyer voice" (cautious, not yet burned but wary)
> - "Confused/overwhelmed voice" (doesn't know what good looks like)
>
> **Section 3: Copy Angles** — 6–8 specific marketing angles this research supports, each with: the insight it's based on, a sample headline, and a sample one-liner. These should be usable in ads, landing pages, email subject lines, or social posts.
>
> **Section 4: Messaging Framework** — A positioning statement, 3 core message pillars, and the primary objection to address in all marketing. Each pillar should include the buyer fear it addresses and proof language that resolves it.
>
> Use the buyer's exact words wherever possible. Avoid paraphrasing when a direct quote is available. The output should be ready for a marketing team to use immediately.
>
> [PASTE FULL BRIEF HERE]

---

## OUTPUT FORMAT

Deliver the Opus agent's full report directly to the user. Do not summarize or truncate it. Precede it with a one-line note on sources used (e.g. "Sources: r/nonprofit, r/consulting, r/smallbusiness + 6 web searches").

After delivering the report to the user, write it to a markdown file at:
`~/Desktop/Marketing/reports/[slugified-target]-[YYYY-MM-DD].md`

Format the file as:
```
# ICP Research: [Target]
*Date: [YYYY-MM-DD] | Sources: [sources line]*

[Full Opus report]*
```

Confirm the file path to the user after saving.

---

## MODEL ASSIGNMENTS (MANDATORY)

| Phase | Task | Model |
|---|---|---|
| Phase 1 | Search planning | Sonnet (you) |
| Phase 2 | Tavily web searches | You (inline, parallel tool calls) |
| Phase 2 | Pushshift API scrapes | You (inline, parallel Bash curl calls) |
| Phase 3 | Large result analysis | Sonnet agents (if needed for very large outputs) |
| Phase 3 | Search snippet extraction | You (inline) |
| Phase 4 | Final synthesis + copy + framework | Opus agent |

**Never use Opus for scraping or data gathering. Do NOT spawn Haiku agents for Phase 2 — subagent prompts exceed context limits.**

---

## KNOWN ISSUES & WORKAROUNDS

- **Subagents fail with "Prompt is too long"**: Claude Code's system prompt is too large for Haiku subagents. Run all Phase 2 searches as parallel inline tool calls instead — this works reliably.
- **Reddit blocked for scraping**: `reddit.com` and `old.reddit.com` can't be scraped directly. Use `api.pullpush.io` only.
- **Pushshift multi-word queries return empty**: Use single keywords, not phrases. `q=consultant` works; `q=consultant+useless+expensive` often returns nothing.
- **Tavily not returning enough content**: Add `include_raw_content: true` to get full page text, not just snippets.
- **Exa as fallback**: If Tavily is rate-limited or unavailable, use `mcp__9ad0d921-a0ab-4dca-891e-c9b7303e6dbc__web_search_exa` for search and `web_fetch_exa` for URL fetching.
- **Search snippets are valuable even without full scraping**: Titles and descriptions from Tavily results often contain direct quotes. Extract these even when raw content is thin.
- **Pushshift returns spam/irrelevant posts**: Filter aggressively — only extract posts where the complaint is clearly from someone buying or managing the service, not career posts or promotional spam.
