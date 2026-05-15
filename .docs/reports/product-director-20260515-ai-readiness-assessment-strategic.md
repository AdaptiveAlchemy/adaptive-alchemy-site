---
report_type: strategic-assessment
initiative: I02-AIASSESS
agent: product-director
date: 2026-05-15
status: complete
---

# I02-AIASSESS Strategic Assessment — Product Director

## Strategic Alignment Verdict

**Strong alignment. This is the right initiative now.**

I02-AIASSESS directly operationalizes the engagement ladder that is central to the Adaptive Alchemy brand: Assess → Design → Pilot → Transform → Operate. Currently, the site describes this ladder but gives growth-stage founders and CTOs no self-serve entry point. Every day without a clear "where do I start?" surface costs top-of-funnel leads that would otherwise qualify into Track B (€8–15K). The initiative also resolves the premium-vs-accessible tension by creating a deliberate tonal bridge (UQ-K decision: option c+d) rather than a separate microsite — smart for a solo/small-team operation.

The initiative is tightly scoped to existing capabilities: Astro static site, HubSpot already chosen, no backend required for v1. No new infrastructure dependencies. The framework (AI Fluency Index) builds a proprietary methodological asset that compounds over time: benchmark data, citable framework, AEO/GEO entity signal.

One tension to name: the site's confirmed primary persona is boards, CEOs, and PE/VC funds. I02-AIASSESS targets founders and CTOs at growth-stage companies — a deliberate lower-market expansion. This is not a misalignment; it is a planned diversification of the funnel. The Track C routing (Agent Strategy Advisory) returns the tool's top scorers directly to the existing enterprise advisory buyer profile. The strategic risk is dilution of premium brand signal if the free tool becomes the primary Adaptive Alchemy citation surface for AI engines — acknowledged in UQ-K and resolved with the tonal bridge + company email domain filter.

## Value vs. Effort Ratio

| Phase | Effort | Value | Ratio |
|---|---|---|---|
| Phase 1 — Copy | Low (days) | High — immediate CTA surface, no dead ends for Track B visitors | Excellent |
| Phase 2 — Framework design | Medium (1–2 weeks) | High — creates the IP that differentiates the tool and the paid report | Strong |
| Phase 3 — React tool | Significant (3–6 weeks eng.) | High, but conversion value accrues with traffic volume | Conditional |

Phase 1 value is unambiguous and nearly zero-risk. The 13 open I01-CPYMSG beads issues confirm the site is mid-copy-update; Phase 1 of I02-AIASSESS overlaps with that work.

Phase 3 value is real but deferred — it requires Phase 2 to be complete and the tool to achieve minimum traffic (50 gate-passing completions in 60 days per UQ-10 threshold). The value realization timeline for Phase 3 is 3–5 months from kickoff. This is acceptable for a lead-gen asset but means Phase 3 ROI is not felt this quarter.

## Sequencing Recommendation

**I01-CPYMSG and I02-AIASSESS Phase 1 must be consolidated, not run in parallel.**

The current beads backlog has 13 open I01-CPYMSG issues covering homepage hero, homepage inline copy, CTABand, approach page, and persona pages (/for/founders, /for/ctos, /for/stalled-ai-projects, and others). I02-AIASSESS Phase 1 touches the same pages:

- `/for/stalled-ai-projects` — directly overlapping rewrite
- `/for/founders` — add assessment CTA
- `/for/ctos` — add assessment CTA
- Homepage engagement ladder — Assess as standalone product
- New page: `/services/ai-readiness-assessment`

Running these as separate initiatives will produce conflicting edits to the same files. The recommended sequencing:

1. **Consolidate Phase 1 scope into I01-CPYMSG** — treat I02-AIASSESS Phase 1 as additional copy scope within the existing I01-CPYMSG initiative. The persona page issues (T2-3, T2-5, T2-4) should be updated to include I02 Phase 1 requirements before those tasks are picked up. No new Beads initiative needed for Phase 1 alone.

2. **Keyword research gates Phase 1 copy** — UQ-D mandated keyword research before Phase 1 URL and copy decisions are finalized. This is a T2 task (Gemini, ~1 day) and must precede writing any Phase 1 copy on the assessment. Unblock the existing T1-x homepage issues in parallel since they do not touch the assessment URL.

3. **Phase 2 starts when Phase 1 copy is signed off** — the framework design work is independent of engineering but requires Phase 1 copy decisions locked (UQ-12 gate). Phase 2 can begin immediately after keyword research + Phase 1 founder sign-off.

4. **Phase 3 starts when Phase 2 framework is locked** — the 5×6 matrix, transition roadmaps, intake questionnaire, routing thresholds, and AEO/GEO deliverables must all be complete before Phase 3 engineering begins. Starting Phase 3 early produces the wrong survey.

## Go/No-Go Verdict

**GO — with one pre-condition.**

The charter is draft-hardened, all 32 UQs are resolved, phasing is clear, and the value proposition is defensible. The initiative is appropriately scoped for a small team operating on a static site with HubSpot.

Pre-condition before Define phase begins: **Complete the I01-CPYMSG/I02-AIASSESS Phase 1 scope consolidation.** Specifically, update the three persona page beads issues (T2-3 Founders, T2-4 CTOs, T2-5 Stalled AI Projects) to include the I02-AIASSESS Phase 1 CTA requirements, and add a new beads issue for the keyword research task (UQ-D) that blocks Phase 1 copy finalization.

## Phase Prioritization Guidance

**Phase 1 — Start immediately (this sprint).**
Zero dependencies. Highest immediate conversion impact. Consolidate with open I01-CPYMSG issues.

**Phase 2 — Start after Phase 1 copy sign-off.**
Pure knowledge work: framework design, scoring matrix, transition roadmaps, intake instrument, AEO/GEO deliverables, brand usage spec. No engineering required. The micro-survey (UQ-E / §2.7a) must be commissioned during Phase 2 — this has a time dependency since survey response accumulation takes weeks. Do not defer the survey commission to Phase 3 prep.

**Phase 3 — Plan now, build after Phase 2 lock.**
The engineering architecture is well-specified: Astro island pattern, React client component, HubSpot Forms API, client-side scoring, Recharts radar. No surprises in the stack. The primary Phase 3 risks are:

- **GDPR consent (AA-3)** — must be treated as a Phase 3 acceptance criterion, not a post-launch amendment. The charter is explicit on this.
- **Benchmark data state at launch (UQ-15)** — plan for the external-citations fallback in the React component from day one.
- **CWV targets (UQ-7)** — LCP ≤2.5s with a radar chart + HubSpot embed is achievable but requires deliberate implementation choices (dynamic import, `client:visible`). Enforce via Lighthouse CI from the first build, not as a final gate.
- **Track A dead-end (UQ-A)** — the routing question at intake (Option 1 decision) is a Phase 3 AC; it must be implemented, not deferred.

No recommendation to defer Phase 3 entirely — but Phase 3 build should not start until Phase 2 delivers the 5×6 matrix, routing thresholds, and intake questionnaire. The sequencing rationale in the charter is correct.
