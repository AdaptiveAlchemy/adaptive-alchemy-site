---
type: assessment
endeavor: I02-AIASSESS
subject: phase0-gate
date: 2026-05-15
status: complete
initiative: I02-AIASSESS
panel_format: 3-round-strategic
gate_question: Should I02-AIASSESS advance from Phase 0 (Discover) to Phase 1 (Define)?
gate_decision: ADVANCE WITH NOTES
panel_invoked: true
---

# Phase 0 Gate Panel — I02-AIASSESS: AI Readiness Assessment

**Gate question:** Should the initiative advance from Phase 0 (Discover) to Phase 1 (Define)?

**Purpose:** Evaluate the Phase 0 artifacts — researcher report, product director strategic assessment, and claims verification — against five sub-questions: definition quality, phasing soundness, claims-warning adequacy, scope consolidation appropriateness, and red flags.

**Phase 0 artifacts reviewed:**
- `reports/researcher-20260515-ai-readiness-assessment.md`
- `reports/product-director-20260515-ai-readiness-assessment-strategic.md`
- `reports/claims-verifier-20260515-ai-readiness-assessment.md` — verdict: PASS WITH WARNINGS, no blockers

**Panel members:**
- Product Strategist — value/effort ratio, phasing logic, go/no-go correctness
- Technical Architect — stack soundness, architectural red flags, implementation risk
- AEO/SEO Strategist — keyword strategy, URL decisions, competitive positioning

**Format:** 3-round discussion + written synthesis with decision framework

---

## Round 1 — Independent Assessments

### Product Strategist

**On goal definition and charterability:**

The initiative is unusually well-defined for a Phase 0. The charter has resolved 32 UQs, has concrete phase deliverables, and specifies acceptance criteria — including measurable thresholds (UQ-10: 50 gate-passing completions in 60 days). The three-phase structure is cleanly separated: copy changes with zero tooling dependencies, framework design as pure knowledge work, and a React tool build. Each phase is independently shippable. This satisfies the charterability test without reservation.

The goal statement is specific enough to drive a product-analyst brief: "Create a self-serve top-of-funnel acquisition surface for growth-stage founders and CTOs, routing them into the appropriate paid engagement track." The business model linkage (Track A/B/C routing, with Track B as the primary v1 conversion target) is explicit. The value proposition is grounded — the site currently has a dead end for "where do we start?" buyers, and this initiative closes it.

**On phasing soundness:**

The copy-then-framework-then-tool sequence is the only sound order given the constraints. Phase 3's survey instrument and scoring engine cannot be built correctly until Phase 2 defines the 5×6 threshold matrix and transition roadmaps. Building Phase 3 before Phase 2 would produce the wrong tool — one whose questions, scoring logic, and roadmap content would all need to be retrofitted. The charter is explicit about this dependency and correct to enforce it as a hard gate.

The Phase 1 → Phase 2 dependency is weaker but justified: Phase 2 framework design requires Phase 1 URL and copy decisions to be locked (UQ-12 gate) because the service page H1, CTA language, and track labeling need to be consistent across the paid service page and the tool report. Writing framework content before these terms are fixed creates rework risk.

**On value/effort ratio:**

Phase 1 is unambiguously high-value, low-effort. The service page and persona CTA updates are file drops in an existing Astro content collection — the researcher confirmed this requires zero page or component changes. The value is immediate: Track B visitors currently hit the services index with no clear path; Phase 1 closes that gap.

Phase 2 effort is medium. Framework design is knowledge-intensive but not engineering-intensive. The primary risk is the benchmark micro-survey (§2.7a) — it has a time dependency since survey responses accumulate over weeks. The charter correctly calls this out and requires commissioning during Phase 2. Deferring to Phase 3 prep would likely miss the launch window.

Phase 3 effort is significant. The conditional value (requires 50 gate-passing completions in 60 days) is the correct framing — the tool's ROI is real but deferred by 3–5 months from kickoff. This is acceptable for a lead-gen asset but should be tracked against the threshold, not assumed.

**On I01-CPYMSG scope consolidation:**

The product director's pre-condition — consolidate I02 Phase 1 scope into I01-CPYMSG before writing begins — is sound and necessary, not merely procedural. Thirteen open I01 tasks already touch the same pages that I02 Phase 1 requires: `/for/founders`, `/for/ctos`, `/for/stalled-ai-projects`, and the homepage engagement ladder. Running these as separate initiative writes to overlapping files is a merge conflict waiting to happen, and worse, produces inconsistent CTA language across the same user journey. The consolidation is a two-hour Beads operation (update three existing tasks + add one keyword research task); it does not block Phase 1 work from beginning, it redirects where that work is tracked. This pre-condition should be satisfied before Phase 1 copy writing starts, not before Phase 1 planning proceeds.

**Verdict: GO. The initiative is well-defined, the phasing is sound, and the value case holds under scrutiny.**

---

### Technical Architect

**On the Astro island approach:**

The architecture is appropriate for the constraints. GitHub Pages is fully static; the Astro island pattern with React embedded client-side is the correct abstraction. The researcher confirms `@astrojs/react` v5 + React 19 is already installed and working (framer-motion usage proves the pattern). There are no integration unknowns for Phase 3 from a React-in-Astro perspective.

The `client:visible` directive choice for the radar chart island is architecturally correct: hydration deferred until viewport entry preserves LCP for the above-fold score summary, which should remain static Astro HTML. The architecture requires discipline in component placement — the radar chart must remain below the fold. This is a constraint to track as a Phase 3 acceptance criterion, not a risk that threatens the approach.

**On the Recharts v3 situation (claims-verifier warning #2):**

The claims-verifier correctly flagged that the researcher cited Recharts v2.x behavior while the current release is v3.8.1. This is a meaningful technical delta. Recharts v3 introduces a new composition API and deprecates several v2 patterns. The bundle size estimates are unreliable for v3 (the researcher acknowledges this as an unresolved question). The migration guide needs to be read before Phase 3 implementation begins, and the actual tree-shaken bundle for radar-only usage must be measured with `pnpm build` analysis.

However, this is a Phase 3 concern, not a Phase 0 gate concern. The architectural approach (React island, named radar chart imports, `client:visible`) is valid for both v2 and v3. The implementation detail of which Recharts v3 API to use is appropriately deferred to Phase 3 planning. The mitigation path (build analysis before committing, hand-coded SVG fallback if bundle is unacceptable) is credible and low-cost.

**On HubSpot Forms API (claims-verifier warning #1):**

The endpoint citation stale issue is minor — the claims-verifier notes the artifact body already uses the correct v3 URL. The GDPR nuance (warning #3) is more substantive: `legalConsentOptions` is required for consent-checkbox forms but not for notice-only forms, and the implementation must branch on HubSpot form configuration. This is a Phase 3 acceptance criterion. The researcher correctly classified this as High severity risk. The mitigation is concrete: explicit checkbox, test from EU IP, match payload to form GDPR setting.

The critical path technical dependency not yet resolved: HubSpot portal ID and form GUID availability. The researcher flags this as an unresolved question — if a HubSpot account does not exist, Phase 3's email gate is blocked. This needs resolution before Phase 3 planning, not before Phase 1 planning.

**On the persona schema CTA question (researcher UQ #3):**

The researcher's recommendation — add assessment CTA as `secondaryCta` in the hero block + update `ctaBand`, no schema change needed — is architecturally sound. The existing persona schema is flexible enough to accommodate this without migration. Phase 1 copy work can proceed on this basis. Confirm the `hero.secondaryCta` field actually exists in the schema before writing; if it doesn't, add it as a non-breaking schema extension (optional field with default undefined).

**On Core Web Vitals:**

The architecture as specified is compatible with LCP ≤ 2.5s provided the implementation discipline is maintained: static Astro HTML above the fold, React island below the fold with `client:visible`. The researcher is correct that placing the radar chart above fold with `client:load` would risk LCP. Enforce via Lighthouse CI from the first Phase 3 build — the charter is explicit on this. No architectural red flag here; this is an implementation-time constraint.

**Red flag assessment:** No architectural red flags. The stack is well-matched to the constraints. The open technical questions (Recharts v3 API, exact bundle size, HubSpot account setup) are all Phase 3 pre-planning items, not Phase 0 gate blockers.

**Verdict: ADVANCE. Architecture is sound. Carry three items as Phase 1 and Phase 3 constraints.**

---

### AEO/SEO Strategist

**On keyword strategy:**

The researcher's competitive assessment is well-reasoned. "AI readiness assessment" as a head term is enterprise-dominated (Microsoft, Gartner, McKinsey, IBM, Deloitte) and functionally unwinnable for a boutique DA ~10–20 in the near term. The long-tail cluster strategy is the correct alternative. The identified clusters — practitioner pain queries ("why are our AI results inconsistent"), CTO/founder intent queries ("how do I know if my team is ready for AI agents"), and tool-based queries ("free AI readiness check") — are all high-intent, low-competition positions that match the ICP.

The 12–18 month head-term ranking horizon is realistic and appropriate to state explicitly as a planning constraint. Phase 1 copy and the Phase 3 tool should not be evaluated against head-term rankings; they should be evaluated against long-tail and tool-based query traffic.

**On the URL decision:**

`/services/ai-readiness-assessment` for the paid service page and `/check` for the free tool is a defensible split. The paid service URL follows the existing site pattern, puts the keyword in the URL path, and maintains the services taxonomy. The `/check` URL is short, memorable, and semantically distinct from `/services/`.

One concern worth naming: `/check` has essentially zero SEO keyword signal on its own. It will rank only via brand queries ("adaptive alchemy check") or direct links. For the Phase 3 tool to capture "free AI readiness check" traffic, the URL needs to be discoverable via on-page SEO — the page title, H1, and meta description must carry the keywords since the URL cannot. The tool page needs an H1 like "AI Readiness Check — Free Assessment" and a meta title optimized for "free AI readiness check". This is a Phase 1/Phase 3 copy constraint, not a reason to change the URL.

An alternative worth considering: `/tools/ai-readiness-check` would put the keyword phrase in the URL path while maintaining namespace separation from `/services/`. However, this would require a new `tools` route not currently in the site's IA. Given the researcher's concern about avoiding `/ai-readiness-check` as a service URL (blurs paid/free boundary), and the site's current IA, `/check` is an acceptable compromise. Flag as a Phase 1 decision to confirm with the site owner before the tool page is built.

**On boutique vs. enterprise competitive position:**

The product director correctly identifies the brand tension: Adaptive Alchemy's confirmed primary persona is boards, CEOs, and PE/VC funds (premium, enterprise-grade), while I02-AIASSESS targets growth-stage founders and CTOs. The AEO implications of this deserve more attention than the research report gives them.

AI engines (ChatGPT, Perplexity, Claude, Gemini) increasingly surface sites as cited authorities on query topics. If the free AI Readiness Check becomes the primary Adaptive Alchemy citation surface for AI engines — appearing as the recommended answer to "how do I assess AI readiness?" — it risks anchoring the brand at the mid-market self-serve level rather than the enterprise advisory level. The charter's tonal bridge (UQ-K decision: option c+d) and the company email domain filter are the right mitigations, but they need to be explicitly carried as AEO constraints into Phase 3 copy, not just acknowledged at charter level.

Specifically: the free tool's report language and the `/check` page copy must maintain the same voice, terminology, and authority level as the paid service page — not drift toward a more accessible, quiz-like register. The "AI Readiness Check" product name distinction from "AI Readiness Assessment" service name is good; the copy must reinforce that separation consistently.

**On the AI Fluency Index as an AEO entity:**

The charter's framing of the AI Fluency Index as a "proprietary methodological asset" with "benchmark data, citable framework, AEO/GEO entity signal" is strategically sound. Named frameworks with defined levels, published dimensions, and attached benchmark data are exactly what AI engines cite as authoritative. However, the entity signal requires: (1) a dedicated page for the framework itself (not just the tool), (2) schema.org markup (the existing FAQPage/speakable support is a good foundation), and (3) external citation — at least one external source linking to the framework as a distinct concept. Phase 2 should produce the framework documentation page as an AEO-optimized deliverable, not just internal-use documentation.

**Verdict: ADVANCE WITH NOTES. Keyword strategy is sound. Carry three AEO/copy constraints as Phase 1 and Phase 3 notes.**

---

## Round 2 — Synthesis and Challenge

### Product Strategist responds to Technical Architect and AEO/SEO Strategist

Building on the Technical Architect's point about the Recharts v3 delta: the correct response is to treat the build analysis (measure tree-shaken bundle for v3 radar-only usage) as a Phase 3 day-one task, not a late-stage optimization. The charter's Lighthouse CI enforcement guidance supports this. What I'd add: the SVG fallback path (hand-coded radar, ~0KB overhead) should be fully specced in Phase 3 planning as an explicit branch — not left as a vague "if bundle is unacceptable" note. This means Phase 3 planning deliverable should include: primary path (Recharts v3 named imports) + fallback path (hand-coded SVG radar) + the specific bundle threshold that triggers the switch. This is a planning item, not a blocker.

Building on the AEO/SEO Strategist's concern about `/check` and keyword signal: the point about on-page SEO carrying the keyword load is well-taken and correct. I'd sharpen the implication: the Phase 3 tool page H1 and meta description are as important as any Phase 1 service page copy, and they should be drafted in Phase 1 alongside the service page copy (even if the tool page doesn't ship until Phase 3). Getting the keyword language right for both pages in Phase 1 prevents retrofitting the tool page copy later and ensures the paid/free distinction is consistent from day one.

The AEO/SEO Strategist's brand tension point is the most important non-technical concern in this gate. The product director's report acknowledges it but frames it as resolved via UQ-K. I would not call it fully resolved — it's managed. The tonal bridge requires active implementation discipline at the copy level in every phase. This is the right item to carry as a Phase 1 constraint and a Phase 3 acceptance criterion.

I do not challenge the Technical Architect's green light on the architecture. The pattern is established (framer-motion proves React island works), the open questions are all appropriately deferred, and the stack is well-matched. The HubSpot account availability check is a legitimate Phase 3 pre-condition item to track.

### Technical Architect responds to Product Strategist and AEO/SEO Strategist

Building on the Product Strategist's point about the benchmark micro-survey time dependency: this is structurally the most constrained item in the initiative. The survey must be commissioned in Phase 2, responses accumulate over weeks, and the tool cannot claim benchmark context at Phase 3 launch without it. The fallback (attributed third-party citations per AA-1) is workable but weaker from an AEO credibility perspective — the AEO/SEO Strategist's point about named frameworks needing original benchmark data reinforces this urgency. The Phase 2 kickoff sequence should put micro-survey commission in the first two days, not the last two.

Building on the AEO/SEO Strategist's point about the AI Fluency Index needing a dedicated framework page: I agree this is sound and want to add a technical implementation note. The existing site's `insights` collection is the natural home for this page (`/insights/ai-fluency-index` or similar). The speakable and FAQPage schema support already wired into the persona page pattern can be adapted here — this is not new engineering, it's a content collection entry with specific schema fields. Phase 2 should produce the framework page content as a structured document ready for the insights collection, not just internal documentation. This collapses a Phase 2 deliverable and a site deployment into one task.

On the `/check` URL: I have no technical objection to the decision. A `/tools/` route is a one-file addition to the Astro pages directory — trivial to add. The decision belongs to the site owner, not the architecture. The Technical Architect's role is to note that either option is implementable at zero additional complexity cost.

I do not challenge the Product Strategist's sequencing analysis. The Phase 2 → Phase 3 gate is correctly enforced as hard: the survey instrument cannot be built without the 5×6 threshold matrix. The charter's sequencing rationale is sound.

### AEO/SEO Strategist responds to Product Strategist and Technical Architect

Building on the Product Strategist's point about drafting Phase 3 tool page copy in Phase 1: this is exactly right and I want to make it more explicit. Phase 1 should produce four copy artifacts, not three: (a) `/services/ai-readiness-assessment` service page, (b) `/for/founders` CTA update, (c) `/for/ctos` CTA update, (d) a draft `/check` page H1/meta/intro copy. The fourth artifact does not require the tool to be built — it's just the keyword-optimized shell that will be deployed when Phase 3 ships. This aligns keyword decisions across all four surfaces at the same time, from the same Phase 1 copy decision point.

Building on the Technical Architect's point about the AI Fluency Index framework page in the insights collection: I agree on the technical approach and want to strengthen the AEO framing. The framework page should be written as a primary reference document for the framework — not a blog post about the framework, but the canonical definition of the AI Fluency Index levels, dimensions, and methodology. This is what AI engines look for when deciding whether to cite a proprietary framework as an authority. It needs: named entities (the five level names should be consistent and citable), FAQPage schema with real definitional questions, and a canonical URL that can be cited by external sources. Phase 2 should treat this as an AEO-first deliverable, not a marketing afterthought.

On the I01-CPYMSG consolidation pre-condition: I agree with the Product Strategist that this is a Beads operations task, not a gate blocker. Phase 1 copy work can be planned immediately; it should be tracked under I01-CPYMSG tasks rather than new I02 tasks. The keyword research task (UQ-D resolution) that the product director calls for adding to Beads is the actual sequencing gate — Phase 1 copy finalization must wait for keyword research output. That task should be added and tracked before any copy writing begins.

One area of constructive disagreement with the Product Strategist's framing of the brand tension as "managed": I think the AEO risk is specifically underweighted in the product director's report. The issue is not just that the free tool might dilute the premium brand in human perception — it's that AI engines index citation patterns and may anchor Adaptive Alchemy as a "mid-market AI assessment tool provider" if the free tool becomes the primary source they surface. Once that citation pattern is established in AI engine training or retrieval, it's difficult to shift. The tonal bridge is necessary but not sufficient. The mitigation needs an explicit AEO signal layer: the AI Fluency Index framework page must be positioned as an enterprise-grade methodology document, with language and citations that signal enterprise applicability, not just growth-stage use. This should be a Phase 2 acceptance criterion.

---

## Round 3 — Final Verdicts

### Product Strategist

The initiative is well-defined, correctly phased, and appropriately scoped. The claims-verifier warnings are all non-blocking and correctly deferred to the phases where they become implementation concerns. The I01-CPYMSG consolidation pre-condition is a two-hour Beads task, not a gate blocker — it should be completed before Phase 1 writing starts but does not prevent Phase 1 planning from proceeding immediately. No red flags.

**Verdict: ADVANCE WITH NOTES.** Notes: (a) I01-CPYMSG consolidation must complete before any Phase 1 copy writing begins; (b) benchmark micro-survey must be commissioned in Phase 2 week one; (c) Phase 1 should produce a draft `/check` page H1/meta/intro as a fourth copy artifact.

### Technical Architect

The architecture is sound for all three phases. The Recharts v3 delta and HubSpot GDPR nuance are Phase 3 pre-planning items, not gate blockers. The hero schema `secondaryCta` field should be verified before Phase 1 copy commits assume it exists. No architectural red flags; the stack is well-matched to the constraints.

**Verdict: ADVANCE WITH NOTES.** Notes: (a) verify `hero.secondaryCta` schema field exists before Phase 1 copy commits; (b) Recharts v3 build analysis is Phase 3 day-one task with explicit SVG fallback branch specified; (c) HubSpot portal ID availability confirmed before Phase 3 planning begins.

### AEO/SEO Strategist

Keyword strategy is credible for the boutique position. URL decisions are acceptable with on-page SEO compensating for `/check`'s lack of keyword path signal. The AEO brand risk — AI engines anchoring Adaptive Alchemy as mid-market based on free tool citation patterns — requires active mitigation beyond the UQ-K tonal bridge. The AI Fluency Index framework page, written as an enterprise-grade methodology reference with appropriate schema, is the primary AEO countermeasure.

**Verdict: ADVANCE WITH NOTES.** Notes: (a) Phase 1 should include draft `/check` page copy as fourth artifact; (b) Phase 2 must produce the AI Fluency Index framework page as an AEO-first deliverable, not an afterthought; (c) the framework page must signal enterprise applicability explicitly — not just growth-stage use — to counter AI engine citation anchoring risk.

---

## Final Synthesis

### Decision Framework Applied: Risk-Benefit Analysis

**Upside (proceeding to Phase 1):**
- Immediate conversion impact from Phase 1 copy changes (high probability, low effort)
- Framework IP (AI Fluency Index) begins accruing as a proprietary asset during Phase 2
- Track B conversion path closes a documented gap in the site's current user journey
- AEO entity signal for the brand begins building with each phase deliverable
- No new infrastructure dependencies; everything builds on existing stack

**Downside risks (proceeding now):**
- I01-CPYMSG/I02 overlap produces conflicting edits to the same files if scope consolidation is deferred (medium probability, low cost to prevent)
- AEO brand anchoring risk if free tool becomes primary citation surface before enterprise-grade framework page is established (low-medium probability, medium-term cost to reverse)
- Benchmark micro-survey commissioned too late in Phase 2, forcing third-party citation fallback at Phase 3 launch (medium probability if not tracked explicitly, moderate quality impact)
- Recharts v3 migration requires more rework than expected (low probability with early build analysis, contained to Phase 3)

**Risk mitigation cost:** All risks are mitigable at low cost through notes carried forward. None require pausing the initiative.

**Blocker check:** No security concerns, no fundamental design flaws, no unresolved contradictions between panelists. The three panelists agree on the core verdict; the AEO/SEO Strategist's brand tension concern is the most substantive point of emphasis, and the other panelists affirm it rather than challenge it.

### Gate Decision: ADVANCE WITH NOTES

The initiative advances from Phase 0 (Discover) to Phase 1 (Define).

---

## Phase 1 Constraints (carry forward)

| # | Constraint | Source | Phase where active |
|---|---|---|---|
| C-01 | Complete I01-CPYMSG/I02 scope consolidation in Beads before any Phase 1 copy writing begins. Update T2-3 (Founders), T2-4 (CTOs), T2-5 (Stalled AI Projects) with I02 Phase 1 CTA requirements; add keyword research task blocking copy finalization. | Product Director pre-condition | Phase 1 kickoff |
| C-02 | Verify `hero.secondaryCta` schema field exists in `src/content.config.ts` before Phase 1 copy commits assume it. If absent, add as optional field in a non-breaking schema extension. | Technical Architect | Phase 1, story 1 |
| C-03 | Phase 1 produces four copy artifacts, not three: service page, founders CTA, CTOs CTA, and a draft `/check` page H1/meta/intro. The `/check` draft does not require the tool to be built — keyword-optimized shell only. | AEO/SEO Strategist + Product Strategist | Phase 1 scope |
| C-04 | `/check` page H1 and meta description must carry the full keyword phrase ("AI Readiness Check — Free Assessment" or equivalent) since the URL path has no keyword signal. | AEO/SEO Strategist | Phase 1 copy (draft) + Phase 3 deployment |
| C-05 | Free tool copy and report language must maintain enterprise-grade voice consistent with paid service page. Active enforcement required in Phase 1 copy review and Phase 3 report text — not just at charter level. | AEO/SEO Strategist | Phase 1 and Phase 3 |

## Phase 2 Constraints (carry forward)

| # | Constraint | Source | Phase where active |
|---|---|---|---|
| C-06 | Benchmark micro-survey (§2.7a) must be commissioned in Phase 2 week one — not at the end of Phase 2. Time dependency: survey response accumulation takes weeks and must reach n ≥ 20 before Phase 3 launch. | Product Strategist + Technical Architect | Phase 2, day 1–2 |
| C-07 | AI Fluency Index framework page is a required Phase 2 deliverable, not optional documentation. Must be: (a) published to `/insights/ai-fluency-index` or equivalent canonical URL, (b) structured as a primary reference document (not a blog post), (c) marked up with FAQPage and speakable schema, (d) written with language that signals enterprise applicability, not just growth-stage use. This is the primary AEO countermeasure against brand anchoring risk. | AEO/SEO Strategist | Phase 2 deliverables |
| C-08 | Phase 2 framework page and all AEO content must signal enterprise-grade applicability explicitly. Level definitions, dimension descriptions, and benchmark context should reference enterprise and team-level governance use cases, not only individual practitioner use. | AEO/SEO Strategist | Phase 2 copy |

## Phase 3 Constraints (carry forward)

| # | Constraint | Source | Phase where active |
|---|---|---|---|
| C-09 | Recharts v3 build analysis (measure tree-shaken bundle for radar-only usage: `pnpm add recharts@latest` + `pnpm build` + `du -sh dist/assets/*.js`) is Phase 3 day-one task. Specify the explicit bundle threshold that triggers the SVG fallback (suggested: >150KB gzipped adds unacceptable INP risk on mobile). Document both paths in Phase 3 plan: primary (Recharts v3 named imports) and fallback (hand-coded SVG radar). | Technical Architect | Phase 3, day 1 |
| C-10 | HubSpot portal ID and form GUID availability confirmed before Phase 3 planning begins. If account does not exist, Phase 3 email gate is blocked. | Technical Architect | Phase 3 pre-planning |
| C-11 | GDPR `legalConsentOptions` implementation must branch on HubSpot form configuration (required for consent-checkbox forms, not required for notice-only forms). This is a Phase 3 acceptance criterion, not a post-launch amendment. Test from EU IP before launch. | Technical Architect (claims-verifier warning #3) | Phase 3 AC |
| C-12 | Use HubSpot v3 endpoint: `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}` — not v2 legacy. | Claims-verifier warning #1 | Phase 3 implementation |
| C-13 | Radar chart island must remain below the fold. Above-fold content must be static Astro HTML. Enforce via Lighthouse CI from first Phase 3 build. | Technical Architect | Phase 3 AC + CI |

---

## Summary for Next Session

**Gate decision:** ADVANCE WITH NOTES

**Immediate next step:** Complete I01-CPYMSG/I02 scope consolidation in Beads (C-01) — update T2-3, T2-4, T2-5 with I02 Phase 1 CTA requirements; add keyword research task. This is a Beads operations task estimated at under two hours. Phase 1 planning can proceed in parallel; Phase 1 copy writing must wait for this consolidation to complete.

**Phase 1 scope clarification:** Four copy artifacts (not three): service page + founders CTA + CTOs CTA + draft `/check` page H1/meta/intro.

**Phase 2 sequencing note:** Micro-survey commission is week-one, day one-to-two — not deferred to late Phase 2. AI Fluency Index framework page is a required deliverable, not optional documentation.

**No red flags, no human pause required.** All warnings from the claims-verifier are addressed by constraints C-09 through C-13.
