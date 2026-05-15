---
type: adr
endeavor: I02-AIASSESS
status: accepted
date: 2026-05-15
decided-by: human+agent
supersedes: []
superseded_by: null
---

# ADR I02-004: Gate Scoring Model (Strict Dimension Gates, Not Averages)

**Date:** 2026-05-15
**Status:** Accepted
**Initiative:** I02-AIASSESS
**Decided-by:** human+agent

**Decision Makers:** Founder (Ariel Perez), charter §2.6

**Tags:** architecture, scoring, assessment, maturity-model, ai-fluency-index, gate-scoring

## Context

The Adaptive Alchemy AI Fluency Index uses a 5-level maturity model with 6 dimensions. After the user completes the survey, the scoring engine must assign an overall maturity level (1–5) and identify which dimension is the primary barrier to reaching the next level.

The fundamental design question is: how is an overall level determined from 6 dimension scores?

Two broad approaches exist in maturity model scoring:
- **Average-based:** sum (or weighted sum) all dimension scores; map the aggregate to a level band. A user who scores highly on 5 dimensions can be "pulled up" by those scores even if one dimension is weak.
- **Gate-based (threshold):** the overall level is the highest level where ALL dimension scores meet their respective threshold. A single below-threshold dimension holds the user at the lower level regardless of other dimensions.

The scoring model choice has significant downstream consequences: it determines the shape of the `AssessmentScore` type, the scoring engine implementation, the report's "binding constraint" feature, the threshold matrix (Phase 2 deliverable), and the pre-result explanation screen (UQ-4).

## Decision

The scoring model is **strict dimension gates**:

> Maturity level = the highest level where ALL 6 dimension scores meet their threshold for that level.

If any single dimension fails the gate for a given level, the user stays at the level below — regardless of how strong the other five dimensions are. The dimension that fails the highest gate the user otherwise meets is the **binding constraint** — the one dimension specifically responsible for the user's current level assignment.

This requires a 5×6 threshold matrix: one threshold value per dimension (6) per level (5). The matrix is a required Phase 2 deliverable (B02-2) and gates all of Phase 3.

The pre-result explanation screen (UQ-4, confirmed 2026-05-15) states in plain language: "Your level is the highest level where every dimension meets the threshold — not an average. One dimension can hold you back even if the rest are strong. Here's where you landed and exactly why." This screen is shown between survey completion and score reveal.

## Alternatives Considered

- **Weighted average scoring:** Sum all dimension scores with weights; map aggregate to a level band. Simpler to compute and explain. However: (1) a user can inflate their level by overperforming in easy dimensions to compensate for genuine weaknesses in harder ones; (2) the report loses specificity — "your average is 3.2" gives no actionable direction; (3) the binding constraint concept (which dimension to fix first) has no equivalent in an average model. Rejected: average models are gameable and produce vague reports.

- **Majority-gate (4-of-6 dimensions meet threshold):** Less strict than all-6. Allows one or two dimension failures to be overridden by the majority. Easier to score higher. However: (1) the "fixing your binding constraint" story collapses — if 4-of-6 is enough, the user has no specific dimension they must fix; (2) for dimensions like Governance & Systematization (Dimension 6), which are genuinely crosscutting and enterprise-critical, allowing it to be overridden by a 4-of-6 majority undermines the framework's differentiation claim. Rejected: the binding constraint identification — the primary diagnostic value of the report — requires all-6 gate logic.

- **Progressive averaging (level determined by average, dimension scores are informational only):** Produces a level and a dimension breakdown, but the two are computed independently. A user at Level 3 by average could have a very low Governance score that isn't "blocking" anything — it's just a low bar on a chart. The report loses the "this is why you're at Level 3" narrative. Rejected: decouples level assignment from dimension performance, weakening the diagnostic precision that differentiates this tool.

## Consequences

### Positive

- Scores are harder to inflate — a user must genuinely meet all 6 thresholds for a level, not just achieve a high average.
- The binding constraint is specific and actionable: "Dimension 6 is your binding constraint for Level 4" is more useful than "you're a 3.2 average."
- Report narrative is cohesive: the level, the dimension scorecard, the binding constraint highlight, the "Fix first" label, and the next-level roadmap all derive from the same gate logic.
- Supports the enterprise differentiator story — Governance & Systematization (Dimension 6) cannot be bypassed by strong performance elsewhere.

### Negative

- Requires a fully specified 5×6 threshold matrix before Phase 3 implementation can begin. This is a Phase 2 critical-path deliverable (B02-2 depends on B02-1). If the matrix is incomplete, Phase 3 is blocked.
- Gate scoring can feel punishing to users who score well on 5 dimensions. The pre-result explanation screen (UQ-4) is a required mitigation — it must ship with the tool, not be deferred.
- The threshold matrix requires careful calibration: thresholds set too high produce ceiling effects (few users reach Level 4/5); thresholds set too low produce floor effects (everyone is Level 3). Calibration is a Phase 2 design responsibility.

### Neutral

- The `AssessmentScore` type includes `bindingConstraint: DimensionKey | null` — null when the user is at Level 5 (frontier state; no next level to constrain). All report components must handle the null case gracefully: the radar chart shows no highlighted binding axis, the dimension scorecard omits the "Fix first" flag, and the JourneyStrip shows the "at the frontier" state. (C-21 correction)
- `scoring.ts` is a pure function: given answers and the threshold matrix, it deterministically produces an `AssessmentScore`. No server call, no state, no side effects. Fully testable in isolation.
- The pre-result explanation screen (UQ-4) is a required UI element — it is part of the gate scoring model's user experience contract, not a nice-to-have.

## Implementation Notes

- `scoring.ts` algorithm:
  1. For each dimension, sum the dimension's answer scores → `raw`
  2. Map `raw` to `band` (STRONG / FUNCTIONAL / DEVELOPING / NOT YET) using dimension-specific band thresholds from the matrix
  3. For each level L (5 down to 1), check: does every dimension's `raw` meet or exceed the threshold for level L?
  4. The highest L where all 6 pass is the `level`
  5. `bindingConstraint` = the dimension that fails the gate at `level + 1` (the one holding the user from the next level); if multiple dimensions fail, the one with the largest gap to the next-level threshold is the binding constraint
- The 5×6 threshold matrix must be a typed constant in `scoring.ts` or a separate config module — it must be the single source of truth, not distributed across components
- Pre-result explanation screen: rendered by `SurveyFlow.tsx` between survey form submission and `ScoreDisplay.tsx` render — BEFORE the email gate. Sequence: Survey submit → Pre-result screen → ScoreDisplay (ungated) → EmailGate → ReportRenderer. The explanation screen sets context before any score is visible; it does not depend on HubSpot state. (C-20 correction)

## Validation

- **How to validate:** (1) Unit tests for `scoring.ts` cover: user meeting all thresholds at level N lands at N; user missing one dimension lands at N-1; binding constraint is the dimension with the largest gap to N+1 threshold; threshold matrix edge cases (level 1 floor, level 5 ceiling). (2) Acceptance criteria S11, S12, S25a–S25d pass. (3) Phase 2 "locked" gate includes founder sign-off on the 5×6 matrix (UQ-12).
- **Validate by:** Phase 2 lock gate (B02-2 complete + founder sign-off) and B03-2 unit test suite green
- **Current status:** unvalidated

## Related Decisions

- [ADR I02-002] — Radar chart renders the dimension scores and binding constraint produced by this model
- [ADR I02-007] — Framework naming for the methodology that defines this scoring model

## References

- Charter §2.6 — Gate scoring model specification
- Charter §2.1 — 5×6 threshold matrix as primary Phase 2 design artifact
- Charter §3.1 — Report section structure (binding constraint flagged in dimension scorecard, Section 4)
- Charter UQ-4 — Pre-result explanation screen (confirmed 2026-05-15)
- Backlog §Interface Contracts — `AssessmentScore` and `DimensionScore` type definitions
- Backlog B02-2 — 5×6 threshold matrix Phase 2 deliverable
- Backlog B03-2 — `scoring.ts` Phase 3 implementation task
