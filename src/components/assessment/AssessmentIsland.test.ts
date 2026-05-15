/**
 * Compile-time type verification for AssessmentIsland.tsx
 *
 * RED: imports from a module that doesn't exist yet → tsc fails.
 * GREEN: once AssessmentIsland is written with AssessmentIslandProps, tsc passes.
 *
 * TDD goal: verify the island component accepts AssessmentIslandProps
 * (hubspotPortalId, hubspotFormGuid) — the hydration contract.
 */

import type { AssessmentIslandProps } from '../../lib/assessment/types'
import AssessmentIsland from './AssessmentIsland'

// Component must accept AssessmentIslandProps
const _component: (props: AssessmentIslandProps) => unknown = AssessmentIsland
void _component
