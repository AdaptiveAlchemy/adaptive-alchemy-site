---
title: AI Readiness Assessment Initiative Roadmap
initiative: I02-AIASSESS
charter: charters/charter-I02-AIASSESS.md
scenarios: charters/charter-I02-AIASSESS-scenarios.md
date: 2026-05-15
status: active
horizons:
  now: Phase 1 — Site Copy
  next: Phase 2 — Framework Design
  later: Phase 3 — Free Assessment Tool
  deferred: v2 scope items
---

# I02-AIASSESS Roadmap — AI Readiness Assessment

This roadmap maps initiative phases to delivery horizons. Each horizon is independently shippable. Phase gates are defined in the charter (UQ-12) and validated by the acceptance scenarios in `charter-I02-AIASSESS-scenarios.md`.

---

## Now — Phase 1: Site Copy (current sprint)

Goal: establish a clean entry point for "where do we start?" buyers before building anything new. Ships with no new tooling.

**Gate condition:** All six Phase 1 lock criteria satisfied (S08). Founder sign-off required. Methodology provenance note has no bracketed placeholders.

### Deliverables

**1. Keyword research (prerequisite — gates all other Phase 1 work)**
- Commission keyword research for "AI readiness assessment" and related terms using T2 agents (Gemini)
- Decide assessment URL slug (/check is the working assumption from charter)
- Confirm H1 and meta title conventions per the two-label strategy: "AI Readiness Assessment" for the service page; "AI Readiness Check" for the tool shell page

**2. /services/ai-readiness-assessment — new service page**
- H1: "AI Readiness Assessment" (primary SEO label)
- Sections: What it is, What you get, Who it's for, What comes next, Not for
- Conviction copy: scope signal + risk-reduction signal + scoping call CTA
- No price anchor (UQ-2 decision: defer until validated through 5 scoping calls)
- Explicit "not for" section with three criteria in trust-building framing (S02)
- Methodology provenance note with founder-completed bracketed fields (S03)
- Acceptance scenarios: S01, S02, S03

**3. /check — static Astro shell page**
- H1 and meta: "AI Readiness Check" keyword phrase (S10)
- Introductory static paragraph rich enough for Googlebot and AI crawlers without JS (S09)
- FAQPage JSON-LD in raw HTML (pre-Phase 2 FAQ copy: placeholder until AEO deliverable completes)
- React assessment island referenced via client:visible (island placeholder in Phase 1; wired in Phase 3)
- Acceptance scenarios: S09, S10

**4. Persona page CTA updates**
- /for/founders: inline or sidebar CTA framed for founder audience, interim booking link (S04)
- /for/ctos: inline or sidebar CTA framed for technical leadership, distinct copy from founders CTA (S05)
- /for/stalled-ai-projects: full lead section rewrite — clarity framing, maturity spectrum intro, primary CTA to scoping call (S06)
- Acceptance scenarios: S04, S05, S06

**5. Homepage engagement ladder update**
- Assess tier described as standalone fixed-scope product, not only the first step of a larger engagement (S07)
- Full ladder sequence preserved: Assess → Design → Pilot → Transform → Operate
- Acceptance scenarios: S07

**Phase 1 is locked when:** keyword research complete AND URL slug decided AND service page live with approved copy AND persona CTAs pointing to decided URL AND homepage updated AND founder sign-off recorded AND methodology note has no placeholders (S08).

---

## Next — Phase 2: Framework Design (1–4 weeks after Phase 1 lock)

Goal: produce the process assets that Phase 3 tooling will implement. No public-facing product ships in this phase. All work is internal documentation and copy briefs.

**Prerequisite:** Phase 1 locked (S08 passes).
**Gate condition:** All seven Phase 2 lock criteria satisfied (S16). Founder sign-off required.

### Deliverables

**1. Adaptive Alchemy AI Fluency Index framework documentation**
- 5-level maturity spine: Curious → Emerging → Practicing → Systematic → Agent-Ready
- 6-dimension definitions including Governance and Systematization as a crosscutting concern
- Enterprise-grade differentiation documented: governance requirements, agent frontier definition, auditability criteria
- AI Fluency Index brand usage spec: canonical name, approved shorthand, HubSpot property naming, report label format, Schema.org name field (S13)
- Acceptance scenarios: S13

**2. 5×6 dimension-threshold matrix**
- Numeric threshold value for each of 6 dimensions at each of 5 levels
- Band label for each cell: STRONG / FUNCTIONAL / DEVELOPING / NOT YET
- Gate scoring logic documented: maturity level = highest level where all 6 thresholds are met
- Binding constraint identification logic: which failing dimension is the primary gate
- Acceptance scenarios: S11, S12

**3. Five transition roadmaps**
- Roadmaps for: 1→2, 2→3, 3→4, 4→5, and the Level 5 frontier state
- Each roadmap: what the level change unlocks + 2–3 specific executable moves + binding constraint identification
- Report shows only the next-level roadmap (not the full 5-level path)

**4. Three-track routing specification**
- Track A (Levels 1–2): Foundations Workshop CTA language and routing threshold
- Track B (Levels 3–4): AI Readiness Assessment CTA language and routing threshold
- Track C (Levels 4–5, high Dimension 6): Agent Strategy Advisory CTA language and routing threshold
- Level 4 with low Dimension 6 → Track B (not Track C): routing rule explicitly documented
- Numeric Dimension 6 threshold that triggers Track C routing
- Acceptance scenarios: S25a, S25b, S25c, S25d

**5. Intake questionnaire design**
- 6-dimension survey questions with maturity-calibrated Likert anchors
- Scenario questions with 4 behavior-based answer choices (each wrong choice reveals a specific failure mode)
- Contextual questions: role, workflow focus, tool environment, data sensitivity
- Intake routing question copy: "Has your team used AI tools in actual work, at least occasionally?"
- Framing routing question copy: "Are you assessing primarily your own practice or your team's readiness?"
- All answer options use concrete, observable behavior descriptions — no abstract readiness descriptors (S30)
- Branching spec for individual vs. team framing routing (S19, S19b)
- Acceptance scenarios: S19, S19b, S30, S32, S32b

**6. Benchmark micro-survey (time-sensitive: commission on Phase 2 day 1–2)**
- 10–15 questions covering 6 dimensions and overall AI readiness level
- 5-minute estimated completion time
- Sent to existing Adaptive Alchemy contact list
- Minimum response target: n ≥ 20 before Phase 3 launch documented as a gate condition
- Launch fallback if n < 5: documented in Phase 3 spec (third-party citations per AA-1)
- Acceptance scenarios: S15, S29, S29b

**7. AEO/GEO deliverables**
- 10–15 target AI query list at three intent levels: informational, navigational, transactional (S14)
- FAQ copy: 10–15 Q&A pairs anchored to target queries, ready for FAQPage JSON-LD
- Static sample report page brief: content spec and format spec for a citable artifact
- Acceptance scenarios: S14

**8. Phase 3 pre-implementation specs**
- Report copy brief: enterprise-grade voice spec, consequence framing requirement, no AdviceForge references
- Track B paid engagement deliverable description (9 report sections per §2.4) — what the Phase 3 CTA sells into
- UQ-19 branching spec documented in Phase 3 §3.1 before report copy is written
- HubSpot contact property schema: ai_fluency_level, company_email_domain, dimension score properties, track tag

**Phase 2 is locked when:** 5×6 matrix complete AND all five transition roadmaps written AND intake questionnaire drafted AND routing thresholds defined numerically AND AEO/GEO deliverables complete AND brand usage spec complete AND founder sign-off recorded (S16).

---

## Later — Phase 3: Free Assessment Tool (4–12 weeks after Phase 2 lock)

Goal: deliver a free self-serve "AI Readiness Check" that produces an instant personalized report, gates the full report behind a work email, and routes respondents into the right track CTA.

**Prerequisites:** Phase 2 locked (S16 passes) AND HubSpot portal ID confirmed AND form GUID confirmed (S31).
**Gate condition:** All Phase 3 acceptance criteria pass (S17–S32), Lighthouse CI enforced from first build (S27).

### Deliverables

**1. Day one: Recharts v3 bundle analysis and architecture decision**
- Run build analysis measuring Recharts v3 gzip bundle contribution
- Decision point: proceed with Recharts OR activate SVG fallback path
- Document decision before any radar chart implementation begins (S28)

**2. /check assessment React island**
- Multi-step survey component with step counter or progress bar (S17)
- Intake routing question as first question (S32, S32b)
- Framing routing question (individual vs. team) at intake (S19, S19b)
- All answer options behavior-based — no abstract descriptors (S30)
- Client-side only — no server calls during survey
- Loaded via client:visible (never in main bundle)

**3. Scoring engine**
- Pure JavaScript, deterministic from answers
- Gate logic: level = highest level where all 6 dimension scores meet their thresholds (S12, S18)
- Binding constraint identification: which dimension fails the gate (S12)
- Track routing: A / B / C output based on level and Dimension 6 score (S25a–S25d)
- No server call required

**4. Email gate and consent form**
- Appears after ungated score display (S20)
- Work email input with client-side domain blocklist validation (S21, S21b)
- Blocklist in version-controlled config array: gmail.com, hotmail.com, yahoo.com, outlook.com, icloud.com (S21c)
- Inline error message on blocked domain: "Please use your work email — assessment results are designed to be shared with your team."
- Explicit GDPR opt-in checkbox with plain-language label (S20, S22b)
- Consent checkbox required before submission fires (S22b)

**5. HubSpot integration**
- HubSpot Forms API v3 endpoint (not v2) (S22)
- legalConsentOptions object in request body (S22)
- Hidden fields: ai_fluency_level, company_email_domain, dimension scores, workflow focus, role, track tag
- No email sequence trigger before affirmative consent recorded (S22b)
- Track A / B / C tagging via HubSpot workflow on submission

**6. Gate scoring explanation screen**
- Displayed after email submission and before scored result (S26)
- Plain-language explanation of gate logic (not an average)
- Explains that one dimension can hold the user back even if the rest are strong

**7. Report renderer: 9-section full report**
- Section order: Score + level → Journey strip → Radar chart → Dimension scorecard → Interpretation → Benchmark context → Next level → Build step → Track CTA (S23)
- Journey strip: 5-node linear progress bar, current level highlighted
- Radar chart: filled current state + Level N+1 outline + binding constraint axis in accent color; loaded via dynamic import; below the fold (S27)
- Dimension scorecard: 6 bars with STRONG / FUNCTIONAL / DEVELOPING / NOT YET labels; binding constraint labeled "Fix first"
- Benchmark stat cards: source + date + sample size on every card; null data collapses section to third-party citations (S29, S29b)
- Next-level section: only one transition roadmap (next level only, not full path)
- Individual vs. team framing applied to Interpretation and Next Level sections (S19, S19b)
- Track CTA copy per routing decision (S24, S25a–S25d)
- Methodology note in report footer: no AdviceForge references, no placeholders (S03, S30b)

**8. Service schema and FAQPage schema**
- Astro JSON-LD component implementing Service schema on /check page
- FAQPage JSON-LD using Phase 2 AEO FAQ copy
- Both schemas in static HTML (not injected by JavaScript) (S09)

**9. Sample report static page**
- Static Astro page from Phase 2 brief
- Citable artifact for AI engines before they can render the dynamic tool

**10. Lighthouse CI enforcement**
- Configured from the first Phase 3 build
- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 on simulated 4G
- Build fails if thresholds are exceeded (S27)

**11. Distribution launch actions (UQ-10)**
- Primary traffic: organic search + LinkedIn
- Launch seeding: founder LinkedIn post + newsletter mention + direct outreach to 20 existing contacts
- Traffic threshold: if fewer than 50 gate-passing completions in 60 days, switch to active promotion

**Phase 3 is done when:** all walking skeleton scenarios pass (S09, S17, S18, S20, S22, S24, S27) AND all remaining Phase 3 scenarios pass AND Lighthouse CI thresholds are enforced AND HubSpot submission confirmed in staging with real portal ID.

---

## Deferred — v2 Scope

Items explicitly descoped from v1 per charter decisions. Do not re-open without a scope decision recorded in Beads.

| Item | Charter Decision | Deferral Rationale |
|------|-----------------|-------------------|
| URL persistence for re-take | UQ-B: descoped to v2 | Incompatible with GitHub Pages static constraint; localStorage is device-scoped |
| Re-take comparison (delta view) | UQ-B: descoped to v2 | Requires saved state; v1 re-take mechanism is email delivery only |
| Track A product (Foundations Workshop) | Not in Phase 3 v1 scope | Separate product build; Phase 3 surfaces it as a CTA but product is unbuilt |
| PDF export (jsPDF) | UQ-8: defer to v2 | ~500KB bundle hit; replaced by "email me the report" HubSpot trigger |
| Team aggregate scoring | Out of v1 scope | Multi-user assessment is a paid Track B engagement feature |
| 5 static maturity-level landing pages | UQ-C: Phase 3 enhancement | Organic long-tail query cluster; evaluate after Phase 3 traffic data |
| Admin analytics dashboard | Out of v1 scope | HubSpot is sufficient for v1 analytics |
| Localization | Out of v1 scope | English only at launch |

---

## Metrics and Review

**Leading indicators (Phase 3 launch)**
- Tool completion rate: target ≥ 60% of starters
- Email capture rate (gate-passing submissions): target ≥ 70% of completers

**Lagging indicators (90-day review)**
- Track B inquiry rate: target ≥ 10% of email-captured Track B scorers within 90 days
- Track B closed-won rate from tool-sourced leads: baseline to be set after first 20 leads

**90-day review trigger:** Review all four metrics at 90 days post-Phase 3 launch. If completion rate or email capture rate fall below target, activate active promotion (UQ-10 threshold). If Track B inquiry rate is below target, review CTA copy and routing logic before v2 planning.

**Benchmark data upgrade trigger:** When AA proprietary benchmark data reaches n ≥ 20, upgrade stat cards from third-party citations to proprietary AA data. Publish a public benchmark page.
