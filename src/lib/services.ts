export type ServiceEntry = {
  readonly title: string
  readonly description: string
  readonly href: string
  readonly cta: string
}

export const services = [
  {
    title: 'AI Readiness Assessment',
    description:
      'Structured AI fluency evaluation across six dimensions. Fixed-scope, fixed-fee, delivered in 2–3 weeks. Know exactly where your team stands and what to fix first — no ongoing commitment required.',
    href: '/services/ai-readiness-assessment',
    cta: 'Learn more'
  },
  {
    title: 'Agent-First Transformation',
    description:
      'A practical, phased path from AI curiosity to agent-first operations — led by practitioners who build with agents, not just talk about them.',
    href: '/services/agent-first-transformation',
    cta: 'Learn more'
  },
  {
    title: 'Fractional CTO Leadership',
    description:
      'A senior product and technology executive who earns trust on day one. We lead both product strategy and engineering execution — one leader where most companies need two.',
    href: '/services/fractional-cto',
    cta: 'Learn more'
  },
  {
    title: 'CTO Coaching',
    description:
      'One-on-one coaching for first-time CTOs, engineering leaders, and technical founders who need an experienced product and technology executive in their corner.',
    href: '/services/cto-coaching',
    cta: 'Learn more'
  },
  {
    title: 'Product & Technology Strategy Review',
    description:
      'Independent evaluation of your product strategy, technical foundation, team capability, and execution readiness. Know exactly where you stand before investors or the market tells you.',
    href: '/services/technology-strategy-assessment',
    cta: 'Learn more'
  },
  {
    title: 'Investor Readiness Program',
    description:
      'Build the product and technical evidence that closes your round or acquisition. We prepare the narrative investors and acquirers need to see.',
    href: '/services/investor-readiness',
    cta: 'Learn more'
  }
] as const satisfies ReadonlyArray<ServiceEntry>
