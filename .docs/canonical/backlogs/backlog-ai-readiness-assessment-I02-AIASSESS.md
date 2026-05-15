---
title: I02-AIASSESS Architecture Backlog
initiative: I02-AIASSESS
date: 2026-05-15
status: active
author: architect
phase: 2-design
---

# I02-AIASSESS Architecture Backlog

## Architecture Overview

### Stack Constraints

- Astro 6 SSG + GitHub Pages — no server runtime, no serverless in v1
- React 19 + `@astrojs/react` v5 already installed; `framer-motion` present (island pattern proven)
- No chart library installed — Recharts must be added as a production dependency in B03
- Tailwind v4 via Vite plugin; no CSS framework changes needed
- TypeScript strict mode throughout; no `any`, schemas at trust boundaries

### Component Tree

```
src/
  pages/
    check/
      index.astro            ← static shell: H1, meta, JSON-LD, intro para, island mount
  components/
    assessment/
      AssessmentIsland.tsx   ← client:visible top-level island; owns all React state
      SurveyFlow.tsx         ← multi-step form; intake routing + framing routing + questions
      ScoreDisplay.tsx       ← ungated: maturity level label + headline finding (static render)
      EmailGate.tsx          ← work-email input + GDPR consent checkbox; fires HubSpot
      ReportRenderer.tsx     ← gated 9-section report; receives ReportData prop
      JourneyStrip.tsx       ← 5-node linear progress bar; current level highlighted
      DimensionBars.tsx      ← 6 horizontal bars; STRONG/FUNCTIONAL/DEVELOPING/NOT YET labels
      RadarChart.tsx         ← dynamic import; current state + L(n+1) target + binding axis
  lib/
    assessment/
      scoring.ts             ← pure gate scoring engine; no side effects
      routing.ts             ← Track A/B/C routing logic
      types.ts               ← all shared TypeScript types
      email-blocklist.ts     ← version-controlled domain blocklist config array
      hubspot.ts             ← HubSpot Forms v3 API client
```

### Hydration Strategy

`AssessmentIsland.tsx` is the single `client:visible` boundary. Everything inside it is
client-side React. The surrounding `/check/index.astro` shell — H1, meta description,
intro paragraph, JSON-LD — is static HTML rendered at build time and never touches React.
This satisfies S09 (Googlebot crawlability) and S06 (Astro island — UQ-6).

`RadarChart.tsx` is additionally loaded via `React.lazy` + `Suspense` inside the island.
It is below the fold in the report section and must never appear above the fold. This
two-level lazy strategy (island-level `client:visible` + component-level dynamic import)
satisfies S27 (LCP ≤ 2.5s) even before the day-1 Recharts bundle analysis (S28).

---

## Interface Contracts (C-14 Deliverable)

### `AssessmentIslandProps`

```typescript
// Minimal props passed from Astro shell — island self-contains all state
type AssessmentIslandProps = {
  hubspotPortalId: string    // from Astro env / build config
  hubspotFormGuid: string    // from Astro env / build config
}
```

### `SurveyQuestion`

```typescript
type QuestionType = 'likert' | 'scenario' | 'contextual' | 'routing'

type SurveyQuestion = {
  id: string                  // stable ID cross-referenced in scoring.ts
  type: QuestionType
  dimension: DimensionKey | null   // null for routing/contextual questions
  text: string
  options: ReadonlyArray<{
    value: number             // 0–4 for Likert/scenario; string for contextual
    label: string             // behavior-based, observable — no abstract descriptors (S30)
    failureMode?: string      // diagnostic tag for scenario wrong answers (Phase 2 doc)
  }>
}

type DimensionKey =
  | 'task-recognition'
  | 'context-prompting'
  | 'workflow-design'
  | 'judgment-verification'
  | 'delivery-integration'
  | 'governance-systematization'
```

### `AssessmentScore`

```typescript
// Output of scoring.ts — pure function, deterministic
type MaturityLevel = 1 | 2 | 3 | 4 | 5
type BandLabel = 'STRONG' | 'FUNCTIONAL' | 'DEVELOPING' | 'NOT YET'
type TrackAssignment = 'A' | 'B' | 'C'

type DimensionScore = {
  key: DimensionKey
  raw: number           // sum of dimension answers
  band: BandLabel
  meetsThreshold: boolean
  level: MaturityLevel  // highest level where threshold is met for this dimension
}

type AssessmentScore = {
  level: MaturityLevel
  levelLabel: string    // "Practicing" etc. — from framework spec
  headlineFinding: string  // resolved from report content map
  dimensionScores: ReadonlyArray<DimensionScore>
  bindingConstraint: DimensionKey   // the dimension holding the user at current level
  trackAssignment: TrackAssignment
  framingVariant: 'individual' | 'team'   // set by intake routing question (S19/UQ-H)
}
```

### `HubSpotSubmission`

```typescript
// Payload shape for hubspot.ts client — v3 endpoint
type HubSpotField = { name: string; value: string }

type HubSpotSubmission = {
  portalId: string
  formGuid: string
  fields: ReadonlyArray<HubSpotField>
  // Required fields: email, ai_fluency_level, company_email_domain,
  // ai_fluency_track, ai_fluency_binding_constraint, ai_fluency_framing_variant,
  // + one field per dimension score key
  legalConsentOptions: {
    consent: {
      consentToProcess: true    // always true — blocked by form if false
      text: string              // checkbox label text
      communications: ReadonlyArray<{
        value: true
        subscriptionTypeId: number   // HubSpot email subscription type ID
        text: string
      }>
    }
  }
}
```

### `ReportData`

```typescript
// Full report data — produced by combining AssessmentScore with content maps
type BenchmarkCard = {
  stat: string
  label: string
  source: string        // required per AA-1; never null
  year: string
  sampleContext: string // "Based on N=X assessments" or "McKinsey AI Index 2024"
}

type TransitionRoadmap = {
  toLevel: MaturityLevel
  unlocks: string
  moves: ReadonlyArray<string>        // 2–3 items
  bindingConstraintMove: string       // the one move targeting the binding dimension
}

type TrackCTA = {
  track: TrackAssignment
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
}

type ReportData = {
  score: AssessmentScore
  interpretation: {
    whyYouLandedHere: string          // framing-variant-aware
    whatItMayCostYou: string
  }
  benchmarkCards: ReadonlyArray<BenchmarkCard>   // nullable → collapses to external (S29)
  nextLevelRoadmap: TransitionRoadmap
  buildStep: string                   // single executable action (not a list)
  trackCta: TrackCTA
  methodologyNote: string             // populated from framework spec (S03)
}
```

---

## Technology Decision Register

| Decision | Choice | Rationale | Fallback |
|---|---|---|---|
| Radar chart library | Recharts v3 with `React.lazy` | React 19 compatible; tree-shaken radar-only import estimated ~80–100KB gz; simpler than D3 given existing React island | Hand-coded SVG if Recharts gzipped contribution > 100KB after build analysis on Phase 3 day 1 (S28) |
| HubSpot integration | Forms API v3 unauthenticated POST | No backend required; full UX control for mid-flow gate; CORS allowed from any origin | None in v1; blocked Phase 3 if portal ID/form GUID not confirmed (S31) |
| Island hydration | `client:visible` on AssessmentIsland | Assessment is below fold; `client:load` would penalize LCP on every page visit regardless of scroll intent | N/A — this is the correct directive for the placement |
| Email blocklist | Version-controlled config array in `email-blocklist.ts` | Expandable post-launch without touching validation logic; importable and testable in isolation (S21c) | N/A |
| Gate scoring | Strict dimension thresholds, not averages | Level = highest level where all 6 dimensions meet threshold; binding constraint is specific and non-inflatable; required by framework design | N/A — fundamental to AI Fluency Index spec |
| Report delivery | "Email me the report" HubSpot trigger | Eliminates jsPDF ~500KB bundle hit; deferred per UQ-8; email-me is additional HubSpot touchpoint | jsPDF dynamic-imported on button click in v2 only |
| SEO/tool label split | "AI Readiness Assessment" for service page H1/meta; "AI Readiness Check" for /check H1/meta | Namespace separation: paid service vs. free tool; maps to different query clusters (UQ-13) | N/A — confirmed two-label strategy |
| PDF export | Deferred to v2 | UQ-8 confirmed deferral | — |
| URL persistence / re-take delta | Deferred to v2 | UQ-B: incompatible with GitHub Pages static constraint | — |

---

## Phase 2 Documentation File Structure

All Phase 2 deliverables are internal documentation. No public-facing product ships.

```
.docs/canonical/assessments/
  ai-fluency-index-v1-spec.md         ← master framework spec: 5 levels, 6 dimensions,
                                           enterprise differentiators, agent frontier def
  maturity-model-5x6-matrix.md        ← 5×6 threshold matrix; numeric thresholds + band
                                           labels per cell; binding constraint logic; gate
                                           scoring rules (S11, S12)
  transition-roadmaps.md              ← 5 roadmaps: 1→2, 2→3, 3→4, 4→5, at-5 frontier;
                                           per roadmap: unlocks + 2–3 moves + binding constraint
                                           move (S16 gate item)
  intake-questionnaire.md             ← all survey questions with maturity-calibrated anchors;
                                           scenario options with failure-mode tags; routing
                                           question and framing question copy (S30, S32)
  brand-usage-spec.md                 ← canonical name, shorthand, HubSpot property naming
                                           convention, report level-label format, Schema.org
                                           name field value (S13, UQ-17)
  gdpr-retention-erasure-spec.md      ← data retention policy; contact property list and
                                           retention periods; erasure request process; benchmark
                                           n-count preservation approach (C-17, C-15, C-19)
  aeo-query-map.md                    ← 10–15 target AI queries at informational/navigational/
                                           transactional intent; FAQ copy (10–15 Q&As) ready for
                                           FAQPage JSON-LD (S14, UQ-16)
  faq-schema-content.md               ← 10–15 Q&As formatted for direct FAQPage JSON-LD injection
                                           on /check page; cross-referenced to aeo-query-map.md
  sample-report-spec.md               ← content and format spec for the static sample report
                                           Astro page; section-by-section content with Level 3
                                           example score (AEO citable artifact — UQ-16)
```

---

## Wave Breakdown

### B00 — Foundation (walking skeleton contracts)

Can start immediately in parallel with B01. Unblocks all of Phase 3.

| Item | Build | BDD Scenarios | Complexity |
|---|---|---|---|
| B00-1 | `/check/index.astro` static shell — H1 "AI Readiness Check", meta, intro para, placeholder island mount | S09, S10, S17 | S |
| B00-2 | `src/lib/assessment/types.ts` — all TypeScript interfaces from this document | S12, S18, S22, S23 | S |
| B00-3 | `AssessmentIsland.tsx` stub with `client:visible`, renders placeholder text | S17 | S |
| B00-4 | Verify Lighthouse CI configuration (`.lhci` or `lighthouserc`) enforces LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 from first Phase 3 build | S27 | S |

B00-1, B00-2, B00-3 are parallel. B00-4 is parallel with all of B00.

### B01 — Phase 1 Copy

Parallel with B00 and B02. Produces no new code; all changes are content files and frontmatter edits.

| Item | Build | BDD Scenarios | Complexity |
|---|---|---|---|
| B01-1 | `src/content/services/ai-readiness-assessment.md` — new service page YAML + prose | S01, S02, S03 | M |
| B01-2 | `/check` static shell content pass — finalise H1 wording per keyword research | S09, S10 | S |
| B01-3 | Persona CTA updates — `/for/founders` and `/for/ctos` frontmatter `hero.secondaryCta` + `ctaBand` | S04, S05 | S |
| B01-4 | `/for/stalled-ai-projects` lead section rewrite — clarity framing, maturity spectrum one-liner per level | S06 | M |
| B01-5 | Homepage `ServiceCards` Assess tier copy — standalone fixed-scope signal | S07 | S |

B01-1 through B01-5 are parallel. B01-1 is gated on methodology provenance note fields being founder-completed (S03, UQ-14).

### B02 — Phase 2 Framework Docs

Parallel with B00 and B01. Produces all files in the `.docs/canonical/assessments/` tree above.

| Item | Build | BDD Scenarios | Complexity |
|---|---|---|---|
| B02-1 | `ai-fluency-index-v1-spec.md` — 5-level spine, 6 dimensions, governance additions, agent frontier def | S11, S13 | M |
| B02-2 | `maturity-model-5x6-matrix.md` — numeric thresholds, band labels, gate scoring logic, binding constraint logic | S11, S12 | L |
| B02-3 | `transition-roadmaps.md` — all 5 transition roadmaps with unlocks + moves + binding move | S16 | L |
| B02-4 | `intake-questionnaire.md` — all survey questions, Likert anchors, scenario options with failure modes, routing/framing question copy | S19, S30, S32 | L |
| B02-5 | `brand-usage-spec.md` — canonical name, shorthand, HubSpot property names, label format, Schema.org fields | S13 | S |
| B02-6 | `gdpr-retention-erasure-spec.md` — retention periods per property, erasure process, consent gate flow for C-15, n-count preservation for C-19 | C-17, C-15, C-19 | M |
| B02-7 | `aeo-query-map.md` + `faq-schema-content.md` — 10–15 target queries, 10–15 Q&As, intent-level split | S14 | M |
| B02-8 | `sample-report-spec.md` — Level 3 example score, section-by-section content, format spec for static Astro page | UQ-16 | M |
| B02-9 | Benchmark micro-survey — design and dispatch (commission on Phase 2 day 1–2) | S15 | S |

B02-1 must precede B02-2 (matrix derives from spec). B02-2 must precede B02-3. B02-4 is parallel after B02-1. B02-5 through B02-9 are parallel once B02-1 is complete.

### B03 — Phase 3 Core (survey + scoring + email gate)

Prerequisite: Phase 2 locked (S16). B03 and B04 items can be parallelised after interface contracts (B00-2) are in place.

| Item | Build | BDD Scenarios | Complexity |
|---|---|---|---|
| B03-1 | **Day-1 action:** `pnpm add recharts` + build analysis; record gzip size; decide Recharts vs. SVG fallback; document before implementation | S28 | S |
| B03-2 | `scoring.ts` — gate scoring engine, binding constraint identification, track routing | S12, S18, S25a–S25d | M |
| B03-3 | `email-blocklist.ts` — version-controlled config array; v1 domains | S21, S21b, S21c | S |
| B03-4 | `hubspot.ts` — HubSpot Forms v3 POST; `legalConsentOptions`; hidden fields; error handling | S22, S22b, C-15 | M |
| B03-5 | `SurveyFlow.tsx` — multi-step form; intake routing question (first); framing routing question; Likert + scenario + contextual questions; step counter | S17, S18, S19, S19b, S30, S32, S32b | L |
| B03-6 | `EmailGate.tsx` — work-email input; domain blocklist validation on input; GDPR consent checkbox; submission wiring to hubspot.ts | S20, S21, S21b, S22, S22b | M |

B03-1 must run before B03-5 (radar chart path decision). B03-2 through B03-4 are parallel after B00-2. B03-5 requires B03-2 and B03-3. B03-6 requires B03-3 and B03-4.

### B04 — Phase 3 Report

Parallel with B03 after B00-2 and B02 are complete.

| Item | Build | BDD Scenarios | Complexity |
|---|---|---|---|
| B04-1 | `ScoreDisplay.tsx` — ungated: maturity level label + headline finding | S18 | S |
| B04-2 | `JourneyStrip.tsx` — 5-node linear progress; current level highlighted | S23 | S |
| B04-3 | `DimensionBars.tsx` — 6 horizontal bars; band labels; "Fix first" on binding constraint | S12, S23 | S |
| B04-4 | `RadarChart.tsx` — Recharts (or SVG fallback per B03-1 decision); current filled + L(n+1) outline + binding axis accent; `React.lazy` dynamic import | S23, S27, S28 | L |
| B04-5 | `ReportRenderer.tsx` — assembles all 9 sections in order; consumes `ReportData`; individual/team framing variant applied to sections 5 and 7; benchmark null-data collapse | S23, S24, S29, S30, C-15 | XL |

B04-1 through B04-3 are parallel after B00-2. B04-4 depends on B03-1 decision. B04-5 requires B04-1 through B04-4 to be stubbed (can start with stubs, complete when children are done).

### B05 — Phase 3 Schema

Parallel with B03/B04 after B02-5 and B02-7 are complete.

| Item | Build | BDD Scenarios | Complexity |
|---|---|---|---|
| B05-1 | Service JSON-LD component on `/check/index.astro` — `@type: Service`, name from brand-usage-spec | S09 | S |
| B05-2 | FAQPage JSON-LD on `/check/index.astro` — 10–15 Q&As from faq-schema-content.md | S09, S14 | S |
| B05-3 | Static sample report Astro page — Level 3 example; citable artifact for AI engines | UQ-16 | M |

B05-1 and B05-2 are parallel and require B02-7 (FAQ copy). B05-3 requires B02-8.

### B06 — Quality Gate

Must be last in Phase 3. Verifies all acceptance criteria are green.

| Item | Build | BDD Scenarios | Complexity |
|---|---|---|---|
| B06-1 | Lighthouse CI threshold enforcement — confirm `lhcirc` fails build if LCP > 2.5s, INP > 200ms, CLS > 0.1 | S27 | S |
| B06-2 | HubSpot integration smoke test against real portal ID from EU IP (C-16: GDPR tools toggle verified) | S22, S31, C-16 | M |
| B06-3 | Full walking skeleton E2E pass — S09, S17, S18, S20, S22, S24, S27 all green | Walking skeleton | M |

---

## Wave Dependency Graph

```
B00 (foundation) ──────────────────────────────────────────────────────────┐
B01 (Phase 1 copy) ─ parallel with B00 ────────────────────────────────────┤
B02 (Phase 2 docs) ─ parallel with B00/B01 ────────────────────────────────┤
                                                                            ▼
B03-1 (bundle analysis) ──> B03-2 thru B03-6 (Phase 3 core) ──────────────┐
B04-1 thru B04-4 ─ parallel with B03-2 thru B03-4 ─────────────────────────┤
B04-4 depends on B03-1 decision ───────────────────────────────────────────┤
B04-5 (ReportRenderer) ─ requires B04-1..B04-4 stubs ──────────────────────┤
B05-1, B05-2 ─ requires B02-7 (FAQ copy) ──────────────────────────────────┤
B05-3 ─ requires B02-8 (sample report spec) ────────────────────────────────┤
                                                                            ▼
B06 (quality gate) ─ all Phase 3 waves must be green ──────────────────────┘
```

**Critical path:** B02-1 → B02-2 → B02-3 (longest sequential Phase 2 chain, ~3 items deep)
**Phase 3 critical path:** B00-2 + B03-1 → B03-5 → B04-5 → B06-3

---

## Consent Gate Flow (C-15 Architecture)

HubSpot consent failure must not deliver the full report. The gate is strict:

```
Survey complete
  → ScoreDisplay (ungated, immediate — maturity level + headline)
  → EmailGate renders
    → domain blocklist validation on input (client-side)
    → GDPR consent checkbox required
    → on submit: hubspot.ts POST
      → if HubSpot returns 2xx → unlock ReportRenderer
      → if HubSpot returns error → display "Unable to save your results — try again"
        → full report is NOT shown on HubSpot failure
        → user can retry; no partial unlock
```

This satisfies C-15 (consent failure does not deliver report) and AA-3 (no sequence fires before consent recorded).

---

## Open Pre-Phase-3 Dependencies (must resolve before B03 starts)

| Dependency | Owner | Blocks |
|---|---|---|
| HubSpot portal ID confirmed | Founder | B03-4, B06-2, S31 |
| HubSpot form GUID created | Founder | B03-4, B06-2, S31 |
| HubSpot GDPR tools toggle verified from EU IP | Founder + Phase 3 lead | B06-2, C-16 |
| Methodology provenance note bracketed fields completed | Founder | B01-1, S03 |
| Phase 2 framework locked (S16 passes) | Phase 2 lead | All of B03, B04, B05 |
