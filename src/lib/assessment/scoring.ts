import type {
  AssessmentScore,
  BandLabel,
  DimensionKey,
  DimensionScore,
  FramingVariant,
  MaturityLevel,
  SurveyAnswer,
  SurveyQuestion,
  ThresholdMatrix
} from './types'

const DIMENSION_KEYS: ReadonlyArray<DimensionKey> = [
  'context-prompting',
  'delivery-integration',
  'governance-systematization',
  'judgment-verification',
  'task-recognition',
  'workflow-design'
]

const LEVELS: ReadonlyArray<MaturityLevel> = [5, 4, 3, 2, 1]

const normalize = (rawScore: number, maxPossible: number): number =>
  maxPossible === 0 ? 0 : Math.round((rawScore / maxPossible) * 100)

const toBand = (
  normalizedScore: number,
  matrix: ThresholdMatrix,
  dimension: DimensionKey
): BandLabel => {
  if (normalizedScore >= matrix[4][dimension]) return 'STRONG'
  if (normalizedScore >= matrix[3][dimension]) return 'FUNCTIONAL'
  if (normalizedScore >= matrix[2][dimension]) return 'DEVELOPING'
  return 'NOT_YET'
}

export function computeDimensionScores(
  answers: ReadonlyArray<SurveyAnswer>,
  questions: ReadonlyArray<SurveyQuestion>
): ReadonlyArray<DimensionScore> {
  const dimensionAnswers = new Map<
    DimensionKey,
    { total: number; count: number }
  >()

  for (const key of DIMENSION_KEYS) {
    dimensionAnswers.set(key, { total: 0, count: 0 })
  }

  for (const answer of answers) {
    if (typeof answer.value !== 'number') continue
    const question = questions.find((q) => q.id === answer.questionId)
    if (!question?.dimension) continue
    const dim = question.dimension
    const current = dimensionAnswers.get(dim) ?? { total: 0, count: 0 }
    dimensionAnswers.set(dim, {
      total: current.total + answer.value,
      count: current.count + 1
    })
  }

  return DIMENSION_KEYS.map((dimension) => {
    const { total, count } = dimensionAnswers.get(dimension) ?? {
      total: 0,
      count: 0
    }
    const maxPossible = count * 5
    return {
      dimension,
      rawScore: total,
      maxPossible,
      band: 'NOT_YET' as BandLabel
    }
  })
}

export function computeLevel(
  dimensionScores: ReadonlyArray<DimensionScore>,
  matrix: ThresholdMatrix
): { level: MaturityLevel; bindingConstraint: DimensionKey | null } {
  const normalized = Object.fromEntries(
    dimensionScores.map((ds) => [
      ds.dimension,
      normalize(ds.rawScore, ds.maxPossible)
    ])
  ) as Record<DimensionKey, number>

  const level =
    LEVELS.find((l) =>
      DIMENSION_KEYS.every((dim) => normalized[dim] >= matrix[l][dim])
    ) ?? 1

  if (level === 5) {
    return { level: 5, bindingConstraint: null }
  }

  const nextLevel = (level + 1) as MaturityLevel
  const bindingConstraint = DIMENSION_KEYS.reduce((worst, dim) => {
    const gap = matrix[nextLevel][dim] - normalized[dim]
    const worstGap = matrix[nextLevel][worst] - normalized[worst]
    return gap > worstGap ? dim : worst
  })

  return { level, bindingConstraint }
}

export function scoreAssessment(
  answers: ReadonlyArray<SurveyAnswer>,
  questions: ReadonlyArray<SurveyQuestion>,
  matrix: ThresholdMatrix,
  headlineFindings: Record<MaturityLevel, string>,
  framingVariant: FramingVariant
): AssessmentScore {
  const rawScores = computeDimensionScores(answers, questions)

  const dimensionScores: ReadonlyArray<DimensionScore> = rawScores.map(
    (ds) => ({
      ...ds,
      band: toBand(normalize(ds.rawScore, ds.maxPossible), matrix, ds.dimension)
    })
  )

  const { level, bindingConstraint } = computeLevel(dimensionScores, matrix)

  const d6Score = dimensionScores.find(
    (ds) => ds.dimension === 'governance-systematization'
  )
  const d6Normalized = d6Score
    ? normalize(d6Score.rawScore, d6Score.maxPossible)
    : 0

  const trackAssignment = (() => {
    if (level <= 2) return 'A' as const
    if (
      level >= 4 &&
      d6Normalized >= matrix[4]['governance-systematization'] + 5
    )
      return 'C' as const
    if (level === 5) return 'C' as const
    return 'B' as const
  })()

  return {
    level,
    dimensionScores,
    bindingConstraint,
    trackAssignment,
    headlineFinding: headlineFindings[level],
    framingVariant
  }
}
