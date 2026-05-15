---
type: adr
endeavor: I02-AIASSESS
status: accepted
date: 2026-05-15
decided-by: human+agent
supersedes: []
superseded_by: null
---

# ADR I02-002: Recharts v3 with Dynamic Import and SVG Fallback Threshold

**Date:** 2026-05-15
**Status:** Accepted
**Initiative:** I02-AIASSESS
**Decided-by:** human+agent

**Decision Makers:** Founder (Ariel Perez), charter gate panel (UQ-9, confirmed 2026-05-15)

**Tags:** architecture, recharts, radar-chart, bundle-size, performance, react, lazy-loading

## Context

The Phase 3 report requires a radar chart as a visual companion to the dimension scorecard. The chart must show:
- Current state: filled shape across all 6 dimensions at current scores
- Level N+1 target: outline overlay showing the gap to the next level
- Binding constraint axis highlighted in a distinct accent color

No chart library is currently installed in the project. The radar chart is in the gated report section — below the fold, below the email gate, rendered only after the user submits their work email and HubSpot returns success. It will never appear above the fold.

The Core Web Vitals constraint (LCP ≤ 2.5s, UQ-7) makes bundle size a first-class concern. A chart library that adds significant gzipped weight to the initial island bundle would penalize LCP for all users, not just those who reach the report.

Two viable production-ready options exist for React-integrated radar charts: Recharts v3 (React-native API, tree-shakeable) and Chart.js + react-chartjs-2 (canvas-based, separate renderer). D3 and hand-coded SVG are also in scope as alternatives.

The charter gate panel (UQ-9) flagged that leaving this decision to the implementer would create scope ambiguity — Recharts and D3 are not equivalent choices in implementation time or bundle cost.

## Decision

Use **Recharts v3** for the radar chart, with the following constraints:

1. `RadarChart.tsx` is loaded via `React.lazy` + `Suspense` inside `AssessmentIsland.tsx`. This is a two-level lazy strategy: the island itself is `client:visible` (deferred until scroll), and the chart component is additionally dynamic-imported within the island. The chart is never in the initial island bundle.

2. **On Phase 3 day 1 (B03-1):** run `pnpm add recharts`, trigger a production build, and measure the tree-shaken gzipped contribution of Recharts to the bundle. Record the result. This measurement is a required task before `RadarChart.tsx` implementation begins.

3. **Fallback threshold:** If the Recharts gzipped bundle contribution exceeds **100KB after tree-shaking**, abandon Recharts and implement the radar as a hand-coded SVG. The SVG fallback is the sole alternative — it eliminates the library dependency entirely and keeps the chart section at near-zero bundle cost. The 100KB threshold is derived from the estimated lazy-loaded sub-bundle budget consistent with maintaining LCP ≤ 2.5s (S27/S28).

4. If Recharts is retained, only the radar-specific components are imported (`RadarChart`, `Radar`, `PolarGrid`, `PolarAngleAxis`, `Tooltip`, `ResponsiveContainer`). No other Recharts components are imported.

## Alternatives Considered

- **Chart.js + react-chartjs-2:** Canvas-based renderer. Canvas is less accessible than SVG (no DOM nodes for screen readers without additional `aria` configuration), requires a separate canvas polyfill for some environments, and Chart.js's own bundle adds weight. The React wrapper (react-chartjs-2) adds an additional integration layer. Rejected in favor of Recharts' native React API and SVG output.

- **Pure D3:** Maximum control over output, minimal bundle if tree-shaken correctly. However, D3 requires several additional implementation days to build a production-quality radar with the current state + target overlay + binding axis highlight. The charter gate panel (UQ-9) flagged this explicitly: "D3 vs. Recharts is not an equivalent choice — it adds implementation days." Rejected given the scope constraint; retained as a post-v1 option if the radar requires advanced animation or interaction.

- **Hand-coded SVG from the start (no library):** Zero bundle cost, full control, accessible by default. Eliminates the library dependency entirely. Rejected as the default choice because the implementation investment is higher than Recharts for the same visual output — but retained as the explicit fallback if Recharts exceeds the 100KB threshold. The SVG fallback path is fully specified, not speculative.

- **No radar chart (bars only):** Dimension bars (DimensionBars.tsx) communicate per-dimension scores adequately. However, the radar adds something bars cannot: the gestalt shape of the profile across all 6 dimensions simultaneously, and the spatial gap between current state and Level N+1 target. This visual differentiation is a deliberate product decision (charter §3.3). Rejected.

## Consequences

### Positive

- Recharts provides a clean React-native API — `RadarChart` wraps SVG output, accessible, no canvas dependency.
- Two-level lazy loading (island-level `client:visible` + component-level `React.lazy`) means the chart library is never in the critical path for LCP.
- The fallback threshold creates a concrete go/no-go decision on day 1 of Phase 3 — no scope ambiguity for the implementer.
- The SVG fallback, if triggered, produces a smaller and simpler implementation with zero library dependency risk.

### Negative

- The day-1 bundle analysis (B03-1) is a blocking task before `RadarChart.tsx` implementation. If the analysis is skipped, the fallback threshold cannot be evaluated.
- If the SVG fallback is triggered, the implementation is more labor-intensive than Recharts and must be scheduled explicitly.
- Recharts v3 targets React 18+; React 19 compatibility should be verified at install time.

### Neutral

- The chart is always below the email gate — it renders only for users who complete the assessment and pass the email gate. Bundle size concern is about sub-bundle weight within the lazy-loaded chunk, not the critical path bundle.
- Recharts radar does not natively support a "second dataset as outline only" rendering mode — the overlay must be implemented via a second `Radar` component with `fillOpacity={0}` and `strokeDasharray` for the dashed outline. This is a documented Recharts pattern.

## Implementation Notes

- B03-1 is the mandatory day-1 task: `pnpm add recharts` → production build → `pnpm exec vite-bundle-visualizer` or `rollup-plugin-visualizer` to measure recharts chunk → record gzipped size → decision documented before any chart implementation begins
- Two-level lazy pattern:
  ```tsx
  // Inside AssessmentIsland.tsx
  const RadarChart = React.lazy(() => import('./RadarChart'))
  // ...
  <Suspense fallback={<RadarSkeleton />}>
    <RadarChart score={score} />
  </Suspense>
  ```
- Recharts import (radar-only tree shake):
  ```tsx
  import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
  ```
- SVG fallback specification: 6-axis polygon using trigonometric positioning; current state as filled `<polygon>`; L(n+1) target as stroked `<polygon fill="none" stroke-dasharray="...">`; binding axis as accented `<line>`

## Validation

- **How to validate:** (1) B03-1 bundle analysis recorded with actual gzip size. (2) Lighthouse CI passes LCP ≤ 2.5s with chart library present. (3) Chart renders correctly in B06-3 walking skeleton E2E pass.
- **Validate by:** B06-3 walking skeleton E2E pass (end of Phase 3)
- **Current status:** unvalidated

## Related Decisions

- [ADR I02-001] — Island boundary within which `RadarChart.tsx` is lazy-loaded
- [ADR I02-004] — Gate scoring model that produces the dimension scores the chart renders

## References

- Charter UQ-9 — Radar chart library decision confirmed by founder 2026-05-15
- Charter UQ-7 — Core Web Vitals acceptance criteria (LCP ≤ 2.5s)
- Charter §3.3 — Report design direction and radar chart visual specification
- Backlog §Technology Decision Register — Recharts v3 / SVG fallback decision
- Backlog B03-1 — Day-1 bundle analysis task
- Backlog B04-4 — `RadarChart.tsx` implementation task
