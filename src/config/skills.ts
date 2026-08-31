/**
 * Skills library taxonomy — the data behind every page under /skills.
 *
 * Architecture:
 *   /skills/                          → hub (category overview)
 *   /skills/[category]/               → category landing page
 *   /skills/[category]/[skill]/       → individual skill page
 *
 * Conventions (see docs/skills-architecture.md):
 *   - Slugs are lowercase, hyphenated, self-documenting
 *   - Categories: grant-writing, esg-sustainability, ai-visibility,
 *     small-org-operations, content-strategy, tools
 *   - Every skill eventually carries: overview, methodology, use cases,
 *     and a public SKILL.md link.
 *
 * Content status:
 *   - `status: 'coming-soon'` → skill page renders breadcrumb + header +
 *     "coming soon" panel + related skills (template shell).
 *   - `status: 'published'` → all populated sections render.
 */

export type CategorySlug =
  | 'grant-writing'
  | 'esg-sustainability'
  | 'ai-visibility'
  | 'small-org-operations'
  | 'content-strategy'
  | 'tools'

export type SkillStatus = 'published' | 'coming-soon'

/**
 * Rollout phases (see docs/skills-architecture.md):
 *   Phase 1 — content-strategy (6 skills)
 *   Phase 2 — grant-writing + esg-sustainability (12 skills)
 *   Phase 3 — ai-visibility + small-org-operations + tools (13 skills)
 */
export type SkillPhase = 1 | 2 | 3

export const skillPhase: Record<CategorySlug, SkillPhase> = {
  'content-strategy': 1,
  'grant-writing': 2,
  'esg-sustainability': 2,
  'ai-visibility': 3,
  'small-org-operations': 3,
  tools: 3,
}

export interface Skill {
  /** URL slug: /skills/[category]/[slug]/ */
  slug: string
  name: string
  /** One-line description shown on cards and the skill page header. */
  tagline: string
  /** One sentence: "When to use this" (category page cards). */
  whenToUse: string
  status: SkillStatus

  // --- Content sections (filled in as skills are published) ---

  /** Section 1 — What it does (1-2 paragraphs). */
  whatItDoes?: string
  /** Section 2 — When to use it (3-4 scenarios). */
  useCases?: string[]
  /** Section 3 — The methodology (ordered steps). */
  methodology?: string[]
  /** Tools referenced by the methodology (SE Ranking, DataForSEO, etc.). */
  toolsUsed?: string[]
  /** Expected output of running the skill. */
  expectedOutput?: string
  /** Section 4 — Real example from a live property. */
  realExample?: string
  /** Section 5 — Common mistakes (3-4). */
  commonMistakes?: string[]
  /** Section 6 — Next steps / connection to other skills. */
  nextSteps?: string
  /** Section 7 — Public URL to the skill's SKILL.md file. */
  githubUrl?: string
  /** Section 8 — "Run in Claude" import instructions. */
  useInClaude?: string
  /** Related skills (2-3) — creates the mesh navigation. */
  relatedSlugs?: string[]
}

export interface SkillCategory {
  slug: CategorySlug
  name: string
  /** One-line tagline for the hub card. */
  tagline: string
  /** 2-3 sentences — category page header. */
  description: string
  /** "Why these frameworks matter" — category page footer paragraph. */
  strategicValue: string
  skills: Skill[]
}

export const categories: SkillCategory[] = [
  {
    slug: 'grant-writing',
    name: 'Grant Writing',
    tagline: 'From nofo to post-award — proposals, budgets, and reporting that survive the review panel.',
    description:
      'The full grant lifecycle, systematized: decoding funding announcements, triaging fit before you invest hours, building logic models and budget narratives, securing letters of support, and reporting after the award.',
    strategicValue:
      'Grant writing fails on process more often than on talent. Most organizations lose funding not because their mission is weak but because they misread the nofo, under-justify the budget, or submit a narrative the panel has to work to understand. These frameworks turn every stage of the grant lifecycle into a repeatable method — so your best proposals stop depending on a hero effort and start depending on a system.',
    skills: [
      {
        slug: 'nofo-decoder',
        name: 'NOFO Decoder',
        tagline: 'Decode funding announcements into decision-ready requirements.',
        whenToUse: 'When a funding opportunity lands and you need to know fast whether it is worth pursuing.',
        status: 'coming-soon',
        relatedSlugs: ['grant-fit-scorer', 'grant-deadline-scout', 'logic-model-builder'],
      },
      {
        slug: 'grant-fit-scorer',
        name: 'Grant Fit Scorer',
        tagline: 'Score your organization against a grant before you invest hours.',
        whenToUse: 'When you have more opportunities than capacity and need an objective triage.',
        status: 'coming-soon',
        relatedSlugs: ['nofo-decoder', 'budget-narrative-writer', 'grant-deadline-scout'],
      },
      {
        slug: 'logic-model-builder',
        name: 'Logic Model Builder',
        tagline: 'Turn a program idea into a defensible logic model.',
        whenToUse: 'When a proposal, evaluation plan, or grant narrative needs a clear theory of change.',
        status: 'coming-soon',
        relatedSlugs: ['budget-narrative-writer', 'impact-report-ghostwriter', 'nofo-decoder'],
      },
      {
        slug: 'budget-narrative-writer',
        name: 'Budget Narrative Writer',
        tagline: 'Write budget narratives that justify every dollar.',
        whenToUse: 'When the budget needs to tell the same story as the narrative.',
        status: 'coming-soon',
        relatedSlugs: ['grant-fit-scorer', 'logic-model-builder', 'post-award-reporting'],
      },
      {
        slug: 'letter-of-support-kit',
        name: 'Letter of Support Kit',
        tagline: 'Build a letter-of-support package partners can personalize in minutes.',
        whenToUse: 'When your proposal needs external validation and partners are short on time.',
        status: 'coming-soon',
        relatedSlugs: ['budget-narrative-writer', 'grant-fit-scorer', 'nofo-decoder'],
      },
      {
        slug: 'post-award-reporting',
        name: 'Post-Award Reporting',
        tagline: 'Turn grant reporting into a repeatable, stress-free system.',
        whenToUse: 'When award reporting deadlines pile up and funders expect measurable progress.',
        status: 'coming-soon',
        relatedSlugs: ['budget-narrative-writer', 'meeting-minutes-compliance', 'logic-model-builder'],
      },
      {
        slug: 'grant-deadline-scout',
        name: 'Grant Deadline Scout',
        tagline: 'Track upcoming deadlines so opportunities never slip past.',
        whenToUse: 'When your grant calendar is scattered across spreadsheets and email threads.',
        status: 'coming-soon',
        relatedSlugs: ['nofo-decoder', 'grant-fit-scorer', 'board-packet-generator'],
      },
    ],
  },
  {
    slug: 'esg-sustainability',
    name: 'ESG & Sustainability',
    tagline: 'Measurement, disclosure, and claims you can defend.',
    description:
      'From Scope 1-3 inventories to B Corp readiness — the frameworks for measuring what matters, pressure-testing claims before they go public, and reporting progress in a way that survives scrutiny.',
    strategicValue:
      'Sustainability is moving from narrative to numbers, and the gap between the two is where credibility dies. One overstated claim, one unverifiable metric, one report that reads like marketing — and the trust built over years evaporates. These frameworks keep the measurement honest and the communication defensible, so your sustainability work compounds instead of exposing you.',
    skills: [
      {
        slug: 'scope-inventory',
        name: 'Scope Inventory',
        tagline: 'Map your Scope 1, 2, and 3 emissions into a defensible inventory.',
        whenToUse: 'When you need to know what to count before you can report anything.',
        status: 'coming-soon',
        relatedSlugs: ['materiality-interview', 'impact-report-ghostwriter', 'greenwashing-check'],
      },
      {
        slug: 'greenwashing-check',
        name: 'Greenwashing Check',
        tagline: 'Pressure-test your sustainability claims against real evidence.',
        whenToUse: 'Before any public claim goes out — one wrong claim can cost years of trust.',
        status: 'coming-soon',
        relatedSlugs: ['scope-inventory', 'impact-report-ghostwriter', 'can-ai-find-you'],
      },
      {
        slug: 'materiality-interview',
        name: 'Materiality Interview',
        tagline: 'Run structured interviews that surface what actually matters.',
        whenToUse: 'When you need stakeholder priorities you can defend in a double-materiality assessment.',
        status: 'coming-soon',
        relatedSlugs: ['scope-inventory', 'impact-report-ghostwriter', 'b-corp-gap-reader'],
      },
      {
        slug: 'impact-report-ghostwriter',
        name: 'Impact Report Ghostwriter',
        tagline: 'Turn messy impact data into a report people actually read.',
        whenToUse: 'When the annual impact report is due and the data outranks the narrative.',
        status: 'coming-soon',
        relatedSlugs: ['scope-inventory', 'materiality-interview', 'b-corp-gap-reader'],
      },
      {
        slug: 'b-corp-gap-reader',
        name: 'B Corp Gap Reader',
        tagline: 'Read the B Impact Assessment as a roadmap, not a scorecard.',
        whenToUse: 'When you are planning a certification journey and need to prioritize improvements.',
        status: 'coming-soon',
        relatedSlugs: ['impact-report-ghostwriter', 'materiality-interview', 'scope-inventory'],
      },
    ],
  },
  {
    slug: 'ai-visibility',
    name: 'AI Visibility',
    tagline: 'Make sure the machines that recommend you can find you.',
    description:
      'AI answer engines are becoming the new homepage. These frameworks audit what AI models actually see when they look at your site, ship the files they read first, and rebuild pages into the question-answer format they quote.',
    strategicValue:
      'Search is being re-platformed from ten blue links to a single generated answer — and most sites are invisible to it. The organizations that show up in AI answers will capture the discovery traffic of the next decade. These frameworks are the audit and remediation loop for making sure that is you, on purpose, rather than whatever the crawlers happen to find.',
    skills: [
      {
        slug: 'can-ai-find-you',
        name: 'Can AI Find You?',
        tagline: 'Audit whether AI assistants can actually find and cite your content.',
        whenToUse: 'When AI answer engines are becoming your new homepage and you do not know what they see.',
        status: 'coming-soon',
        relatedSlugs: ['answer-page-rebuilder', 'llms-txt-schema-starter', 'seo-technical-audit'],
      },
      {
        slug: 'llms-txt-schema-starter',
        name: 'LLMs.txt Schema Starter',
        tagline: 'Ship an llms.txt file that hands AI crawlers your map.',
        whenToUse: 'When you want to control what AI models know about your site.',
        status: 'coming-soon',
        relatedSlugs: ['can-ai-find-you', 'answer-page-rebuilder', 'seo-technical-audit'],
      },
      {
        slug: 'answer-page-rebuilder',
        name: 'Answer Page Rebuilder',
        tagline: 'Restructure pages into the question-answer format answer engines reward.',
        whenToUse: 'When your pages rank for questions but never get quoted as answers.',
        status: 'coming-soon',
        relatedSlugs: ['can-ai-find-you', 'llms-txt-schema-starter', 'seo-technical-audit'],
      },
    ],
  },
  {
    slug: 'small-org-operations',
    name: 'Small-Org Operations',
    tagline: 'Run the back office like it is load-bearing, because it is.',
    description:
      'Board packets, RFPs, volunteer onboarding, compliant meeting minutes — the unglamorous systems that small organizations survive on. Each one packaged as a repeatable framework instead of a recurring scramble.',
    strategicValue:
      'Small organizations do not fail on mission; they fail on operations — the board meeting that had no packet, the RFP answered at 2 a.m., the volunteer who ghosted after orientation. These frameworks convert recurring chaos into standing systems, which is what actually buys a small team the time to do its real work.',
    skills: [
      {
        slug: 'board-packet-generator',
        name: 'Board Packet Generator',
        tagline: 'Assemble board packets that respect directors\u2019 time.',
        whenToUse: 'When board meetings need decisions, not document dumps.',
        status: 'coming-soon',
        relatedSlugs: ['meeting-minutes-compliance', 'grant-deadline-scout', 'volunteer-onboarding'],
      },
      {
        slug: 'rfp-response',
        name: 'RFP Response',
        tagline: 'Respond to RFPs with a repeatable, score-winning process.',
        whenToUse: 'When an RFP lands and the response needs to be fast and complete.',
        status: 'coming-soon',
        relatedSlugs: ['nofo-decoder', 'grant-fit-scorer', 'letter-of-support-kit'],
      },
      {
        slug: 'volunteer-onboarding',
        name: 'Volunteer Onboarding',
        tagline: 'Turn new volunteers into productive contributors in days, not months.',
        whenToUse: 'When onboarding is ad hoc and volunteers ghost after orientation.',
        status: 'coming-soon',
        relatedSlugs: ['board-packet-generator', 'meeting-minutes-compliance', 'rfp-response'],
      },
      {
        slug: 'meeting-minutes-compliance',
        name: 'Meeting Minutes Compliance',
        tagline: 'Produce meeting minutes that hold up to review and audit.',
        whenToUse: 'When minutes are overdue, scattered, or missing the decisions that matter.',
        status: 'coming-soon',
        relatedSlugs: ['board-packet-generator', 'post-award-reporting', 'volunteer-onboarding'],
      },
    ],
  },
  {
    slug: 'content-strategy',
    name: 'Content Strategy',
    tagline: 'Research, structure, and audit — the strategy behind content that performs.',
    description:
      'Technical audits, keyword research pipelines, content plans with actual reasoning, market research, and design briefs that stay enforced. The strategy layer that decides what gets made and why.',
    strategicValue:
      'Most content fails before a word is written — because the plan was a list of topics instead of a set of bets. These frameworks make the strategy explicit: what the research says, why each piece exists, and how you will know if it worked. Strategy you can see beats strategy you can feel.',
    skills: [
      {
        slug: 'seo-technical-audit',
        name: 'SEO Technical Audit',
        tagline: 'Catch the technical issues quietly capping your rankings.',
        whenToUse: 'When traffic plateaus and the content is good but something is off.',
        status: 'published',
        relatedSlugs: ['can-ai-find-you', 'seranking-dataforseo', 'answer-page-rebuilder'],
      },
      {
        slug: 'seranking-dataforseo',
        name: 'SE Ranking + DataForSEO',
        tagline: 'Run keyword research with SE Ranking and DataForSEO like a pro.',
        whenToUse: 'When you need search demand data you can actually act on.',
        status: 'published',
        relatedSlugs: ['seo-technical-audit', 'market-research', 'content-plan-reasoning-lift'],
      },
      {
        slug: 'content-plan-reasoning-lift',
        name: 'Content Plan Reasoning Lift',
        tagline: 'Rewrite content plans so every piece has a reason to exist.',
        whenToUse: 'When the content calendar is full but the logic behind it is thin.',
        status: 'published',
        relatedSlugs: ['market-research', 'seranking-dataforseo', 'design-brief-enforcer'],
      },
      {
        slug: 'market-research',
        name: 'Market Research',
        tagline: 'Research a market before you write a word of strategy.',
        whenToUse: 'When you are entering a new audience and assumptions are not enough.',
        status: 'published',
        relatedSlugs: ['content-plan-reasoning-lift', 'seranking-dataforseo', 'design-what-if'],
      },
      {
        slug: 'design-what-if',
        name: 'Design What-If',
        tagline: 'Stress-test design decisions against real user scenarios.',
        whenToUse: 'When a design feels right but has not been challenged.',
        status: 'published',
        relatedSlugs: ['design-brief-enforcer', 'market-research', 'content-plan-reasoning-lift'],
      },
      {
        slug: 'design-brief-enforcer',
        name: 'Design Brief Enforcer',
        tagline: 'Keep creative work on-brief from kickoff to delivery.',
        whenToUse: 'When briefs drift and revisions multiply.',
        status: 'published',
        relatedSlugs: ['design-what-if', 'content-plan-reasoning-lift', 'market-research'],
      },
    ],
  },
  {
    slug: 'tools',
    name: 'Tools',
    tagline: 'Open-source tools I built and dogfood on my own properties.',
    description:
      'The utilities behind the frameworks — migrations, link monitoring, and agent workspace hygiene. Built for my own sites first, open-sourced so anyone can use them.',
    strategicValue:
      'Frameworks are only as good as the plumbing underneath them. These tools handle the repetitive, mechanical parts of the library — moving sites without breaking URLs, catching link rot before it compounds, and keeping AI agent workspaces consistent — so the human attention goes to judgment, not janitorial work.',
    skills: [
      {
        slug: 'portage-ghost2astro',
        name: 'Portage: Ghost → Astro',
        tagline: 'Migrate Ghost sites to Astro without losing structure or SEO.',
        whenToUse: 'When you are moving off a CMS and want to keep every URL and post intact.',
        status: 'coming-soon',
        relatedSlugs: ['linkcanary', 'seo-technical-audit', 'can-ai-find-you'],
      },
      {
        slug: 'linkcanary',
        name: 'LinkCanary',
        tagline: 'Catch broken links and dead redirects before your users do.',
        whenToUse: 'When a site is large enough that link rot becomes a real problem.',
        status: 'coming-soon',
        relatedSlugs: ['portage-ghost2astro', 'seo-technical-audit', 'agent-hygiene-score'],
      },
      {
        slug: 'agent-hygiene-score',
        name: 'Agent Hygiene Score',
        tagline: 'Score your AI agent workspace for consistency and repeatability.',
        whenToUse: 'When agent-built work is inconsistent across projects and sessions.',
        status: 'coming-soon',
        relatedSlugs: ['linkcanary', 'seo-technical-audit', 'can-ai-find-you'],
      },
    ],
  },
]

// --- Published SKILL.md specs ------------------------------------------------

/**
 * Skills with a published SKILL.md specification in the public repo
 * (github.com/Phinneas/salish-sea-skills). Keyed by "<category>/<skill slug>";
 * the value is the repo directory, which only differs from the key when the
 * site slug and the repo directory name diverge (e.g. content-plan).
 */
const SKILL_SPEC_DIRS: Record<string, string> = {
  'grant-writing/nofo-decoder': 'grant-writing/nofo-decoder',
  'grant-writing/grant-fit-scorer': 'grant-writing/grant-fit-scorer',
  'grant-writing/logic-model-builder': 'grant-writing/logic-model-builder',
  'grant-writing/budget-narrative-writer': 'grant-writing/budget-narrative-writer',
  'grant-writing/letter-of-support-kit': 'grant-writing/letter-of-support-kit',
  'grant-writing/post-award-reporting': 'grant-writing/post-award-reporting',
  'grant-writing/grant-deadline-scout': 'grant-writing/grant-deadline-scout',
  'content-strategy/seo-technical-audit': 'content-strategy/seo-technical-audit',
  'content-strategy/seranking-dataforseo': 'content-strategy/seranking-dataforseo',
  'content-strategy/content-plan-reasoning-lift': 'content-strategy/content-plan',
  'content-strategy/market-research': 'content-strategy/market-research',
  'content-strategy/design-what-if': 'content-strategy/design-what-if',
  'content-strategy/design-brief-enforcer': 'content-strategy/design-brief-enforcer',
}

const SKILL_REPO_BASE = 'https://github.com/Phinneas/salish-sea-skills/blob/main/skills'

/** Public URL of a skill's SKILL.md spec, or undefined if it has not shipped. */
export function getSkillSpecUrl(categorySlug: string, skillSlug: string): string | undefined {
  const dir = SKILL_SPEC_DIRS[`${categorySlug}/${skillSlug}`]
  return dir ? `${SKILL_REPO_BASE}/${dir}/SKILL.md` : undefined
}

/** Every skill with a published SKILL.md spec, for reference listings. */
export function getPublishedSpecs(): { category: SkillCategory; skill: Skill; url: string }[] {
  const specs: { category: SkillCategory; skill: Skill; url: string }[] = []
  for (const category of categories) {
    for (const skill of category.skills) {
      const url = getSkillSpecUrl(category.slug, skill.slug)
      if (url) specs.push({ category, skill, url })
    }
  }
  return specs
}

// --- Lookup helpers ---------------------------------------------------------

export function getCategory(slug: string): SkillCategory | undefined {
  return categories.find(c => c.slug === slug)
}

export function getSkill(categorySlug: string, skillSlug: string): { category: SkillCategory; skill: Skill } | undefined {
  const category = getCategory(categorySlug)
  if (!category) return undefined
  const skill = category.skills.find(s => s.slug === skillSlug)
  if (!skill) return undefined
  return { category, skill }
}

/** Resolve a skill's relatedSlugs into full skill references (any category). */
export function getRelatedSkills(skill: Skill): { category: SkillCategory; skill: Skill }[] {
  if (!skill.relatedSlugs?.length) return []
  const related: { category: SkillCategory; skill: Skill }[] = []
  for (const slug of skill.relatedSlugs) {
    for (const category of categories) {
      const found = category.skills.find(s => s.slug === slug)
      if (found) {
        related.push({ category, skill: found })
        break
      }
    }
  }
  return related
}

export const totalSkills = categories.reduce((n, c) => n + c.skills.length, 0)
