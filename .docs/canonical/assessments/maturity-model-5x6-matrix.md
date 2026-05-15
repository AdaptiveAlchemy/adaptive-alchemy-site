---
type: threshold-matrix
initiative: I02-AIASSESS
version: v1
date: 2026-05-15
status: draft
founder-sign-off-required: true
uq: UQ-12
---

# AI Fluency Index — 5×6 Dimension Threshold Matrix

> **DRAFT — REQUIRES FOUNDER SIGN-OFF ON THRESHOLD VALUES (UQ-12)**
>
> All numeric thresholds in this document are starting-point calibrations proposed for review. No threshold value is final until the founder signs off. Cells are intentionally populated to give a concrete basis for review discussion — not to pre-empt that discussion. See [Section 5: Calibration Notes](#5-calibration-notes-for-founder-review) for rationale behind each row and flagged decision points.

---

## 1. Gate Scoring Rules

The AI Fluency Index uses **strict gate scoring**. The overall maturity level is **the highest level at which all six dimension scores meet or exceed that level's threshold simultaneously**.

Rules in full:

- Dimension scores are expressed as normalized percentages (0–100) regardless of the number of questions in each dimension. This makes thresholds dimension-agnostic.
- To be assigned Level N, a respondent must clear **every** dimension's Level N threshold. Clearing five out of six is not sufficient.
- If any dimension falls below a level's threshold, the respondent is **held at the level below**, regardless of how strong the other five dimensions are.
- The overall level is evaluated by testing thresholds from Level 5 downward. The first level at which all six gates are cleared is the assigned level.
- A respondent who clears no level's complete set of gates is assigned **Level 0** (below Level 1 — not yet curious) in the scoring engine. This edge case is expected to be rare.

---

## 2. The 5×6 Threshold Matrix

Each cell shows: **minimum normalized score to clear this gate** and the **band label** earned by a score at exactly the threshold.

Scores strictly above the threshold earn the same band label. The band label for scores below the threshold is the band label of the next lower level (or `NOT_YET` for scores below the Level 1 threshold).

**Band labels used:** `STRONG` | `FUNCTIONAL` | `DEVELOPING` | `NOT_YET`

| Level | task-recognition | context-prompting | workflow-design | judgment-verification | delivery-integration | governance-systematization |
|---|---|---|---|---|---|---|
| **1 — Curious** | ≥10, `DEVELOPING` | ≥10, `DEVELOPING` | ≥10, `DEVELOPING` | ≥10, `DEVELOPING` | ≥10, `DEVELOPING` | ≥10, `DEVELOPING` |
| **2 — Emerging** | ≥30, `DEVELOPING` | ≥30, `DEVELOPING` | ≥20, `DEVELOPING` | ≥30, `DEVELOPING` | ≥25, `DEVELOPING` | ≥20, `DEVELOPING` |
| **3 — Practicing** | ≥55, `FUNCTIONAL` | ≥50, `FUNCTIONAL` | ≥50, `FUNCTIONAL` | ≥50, `FUNCTIONAL` | ≥45, `FUNCTIONAL` | ≥40, `FUNCTIONAL` |
| **4 — Systematic** | ≥75, `STRONG` | ≥70, `STRONG` | ≥75, `STRONG` | ≥75, `STRONG` | ≥70, `STRONG` | ≥70, `STRONG` |
| **5 — Agent-Ready** | ≥90, `STRONG` | ≥85, `STRONG` | ≥85, `STRONG` | ≥90, `STRONG` | ≥85, `STRONG` | ≥85, `STRONG` |

### 2.1 Band label for scores below Level 1 threshold

Any dimension score below 10 earns `NOT_YET` on that dimension.

### 2.2 Band label derivation by score range (illustrative, using governance-systematization)

| Score range | Band |
|---|---|
| 0–9 | `NOT_YET` |
| 10–39 | `DEVELOPING` |
| 40–69 | `FUNCTIONAL` |
| 70–100 | `STRONG` |

Band label boundaries for other dimensions follow the same logic with dimension-specific threshold values. The band a score earns is determined by the highest level threshold it clears, not by absolute cutpoints.

---

## 3. Binding Constraint Logic

### 3.1 Definition

The **binding constraint** is the dimension that holds a respondent at their current overall level when multiple dimensions are evaluated and one or more fall below the next level's threshold.

Formally: among all dimensions whose score falls below the next level's threshold, the **binding constraint** is the dimension with the **largest gap** between its current score and the next level's threshold for that dimension.

> Gap = (next-level threshold for dimension D) − (respondent's score on dimension D)

The dimension with the largest gap is the hardest to close and is therefore the most accurate description of what is holding the respondent back.

**Tie-breaking rule:** If two dimensions have equal gaps, the binding constraint is the dimension with lower strategic leverage for reaching the next level. Priority order for tie-breaking (lowest to highest leverage): `governance-systematization` > `judgment-verification` > `workflow-design` > `delivery-integration` > `context-prompting` > `task-recognition`. In a tie, name the lower-leverage dimension as the binding constraint because it is the harder problem to address.

### 3.2 At Level 5 — Agent-Ready

```
bindingConstraint = null
```

At Level 5, there is no single internal bottleneck by definition. The constraint shifts to the organizational layer (infrastructure, agent design, monitoring). The report does not label any dimension "Fix first" for a Level 5 respondent.

### 3.3 Report rendering

| Report element | Behavior |
|---|---|
| Dimension scorecard row | Binding constraint row labeled **"Fix first"** |
| Radar chart | Binding constraint axis highlighted in accent color |
| Next-level roadmap | Binding constraint dimension receives primary attention |
| Level 5 reports | No "Fix first" label; all dimensions shown as `STRONG` |

---

## 4. Track Assignment Thresholds

### 4.1 Track Overview

Assessment output maps respondents to one of three engagement tracks. Track assignment is driven by overall level and by specific dimension scores that signal readiness for more advanced engagement.

| Track | Trigger | Primary signal |
|---|---|---|
| Track A — Foundation | Overall level 1 or 2 | Broad gaps across multiple dimensions |
| Track B — Acceleration | Overall level 3 or 4 | Systematic practice with optimization potential |
| Track C — Agent-Ready | Overall level 4 or 5 with high Dimension 6 | Near-expert systematization; agent delegation is the next conversation |

### 4.2 Track C Trigger — Dimension 6 Numeric Threshold (C-21)

Track C is triggered when a respondent meets **both** of the following conditions:

1. **Overall level is 4 or 5** (cleared all six gates at Level 4 minimum)
2. **governance-systematization score ≥ 70** (the Level 4 threshold for Dimension 6)

The Dimension 6 score of **≥70** is the documented numeric signal for Track C eligibility. This value is intentionally aligned with the Level 4 governance-systematization gate threshold, not set independently, because clearing the Level 4 governance gate is the operationally meaningful criterion: it confirms that the respondent's methods are documented, reusable, and auditable at a level where agent delegation conversations are substantive.

For Level 5 respondents: Dimension 6 score will be ≥85 by definition (they cleared all Level 5 gates). Track C applies automatically.

**Summary:** Track C numeric trigger on Dimension 6 = **≥70** (Level 4 gate value).

### 4.3 Track assignment decision table

| Overall level | Dimension 6 score | Track |
|---|---|---|
| 1 | any | Track A |
| 2 | any | Track A |
| 3 | any | Track B |
| 4 | < 70 | Track B (Dimension 6 is likely binding constraint) |
| 4 | ≥ 70 | **Track C** |
| 5 | ≥ 85 (by definition) | **Track C** |

---

## 5. Calibration Notes for Founder Review

These notes document the reasoning behind each threshold row and flag decisions that require founder judgment. They are retained in this draft to make the review conversation concrete.

### 5.1 Level 1 thresholds (all dimensions at ≥10)

**Rationale:** The Level 1 threshold is a minimal signal of engagement — "this person has used AI in some form and can answer these questions in good faith." A score of 10 on a 0–100 normalized scale corresponds roughly to answering one or two Likert questions at a 2 (out of 5) and the rest at 1. The intent is that anyone who has genuinely used an AI tool at least a few times will clear all six Level 1 gates without effort. The threshold is intentionally low to prevent the assessment from labeling genuine beginners as scoring zero.

**Founder review question:** Is ≥10 the right floor? Could it be raised to ≥15 without wrongly excluding people who have genuinely tried AI tools?

### 5.2 Level 2 thresholds (Emerging)

**Rationale:** Level 2 represents opportunistic but inconsistent AI use. Dimension 6 (governance) and Dimension 3 (workflow design) thresholds are set lower (≥20) than the others (≥25–30) because an Emerging practitioner is not expected to have systematic methods or documented governance — those come later. Task Recognition (≥30) and Context/Prompting (≥30) are slightly higher because the behavioral definition of Level 2 centers on having identified useful AI applications and started building prompting habits.

**Founder review question:** Is the asymmetry between Dimension 6 (≥20) and Task Recognition (≥30) at Level 2 intentional and correctly calibrated? Does it reflect the behavioral definition — "opportunistic use but no systematic governance" — accurately enough?

### 5.3 Level 3 thresholds (Practicing)

**Rationale:** The jump from Level 2 to Level 3 is the largest proportional increase in thresholds. This is intentional: Level 3 represents the first level of genuine habitual practice. A score of ≥50 on normalized scale corresponds to consistent, intentional responses across most questions — not perfect, but deliberate. Dimension 6 is set lower (≥40) than the others (≥45–55) because a Practicing individual is not yet expected to have formal governance, only basic awareness. Dimension 1 (Task Recognition) is set highest (≥55) because by Level 3 a practitioner should have a clear and defensible map of which tasks they use AI for.

**Founder review question:** Is ≥55 for Task Recognition at Level 3 too high? A Level 3 practitioner is described as having a "rough sense" of which tasks AI handles well — does ≥55 reflect that, or would ≥50 be more appropriate?

### 5.4 Level 4 thresholds (Systematic)

**Rationale:** Level 4 is the first level where `STRONG` band labels apply across all dimensions. The uniform `STRONG` designation signals that a Systematic practitioner is genuinely operating at a high level — not just passing — across the board. Dimension 6 threshold is ≥70, equal to the other "looser" dimensions (Context/Prompting, Delivery). It is not lower, because the behavioral definition of Level 4 explicitly names governance and systematization as the primary bottleneck at this level. A Level 4 practitioner who scores below ≥70 on Dimension 6 is being correctly identified as failing the Level 4 gate on the dimension that most defines what Level 4 is about.

**Founder review question:** Should the Level 4 Dimension 6 threshold be higher than ≥70 — say ≥75 — to align it with the "governance as the defining bottleneck" narrative? Raising it to ≥75 would make Dimension 6 the hardest Level 4 gate, which matches the spec's framing.

### 5.5 Level 5 thresholds (Agent-Ready)

**Rationale:** Level 5 thresholds are deliberately high. Near-expert performance across all six dimensions is required; this is the frontier state. Task Recognition (≥90) and Judgment/Verification (≥90) are set highest because the auditability criteria for agent-delegatable workflows depend critically on both: you must be able to specify inputs precisely (Task Recognition) and define verification criteria concretely (Judgment/Verification). The ≥85 floor for the remaining four dimensions is high but not maximum, acknowledging that some variance is natural even at the frontier.

**Founder review question:** Is ≥90 for Task Recognition and Judgment/Verification at Level 5 the right ceiling? Should all six Level 5 thresholds be unified at ≥85, or is the two-tier structure (≥90 for two dimensions, ≥85 for four) correct given the agent-readiness auditability criteria?

### 5.6 Governance-systematization as crosscutting concern

The spec (Section 3, Dimension 6) states explicitly: "A team that is excellent at task recognition, prompting, workflow design, judgment, and delivery — but has no governance position — is a systematization risk, not a mature AI practice." The threshold design enforces this by ensuring Dimension 6 gates are not materially easier than other dimensions at Levels 3–5. The Level 3 Dimension 6 threshold (≥40) is intentionally the lowest of all dimensions at Level 3, reflecting that basic governance awareness — not formal governance — is the Level 3 expectation. From Level 4 onward, Dimension 6 gates are on par with or above the pack.

### 5.7 Track C numeric anchor (C-21)

The Track C trigger of Dimension 6 ≥70 is derived from the Level 4 gate value, not independently calibrated. This was a deliberate design choice to avoid creating a second, separate calibration decision. If the Level 4 Dimension 6 threshold changes (per the Founder review question in 5.4), the Track C trigger changes correspondingly. This coupling is intentional — Track C eligibility is defined as "cleared the Level 4 governance gate," not as an independent score target.

---

## 6. Cross-Reference

| Reference | Location |
|---|---|
| Framework spec (levels, dimensions, gate scoring, band labels) | `.docs/canonical/assessments/ai-fluency-index-v1-spec.md` |
| BDD scenario S11 (5×6 matrix) | `.docs/canonical/charters/charter-I02-AIASSESS-scenarios.md` |
| BDD scenario S12 (binding constraint logic) | `.docs/canonical/charters/charter-I02-AIASSESS-scenarios.md` |
| Binding constraint = null at Level 5 (C-21) | This document, Section 3.2 |
| Track C Dimension 6 threshold (C-21) | This document, Section 4.2 |

---

## Appendix: Band Label Quick Reference

| Band | Meaning | Typical dimension score range |
|---|---|---|
| `NOT_YET` | Below the Level 1 threshold for this dimension | 0–9 |
| `DEVELOPING` | Meets Level 1 or Level 2 gate on this dimension | 10–49 (dimension-dependent) |
| `FUNCTIONAL` | Meets Level 3 gate on this dimension | 40–74 (dimension-dependent) |
| `STRONG` | Meets Level 4 or Level 5 gate on this dimension | 70–100 (dimension-dependent) |

Note: Band boundaries are gate-derived, not fixed absolute cutpoints. A dimension score of 45 earns `FUNCTIONAL` on governance-systematization (≥40 gate) but only `DEVELOPING` on task-recognition (next gate at ≥55). The band label is always relative to that dimension's thresholds at each level.
