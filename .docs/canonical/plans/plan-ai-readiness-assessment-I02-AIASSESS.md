---
title: Implementation Plan — AI Readiness Assessment
initiative: I02-AIASSESS
initiative_name: AI Readiness Assessment
date: 2026-05-15
status: active
author: implementation-planner
beads_epic: adaptive-alchemy-site-k4p
phase_coverage:
  - phase-1-copy
  - phase-2-framework
  - phase-3-tool
---

# I02-AIASSESS Implementation Plan — AI Readiness Assessment

## Overview

Three sequential phases that create a new top-of-funnel acquisition surface. Phase 1 (docs/copy) and Phase 2 (framework docs) produce no deployable code. Phase 3 is a net-new interactive product. Each phase gate is testable (S08, S16, and the Phase 3 walking skeleton scenarios).

**Critical path (Phase 3):** `B00-2 (types.ts) + P3-A-2 (Recharts decision) → P3-B-3 (SurveyFlow) → P3-D-6 (ReportRenderer) → P3-F-3 (walking skeleton green)`

---

## Pre-Flight Dependencies (block Phase 3 start)

| Dependency | Owner | Blocks |
|---|---|---|
| HubSpot portal ID confirmed | Founder | P3-B-1 (hubspot.ts), P3-F-2 |
| HubSpot form GUID created | Founder | P3-B-1 (hubspot.ts), P3-F-2 |
| HubSpot GDPR tools toggle verified from EU IP | Founder + Phase 3 lead | P3-F-2 |
| Methodology provenance note bracketed fields completed | Founder | P1-B-1 (service page copy) |
| Phase 2 framework locked (S16 passes) | Phase 2 lead | All of P3-B, P3-C, P3-D, P3-E |

---

## Phase Constraints Carried Forward

| ID | Constraint |
|---|---|
| C-20 | Pre-result explanation screen fires BEFORE email gate: Survey → Explanation → ScoreDisplay → EmailGate → Report |
| C-21 | `bindingConstraint: DimensionKey \| null` — null at Level 5 only |
| C-22 | `SurveyOption.value` is a discriminated union: `number` for Likert/scenario, `string` for contextual |
| C-23 | n≥20 benchmark is NOT a Phase 3 launch gate (removed as blocker) |
| C-24 | HubSpot stub must carry a failing integration test to prevent shipping stub to prod |

---

## Wave Breakdown Table

| Wave | Beads ID | Title | Type | Complexity | Parallelism |
|---|---|---|---|---|---|
| P1-A-1 | `adaptive-alchemy-site-dj5` | Keyword research (T2 Gemini) | docs | S | Prerequisite gate |
| P1-A-2 | `adaptive-alchemy-site-dj5` | URL slug + H1/meta decision; ADR I02-006/007 update | docs | S | After P1-A-1 |
| P1-B-1 | `adaptive-alchemy-site-m4d` | /services/ai-readiness-assessment content | docs | M | After P1-A |
| P1-B-2 | `adaptive-alchemy-site-k1u` | /check static shell (index.astro) | docs | S | After P1-A, parallel P1-B-1 |
| P1-C-1 | TBD | /for/founders hero.secondaryCta update | docs | S | After P1-A, parallel P1-B |
| P1-C-2 | TBD | /for/ctos hero.secondaryCta update | docs | S | After P1-A, parallel P1-B |
| P1-C-3 | TBD | /for/stalled-ai-projects full rewrite | docs | M | After P1-A, parallel P1-B |
| P1-D-1 | `adaptive-alchemy-site-efj` | Homepage ServiceCards — Assess tier | docs | S | After P1-B-1 |
| P2-A-1 | TBD | ai-fluency-index-v1-spec.md | docs | M | Sequential chain start |
| P2-A-2 | TBD | maturity-model-5x6-matrix.md | docs | L | After P2-A-1 |
| P2-A-3 | TBD | transition-roadmaps.md | docs | L | After P2-A-2 |
| P2-B-1 | TBD | brand-usage-spec.md | docs | S | After P2-A-1, parallel |
| P2-B-2 | TBD | gdpr-retention-erasure-spec.md | docs | M | After P2-A-1, parallel |
| P2-B-3 | TBD | aeo-query-map.md (10–15 queries + FAQ copy) | docs | M | After P2-A-1, parallel |
| P2-B-4 | TBD | intake-questionnaire.md | docs | L | After P2-A-1, parallel |
| P2-C-1 | TBD | faq-schema-content.md (FAQPage JSON-LD ready) | docs | M | After P2-A-3 + P2-B-3 |
| P2-C-2 | TBD | sample-report-spec.md (Level 3 example) | docs | M | After P2-A-3 + P2-B-3 |
| P3-A-1 | TBD | src/lib/assessment/types.ts | code | S | Walking skeleton start |
| P3-A-2 | TBD | src/lib/assessment/email-blocklist.ts | code | S | Parallel P3-A-1 |
| P3-A-3 | TBD | /check/index.astro walking skeleton shell | code | S | After P3-A-1 |
| P3-B-1 | TBD | src/lib/assessment/scoring.ts (gate engine) | code | M | After P3-A |
| P3-B-2 | TBD | src/lib/assessment/routing.ts (Track A/B/C) | code | S | After P3-A, parallel P3-B-1 |
| P3-B-3 | TBD | SurveyFlow.tsx (multi-step + intake routing) | code | L | After P3-A |
| P3-C-1 | TBD | src/lib/assessment/hubspot.ts (C-24 stub) | code | M | After P3-B-1 |
| P3-C-2 | TBD | EmailGate.tsx (blocklist + GDPR checkbox) | code | M | After P3-B-1, parallel P3-B-3 |
| P3-D-1 | TBD | ScoreDisplay.tsx (ungated level + headline) | code | S | After P3-B-3 + P3-C-2 |
| P3-D-2 | TBD | JourneyStrip.tsx (5-node progress bar) | code | S | After P3-B-3 + P3-C-2 |
| P3-D-3 | TBD | DimensionBars.tsx (6 bars + Fix first flag) | code | S | After P3-B-3 + P3-C-2 |
| P3-D-4 | TBD | Recharts install + bundle analysis decision | code | S | After P3-B-3 start (Day 1) |
| P3-D-5 | TBD | RadarChart.tsx (dynamic import, overlay) | code | L | After P3-D-4 decision |
| P3-D-6 | TBD | ReportRenderer.tsx (9-section full report) | code | XL | After P3-D-1..5 |
| P3-E-1 | TBD | AssessmentIsland.tsx (client:visible mount) | code | M | After all P3-D complete |
| P3-E-2 | TBD | Wire check/index.astro (island + env props) | code | S | After P3-E-1 |
| P3-E-3 | TBD | JSON-LD Service + FAQPage schema on /check | code | S | After P3-E-1, needs P2-C-1 |
| P3-F-1 | TBD | Verify Lighthouse CI thresholds (S27) | code | S | After P3-E |
| P3-F-2 | TBD | HubSpot stub absent in prod build (C-24) | code | M | After P3-E |
| P3-F-3 | TBD | Walking skeleton BDD: S09, S17, S18, S20, S22, S24, S27 | code | M | After P3-E |

---

## Wave P1-A — Keyword Research (Prerequisite Gate)

**Gate:** Must complete before any Phase 1 copy or URL decisions are written.

### P1-A-1: Keyword research

- **What:** Run T2 keyword research using Gemini on "AI readiness assessment" cluster and related terms. Produce `.docs/reports/keyword-research-I02-AIASSESS.md`.
- **Output format:** target keywords by volume/competition tier, recommended URL slugs, recommended H1/meta variants for both the service page and the free tool page.
- **Dispatch pattern:** `dispatch-external.sh gemini "Research top keyword opportunities for 'AI readiness assessment' for a boutique AI consultancy in Europe targeting founders and CTOs. Include search volume tiers, competition level, and 3–5 recommended URL slug options for a free tool. Output as markdown."`
- **Acceptance:** report exists at `.docs/reports/keyword-research-I02-AIASSESS.md`; contains at minimum 10 keyword variants with competition notes; URL slug options for both `/services/` and free tool pages.
- **Beads:** `adaptive-alchemy-site-dj5` (covers P1-A-1 and P1-A-2)
- **BDD:** S08 (lock condition 1), S10

### P1-A-2: Decide URL slugs + H1/meta language; update ADRs

- **What:** Using keyword research output, confirm `/check` URL slug (ADR I02-006) and "AI Readiness Assessment" / "AI Readiness Check" two-label split (ADR I02-007). Amend ADRs if research changes recommendation.
- **Acceptance:** ADR I02-006 shows confirmed slug; ADR I02-007 shows confirmed dual-label strategy with H1 assignments per page.
- **Beads:** same issue `adaptive-alchemy-site-dj5`
- **BDD:** S08, S10

---

## Wave P1-B — Service Page + /check Shell (Parallel after P1-A)

### P1-B-1: src/content/services/ai-readiness-assessment.md

- **What:** Write full frontmatter + prose for the AI Readiness Assessment service page. Content structure per charter §1.2 and UQ-18:
  - H1: "AI Readiness Assessment"
  - Sections: What it is, What you get (AI Readiness & Opportunity Map), Who it's for (Track B, levels 3–4), What comes next (Design → Pilot), Not for (3 criteria per UQ-3 copy), Methodology provenance note (founder must complete bracketed fields per UQ-14 before sign-off)
  - Conviction copy: scope signal ("Typical engagement: 2–3 weeks, one team, covering 6 workflow dimensions and 3–5 stakeholder interviews") + risk-reduction signal ("Standalone engagement — no ongoing commitment required") + CTA ("Book a 30-minute scoping call — we'll confirm fit before anything starts")
  - No price anchor (UQ-2)
  - Two-label copy discipline: "AI Readiness Assessment" in H1/meta; "AI Fluency Index" in methodology note and body copy (UQ-13)
- **Acceptance:** S01, S02, S03 (S03 requires founder to fill methodology note placeholders before copy sign-off)
- **Beads:** `adaptive-alchemy-site-m4d`
- **Complexity:** M

### P1-B-2: src/pages/check/index.astro (static shell)

- **What:** Create the Astro page shell for the free tool. Static HTML only in this step — no React island wired yet (that happens in P3-E-2). Includes:
  - H1: "AI Readiness Check" (confirmed slug from P1-A-2)
  - Meta title and description referencing "AI Readiness Check"
  - Introductory static paragraph (Googlebot + AI crawler parseable without JS)
  - Placeholder for FAQPage JSON-LD (empty `<script type="application/ld+json">` with comment — wired in P3-E-3)
  - `<!-- AssessmentIsland placeholder -->` comment
- **Acceptance:** S09 (HTTP 200, H1 present, meta present, intro para present), S10 (H1 = "AI Readiness Check")
- **Beads:** `adaptive-alchemy-site-k1u`
- **Complexity:** S

---

## Wave P1-C — Persona CTAs (Parallel after P1-A)

### P1-C-1: /for/founders — hero.secondaryCta

- **What:** Update `src/content/personas/founders.md` frontmatter. Add `hero.secondaryCta` pointing to interim booking link for scoping call. CTA copy framed for founder audience (not technical leadership). Should be visible above the fold at 1280px viewport.
- **Constraint:** Interim Phase 1 CTA links to booking page; after Phase 3 ships, CTA updates to `/check`. Plan the update path in the content frontmatter (add `ctaPhase3Href` field for easy swap).
- **Acceptance:** S04
- **Beads:** TBD (new issue P1-C-1)
- **Complexity:** S

### P1-C-2: /for/ctos — hero.secondaryCta

- **What:** Update `src/content/personas/ctos.md` frontmatter. Add `hero.secondaryCta` with CTA copy framed for technical leadership. Copy must be distinct from the founders page CTA (S05).
- **Acceptance:** S05
- **Beads:** TBD (new issue P1-C-2)
- **Complexity:** S

### P1-C-3: /for/stalled-ai-projects — full rewrite

- **What:** Full content rewrite per charter §1.1 and I01 T2-5 notes. Key changes:
  - Lead section: "you need clarity before commitment" (not rescue framing)
  - Introduce maturity spectrum early: one line per level (Curious → Agent-Ready)
  - Primary CTA: booking link for scoping call positioned as "Find your maturity level"
  - Clarify correct landing spot: Track A and Track B buyers (levels 1–4)
  - Hero line candidate: "Before you know where you're going, you need to know where you actually are."
  - GSC data check first: charter confirms no meaningful traffic, so rewrite directly (UQ-J decision)
- **Acceptance:** S06
- **Beads:** TBD (new issue P1-C-3)
- **Complexity:** M

---

## Wave P1-D — Homepage ServiceCards (After P1-B-1)

### P1-D-1: src/components/sections/ServiceCards.astro

- **What:** Add AI Readiness Assessment card to the engagement ladder display. Card must:
  - Show Assess tier in the full sequence: Assess → Design → Pilot → Transform → Operate
  - Copy distinguishes it as "standalone fixed-scope, fixed-fee product" — not only the first step
  - Conviction signals: scope signal or brief description of what it produces
- **Acceptance:** S07
- **Beads:** `adaptive-alchemy-site-efj`
- **Complexity:** S

---

## Wave P2-A — Framework Core (Sequential Chain)

### P2-A-1: .docs/canonical/assessments/ai-fluency-index-v1-spec.md

- **What:** Master framework specification. Covers:
  - 5-level maturity spine with AA framing (Curious → Emerging → Practicing → Systematic → Agent-Ready)
  - 6-dimension definitions (Task Recognition, Context & Prompting, Workflow Design, Judgment & Verification, Delivery & Integration, Governance & Systematization)
  - Enterprise differentiation: Governance as crosscutting concern; agent frontier definition (workflows specifiable enough for supervised automation); auditability criteria
  - Distinction from generic AI maturity frameworks: no AdviceForge references in any external-facing copy
  - Gate scoring concept introduced (full numeric spec in P2-A-2)
- **Acceptance:** S11 (framework is the source for the matrix), S13 (framework name appears as "Adaptive Alchemy AI Fluency Index")
- **Beads:** TBD (new issue P2-A-1)
- **Complexity:** M
- **Note:** B02-1 per backlog — must precede P2-A-2

### P2-A-2: .docs/canonical/assessments/maturity-model-5x6-matrix.md

- **What:** The primary Phase 2 design artifact. A 5×6 table:
  - Rows: Level 1–5
  - Columns: 6 dimension keys
  - Each cell: numeric threshold value + band label (STRONG / FUNCTIONAL / DEVELOPING / NOT YET)
  - No cell empty or TBD
  - Gate scoring rules documented: maturity level = highest level where all 6 thresholds are met
  - Binding constraint logic: which failing dimension is the primary gate; null at Level 5 (C-21)
  - Track C routing: numeric Dimension 6 threshold that triggers Track C vs Track B at Level 4
- **Acceptance:** S11, S12
- **Beads:** TBD (new issue P2-A-2)
- **Complexity:** L
- **Note:** B02-2 per backlog — must precede P2-A-3

### P2-A-3: .docs/canonical/assessments/transition-roadmaps.md

- **What:** Five transition roadmaps (1→2, 2→3, 3→4, 4→5, Level 5 frontier state). Per roadmap:
  - What the level change unlocks (concrete benefit)
  - 2–3 specific, executable, time-estimated moves (not generic advice)
  - The binding constraint move targeting the most common failing dimension at that transition
- **Acceptance:** S16 (Phase 2 gate condition: all 5 roadmaps written)
- **Beads:** TBD (new issue P2-A-3)
- **Complexity:** L

---

## Wave P2-B — Framework Support (Parallel after P2-A-1)

### P2-B-1: .docs/canonical/assessments/brand-usage-spec.md

- **What:** One-page document per UQ-17 covering:
  - Canonical name: "Adaptive Alchemy AI Fluency Index"; shorthand: "AI Fluency Index" after first mention
  - HubSpot property naming convention: `ai_fluency_level`, `ai_fluency_track`, `ai_fluency_binding_constraint`, etc. (not full brand name in property keys)
  - Report level-label format: "Level 3 — Practicing" (not "AI Fluency Index Level 3")
  - Schema.org `name` field value for Service and FAQPage structured data
  - Dual-label strategy: "AI Readiness Assessment" for service page H1/URL/meta; "AI Readiness Check" for /check H1/meta
- **Acceptance:** S13
- **Beads:** TBD (new issue P2-B-1)
- **Complexity:** S

### P2-B-2: .docs/canonical/assessments/gdpr-retention-erasure-spec.md

- **What:** Data governance document per C-17. Covers:
  - Complete list of HubSpot contact properties stored (ai_fluency_level, company_email_domain, dimension scores, workflow_focus, role, track_tag, framing_variant)
  - Retention period per property
  - Erasure request process (how to honor GDPR Art. 17 requests via HubSpot)
  - Consent gate flow documentation (C-15: HubSpot failure = no report unlock)
  - Benchmark n-count preservation approach (C-19: anonymized aggregate stats only, never individual PII in benchmark cards)
  - Lawful basis: consent (Art. 6(1)(a)) — not legitimate interest — per charter §3.4 AA-3
- **Acceptance:** Phase 2 lock (S16), C-17
- **Beads:** TBD (new issue P2-B-2)
- **Complexity:** M

### P2-B-3: .docs/canonical/assessments/aeo-query-map.md

- **What:** Two linked documents (aeo-query-map.md contains the query list; faq-schema-content.md in P2-C-1 contains the JSON-LD-ready FAQ copy):
  - 10–15 target AI queries at three intent levels:
    - Informational (≥3): "what is AI readiness", "AI readiness definition for teams", "how do I know if my team is ready for AI"
    - Navigational (≥3): "AI readiness assessment Adaptive Alchemy", "AI Fluency Index check", "free AI readiness check for teams"
    - Transactional (≥3): "free AI readiness check for teams", "AI readiness assessment Europe", "book AI readiness assessment"
  - Each query annotated with intent level and likely AI engine that would surface it (Perplexity/ChatGPT Browse/Google SGE)
- **Acceptance:** S14
- **Beads:** TBD (new issue P2-B-3)
- **Complexity:** M

### P2-B-4: .docs/canonical/assessments/intake-questionnaire.md

- **What:** Full survey instrument design per charter §2.7:
  - Intake routing question: "Has your team used AI tools in actual work, at least occasionally?" (S32)
  - Framing routing question: "Are you assessing primarily your own practice or your team's readiness?" (S19/S19b)
  - 6-dimension Likert questions with maturity-calibrated anchors (what "agree" means at Level 2 vs Level 4)
  - Scenario questions: 4 answer choices per question; one correct; each wrong choice reveals a specific failure mode; all options are behavior-based concrete observables (S30)
  - Contextual questions: role, workflow focus, tool environment, data sensitivity
  - All answer options: concrete, observable behaviors — zero abstract readiness descriptors (S30)
  - Branching spec for individual vs. team framing routing (S19, S19b per UQ-19 decision)
  - Track A early-exit flow for "No" answer to intake routing question (S32)
- **Acceptance:** S19, S19b, S30, S32, S32b, S16 (gate condition 3)
- **Beads:** TBD (new issue P2-B-4)
- **Complexity:** L

---

## Wave P2-C — AEO Artifacts (After P2-A-3 + P2-B-3)

### P2-C-1: .docs/canonical/assessments/faq-schema-content.md

- **What:** 10–15 Q&A pairs formatted for direct FAQPage JSON-LD injection on /check page. Cross-referenced to aeo-query-map.md. Each Q&A anchored to at least one target query from P2-B-3.
- **Acceptance:** S14, S09 (FAQPage JSON-LD present in static HTML — content from this doc)
- **Beads:** TBD (new issue P2-C-1)
- **Complexity:** M

### P2-C-2: .docs/canonical/assessments/sample-report-spec.md

- **What:** Content and format specification for a static sample Astro page (the citable artifact for AI engines per UQ-16). Contains:
  - Level 3 ("Practicing") example score with plausible dimension scores
  - Section-by-section content brief for all 9 report sections
  - Format spec: which sections are prose, which are visual (with alt-text specifications for the static version)
  - SEO/AEO metadata for the static page
- **Acceptance:** UQ-16, S16 (gate condition 5 — AEO/GEO prerequisites complete)
- **Beads:** TBD (new issue P2-C-2)
- **Complexity:** M

---

## Wave P3-A — Foundation (Walking Skeleton — can start in parallel with P2)

> **Note:** P3-A establishes types and file structure. It can start before Phase 2 locks since types.ts mirrors the architect's interface contracts (already specified in the backlog). P3-A-3 depends on P3-A-1.

### P3-A-1: src/lib/assessment/types.ts

- **What:** All TypeScript interfaces from the architect's backlog Interface Contracts section:
  - `AssessmentIslandProps`
  - `QuestionType`, `SurveyQuestion`, `DimensionKey`
  - `MaturityLevel`, `BandLabel`, `TrackAssignment`
  - `DimensionScore`, `AssessmentScore` (with `bindingConstraint: DimensionKey | null` — C-21)
  - `HubSpotField`, `HubSpotSubmission`
  - `BenchmarkCard`, `TransitionRoadmap`, `TrackCTA`, `ReportData`
  - C-22: `SurveyOption.value` is discriminated union (`number` for Likert/scenario, `string` for contextual)
- **TDD cycle:** RED — write types test asserting discriminated union compiles correctly; GREEN — implement types; REFACTOR — assess; COMMIT.
- **Acceptance:** S12 (bindingConstraint nullable), S18 (AssessmentScore shape), S22 (HubSpotSubmission shape), S23 (ReportData shape)
- **Beads:** TBD (new issue P3-A-1)
- **Complexity:** S

### P3-A-2: src/lib/assessment/email-blocklist.ts

- **What:** Version-controlled config array (S21c). V1 domains: gmail.com, hotmail.com, yahoo.com, outlook.com, icloud.com. Module exports `EMAIL_BLOCKLIST: ReadonlyArray<string>` and a pure `isBlockedDomain(email: string): boolean` function. No other logic.
- **TDD cycle:** Unit tests first — `isBlockedDomain('user@gmail.com')` = true, `isBlockedDomain('user@acme.com')` = false, blocklist array is importable without touching validation logic.
- **Acceptance:** S21, S21b, S21c
- **Beads:** TBD (new issue P3-A-2)
- **Complexity:** S

### P3-A-3: src/pages/check/index.astro walking skeleton (island mount placeholder)

- **What:** Upgrade P1-B-2 (the static shell) by adding the `AssessmentIsland` component reference with `client:visible`. At this stage AssessmentIsland renders a placeholder string "Assessment loading…". This establishes the island hydration contract for S17 testing before the real island is built.
- **Depends on:** P3-A-1 (types), P1-B-2 (shell exists)
- **Acceptance:** S17 (React island hydrates on viewport entry, renders without JS errors)
- **Beads:** TBD (new issue P3-A-3)
- **Complexity:** S

---

## Wave P3-B — Core Logic (After P3-A)

### P3-B-1: src/lib/assessment/scoring.ts

- **What:** Pure gate scoring engine. Takes `ReadonlyArray<SurveyAnswer>` + threshold matrix (imported from a static data module derived from P2-A-2) → returns `AssessmentScore`. Key behaviors:
  - Level = highest level where ALL 6 dimension scores meet threshold (not average)
  - `bindingConstraint`: the dimension failing the gate at the current level; null at Level 5 (C-21)
  - `trackAssignment`: Level 1–2 → A; Level 3–4 → B; Level 4–5 AND D6 ≥ Track C threshold → C; Level 4 AND D6 below threshold → B
  - Fully deterministic, no side effects, no async
- **TDD cycle:** RED — unit test using fixture from S12 (all dims 4/4 except Governance 2/4; expect level=3, bindingConstraint='governance-systematization'); GREEN; REFACTOR; COMMIT. Repeat for Track routing S25a–S25d.
- **BDD scenarios:** S12, S18, S25a, S25b, S25c, S25d
- **Beads:** TBD (new issue P3-B-1)
- **Complexity:** M

### P3-B-2: src/lib/assessment/routing.ts

- **What:** Track A/B/C routing logic extracted from scoring.ts as a separate pure module. Exports `assignTrack(score: AssessmentScore): TrackAssignment`. Rationale: isolates routing rule changes from scoring changes.
- **TDD cycle:** Unit tests for each S25 case.
- **BDD scenarios:** S25a, S25b, S25c, S25d
- **Beads:** TBD (new issue P3-B-2)
- **Complexity:** S

### P3-B-3: src/components/assessment/SurveyFlow.tsx

- **What:** Multi-step React form. State: current step index + accumulated answers. Structure:
  - Step 0: intake routing question ("Has your team used AI tools in actual work, at least occasionally?"). "No" → early exit screen describing Track A / Foundations Workshop; no email gate for early-exit users (S32).
  - Step 1: framing routing question (individual vs. team; S19/S19b)
  - Steps 2–N: Likert + scenario + contextual questions from P2-B-4
  - Visible step counter or progress bar throughout (S17 requirement, AA-2)
  - On completion: calls scoring.ts, passes `AssessmentScore` up to `AssessmentIsland`
  - All answer labels: behavior-based concrete observables, no abstract descriptors (S30)
  - C-20 flow: Survey complete → pass score to parent → parent shows GateScoringExplanation → then ScoreDisplay → then EmailGate
- **TDD cycle:** Unit tests for early-exit path; integration test that step counter increments; test that score is calculated on final submission.
- **BDD scenarios:** S17, S18, S19, S19b, S30, S32, S32b
- **Beads:** TBD (new issue P3-B-3)
- **Complexity:** L

---

## Wave P3-C — Email Gate (After P3-B-1; parallel with P3-B-3)

### P3-C-1: src/lib/assessment/hubspot.ts

- **What:** HubSpot Forms API v3 POST client. Exports `submitToHubSpot(submission: HubSpotSubmission): Promise<void>`. Key requirements:
  - Targets v3 endpoint (not v2)
  - `legalConsentOptions` in request body (S22)
  - Hidden fields: ai_fluency_level, company_email_domain, dimension scores, track tag, framing_variant
  - Error handling: throws on non-2xx so caller can block report unlock (C-15)
  - **C-24 discipline:** Development stub (`hubspot.stub.ts`) carries a failing integration test to prevent shipping stub to prod. The production client is the default export; stub is guarded by `NODE_ENV !== 'production'` check + test asserts.
- **TDD cycle:** Unit test with mocked fetch for happy path (2xx → resolves); error path (non-2xx → throws); C-24 test: production build does not import stub.
- **BDD scenarios:** S22, S22b
- **Beads:** TBD (new issue P3-C-1)
- **Complexity:** M

### P3-C-2: src/components/assessment/EmailGate.tsx

- **What:** Email gate form component. Renders after ScoreDisplay (C-20 flow). Contains:
  - Email input with `onInput` blocklist validation using `email-blocklist.ts` (fires before submit, not only on submit — S21)
  - Inline error: "Please use your work email — assessment results are designed to be shared with your team." (S21)
  - Explicit GDPR opt-in checkbox with label stating: what data is stored (maturity level, dimension scores, workflow focus, role) + that it will be used to send an email sequence (S20)
  - Submit button inactive if blocklist match OR consent checkbox unchecked (S22b)
  - On submit: calls hubspot.ts; on success → unlocks ReportRenderer; on failure → "Unable to save your results — try again" error (C-15: no partial report unlock)
- **TDD cycle:** Test blocklist firing onInput; test consent required before submission; test HubSpot failure blocks report.
- **BDD scenarios:** S20, S21, S21b, S22, S22b
- **Beads:** TBD (new issue P3-C-2)
- **Complexity:** M

---

## Wave P3-D — Report Renderer (After P3-B-3 + P3-C-2)

### P3-D-1: src/components/assessment/ScoreDisplay.tsx

- **What:** Ungated component — shows immediately after survey completion, before email gate (C-20). Displays:
  - Maturity level number + label (e.g., "Level 3 — Practicing")
  - One-sentence headline finding from `AssessmentScore.headlineFinding`
  - No dimension detail, no report — just level + headline
- **TDD cycle:** Snapshot test with Level 3 fixture; assert headline is present.
- **BDD scenarios:** S18
- **Beads:** TBD (new issue P3-D-1)
- **Complexity:** S

### P3-D-2: src/components/assessment/JourneyStrip.tsx

- **What:** 5-node linear progress bar. Props: `currentLevel: MaturityLevel`. Renders nodes 1–5 with labels; current level visually highlighted (filled circle or accent color). Purely presentational.
- **TDD cycle:** Render Level 3 → assert node 3 has `aria-current="step"` (or equivalent highlighted class); nodes 4–5 are dimmed.
- **BDD scenarios:** S23
- **Beads:** TBD (new issue P3-D-2)
- **Complexity:** S

### P3-D-3: src/components/assessment/DimensionBars.tsx

- **What:** 6 horizontal bars. Props: `dimensionScores: ReadonlyArray<DimensionScore>`, `bindingConstraint: DimensionKey | null`. Renders:
  - Bar per dimension with STRONG / FUNCTIONAL / DEVELOPING / NOT YET label
  - Binding constraint dimension: additional "Fix first" badge
- **TDD cycle:** Render fixture with Governance as binding constraint; assert "Fix first" appears on governance bar only.
- **BDD scenarios:** S12 (binding constraint label), S23
- **Beads:** TBD (new issue P3-D-3)
- **Complexity:** S

### P3-D-4: Recharts install + bundle analysis decision

- **What:** Day-1 Phase 3 action. Run `pnpm add recharts@latest`; run `pnpm build`; analyze the Recharts contribution to the main chunk (gzip size). Decision: if Recharts v3 gzip contribution ≤ 100KB → proceed with Recharts; if > 100KB → activate SVG fallback path for RadarChart.tsx. Document decision in a comment at the top of RadarChart.tsx before implementation begins.
- **BDD scenarios:** S28
- **Beads:** TBD (new issue P3-D-4)
- **Complexity:** S

### P3-D-5: src/components/assessment/RadarChart.tsx

- **What:** Radar chart component. Loaded via `React.lazy` + `Suspense` (dynamic import — never in main bundle). Must be below the fold in the report. Renders:
  - 6 axes, evenly spaced (not ordered by score)
  - Current state: filled shape in brand color at ~40% opacity
  - Level N+1 target: outline at 100% opacity
  - Binding constraint axis: highlighted in accent color
  - No dense gridlines — threshold rings only
  - Implementation path: Recharts `RadarChart` component (or SVG fallback per P3-D-4 decision)
  - Caption: one-line interpretation below the chart
- **TDD cycle:** Mock `React.lazy` in unit test; assert component renders without error using Level 3 fixture with bindingConstraint='governance-systematization'.
- **BDD scenarios:** S23, S27, S28
- **Beads:** TBD (new issue P3-D-5)
- **Complexity:** L

### P3-D-6: src/components/assessment/ReportRenderer.tsx

- **What:** Full 9-section gated report. Receives `ReportData` prop. Assembles all child components in section order:
  1. ScoreDisplay (level + headline)
  2. JourneyStrip (5-node progress)
  3. RadarChart (Suspense-wrapped, dynamic import)
  4. DimensionBars (6 bars + Fix first)
  5. Interpretation (whyYouLandedHere + whatItMayCostYou — framing-variant-aware; individual vs. team copy)
  6. BenchmarkCards (null data → renders third-party citations; n≥5 → AA data; S29)
  7. NextLevel (one transition roadmap only — not full path; 2–3 specific moves; bindingConstraintMove highlighted)
  8. BuildStep (single executable action — not a list)
  9. TrackCTA (A/B/C per routing; framing-variant-aware copy per UQ-19)
  - Methodology note in footer (no AdviceForge references, no placeholders — S30b, S03)
  - UQ-19 framing branch: individual path → first-person + Track B bridge sentence; team path → team framing + direct Track B CTA
- **TDD cycle:** Integration test with Level 3 fixture: assert all 9 sections render; assert section 9 shows Track B CTA; assert benchmark collapses correctly with null data.
- **BDD scenarios:** S23, S24, S25a–S25d, S26, S29, S30, S30b
- **Beads:** TBD (new issue P3-D-6)
- **Complexity:** XL

---

## Wave P3-E — Island Assembly (After All P3-D Complete)

### P3-E-1: src/components/assessment/AssessmentIsland.tsx

- **What:** Top-level client:visible React island. Owns all state for the full assessment flow. State machine:
  - `idle` → `survey` (SurveyFlow) → `gate-explanation` (GateScoringExplanationScreen — C-20) → `score-display` (ScoreDisplay ungated) → `email-gate` (EmailGate) → `report` (ReportRenderer)
  - Receives `AssessmentScore` from SurveyFlow; builds `ReportData` from score + static content maps
  - Props: `hubspotPortalId: string`, `hubspotFormGuid: string` (passed from Astro shell env vars)
- **TDD cycle:** Test state transitions: survey complete → gate explanation renders; gate explanation next → ScoreDisplay renders; email submitted successfully → ReportRenderer renders.
- **BDD scenarios:** S17 (island hydrates), S18, S20, S22, S24, S26
- **Beads:** TBD (new issue P3-E-1)
- **Complexity:** M

### P3-E-2: Wire complete src/pages/check/index.astro

- **What:** Replace island placeholder comment (from P3-A-3 / P1-B-2) with real `<AssessmentIsland client:visible hubspotPortalId={env.PUBLIC_HUBSPOT_PORTAL_ID} hubspotFormGuid={env.PUBLIC_HUBSPOT_FORM_GUID} />`. Add Astro env var type declarations.
- **Acceptance:** Full walking skeleton slice works end-to-end in dev.
- **BDD scenarios:** S09, S17
- **Beads:** TBD (new issue P3-E-2)
- **Complexity:** S

### P3-E-3: JSON-LD Service + FAQPage schema on /check page

- **What:** Using FAQ content from P2-C-1 and brand spec from P2-B-1, add Service + FAQPage JSON-LD blocks to the static `<head>` section of `/check/index.astro`. Must be in raw HTML (not injected by JS) per S09.
- **Depends on:** P2-C-1 (FAQ content), P2-B-1 (Schema.org name field value), P3-E-1 (island wired)
- **Acceptance:** S09 (FAQPage and Service JSON-LD present in raw HTML), S14
- **Beads:** TBD (new issue P3-E-3)
- **Complexity:** S

---

## Wave P3-F — Quality Gate (After P3-E)

### P3-F-1: Lighthouse CI threshold enforcement

- **What:** Verify `.lhcirc` (or `lighthouserc.json`) fails the build if LCP > 2.5s, INP > 200ms, CLS > 0.1. Confirm these assertions are active and run against `/check` page specifically. If config needs changes, make them now.
- **Acceptance:** S27 (Lighthouse CI thresholds enforced from first Phase 3 build)
- **Beads:** TBD (new issue P3-F-1)
- **Complexity:** S

### P3-F-2: HubSpot stub absent in production build (C-24)

- **What:** Integration test that asserts the HubSpot stub (if it exists for dev/test) is not importable in the production bundle. Use `NODE_ENV=production` build + `grep` or bundle analyzer to verify. This test should be a failing test in P3-C-1 that becomes green here.
- **Acceptance:** C-24 — stub absent in prod; integration test passes
- **Beads:** TBD (new issue P3-F-2)
- **Complexity:** M

### P3-F-3: Walking skeleton BDD scenarios pass

- **What:** Run through scenarios S09, S17, S18, S20, S22, S24, S27 manually or via E2E. All 7 must be green before Phase 3 is considered shippable.
- **Acceptance:** All 7 walking skeleton scenarios pass; Lighthouse CI green; HubSpot submission confirmed with real portal ID from EU IP
- **Beads:** TBD (new issue P3-F-3)
- **Complexity:** M

---

## TDD Cycle Notes (Phase 3 Code Tasks)

All Phase 3 code tasks follow the double-loop TDD pattern:

```
OUTER (BDD): acceptance scenario → failing BDD test
  INNER (unit): RED → GREEN → REFACTOR → COMMIT
  ...repeat per unit
OUTER: BDD scenario passes → commit
```

Key TDD reminders:
- Test behavior through public API — not implementation details
- Factory functions for test data; no `let` / `beforeEach` state mutation
- `email-blocklist.ts` and `scoring.ts` are pure functions — unit test without mocks
- `hubspot.ts` tests use `fetch` mock (or MSW); never call real HubSpot in unit tests
- React component tests use `@testing-library/react`; test rendered output, not internal state
- C-24 test must be in the test suite from day 1 of P3-C-1

---

## Commit Message Templates

| Wave | Template |
|---|---|
| P1-A-1 | `docs(I02-AIASSESS): keyword research report for AI readiness assessment cluster` |
| P1-A-2 | `docs(I02-AIASSESS): confirm /check URL slug and dual-label strategy; update ADR I02-006, I02-007` |
| P1-B-1 | `content(I02-AIASSESS): add /services/ai-readiness-assessment page (S01, S02, S03)` |
| P1-B-2 | `feat(I02-AIASSESS): add /check static shell — H1, meta, intro para (S09, S10)` |
| P1-C-1/2/3 | `content(I02-AIASSESS): persona CTA updates — founders, ctos, stalled-ai-projects (S04–S06)` |
| P1-D-1 | `content(I02-AIASSESS): add Assess tier to homepage ServiceCards (S07)` |
| P2-A-1 | `docs(I02-AIASSESS): AI Fluency Index v1 spec — 5 levels, 6 dimensions (S11, S13)` |
| P2-A-2 | `docs(I02-AIASSESS): 5×6 dimension-threshold matrix — gate scoring + binding constraint (S11, S12)` |
| P2-A-3 | `docs(I02-AIASSESS): five transition roadmaps (S16 gate condition 2)` |
| P2-B-1 | `docs(I02-AIASSESS): AI Fluency Index brand usage spec (S13, UQ-17)` |
| P2-B-2 | `docs(I02-AIASSESS): GDPR retention and erasure spec (C-17)` |
| P2-B-3 | `docs(I02-AIASSESS): AEO/GEO target query map — 10–15 queries, 3 intent levels (S14)` |
| P2-B-4 | `docs(I02-AIASSESS): intake questionnaire — Likert, scenario, contextual questions (S19, S30, S32)` |
| P2-C-1 | `docs(I02-AIASSESS): FAQ schema content — 10–15 Q&As for FAQPage JSON-LD (S09, S14)` |
| P2-C-2 | `docs(I02-AIASSESS): sample report spec — Level 3 example (UQ-16)` |
| P3-A-1 | `feat(I02-AIASSESS): assessment types.ts — all interfaces and discriminated unions (C-21, C-22)` |
| P3-A-2 | `feat(I02-AIASSESS): email-blocklist.ts — v1 domains, pure isBlockedDomain function (S21c)` |
| P3-A-3 | `feat(I02-AIASSESS): /check walking skeleton — island placeholder hydrates (S17)` |
| P3-B-1 | `feat(I02-AIASSESS): scoring.ts — gate scoring engine + binding constraint (S12, S18, S25a–d)` |
| P3-B-2 | `feat(I02-AIASSESS): routing.ts — Track A/B/C assignment (S25a–d)` |
| P3-B-3 | `feat(I02-AIASSESS): SurveyFlow.tsx — multi-step form, intake routing, progress bar (S17–S19, S30, S32)` |
| P3-C-1 | `feat(I02-AIASSESS): hubspot.ts — Forms API v3 client + C-24 stub discipline (S22)` |
| P3-C-2 | `feat(I02-AIASSESS): EmailGate.tsx — blocklist validation, GDPR consent (S20–S22b)` |
| P3-D-1 | `feat(I02-AIASSESS): ScoreDisplay.tsx — ungated level + headline (S18)` |
| P3-D-2 | `feat(I02-AIASSESS): JourneyStrip.tsx — 5-node progress bar (S23)` |
| P3-D-3 | `feat(I02-AIASSESS): DimensionBars.tsx — 6 bars + Fix first (S12, S23)` |
| P3-D-4 | `chore(I02-AIASSESS): Recharts v3 install + bundle analysis decision (S28)` |
| P3-D-5 | `feat(I02-AIASSESS): RadarChart.tsx — dynamic import, current+target overlay (S23, S27)` |
| P3-D-6 | `feat(I02-AIASSESS): ReportRenderer.tsx — 9-section full report (S23–S30b)` |
| P3-E-1 | `feat(I02-AIASSESS): AssessmentIsland.tsx — state machine, client:visible (S17–S26)` |
| P3-E-2 | `feat(I02-AIASSESS): wire /check/index.astro — island + env props (S09, S17)` |
| P3-E-3 | `feat(I02-AIASSESS): Service + FAQPage JSON-LD on /check (S09, S14)` |
| P3-F-1 | `chore(I02-AIASSESS): verify Lighthouse CI thresholds for /check (S27)` |
| P3-F-2 | `test(I02-AIASSESS): HubSpot stub absent in prod build (C-24)` |
| P3-F-3 | `test(I02-AIASSESS): walking skeleton BDD green — S09, S17, S18, S20, S22, S24, S27` |

---

## Dependency Graph

```
P1-A-1 (keyword research)
  └── P1-A-2 (URL/label decisions)
        ├── P1-B-1 (service page)          ← also needs founder methodology note
        │     └── P1-D-1 (ServiceCards)
        ├── P1-B-2 (/check shell)
        ├── P1-C-1 (founders CTA)
        ├── P1-C-2 (ctos CTA)
        └── P1-C-3 (stalled-ai-projects)

P2-A-1 (AI Fluency Index spec)
  ├── P2-A-2 (5×6 matrix)
  │     └── P2-A-3 (transition roadmaps)
  │           ├── P2-C-1 (FAQ schema content)  ← also needs P2-B-3
  │           └── P2-C-2 (sample report spec)  ← also needs P2-B-3
  ├── P2-B-1 (brand usage spec)
  ├── P2-B-2 (GDPR spec)
  ├── P2-B-3 (AEO query map)
  └── P2-B-4 (intake questionnaire)

P3-A-1 (types.ts)
  ├── P3-A-2 (email-blocklist.ts)           [parallel]
  └── P3-A-3 (/check walking skeleton)
        ├── P3-B-1 (scoring.ts)
        │     ├── P3-B-2 (routing.ts)       [parallel]
        │     ├── P3-B-3 (SurveyFlow.tsx)
        │     │     └── P3-D-1, P3-D-2, P3-D-3  [parallel after P3-C-2]
        │     └── P3-C-1 (hubspot.ts)       [parallel with P3-B-3]
        │           └── P3-C-2 (EmailGate.tsx)
        │                 └── P3-D-4 (Recharts decision)  [day-1 action]
        │                       └── P3-D-5 (RadarChart.tsx)
        │                             └── P3-D-6 (ReportRenderer.tsx) ← needs D1–D5
        └── P3-E-1 (AssessmentIsland.tsx)   ← needs all P3-D
              ├── P3-E-2 (wire /check)
              └── P3-E-3 (JSON-LD)         ← also needs P2-C-1
                    └── P3-F-1, P3-F-2, P3-F-3  [quality gate]
```

---

## Effort Estimates

> Repo has <4 weeks of commit history for this initiative. Using size-label heuristics calibrated to AI-assisted pace.

| Size | Baseline | AI-assisted |
|---|---|---|
| S (trivial/small) | 0.5–1h | ~20–30 min |
| M (medium) | 2–4h | ~1–2h |
| L (large) | 1–2 days | ~3–6h |
| XL (complex) | 3–5 days | ~1–2 days |

| Wave | Tasks | AI-assisted estimate |
|---|---|---|
| P1 (5 new + 4 existing) | 5 new tasks | ~3–4h |
| P2 (9 tasks, all M/L) | 9 tasks | ~12–18h |
| P3-A (3 tasks, all S) | 3 tasks | ~1.5h |
| P3-B (3 tasks, M/L) | 3 tasks | ~5–8h |
| P3-C (2 tasks, M each) | 2 tasks | ~3–4h |
| P3-D (6 tasks, S/L/XL) | 6 tasks | ~8–12h |
| P3-E (3 tasks, S/M) | 3 tasks | ~2–3h |
| P3-F (3 tasks, S/M) | 3 tasks | ~2–3h |
| **Total Phase 3** | **20 new tasks** | **~22–34h** |
| **All phases** | **34 tasks** | **~37–60h** |

**P50:** ~45h | **P85:** ~55h | **P95:** ~65h
*(Confidence interval reflects framework content quality risk in P2 — founder sign-off could add back-and-forth cycles.)*

---

## Execution Recommendation

- **Method:** Subagent-driven development, wave by wave
- **Phase 1 + Phase 2:** Orchestrator executes docs/content tasks directly; T2 (Gemini) for keyword research (P1-A-1). No engineering-lead needed — no production code.
- **Phase 3:** `engineering-lead` with `subagent-driven-development` skill. Dispatch P3-A tasks in parallel; P3-B–P3-D in dependency order; P3-F as final gate.
- **Rationale:** 20+ independent-then-dependent code tasks in Phase 3 map exactly to the subagent-driven pattern. Phase 1/2 are docs-only and can be parallelized by the orchestrator without spawning an engineering-lead.
- **Cost tier notes:**
  - P1-A-1 (keyword research): T2 — Gemini via `dispatch-external.sh`
  - P2 doc authoring: T2 — Gemini for drafts; T3 (sonnet) for framework design that requires judgment (P2-A-2 matrix, P2-B-4 questionnaire)
  - P3 code tasks: T3 (sonnet) — TypeScript strict mode, TDD cycle, complex state machine
  - P3-F quality gate review: mixed-model panel (T2 + T3) for model diversity

---

## Beads Seeding Commands

Run the following `bd create` commands to seed all new tasks. Existing issues (dj5, m4d, k1u, efj) are already in Beads — do not recreate them.

After creating all tasks, capture the returned IDs and run the `bd dep add` commands to wire dependencies.

### Phase 1 — New Tasks

```bash
# P1-C-1
P1C1=$(bd create \
  --title="P1-C-1: /for/founders hero.secondaryCta — assessment CTA" \
  --description="Update src/content/personas/founders.md frontmatter. Add hero.secondaryCta with interim booking link for scoping call. CTA copy framed for founder audience. Visible above fold at 1280px. Add ctaPhase3Href field for easy Phase 3 swap. BDD: S04. Acceptance: page contains CTA referencing free AI readiness check or scoping call, framed for founder audience, links to booking page, visible above fold." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P1C1=$P1C1"

# P1-C-2
P1C2=$(bd create \
  --title="P1-C-2: /for/ctos hero.secondaryCta — assessment CTA" \
  --description="Update src/content/personas/ctos.md frontmatter. Add hero.secondaryCta with CTA copy framed for technical leadership. Copy must be distinct from founders CTA. BDD: S05. Acceptance: CTA present, framed for technical leadership, distinct from /for/founders copy, links to booking page." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P1C2=$P1C2"

# P1-C-3
P1C3=$(bd create \
  --title="P1-C-3: /for/stalled-ai-projects — full rewrite (clarity framing)" \
  --description="Full content rewrite per charter §1.1 and I01 T2-5 notes. Lead section: clarity-before-commitment framing (not rescue narrative). Introduce maturity spectrum: one line per level (Curious through Agent-Ready). Primary CTA: scoping call booking link positioned as 'Find your maturity level'. Clarify page is correct landing for Track A/B buyers (levels 1-4). Hero line candidate: 'Before you know where you're going, you need to know where you actually are.' BDD: S06." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P1C3=$P1C3"
```

### Phase 2 — New Tasks

```bash
# P2-A-1
P2A1=$(bd create \
  --title="P2-A-1: ai-fluency-index-v1-spec.md — master framework spec" \
  --description="Write .docs/canonical/assessments/ai-fluency-index-v1-spec.md. 5-level maturity spine (Curious/Emerging/Practicing/Systematic/Agent-Ready), 6-dimension definitions including Governance as crosscutting concern, agent frontier definition, auditability criteria. No AdviceForge references in external-facing copy. Gate scoring concept introduced. BDD: S11, S13. Acceptance: framework name appears as 'Adaptive Alchemy AI Fluency Index', all 5 levels named, all 6 dimensions defined with AA distinction vs generic frameworks." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P2A1=$P2A1"

# P2-A-2
P2A2=$(bd create \
  --title="P2-A-2: maturity-model-5x6-matrix.md — dimension threshold matrix" \
  --description="Write .docs/canonical/assessments/maturity-model-5x6-matrix.md. 5-row (levels) x 6-column (dimensions) matrix. Each cell: numeric threshold value + band label (STRONG/FUNCTIONAL/DEVELOPING/NOT YET). No TBD cells. Gate scoring rules: level = highest level where ALL 6 thresholds are met. Binding constraint logic (C-21: null at Level 5). Track C Dimension 6 threshold documented numerically. BDD: S11, S12. Acceptance: S11 scenario checks pass (30 cells, no TBD, D6 thresholds at every level)." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P2A2=$P2A2"

# P2-A-3
P2A3=$(bd create \
  --title="P2-A-3: transition-roadmaps.md — 5 level transition roadmaps" \
  --description="Write .docs/canonical/assessments/transition-roadmaps.md. Five roadmaps: 1→2, 2→3, 3→4, 4→5, Level 5 frontier state. Per roadmap: what level change unlocks (concrete benefit), 2-3 specific executable time-estimated moves, binding constraint move. Report shows only next-level roadmap — not full 5-level path. BDD: S16 gate condition 2. Acceptance: all 5 roadmaps present, each has unlocks+moves+binding-constraint-move." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P2A3=$P2A3"

# P2-B-1
P2B1=$(bd create \
  --title="P2-B-1: brand-usage-spec.md — AI Fluency Index brand usage spec" \
  --description="Write .docs/canonical/assessments/brand-usage-spec.md (UQ-17). Canonical name: 'Adaptive Alchemy AI Fluency Index'. Shorthand: 'AI Fluency Index'. HubSpot property naming: ai_fluency_level, ai_fluency_track, ai_fluency_binding_constraint (not full brand name in keys). Report level-label format: 'Level 3 — Practicing'. Schema.org name field value for Service and FAQPage. Dual-label: 'AI Readiness Assessment' for service page H1/meta; 'AI Readiness Check' for /check H1/meta. BDD: S13." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P2B1=$P2B1"

# P2-B-2
P2B2=$(bd create \
  --title="P2-B-2: gdpr-retention-erasure-spec.md — GDPR data governance" \
  --description="Write .docs/canonical/assessments/gdpr-retention-erasure-spec.md (C-17). Full list of HubSpot contact properties with retention periods. Erasure request process (GDPR Art. 17 via HubSpot). Consent gate flow (C-15: HubSpot failure = no report unlock). Benchmark n-count preservation (C-19: anonymized aggregate only, no PII in benchmark cards). Lawful basis: consent Art. 6(1)(a), not legitimate interest. Acceptance: all C-17/C-15/C-19 constraints documented." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P2B2=$P2B2"

# P2-B-3
P2B3=$(bd create \
  --title="P2-B-3: aeo-query-map.md — AEO/GEO target query list" \
  --description="Write .docs/canonical/assessments/aeo-query-map.md. 10-15 target AI queries at three intent levels: informational (≥3), navigational (≥3), transactional (≥3). Each query annotated with intent level and likely AI engine (Perplexity/ChatGPT Browse/Google SGE). BDD: S14. Acceptance: 10-15 queries, ≥3 per intent level, annotations present. Note: faq-schema-content.md (P2-C-1) is the companion document with FAQ copy." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P2B3=$P2B3"

# P2-B-4
P2B4=$(bd create \
  --title="P2-B-4: intake-questionnaire.md — survey instrument design" \
  --description="Write .docs/canonical/assessments/intake-questionnaire.md. Intake routing question (S32), framing routing question (S19/S19b), 6-dimension Likert questions with maturity-calibrated anchors, scenario questions with 4 behavior-based choices + failure mode tags per wrong answer, contextual questions (role/workflow/tools/data sensitivity). All answers: concrete observable behaviors — no abstract descriptors (S30). Track A early-exit flow for 'No' at intake. BDD: S19, S19b, S30, S32, S32b. Acceptance: all answer options behavior-based, branching spec for individual/team framing documented." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P2B4=$P2B4"

# P2-C-1
P2C1=$(bd create \
  --title="P2-C-1: faq-schema-content.md — FAQPage JSON-LD content" \
  --description="Write .docs/canonical/assessments/faq-schema-content.md. 10-15 Q&A pairs formatted for direct FAQPage JSON-LD injection on /check page. Each Q&A anchored to at least one target query from aeo-query-map.md. BDD: S14, S09. Acceptance: 10-15 Q&As, each anchored to a target query, formatted as JSON-LD ready objects." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P2C1=$P2C1"

# P2-C-2
P2C2=$(bd create \
  --title="P2-C-2: sample-report-spec.md — Level 3 sample report brief" \
  --description="Write .docs/canonical/assessments/sample-report-spec.md. Content and format spec for the static sample Astro page (citable artifact for AI engines, UQ-16). Level 3 (Practicing) example score with plausible dimension scores. Section-by-section content brief for all 9 report sections. Format spec: prose vs visual sections, alt-text specs for static version. SEO/AEO metadata for the static page. Acceptance: all 9 sections specced, Level 3 example fully populated, static page brief complete." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P2C2=$P2C2"
```

### Phase 3 — New Tasks

```bash
# P3-A-1
P3A1=$(bd create \
  --title="P3-A-1: src/lib/assessment/types.ts — all TypeScript interfaces" \
  --description="Create src/lib/assessment/types.ts with all interfaces from architect backlog: AssessmentIslandProps, QuestionType, SurveyQuestion, DimensionKey, MaturityLevel, BandLabel, TrackAssignment, DimensionScore, AssessmentScore, HubSpotField, HubSpotSubmission, BenchmarkCard, TransitionRoadmap, TrackCTA, ReportData. C-21: bindingConstraint is DimensionKey|null (null at Level 5). C-22: SurveyOption.value is discriminated union (number for Likert/scenario, string for contextual). TDD: write types test asserting discriminated union compiles correctly. BDD: S12, S18, S22, S23." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3A1=$P3A1"

# P3-A-2
P3A2=$(bd create \
  --title="P3-A-2: src/lib/assessment/email-blocklist.ts — domain blocklist config" \
  --description="Create src/lib/assessment/email-blocklist.ts. Exports: EMAIL_BLOCKLIST: ReadonlyArray<string> (v1: gmail.com, hotmail.com, yahoo.com, outlook.com, icloud.com) and pure isBlockedDomain(email: string): boolean. No other logic — blocklist stays in config array, validation logic stays in function. TDD: unit test isBlockedDomain('user@gmail.com')=true, isBlockedDomain('user@acme.com')=false, blocklist importable without touching validation. BDD: S21, S21b, S21c." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3A2=$P3A2"

# P3-A-3
P3A3=$(bd create \
  --title="P3-A-3: /check/index.astro — walking skeleton island mount" \
  --description="Upgrade P1-B-2 static shell by adding AssessmentIsland component reference with client:visible. At this stage AssessmentIsland renders placeholder text 'Assessment loading...'. Establishes island hydration contract. Depends on P3-A-1 (types) and P1-B-2 (shell exists). TDD: verify React island hydrates on viewport entry, renders without JS errors, step counter visible. BDD: S17." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3A3=$P3A3"

# P3-B-1
P3B1=$(bd create \
  --title="P3-B-1: src/lib/assessment/scoring.ts — gate scoring engine" \
  --description="Create src/lib/assessment/scoring.ts. Pure gate scoring engine: takes ReadonlyArray<SurveyAnswer> + threshold matrix → returns AssessmentScore. Level = highest level where ALL 6 dimension scores meet threshold (not average). bindingConstraint = dimension failing the gate at current level; null at Level 5 (C-21). trackAssignment: Level 1-2→A, Level 3-4→B, Level 4-5 AND D6≥threshold→C, Level 4 AND D6 below threshold→B. Fully deterministic, no side effects, no async. TDD RED: unit test from S12 fixture (5 dims 4/4, Governance 2/4 → level=3, bindingConstraint='governance-systematization'). BDD: S12, S18, S25a-S25d." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3B1=$P3B1"

# P3-B-2
P3B2=$(bd create \
  --title="P3-B-2: src/lib/assessment/routing.ts — Track A/B/C routing" \
  --description="Create src/lib/assessment/routing.ts. Pure module: exports assignTrack(score: AssessmentScore): TrackAssignment. Extracted from scoring.ts to isolate routing rule changes. TDD: unit tests for all 4 S25 cases (S25a Level 1-2→A, S25b Level 3-4→B, S25c Level 4-5 high D6→C, S25d Level 4 low D6→B). BDD: S25a, S25b, S25c, S25d." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3B2=$P3B2"

# P3-B-3
P3B3=$(bd create \
  --title="P3-B-3: SurveyFlow.tsx — multi-step form with intake routing" \
  --description="Create src/components/assessment/SurveyFlow.tsx. Multi-step React form. Step 0: intake routing question ('Has your team used AI tools in actual work?'). No answer → early exit screen + Track A description + no email gate (S32). Step 1: framing routing question (individual vs team, S19/S19b). Steps 2-N: Likert + scenario + contextual questions from P2-B-4. Visible step counter/progress bar throughout (S17, AA-2). On completion: calls scoring.ts, passes AssessmentScore up. All answer labels: behavior-based concrete observables (S30). C-20: Survey → parent shows GateScoringExplanation → ScoreDisplay → EmailGate. TDD: test early-exit path, step counter increments, score calculated on final submission. BDD: S17, S18, S19, S19b, S30, S32, S32b." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3B3=$P3B3"

# P3-C-1
P3C1=$(bd create \
  --title="P3-C-1: src/lib/assessment/hubspot.ts — HubSpot Forms v3 client" \
  --description="Create src/lib/assessment/hubspot.ts. HubSpot Forms API v3 POST client. Exports submitToHubSpot(submission: HubSpotSubmission): Promise<void>. Targets v3 endpoint. legalConsentOptions in request body (S22). Hidden fields: ai_fluency_level, company_email_domain, dimension scores, track tag, framing_variant. Error handling: throws on non-2xx so caller blocks report unlock (C-15). C-24 discipline: hubspot.stub.ts carries a FAILING integration test to prevent shipping stub to prod; production client is default export; stub guarded by NODE_ENV check + test asserts. TDD: unit test mocked fetch happy path (2xx→resolves), error path (non-2xx→throws), C-24 test: prod build does not import stub. BDD: S22, S22b." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3C1=$P3C1"

# P3-C-2
P3C2=$(bd create \
  --title="P3-C-2: EmailGate.tsx — work email + GDPR consent form" \
  --description="Create src/components/assessment/EmailGate.tsx. Renders after ScoreDisplay (C-20 flow). Email input with onInput blocklist validation (email-blocklist.ts, fires before submit — S21). Inline error: 'Please use your work email — assessment results are designed to be shared with your team.' Explicit GDPR opt-in checkbox: label states data stored (maturity level, dimension scores, workflow focus, role) + used to send email sequence (S20). Submit inactive if blocklist match OR consent unchecked (S22b). On submit: calls hubspot.ts; success→unlock ReportRenderer; failure→'Unable to save your results — try again' (C-15: no partial unlock). TDD: blocklist onInput test, consent required test, HubSpot failure blocks report. BDD: S20, S21, S21b, S22, S22b." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3C2=$P3C2"

# P3-D-1
P3D1=$(bd create \
  --title="P3-D-1: ScoreDisplay.tsx — ungated maturity level display" \
  --description="Create src/components/assessment/ScoreDisplay.tsx. Ungated — shows immediately after survey completion before email gate (C-20). Displays: maturity level number + label (e.g. 'Level 3 — Practicing') + one-sentence headline finding from AssessmentScore.headlineFinding. No dimension detail, no full report. TDD: snapshot test with Level 3 fixture, assert headline present. BDD: S18." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3D1=$P3D1"

# P3-D-2
P3D2=$(bd create \
  --title="P3-D-2: JourneyStrip.tsx — 5-node linear progress bar" \
  --description="Create src/components/assessment/JourneyStrip.tsx. 5-node linear progress bar. Props: currentLevel: MaturityLevel. Renders nodes 1-5 with level labels. Current level visually highlighted. Purely presentational. TDD: render Level 3 → assert node 3 has aria-current='step' or equivalent; nodes 4-5 dimmed. BDD: S23." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3D2=$P3D2"

# P3-D-3
P3D3=$(bd create \
  --title="P3-D-3: DimensionBars.tsx — 6 dimension bars with Fix first flag" \
  --description="Create src/components/assessment/DimensionBars.tsx. Props: dimensionScores: ReadonlyArray<DimensionScore>, bindingConstraint: DimensionKey|null. Renders 6 horizontal bars with STRONG/FUNCTIONAL/DEVELOPING/NOT YET labels. Binding constraint dimension gets additional 'Fix first' badge. TDD: render fixture with Governance as binding constraint; assert 'Fix first' on governance bar only. BDD: S12 (binding constraint label), S23." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3D3=$P3D3"

# P3-D-4
P3D4=$(bd create \
  --title="P3-D-4: Recharts v3 install + bundle analysis decision (Day 1)" \
  --description="Day-1 Phase 3 action (S28). Run pnpm add recharts@latest; run pnpm build; analyze Recharts v3 gzip contribution to main chunk. Decision: if ≤100KB → proceed with Recharts; if >100KB → activate SVG fallback for RadarChart.tsx. Document decision as comment at top of RadarChart.tsx before any implementation begins. BDD: S28. Acceptance: build analysis recorded with exact gzip size; decision documented before radar chart work starts." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3D4=$P3D4"

# P3-D-5
P3D5=$(bd create \
  --title="P3-D-5: RadarChart.tsx — dynamic import radar with current+target overlay" \
  --description="Create src/components/assessment/RadarChart.tsx. Loaded via React.lazy + Suspense (never in main bundle). Below the fold only. 6 axes evenly spaced (not ordered by score). Current state: filled shape in brand color ~40% opacity. Level N+1 target: outline at 100% opacity. Binding constraint axis: accent color. Threshold rings only (no dense gridlines). One-line interpretation caption below. Implementation: Recharts RadarChart or SVG fallback per P3-D-4 decision. TDD: mock React.lazy; render Level 3 fixture with bindingConstraint='governance-systematization' → no errors. BDD: S23, S27, S28." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3D5=$P3D5"

# P3-D-6
P3D6=$(bd create \
  --title="P3-D-6: ReportRenderer.tsx — 9-section full gated report" \
  --description="Create src/components/assessment/ReportRenderer.tsx. Receives ReportData prop. 9 sections in order: (1) score+level+headline, (2) JourneyStrip, (3) RadarChart (Suspense-wrapped dynamic import), (4) DimensionBars+Fix-first, (5) Interpretation (framing-variant-aware: individual first-person or team framing), (6) BenchmarkCards (null→third-party citations per S29; n≥5→AA data), (7) NextLevel (one roadmap only, 2-3 moves, bindingConstraintMove highlighted), (8) BuildStep (single action, not a list), (9) TrackCTA (A/B/C, framing-variant-aware per UQ-19). Methodology note in footer (no AdviceForge, no placeholders — S30b, S03). UQ-19 branch: individual→first-person+Track B bridge sentence; team→team framing+direct Track B CTA. TDD: integration test Level 3 fixture: all 9 sections render; section 9 shows Track B CTA; benchmark collapses with null data. BDD: S23, S24, S25a-d, S26, S29, S30, S30b. Complexity: XL." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3D6=$P3D6"

# P3-E-1
P3E1=$(bd create \
  --title="P3-E-1: AssessmentIsland.tsx — client:visible state machine" \
  --description="Create src/components/assessment/AssessmentIsland.tsx. Top-level client:visible React island. Owns all state. State machine: idle→survey (SurveyFlow)→gate-explanation (GateScoringExplanationScreen, C-20)→score-display (ScoreDisplay ungated)→email-gate (EmailGate)→report (ReportRenderer). Receives AssessmentScore from SurveyFlow; builds ReportData from score + static content maps. Props: hubspotPortalId: string, hubspotFormGuid: string (from Astro env). TDD: test state transitions: survey complete→gate explanation; gate explanation next→ScoreDisplay; email submitted successfully→ReportRenderer. BDD: S17, S18, S20, S22, S24, S26." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3E1=$P3E1"

# P3-E-2
P3E2=$(bd create \
  --title="P3-E-2: wire /check/index.astro — AssessmentIsland + env props" \
  --description="Replace island placeholder comment in /check/index.astro with real AssessmentIsland client:visible with hubspotPortalId and hubspotFormGuid props from Astro env vars (PUBLIC_HUBSPOT_PORTAL_ID, PUBLIC_HUBSPOT_FORM_GUID). Add Astro env var type declarations. Acceptance: full walking skeleton slice works end-to-end in dev. BDD: S09, S17." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3E2=$P3E2"

# P3-E-3
P3E3=$(bd create \
  --title="P3-E-3: Service + FAQPage JSON-LD on /check — static HTML schemas" \
  --description="Using FAQ content from P2-C-1 (faq-schema-content.md) and brand spec from P2-B-1, add Service + FAQPage JSON-LD blocks to static <head> of /check/index.astro. Must be in raw HTML — NOT injected by JavaScript (S09 requirement). Schema.org name field from brand-usage-spec. BDD: S09 (both JSON-LD schemas present in raw HTML), S14." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3E3=$P3E3"

# P3-F-1
P3F1=$(bd create \
  --title="P3-F-1: Lighthouse CI threshold enforcement — /check page" \
  --description="Verify .lhcirc (or lighthouserc.json) fails build if LCP >2.5s, INP >200ms, CLS >0.1. Assertions must run against /check page specifically. Make config changes if needed. BDD: S27. Acceptance: Lighthouse CI config asserts all three thresholds; build fails when exceeded." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3F1=$P3F1"

# P3-F-2
P3F2=$(bd create \
  --title="P3-F-2: HubSpot stub absent in production build (C-24 gate)" \
  --description="Integration test: assert HubSpot stub is not importable in production bundle. Use NODE_ENV=production build + bundle analysis or grep to verify stub absence. This test was seeded as FAILING in P3-C-1 — becomes green here. C-24 acceptance: stub absent in prod, integration test passes." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3F2=$P3F2"

# P3-F-3
P3F3=$(bd create \
  --title="P3-F-3: Walking skeleton BDD — S09, S17, S18, S20, S22, S24, S27 all green" \
  --description="Run all 7 walking skeleton scenarios manually or via E2E. All must pass before Phase 3 is shippable: S09 (static HTML crawlable), S17 (island hydrates), S18 (user completes survey sees score), S20 (email gate with consent), S22 (HubSpot v3 submission), S24 (Track B CTA in report), S27 (Lighthouse CI LCP ≤2.5s). Also verify: HubSpot submission confirmed with real portal ID from EU IP; Lighthouse CI thresholds active. Acceptance: all 7 walking skeleton scenarios pass." \
  --type=task --priority=2 --label=I02-AIASSESS \
  | grep -oE '[a-z]+-[a-z0-9]{3}$')
echo "P3F3=$P3F3"
```

### Wire Dependencies

```bash
# P1-B and P1-C depend on dj5 (P1-A)
bd dep add $P1C1 adaptive-alchemy-site-dj5
bd dep add $P1C2 adaptive-alchemy-site-dj5
bd dep add $P1C3 adaptive-alchemy-site-dj5

# P1-D depends on m4d (P1-B-1)
# adaptive-alchemy-site-efj already depends on m4d per existing Beads config

# P2-A chain: P2-A-2 depends on P2-A-1; P2-A-3 depends on P2-A-2
bd dep add $P2A2 $P2A1
bd dep add $P2A3 $P2A2

# P2-B tasks depend on P2-A-1
bd dep add $P2B1 $P2A1
bd dep add $P2B2 $P2A1
bd dep add $P2B3 $P2A1
bd dep add $P2B4 $P2A1

# P2-C tasks depend on P2-A-3 AND P2-B-3
bd dep add $P2C1 $P2A3
bd dep add $P2C1 $P2B3
bd dep add $P2C2 $P2A3
bd dep add $P2C2 $P2B3

# P3-A-3 depends on P3-A-1
bd dep add $P3A3 $P3A1

# P3-B depends on P3-A-3
bd dep add $P3B1 $P3A3
bd dep add $P3B2 $P3A3
bd dep add $P3B3 $P3A3

# P3-C depends on P3-B-1
bd dep add $P3C1 $P3B1
bd dep add $P3C2 $P3B1

# P3-D depends on P3-B-3 + P3-C-2
bd dep add $P3D1 $P3B3
bd dep add $P3D1 $P3C2
bd dep add $P3D2 $P3B3
bd dep add $P3D2 $P3C2
bd dep add $P3D3 $P3B3
bd dep add $P3D3 $P3C2
bd dep add $P3D4 $P3B3
bd dep add $P3D5 $P3D4
bd dep add $P3D6 $P3D1
bd dep add $P3D6 $P3D2
bd dep add $P3D6 $P3D3
bd dep add $P3D6 $P3D5

# P3-E depends on all P3-D complete
bd dep add $P3E1 $P3D6
bd dep add $P3E2 $P3E1
bd dep add $P3E3 $P3E1
bd dep add $P3E3 $P2C1

# P3-F depends on P3-E
bd dep add $P3F1 $P3E2
bd dep add $P3F2 $P3E2
bd dep add $P3F3 $P3E3

# Wire all new tasks to the epic
for ID in $P1C1 $P1C2 $P1C3 $P2A1 $P2A2 $P2A3 $P2B1 $P2B2 $P2B3 $P2B4 $P2C1 $P2C2 $P3A1 $P3A2 $P3A3 $P3B1 $P3B2 $P3B3 $P3C1 $P3C2 $P3D1 $P3D2 $P3D3 $P3D4 $P3D5 $P3D6 $P3E1 $P3E2 $P3E3 $P3F1 $P3F2 $P3F3; do
  bd update $ID --epic adaptive-alchemy-site-k4p 2>/dev/null || true
done
```

**Total new tasks to create: 32** (3 P1-C + 9 P2 + 20 P3)

---

## Unresolved Questions

1. **HubSpot subscription type ID** for `legalConsentOptions.communications[].subscriptionTypeId` — must be confirmed from the AA HubSpot portal before P3-C-1 can be finalized (blocks S22 acceptance).
2. **Methodology provenance note bracketed fields** — founder must supply client engagement count, sectors, and time range before P1-B-1 copy can be signed off (S03 blocker).
3. **Track A interim CTA destination** — booking link URL for the "Find your maturity level" scoping call. Needed before P1-C-1, P1-C-2, P1-C-3 can set the `hero.secondaryCta.href` value.
