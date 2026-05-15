/**
 * Compile-time type verification for routing.ts
 *
 * RED: imports from a module that doesn't exist yet → tsc fails.
 * GREEN: once routing.ts is written, tsc passes.
 *
 * S25 cases:
 *   S25a: Level 1-2 → Track A
 *   S25b: Level 3-4 (low D6) → Track B
 *   S25c: Level 4-5 + D6 ≥ TRACK_C_D6_MIN_SCORE → Track C
 *   S25d: Level 4 + D6 < TRACK_C_D6_MIN_SCORE → Track B
 */

import type { AssessmentScore, DimensionScore, TrackAssignment } from './types'
import { TRACK_C_D6_MIN_SCORE, assignTrack } from './routing'

// ---------------------------------------------------------------------------
// Helper: build a minimal AssessmentScore for routing tests
// ---------------------------------------------------------------------------

const makeScore = (
  level: 1 | 2 | 3 | 4 | 5,
  d6Raw: number
): AssessmentScore => ({
  level,
  bindingConstraint: level < 5 ? 'governance-systematization' : null,
  trackAssignment: 'B',
  headlineFinding: `Level ${level}`,
  framingVariant: 'individual',
  dimensionScores: [
    {
      dimension: 'task-recognition',
      rawScore: 100,
      maxPossible: 100,
      band: 'STRONG'
    },
    {
      dimension: 'context-prompting',
      rawScore: 100,
      maxPossible: 100,
      band: 'STRONG'
    },
    {
      dimension: 'workflow-design',
      rawScore: 100,
      maxPossible: 100,
      band: 'STRONG'
    },
    {
      dimension: 'judgment-verification',
      rawScore: 100,
      maxPossible: 100,
      band: 'STRONG'
    },
    {
      dimension: 'delivery-integration',
      rawScore: 100,
      maxPossible: 100,
      band: 'STRONG'
    },
    {
      dimension: 'governance-systematization',
      rawScore: d6Raw,
      maxPossible: 100,
      band: d6Raw >= 70 ? 'STRONG' : 'FUNCTIONAL'
    }
  ] satisfies ReadonlyArray<DimensionScore>
})

// ---------------------------------------------------------------------------
// Shape checks — assignTrack must accept AssessmentScore and return TrackAssignment
// ---------------------------------------------------------------------------

const _fn: (score: AssessmentScore) => TrackAssignment = assignTrack
void _fn

// ---------------------------------------------------------------------------
// TRACK_C_D6_MIN_SCORE must be a number constant
// ---------------------------------------------------------------------------

const _threshold: number = TRACK_C_D6_MIN_SCORE
void _threshold

// ---------------------------------------------------------------------------
// S25a: Level 1-2 → Track A
// ---------------------------------------------------------------------------

const _s25aL1: TrackAssignment = assignTrack(makeScore(1, 10))
const _s25aL2: TrackAssignment = assignTrack(makeScore(2, 30))
void _s25aL1
void _s25aL2

// ---------------------------------------------------------------------------
// S25b: Level 3 → Track B (regardless of D6)
// ---------------------------------------------------------------------------

const _s25b: TrackAssignment = assignTrack(makeScore(3, 50))
void _s25b

// ---------------------------------------------------------------------------
// S25c: Level 4-5 + D6 ≥ TRACK_C_D6_MIN_SCORE → Track C
// ---------------------------------------------------------------------------

const _s25cL4: TrackAssignment = assignTrack(makeScore(4, 85))
const _s25cL5: TrackAssignment = assignTrack(makeScore(5, 90))
void _s25cL4
void _s25cL5

// ---------------------------------------------------------------------------
// S25d: Level 4 + D6 < TRACK_C_D6_MIN_SCORE → Track B
// ---------------------------------------------------------------------------

const _s25d: TrackAssignment = assignTrack(makeScore(4, 72))
void _s25d
