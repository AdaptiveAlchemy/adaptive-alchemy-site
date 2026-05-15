// ---------------------------------------------------------------------------
// Core enums / unions
// ---------------------------------------------------------------------------

export type DimensionKey =
  | 'context-prompting'
  | 'delivery-integration'
  | 'governance-systematization'
  | 'judgment-verification'
  | 'task-recognition'
  | 'workflow-design'

export type MaturityLevel = 1 | 2 | 3 | 4 | 5

export type BandLabel = 'DEVELOPING' | 'FUNCTIONAL' | 'NOT_YET' | 'STRONG'

export type TrackAssignment = 'A' | 'B' | 'C'

export type QuestionType = 'contextual' | 'likert' | 'scenario'

export type FramingVariant = 'individual' | 'team'

// ---------------------------------------------------------------------------
// Survey types
// ---------------------------------------------------------------------------

// C-22: SurveyOption.value is a discriminated union —
// number for Likert/scenario questions, string for contextual questions.

export type LikertOrScenarioOption = {
  readonly label: string
  readonly value: number
}

export type ContextualOption = {
  readonly label: string
  readonly value: string
}

export type SurveyOption = ContextualOption | LikertOrScenarioOption

export type SurveyQuestion = {
  readonly id: string
  readonly dimension: DimensionKey | null // null for routing/contextual questions
  readonly type: QuestionType
  readonly text: string
  readonly options: ReadonlyArray<SurveyOption>
}

export type SurveyAnswer = {
  readonly questionId: string
  readonly value: number | string
}

// ---------------------------------------------------------------------------
// Scoring types
// ---------------------------------------------------------------------------

// C-25: ThresholdMatrix must be typed and used by scoring.ts

export type DimensionThreshold = {
  readonly minScore: number
  readonly band: BandLabel
}

export type LevelThresholds = {
  readonly [K in DimensionKey]: number // minimum raw score to pass gate at this level
}

export type ThresholdMatrix = {
  readonly [L in MaturityLevel]: LevelThresholds
}

export type DimensionScore = {
  readonly dimension: DimensionKey
  readonly rawScore: number
  readonly band: BandLabel
  readonly maxPossible: number
}

// C-21: bindingConstraint is DimensionKey | null — null when user is at Level 5

export type AssessmentScore = {
  readonly level: MaturityLevel
  readonly dimensionScores: ReadonlyArray<DimensionScore>
  readonly bindingConstraint: DimensionKey | null
  readonly trackAssignment: TrackAssignment
  readonly headlineFinding: string
  readonly framingVariant: FramingVariant
}

// ---------------------------------------------------------------------------
// HubSpot types
// ---------------------------------------------------------------------------

export type HubSpotField = {
  readonly name: string
  readonly value: string
}

export type LegalConsentCommunication = {
  readonly value: boolean
  readonly subscriptionTypeId: number
  readonly text: string
}

export type LegalConsentOptions = {
  readonly consent: {
    readonly consentToProcess: boolean
    readonly text: string
    readonly communications: ReadonlyArray<LegalConsentCommunication>
  }
}

export type HubSpotSubmission = {
  readonly email: string
  readonly fields: ReadonlyArray<HubSpotField>
  readonly legalConsentOptions: LegalConsentOptions
  readonly context?: {
    readonly pageUri?: string
    readonly pageName?: string
  }
}

// ---------------------------------------------------------------------------
// Report types
// ---------------------------------------------------------------------------

export type BenchmarkCard = {
  readonly stat: string
  readonly source: string
  readonly date: string
  readonly context: string
}

export type TransitionMove = {
  readonly action: string
  readonly timeEstimate: string
  readonly isBindingConstraintMove: boolean
}

export type TransitionRoadmap = {
  readonly fromLevel: MaturityLevel
  readonly toLevel: MaturityLevel | null // null for Level 5 frontier
  readonly unlocks: string
  readonly moves: ReadonlyArray<TransitionMove>
}

export type TrackCTA = {
  readonly track: TrackAssignment
  readonly headline: string
  readonly body: string
  readonly ctaLabel: string
  readonly ctaHref: string
}

export type ReportData = {
  readonly score: AssessmentScore
  readonly transitionRoadmap: TransitionRoadmap | null // null at Level 5
  readonly benchmarkCards: ReadonlyArray<BenchmarkCard>
  readonly trackCta: TrackCTA
  readonly framingVariant: FramingVariant
}

// ---------------------------------------------------------------------------
// Island props
// ---------------------------------------------------------------------------

export type AssessmentIslandProps = {
  readonly hubspotPortalId: string
  readonly hubspotFormGuid: string
}
