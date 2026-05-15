import type { AssessmentIslandProps } from '../../lib/assessment/types'

// Walking skeleton — establishes client:visible island hydration contract.
// Full state machine wired in P3-E-1 (AssessmentIsland.tsx phase 2).
export default function AssessmentIsland(_: AssessmentIslandProps) {
  return (
    <div
      className="flex min-h-[200px] items-center justify-center rounded-lg border border-white/5 bg-ink p-8"
      role="status"
      aria-label="Assessment loading"
    >
      <p className="text-text-muted">Assessment loading…</p>
    </div>
  )
}
