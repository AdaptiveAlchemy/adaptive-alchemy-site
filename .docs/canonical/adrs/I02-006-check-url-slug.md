---
type: adr
endeavor: I02-AIASSESS
status: accepted
date: 2026-05-15
decided-by: human+agent
supersedes: []
superseded_by: null
---

# ADR I02-006: /check URL Slug for the Free Assessment Tool

**Date:** 2026-05-15
**Status:** Accepted
**Initiative:** I02-AIASSESS
**Decided-by:** human+agent

**Decision Makers:** Founder (Ariel Perez), charter UQ-D (keyword research gated) + UQ-13 (dual-label strategy, confirmed 2026-05-15)

**Tags:** seo, url-structure, ia, namespace, free-tool, paid-service

## Context

The free assessment tool needs a permanent URL on the Adaptive Alchemy site. This URL will be referenced in:
- Persona page CTAs (`/for/founders`, `/for/ctos`, `/for/stalled-ai-projects`)
- The homepage engagement ladder
- HubSpot email sequences (the 90-day follow-up)
- AEO/GEO structured data (Service schema `url` field)
- Social sharing (LinkedIn posts, direct outreach)

The URL choice is a one-way door: once it is referenced in HubSpot email sequences and published on social, changing it requires redirects and HubSpot template updates.

Three concerns must be balanced:
1. **Keyword signal** — does the URL path itself carry SEO weight for "AI readiness" queries?
2. **Namespace separation** — the free tool must not compete with the paid service at `/services/ai-readiness-assessment` in internal linking, anchor text, or schema
3. **Brand clarity** — is the URL memorable and clearly positioned as a free self-serve entry point, not the paid engagement?

The charter identified "AI Readiness Assessment" as dominated by McKinsey, IBM, Deloitte, and Gartner (UQ-D). Boutique consultancies are unlikely to rank for the head term. The free tool's SEO opportunity is in long-tail, tool-specific queries ("AI readiness check tool", "how ready is my team for AI") where shorter, distinct URLs perform well.

## Decision

The free assessment tool URL is **`/check`**.

The paid service URL is **`/services/ai-readiness-assessment`** (existing namespace, separate buyer context).

Because `/check` carries no keyword signal in the path itself, the H1 and meta description of the page must carry the "AI Readiness Check" phrase explicitly. Per the two-label framework (ADR I02-007 and charter UQ-13):
- Page H1: "AI Readiness Check" (the primary SEO label for this page, distinct from the paid service H1 "AI Readiness Assessment")
- Meta title: "AI Readiness Check — AI Fluency Index by Adaptive Alchemy"
- The path slug `/check` is intentionally terse — the keyword signal lives in the content, not the URL

This decision was gated on keyword research (UQ-D, confirmed: "keyword research by our own agents before this is finalized"). The `/check` slug was selected after confirming that the primary search intent for the free tool maps to informational and navigational queries ("AI readiness check", "check my AI readiness") where `/check` provides clear user intent signal in the URL when displayed in search results alongside the H1.

## Alternatives Considered

- **`/assess`:** Short and action-oriented but lacks any keyword signal. More abstract than `/check` — "assess" is a verb that could describe many activities. Does not differentiate the free tool from the paid service in anchor text or sharing context. Rejected: lower clarity than `/check` without compensating keyword benefit.

- **`/ai-readiness-check`:** Maximum keyword signal in the path. The full phrase in the URL would support long-tail ranking. However: (1) the path length creates awkward CTAs ("Take the /ai-readiness-check" is verbose in social and email copy); (2) it partially duplicates the paid service namespace — combined with `/services/ai-readiness-assessment`, the site would have two AI-readiness-flavored top-level paths that could confuse internal linking; (3) keyword-dense slugs are a weaker ranking signal than they were pre-2020 (H1 and content quality dominate over exact-match slugs). Rejected: marginal keyword gain does not justify namespace tension and CTA verbosity.

- **`/tools/ai-readiness-check`:** Nests the tool under a `/tools/` namespace, which scales well if other free tools are added later. The additional path segment adds context but also adds friction in sharing and CTA copy. The site does not currently have a `/tools/` section — creating one for a single tool is premature. Rejected for v1; retained as the recommended path if a second free tool is built.

- **`/ai-readiness-assessment`** (same slug as the paid service, different path): Ambiguous. Would require careful canonical tag management to avoid self-competition. The paid service at `/services/ai-readiness-assessment` and a free tool at `/ai-readiness-assessment` would confuse crawlers, users, and internal linking. Rejected.

## Agent Boundary Rules

- **Must preserve:** `/check` is the canonical URL for all internal links, HubSpot email links, schema `url` fields, and CTA hrefs. No component, email template, or schema block should reference `/assess`, `/ai-readiness-check`, or any other variant.
- **Enforcement:** Documentation and content review. Phase 3 B01 copy pass and B05 schema implementation must use `/check` exclusively.

## Consequences

### Positive

- Clean separation between free tool (`/check`) and paid service (`/services/ai-readiness-assessment`) — different URLs, different H1s, different CTAs, targeting different query clusters.
- Memorable and short — easy to say verbally ("Go to adaptive-alchemy.com/check"), easy to type, easy to include in social copy.
- Keyword signal is explicitly placed in H1 and meta (where it has higher ranking weight than the path slug) — no ranking penalty from the short slug.
- Namespace is not polluted: if other free tools are added, `/check`, `/audit`, `/measure` etc. are all available at top-level without a `/tools/` redirect layer.

### Negative

- `/check` has no keyword signal in the URL itself — the page must rely entirely on H1, meta, and content quality for organic ranking. A URL like `/ai-readiness-check` would carry marginal additional path keyword weight.
- The brevity of `/check` means the URL provides no context when shared as a raw link (e.g., in a Slack message) — the user must read the surrounding copy or the page title to understand what it is.

### Neutral

- Redirects: no existing URL at `/check` or any of the rejected alternatives — no redirect setup required.
- Phase 1 CTA copy must be consistent: "Take the free AI Readiness Check" → links to `/check`. "Book an AI Readiness Assessment" → links to `/services/ai-readiness-assessment`. Copy authors must not use the two phrases interchangeably.

## Implementation Notes

- File path: `src/pages/check/index.astro` (Astro convention for `/check` route)
- H1 in `index.astro`: "AI Readiness Check"
- Meta title: "AI Readiness Check — AI Fluency Index by Adaptive Alchemy" (subject to SEO review)
- Canonical tag: `<link rel="canonical" href="https://adaptive-alchemy.com/check" />`
- All HubSpot email links to the re-take prompt use `https://adaptive-alchemy.com/check` (no trailing slash)
- All persona page CTAs link to `/check` (not `/assess`, not `/ai-readiness-check`)

## Validation

- **How to validate:** (1) All internal links to the free tool resolve to `/check`. (2) No 404s at `/check`. (3) HubSpot email template links verified to `/check`. (4) Schema `url` field in Service JSON-LD resolves to `/check`. (5) Google Search Console shows `/check` indexed with "AI Readiness Check" as the primary query (evaluate 90 days post-launch).
- **Validate by:** Phase 1 lock gate (copy sign-off); Phase 3 B05-1 schema implementation; 90 days post Phase 3 launch for organic search validation
- **Current status:** unvalidated

## Related Decisions

- [ADR I02-007] — Two-label framework naming strategy (H1 "AI Readiness Check" vs. service page H1 "AI Readiness Assessment")

## References

- Charter UQ-D — Keyword research prerequisite (confirmed: use own agents)
- Charter UQ-13 — Dual-label strategy confirmed 2026-05-15
- Charter Open questions #3 — Assessment URL decision
- Backlog §Component Tree — `src/pages/check/index.astro` file path
- Backlog B01-2 — `/check` static shell content pass (Phase 1 deliverable)
