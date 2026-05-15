---
type: adr
endeavor: I02-AIASSESS
status: accepted
date: 2026-05-15
decided-by: human+agent
supersedes: []
superseded_by: null
---

# ADR I02-007: Two-Label Framework Naming Strategy

**Date:** 2026-05-15
**Status:** Accepted
**Initiative:** I02-AIASSESS
**Decided-by:** human+agent

**Decision Makers:** Founder (Ariel Perez), charter gate panel (UQ-F, UQ-13, confirmed 2026-05-15)

**Tags:** seo, brand, naming, aeo, schema, hubspot, content-strategy

## Context

The initiative involves two conceptually distinct naming needs that were initially conflated:

1. **Market discoverability label** — the term used in H1s, URL slugs, meta titles, booking CTAs, and service page headlines. This term must match the search queries that prospects type when looking for this category of service. "AI Readiness Assessment" is the dominant market term used by McKinsey, IBM, Deloitte, and Gartner. It is the term prospects already know.

2. **Proprietary methodology name** — the name of the Adaptive Alchemy framework itself: the five maturity levels, six dimensions, gate scoring model, and threshold matrix. A proprietary name builds a citable knowledge graph entity that AI engines can reference when answering questions about AI maturity frameworks. Generic terms like "AI Readiness" build no entity authority; proprietary names ("McKinsey AI Maturity Framework", "CMMI", "Gartner Magic Quadrant") get cited independently.

The charter gate panel (UQ-F, 2026-05-14) flagged that using generic level names and "AI Readiness" throughout all content would build no knowledge graph entity for Adaptive Alchemy to own. The founder named the proprietary framework: **"Adaptive Alchemy AI Fluency Index"** (UQ-F decision, 2026-05-15).

Two panelists (UQ-13, 2026-05-14) flagged that the dual-label ambiguity would produce inconsistent Phase 1 copy and undermine both SEO signal and brand differentiation. A formal naming specification was required before any copy was written.

## Decision

A **two-label naming strategy** is the canonical naming convention for all I02-AIASSESS content surfaces:

### Label 1: Primary Product / SEO Label

**"AI Readiness Assessment"** (paid service) and **"AI Readiness Check"** (free tool)

**Used in:**
- H1 headings (`/services/ai-readiness-assessment`: "AI Readiness Assessment"; `/check`: "AI Readiness Check")
- URL slugs (`/services/ai-readiness-assessment`, `/check`)
- Meta titles and meta descriptions
- Booking CTAs ("Book an AI Readiness Assessment call", "Take the free AI Readiness Check")
- Homepage engagement ladder references
- Persona page CTA copy

**Not used in:** report attribution, structured data `name` fields, methodology notes, body copy explaining the scoring model

### Label 2: Proprietary Methodology Label

**"Adaptive Alchemy AI Fluency Index"** (full), **"AI Fluency Index"** (shorthand after first full mention)

**Used in:**
- Body copy positioning the framework as original methodology
- Report section headers and attribution ("Your AI Fluency Index results")
- Structured data: Schema.org `name` field for the Service schema on `/check`
- Report footer methodology note ("The Adaptive Alchemy AI Fluency Index was developed from...")
- AEO/GEO content targeting AI engine citations
- Any content positioning this as a named framework distinct from generic AI readiness assessments

**Not used in:** H1s, URL slugs, meta titles, primary CTAs

### HubSpot Contact Property Naming

HubSpot contact property keys use **clean snake_case keys** — the brand name lives in rendered copy and schema, not in property names:
- `ai_fluency_level` (not `adaptive_alchemy_ai_fluency_index_level`)
- `ai_fluency_track` (not `ai_readiness_assessment_track`)
- `ai_fluency_binding_constraint`
- `ai_fluency_framing_variant`

## Alternatives Considered

- **Single label throughout (use only "AI Readiness Assessment" everywhere):** Simpler content discipline. No risk of inconsistency. However: (1) builds zero entity authority for Adaptive Alchemy — the generic term is already owned by McKinsey et al.; (2) the report, schema, and AEO content all read as descriptions of a generic category service, not a named proprietary framework; (3) loses the brand differentiation that the proprietary name provides. Rejected: sacrifices AEO and brand differentiation for simplicity.

- **Single label throughout (use only "Adaptive Alchemy AI Fluency Index" everywhere):** Full brand differentiation. Maximum entity authority. However: (1) prospects searching for "AI readiness assessment" or "AI readiness check" do not know to search for "AI Fluency Index" — the proprietary name has zero initial search demand; (2) using the proprietary name in H1s and CTAs creates a discoverability gap; (3) the H1 on `/check` would be "Adaptive Alchemy AI Fluency Index" — a 6-word proper noun as the primary heading of a free tool page, which creates friction for first-time visitors unfamiliar with the brand. Rejected: zero initial search demand makes the proprietary-name-only approach a discoverability failure.

- **Drop the proprietary name and use only generic terms:** Simplest. No naming discipline required. However: all the reasons for the "single label = generic" rejection apply. Additionally, the founder explicitly named the framework (UQ-F decision) and named the entity authority benefit as a rationale. The charter gate panel confirmed this as a strategic requirement. Rejected: explicitly out of scope.

## Agent Boundary Rules

- **Must preserve:** No content surface (copy, schema, HubSpot template, code comment) may use the two labels interchangeably. The table below is the canonical rule:

  | Surface | Required label |
  |---|---|
  | H1 on `/check` | "AI Readiness Check" |
  | H1 on `/services/ai-readiness-assessment` | "AI Readiness Assessment" |
  | Meta titles | "AI Readiness Check" / "AI Readiness Assessment" (per page) |
  | Booking CTAs | "AI Readiness Assessment" |
  | Free tool CTA | "AI Readiness Check" |
  | Schema.org `name` field | "Adaptive Alchemy AI Fluency Index" |
  | Report attribution | "AI Fluency Index" |
  | Methodology note | "Adaptive Alchemy AI Fluency Index" |
  | HubSpot property keys | `ai_fluency_*` |

- **Enforcement:** Phase 2 deliverable `brand-usage-spec.md` (B02-5) is the authoritative reference. Phase 1 copy review checks for label misuse before founder sign-off. Phase 3 report copy review checks attribution labels.

## Consequences

### Positive

- SEO discoverability: H1 and meta on `/check` and `/services/ai-readiness-assessment` use the exact market terms that prospects search for.
- AEO/GEO entity building: all schema `name` fields, methodology notes, and framework citations use the proprietary name — building a citable entity for AI engines over time.
- Brand differentiation: "AI Fluency Index" is distinct from "AI Readiness Assessment" — report recipients recognize they received a named diagnostic, not a generic quiz result.
- HubSpot property key cleanliness: short, stable keys are easier to reference in workflows and are robust to future brand name evolution.

### Negative

- Content discipline cost: copy writers, schema implementers, and HubSpot template designers must consistently apply the two-label rule. Inconsistency risks either SEO underperformance (proprietary name in H1) or AEO underperformance (generic name in schema).
- Brand recognition gap: new visitors arrive via "AI Readiness Check" and are then introduced to "AI Fluency Index" in the report — this is two names for one product, which requires clear contextual bridging in the report introduction.

### Neutral

- The shorthand "AI Fluency Index" is acceptable after first full mention of "Adaptive Alchemy AI Fluency Index" — copy writers do not need to spell out the full name on every occurrence in body text.
- Phase 2 deliverable B02-5 (`brand-usage-spec.md`) codifies this ADR as an operational document for Phase 3 implementers. This ADR is the strategic rationale; B02-5 is the implementation reference.

## Implementation Notes

- Phase 2 B02-5 must document:
  - Canonical framework name: "Adaptive Alchemy AI Fluency Index"
  - Approved shorthand: "AI Fluency Index" (after first full mention)
  - HubSpot property naming convention: `ai_fluency_*` prefix
  - Report level-label format: "Level 3 — Practicing" (not "AI Fluency Index Level 3 — Practicing" — too verbose for scorecard labels)
  - Schema.org `name` field value: "Adaptive Alchemy AI Fluency Index"
- Phase 1 copy brief must include this two-label specification before copy writing begins (UQ-13 requirement)
- The methodology note template (UQ-14): "The Adaptive Alchemy AI Fluency Index was developed from [N] client engagements across [sectors]..." — uses the full proprietary name in the first sentence

## Validation

- **How to validate:** (1) Phase 1 copy reviewed against the label table — zero H1s or meta titles use "AI Fluency Index"; zero schema `name` fields use "AI Readiness Check". (2) HubSpot contact properties created with `ai_fluency_*` keys. (3) Phase 3 report copy uses "AI Fluency Index" for attribution. (4) Schema.org `name` field on `/check` is "Adaptive Alchemy AI Fluency Index".
- **Validate by:** Phase 1 lock gate (copy sign-off); Phase 2 lock gate (B02-5 complete); Phase 3 B05-1 schema implementation
- **Current status:** unvalidated

## Related Decisions

- [ADR I02-006] — `/check` URL slug and H1 "AI Readiness Check" (uses Label 1 per this ADR)
- [ADR I02-004] — Gate scoring model (the methodology this naming strategy applies to)

## References

- Charter UQ-F — Proprietary framework name decision: "Adaptive Alchemy AI Fluency Index" (2026-05-15)
- Charter UQ-13 — Two-label strategy confirmed 2026-05-15
- Charter UQ-14 — Methodology note text template
- Charter §1.2 — `/services/ai-readiness-assessment` H1 direction ("AI Readiness Assessment" per AA-11)
- Charter §3.1 — Report section references ("Score + level" — uses maturity level label format)
- Backlog B02-5 — `brand-usage-spec.md` Phase 2 deliverable
- Backlog §Interface Contracts — `AssessmentScore.levelLabel` field (uses "Level N — Label" format)
