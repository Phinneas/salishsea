/**
 * Deep documentation content for skills — the body of each individual
 * skill page. Keyed by skill slug (see src/config/skills.ts for taxonomy).
 *
 * Phase 1 (content-strategy, 6 skills) is fully documented here.
 * Phases 2-3 skills stay `coming-soon` in the taxonomy until their
 * documentation ships (add a key here when they do).
 *
 * Sections mirror the page template (docs/skills-architecture.md):
 *   1. What it does       6. Output
 *   2. When to use it     7. Next steps / workflow connections
 *   3. Methodology        8. Time & resource requirements
 *   4. Real example       9. Related skills (relationship labels)
 *   5. Common mistakes   10-11. GitHub SKILL.md + Use in Claude
 *
 * The Real Example section (4) is intentionally driven by production data
 * from the user's own properties (traffic, conversions, timing). Drop the
 * findings into `realExample` when the run is documented.
 */

export interface SkillContent {
  /** H1 override — "Skill: From X to Y" style. Falls back to skill.name. */
  seoHeadline?: string
  /** SEO keyword targets for this page (also used in metadata). */
  keywordTargets: string[]

  /* Section 1 — What it does */
  whatItDoes: string[]
  coreComponents: { name: string; why: string }[]

  /* Section 2 — When to use it */
  useCases: { scenario: string; example: string }[]

  /* Section 3 — The methodology */
  methodology: { title: string; detail: string; time: string; tools?: string[] }[]

  /* Section 4 — Real example (production data from a live property) */
  realExample?: {
    property: string
    summary: string
    findings: string
    action: string
    result: string
    quote?: string
    timeInvestment?: string
  }

  /* Section 5 — Common mistakes */
  commonMistakes: { mistake: string; impact: string }[]

  /* Section 6 — Output */
  output: { description: string; format: string; feedsInto: string }

  /* Section 7 — Next steps / workflow connections */
  nextSteps: string
  nextSkillSlugs: string[]

  /* Section 8 — Time & resources */
  timeResources: { firstRun: string; iterations: string; tools: string[]; learningCurve: string }

  /* Section 9 — Related skills with relationship labels */
  related: { slug: string; relationship: string }[]

  /* Section 10 — GitHub SKILL.md */
  githubUrl?: string
  githubNote?: string

  /* Section 11 — Use in Claude */
  useInClaude: string
}

export const skillContent: Record<string, SkillContent> = {
  // =========================================================================
  // PHASE 1 — Content Strategy
  // =========================================================================

  'content-plan-reasoning-lift': {
    seoHeadline: 'Content Plan: From Topic List to Question-Led Editorial Roadmap',
    keywordTargets: ['content planning', 'AI-era SEO', 'editorial roadmap', 'content strategy', 'search visibility'],
    whatItDoes: [
      'Most content plans start with search volume — which topics have enough queries to be worth writing. That is the wrong end of the problem. Search volume tells you what people type, not what they are trying to resolve. By the time a question reaches a search bar, the buyer has already moved through stages of uncertainty that the keyword never names.',
      'This skill starts with the questions a buyer actually asks across five stages of their journey, then audits how AI answers those questions today and where you are absent from the answer. The output is not a topic list — it is an editorial roadmap where every piece exists because a specific question is going unanswered, and where you are the one who can answer it.',
    ],
    coreComponents: [
      { name: 'Five-stage buyer question map', why: 'Defines the questions that actually exist at each stage, so the plan covers the journey instead of one slice of it.' },
      { name: 'Question bank per stage', why: 'Gives each content piece a specific job — a question it exists to answer — instead of a vague topic assignment.' },
      { name: 'AI answer audit', why: 'Shows how Claude, ChatGPT, and Perplexity answer each question today and whether you are cited — the visibility you actually compete for.' },
      { name: 'Gap analysis', why: 'Finds questions with real demand where you are absent, which is where the highest-leverage content lives.' },
      { name: 'Calendar with rationale per slot', why: 'Every piece ships with its reasoning attached, so the plan survives team changes and budget reviews.' },
    ],
    useCases: [
      { scenario: 'Building a new editorial roadmap from scratch', example: 'Run this before spending a quarter writing content, so every piece has a question it answers.' },
      { scenario: 'Refreshing a stale content plan', example: 'Run quarterly to re-audit AI answers and re-prioritize — visibility changes as fast as the models do.' },
      { scenario: 'Deciding what to write next', example: 'When the calendar is full of ideas but the reasoning is thin, this forces each idea to justify itself.' },
      { scenario: 'Preparing a content strategy deliverable for a client', example: 'The roadmap plus rationale per slot is a strategy document, not a content schedule.' },
    ],
    methodology: [
      {
        title: 'Map the five buyer stages and their questions',
        detail:
          'List the stages your buyer moves through (awareness, research, comparison, decision, retention — adjust to your funnel). For each stage, write every question a real buyer would ask, in their language. Pull from support tickets, sales calls, forum threads, and review complaints — not from your own vocabulary. The questions are the raw material; the stage labels are just organization.',
        time: '2–3 hours for a new domain, 45 minutes when revisiting',
      },
      {
        title: 'Audit how AI answers each question today',
        detail:
          'Run the top questions through Claude, ChatGPT, Perplexity, and Gemini. For each answer, record: which sources it cites (or if it answers without citing anyone), whether your site appears, and what angle wins. This is the AI visibility baseline — the exact list of answers you are currently absent from. Save the raw outputs; they become the evidence in the gap analysis.',
        time: '2–3 hours for 20–30 questions',
        tools: ['Claude', 'ChatGPT', 'Perplexity', 'Gemini'],
      },
      {
        title: 'Build the gap analysis',
        detail:
          'For each question, mark: (a) demand — how often the question surfaces across sources, (b) your coverage — do you have a page that directly answers it, (c) AI visibility — are you cited. The questions with high demand, low coverage, and zero citations are your priority set. Questions where a competitor is consistently cited are your attack targets.',
        time: '1 hour',
      },
      {
        title: 'Score and prioritize',
        detail:
          'Score each candidate question on demand, coverage gap, and citation gap. Weight them by business relevance — a question your buyer asks before a high-ticket decision outranks a higher-volume question from a low-value audience. Cut the list to what one team can actually produce well in a quarter.',
        time: '1 hour',
      },
      {
        title: 'Write the roadmap with rationale per slot',
        detail:
          'Produce the calendar: each slot names the piece, the question it answers, the stage it serves, the evidence it will cite, and the metric that tells you it worked. If a slot cannot state its question and its evidence, it does not go on the calendar.',
        time: '1–2 hours',
      },
    ],
    commonMistakes: [
      { mistake: 'Planning from search volume alone', impact: 'You write about what people type, not what they are trying to resolve — then wonder why high-volume topics convert nothing. Volume is a filter, not a strategy.' },
      { mistake: 'Skipping the AI visibility audit', impact: 'You produce pages the answer engines never cite, which is the audience that matters now. The audit is what turns a topic list into an entry ticket.' },
      { mistake: 'Assigning topics instead of questions', impact: 'A topic can be written fifty ways; a question has a correct answer. Without the question, every piece drifts toward generic coverage.' },
      { mistake: 'No refresh cadence', impact: 'AI answers change quarterly. A plan built once is stale by the second quarter — the roadmap needs a re-audit slot built in.' },
    ],
    output: {
      description:
        'An editorial roadmap: a calendar where every piece is tied to a specific buyer question, the AI answers that question currently gives, your gap, and the evidence the piece will use. Each slot carries its rationale, so the plan defends itself.',
      format: 'Markdown/table — one row per piece with question, stage, priority score, evidence, and success metric.',
      feedsInto:
        'Hands the question set to answer-page-rebuilder when a page needs restructuring, and pulls keyword demand data from seranking-dataforseo to size each question.',
    },
    nextSteps:
      'Run seranking-dataforseo first if you need demand data to size the question set, or seo-technical-audit if the site itself is capping what the plan can achieve. Once the roadmap is live, answer-page-rebuilder restructures the priority pages into the question-answer format answer engines quote.',
    nextSkillSlugs: ['seranking-dataforseo', 'seo-technical-audit', 'answer-page-rebuilder'],
    timeResources: {
      firstRun: '6–8 hours (includes the AI audit and learning curve)',
      iterations: '2–3 hours per quarterly refresh',
      tools: ['Claude or ChatGPT for the answer audit', 'A question source: support tickets, forums, sales call notes'],
      learningCurve: 'Low for the process itself; the judgment is in weighting demand against business relevance.',
    },
    related: [
      { slug: 'seranking-dataforseo', relationship: 'Often run before — provides the keyword demand data that sizes each question' },
      { slug: 'answer-page-rebuilder', relationship: 'Often used after — restructures priority pages into the answer format' },
      { slug: 'market-research', relationship: 'Pairs with — supplies the buyer language that makes the question map real' },
    ],
    githubNote: 'Technical SKILL.md coming soon — this page is the reference until it ships.',
    useInClaude:
      'Ask Claude: "Use the Content Plan methodology to build my editorial roadmap." Provide your buyer questions, current content inventory, and an AI answer audit as inputs.',
  },

  'design-what-if': {
    seoHeadline: 'Design What-If: Four Passes That Move Feedback Past Taste',
    keywordTargets: ['design feedback', 'design critique', 'creative direction', 'design review process', 'emotional target'],
    whatItDoes: [
      'Design feedback usually stalls at taste. "I don\u2019t like it" — and the project has nowhere to go, because a preference is not a direction. This skill replaces taste with a four-pass process that pressure-tests a design until the project commits to one idea and an emotional target it can be judged against.',
      'The four passes — Hidden Truth, What If, Feel, and Combine — force the design to answer what it is actually communicating, what alternatives would change, what feeling it must land, and which elements survive combination. The output is a committed direction with the reasoning recorded, so later feedback is measured against intent instead of mood.',
    ],
    coreComponents: [
      { name: 'Hidden Truth pass', why: 'Strips the decoration to state what the design actually communicates — the message underneath the styling.' },
      { name: 'What If pass', why: 'Pressure-tests three to four wild variants so the chosen direction is a decision, not a default.' },
      { name: 'Feel pass', why: 'Names the emotional target explicitly so the design can be tested against a feeling instead of an opinion.' },
      { name: 'Combine pass', why: 'Merges the strongest elements into a single committed direction — no floating alternatives.' },
      { name: 'Recorded rationale', why: 'Locks the decision and its reasons so later feedback has a target to argue against.' },
    ],
    useCases: [
      { scenario: 'Kicking off a new design or creative direction', example: 'Run the four passes before showing options to stakeholders, so the first review is a decision, not a roulette wheel.' },
      { scenario: 'Feedback has stalled on taste', example: 'When reviews produce "I don\u2019t like it" with no direction, this framework converts preference into criteria.' },
      { scenario: 'Choosing between directions', example: 'When the team cannot pick between options, the Feel pass gives you a testable emotional target.' },
      { scenario: 'Reopening a decided design', example: 'When a project reopens decisions late, the recorded rationale shows what was committed to and why.' },
    ],
    methodology: [
      {
        title: 'Pass 1 — Hidden Truth',
        detail:
          'Ask what the design actually communicates, stripped of decoration. Write the one-sentence message a viewer would take away. If the honest answer is not the message the project wants, that is the finding — not the starting point.',
        time: '30–60 minutes',
      },
      {
        title: 'Pass 2 — What If',
        detail:
          'Generate three to four alternatives that deliberately break the current direction — different hierarchy, different tone, different medium. The point is not to produce final options; it is to reveal what the current design is choosing by showing what it is rejecting.',
        time: '1 hour',
      },
      {
        title: 'Pass 3 — Feel',
        detail:
          'Name the emotional target: the feeling the finished experience must produce at its key moment. Then test each direction — current and variants — against it. Directions that cannot produce the target feeling fail regardless of taste.',
        time: '30 minutes',
      },
      {
        title: 'Pass 4 — Combine',
        detail:
          'Take the strongest elements from the surviving directions and merge them into one committed design. The project commits here — everything after this is refinement against the recorded rationale, not re-opening.',
        time: '45 minutes',
      },
    ],
    commonMistakes: [
      { mistake: 'Feedback expressed as taste ("I don\u2019t like it")', impact: 'Gives the design team nothing to act on and reopens the review cycle indefinitely. Convert every preference into a criterion the design can test against.' },
      { mistake: 'Presenting too many options', impact: 'More options mean more taste votes and no decision. The Combine pass exists to converge — use it.' },
      { mistake: 'No emotional target', impact: 'Without a target feeling, any direction can be argued either way. The Feel pass is what makes the review objective.' },
      { mistake: 'Reopening decisions after commit', impact: 'Every reopened decision multiplies the timeline. The recorded rationale is the guard — changes must argue against it, not against taste.' },
    ],
    output: {
      description:
        'A committed design direction plus a one-paragraph rationale: the hidden truth, the variants considered, the emotional target, and what the final design chooses.',
      format: 'Short written decision doc — direction, emotional target, and rationale. No deck required.',
      feedsInto: 'Becomes the strategic input for design-brief-enforcer, which turns the direction into enforceable specs.',
    },
    nextSteps:
      'After the direction commits, run design-brief-enforcer to translate it into named vocabulary, reference decomposition, and hard spec values. Pair with market-research if the direction needs buyer language grounding first.',
    nextSkillSlugs: ['design-brief-enforcer', 'market-research', 'content-plan-reasoning-lift'],
    timeResources: {
      firstRun: '3–4 hours including the four passes and rationale write-up',
      iterations: '1–2 hours once the team is practiced',
      tools: ['Current design files', 'A shared doc for the decision record'],
      learningCurve: 'Low — the framework is a meeting format, not a toolchain.',
    },
    related: [
      { slug: 'design-brief-enforcer', relationship: 'Often used after — converts the committed direction into enforceable specs' },
      { slug: 'market-research', relationship: 'Pairs with — buyer language grounds the emotional target in reality' },
      { slug: 'content-plan-reasoning-lift', relationship: 'Alternative approach — content-side frameworks for the same "decide, don\u2019t drift" problem' },
    ],
    githubNote: 'Technical SKILL.md coming soon — this page is the reference until it ships.',
    useInClaude:
      'Ask Claude: "Use the Design What-If methodology to pressure-test this design." Paste the current direction, the variants, and the intended emotional target.',
  },

  'market-research': {
    seoHeadline: 'Market Research: Your Buyers Already Wrote Your Copy',
    keywordTargets: ['market research', 'buyer language', 'messaging framework', 'ICP research', 'voice of customer'],
    whatItDoes: [
      'Your buyers have already written your copy. It is sitting in forum threads, review complaints, and support conversations — the exact language they use when no one is selling to them. This skill pulls that language out and turns it into a messaging framework: the pains, gains, and objections in your buyers\u2019 own words, organized so you can write against them.',
      'Most research stops at a word cloud of themes. This one stops at a working framework: exact phrases, mapped to the stage of the journey they belong to, with the proof points your buyers themselves accept. It is the difference between research you file away and research you write from.',
    ],
    coreComponents: [
      { name: 'Source identification', why: 'Points at where buyers actually talk — forums, reviews, support threads — instead of surveys people answer politely.' },
      { name: 'Exact-language extraction', why: 'Preserves the buyer\u2019s phrasing, which is the phrasing that converts when it appears in your copy.' },
      { name: 'Pain / gain / objection mapping', why: 'Organizes raw language into the three forces every message must handle.' },
      { name: 'Journey-stage tagging', why: 'Tells you which language belongs in which part of the funnel.' },
      { name: 'Messaging framework output', why: 'A working document, not a report — structured so writers can build from it directly.' },
    ],
    useCases: [
      { scenario: 'Entering a new market or audience', example: 'Run this before writing strategy, so the first words you publish speak the buyer\u2019s language.' },
      { scenario: 'Rewriting core pages that do not convert', example: 'Replace your vocabulary with theirs — the fastest copy fix that is not copywriting.' },
      { scenario: 'Building an ICP definition', example: 'The pain/gain/objection map is the evidence an ICP needs.' },
      { scenario: 'Before a content plan', example: 'The question map in content-plan is only as real as the language behind it — this is where the language comes from.' },
    ],
    methodology: [
      {
        title: 'Identify the sources',
        detail:
          'List where your buyers talk when no one is selling: product review sites, Reddit and niche forums, support tickets, community threads, competitor review complaints. Include the "bad" sources — complaints are where the language gets honest.',
        time: '1 hour',
      },
      {
        title: 'Collect the raw material',
        detail:
          'Export threads, reviews, and tickets. Target a few hundred genuine customer statements. The goal is depth over breadth — a hundred honest complaints beat a thousand survey answers.',
        time: '2 hours',
      },
      {
        title: 'Extract exact phrases',
        detail:
          'Pull the verbatim phrases customers use for their problems, their desired outcomes, and their objections. No paraphrasing — the exact wording is the asset. You are mining vocabulary, not themes.',
        time: '2 hours',
      },
      {
        title: 'Map to pains, gains, objections',
        detail:
          'Cluster the phrases into pains (what hurts), gains (what they want), and objections (why they hesitate). Tag each with the journey stage it belongs to. This is the raw framework.',
        time: '1–2 hours',
      },
      {
        title: 'Build the messaging framework',
        detail:
          'Write the final document: for each stage, the buyer\u2019s exact language, the message that answers it, and the proof point buyers themselves accept. This becomes the copywriting reference.',
        time: '1 hour',
      },
    ],
    commonMistakes: [
      { mistake: 'Stopping at a word cloud or theme list', impact: 'Themes are summaries; they lose the exact phrasing that does the work. You end up with research and still write in your own voice.' },
      { mistake: 'Paraphrasing instead of quoting', impact: 'Paraphrase removes the buyer\u2019s words — the entire point. Keep the verbatim phrases or the framework is hollow.' },
      { mistake: 'Ignoring objections', impact: 'Objections are where conversions die. A framework that skips them leaves your sales page guessing.' },
      { mistake: 'Skipping the ICP definition', impact: 'Without a defined buyer, "their language" is anyone\u2019s language. Define the audience first or the collection has no center.' },
    ],
    output: {
      description:
        'A messaging framework: buyer language organized by pain, gain, and objection, tagged by journey stage, with proof points. Ready to write from.',
      format: 'Structured markdown doc — no reports or decks.',
      feedsInto: 'Directly informs content-plan (question language), design-what-if (emotional target), and every copy deliverable.',
    },
    nextSteps:
      'Hand the framework to content-plan-reasoning-lift to build the editorial roadmap from the buyer\u2019s actual questions, or to design-what-if to ground the emotional target in real language.',
    nextSkillSlugs: ['content-plan-reasoning-lift', 'design-what-if', 'seranking-dataforseo'],
    timeResources: {
      firstRun: '5–7 hours including collection',
      iterations: '2–3 hours to refresh language for a new audience',
      tools: ['Reddit/forum search', 'Review sites', 'Support ticket export'],
      learningCurve: 'Low process, real judgment in the clustering and the ICP definition.',
    },
    related: [
      { slug: 'content-plan-reasoning-lift', relationship: 'Often used before — supplies the buyer language the question map needs' },
      { slug: 'design-what-if', relationship: 'Pairs with — grounds the emotional target in real buyer language' },
      { slug: 'seranking-dataforseo', relationship: 'Often used after — sizes the demand behind each pain and gain' },
    ],
    githubNote: 'Technical SKILL.md coming soon — this page is the reference until it ships.',
    useInClaude:
      'Ask Claude: "Use the Market Research methodology to build a messaging framework." Provide the forum threads, reviews, and support ticket exports as source material.',
  },

  'seranking-dataforseo': {
    seoHeadline: 'SE Ranking + DataForSEO: Joining Visibility Gaps to Keyword Demand',
    keywordTargets: ['keyword research', 'SE Ranking', 'DataForSEO', 'AI visibility audit', 'keyword strategy'],
    whatItDoes: [
      'An AI visibility audit tells you where you are invisible. A keyword tool tells you what people search. Run separately, they both underperform — one gives you problems without demand data, the other gives you demand without context. This skill joins them: the visibility gaps from the audit get matched against keyword demand from SE Ranking and DataForSEO, and the output is a four-week content calendar with a reason behind every slot.',
      'The join is the method. Each calendar slot exists because a specific gap (a question you do not answer) met specific demand (people searching and AI models answering without you). No gap without demand, no demand without a gap — the calendar only contains slots that justify themselves.',
    ],
    coreComponents: [
      { name: 'Visibility audit output', why: 'The list of questions and queries where answer engines answer without citing you — the attack surface.' },
      { name: 'Keyword expansion from seed sets', why: 'Turns the audit\u2019s gaps into full clusters via SE Ranking and the DataForSEO API.' },
      { name: 'Demand data', why: 'Volume, difficulty, and trend per query — so gaps are sized before they are prioritized.' },
      { name: 'Gap-to-demand join', why: 'The core step: each candidate must have both a visibility gap and real demand to make the calendar.' },
      { name: 'Four-week calendar with rationale', why: 'A plan where every slot names its gap, its demand, and its expected effect — defensible in any review.' },
    ],
    useCases: [
      { scenario: 'Building a quarterly content plan', example: 'Run this to size every planned piece against real demand and your actual visibility gaps.' },
      { scenario: 'An audit found gaps but nothing was done', example: 'The gap list is static until demand data makes it actionable — this is the step that turns findings into work.' },
      { scenario: 'Content is ranking but not converting', example: 'The calendar forces question-specific pieces, which align content to intent rather than volume.' },
      { scenario: 'A client wants a content plan with evidence', example: 'Per-slot rationale built from real tools is a deliverable that survives scrutiny.' },
    ],
    methodology: [
      {
        title: 'Run the AI visibility audit',
        detail:
          'Take the priority questions from the content-plan or can-ai-find-you audit and record which ones produce answers without citing you. This is the gap set — everything after this exists to fill one of these gaps.',
        time: '1–2 hours',
        tools: ['Claude', 'ChatGPT', 'Perplexity'],
      },
      {
        title: 'Expand keywords from seed sets',
        detail:
          'Feed each gap query as a seed into SE Ranking\u2019s keyword tool and the DataForSEO API. Pull related queries, questions, and long-tail variants. You are looking for the cluster around each gap — not just the exact query.',
        time: '2 hours',
        tools: ['SE Ranking', 'DataForSEO API'],
      },
      {
        title: 'Join gaps to demand',
        detail:
          'For each expanded query, mark: demand (volume and trend), relevance (does the searcher match your buyer), and gap (are you cited anywhere in the answer?). Keep only queries with all three. A high-volume query you already answer is not a calendar slot — it is already done.',
        time: '1 hour',
      },
      {
        title: 'Prioritize by score',
        detail:
          'Score the survivors on demand, gap size, and business relevance. Weight business relevance highest — a query from a decision-stage buyer beats a curiosity query with twice the volume. Cut to what one team can produce well in four weeks.',
        time: '1 hour',
      },
      {
        title: 'Build the four-week calendar',
        detail:
          'Produce the calendar with one slot per query: the query, the gap it fills, the evidence it will cite, and the metric that measures success. Slot rationale is not optional — it is the deliverable.',
        time: '1 hour',
      },
    ],
    commonMistakes: [
      { mistake: 'Running the tools separately', impact: 'The audit alone produces a list no one acts on; the keyword tool alone produces volume without context. The join is the entire value.' },
      { mistake: 'Prioritizing by volume alone', impact: 'Volume without relevance fills the calendar with queries that will never convert. Business relevance must weight the score.' },
      { mistake: 'Ignoring the gap condition', impact: 'Writing for queries you already answer just produces duplicate content. No gap, no slot.' },
      { mistake: 'Calendar without rationale', impact: 'A calendar without reasons dies at the first budget review. The per-slot rationale is what makes it a strategy.' },
    ],
    output: {
      description:
        'A four-week content calendar where every slot names its query, its visibility gap, its demand evidence, and its success metric.',
      format: 'Table or spreadsheet — query, cluster, gap, volume, priority score, owner, metric.',
      feedsInto: 'Becomes the input for content-plan-reasoning-lift (roadmap structure) and answer-page-rebuilder (page format).',
    },
    nextSteps:
      'Run can-ai-find-you first to establish the gap set if you do not have one. Hand the calendar to content-plan-reasoning-lift for roadmap structure, then answer-page-rebuilder to format the priority pages.',
    nextSkillSlugs: ['can-ai-find-you', 'content-plan-reasoning-lift', 'answer-page-rebuilder'],
    timeResources: {
      firstRun: '5–6 hours (audit + keyword expansion)',
      iterations: '2–3 hours per monthly refresh',
      tools: ['SE Ranking account', 'DataForSEO API access', 'Answer engines for the audit'],
      learningCurve: 'Moderate — the tools are straightforward; the judgment is in weighting and cutting.',
    },
    related: [
      { slug: 'can-ai-find-you', relationship: 'Often run before — produces the visibility gap set this skill fills' },
      { slug: 'content-plan-reasoning-lift', relationship: 'Often used after — structures the calendar into a roadmap' },
      { slug: 'answer-page-rebuilder', relationship: 'Often used after — formats priority pages for answer engines' },
    ],
    githubNote: 'Technical SKILL.md coming soon — this page is the reference until it ships.',
    useInClaude:
      'Ask Claude: "Use the SE Ranking + DataForSEO methodology to build my content calendar." Provide the visibility audit gaps and your keyword tool exports.',
  },

  'seo-technical-audit': {
    seoHeadline: 'SEO Technical Audit: Finding the Nine Issues That Move Anything',
    keywordTargets: ['technical SEO audit', 'crawl issues', 'site architecture', 'search visibility', 'SEO fixes'],
    whatItDoes: [
      'A crawl of almost any site returns 400 issues. Nine of them move anything. This skill is the pass that finds which nine — the result of 100+ audits distilled into a fixed set of issue classes that actually change rankings, plus a discipline for ignoring everything else.',
      'The value is not the crawl; it is the triage. Every issue in the nine classes gets verified against Google Search Console data before it earns a place on the fix list, so the output is not a 400-row report but a short, prioritized list of fixes that will matter.',
    ],
    coreComponents: [
      { name: 'Crawl the site', why: 'The raw material — every issue in every class comes from the crawl data.' },
      { name: 'Nine issue classes', why: 'The distilled list of things that actually matter: crawlability, canonicals/duplicates, index bloat, speed, internal linking depth, orphans, structured data, mobile, redirects.' },
      { name: 'Search Console verification', why: 'Every candidate issue is confirmed against real impressions and clicks before it costs time — the anti-chase discipline.' },
      { name: 'Impact × effort prioritization', why: 'Fixes are ranked by what they will move against what they cost to do.' },
      { name: 'Prioritized fix list', why: 'The deliverable: a short list a developer can act on without re-reading the crawl.' },
    ],
    useCases: [
      { scenario: 'Traffic is flat and content is good', example: 'Run this to find the structural cap — usually index bloat, canonicals, or depth.' },
      { scenario: 'Before a big content push', example: 'Fixing the architecture first means the new content can actually get crawled and cited.' },
      { scenario: 'After a migration or redesign', example: 'Redirects, orphans, and canonicals all break in migrations — verify the nine classes before launch day.' },
      { scenario: 'As a monthly/quarterly check', example: 'Iterative runs take an hour and catch drift before it compounds.' },
    ],
    methodology: [
      {
        title: 'Crawl the site',
        detail:
          'Run a full crawl with Screaming Frog or SE Ranking. Export the raw data; you are not reading it yet — you are loading the classes.',
        time: '1 hour for most sites',
        tools: ['Screaming Frog', 'SE Ranking'],
      },
      {
        title: 'Triage the nine issue classes',
        detail:
          'Work through the nine: crawlability (blocked/soft-404 pages), canonical conflicts and duplicate content, index bloat (thin or useless pages being indexed), page speed, internal linking depth, orphan pages, structured data errors, mobile issues, and redirect chains/loops. For each class, note the candidates from the crawl.',
        time: '1–2 hours',
      },
      {
        title: 'Verify against Search Console',
        detail:
          'For every candidate, check whether the affected pages actually receive impressions and clicks. An issue on a page nobody lands on is not an issue. This is where the 400 collapses to the nine — and the nine collapse to the ones that matter.',
        time: '1 hour',
      },
      {
        title: 'Score impact × effort',
        detail:
          'Rank the survivors: impact (what the fix should move — crawl coverage, clicks, speed) by effort (dev time, risk, dependencies). Fixes that are high impact and low effort go first; everything else is scheduled or dropped.',
        time: '30 minutes',
      },
      {
        title: 'Write the fix list',
        detail:
          'Produce the prioritized list: issue, evidence, expected effect, and effort. One page. A developer can execute from it without reading the crawl.',
        time: '30 minutes',
      },
    ],
    commonMistakes: [
      { mistake: 'Fixing everything the crawler flags', impact: 'The 400-issue approach spends weeks on things that move nothing and delays the nine that do. The Search Console verification step exists to prevent exactly this.' },
      { mistake: 'Chasing the checklist consensus', impact: 'Generic SEO checklists push low-value fixes. The nine classes are the filter — everything else is noise until evidence says otherwise.' },
      { mistake: 'Ignoring index bloat', impact: 'Thin pages dilute crawl budget and dilute topical authority. For most content-heavy sites this is the single biggest cap.' },
      { mistake: 'No baseline before fixing', impact: 'Without pre-fix metrics you cannot prove the fixes worked, which means you cannot defend the time spent.' },
    ],
    output: {
      description:
        'A one-page prioritized fix list: the issues that matter, the evidence they are real, the expected effect, and the effort each costs.',
      format: 'Short table — issue, evidence, impact, effort, priority.',
      feedsInto: 'Clean architecture is the precondition for can-ai-find-you and answer-page-rebuilder; the fix list also informs seranking-dataforseo.',
    },
    nextSteps:
      'After the fixes land, run can-ai-find-you to see what the answer engines now find, then seranking-dataforseo to build the calendar on a clean foundation.',
    nextSkillSlugs: ['can-ai-find-you', 'seranking-dataforseo', 'answer-page-rebuilder'],
    timeResources: {
      firstRun: '4–6 hours including verification',
      iterations: '1–2 hours for quarterly checks',
      tools: ['Screaming Frog or SE Ranking', 'Google Search Console'],
      learningCurve: 'Moderate — the crawl is easy; the triage discipline is what the skill trains.',
    },
    related: [
      { slug: 'can-ai-find-you', relationship: 'Often used after — measures what the answer engines see once the architecture is clean' },
      { slug: 'seranking-dataforseo', relationship: 'Often used after — builds the calendar on a clean foundation' },
      { slug: 'answer-page-rebuilder', relationship: 'Pairs with — page structure is the other half of visibility' },
    ],
    githubNote: 'Technical SKILL.md coming soon — this page is the reference until it ships.',
    useInClaude:
      'Ask Claude: "Use the SEO Technical Audit methodology to triage this crawl." Paste the crawl export and Search Console data; it will return the nine-class triage and a prioritized fix list.',
  },

  'design-brief-enforcer': {
    seoHeadline: 'Design Brief Enforcer: The Antidote to "Make It Modern"',
    keywordTargets: ['creative brief', 'design brief', 'art direction', 'design specs', 'creative review process'],
    whatItDoes: [
      '"Make it modern" produces slop. This skill forces the opposite: a brief that cannot drift, because every requirement is stated in named aesthetic vocabulary, decomposed references, and hard spec values — with a critique pass held separate from the build.',
      'The framework stops the two failure modes that kill creative work: briefs vague enough to mean anything, and critiques that happen during the build, when changing direction is expensive. It replaces both with a spec you can check against and a critique moment that happens before the build commits.',
    ],
    coreComponents: [
      { name: 'Named aesthetic vocabulary', why: 'Bans words like "modern" and "clean" — every term must name something verifiable.' },
      { name: 'Decomposed references', why: 'Breaks reference images into measurable attributes instead of "make it like this".' },
      { name: 'Hard spec values', why: 'Type scale, spacing, color, motion — stated as numbers, not adjectives.' },
      { name: 'Separate critique pass', why: 'Reviews happen against the spec before the build, not during it.' },
      { name: 'Revision gate', why: 'Every change must cite the spec it violates — killing scope-less revisions.' },
    ],
    useCases: [
      { scenario: 'Writing a brief from scratch', example: 'Run this to produce a brief that cannot be misinterpreted — the first review lands.' },
      { scenario: 'A project is drifting into revision cycles', example: 'The spec and revision gate cut the loop: changes must argue against the spec, not taste.' },
      { scenario: 'Onboarding a new designer or agency', example: 'A decomposed, spec\u2019d brief communicates the direction without tribal knowledge.' },
      { scenario: 'After design-what-if commits a direction', example: 'The direction becomes the spec — this is the natural handoff.' },
    ],
    methodology: [
      {
        title: 'Write the named vocabulary',
        detail:
          'List every aesthetic term the brief might use ("modern", "clean", "premium") and replace each with a named, checkable term. "Modern" becomes "minimal layout, one accent color, generous whitespace." If a term cannot be named, it does not belong in the brief.',
        time: '30–60 minutes',
      },
      {
        title: 'Decompose the references',
        detail:
          'For each reference image, list its measurable attributes: type treatment, color palette, spacing rhythm, imagery style, motion. The reference now describes properties, not vibes. "Like Apple" becomes a set of named properties.',
        time: '1 hour',
      },
      {
        title: 'Set the hard spec values',
        detail:
          'Translate the attributes into numbers: type scale steps, spacing units, palette hexes, breakpoints, motion durations. The design is now checkable — each element either matches a spec value or does not.',
        time: '1 hour',
      },
      {
        title: 'Hold the critique pass',
        detail:
          'Review the work against the spec in a dedicated pass, before the build goes further. Every finding cites the spec value it violates. Taste is allowed only where the spec is silent — and the goal is to make it silent as rarely as possible.',
        time: '45 minutes',
      },
      {
        title: 'Enforce the revision gate',
        detail:
          'From the critique onward, changes must cite the spec. A change that cannot name what it fixes does not happen. This is what actually stops the revision spiral.',
        time: 'Ongoing',
      },
    ],
    commonMistakes: [
      { mistake: 'Letting "make it modern" into the brief', impact: 'A brief that can mean anything will produce a design that means nothing — and a revision cycle that pays for it. The vocabulary step exists to ban this.' },
      { mistake: 'Vague references ("like Apple")', impact: 'Undecomposed references import the vibe without the properties, so the design misses both. Decomposition is not optional.' },
      { mistake: 'Critiquing during the build', impact: 'Direction changes mid-build are the most expensive feedback there is. The separate critique pass moves all review to the cheap moment.' },
      { mistake: 'Scope-less revisions', impact: 'Every revision without a cited spec doubles the cycle. The revision gate is what keeps the project moving.' },
    ],
    output: {
      description:
        'An enforceable brief: named vocabulary, decomposed references, hard spec values, and a critique protocol — plus the revision gate that keeps it enforced.',
      format: 'Brief document with a spec table; the critique pass is a scheduled review, not a document.',
      feedsInto: 'The spec becomes the reference for the build and for every later review; pairs with design-what-if for the strategic direction.',
    },
    nextSteps:
      'Run design-what-if first when the direction is not yet decided — this skill enforces whatever it commits to. Pair with market-research if the vocabulary needs grounding in buyer language.',
    nextSkillSlugs: ['design-what-if', 'market-research', 'content-plan-reasoning-lift'],
    timeResources: {
      firstRun: '2–3 hours to write the full brief and spec',
      iterations: '1 hour per project once the vocabulary is established',
      tools: ['A shared brief document', 'Reference images', 'The spec table'],
      learningCurve: 'Low — the process is a document format; the discipline is in refusing vague terms.',
    },
    related: [
      { slug: 'design-what-if', relationship: 'Often used before — produces the committed direction this skill encodes' },
      { slug: 'market-research', relationship: 'Pairs with — buyer language grounds the aesthetic vocabulary' },
      { slug: 'content-plan-reasoning-lift', relationship: 'Adjacent — same "decide, don\u2019t drift" discipline applied to content' },
    ],
    githubNote: 'Technical SKILL.md coming soon — this page is the reference until it ships.',
    useInClaude:
      'Ask Claude: "Use the Design Brief Enforcer methodology to audit this brief." Paste the brief and references; it will flag vague terms and return the spec values.',
  },
}
