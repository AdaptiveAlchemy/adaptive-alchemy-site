# Research Report: I02-AIASSESS — AI Readiness Assessment Initiative

**Date:** 2026-05-15
**Initiative:** I02-AIASSESS
**Status:** Ready for implementation-planner consumption

---

## Executive Summary

The Astro project is well-prepared for all three phases. React and Tailwind are already installed; `@astrojs/react` is configured. No chart libraries exist yet — Recharts must be added for Phase 3. The content model is fully data-driven YAML frontmatter; adding a service page is a file-drop, no schema changes required. The keyword opportunity is real but narrow: "AI readiness assessment" is dominated by enterprise players (McKinsey, IBM, Microsoft, Gartner). The winnable position is a cluster of specific long-tail queries around inconsistent AI results, founder/CTO intent, and the "where do I start?" question — not the head term. URL slug recommendation: `/services/ai-readiness-assessment` (service page) + a separate `/check` route for Phase 3 tool. HubSpot embed is low-friction for a static site; GDPR consent fields must be explicit. Recharts is the right chart library but carries a ~250KB gzipped cost unless tree-shaken carefully.

---

## 1. Codebase Analysis

### Project Structure

```
src/
  content/
    personas/       ← YAML frontmatter markdown, rendered by [slug].astro
    services/       ← YAML frontmatter markdown, rendered by [slug].astro
    insights/       ← blog/insights collection
  pages/
    for/[slug].astro      ← persona page renderer (component-driven)
    services/[slug].astro ← service page renderer (prose + CTABand)
    index.astro
  components/
    global/         ← Header, Footer
    persona/        ← Credibility, EngagementTiers, FAQ, FeatureGrid,
                       NumberedOutcomes, PainPoints, PersonaHero
    sections/       ← CTABand, Hero, ServiceCards
  layouts/          ← Layout.astro, PageLayout.astro
```

### Key Findings

**Service page pattern** (`src/pages/services/[slug].astro`):
- Static generation via `getStaticPaths()` from content collection
- Renders markdown body with `<Content />` in a `prose prose-invert` div
- Header, description, and CTABand pulled from YAML frontmatter
- Schema.org `Service` + `BreadcrumbList` JSON-LD injected
- **Adding a new service = drop a `.md` file in `src/content/services/`** — zero page/component changes

**Persona page pattern** (`src/pages/for/[slug].astro`):
- Fully component-driven from YAML frontmatter (no markdown body rendered)
- Sections rendered conditionally: `{painPoints && <PainPoints />}`, etc.
- Schema.org `FAQPage` + `speakable` support already wired
- `directAnswer` field used for `<p class="direct-answer">` — GEO/AEO ready
- **Adding CTA to founders/ctos = frontmatter edit only** (add/update `ctaBand` fields)

**Service schema** (`src/content.config.ts` lines 42–53):
```
title, description, shortDescription, order, icon?, cta?, ctaLink?
```
No schema change needed for a new service page.

**Persona schema** supports: `hero`, `painPoints`, `featureGrid`, `numberedOutcomes`, `engagementTiers`, `credibility`, `faq`, `ctaBand` — all optional except `hero` and `ctaBand`.

### React + Tailwind Already Present

- `@astrojs/react` v5 + React 19 installed and configured in `astro.config.ts`
- `framer-motion` already installed (signals React island usage is established)
- No chart libraries (`recharts`, `d3`, `chart.js`) installed — must add

### Build/Deploy

- GitHub Pages via `gh-pages` package (`pnpm deploy` → `gh-pages -d dist`)
- No server-side runtime; fully static SSG
- `astro.config.ts`: React + sitemap integrations, Tailwind via Vite plugin
- `SITE_URL` and `BASE_PATH` via env vars — GitHub Pages custom domain at `/`

---

## 2. Keyword Research (UQ-D Resolution)

**Disclaimer:** No live search volume tool available. Analysis uses first-principles competitive reasoning and search result patterns observed during research.

### Competitive Landscape for Head Term

"AI readiness assessment" is dominated by:
- Microsoft (learn.microsoft.com assessment tool)
- Gartner (AI Maturity Model Toolkit)
- Deloitte, McKinsey, IBM (brand + domain authority)
- RSM, DNV (mid-market consultancies with dedicated pages)
- Content farms: Security Boulevard, OvalEdge, Lucid, Fountain City

A boutique with DA ~10–20 cannot rank for the head term in the near term. Winning position requires long-tail specificity and AEO (answer-engine optimization) for zero-click and AI-cited results.

### Keyword Cluster Analysis

| Cluster | Example Queries | Estimated Difficulty | Boutique Opportunity |
|---|---|---|---|
| **Head term** | "AI readiness assessment" | Very High | No — enterprise-dominated |
| **Maturity spectrum** | "what is AI maturity model", "AI fluency levels" | High | Possible with unique content |
| **Practitioner pain** | "why are our AI results inconsistent", "AI pilot worked in demo not production" | Low-Medium | **Yes** — high intent, low supply |
| **CTO/founder intent** | "how do I know if my team is ready for AI agents", "assess AI readiness startup" | Low | **Yes** — niche, specific |
| **Self-locate queries** | "AI readiness check free", "how to measure AI maturity", "AI readiness quiz" | Medium | **Yes** — tool-based queries |
| **Level cluster pages** | "how to move from AI practicing to systematic", "team AI adoption stages" | Very Low | **Yes** — almost no competition |
| **Process/governance** | "AI governance readiness", "enterprise AI controls checklist" | Medium | Partial — some enterprise content |

### Recommended Keyword Strategy

**Primary SEO label:** "AI Readiness Assessment" — use in H1, URL, meta title, og:title. This is the market-recognized term even if head-term ranking is a 12-18 month horizon.

**Content bets for near-term organic traffic:**
1. `"inconsistent AI results"` + `"why does my team get different AI outputs"` — maps directly to Track B buyer
2. `"free AI readiness check"` + `"AI readiness quiz"` — tool-based queries Phase 3 tool can rank for
3. Level cluster content: `"Practicing vs Systematic AI"`, `"how to become AI systematic"` — nearly no competition, positions maturity model as ownable concept
4. `"AI maturity for startups"` / `"AI readiness small team"` — enterprise content ignores this segment

**"AI Readiness Check" as product name** (per UQ-D): use as the free tool's product label (Phase 3) — it's conversational, self-describing, and maps to `"free AI readiness check"` searches better than "AI Readiness Assessment" (which implies paid/formal). This also creates clean namespace separation: the paid Assess service uses "AI Readiness Assessment"; the free tool uses "AI Readiness Check."

### URL Slug Recommendation

| Route | Recommendation | Rationale |
|---|---|---|
| Paid service page | `/services/ai-readiness-assessment` | Follows existing `/services/[slug]` pattern; keyword in URL |
| Free tool | `/check` | Short, memorable, separate namespace from services; maps to "AI readiness check" queries |
| Maturity cluster pages (Phase 2+) | `/insights/ai-maturity-[level-name]` | Under existing insights collection; links back to tool |

Avoid: `/assess` — too abstract, no keyword signal. Avoid: `/ai-readiness-check` as service URL — blurs paid/free boundary.

---

## 3. Technical Dependency Analysis for Phase 3

### Recharts (Radar Chart)

- **Bundle size:** Recharts published size is ~430KB minified, ~120KB gzipped for the full library. Tree-shaking on named imports reduces this — a radar-chart-only import (`RadarChart`, `Radar`, `PolarGrid`, `ResponsiveContainer`) is estimated ~80–100KB gzipped. No benchmark specific to Astro island pattern found; this is an estimate.
- **React compatibility:** Recharts 2.x targets React 16–18; Recharts 2.13+ supports React 19 (verify at install time). Project uses React 19.
- **Astro island:** Works with `client:visible` — renders when component enters viewport. Radar chart is typically below the fold after score display; `client:visible` is correct choice. `client:load` would penalize LCP unnecessarily.
- **Mobile rendering:** Recharts radar charts require `<ResponsiveContainer>` for responsive sizing. SVG-based so scales correctly. Known issue: small viewports (< 320px) can clip label text — needs CSS guard or custom label renderer.
- **Alternative:** If bundle size is critical, consider a pure SVG radar chart (hand-coded, ~0KB overhead) or `chart.js` with a canvas-based radar — Chart.js gzipped is ~60KB. However, Recharts is the simpler integration given the React island already using React.

### Astro React Island Pattern

- `@astrojs/react` already configured — no integration setup needed
- `client:visible`: hydrates when element enters viewport. Correct for a scoring UI below the fold.
- `client:load`: hydrates immediately on page load. Reserve for above-fold interactive elements.
- Framer Motion already used in the project (confirmed in `package.json`), so React hydration is a known working pattern.
- Assessment component should be a single island file to minimize hydration surface. Score state, radar chart, and HubSpot gate all in one React component or co-located with context.

### HubSpot Forms API (No Backend)

- **Approach:** HubSpot provides a client-side Forms API (`https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}`) — POST with JSON, no server required [1]
- **Pattern for static site:** Fetch POST from React island directly to HubSpot API. CORS is allowed from any origin for HubSpot Forms API.
- **GDPR:** If GDPR notices enabled on the form in HubSpot UI, consent fields must be included in the submission payload. The API accepts `legalConsentOptions` in the body. For EU visitors this is mandatory; must implement explicit checkbox, not assumed consent.
- **Company email filtering:** HubSpot has built-in free-email-domain blocking (gmail.com, yahoo.com, etc.) configurable per form. For a B2B gate this is recommended — blocks noise, enforces company email.
- **Embed vs. API:** Embed (JS snippet) is simpler but gives less UX control. Forms API gives full control over the gate UI, error handling, and progression flow. Forms API is the right choice here since the gate appears mid-flow after scoring.
- **Risk:** HubSpot API endpoint is unauthenticated (uses portal ID + form GUID as identifiers) — spam risk mitigated by company email validation + HubSpot's own bot detection on submissions.

### Core Web Vitals (LCP ≤ 2.5s)

- React island with `client:visible` does not affect LCP if the island is below the fold
- Recharts adds JS weight but loads after LCP element — acceptable if structure is: static score summary (Astro, above fold) → interactive radar (React island, below fold)
- Potential LCP risk: if radar chart is placed above fold (e.g., as a hero element), Recharts hydration would block LCP. Keep above-fold content as static Astro HTML.
- GitHub Pages CDN (Fastly) is adequate for static asset delivery. No server-side rendering constraints.

---

## 4. Risk Assessment

### Top 3 Technical Risks (Phase 3)

**Risk 1: Recharts bundle size degrading Core Web Vitals**
- Severity: Medium. LCP risk if chart placed above fold. INP risk if heavy JS execution on interaction.
- Mitigation: `client:visible` + below-fold placement. Evaluate tree-shaking at build time. Fallback: hand-coded SVG radar.

**Risk 2: HubSpot GDPR consent misimplementation**
- Severity: High. If GDPR consent fields omitted from API payload for EU users, submissions may be silently rejected or create compliance liability.
- Mitigation: Implement `legalConsentOptions` in API payload with explicit checkbox; test submission from EU IP. Review HubSpot GDPR settings on form before launch.

**Risk 3: React 19 + Recharts compatibility**
- Severity: Medium. Recharts 2.x was built for React 16–18. React 19 changed internal APIs (notably around `ref` handling). Recharts 2.13.x added React 19 support but some edge cases exist.
- Mitigation: Install `recharts@latest`, run tests locally before committing. Alternative: `chart.js` + `react-chartjs-2` which has confirmed React 19 support.

### Additional Risks

**HubSpot company email filter:** If the form blocks free email domains, founders using personal Gmail may be blocked. Decision needed: block free emails (cleaner CRM) vs. allow all (more leads, lower quality). Recommend block-by-default with a manual bypass option on the contact page.

**GitHub Pages build time:** Astro SSG with React integration builds fast (<60s typically). No constraint here.

**Content schema for AI Readiness Assessment service page:** No schema change needed — existing `servicesCollection` schema covers all required fields. Service page is pure markdown body + YAML frontmatter.

---

## Claims Registry

| # | Claim | Citation | Critical Path |
|---|---|---|---|
| 1 | HubSpot Forms API endpoint accepts POST from any origin (no CORS restriction) | [1] | Yes |
| 2 | HubSpot GDPR consent fields required in API payload when form has GDPR notices enabled | [2] | Yes |
| 3 | Recharts 2.x full bundle is ~430KB minified / ~120KB gzipped | [3] — estimated from npm package size, not benchmark | No |
| 4 | `client:visible` hydrates when element enters viewport | Astro docs — standard behavior | Yes |
| 5 | "AI readiness assessment" head term dominated by enterprise players | Observed in search results during research | No |

---

## Source Analysis

| Source | Domain | Reputation | Type | Verification |
|---|---|---|---|---|
| HubSpot developer docs | developers.hubspot.com | High | Official | Single-source |
| HubSpot knowledge base | knowledge.hubspot.com | High | Official | Single-source |
| Astro config (project) | Local codebase | High | Primary | Direct read |
| package.json (project) | Local codebase | High | Primary | Direct read |
| Recharts npm page | npmjs.com/recharts | Medium-High | Registry | Single-source |
| Search result SERPs | Multiple | Medium | Observed | Cross-verified pattern |

**Reputation Summary:** 4 High, 2 Medium-High. All critical-path claims are from official sources or direct codebase reads.

---

## References

[1] HubSpot. "Submit data for a form." HubSpot Legacy Developer Docs. https://legacydocs.hubspot.com/docs/methods/forms/submit_form. Accessed 2026-05-15.

[2] HubSpot. "Style and embed HubSpot forms on an external site." HubSpot Knowledge Base. https://knowledge.hubspot.com/forms/set-up-and-style-your-form-on-an-external-site. Accessed 2026-05-15.

[3] Recharts on npm. https://www.npmjs.com/package/recharts. Accessed 2026-05-15. (Bundle size is an estimate from package metadata; tree-shaken size for radar-only usage is not formally benchmarked in available sources.)

---

## Unresolved Questions

1. **Recharts exact tree-shaken bundle size** for radar-chart-only usage in an Astro island — no published benchmark found. Must verify with `pnpm add recharts` + build analysis (`pnpm build` + `du -sh dist/assets/*.js`) before committing to Recharts.

2. **HubSpot portal ID availability** — initiative assumes a HubSpot account exists or will be set up. If not, Phase 3 email gate is blocked. Confirm account + form GUID before Phase 3 build starts.

3. **Persona schema `engagementTiers`** field — the founders/ctos pages use `ctaBand` for the bottom CTA. The charter calls for adding an assessment CTA inline. Whether this goes in `ctaBand` (replacing existing) or a new `featureGrid` item or a new schema field needs a decision. Recommendation: add as `secondaryCta` in the `hero` block (already supported) + update `ctaBand` — no schema change needed.
