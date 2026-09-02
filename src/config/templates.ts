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
  {
    slug: 'grant-report',
    name: 'Grant Report',
    bestUse: 'Compare approved commitments with actual outputs, outcomes, evidence, financial performance, variance, learning, and next steps.',
    status: 'free',
    files: [{ name: 'ssc-grant-report-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'grant-writing',
      slug: 'post-award-reporting',
      label: 'Pairs with the Post-Award Reporting skill',
    },
  },
  {
    slug: 'rfp-response',
    name: 'RFP Response',
    bestUse: 'Capture requirements, organize a compliant evaluator-oriented response, and perform final submission QA.',
    status: 'free',
    files: [{ name: 'ssc-rfp-response-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'small-org-operations',
      slug: 'rfp-response',
      label: 'Pairs with the RFP Response skill',
    },
  },
  {
    slug: 'grant-letter-of-intent',
    name: 'Grant Letter of Intent',
    bestUse: 'Confirm funder fit and draft a concise inquiry with need, approach, results, credibility, request, and next step.',
    status: 'free',
    files: [{ name: 'ssc-grant-letter-of-intent-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'grant-writing',
      slug: 'grant-fit-scorer',
      label: 'Pairs with the Grant Fit Scorer skill',
    },
  },
  {
    slug: 'grant-tracking-spreadsheet',
    name: 'Grant Tracking Spreadsheet',
    bestUse: 'Manage prospects, applications, requirements, deadlines, awards, reporting obligations, contacts, and portfolio metrics.',
    status: 'free',
    files: [{ name: 'ssc-grant-tracking-spreadsheet-v1-0.xlsx', format: 'Excel' }],
    relatedSkill: {
      category: 'grant-writing',
      slug: 'grant-deadline-scout',
      label: 'Pairs with the Grant Deadline Scout skill',
    },
  },
  {
    slug: 'board-meeting-minutes',
    name: 'Board Meeting Minutes',
    bestUse: 'Record notice, attendance, quorum, decisions, motions, votes, recusals, executive session, actions, approval, and retention.',
    status: 'free',
    files: [{ name: 'ssc-nonprofit-board-meeting-minutes-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'small-org-operations',
      slug: 'meeting-minutes-compliance',
      label: 'Pairs with the Meeting Minutes Compliance skill',
    },
  },
  {
    slug: 'volunteer-agreement',
    name: 'Volunteer Agreement',
    bestUse: 'Define volunteer role expectations and identify situations requiring separate policies, forms, or qualified legal review.',
    status: 'free',
    files: [{ name: 'ssc-volunteer-agreement-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'small-org-operations',
      slug: 'volunteer-onboarding',
      label: 'Pairs with the Volunteer Onboarding skill',
    },
  },
  {
    slug: 'marketing-plan',
    name: 'Marketing Plan',
    bestUse: 'Turn audience evidence, positioning, objectives, channels, campaigns, content, budget, experiments, and a 90-day roadmap into a decision-ready plan.',
    status: 'free',
    files: [{ name: 'ssc-marketing-plan-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'content-strategy',
      slug: 'content-plan-reasoning-lift',
      label: 'Pairs with the Content Plan skill',
    },
  },
  {
    slug: 'social-media-report',
    name: 'Social Media Report',
    bestUse: 'Import post-level data; summarize platforms, formats, campaigns, and trends; document insights and actions; review a two-chart dashboard.',
    status: 'free',
    files: [{ name: 'ssc-social-media-report-template-v1-0.xlsx', format: 'Excel' }],
  },
  {
    slug: 'content-calendar',
    name: 'Content Calendar',
    bestUse: 'Plan channel-native content, campaigns, assets, approvals, publishing, repurposing, performance handoff, and monthly production.',
    status: 'free',
    files: [{ name: 'ssc-content-calendar-template-v1-0.xlsx', format: 'Excel' }],
    relatedSkill: {
      category: 'content-strategy',
      slug: 'content-plan-reasoning-lift',
      label: 'Pairs with the Content Plan skill',
    },
  },
  {
    slug: 'sponsorship-letter',
    name: 'Sponsorship Letter',
    bestUse: 'Confirm sponsor fit, map mutual value, draft a tailored request, define benefits and activation, and manage follow-up and stewardship.',
    status: 'free',
    files: [{ name: 'ssc-sponsorship-letter-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'grant-writing',
      slug: 'letter-of-support-kit',
      label: 'Pairs with the Letter of Support Kit skill',
    },
  },
  {
    slug: 'business-plan',
    name: 'Business Plan',
    bestUse: 'Connect customer evidence, offer, market, operating model, acquisition, capacity, economics, capital, milestones, and risk.',
    status: 'free',
    files: [{ name: 'ssc-business-plan-template-v1-0.docx', format: 'Word' }],
  },
  {
    slug: 'risk-assessment',
    name: 'Risk Assessment',
    bestUse: 'Document scope, scenarios, evidence, inherent and residual ratings, controls, treatments, appetite, escalation, and a residual-risk dashboard.',
    status: 'free',
    files: [{ name: 'ssc-risk-assessment-template-v1-0.xlsx', format: 'Excel' }],
  },
  {
    slug: 'statement-of-work',
    name: 'Statement of Work',
    bestUse: 'Define objective, scope, deliverables, acceptance, schedule, responsibilities, assumptions, changes, fees, data and security, and closeout.',
    status: 'free',
    files: [{ name: 'ssc-statement-of-work-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'small-org-operations',
      slug: 'rfp-response',
      label: 'Pairs with the RFP Response skill',
    },
  },
  {
    slug: 'expense-report',
    name: 'Expense Report',
    bestUse: 'Record expenses, exchange rates, mileage, allocations, receipts, policy decisions, settlement, and category totals.',
    status: 'free',
    files: [{ name: 'ssc-expense-report-template-v1-0.xlsx', format: 'Excel' }],
  },
  {
    slug: 'nonprofit-annual-report',
    name: 'Nonprofit Annual Report',
    bestUse: 'Build a verified mission, results, story, financial-stewardship, governance, acknowledgement, and future-priority narrative.',
    status: 'free',
    files: [{ name: 'ssc-nonprofit-annual-report-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'esg-sustainability',
      slug: 'impact-report-ghostwriter',
      label: 'Pairs with the Impact Report Ghostwriter skill',
    },
  },
  {
    slug: 'business-continuity-plan',
    name: 'Business Continuity Plan',
    bestUse: 'Prepare activation, essential-function, dependency, communications, technology and data, vendor, restoration, exercise, and maintenance controls.',
    status: 'free',
    files: [{ name: 'ssc-business-continuity-plan-template-v1-0.docx', format: 'Word' }],
  },
  {
    slug: 'sop-etsy',
    name: 'SOP Template (Etsy)',
    bestUse: 'Document repeatable shop operations, ownership, evidence, and review, with a product-business layout.',
    status: 'free',
    files: [{ name: 'ssc-sop-etsy-template-v1-0.docx', format: 'Word' }],
    relatedSkill: {
      category: 'small-org-operations',
      slug: 'rfp-response',
      label: 'Pairs with Small-Org Operations skills',
    },
  },
  {
    slug: 'donation-acknowledgment-letter',
    name: 'Donation Acknowledgment Letter',
    bestUse: 'Issue compliant, donor-ready acknowledgment letters that document gifts for tax purposes.',
    status: 'free',
    files: [{ name: 'ssc-donation-acknowledgment-letter-template-v1-0.docx', format: 'Word' }],
  },
  {
    slug: 'fiscal-sponsorship-agreement',
    name: 'Fiscal Sponsorship Agreement',
    bestUse: 'Draft a fiscal sponsorship agreement defining the sponsor relationship, responsibilities, and fees.',
    status: 'free',
    files: [{ name: 'ssc-fiscal-sponsorship-agreement-template-v1-0.docx', format: 'Word' }],
  },
  {
    slug: 'llc-operating-agreement',
    name: 'LLC Operating Agreement',
    bestUse: 'Draft an LLC operating agreement covering ownership, management, contributions, distributions, and dissolution.',
    status: 'free',
    files: [{ name: 'ssc-llc-operating-agreement-template-v1-0.docx', format: 'Word' }],
  },
  {
    slug: 'nonprofit-bylaws',
    name: 'Nonprofit Bylaws',
    bestUse: 'Draft nonprofit bylaws covering governance, board, officers, meetings, amendments, and dissolution.',
    status: 'free',
    files: [{ name: 'ssc-nonprofit-bylaws-template-v1-0.docx', format: 'Word' }],
  },
  {
    slug: 'nonprofit-conflict-of-interest-policy',
    name: 'Conflict of Interest Policy',
    bestUse: 'Draft a nonprofit conflict-of-interest policy with disclosure, recusal, and review procedures.',
    status: 'free',
    files: [{ name: 'ssc-nonprofit-conflict-of-interest-policy-template-v1-0.docx', format: 'Word' }],
  },
  {
    slug: 'nonprofit-memorandum-of-understanding',
    name: 'Memorandum of Understanding',
    bestUse: 'Draft an MOU defining a partnership\u2019s shared intent, roles, and expectations.',
    status: 'free',
    files: [{ name: 'ssc-nonprofit-memorandum-of-understanding-template-v1-0.docx', format: 'Word' }],
  },
  {
    slug: 'budget-vs-actual',
    name: 'Budget vs. Actual',
    bestUse: 'Track budget against actuals by month and category, with variance analysis.',
    status: 'free',
    files: [{ name: 'ssc-budget-vs-actual-template-v1-0.xlsx', format: 'Excel' }],
  },
  {
    slug: 'cash-flow-forecast',
    name: 'Cash Flow Forecast',
    bestUse: 'Project cash inflows and outflows to spot shortfalls before they happen.',
    status: 'free',
    files: [{ name: 'ssc-cash-flow-forecast-template-v1-0.xlsx', format: 'Excel' }],
  },
  {
    slug: 'kpi-dashboard',
    name: 'KPI Dashboard',
    bestUse: 'Track key performance indicators with targets and status in a single dashboard.',
    status: 'free',
    files: [{ name: 'ssc-kpi-dashboard-template-v1-0.xlsx', format: 'Excel' }],
  },
  {
    slug: 'profit-and-loss-statement',
    name: 'Profit & Loss Statement',
    bestUse: 'Build a monthly profit-and-loss statement with revenue, costs, and net income.',
    status: 'free',
    files: [{ name: 'ssc-profit-and-loss-statement-template-v1-0.xlsx', format: 'Excel' }],
  },
]
