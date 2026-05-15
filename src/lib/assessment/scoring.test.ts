/**
 * Compile-time + runtime-equivalent type tests for scoring.ts
 *
 * RED: imports from a module that doesn't exist yet → tsc fails.
 * GREEN: once scoring.ts is written, tsc passes.
 *
 * S12 fixture: 5 dimensions at 100%, governance-systematization at 50%
 * Expected: level=3, bindingConstraint='governance-systematization'
 */

import type {
  AssessmentScore,
  DimensionKey,
  DimensionScore,
  FramingVariant,
  SurveyAnswer,
  SurveyQuestion,
  ThresholdMatrix
} from './types'
import {
  computeDimensionScores,
  computeLevel,
  scoreAssessment
} from './scoring'

// ---------------------------------------------------------------------------
// S12 fixture — threshold matrix for tests
// ---------------------------------------------------------------------------

const S12_MATRIX: ThresholdMatrix = {
  1: {
    'context-prompting': 10,
    'delivery-integration': 10,
    'governance-systematization': 10,
    'judgment-verification': 10,
    'task-recognition': 10,
    'workflow-design': 10
  },
  2: {
    'context-prompting': 30,
    'delivery-integration': 25,
    'governance-systematization': 20,
    'judgment-verification': 30,
    'task-recognition': 30,
    'workflow-design': 20
  },
  3: {
    'context-prompting': 50,
    'delivery-integration': 45,
    'governance-systematization': 40,
    'judgment-verification': 50,
    'task-recognition': 55,
    'workflow-design': 50
  },
  4: {
    'context-prompting': 70,
    'delivery-integration': 70,
    'governance-systematization': 70,
    'judgment-verification': 75,
    'task-recognition': 75,
    'workflow-design': 75
  },
  5: {
    'context-prompting': 85,
    'delivery-integration': 85,
    'governance-systematization': 85,
    'judgment-verification': 90,
    'task-recognition': 90,
    'workflow-design': 85
  }
}

// S12: 5 dimensions at 100%, governance-systematization at 50% → level 3
const S12_SCORES: ReadonlyArray<DimensionScore> = [
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
    rawScore: 50,
    maxPossible: 100,
    band: 'FUNCTIONAL'
  }
]

// ---------------------------------------------------------------------------
// computeLevel type check — S12 fixture must return level=3, binding=governance
// ---------------------------------------------------------------------------

const _levelResult = computeLevel(S12_SCORES, S12_MATRIX)
const _level: 1 | 2 | 3 | 4 | 5 = _levelResult.level
const _binding: DimensionKey | null = _levelResult.bindingConstraint
void _level
void _binding

// ---------------------------------------------------------------------------
// computeDimensionScores type check
// ---------------------------------------------------------------------------

const _questions: ReadonlyArray<SurveyQuestion> = []
const _answers: ReadonlyArray<SurveyAnswer> = []
const _dimScores: ReadonlyArray<DimensionScore> = computeDimensionScores(
  _answers,
  _questions
)
void _dimScores

// ---------------------------------------------------------------------------
// scoreAssessment type check
// ---------------------------------------------------------------------------

const _framing: FramingVariant = 'individual'
const _headlines: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'Level 1 headline',
  2: 'Level 2 headline',
  3: 'Level 3 headline',
  4: 'Level 4 headline',
  5: 'Level 5 headline'
}
const _score: AssessmentScore = scoreAssessment(
  _answers,
  _questions,
  S12_MATRIX,
  _headlines,
  _framing
)
void _score
