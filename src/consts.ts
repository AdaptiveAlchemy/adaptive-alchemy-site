export const SITE_TITLE = 'Adaptive Alchemy'
export const SITE_DESCRIPTION =
  'Product and technology strategy leadership for growth-stage companies and their investors. Fractional CTO services, technical due diligence, and agent-first transformation.'
export const SITE_URL = 'https://www.adaptivealchemy.io'

// Placeholder: framework naming TBD (see .docs/brainstorming-results.md)
export const FRAMEWORK_NAME = 'The Crucible Model'
export const FRAMEWORK_LEVELS = [
  { level: 0, name: 'Dormant', description: 'No agent strategy or awareness' },
  {
    level: 1,
    name: 'Awakened',
    description: 'Initial awareness, scattered experiments'
  },
  {
    level: 2,
    name: 'Active',
    description: 'Structured adoption, measurable gains'
  },
  {
    level: 3,
    name: 'Refined',
    description: 'Integrated workflows, cross-team transformation'
  },
  {
    level: 4,
    name: 'Elevated',
    description: 'Autonomous operations, strategic advantage'
  },
  {
    level: 5,
    name: 'Compounding',
    description: 'Self-evolving, industry-leading capability'
  }
] as const

export const FRAMEWORK_DIMENSIONS = [
  'Engineering',
  'Product',
  'Operations',
  'Strategy',
  'Governance'
] as const
