/**
 * Skills library data — the hub on /skills.
 *
 * The six skills are staged here; fill each entry in as it is published.
 * A card renders on /skills for every entry in this array.
 *
 *   status: 'live'          → full card with overview, methodology, use cases, SKILL.md link
 *   status: 'coming-soon'   → placeholder card (number + coming soon note)
 *
 * `skillMdUrl` should be a public URL to the skill's SKILL.md file
 * (e.g. the raw GitHub URL or a hosted copy).
 */

export interface Skill {
  id: string
  /** Display order, e.g. '01' */
  number: string
  name: string
  status: 'live' | 'coming-soon'
  /** One-paragraph summary of what the skill is and when to reach for it. */
  overview: string
  /** Ordered steps the skill formalizes. */
  methodology: string[]
  /** Concrete situations the skill is built for. */
  useCases: string[]
  /** Public URL to the skill's SKILL.md file. */
  skillMdUrl: string
}

export const skills: Skill[] = [
  {
    id: 'skill-01',
    number: '01',
    name: 'Skill 01',
    status: 'coming-soon',
    overview: '',
    methodology: [],
    useCases: [],
    skillMdUrl: '',
  },
  {
    id: 'skill-02',
    number: '02',
    name: 'Skill 02',
    status: 'coming-soon',
    overview: '',
    methodology: [],
    useCases: [],
    skillMdUrl: '',
  },
  {
    id: 'skill-03',
    number: '03',
    name: 'Skill 03',
    status: 'coming-soon',
    overview: '',
    methodology: [],
    useCases: [],
    skillMdUrl: '',
  },
  {
    id: 'skill-04',
    number: '04',
    name: 'Skill 04',
    status: 'coming-soon',
    overview: '',
    methodology: [],
    useCases: [],
    skillMdUrl: '',
  },
  {
    id: 'skill-05',
    number: '05',
    name: 'Skill 05',
    status: 'coming-soon',
    overview: '',
    methodology: [],
    useCases: [],
    skillMdUrl: '',
  },
  {
    id: 'skill-06',
    number: '06',
    name: 'Skill 06',
    status: 'coming-soon',
    overview: '',
    methodology: [],
    useCases: [],
    skillMdUrl: '',
  },
]
