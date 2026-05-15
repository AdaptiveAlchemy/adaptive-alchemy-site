---
type: adr
endeavor: I02-AIASSESS
status: accepted
date: 2026-05-15
decided-by: human+agent
supersedes: []
superseded_by: null
---

# ADR I02-005: Email-Me Report Delivery (Not jsPDF)

**Date:** 2026-05-15
**Status:** Accepted
**Initiative:** I02-AIASSESS
**Decided-by:** human+agent

**Decision Makers:** Founder (Ariel Perez), charter gate panel (UQ-8, confirmed 2026-05-15)

**Tags:** architecture, pdf, report-delivery, hubspot, bundle-size, performance

## Context

The Phase 3 free assessment tool produces a personalized report. After the email gate, the report is rendered in the browser. The charter identified "shareable" as a design requirement — respondents should be able to forward the report to their leadership team (charter §3.3).

The original charter draft included PDF export as a sharing mechanism. Two client-side PDF generation approaches were considered: jsPDF (pure JS) and a browser print-to-PDF prompt. Both share the report sharing need; jsPDF additionally allows programmatic layout control.

However, jsPDF adds approximately 500KB uncompressed (~140KB gzipped) to the bundle. For an interactive tool where LCP ≤ 2.5s is an acceptance criterion (UQ-7), a 500KB library loaded for a minority use case (not all users who view the report will export it) represents an unacceptable performance regression for the majority.

The charter gate panel (UQ-8) confirmed deferring jsPDF to v2 and replacing the PDF export mechanism with an "email me the report" pattern.

## Decision

**No PDF export in v1.**

Report sharing is handled exclusively by the "email me the report" mechanism: a HubSpot-triggered email that delivers the report content to the user's submitted work email address. This mechanism:
- Is triggered by the same HubSpot form submission used for the email gate (ADR I02-003) — no additional API call required
- Delivers report content via a HubSpot email template (designed as part of Phase 3 infrastructure setup)
- Creates a permanent CRM touchpoint — the emailed report is a durable artifact in the HubSpot contact record
- Eliminates jsPDF and any PDF-related code from the v1 bundle

**If PDF export is added in v2,** it must be implemented as a dynamic import triggered only on explicit button click — never in the main island bundle or the initial lazy-loaded chunk.

## Alternatives Considered

- **jsPDF with dynamic import on click:** jsPDF is imported only when the user clicks "Download PDF." The bundle hit (~140KB gzipped) is deferred to the click interaction rather than page load. This resolves the LCP concern. However: (1) the lazy-loaded sub-bundle for the report section is already carrying Recharts (up to ~100KB gzipped per the threshold in ADR I02-002); adding jsPDF on top brings the lazy chunk to ~240KB gzipped, which approaches the budget limit for a below-the-fold section; (2) jsPDF's layout model requires reimplementing the report's visual structure in a separate rendering path — double the design and maintenance effort; (3) the email-me pattern serves the sharing use case with less engineering effort and better CRM integration. Rejected for v1; specified as the v2 path if retained.

- **Cloudflare Worker for server-side PDF:** A Worker renders the report server-side (e.g., via Puppeteer or a headless browser) and returns a PDF. This produces the highest-quality output (pixel-faithful to the browser rendering). However, this adds backend infrastructure scope that the charter explicitly defers to v2 ("no backend required for v1"). Rejected for v1; noted as the highest-quality v2 path.

- **Browser print-to-PDF prompt (`window.print()`):** No additional bundle weight. The user triggers the browser's native print dialog, selects "Save as PDF." Requires print-specific CSS (`@media print`) to control layout. Produces highly variable output across browsers and operating systems. The resulting PDF lacks a consistent brand presentation. For a premium B2B tool positioning itself as a "diagnostic artifact" (charter §3.3), variable browser-generated PDFs undermine the report's credibility signal. Rejected.

- **Static saved URL for sharing:** A URL encoding the report state (via URL hash or short-link service) allows sharing without PDF. However, URL persistence is explicitly deferred to v2 (UQ-B, ADR origin) due to incompatibility with GitHub Pages (no server-side state, GDPR concerns with email in URL hash, localStorage device-scoping). Not an available v1 mechanism.

## Consequences

### Positive

- jsPDF is entirely absent from the v1 bundle — zero bundle cost for a feature used by a minority of report viewers.
- The email-me report creates an additional HubSpot touchpoint: the delivered report is in the contact's email history, which supports follow-up sequencing.
- Reduces v1 implementation scope — no PDF layout work required in Phase 3.
- The email-delivered report is a durable artifact: the user can forward it weeks after the initial session, providing a long shelf-life sharing mechanism.

### Negative

- Report sharing requires the user to receive and forward an email rather than download a file — a higher-friction sharing path for in-meeting or async document workflows.
- Depends on HubSpot email template design and setup (a Phase 3 infrastructure dependency alongside the form GUID setup in ADR I02-003). The template must render the full 9-section report content in a readable email format.
- The "email me the report" UI element must be designed carefully — it should not be positioned as a substitute for the in-browser report (users may not realize they can also just share the browser URL of the report section, or share a screenshot).
- No PDF in v1 means the tool's "shareable" claim relies on email delivery, which is a weaker sharing mechanism than a downloadable PDF for leadership presentations.

### Neutral

- The v2 PDF path (jsPDF dynamic import on click OR Cloudflare Worker) is pre-specified — the deferral decision does not create ambiguity about the upgrade path.
- The email delivery is not a second form submission — it is a HubSpot email triggered by the workflow enrollment that happens on the form submission from the email gate. No additional user action or API call is required.

## Implementation Notes

- No `jsPDF` import anywhere in the v1 codebase — the package must not be installed
- "Email me the report" UI: a button in the gated report section, below the report content. Label: "Email this report to [email]" (pre-fill with the email used at the gate)
- The HubSpot email template for report delivery is a Phase 3 infrastructure setup item alongside portal ID and form GUID (same blocking dependency in the Backlog §Open Pre-Phase-3 Dependencies)
- The email template must include all 9 report sections in a readable format — not just a summary. The charter §3.3 describes the report as a "shareable" artifact designed for leadership forwarding.
- v2 PDF spec (for implementation planning):
  - Dynamic import: `const { jsPDF } = await import('jspdf')` inside an onClick handler only
  - Must not increase initial island bundle or lazy report chunk size
  - Requires print CSS and PDF layout spec — separate design task

## Validation

- **How to validate:** (1) `pnpm list jspdf` returns nothing — package not installed. (2) Lighthouse CI passes LCP ≤ 2.5s with no jsPDF bundle contribution. (3) "Email me the report" button triggers HubSpot email delivery — verified in B06-2 integration smoke test.
- **Validate by:** B06-2 (Phase 3 quality gate) and Lighthouse CI on first Phase 3 build
- **Current status:** unvalidated

## Related Decisions

- [ADR I02-003] — HubSpot form submission that triggers the email delivery
- [ADR I02-002] — Bundle size budget context (Recharts threshold motivates the jsPDF exclusion)

## References

- Charter UQ-8 — PDF export deferral confirmed by founder 2026-05-15
- Charter UQ-7 — Core Web Vitals acceptance criteria (LCP ≤ 2.5s)
- Charter §3.3 — Report design direction ("shareable: PDF export or email-me trigger")
- Charter §3.5 — What's not in scope for v1
- Backlog §Technology Decision Register — Report delivery decision row
