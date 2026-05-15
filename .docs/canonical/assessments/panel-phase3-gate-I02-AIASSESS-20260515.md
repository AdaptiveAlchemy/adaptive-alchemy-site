---
type: panel-assessment
initiative: I02-AIASSESS
phase: 3
verdict: ADVANCE WITH NOTES
date: 2026-05-15
panelists: [implementation-planner, tdd-architect, product-risk]
constraints_added:
  - C-25
  - C-26
  - C-27
---

# Phase 3 Gate Panel — I02-AIASSESS

**Panel question:** Is the implementation plan sound enough to begin Phase 1 execution and schedule Phase 3 development?

**Date:** 2026-05-15
**Format:** Independent review + written synthesis
**Facilitated by:** panel-facilitator (claude-sonnet-4-6)

**Panel members:**
1. Senior Implementation Planner — wave structure, dependency modeling, effort calibration
2. TDD/Architecture Reviewer — TDD discipline, TypeScript constraints, interface contract carry-through
3. Product/Risk Advisor — Phase 2 content gates, HubSpot pre-flight realism, GDPR coverage

---

## Panelist 1: Implementation Planner

**Verdict: ADVANCE WITH NOTES**

**Findings:**

**Strengths:**

The wave structure is coherent. The three-phase sequencing (P1 docs → P2 framework → P3 code) is the correct order — it respects the content dependency that the scoring engine needs a locked matrix (P2-A-2) to be meaningful, and the email gate needs finalized HubSpot properties (P2-B-2) to be correct. The critical path identification (`B00-2 → P3-A-2 → P3-B-3 → P3-D-6 → P3-F-3`) is plausible and explicit, which is rare and valuable in implementation plans.

The dependency graph is correct and well-drawn. The parallel opportunities within each wave (P2-B tasks running simultaneously after P2-A-1; P3-D-1/D-2/D-3 in parallel) are correctly identified and would realistically compress the calendar.

The effort estimates are calibrated for AI-assisted pace and the confidence interval (P50: 45h, P85: 55h, P95: 65h) honestly reflects the uncertainty in P2 content quality risk. The note about founder sign-off cycles being the primary variance driver is accurate.

The Beads seeding section is production-grade: dependency commands are unambiguous (two-step `bd create` + `bd dep add` pattern rather than the confusing `--deps blocks:` form), and the epic wiring loop covers all 32 tasks.

**Gaps and notes:**

**N1 — P3-A-3 dependency incomplete.** The wave table lists P3-A-3 as "After P3-A-1" but the task description says "Depends on P3-A-1 (types) and P1-B-2 (shell exists)." The Beads seeding commands only wire `bd dep add $P3A3 $P3A1` — the dependency on P1-B-2 (`adaptive-alchemy-site-k1u`) is missing. If k1u is not complete when P3-A-3 starts, the upgrade step (replacing the placeholder comment) has no target file. This is a real dependency gap.

**N2 — P3-B-3 wave dependency is more restrictive than stated.** The wave table says "After P3-A" for SurveyFlow.tsx. But the task description says SurveyFlow renders questions "from P2-B-4" — the intake questionnaire. SurveyFlow cannot be fully implemented without the locked questionnaire content. The plan notes this indirectly via the "Phase 2 locked (S16 passes)" pre-flight dependency, but the wave table doesn't reflect it as a P3-B-3 blocker. This should be explicit.

**N3 — Beads seeding: P3-D-4 dependencies are attached to P3-D-3, not to the correct parent.** In the dependency wiring section, `bd dep add $P3D4 $P3B3` wires P3-D-4 (Recharts install) to SurveyFlow. The comment says P3-D-4 is a "Day 1 Phase 3 action," but structurally it should be gated after P3-A-3 (the walking skeleton shell) is complete — not after P3-B-3 (SurveyFlow, which is much later). The intent is to do the bundle analysis before committing to Recharts before the chart work begins, not blocked behind the full survey form. The dependency as written delays the decision unnecessarily.

**N4 — GateScoringExplanationScreen (C-20 "gate explanation" state) has no task.** The `AssessmentIsland.tsx` state machine (P3-E-1) references a `gate-explanation` state that renders `GateScoringExplanationScreen`. This component is listed in the state machine description but has no corresponding task in the plan (no P3-Dx task for it). It will need to be built. Its absence means P3-E-1 is underestimated.

---

## Panelist 2: TDD/Architecture Reviewer

**Verdict: ADVANCE WITH NOTES**

**Findings:**

**Strengths:**

The TDD cycle notes section is explicit and correctly models the double-loop pattern (BDD outer / unit inner). The per-task TDD cycle descriptions are specific: they call out the exact fixture (e.g., "all dims 4/4 except Governance 2/4; expect level=3, bindingConstraint='governance-systematization'"), which removes ambiguity at implementation time. This is the right level of specification for an implementation plan.

The TypeScript constraints are faithfully carried from Phase 2:

- C-21 (`bindingConstraint: DimensionKey | null`) is present in P3-A-1, P3-B-1, P3-D-3, and P3-D-5 task descriptions.
- C-22 (discriminated union `SurveyOption.value`) is in P3-A-1 and the TDD test requirement explicitly references it.
- `ReadonlyArray` is used in P3-B-1, P3-A-2, and P3-D-3 — correct application of the immutability constraint.
- `React.lazy` + `Suspense` for RadarChart (never in main bundle) is explicit in P3-D-5.

The C-24 (HubSpot stub carries a failing test) discipline is correctly modeled: stub is seeded as FAILING in P3-C-1 and becomes green in P3-F-2. The two-task pattern enforces the constraint cannot be silently bypassed.

**Gaps and notes:**

**N5 — `ThresholdMatrix` type still unresolved.** The Phase 2 gate panel identified a gap: the threshold matrix used by `scoring.ts` needs a typed constant (`ThresholdMatrix`) in `types.ts`. The plan's P3-A-1 task lists the interfaces to create but does not include `ThresholdMatrix`. The scoring engine (P3-B-1) imports "threshold matrix (imported from a static data module derived from P2-A-2)" — but without a `ThresholdMatrix` type, this import will either be `Record<string, Record<string, number>>` or untyped. This was flagged as a gap in the Phase 2 panel; it should have been carried into P3-A-1.

**N6 — `AssessmentScore.headlineFinding` field is referenced but not in the type inventory.** `ScoreDisplay.tsx` (P3-D-1) reads `AssessmentScore.headlineFinding`. This field does not appear in the `AssessmentScore` interface inventory in P3-A-1. Either it is missing from the type listing or it is expected to be derived — but neither is stated. If it is a derived value, the derivation function needs a task.

**N7 — `ReportData` construction step is not tasked.** `AssessmentIsland.tsx` (P3-E-1) "builds `ReportData` from score + static content maps." The static content maps (transition roadmaps, benchmark citations, CTA copy per track and framing variant) are not explicitly tasked or typed. P3-E-1 is listed as Complexity M, which seems underestimated if it must also build the full `ReportData` object from multiple content sources. At minimum, a `content-maps.ts` or equivalent static module task is missing.

**N8 — `scoring.ts` and `routing.ts` relationship creates potential duplication.** P3-B-1 (`scoring.ts`) computes `trackAssignment` as part of `AssessmentScore`. P3-B-2 (`routing.ts`) exports `assignTrack(score: AssessmentScore): TrackAssignment`. The justification given is "isolates routing rule changes from scoring changes." However, if `scoring.ts` already returns `trackAssignment` in `AssessmentScore`, then `routing.ts` is either a wrapper (thin, fine) or duplicates the logic (violation of immutability-by-coincidence). The plan should clarify: does `scoring.ts` compute track internally (private), with `routing.ts` as the public export? Or does `scoring.ts` call `routing.ts`? The current description is ambiguous.

**N9 — `email-blocklist.ts` is listed as parallel to P3-A-1 in the wave table but has no dependency wired in Beads.** The `isBlockedDomain` function in `email-blocklist.ts` only needs the `string` primitive — it has no type dependency on `types.ts`. But conceptually it is Phase 3 foundation work. The absence of a Beads dependency is correct; this note is confirming the parallelism is intentional.

---

## Panelist 3: Product/Risk Advisor

**Verdict: ADVANCE WITH NOTES**

**Findings:**

**Strengths:**

The pre-flight dependency table is honest and complete. Listing the three founder-owned blockers (HubSpot portal ID, HubSpot form GUID, GDPR tools toggle verification from EU IP) as explicit Phase 3 gates — not sprint items — is the right risk management posture. These have been seen as "we'll figure it out during build" in comparable projects; making them pre-conditions is correct.

The GDPR constraint chain is well-represented:
- C-15 (HubSpot failure = no report unlock) is in `EmailGate.tsx` (P3-C-2) error handling
- C-17 (data governance spec) is in P2-B-2
- C-19 (anonymized aggregate only in benchmark) is in P2-B-2 and in `ReportRenderer.tsx` (P3-D-6) benchmark section
- C-24 (stub never in prod) is in P3-C-1 + P3-F-2 as a test constraint

The Phase 2 lock gate (S16) before Phase 3 code is a strong risk control. The five S16 conditions cover the key content dependencies: all roadmaps written, GDPR spec complete, AEO prerequisites done, questionnaire locked, sample report brief written.

The three unresolved questions at the end of the plan are correctly identified as blockers for specific tasks and should be treated as pre-flight items for those tasks, not as plan defects.

**Gaps and notes:**

**N10 — The HubSpot subscription type ID (UQ listed) is not mapped to a Beads blocker.** The plan's Unresolved Questions section identifies that `legalConsentOptions.communications[].subscriptionTypeId` must be confirmed from the AA HubSpot portal before P3-C-1 can finalize. But this is not a pre-flight row in the Pre-Flight Dependencies table, and the P3-C-1 Beads task description does not include it as an explicit acceptance condition. If the HubSpot account is new, obtaining the subscription type ID requires portal setup work that may take days. This needs to be a tracked pre-flight item.

**N11 — Track A interim CTA destination is a Phase 1 blocker, not just a Phase 3 note.** The plan notes that the booking link URL for the scoping call is needed for P1-C-1, P1-C-2, P1-C-3. But this is listed only in Unresolved Questions at the end of the plan — it is not a pre-flight row. Since Phase 1 copy tasks are the earliest work (P1-C-1 through P1-C-3 can start immediately after P1-A), this blocker could stall Phase 1 copy if not resolved before execution starts. It belongs in the Pre-Flight Dependencies table with "Founder" as the owner.

**N12 — GDPR lawful basis documentation gap for benchmark data.** The plan specifies that lawful basis is consent (Art. 6(1)(a)) for contact data, but does not address what lawful basis covers anonymized benchmark aggregates. If aggregate statistics are computed from multiple respondents' data and surfaced in the report, the processing of individual data into aggregates requires a lawful basis even if the aggregate output is anonymized. The GDPR spec (P2-B-2) should explicitly state that aggregate computation occurs after consent is given and that no individual-level data is retained post-aggregation. The current P2-B-2 task description covers erasure and retention but does not address the aggregation computation step.

**N13 — n<5 benchmark card behavior is specified for `ReportRenderer.tsx` (S29: "null → third-party citations") but no task addresses sourcing the third-party citations.** The static content maps needed to populate the benchmark fallback (third-party citation copy and links) have no assigned task. This is a content gap that will be discovered at P3-D-6 implementation time.

---

## Synthesis

The plan is well-structured and represents a significant advance in fidelity over a typical implementation plan at this stage. The wave structure is sound, the critical path is identified, the TDD cycle notes are actionable, and the GDPR constraint chain is end-to-end traceable. The Beads seeding section is production-ready.

**Blocking issues:** None. No finding rises to the level of requiring the plan to be revised before execution begins.

**Significant notes requiring action before or during specific tasks:**

1. **N1 (Implementation):** Add `bd dep add $P3A3 adaptive-alchemy-site-k1u` to the Beads seeding commands. P3-A-3 has a real dependency on the k1u shell.

2. **N4 (Implementation) + N7 (TDD):** `GateScoringExplanationScreen` component (referenced in C-20 state machine) and `content-maps.ts` static module are missing tasks. These should be added to the plan before P3-E-1 work starts. P3-E-1 complexity should be reassessed as L (not M).

3. **N5 (TDD):** Add `ThresholdMatrix` type to P3-A-1 task description. This was a Phase 2 gate panel finding that was not carried forward.

4. **N6 (TDD):** Clarify `AssessmentScore.headlineFinding`: either add it to the P3-A-1 type inventory or task a `deriveHeadlineFinding(score: AssessmentScore): string` function.

5. **N10 (Product/Risk):** Add HubSpot subscription type ID confirmation to the Pre-Flight Dependencies table.

6. **N11 (Product/Risk):** Move Track A interim booking link URL from Unresolved Questions to the Pre-Flight Dependencies table (owner: Founder; blocks P1-C-1/C-2/C-3).

7. **N13 (Product/Risk):** Source and task the third-party benchmark citation copy for the n<5 fallback path in `ReportRenderer.tsx`.

**Lower-priority notes (can be addressed at task time):**

- N2: Add explicit note to P3-B-3 that its content implementation is gated behind P2 lock.
- N3: Consider rewiring P3-D-4 dependency from P3-B-3 → P3-A-3 to unblock the bundle analysis decision earlier.
- N8: Clarify the `scoring.ts` / `routing.ts` division of responsibility in the task descriptions.
- N12: Expand P2-B-2 task to address aggregation computation lawful basis.

---

## New Constraints

**C-25:** `ThresholdMatrix` type (`ReadonlyArray<[MaturityLevel, Record<DimensionKey, number>]>` or equivalent mapped type) must be defined in `types.ts` and used as the type annotation for the threshold data module imported by `scoring.ts`. Carries forward Phase 2 gate panel Gap 1 finding.

**C-26:** `GateScoringExplanationScreen` (the pre-result explanation screen required by C-20) is a distinct React component that must have its own task and TDD cycle. It is not bundled into `AssessmentIsland.tsx` (P3-E-1). Explain-before-gate is a user-facing flow step, not infrastructure wiring.

**C-27:** Third-party benchmark citations for the n<5 fallback path in `ReportRenderer.tsx` must be authored and stored in a static content module before `ReportRenderer.tsx` implementation begins. The citations must not be hardcoded as strings in the component.

---

## Overall Verdict: ADVANCE WITH NOTES

The Phase 3 plan is ready to execute. The wave structure, dependency modeling, TDD discipline, and GDPR constraint carry-through are all at the level required to unblock Phase 1 work immediately and Phase 3 development after Phase 2 locks.

The notes identified are real — particularly the missing `GateScoringExplanationScreen` task (C-26), the `ThresholdMatrix` type gap (C-25), and the pre-flight blocker for the HubSpot subscription type ID — but none of them block starting Phase 1. They must be resolved before the specific Phase 3 tasks they affect are claimed. The three new constraints (C-25, C-26, C-27) are recorded for the implementation team. The two pre-flight gaps (N10, N11) should be moved to the Pre-Flight Dependencies table in the plan before the first Phase 3 Beads task is claimed.
