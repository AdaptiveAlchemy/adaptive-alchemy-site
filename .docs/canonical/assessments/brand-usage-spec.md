---
type: brand-usage-spec
initiative: I02-AIASSESS
version: v1
date: 2026-05-15
status: approved
---

# Brand Usage Specification — Adaptive Alchemy AI Fluency Index

## 1. Canonical Names

### 1.1 Framework Name

**Full canonical name**: Adaptive Alchemy AI Fluency Index

**Approved shorthand**: AI Fluency Index (permitted after the first full mention in any document, page, or report)

The canonical name is a proper noun. It is the name of the assessment methodology developed by Adaptive Alchemy. It is not a product name, not a page title, and not an SEO label. It is the name of the framework when the framework is being described as Adaptive Alchemy's proprietary work.

### 1.2 Product Labels

Two product labels are derived from the framework. They are product names, not synonyms for the framework name. Each maps to a specific surface and a specific audience intent.

**AI Readiness Assessment** — the paid engagement product label. Used on the service page, in booking flows, and in discoverability copy for buyers.

**AI Readiness Check** — the free tool product label. Used on the free tool page and in CTAs referring to the self-serve instrument.

The framework name and the two product labels refer to three distinct things. They are never interchangeable.

---

## 2. Label Selection Lookup Table

Use this table to determine the correct label for any given context. When in doubt, default to the framework name (Adaptive Alchemy AI Fluency Index / AI Fluency Index) rather than a product label.

| Context | Label to use |
|---|---|
| Service page H1 | AI Readiness Assessment |
| Service page meta title | AI Readiness Assessment |
| Service page URL slug | `/services/ai-readiness-assessment` |
| Paid engagement CTAs ("book", "request", "get started") | AI Readiness Assessment |
| Free tool page H1 | AI Readiness Check |
| Free tool page meta title | AI Readiness Check |
| Free tool page URL slug | `/check` |
| Free tool CTAs ("take the check", "see your level") | AI Readiness Check |
| Report footer — methodology attribution line | Adaptive Alchemy AI Fluency Index |
| Report header — framework display name | Adaptive Alchemy AI Fluency Index |
| Report level display label | Level N — [Level Name] (e.g., "Level 3 — Practicing") |
| Report dimension scorecard | AI Fluency Index |
| Schema.org `name` field (Service JSON-LD) | Adaptive Alchemy AI Fluency Index |
| Schema.org `name` field (FAQPage JSON-LD) | Adaptive Alchemy AI Fluency Index |
| HubSpot contact property keys | `ai_fluency_level`, `ai_fluency_track`, `ai_fluency_binding_constraint` |
| Body copy describing the methodology | Adaptive Alchemy AI Fluency Index (shorthand: AI Fluency Index) |
| Thought leadership articles describing the framework | Adaptive Alchemy AI Fluency Index / AI Fluency Index |
| Social copy mentioning the free tool | AI Readiness Check |
| Social copy mentioning the paid sprint | AI Readiness Assessment |
| Outreach and email copy for free tool | AI Readiness Check |
| Outreach and email copy for paid engagement | AI Readiness Assessment |
| Sales conversations and scoping calls for paid work | AI Readiness Assessment |

---

## 3. HubSpot Property Names

All CRM properties that store assessment data use snake_case keys without the full brand name. The brand name is not embedded in property keys.

| Property key | Type | Purpose |
|---|---|---|
| `ai_fluency_level` | Number (1–5) | The respondent's overall maturity level as assigned by gate scoring |
| `ai_fluency_track` | String (A / B / C) | Track assignment derived from the respondent's binding constraint and next-level transition roadmap |
| `ai_fluency_binding_constraint` | String (dimension key or blank) | The dimension key of the binding constraint for the assigned level; blank for Level 5 respondents (no internal bottleneck) |

**Track definition**: Track assignment uses the binding constraint to route respondents to the appropriate nurture or sales sequence. Track A, B, and C definitions are owned by the marketing automation spec; this spec governs only the property naming.

**Dimension keys** (valid values for `ai_fluency_binding_constraint`):

| Dimension key | Dimension full name |
|---|---|
| `task-recognition` | Task Recognition and AI Opportunity Mapping |
| `context-prompting` | Context Provision and Prompting Quality |
| `workflow-design` | Workflow Design and AI Integration |
| `judgment-verification` | Judgment, Verification, and Output Calibration |
| `delivery-integration` | Delivery Integration and Artifact Completion |
| `governance-systematization` | Governance, Systematization, and Auditability |

---

## 4. Report Level-Label Format

The format for displaying a respondent's assigned level in any report surface is:

```
Level N — [Level Name]
```

The separator is an em dash (—) with a single space on each side. The level number is an integer (1–5). The level name is the canonical name defined in the framework specification.

**Valid level labels**:

| Formatted label | When used |
|---|---|
| Level 1 — Curious | Level 1 assignment |
| Level 2 — Emerging | Level 2 assignment |
| Level 3 — Practicing | Level 3 assignment |
| Level 4 — Systematic | Level 4 assignment |
| Level 5 — Agent-Ready | Level 5 assignment |

This format applies to: report section headings, report summary cards, email subject lines referencing the respondent's level, and any UI element displaying a level assignment.

Do not use numerals only ("Level 3"), names only ("Practicing"), or abbreviated forms ("L3"). The full format is required wherever the level is surfaced.

---

## 5. Schema.org Structured Data

The `name` field in all Schema.org JSON-LD blocks that describe this framework or its products uses the canonical framework name.

**Service page JSON-LD** (`@type: Service`):
```json
{
  "@type": "Service",
  "name": "Adaptive Alchemy AI Fluency Index"
}
```

**FAQPage JSON-LD** (`@type: FAQPage`), where the FAQ describes the framework:
```json
{
  "@type": "FAQPage",
  "name": "Adaptive Alchemy AI Fluency Index"
}
```

The Schema.org `name` field is not a meta title or an H1. It is a structured data identifier. It always uses the full canonical framework name, never a product label, a shorthand, or a generic description.

---

## 6. Dual-Label Convention — Detail

The two product labels serve different buyer intents and protect distinct positioning. They must not be collapsed into one label or used interchangeably.

### 6.1 AI Readiness Assessment

**What it is**: The product label for the paid 2–3 week diagnostic sprint delivered by Adaptive Alchemy consultants.

**Positioning rationale**: This label is calibrated for search intent. Buyers searching for "AI readiness assessment" are looking for a structured engagement that will tell them where their organization stands. This label signals scope, rigor, and professional delivery.

**Primary surfaces**:
- Service page H1: "AI Readiness Assessment"
- Service page meta title: "AI Readiness Assessment | Adaptive Alchemy"
- URL slug: `/services/ai-readiness-assessment`
- Booking and contact CTAs: "Book an AI Readiness Assessment", "Request the Assessment"
- Paid engagement scoping materials

### 6.2 AI Readiness Check

**What it is**: The product label for the free self-serve tool that delivers an individual AI Fluency Index score in approximately 7 minutes.

**Positioning rationale**: "Check" signals something lighter and faster than "Assessment". The distinction preserves the premium positioning of the paid engagement: completing a 7-minute self-serve check and receiving a 2–3 week consultant-led diagnostic sprint are materially different products. Using the same label for both would erode the perceived value of the paid engagement.

**Primary surfaces**:
- Free tool page H1: "AI Readiness Check"
- Free tool page meta title: "AI Readiness Check | Adaptive Alchemy"
- URL slug: `/check`
- Free tool CTAs: "Take the AI Readiness Check", "See your AI Fluency level", "Get your free check"
- Social and outreach copy for the free instrument

### 6.3 Relationship Between the Two Products

Both products use the same Adaptive Alchemy AI Fluency Index scoring methodology. The distinction is scope and depth of delivery:

| | AI Readiness Check | AI Readiness Assessment |
|---|---|---|
| Scope | Individual practitioner | Full team |
| Delivery | Self-serve tool, ~7 min | Consultant-led sprint, 2–3 weeks |
| Output | Individual level score + dimension profile | Team-level diagnostic + next-level roadmap |
| Price | Free | Paid engagement |
| Underlying methodology | Adaptive Alchemy AI Fluency Index | Adaptive Alchemy AI Fluency Index |

The free check is a discovery channel into the paid assessment: "You've seen your own baseline. The Assessment sprint maps your whole team."

---

## 7. Prohibition Rules

The following are prohibited in all external-facing content, internal documents, reports, structured data, and code comments:

1. **Do not use "AI Readiness Assessment" and "AI Fluency Index" interchangeably.** These refer to different things — a product and a methodology respectively. Conflating them misrepresents both.

2. **Do not use "AI Readiness Check" and "AI Fluency Index" interchangeably.** Same principle: product label vs. methodology name.

3. **Do not use generic labels without proper-noun attribution when describing the framework.** Labels like "maturity model," "AI assessment," "readiness framework," or "AI tool" are not acceptable substitutes for "Adaptive Alchemy AI Fluency Index" in contexts where the methodology is being described as Adaptive Alchemy's proprietary work. Generic labels are permissible only in body copy that is clearly contextually anchored to a prior proper-noun mention.

4. **Do not embed the full brand name in HubSpot property keys.** Property keys use the short prefix convention (`ai_fluency_*`). Using `adaptive_alchemy_ai_fluency_index_level` or similar is incorrect.

5. **Do not reference AdviceForge or any third-party AI assessment tool** in external-facing content, reports, structured data, or any surface associated with the Adaptive Alchemy AI Fluency Index. No AdviceForge references appear anywhere in this initiative.

6. **Do not use the paid product label ("AI Readiness Assessment") in free tool contexts**, or vice versa. The labels map to specific products and must not be applied to the wrong surface.

7. **Do not use numerals-only or names-only level display.** The format "Level N — [Level Name]" is required wherever a level assignment is surfaced. "Level 3" or "Practicing" alone are not acceptable.

---

## 8. BDD Scenario S13 Coverage

This document satisfies BDD scenario S13 from `charter-I02-AIASSESS-scenarios.md`.

S13 requires that a brand-usage-spec document exist and that it specify:

| S13 requirement | Covered in |
|---|---|
| Canonical framework name: "Adaptive Alchemy AI Fluency Index" | Section 1.1 |
| Approved shorthand: "AI Fluency Index" after first mention | Section 1.1 |
| HubSpot property key `ai_fluency_level` | Section 3 |
| HubSpot property key `ai_fluency_track` | Section 3 |
| HubSpot property key `ai_fluency_binding_constraint` | Section 3 |
| Report level-label format: "Level N — [Level Name]" | Section 4 |
| Report level-label example: "Level 3 — Practicing" | Section 4 |
| Schema.org `name` field value: "Adaptive Alchemy AI Fluency Index" | Section 5 |
| Dual-label: "AI Readiness Assessment" for service page H1/meta | Sections 2 and 6.1 |
| Dual-label: "AI Readiness Check" for /check H1/meta | Sections 2 and 6.2 |
| No AdviceForge references | Section 7, rule 5 |
| Prohibition on interchangeable use of product and methodology names | Section 7, rules 1–2 |

---

## Appendix A: Version History

| Version | Date | Status | Notes |
|---|---|---|---|
| v1 | 2026-05-15 | approved | Initial specification. Covers canonical name, product labels, HubSpot properties, report level-label format, Schema.org name field, dual-label convention, and prohibition rules. Satisfies S13. |
