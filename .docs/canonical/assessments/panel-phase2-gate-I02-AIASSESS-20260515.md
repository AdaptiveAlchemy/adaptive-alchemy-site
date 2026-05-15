---
type: assessment
endeavor: I02-AIASSESS
subject: phase2-gate
date: 2026-05-15
status: final
initiative: I02-AIASSESS
panel_invoked: true
panel_artifact_path: .docs/canonical/assessments/panel-phase2-gate-I02-AIASSESS-20260515.md
gate_decision: ADVANCE WITH NOTES
constraints_added:
  - C-20
  - C-21
  - C-22
  - C-23
  - C-24
---

# Phase 2 Gate Panel — I02-AIASSESS

**Panel question:** Is the design complete and consistent enough to produce an actionable implementation plan (Phase 3)?

**Date:** 2026-05-15
**Format:** Strategic tier — 3-round + written synthesis with decision framework
**Facilitated by:** panel-facilitator (claude-sonnet-4-6)

**Panel members:**
- TypeScript / React Architect — interface contract quality
- Implementation Planner — backlog actionability and wave dependencies
- Security / GDPR Specialist — GDPR compliance architecture

**Sub-questions under review:**
1. Are the TypeScript interface contracts (C-14) specific enough to unblock Phase 3 implementation without rework?
2. Are the 7 ADRs internally consistent (no contradictions)?
3. Does the backlog wave structure (B00-B06) capture all work needed to satisfy the walking skeleton and BDD scenarios?
4. Does the design adequately address GDPR constraints (C-15, C-17, C-19)?
5. Any red flags before implementation planning?

---

## Round 1: Initial Analysis

### TypeScript / React Architect

**Scope reviewed:** Interface contracts in the backlog (C-14 deliverable), ADR I02-001 (island pattern), ADR I02-002 (radar chart), ADR I02-004 (gate scoring model).

**Contract completeness verdict: Largely sufficient with two gaps.**

The five core types — `AssessmentIslandProps`, `SurveyQuestion`, `AssessmentScore`, `HubSpotSubmission`, and `ReportData` — form a coherent contract surface. The dependency chain from `SurveyQuestion` through `AssessmentScore` to `ReportData` is correctly typed and traceable. The scoring engine is typed as pure (no side effects beyond the `fetch` in `hubspot.ts`). This is solid.

**Gap 1 — `scoring.ts` threshold matrix type is unspecified.**

The `DimensionScore.level: MaturityLevel` field implies the scoring engine needs the 5×6 threshold matrix available at compile time. ADR I02-004 states the matrix must be "a typed constant in `scoring.ts` or a separate config module" but no type is defined for the matrix itself. Without a typed matrix structure, an implementer may produce an untyped config object or use `number[][]` without dimension labels — creating a runtime error surface. This is a gap.

Minimum required addition:

```typescript
type ThresholdMatrix = {
  readonly [L in MaturityLevel]: {
    readonly [D in DimensionKey]: number  // minimum raw score to meet level L on dimension D
  }
}
```

This type should be in `types.ts` and the matrix constant in `scoring.ts` must satisfy it.

**Gap 2 — `SurveyQuestion.options.value` is typed as `number` but the comment says "string for contextual."**

The current definition is `value: number` with an inline comment that says `// 0–4 for Likert/scenario; string for contextual`. This is a lying type — the comment overrides the declared type. Contextual questions that use string values will fail at strict TypeScript compile. This is a type safety gap.

Correct fix: make this a discriminated union on `QuestionType`:

```typescript
type SurveyOption =
  | { value: number; label: string; failureMode?: string }    // likert | scenario
  | { value: string; label: string }                          // contextual

type SurveyQuestion = {
  // ...
  type: QuestionType
  options: ReadonlyArray<SurveyOption>
}
```

Alternatively, if contextual question values are never fed into scoring, type them separately and enforce via the type discriminant. Either way, `value: number` with a "string for contextual" comment is a strict-mode violation waiting to happen.

**Gap 3 — `bindingConstraint` when user is at Level 5 is undefined behavior.**

`AssessmentScore.bindingConstraint: DimensionKey` is declared as non-optional. But a Level 5 user has no binding constraint — they have met all thresholds at the highest level. The type implies every scored result has a binding constraint, which is false for Level 5. The implementation will need to either (a) produce a sentinel value, (b) make `bindingConstraint` optional (`DimensionKey | null`), or (c) define a `Level5Frontier` concept. ADR I02-004 does not address this edge case.

Recommended: `bindingConstraint: DimensionKey | null` with the convention that `null` means "at the frontier — no single dimension is your constraint." The report renderer must handle the null case (frontier framing). This is a correctness issue, not a style issue.

**ADR consistency check (architecture perspective):**

- ADR I02-001 (island) and ADR I02-002 (radar lazy load) are consistent: both use the two-level lazy strategy and reference each other correctly.
- ADR I02-004 (gate scoring) references `AssessmentScore.bindingConstraint` correctly, consistent with the backlog type definition — but inherits the Level 5 gap above.
- No cross-ADR contradictions detected from the architecture perspective.

**Overall architecture verdict:** Contract surface is 85% implementation-ready. The three gaps are concrete and fixable before Phase 3 day 1. None require design rework — they are type-level corrections.

---

### Implementation Planner

**Scope reviewed:** Wave breakdown B00–B06, wave dependency graph, open pre-Phase-3 dependencies table, critical path annotation.

**Actionability verdict: Highly actionable with two dependency risks.**

The wave structure is unusually specific for a Phase 2 backlog. Individual items are scoped to single files or single decisions (B03-1 is just "run pnpm add recharts, measure bundle, document"). Any competent implementer can pick up B00-1 and know exactly what to produce. The BDD scenario cross-references on each item (e.g., "B03-5 satisfies S17, S18, S19, S19b, S30, S32, S32b") allow the implementer to validate against acceptance criteria without re-reading the full charter. This is good backlog hygiene.

**Dependency risk 1 — B02-9 (benchmark micro-survey) has no downstream gate.**

B02-9 is "design and dispatch the benchmark micro-survey." S15 requires the survey to be commissioned by Phase 2 day 2 and sets n ≥ 20 as a Phase 3 launch gate. However, the wave structure does not show what B02-9 blocks in Phase 3. The dependency graph shows B02-9 as a parallel item with no downstream arrows. The n ≥ 20 response target is mentioned in S15 but does not appear as a blocking condition on any Phase 3 wave item. If n ≥ 20 is a genuine launch gate, it needs a Phase 3 item (perhaps in B06) that explicitly checks it. If it is not a hard gate, S15 should be softened. As written, the dependency is a silent gap.

**Dependency risk 2 — Four open pre-Phase-3 dependencies are founder-owned with no fallback.**

The backlog's "Open Pre-Phase-3 Dependencies" table lists:
- HubSpot portal ID confirmed (blocks B03-4, B06-2, S31)
- HubSpot form GUID created (blocks B03-4, B06-2, S31)
- HubSpot GDPR tools toggle verified from EU IP (blocks B06-2, C-16)
- Methodology provenance note fields completed (blocks B01-1, S03)

All four are "Owner: Founder." Phase 3 cannot start B03-4 until at least the portal ID and form GUID are available. The backlog correctly identifies these as blocking, but there is no contingency path: what does the engineering team do if HubSpot credentials are not available when B03 begins? B03-5 (`SurveyFlow.tsx`) is the largest item in B03 — it does not depend on HubSpot and can proceed. B03-2, B03-3 (`scoring.ts`, `email-blocklist.ts`) are also independent of HubSpot. But B03-4 (`hubspot.ts`) and B03-6 (`EmailGate.tsx`) are directly blocked. The backlog should state explicitly: "if HubSpot credentials are not available when B03 begins, B03-4 and B03-6 must be stubbed with a mock `submitToHubSpot` that returns `{ ok: true }` — remove the stub before B06-2."

This is not a design flaw, but implementation planning should capture the stub-and-remove strategy so Phase 3 does not stall on a credential delay.

**BDD coverage check:**

The walking skeleton scenarios (S17, S18, S20, S22, S24, S27) map cleanly to backlog items:
- S17 → B00-3, B03-5 (island hydration + first survey question)
- S18 → B03-2, B04-1 (scoring + ScoreDisplay)
- S20 → B03-6 (EmailGate domain validation)
- S22 → B03-4, B03-6 (HubSpot submission + consent gate)
- S24 → B04-5 (ReportRenderer full 9-section assembly)
- S27 → B00-4, B06-1 (Lighthouse CI threshold)

Coverage is comprehensive. No scenario is orphaned (no BDD scenario references a component not in the backlog).

**One scope gap detected: `SurveyFlow.tsx` pre-result explanation screen (UQ-4).**

ADR I02-004 states: "The pre-result explanation screen (UQ-4) is a required UI element — it is part of the gate scoring model's user experience contract." B03-5 covers `SurveyFlow.tsx` broadly but the item description does not explicitly list the pre-result explanation screen. The BDD scenario cross-references on B03-5 do not include any scenario that tests the pre-result screen (S17, S18, S19, S19b, S30, S32, S32b are listed — none of these are the UQ-4 screen). There is no BDD scenario for the pre-result explanation screen at all. This is a coverage gap: a required UI element has no acceptance test. A new scenario (call it S33 or extend S18) should cover this screen.

**Wave dependency graph verdict:** Correct and buildable. Critical path annotation ("B02-1 → B02-2 → B02-3" and "B00-2 + B03-1 → B03-5 → B04-5 → B06-3") is accurate. No circular dependencies detected.

**Overall implementation verdict:** Backlog is 90% implementation-ready. Two gaps (benchmark gate and HubSpot stub strategy) are pre-Phase-3 planning items, not design defects. The missing BDD scenario for the pre-result screen is a genuine coverage gap that should be added before Phase 3 test authoring begins.

---

### Security / GDPR Specialist

**Scope reviewed:** ADR I02-003 (HubSpot Forms v3 unauthenticated), backlog Consent Gate Flow (C-15 architecture), backlog §Open Pre-Phase-3 Dependencies (C-16), ADR I02-005 (email-me delivery), and backlog reference to `gdpr-retention-erasure-spec.md` (C-17, C-15, C-19).

**GDPR architecture verdict: Structurally sound with one enforcement gap and one unresolved data residency question.**

The consent gate architecture is correctly designed. The strict gate (report not rendered unless HubSpot returns 2xx) satisfies GDPR Art. 6(1)(a) consent as lawful basis — consent is recorded before the personal data (the email and assessment results) are processed into a HubSpot contact. The `legalConsentOptions` field in the `HubSpotSubmission` type is the correct mechanism for GDPR consent recording in HubSpot's API. The rejection of "partial unlock on error" is the right call — any partial unlock would mean delivering the full report before consent confirmation, which violates the architecture's own C-15 constraint.

**Finding 1 — Data minimization gap: `company_email_domain` field.**

The `HubSpotSubmission` type sends `company_email_domain` as a contact property. This is derived from the user's submitted email (e.g., `@adaptive-alchemy.com` → `adaptive-alchemy.com`). Under GDPR Art. 5(1)(c) (data minimization), every field collected must be necessary for the specified purpose. The stated purpose (S22) is routing to Track A/B/C and enrolling the HubSpot email sequence. Track routing is driven by `ai_fluency_track`, not by `company_email_domain`. The domain field is useful for HubSpot workflow segmentation, but the backlog does not document what workflow or processing step requires it. If no workflow requires it, the field is collected without a documented purpose — a data minimization vulnerability.

Action required before B03-4 implementation: the `gdpr-retention-erasure-spec.md` (C-17) should explicitly list `company_email_domain`, state the processing purpose (e.g., "workflow segmentation for enterprise vs. SMB sequences"), and confirm it is necessary for that purpose. If no workflow requires it, drop it from the submission payload.

**Finding 2 — HubSpot GDPR tools toggle: enforcement is deferred, not verified.**

ADR I02-003 correctly identifies that GDPR tools must be enabled in the HubSpot portal for `legalConsentOptions` to create a valid GDPR consent record. The backlog lists this as an open dependency ("HubSpot GDPR tools toggle verified from EU IP — Owner: Founder + Phase 3 lead — Blocks B06-2, C-16"). This is deferred to B06-2 (the final quality gate). The risk: if Phase 3 development proceeds with a HubSpot portal that does not have GDPR tools enabled, all integration testing during Phase 3 will be testing against a non-GDPR-compliant portal. Test submissions will not create valid consent records. By the time B06-2 catches this, some development and integration testing effort may need to be repeated.

Recommendation: GDPR tools toggle verification should be a Phase 3 day-0 check (before B03-4 begins), not a B06-2 check. If B06-2 is the only gate, there is a 6-to-8 wave window of testing against a potentially misconfigured portal.

**Finding 3 — `gdpr-retention-erasure-spec.md` (C-17) is a Phase 2 deliverable with no Phase 3 enforcement mechanism.**

The backlog lists B02-6 as "produce `gdpr-retention-erasure-spec.md`" with "retention periods per property, erasure process, consent gate flow for C-15, n-count preservation for C-19." This is a documentation deliverable. However, the backlog does not show how Phase 3 enforces retention periods. Retention period enforcement (e.g., HubSpot contact cleanup workflows that delete contacts after the specified period, or setting HubSpot's GDPR auto-delete feature) requires HubSpot portal configuration. That configuration step is not in any wave item. There is no B03-x or B06-x item for "configure HubSpot retention period / GDPR auto-delete per spec."

This is a gap: documenting the retention policy in B02-6 does not make the policy technically enforced. A Phase 3 wave item (likely in B06 or a new B06-4) should cover "configure HubSpot GDPR data retention automation per `gdpr-retention-erasure-spec.md`."

**Finding 4 — Data transfer compliance: HubSpot EU data residency.**

The site is positioned as a tool for European businesses (the founder is Europe-based; the GDPR architecture strongly implies EU user base). HubSpot's data residency for EU customers depends on the portal's data center configuration. If the HubSpot portal stores contact data in a US data center without a valid data transfer mechanism (Standard Contractual Clauses or EU-US Data Privacy Framework adequacy), the submission of EU user data to HubSpot may constitute a cross-border transfer requiring explicit documentation under GDPR Art. 46. The backlog and ADRs do not mention data residency or SCCs. The `gdpr-retention-erasure-spec.md` scope description does not include data transfer compliance. This is not a blocking red flag (HubSpot does offer EU data residency and has SCCs in place for US transfers), but it should be documented explicitly — either confirm EU data residency is configured for the portal, or document that HubSpot's DPA/SCCs are the transfer mechanism.

**Consistency check (GDPR perspective):**

ADR I02-003, the backlog's C-15 gate flow, and B02-6's scope are internally consistent. C-15 (consent failure does not deliver report) → the gate flow → the `HubSpotSubmission.legalConsentOptions` structure → the `hubspot.ts` return type all point in the same direction. ADR I02-005 (email-me delivery is triggered by the same HubSpot form submission) does not introduce GDPR risk beyond what ADR I02-003 already covers — the email is triggered server-side by HubSpot after the consent record is created. No second consent event is required for the email.

C-19 (n-count preservation for benchmarks) is referenced in B02-6 but the implementation mechanism is not specified. The backlog says "benchmark n-count preservation approach" — but does not state whether this means anonymizing benchmark aggregates in the client, or simply not storing individual responses in a way that could re-identify respondents. This is a specification gap in the B02-6 deliverable scope.

**Overall GDPR verdict:** Architecture is structurally sound. Four findings — one data minimization gap, one enforcement timing issue, one missing implementation item (retention enforcement), and one undocumented data residency question. None are red flags that block implementation, but two (data minimization for `company_email_domain`, retention enforcement step) should produce Phase 3 items before B03-4 implementation begins.

---

## Round 2: Cross-Examination

### TypeScript / React Architect responds to Implementation Planner

Building on the Implementation Planner's observation about the missing BDD scenario for the pre-result explanation screen (UQ-4): this is a type-level consequence too. ADR I02-004 describes the pre-result screen as rendered "between survey completion and `ScoreDisplay.tsx` render, after HubSpot gate passes." That sequencing contradicts the backlog's consent gate flow, which shows: Survey complete → ScoreDisplay (ungated, immediate) → EmailGate renders. If the pre-result explanation screen fires after HubSpot gate passes, then ScoreDisplay is not "immediate" — it is gated behind the HubSpot submission. This is an internal contradiction.

The ADR I02-004 note reads: "Pre-result explanation screen: rendered by `SurveyFlow.tsx` between form submission and `ScoreDisplay.tsx` render, after HubSpot gate passes." But the backlog gate flow explicitly says ScoreDisplay is ungated. These two sources contradict each other on the position of the pre-result screen. This contradiction must be resolved before `SurveyFlow.tsx` is implemented — an implementer reading both documents will produce different components depending on which source they trust.

Resolution needed: either (a) the pre-result screen fires between survey completion and ScoreDisplay (before EmailGate, before HubSpot) to explain the gate-scoring model before showing the level — which is consistent with the backlog's "ScoreDisplay ungated" flow; or (b) the pre-result screen fires after HubSpot confirmation, before the full report — which contradicts the backlog's ungated ScoreDisplay. The founder or architect must decide before B03-5 begins. This is a sequencing contradiction, not a style question.

Additionally, building on the GDPR Specialist's data minimization finding: the `HubSpotSubmission` type as defined in the backlog includes `company_email_domain`. If that field is dropped (as the GDPR Specialist recommends if no workflow purpose is documented), the `HubSpotSubmission` type must be updated. The required fields comment in the type definition explicitly lists `company_email_domain` as a required field — so the type itself propagates the data minimization issue. Any change to the field set in B02-6 must be reflected in the `HubSpotSubmission` type before B00-2 is finalized.

### Implementation Planner responds to TypeScript / React Architect

Building on the TypeScript Architect's finding about the Level 5 `bindingConstraint` edge case: this has a direct implementation planning consequence. B04-5 (`ReportRenderer.tsx`) is annotated as XL complexity and handles individual/team framing variant application. If `bindingConstraint` can be `null` for Level 5 users, `ReportRenderer.tsx` must handle a null constraint without crashing — that is a conditional rendering branch. `DimensionBars.tsx` (B04-3) shows "Fix first" on the binding constraint dimension — for Level 5 users, "Fix first" is meaningless. These components need a defined Level 5 rendering contract.

My recommendation: the Level 5 state should be explicitly named in the type system as an `AgentFrontierState` variant or by making `bindingConstraint: DimensionKey | null` with a convention that null = Level 5 frontier. The report content for Level 5 should use frontier framing (consistent with the roadmap spec which mentions "at-5 frontier" roadmap). B04-5 and B04-3 should explicitly document that null `bindingConstraint` triggers frontier mode. This is not a scope increase — it is clarifying what B04-5 already must handle.

Building on the GDPR Specialist's finding about the HubSpot GDPR tools toggle timing: I agree that moving verification to Phase 3 day-0 (not B06-2) is correct from a planning standpoint. The stub strategy I proposed (mock `submitToHubSpot` returning `{ ok: true }`) should be the canonical approach for pre-credential development. The B06-2 smoke test then replaces the stub with the real credentials and verifies the full integration against the live portal. This sequencing makes Phase 3 development credential-independent while keeping the integration gate in B06.

The benchmark micro-survey gap I flagged (B02-9 has no downstream gate) remains unaddressed. The n ≥ 20 target in S15 should either appear as a B06 quality gate item or be explicitly removed as a launch gate. Leaving it in S15 with no enforcement item creates ambiguity about whether launch is blocked if the survey response rate is low.

### Security / GDPR Specialist responds to TypeScript / React Architect

Building on the TypeScript Architect's sequencing contradiction (pre-result screen position): from a GDPR perspective, the correct sequence is critical. If the pre-result screen fires before the email gate, it reveals the maturity level (a personal assessment result) before consent is recorded — but the backlog explicitly designates ScoreDisplay as "ungated." If the pre-result explanation screen is the screen that explains the gate scoring model (not the user's actual level), it can fire before the email gate without GDPR concern, as it discloses methodology rather than personal results. If it is the screen that shows the user their actual level label before the full report, it is equivalent to ScoreDisplay and can be ungated under the same logic (the level label alone, without the full dimension detail, is low-sensitivity). GDPR does not prohibit showing a user their own score before they submit consent — consent is required for data collection, not for displaying computed results to the person who generated them.

Therefore, from a GDPR standpoint: the pre-result screen, whether it fires before or after HubSpot, does not introduce a consent timing issue. The GDPR gate is correctly placed at the HubSpot submission (before the full report). The sequencing contradiction the TypeScript Architect identified is a UX/product issue, not a GDPR issue. This does not change my recommendation that it must be resolved before B03-5 implementation, but it removes any concern that either resolution violates GDPR.

Building on the Implementation Planner's stub strategy endorsement: I add one constraint. The stub must not be committed without a feature flag or a clear comment marking it as a stub. If a stub `submitToHubSpot` returning `{ ok: true }` is committed and the feature flag or removal step is missed, the production tool would silently bypass the HubSpot consent recording. The stub removal must be a B06-2 gate item, documented explicitly. The risk of a forgotten stub bypassing GDPR consent recording is non-trivial.

On my own data residency finding: upon reflection, HubSpot provides a DPA covering EU data transfers under SCCs by default for all accounts. The risk level is lower than my initial framing suggested — HubSpot's standard terms include adequate transfer mechanisms. The documentation gap remains (the `gdpr-retention-erasure-spec.md` should reference HubSpot's DPA), but this does not block Phase 3.

---

## Round 3: Convergence

**Sequencing contradiction (pre-result screen vs. ScoreDisplay gate):**

The panel converges on a resolution: the pre-result explanation screen fires between survey completion and ScoreDisplay, before the email gate. The screen explains the gate scoring methodology ("your level is the highest level where all 6 dimensions meet their threshold — not an average"). ScoreDisplay follows immediately after, also before the email gate. EmailGate follows ScoreDisplay. This is consistent with the backlog's "ScoreDisplay ungated" architecture and makes the pre-result screen a mandatory transition frame in the survey flow. ADR I02-004 contains an error in its implementation notes — the phrase "after HubSpot gate passes" is incorrect; the correction is "before EmailGate renders." This must be corrected in Phase 3 documentation (C-20).

**Level 5 `bindingConstraint` null handling:**

The panel converges: `bindingConstraint: DimensionKey | null` is the correct type. Null signals Level 5 frontier state. ReportRenderer and DimensionBars must handle null explicitly. The `ThresholdMatrix` type and the Level 5 edge case should be added to `types.ts` before B00-2 is closed. This is a Phase 3 day-1 fix, not a Phase 2 redesign (C-21).

**`SurveyOption` discriminated union:**

The panel converges: the `value: number` lie-type must be fixed. The discriminated union approach (separate `SurveyOption` types per `QuestionType`) is the correct TypeScript strict mode solution. This fix should be in B00-2 (`types.ts`), not deferred (C-22).

**Benchmark micro-survey gate:**

The panel converges that n ≥ 20 should be a soft launch recommendation rather than a hard blocking gate in B06. The current tool does not yet have benchmark data — the BenchmarkCards in `ReportData` are already nullable with a collapse behavior (S29). Blocking launch on survey response count is operationally risky. S15 should be amended: n ≥ 20 is a post-launch target, not a Phase 3 gate. B02-9 is not a blocker for B03 start (C-23).

**GDPR HubSpot tools verification timing:**

The panel converges: GDPR tools toggle verification moves to Phase 3 day-0, added as an explicit checklist item before B03-4 implementation. The stub strategy (mock `submitToHubSpot` returning `{ ok: true }`) is canonicalized, with a stub removal requirement added to B06-2 (C-24).

**`company_email_domain` data minimization:**

No convergence on whether the field should be dropped — this requires founder input on whether any HubSpot workflow uses it for segmentation. The GDPR Specialist flags it; the Implementation Planner notes it must be resolved before B00-2 is finalized (so the `HubSpotSubmission` type reflects the final field set). This is a pre-Phase-3 decision item, not a blocking issue if addressed before B00-2 closes. Escalated to founder: confirm whether `company_email_domain` is needed for any HubSpot workflow; if not, remove from `HubSpotSubmission` type.

**ADR internal consistency verdict:**

All seven ADRs are internally consistent with one exception: ADR I02-004 implementation notes contain the sequencing error noted above ("after HubSpot gate passes"). All other cross-ADR references are correct. ADR I02-001 ↔ ADR I02-002 (two-level lazy strategy) is consistent. ADR I02-003 ↔ ADR I02-005 (same HubSpot submission triggers both email gate and email delivery) is consistent. ADR I02-006 ↔ ADR I02-007 (URL slug and H1 label usage) are consistent. ADR I02-004 ↔ ADR I02-007 (framework naming in binding constraint labels) is consistent.

---

## Final Synthesis

### Decision Framework: Risk-Benefit Analysis

**Option A: ADVANCE** — proceed to Phase 3 without further Phase 2 work
- Benefit: no delay; Phase 3 begins immediately
- Risk: three type gaps reach implementation (lying `value` type, Level 5 null, missing `ThresholdMatrix` type); sequencing contradiction produces implementation ambiguity in B03-5; retention enforcement missing from B06; GDPR tools timing risk

**Option B: ADVANCE WITH NOTES** — proceed to Phase 3 with five constraints added (C-20 through C-24)
- Benefit: all identified gaps resolved before the implementation items they affect; no Phase 2 rework required; constraints are addressable within Phase 3 day 1–2
- Risk: minor; all notes are executable without design changes

**Option C: PAUSE** — return for Phase 2 rework before Phase 3
- Benefit: none material given the gap severity
- Risk: unnecessary delay; no finding requires architectural redesign

**Panel verdict: ADVANCE WITH NOTES**

The design is complete and consistent enough to produce an actionable implementation plan. No finding requires architectural redesign. The seven ADRs are internally consistent (one implementation note error, not a design contradiction). The wave structure is actionable. The TypeScript contracts are 85% implementation-ready, improvable on Phase 3 day 1. The GDPR architecture is structurally sound. The five constraints below must be resolved before the affected Phase 3 items begin.

---

## Phase 3 Constraints (C-20 through C-24)

### C-20 — ADR I02-004 sequencing error correction

**Before B03-5 begins:** Correct ADR I02-004 implementation notes. The pre-result explanation screen fires between survey completion and `ScoreDisplay` render — before `EmailGate`, not after HubSpot gate passes. The correct sequence is: Survey complete → Pre-result explanation screen → ScoreDisplay (ungated level + headline) → EmailGate → (HubSpot 2xx) → ReportRenderer. Add a BDD scenario (S33) covering the pre-result explanation screen: Given survey is complete, When scoring is calculated, Then a pre-result screen appears before ScoreDisplay explaining gate methodology (not an average). This scenario must reference S18 as context.

**Blocks:** B03-5 implementation.

### C-21 — Level 5 `bindingConstraint` null handling

**Before B00-2 closes:** Update `AssessmentScore.bindingConstraint` type to `DimensionKey | null`. Add a `ThresholdMatrix` type to `types.ts`. Document the convention: `bindingConstraint === null` signals Level 5 frontier state; components rendering the binding constraint ("Fix first" label in DimensionBars, binding axis accent in RadarChart) must handle null by rendering frontier framing instead. B04-3, B04-4, and B04-5 implementation notes must reference this convention.

**Blocks:** B00-2 closure; B04-3, B04-4, B04-5 implementation.

### C-22 — `SurveyOption` discriminated union

**Before B00-2 closes:** Replace `value: number` with a discriminated union in `SurveyQuestion.options`. Contextual questions use `value: string`; Likert and scenario questions use `value: number`. TypeScript strict mode must compile without error with this change. No production code is affected by this change before B03-5 — this is a types-only correction.

**Blocks:** B00-2 closure.

### C-23 — Benchmark micro-survey n ≥ 20 is not a Phase 3 launch gate

**Before Phase 3 planning begins:** Amend S15 to classify n ≥ 20 as a post-launch target (not a gate condition). Remove any implied B06 gate on survey response count. BenchmarkCards null-data collapse behavior (S29) already handles the case where benchmark data is unavailable at launch. B02-9 must be completed (survey commissioned) but its response rate does not block Phase 3 launch.

**Blocks:** Phase 3 implementation plan (removes a false blocking dependency).

### C-24 — HubSpot integration stub and GDPR tools timing

**Before B03-4 begins:** Two sub-constraints:

(a) GDPR tools toggle verification is a Phase 3 day-0 prerequisite (not deferred to B06-2). The HubSpot portal must have GDPR tools enabled before any integration development or testing begins. Document this as an explicit Phase 3 start gate.

(b) If HubSpot credentials are unavailable when B03-4 begins, implement a mock `submitToHubSpot` function that returns `{ ok: true }` with an explicit `// STUB — remove before B06-2` comment and a failing integration test that confirms the stub is absent in production build. B06-2 must include a stub-removal verification step (search for the comment string; build fails if found).

**Blocks:** B03-4 implementation.

---

## Panelist Verdicts

| Panelist | Verdict | Key condition |
|---|---|---|
| TypeScript / React Architect | ADVANCE WITH NOTES | C-21 and C-22 resolved in B00-2; C-20 resolved before B03-5 |
| Implementation Planner | ADVANCE WITH NOTES | C-23 removes false gate; C-24 stub strategy documented; S33 added |
| Security / GDPR Specialist | ADVANCE WITH NOTES | C-24(a) GDPR tools day-0; retention enforcement added to B06 |

**Gate decision: ADVANCE WITH NOTES**

Phase 3 implementation planning may proceed. The implementation planner should incorporate C-20 through C-24 into the Phase 3 backlog before task seeding in Beads.

---

## Summary for Implementation Planning

**What is complete and consistent:**
- Seven ADRs are internally consistent; one implementation note error (C-20) is correctable without redesign
- Wave structure B00–B06 is actionable; all items are scoped to single files or single decisions
- Interface contracts are 85% implementation-ready; three type-level corrections required (C-21, C-22)
- GDPR consent gate architecture is structurally sound (C-15, AA-3 satisfied)
- Critical path is correct: B02-1 → B02-2 → B02-3 (Phase 2 chain); B00-2 + B03-1 → B03-5 → B04-5 → B06-3 (Phase 3 chain)

**What Phase 3 planning must incorporate before task seeding:**
1. S33 (pre-result explanation screen scenario) — add before B03-5 Beads task
2. B00-2 updated types (C-21: `bindingConstraint: DimensionKey | null`; `ThresholdMatrix` type; C-22: discriminated `SurveyOption`)
3. B06 new item: HubSpot retention enforcement configuration per `gdpr-retention-erasure-spec.md`
4. Founder decision needed: confirm whether `company_email_domain` is required for any HubSpot workflow (pre-B00-2 decision)
5. Phase 3 day-0 checklist: GDPR tools toggle verified (C-24a); HubSpot credentials available or stub strategy in place (C-24b)
6. S15 amended: n ≥ 20 is a post-launch target, not a gate (C-23)
