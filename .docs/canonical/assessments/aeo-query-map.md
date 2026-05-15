---
type: aeo-query-map
initiative: I02-AIASSESS
version: v1
date: 2026-05-15
status: draft
---

# AEO/GEO Target Query Map — AI Readiness Assessment

## Purpose

This document lists 13 target queries for the I02-AIASSESS initiative, organized by searcher intent. Its purpose is to guide content decisions that optimize the AI Readiness Assessment and free AI Readiness Check for Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO) — that is, appearing in AI-generated answers, not just organic blue-link results.

These queries represent the language buyers use when AI engines are their first stop. Each query is annotated with intent level, the most likely AI engine surface, and a content-mapping note.

**Companion document:** `faq-schema-content.md` (P2-C-1) contains the FAQ copy and structured schema markup that targets the informational queries below. The two documents should be read together when drafting schema or on-page content.

---

## Queries by Intent Level

### Informational Queries

Queries where the searcher is building understanding. AI engines are the primary surface: Perplexity for research-mode queries, ChatGPT Browse for "explain this" prompts, Google AI Overviews for definition and comparison queries. Content that answers these precisely and cites a clear framework gets quoted.

| # | Query | Intent | Most Likely Engine(s) | Notes |
|---|-------|--------|----------------------|-------|
| 1 | what does AI readiness actually mean for a startup team | informational | Perplexity, ChatGPT Browse | High-volume conceptual query. Maps to the "what the framework measures" section of the AI Fluency Index spec. Targets founders who have heard the term but are not sure it applies to them. |
| 2 | how do you measure AI maturity in a team | informational | Perplexity, Google SGE | Directly triggers our six-dimension framing. Best answered by the AI Fluency Index overview. FAQ schema copy should include a concise six-dimension list. |
| 3 | difference between AI readiness and AI maturity | informational | ChatGPT Browse, Perplexity | Definitional comparison query. Positions us to clarify that we measure practitioner fluency, not infrastructure. Appears in research sessions before a buyer evaluates vendors. |
| 4 | why is AI inconsistent at my company | informational | ChatGPT Browse, Perplexity | Problem-framing query from a frustrated founder or CTO. Maps to the binding-constraint concept in the assessment output. Pain-first entry point — content should diagnose before selling. |
| 5 | what is an AI fluency model for teams | informational | Perplexity, Google SGE | Searches our branded term. Informational at first use — the buyer is encountering the concept for the first time. Positions the AI Fluency Index as the canonical answer to this query class. |

---

### Navigational Queries

Queries where the searcher knows the category of solution they want and is looking for a specific type of tool or service provider. These buyers are further along. AI engines surface vendor comparisons, "best of" lists, and category definitions. Being in those synthesized lists requires clear, consistent use of category language on-site.

| # | Query | Intent | Most Likely Engine(s) | Notes |
|---|-------|--------|----------------------|-------|
| 6 | AI readiness assessment tool for teams | navigational | Google SGE, Perplexity | Canonical category query. Both the paid Assessment and the free Check should appear here. The free tool (/check) is the primary answer — low friction, immediate value. |
| 7 | AI maturity model for startups | navigational | Perplexity, ChatGPT Browse | Startup-scoped navigational query. Maps to our ICP: Series A–C, 20–200 employees. Content should reference maturity levels explicitly and call out the growth-stage context. |
| 8 | AI adoption assessment framework | navigational | Google SGE, Perplexity | Broader category query — may compare frameworks. Our differentiation (human-fluency focus, not infrastructure) must be stated plainly to stand out in synthesized comparisons. |
| 9 | how to evaluate AI capability in a team | navigational | ChatGPT Browse, Google SGE | Mid-funnel navigational. Buyer is moving from "what is this?" to "how do I do this?" Maps to both the Check (self-serve) and the Assessment (expert-led). |

---

### Transactional Queries

Queries with commercial intent: the buyer is ready to act — book, access, evaluate, or contact. AI engines increasingly surface transactional answers with direct links, pricing cues, and booking CTAs. Being present at this stage requires structured data, clear pricing signals, and accessible entry points.

| # | Query | Intent | Most Likely Engine(s) | Notes |
|---|-------|--------|----------------------|-------|
| 10 | AI readiness assessment for startups | transactional | Google SGE, Perplexity | High-value commercial query. Targets ICP directly. Content should surface the Assessment service page, the fixed-fee model, and the 2–3 week timeframe. |
| 11 | AI readiness check free online tool | transactional | Google SGE, ChatGPT Browse | Direct entry point for the /check tool. The "free" qualifier signals immediate-access intent. Answer must include the URL, time to complete (7 minutes), and what the user gets (scored maturity profile). |
| 12 | how to assess my team's AI maturity | transactional | ChatGPT Browse, Perplexity | Action-oriented query. Buyer wants a method or a service, not just information. Maps to both the paid Assessment CTA and the free Check as the immediate next step. |
| 13 | hire AI readiness consultant for growth company | transactional | Perplexity, Google SGE | Late-stage commercial query. Buyer is evaluating advisory services. Content should cite the structured engagement model, fixed-scope/fixed-fee, and the team-level output (scored maturity profile, track assignment, roadmap). |

---

## AEO/GEO Content Strategy Implications

### Engine-specific patterns

**Perplexity** favors clearly cited, source-attributed content. The AI Fluency Index framework, if referenced consistently and precisely across the site, is a strong citation candidate. FAQ schema content should use exact framework terminology: "six dimensions," "five maturity levels," "binding constraint," "track assignment."

**ChatGPT Browse** surfaces content that reads as well-structured explanations — clear headings, short declarative answers, and sequential structure. The /check tool landing page and the Assessment service page should each include a "what you get" section formatted as a scannable list rather than prose.

**Google SGE (AI Overviews)** relies heavily on structured data and demonstrated topical authority. The FAQ schema (companion document faq-schema-content.md) is the primary lever here. SGE also rewards internal linking between related pages — the /check page, the Assessment service page, and the AI Fluency Index explanation page should all cross-link explicitly.

### Content gaps this map surfaces

1. **"Why is AI inconsistent at my company"** (query 4) has no dedicated content yet. A short article or landing section framing the binding-constraint diagnosis would own this query class directly.
2. **"Difference between AI readiness and AI maturity"** (query 3) is unanswered in current copy. A single paragraph — or a FAQ entry — that draws this distinction clearly would cover the query.
3. **"Hire AI readiness consultant for growth company"** (query 13) requires the Assessment service page to use the word "consultant" or "advisory" explicitly, so AI engines index it against that vocabulary.

### Branded term investment

"AI Fluency Index" and "AI Fluency Model" appear in queries 2 and 5. Consistent use of these exact phrases across the site, in page titles, headings, and structured schema, increases the probability that AI engines treat the Adaptive Alchemy framing as the canonical definition of this concept class.

### Free tool as AEO anchor

The free AI Readiness Check (/check) is the highest-leverage AEO asset. It is the least-friction answer to four of the thirteen queries above (queries 6, 7, 9, 11). Every informational and navigational page that does not have an obvious next action should point to /check as the first step.
