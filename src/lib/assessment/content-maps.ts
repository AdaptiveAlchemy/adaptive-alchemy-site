import type { BenchmarkCard, MaturityLevel } from './types'

// AA-1: every benchmark citation must include source, date, and context — no anonymous stats.

export const BENCHMARK_CITATIONS: ReadonlyArray<BenchmarkCard> = [
  {
    stat: 'Developers using AI coding assistance completed tasks 55% faster than those working without it.',
    source:
      'GitHub & Microsoft Research, "The Impact of AI on Developer Productivity"',
    date: 'October 2022',
    context:
      'Measured across 95 professional developers in a controlled study. Speed gains were largest on well-specified, bounded tasks — the same condition that predicts AI value in knowledge work more broadly.'
  },
  {
    stat: '72% of organizations report having adopted AI in at least one business function, up from 55% the previous year.',
    source: 'McKinsey & Company, "The state of AI in early 2024"',
    date: 'May 2024',
    context:
      'Based on a global survey of 1,363 respondents. Adoption is widespread, but the survey also found that fewer than a third of respondents said AI had contributed significantly to revenue growth — highlighting the gap between adoption and effective practice.'
  },
  {
    stat: 'Only 28% of employees who use AI at work say they have received formal training on how to use it effectively.',
    source: 'Microsoft & LinkedIn, "2024 Work Trend Index Annual Report"',
    date: 'May 2024',
    context:
      'Based on a survey of 31,000 workers across 31 countries. The training gap is the primary explanation for inconsistent AI output quality — tools are available, but deliberate methods for using them are not.'
  },
  {
    stat: 'Among workers who use generative AI, 77% say the tools save them time, but only 40% say they consistently produce high-quality outputs.',
    source: 'Salesforce Research, "Generative AI Snapshot Research Series"',
    date: 'September 2023',
    context:
      'Based on a survey of 14,000 workers globally. The time-quality gap reflects the difference between using AI and using AI with disciplined prompting, verification, and workflow integration — the core of what the AI Fluency Index measures.'
  }
]

export const HEADLINE_FINDINGS: Record<MaturityLevel, string> = {
  1: 'You are at the start of your AI journey — the decisive first step is identifying which of your recurring tasks are genuinely suited to AI assistance.',
  2: 'Your AI use is real but inconsistent — you have found valuable applications but your practice is still triggered by inspiration, not method.',
  3: 'You have a working AI practice — the next move is integrating it structurally into your workflows rather than running it alongside them.',
  4: 'Your AI use is systematic and deliberate — the question now is whether your methods are specified precisely enough for others to run them the same way you do.',
  5: 'Your practice is at the frontier — your methods have the specification depth and governance structure where supervised agent delegation is a feasible next step.'
}

export const LEVEL_DESCRIPTORS: Record<MaturityLevel, string> = {
  1: 'Curious — aware that AI tools exist and have experimented briefly, but no recurring AI use pattern established yet.',
  2: 'Emerging — using AI for some tasks but inconsistently, triggered by memory or convenience rather than a defined process.',
  3: 'Practicing — using AI regularly for specific recurring tasks with saved prompts and deliberate habits, though AI sits alongside workflows rather than inside them.',
  4: 'Systematic — AI is integrated into deliberately designed workflows; methods are documented, outputs are measured, and verification steps are defined.',
  5: 'Agent-Ready — methods are sufficiently specified, structured, and governed that supervised AI agent delegation is safe and reproducible for defined workflows.'
}
