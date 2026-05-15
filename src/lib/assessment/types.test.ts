/**
 * Compile-time type verification for types.ts
 *
 * These are pure TypeScript type tests — no runtime assertions.
 * RED: this file references types that don't exist yet → tsc will fail.
 * GREEN: once types.ts is written, tsc passes.
 */

import type {
  AssessmentScore,
  BandLabel,
  ContextualOption,
  DimensionKey,
  DimensionScore,
  FramingVariant,
  LikertOrScenarioOption,
  MaturityLevel,
  SurveyOption,
  ThresholdMatrix,
  TrackAssignment
} from './types'

// ---------------------------------------------------------------------------
// C-22: SurveyOption discriminated union
// A type guard that narrows on the value type.
// ---------------------------------------------------------------------------

const isLikertOrScenario = (
  option: SurveyOption
): option is LikertOrScenarioOption => typeof option.value === 'number'

const handleOption = (option: SurveyOption): string => {
  if (isLikertOrScenario(option)) {
    // value is number in this branch
    const _num: number = option.value
    return `score:${_num.toFixed(0)}`
  } else {
    // value is string in this branch — TypeScript must narrow to ContextualOption
    const _str: string = option.value
    return `context:${_str}`
  }
}

// Verify the two option shapes satisfy their types
const _likertOption = {
  label: 'Strongly Agree',
  value: 5
} satisfies LikertOrScenarioOption

const _contextualOption = {
  label: 'Marketing',
  value: 'marketing'
} satisfies ContextualOption

// Verify both are assignable to SurveyOption
const _options: ReadonlyArray<SurveyOption> = [_likertOption, _contextualOption]

// Force usage to satisfy no-unused-vars
const _handled = _options.map(handleOption)
void _handled

// ---------------------------------------------------------------------------
// C-21: bindingConstraint is DimensionKey | null
// A Level 5 score must accept null for bindingConstraint.
// ---------------------------------------------------------------------------

const _level5Score = {
  level: 5 as MaturityLevel,
  dimensionScores: [] as ReadonlyArray<DimensionScore>,
  bindingConstraint: null,
  trackAssignment: 'A' as TrackAssignment,
  headlineFinding: 'You are operating at the frontier.',
  framingVariant: 'individual' as FramingVariant
} satisfies AssessmentScore

// A non-Level-5 score must accept a DimensionKey for bindingConstraint.
const _level2Score = {
  level: 2 as MaturityLevel,
  dimensionScores: [] as ReadonlyArray<DimensionScore>,
  bindingConstraint: 'task-recognition' as DimensionKey,
  trackAssignment: 'B' as TrackAssignment,
  headlineFinding: 'Focus on task recognition first.',
  framingVariant: 'team' as FramingVariant
} satisfies AssessmentScore

// Verify the null and non-null paths are distinct
const _constraint: DimensionKey | null = _level5Score.bindingConstraint
const _constraint2: DimensionKey | null = _level2Score.bindingConstraint
void _constraint
void _constraint2

// ---------------------------------------------------------------------------
// C-25: ThresholdMatrix must be typed for all 5 levels × 6 dimensions
// ---------------------------------------------------------------------------

const _matrix = {
  1: {
    'task-recognition': 3,
    'context-prompting': 3,
    'workflow-design': 3,
    'judgment-verification': 3,
    'delivery-integration': 3,
    'governance-systematization': 3
  },
  2: {
    'task-recognition': 6,
    'context-prompting': 6,
    'workflow-design': 6,
    'judgment-verification': 6,
    'delivery-integration': 6,
    'governance-systematization': 6
  },
  3: {
    'task-recognition': 9,
    'context-prompting': 9,
    'workflow-design': 9,
    'judgment-verification': 9,
    'delivery-integration': 9,
    'governance-systematization': 9
  },
  4: {
    'task-recognition': 12,
    'context-prompting': 12,
    'workflow-design': 12,
    'judgment-verification': 12,
    'delivery-integration': 12,
    'governance-systematization': 12
  },
  5: {
    'task-recognition': 15,
    'context-prompting': 15,
    'workflow-design': 15,
    'judgment-verification': 15,
    'delivery-integration': 15,
    'governance-systematization': 15
  }
} satisfies ThresholdMatrix

// Verify each level key resolves to a number per dimension
const _level1GateForTaskRecognition: number = _matrix[1]['task-recognition']
const _level5GateForGov: number = _matrix[5]['governance-systematization']
void _level1GateForTaskRecognition
void _level5GateForGov

// Verify band labels compile
const _bands: ReadonlyArray<BandLabel> = [
  'STRONG',
  'FUNCTIONAL',
  'DEVELOPING',
  'NOT_YET'
]
void _bands
