---
title: AI Readiness Assessment — Initiative Plan
initiative: I02-AIASSESS
date: 2026-05-14
status: draft
related-assessments:
  - assessments/offering-expansion-lower-market-2026-05-14.md
---

# I02-AIASSESS: AI Readiness Assessment Initiative

## What this is

Three sequential phases that together create a new top-of-funnel acquisition surface for Adaptive Alchemy, capture the lower-market "where do we start?" segment, and build a differentiated free tool that routes prospects into the right paid engagement.

Each phase is independently shippable and builds on the previous one. Phase 1 can go live with no new tooling. Phase 3 is a net-new product.

---

## Phase 1 — Site Copy Updates
*Prerequisite: none. Ships independently.*

The existing site doesn't have a clean entry point for companies that want to start, not transform. Before building anything new, the copy needs to reflect the productized Assess offer.

### 1.1 Update `/for/stalled-ai-projects`

Current state: likely leads with transformation narrative.

Required changes:
- Lead section reframes from "your AI project is stuck" → "you need clarity before commitment"
- Introduce the maturity spectrum early (one line each on Curious → Agent-Ready) so the reader can self-locate
- Primary CTA changes to the free assessment (once Phase 3 ships) or to a "Start with an Assess" scoping call (interim, Phase 1 CTA)
- Clarify language: this page is the right landing spot for Track A and Track B buyers (levels 1–4 on the maturity model)
- Hero line candidate: *"Before you know where you're going, you need to know where you actually are."*

### 1.2 Add or update `/services/ai-readiness-assessment`

Decision to make: new page vs. absorbing into existing `/services/technology-strategy-assessment`.

Recommendation: **new page**. The Technology Strategy Assessment serves a different buyer (boards/investors evaluating portfolio companies). The AI Readiness Assessment is operational, not strategic — it's for teams, not boards. Keeping them separate protects the premium positioning of the Technology Strategy Assessment.

New page structure:
- What it is (fixed-scope, 2–3 week sprint, one team)
- What you get (AI Readiness & Opportunity Map — maturity score, dimension breakdown, prioritized 90-day roadmap)
- What it costs (~$8–15K — TBD after pricing validation)
- Who it's for (Track B: Practicing/Systematic, levels 3–4 — team has tried AI, results are inconsistent)
- What comes next (natural path into Design → Pilot)
- Explicit "not for" section (mirrors AdviceForge's honest framing — no, we don't introduce AI to teams that haven't started)

### 1.3 Add assessment CTA to relevant persona pages

Pages to update:
- `/for/founders` — add sidebar or inline CTA: "Not sure where your team is? Start with the free check."
- `/for/ctos` — same CTA, framed for technical leadership audience
- `/for/stalled-ai-projects` — primary CTA

Interim CTA (before the free tool ships): booking link for a 30-minute scoping call positioned as "Find your maturity level."

### 1.4 Update engagement ladder on homepage / services index

The ladder (Assess → Design → Pilot → Transform → Operate) should acknowledge that Assess is also available as a standalone product with a fixed scope and fixed fee — not just the first step of a larger engagement.

---

## Phase 2 — Assess Offering Design
*Prerequisite: Phase 1 copy decisions locked. Produces the process assets that Phase 3 tooling implements.*

Before building the tool, the underlying framework needs to be fully specified. The synthesis from the AdviceForge analysis gives us a strong starting point but it needs to be adapted to Adaptive Alchemy's positioning (enterprise-grade, agent-ready, governance-aware) and the three-track structure.

### 2.1 Define the Adaptive Alchemy maturity model

The 5-level spine from the synthesis is solid. Adaptive Alchemy's version needs three additions AdviceForge doesn't have:

1. **Governance & Controls** as a crosscutting concern at every level — AdviceForge's framework is individual/team-focused and doesn't ask about data policy, tool governance, or auditability. For Adaptive Alchemy's ICP (founders, CTOs, operating executives), this is table stakes. The enterprise-ready differentiator shows up here.

2. **The agent frontier is named and concrete** — AdviceForge gestures at "agent-style work" but doesn't define it. Adaptive Alchemy's Level 5 (Agent-Ready) should specify what that actually means: workflows that can run without per-instance supervision, clear handoff points, auditability of agent outputs.

3. **Per-level dimension thresholds** — The scoring model uses strict gates, not averages (see §2.6). This requires defining what "meets threshold" means for each dimension at each level: a 5×6 matrix. This is the primary Phase 2 design artifact — it drives both the scoring engine and the next-level roadmap content.

| Level | Name | Adaptive Alchemy framing |
|---|---|---|
| 1 | Curious | AI-aware, no recurring use, not sure where it fits |
| 2 | Emerging | Using AI for some tasks but inconsistently — by recall, not design |
| 3 | Practicing | Regular AI use in specific tasks, some saved prompts, variable results |
| 4 | Systematic | Deliberate workflow redesign, templates, measurement — you know if it's working |
| 5 | Agent-Ready | Systematic use + workflows specified precisely enough to consider supervised automation |

### 2.2 Define the 6 dimensions (Adaptive Alchemy version)

Adapted from the synthesis to include governance and to be honest about the enterprise/team context:

| # | Dimension | Core question | AA distinction vs. AdviceForge |
|---|---|---|---|
| 1 | Task Recognition | Do you know which recurring tasks AI could materially change? | Same — works for novices and experts |
| 2 | Context & Prompting | Can you give AI what it actually needs — real materials, real constraints? | Same |
| 3 | Workflow Design | Are you using AI inside deliberate processes, or just when you remember? | Same |
| 4 | Judgment & Verification | Do you know when to trust, check, or reject AI output? | Same |
| 5 | Delivery & Integration | Does AI work end up in the artifact people actually use? | Same |
| 6 | Governance & Systematization | Are you building reusable, auditable methods — and do you know what can't go into AI? | **AA adds governance**: data policy, tool approval, output accountability. AdviceForge calls this "Personal Discipline" and focuses only on consistency. |

Dimension 6 is where the agent conversation opens naturally — *"Can you describe this process precisely enough that someone else could run it the same way every time?"* That question is the bridge from Systematic to Agent-Ready, and it's the natural handoff into Track C and the broader Adaptive Alchemy engagement ladder.

### 2.3 Define the three tracks and routing logic

**Track A — Foundations** (Levels 1–2)
- Offering: AI Foundations Workshop (half-day facilitated or async)
- Outcome: leave with one workflow running, not a theory of AI
- Price: €500–2K individual / €3–5K team
- Report CTA language: "Your team is building the habit before the system. The Foundations Workshop gives you one running workflow in half a day."
- *Note: This track exists in the plan but is a separate product build — not in scope for Phase 3 tooling v1. The free assessment should surface this track and describe it, but the product itself is deferred.*

**Track B — AI Readiness Assessment** (Levels 3–4)
- Offering: 2–3 week sprint (the productized Assess tier from the earlier analysis)
- Outcome: AI Readiness & Opportunity Map — maturity score + dimension breakdown + prioritized 90-day roadmap
- Price: €8–15K team
- Report CTA language: "Your team is using AI but results are inconsistent. The AI Readiness Assessment diagnoses exactly where the workflow breaks down and gives you 3–5 concrete moves."
- *This is the primary conversion target for the free tool in Phase 3 v1.*

**Track C — Agent Strategy Advisory** (Level 4–5 with high Dimension 6 score)
- Offering: Agent opportunity mapping, architecture, governance design (existing Adaptive Alchemy territory)
- Price: retainer or project
- Report CTA language: "You're asking the right questions. The next step isn't better prompting — it's knowing which workflows are ready to run without you. That's the conversation we're built for."
- *This track is already served by existing services. The free tool creates a new discovery channel for it.*

Routing logic:
- Score Level 1–2 → Track A language + Track A CTA
- Score Level 3–4 → Track B language + Track B CTA
- Score Level 4–5 AND Dimension 6 score ≥ threshold → Track C language + Track C CTA
- Score Level 4 with low Dimension 6 → Track B CTA (fix systematization before agent conversation)

### 2.4 Define the paid Assess deliverable (Track B report)

The Track B paid engagement produces a written report (not just a score). This is what the free tool's CTA is selling into. It needs to be defined before the free tool CTA can describe it credibly.

Report sections:
1. Executive summary (maturity level, headline finding, 3–5 recommended moves)
2. Dimension-by-dimension breakdown (each dimension scored with narrative — what's working, what's breaking)
3. Governance & Controls audit (data policy gaps, tool sprawl assessment, accountability gaps)
4. 90-day roadmap (sequenced, effort/ROI framed, stakeholder-ready)
5. Agent-readiness signal (explicit assessment of which workflows are candidates for supervised automation)
6. Appendix: interview findings, assessment data

Delivery: written document + 90-minute leadership review session + 30-day follow-up call.

### 2.5 Define per-level transition roadmaps

Borrowed directly from the leveling-up methodology: each maturity level has a corresponding transition roadmap to the next level — not a list of generic improvements, but a specific set of moves calibrated to where you are.

The report shows **only the next level transition** — not the full 5-level path. This is intentional: showing the whole map overwhelms early-stage users and makes the journey feel unnavigable. A Level 2 user doesn't need to know what Level 5 looks like.

Each transition roadmap specifies:
- What this level change unlocks (the concrete benefit of moving up)
- 2–3 specific moves to make (not generic "improve your prompting" — specific, executable, time-estimated)
- The binding constraint — the one dimension that's holding the user at their current level under gate scoring

The 5 transition roadmaps (1→2, 2→3, 3→4, 4→5, and a "you're at the frontier" state for Level 5) are a required Phase 2 deliverable. They become the "What good looks like next" section in every generated report.

### 2.6 Define the gate scoring model

Adapted from the leveling-up rubric: **maturity level = the highest level where ALL 6 dimension scores meet their threshold**.

This is not an average. A user who scores 12/12 on five dimensions and 4/12 on Governance & Systematization does not get credit for Level 4 — they stay at Level 3 because Dimension 6 fails the Level 4 gate. This makes scores harder to inflate and more honest, and it makes the gap specific: "Dimension 6 is your binding constraint for Level 4."

Phase 2 must produce:
- The threshold value for each dimension at each level (the 5×6 matrix)
- The "binding constraint" identification logic — which failing dimension is the primary gate
- Labels for each threshold band per dimension (e.g., STRONG / FUNCTIONAL / DEVELOPING / NOT YET) — the labels become the dimension scorecard in the report

### 2.7 Document the repeatable intake process

Before Phase 3 tooling builds the survey, the intake questions need to be designed as assessment instruments, not just a questionnaire copy of AdviceForge's. Specifically:

- The Likert questions need maturity-calibrated anchors (what "agree" means at Level 2 vs. Level 4 is different)
- The scenario questions are the most diagnostic — the AdviceForge approach of offering 4 answer choices where one is clearly right but the wrong choices reveal specific failure modes is worth preserving
- The contextual questions (role, workflow focus, tool environment, data sensitivity) are critical for personalizing the report — don't treat them as demographic filler
- A company-level intake module is needed for Track B (individual check diagnoses one person; team assessment needs org-level questions)

---

## Phase 3 — Free Assessment Tool
*Prerequisite: Phase 2 framework locked. This is a net-new product build.*

A free, self-serve "AI Readiness Check" that lives on the Adaptive Alchemy site, takes ~7 minutes to complete, produces an instant personalized report, gates the full report behind an email, and routes respondents into the right track CTA.

### 3.1 What the tool produces

**Immediate (ungated):** Overall maturity level (1–5 with label) + one-sentence main finding.

**Gated (after email):** Full report in the following section order:

1. **Score + level** — Overall maturity level (1–5 with label) + one-sentence headline finding
2. **Journey strip** — Linear 5-node progress bar (●–●–●–○–○) with current level highlighted; this immediately communicates "you are here on a path" before any detail
3. **Radar chart** — Profile shape companion (see §3.3 for design decision); current state (filled) overlaid with Level N+1 target (outline); the binding constraint dimension highlighted in a distinct color
4. **Dimension scorecard** — 6 horizontal bars with STRONG / FUNCTIONAL / DEVELOPING / NOT YET labels; binding constraint flagged as "Fix first"
5. **Interpretation** — Why you landed here + what this is likely costing you (paired, AdviceForge pattern)
6. **Benchmark context** — How you compare (3 stat cards from current research, as AdviceForge does well)
7. **Your next level** — Level N+1 name, what it unlocks, 2–3 specific transition moves (from the roadmap matrix defined in §2.5); this section is the key differentiator — only the next level, not the full path
8. **Build step** — One single, executable action for this week (not a 5-item plan — one specific move calibrated to workflow focus and maturity level)
9. **Track CTA** — A, B, or C routed by score, with specific language; feels like a logical continuation, not a pitch

**Key differentiators from AdviceForge:**
- **Gate scoring** (not sum scoring) means the level is meaningful, not inflatable
- **Next-level-only roadmap** (not a diagnosis of current state only) makes the journey feel achievable
- **Build step** (one immediate action, not a 5-item list) is more useful than a generic action plan
- **Radar + journey strip** give the report a distinctive visual identity and show the gap-to-next-level spatially
- **Re-take framing** — the report explicitly invites re-taking in 90 days; saved result URL enables comparison

**Re-take design:** Every report includes a saved URL (like AdviceForge). The 90-day HubSpot email sequence includes a re-take prompt. On re-take, if the same email is submitted, the report shows current vs. previous result — movement on the journey strip, shape change on the radar.

### 3.2 Technical architecture

Constraint: GitHub Pages = fully static. No server-side rendering.

Approach: **Client-side React app embedded in the Astro site.**

- Survey component: multi-step React form, client-side state
- Scoring engine: pure JS — deterministic from answers, no server call needed
- Report renderer: React component, takes score object and renders personalized report
- Email gate: HubSpot form embed or HubSpot Forms API call (client-side, no backend needed)
- Lead routing: HubSpot workflow triggered by form submission — maturity level passed as hidden field → routes to Track A/B/C sequence
- PDF export: client-side (jsPDF or similar) OR a "email me the PDF" trigger that kicks off a HubSpot email with the report content

No backend required for v1. If PDF generation becomes complex, a lightweight serverless function (Cloudflare Worker or similar) is the extension path — but defer this to v2.

### 3.3 Report design direction

AdviceForge's report is dark-themed, data-dense, and typographically clean. It reads like a professional audit, not a quiz result. That's the right register.

**Radar chart decision:**

The radar chart works as a companion to the overall score, not as a primary visualization. The key is *what it shows that bars cannot*: the shape of the profile across all 6 dimensions simultaneously, overlaid with the Level N+1 target shape. That gap — current (filled area) vs. next level (outline) — is spatially obvious in a way that bars can't convey. The binding constraint dimension (the one holding you at your current level) gets a distinct highlight color.

What the radar is NOT: a standalone visualization of current scores. A radar showing only current state adds nothing over bars and asks more of the reader. It must always show the target overlay to earn its place.

Cognitive load mitigation:
- Don't ask the reader to read precise values off the radar — the bars do that
- The radar is for gestalt ("here is the shape of your practice and the shape of the gap"), the bars are for diagnosis ("this specific dimension is your bottleneck")
- A one-line caption under the radar does the interpretation: "Strong in the left cluster. Governance & Systematization is your binding constraint for Level 4."
- Mobile: the radar can collapse or simplify; the bars are the primary diagnostic on small screens

Visual identity:
- 6 axes, evenly spaced (not ordered by score — ordering by score creates misleading shapes)
- Current state: filled shape in brand color at ~40% opacity
- Level N+1 target: outline only, same color at 100% opacity
- Binding constraint axis: highlighted in a distinct accent color
- No gridlines beyond the threshold rings — clean, not technical

Implementation: SVG-based, drawn client-side. Recharts or D3 — no heavy library needed for 6 axes. Responsive.

**Overall design direction:**
- Match AdviceForge's professional density and dark register — not a quiz, a diagnostic artifact
- Adaptive Alchemy brand colors and typography throughout
- The journey strip (linear 5-node progress) sits above the radar — simpler, no interpretation required, immediately communicates "you are here"
- Shareable: saved URL + PDF export so a respondent can forward to their leadership team
- The leveling-up dashboard HTML template (monospace, amber accent, dark background, clean section labels) is a useful reference for the visual register, adapted to AA brand

### 3.4 HubSpot integration

- Form submission → contact created in HubSpot with properties: maturity level, dimension scores, workflow focus, role level, tool environment
- Track routing: contact tagged with Track A / B / C based on score
- Email sequence triggered per track:
  - Track A: "Here's what the Foundations Workshop covers" + booking link
  - Track B: "Here's what the AI Readiness Assessment produces" + scoping call link
  - Track C: "Here's why the agent conversation matters now" + direct outreach trigger

### 3.5 What's not in scope for v1

- Multi-user / team aggregate scoring (Track B team assessment is a paid engagement, not a free tool)
- Localization (English only for launch)
- Track A product (Foundations Workshop) — the report surfaces it but the product is deferred
- Admin dashboard / analytics beyond HubSpot

---

## Sequencing rationale

| Phase | Dependency | Why this order |
|---|---|---|
| Phase 1 (copy) | None | Captures opportunity cost immediately — every day the stalled-ai-projects page doesn't have a clear CTA is a lead lost. Can ship within days. |
| Phase 2 (framework) | Phase 1 decisions locked | Framework design is the foundation for the tool. Building the tool before the framework is specified produces the wrong survey. |
| Phase 3 (tool) | Phase 2 framework locked | The tool is an implementation of the framework. Scope, question design, scoring logic, and report structure all derive from Phase 2. |

---

## Open questions before Phase 2 starts

1. **Pricing validation for Track B:** The €8–15K range is a hypothesis. Before publishing, run 3–5 prospect conversations at this price point to validate.
2. **Track A as a product:** The Foundations Workshop is described but not designed. Does this ship with Phase 3 v1 as a CTA, or is the Track A CTA a waitlist / "coming soon" until the product is built?
3. **Assessment URL:** Does the free tool live at `/assess`, `/check`, or `/ai-readiness-check`? This affects Phase 1 CTAs.
4. **Company vs. individual framing:** AdviceForge is explicitly individual-first, team-second. Adaptive Alchemy's ICP is team/org-first. The free tool should probably ask "is this for you personally or your team?" at the start and adjust the report framing accordingly — but this adds scope to Phase 3.
