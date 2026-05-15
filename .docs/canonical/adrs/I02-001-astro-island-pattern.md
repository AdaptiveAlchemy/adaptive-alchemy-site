---
type: adr
endeavor: I02-AIASSESS
status: accepted
date: 2026-05-15
decided-by: human+agent
supersedes: []
superseded_by: null
---

# ADR I02-001: Astro Island Pattern for Assessment Tool

**Date:** 2026-05-15
**Status:** Accepted
**Initiative:** I02-AIASSESS
**Decided-by:** human+agent

**Decision Makers:** Founder (Ariel Perez), charter gate panel (UQ-6, confirmed 2026-05-15)

**Tags:** architecture, astro, react, seo, hydration, github-pages

## Context

The assessment tool must be built on a GitHub Pages static site (no server runtime in v1). The tool needs:

1. An interactive multi-step survey and personalized report renderer — requiring client-side JavaScript.
2. SEO crawlability — Googlebot must read the H1, meta description, intro paragraph, and FAQ schema at the assessment URL without executing JavaScript (Googlebot's deferred JS queue means full SPAs are frequently invisible to organic search).
3. AEO crawlability — AI engines (Perplexity, ChatGPT Browse) index static HTML content; a fully client-rendered page is invisible or low-quality in those indexes.
4. Core Web Vitals compliance — LCP ≤ 2.5s on simulated 4G (UQ-7). A full React SPA loads the entire React bundle before any meaningful paint.

The Astro site already has `@astrojs/react` v5 installed and uses the island pattern for other interactive components (`framer-motion` island proven in prior work). The pattern is not new to this codebase.

Three panelists (SEO, AEO, Web Dev) flagged during the charter gate panel that a fully client-side rendered assessment page would be uncrawlable and would undermine both organic acquisition and AI engine citation potential — the two primary traffic sources for this tool.

## Decision

The assessment route uses a **single Astro island** boundary:

- `/check/index.astro` is a static Astro page rendered at build time. It contains: the `<h1>` ("AI Readiness Check"), meta description, Open Graph tags, intro paragraph, JSON-LD (Service schema + FAQPage schema), and the island mount point. This content is served as plain HTML to every crawler and user.
- `AssessmentIsland.tsx` is the single React component mounted via `client:visible`. It owns all survey state, the scoring engine invocation, the email gate, and the report renderer. Nothing outside it is React.
- `client:visible` is used (not `client:load`) because the assessment is below the fold. `client:load` would load the React bundle on every page visit regardless of scroll intent, penalizing LCP for users who never reach the island.

No other React components on the `/check` page use their own `client:*` directive. All sub-components (`SurveyFlow`, `EmailGate`, `ReportRenderer`, etc.) are plain React within the island's boundary.

## Alternatives Considered

- **Full React SPA page (Astro `output: server` or standalone React app):** Resolves the interactivity need but makes the page uncrawlable without a SSR runtime. Incompatible with GitHub Pages constraint. Rejected.

- **Multiple smaller islands (e.g., separate islands for survey, gate, and report):** Increases complexity of state sharing across island boundaries. React state cannot cross island boundaries without lifting to Astro component props or URL params — creating significant architectural friction for a sequential multi-step flow that is inherently stateful. Rejected in favor of a single island owning all state.

- **`client:load` instead of `client:visible`:** Loads the React bundle immediately on page load, before the user scrolls to the island. For a page where the island is below the fold, this penalizes LCP with bundle parse time for the majority of users. `client:visible` defers hydration until the island enters the viewport — the correct directive for this placement. Rejected.

## Agent Boundary Rules

- **Owns:** `src/pages/check/index.astro` (static shell), `src/components/assessment/AssessmentIsland.tsx` and all children
- **Cannot touch:** The static H1, meta, intro paragraph, and JSON-LD in `index.astro` must not be moved inside the React island — they must remain in the Astro shell as static HTML
- **Must preserve:** Googlebot must be able to read the H1, meta description, and FAQ schema at `/check` without executing JavaScript. Any change that moves these into the island boundary violates this invariant.
- **Enforcement:** Lighthouse CI SEO audit (S09 acceptance criterion); manual crawl verification in Phase 3 B06 quality gate

## Consequences

### Positive

- LCP is unaffected by the React bundle — the static shell provides an immediate meaningful paint before hydration begins.
- Googlebot and AI crawlers read the H1, meta, intro paragraph, and FAQ schema as static HTML on first fetch — no deferred JS queue dependency.
- All survey and report state is co-located in one island, avoiding cross-boundary state management complexity.
- Consistent with the existing island pattern in the codebase — no new patterns required.
- `client:visible` ensures the React bundle is only parsed when the user has scrolled to the assessment — preserving LCP for users who arrive at the page for copy-only reads.

### Negative

- The island owns a large scope (survey + gate + report). As the component tree grows, the island boundary may need internal decomposition via React context or state management patterns.
- Debugging hydration issues requires understanding the Astro/React boundary, which adds a layer of complexity for contributors unfamiliar with Astro's island model.

### Neutral

- `RadarChart.tsx` is additionally lazy-loaded via `React.lazy` + `Suspense` inside the island (two-level lazy strategy), keeping the chart library out of the initial island bundle. See ADR I02-002.

## Implementation Notes

- Island mount in `index.astro`: `<AssessmentIsland client:visible hubspotPortalId={...} hubspotFormGuid={...} />`
- `AssessmentIslandProps` is the only interface crossing the Astro/React boundary — keep it minimal (portal ID and form GUID only; all other state is internal to the island)
- The static shell must be rich enough for crawlers: H1, 2–3 sentences of intro copy, FAQ schema (10–15 Q&As), and Service schema — all present before React loads
- Lighthouse CI must enforce the LCP ≤ 2.5s threshold from the first Phase 3 build (B00-4)

## Validation

- **How to validate:** (1) Lighthouse CI passes LCP ≤ 2.5s on Phase 3 first build. (2) `curl -A Googlebot https://adaptive-alchemy.com/check` returns the H1 and meta description in the response body without JS execution.
- **Validate by:** B06-3 walking skeleton E2E pass (end of Phase 3)
- **Current status:** unvalidated

## Related Decisions

- [ADR I02-002] — Radar chart lazy loading strategy inside this island
- [ADR I02-003] — HubSpot Forms API integration inside this island

## References

- Charter §3.2 — Technical architecture constraint (GitHub Pages = fully static)
- Charter UQ-6 — Astro island pattern confirmed by founder 2026-05-15
- Charter UQ-7 — Core Web Vitals acceptance criteria (LCP ≤ 2.5s)
- Backlog §Hydration Strategy — component tree and hydration design
- Astro documentation: [client directives](https://docs.astro.build/en/reference/directives-reference/#client-directives)
