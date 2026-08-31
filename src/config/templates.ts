/**
 * Template library data — the 6 templates behind /templates/.
 *
 * Pricing: all templates are FREE today. If a template is monetized later,
 * flip `status` to 'paid' and set `price` — the card renders the price
 * instead of the free badge (wire a checkout handler when that happens).
 *
 * Assets live in public/templates/ and are served as static downloads.
 */

export interface TemplateFile {
  /** File name served at /templates/<name> */
  name: string
  format: 'Word' | 'Excel'
}

export interface Template {
  slug: string
  name: string
  bestUse: string
  status: 'free' | 'paid'
  price?: string
  files: TemplateFile[]
  /** Related skill page (mesh navigation) */
  relatedSkill?: { category: string; slug: string; label: string }
}

export const templates: Template[] = [
  {
    slug: 'letter-of-support',
    name: 'Letter of Support',
    bestUse: 'Prepare a credible, partner-specific grant support letter.',
    status: 'free',
    files: [{ name: 'ssc-letter-of-support-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'grant-writing',
      slug: 'letter-of-support-kit',
      label: 'Pairs with the Letter of Support Kit skill',
    },
  },
  {
    slug: 'standard-operating-procedure',
    name: 'Standard Operating Procedure',
    bestUse: 'Document repeatable work, ownership, evidence, exceptions, and review.',
    status: 'free',
    files: [{ name: 'ssc-standard-operating-procedure-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'small-org-operations',
      slug: 'rfp-response',
      label: 'Pairs with Small-Org Operations skills',
    },
  },
  {
    slug: 'logic-model',
    name: 'Logic Model',
    bestUse: 'Design and explain a program\u2019s causal chain, outcomes, indicators, and assumptions.',
    status: 'free',
    files: [
      { name: 'ssc-logic-model-template-v1-0.docx', format: 'Word' },
      { name: 'ssc-logic-model-workbook-v1-0.xlsx', format: 'Excel' },
    ],
    relatedSkill: {
      category: 'grant-writing',
      slug: 'logic-model-builder',
      label: 'Pairs with the Logic Model Builder skill',
    },
  },
  {
    slug: 'grant-budget',
    name: 'Grant Budget',
    bestUse: 'Build and reconcile a funder-ready line-item budget and narrative.',
    status: 'free',
    files: [{ name: 'ssc-grant-budget-template-v1-0.xlsx', format: 'Excel' }],
    relatedSkill: {
      category: 'grant-writing',
      slug: 'budget-narrative-writer',
      label: 'Pairs with the Budget Narrative Writer skill',
    },
  },
  {
    slug: 'competitor-analysis',
    name: 'Competitor Analysis',
    bestUse: 'Collect evidence, compare competitors consistently, and identify testable positioning opportunities.',
    status: 'free',
    files: [{ name: 'ssc-competitor-analysis-template-v1-0.xlsx', format: 'Excel' }],
    relatedSkill: {
      category: 'content-strategy',
      slug: 'market-research',
      label: 'Pairs with the Market Research skill',
    },
  },
  {
    slug: 'seo-audit',
    name: 'SEO Audit',
    bestUse: 'Verify, prioritize, communicate, and validate technical SEO findings.',
    status: 'free',
    files: [
      { name: 'ssc-seo-audit-report-template-v1-0.docx', format: 'Word' },
      { name: 'ssc-seo-audit-issue-tracker-v1-0.xlsx', format: 'Excel' },
    ],
    relatedSkill: {
      category: 'content-strategy',
      slug: 'seo-technical-audit',
      label: 'Pairs with the SEO Technical Audit skill',
    },
  },
]
