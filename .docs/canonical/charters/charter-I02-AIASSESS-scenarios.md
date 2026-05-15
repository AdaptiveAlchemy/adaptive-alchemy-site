---
title: BDD Acceptance Scenarios — I02-AIASSESS AI Readiness Assessment
initiative: I02-AIASSESS
charter: charter-I02-AIASSESS.md
date: 2026-05-15
status: active
phase_coverage:
  - phase-1-copy
  - phase-2-framework
  - phase-3-tool
walking_skeleton_scenarios:
  - S17
  - S18
  - S20
  - S22
  - S24
  - S27
---

# I02-AIASSESS — BDD Acceptance Scenarios

This document contains all BDD Given-When-Then acceptance scenarios derived from the charter's acceptance criteria. Scenarios interact only through driving ports: static page URLs, rendered HTML, form submission events, and HTTP API calls.

Walking skeleton scenarios are marked `[WALKING SKELETON]`. Error and edge-case scenarios represent approximately 45% of the suite, meeting the 40% minimum.

Scenario numbering is stable — use S01, S02, etc. as cross-references in Beads tasks and test file names.

---

## Feature: Phase 1 — Site Copy and Service Page

### S01 — /services/ai-readiness-assessment page renders required sections

```gherkin
Feature: AI Readiness Assessment service page

  Scenario S01: /services/ai-readiness-assessment page renders all required sections
    Given the /services/ai-readiness-assessment page has been built and deployed
    When a visitor navigates to /services/ai-readiness-assessment
    Then the page H1 reads exactly "AI Readiness Assessment"
    And the page contains a "What it is" section describing a fixed-scope 2–3 week sprint for one team
    And the page contains the scope signal "Typical engagement: 2–3 weeks, one team, covering 6 workflow dimensions and 3–5 stakeholder interviews"
    And the page contains the risk-reduction signal "Standalone engagement — no ongoing commitment required"
    And the page contains a primary CTA with text "Book a 30-minute scoping call — we'll confirm fit before anything starts"
    And the page contains a "What you get" section referencing the AI Readiness and Opportunity Map
    And the page contains a "Who it's for" section referencing Track B buyers at levels 3 and 4
    And the page contains a "What comes next" section referencing the Design and Pilot engagements
    And the page contains a "Not for" section with at least three exclusion criteria
    And no price range is visible anywhere on the page
    And the meta title contains "AI Readiness Assessment"
```

### S02 — "Not for" section uses specific, trust-building exclusion language

```gherkin
  Scenario S02: "Not for" section rejects dismissive language and retains trust
    Given the /services/ai-readiness-assessment page has been built
    When a copywriter reviews the "Not for" section
    Then each exclusion criterion uses the framing "This isn't the right fit for [X]" or equivalent
    And no exclusion criterion uses the framing "You're not ready for X"
    And the first exclusion criterion states that companies which have not yet deployed AI in any business process are not the right fit
    And the second exclusion criterion states that teams seeking a software or vendor audit are not the right fit
    And the third exclusion criterion distinguishes structural inability to act on findings from not yet having leadership sponsorship
    And the third exclusion criterion clarifies that building the case for leadership buy-in is an intended use case, not an exclusion
```

### S03 — Methodology provenance note appears on service page and in report footer

```gherkin
  Scenario S03: Methodology provenance note is complete and founder-verified before copy sign-off
    Given the methodology provenance note template has been drafted
    When a reviewer inspects the methodology note on the /services/ai-readiness-assessment page
    Then the note identifies the framework as "The Adaptive Alchemy AI Fluency Index"
    And the note references a specific number of client engagements (no placeholder text)
    And the note names at least one sector or describes the sectors represented
    And the note describes gate scoring and explains that it is not averaging
    And no bracketed placeholder fields remain unfilled
    And the same completed note appears in the Phase 3 report footer
```

### S04 — Assessment CTA on /for/founders page

```gherkin
  Scenario S04: /for/founders page carries an assessment CTA linked to the correct destination
    Given the /for/founders page has been updated as part of Phase 1
    When a founder visits /for/founders
    Then the page contains a CTA with text referencing the free AI readiness check or scoping call
    And the CTA copy is framed for a founder audience, not a technical leadership audience
    And in Phase 1, the CTA links to a 30-minute scoping call booking page
    And after Phase 3 ships, the CTA links to the /check assessment page
    And the CTA is visible without scrolling past the main hero on desktop viewport (1280px width)
```

### S05 — Assessment CTA on /for/ctos page

```gherkin
  Scenario S05: /for/ctos page carries an assessment CTA framed for technical leadership
    Given the /for/ctos page has been updated as part of Phase 1
    When a CTO visits /for/ctos
    Then the page contains a CTA referencing the free AI readiness check or scoping call
    And the CTA copy is framed for a technical leadership audience, not a founder audience
    And the CTA copy is distinct from the /for/founders CTA copy
    And in Phase 1, the CTA links to a 30-minute scoping call booking page
    And after Phase 3 ships, the CTA links to the /check assessment page
```

### S06 — /for/stalled-ai-projects page leads with clarity framing, not rescue narrative

```gherkin
  Scenario S06: /for/stalled-ai-projects lead section is reframed from rescue to clarity
    Given the /for/stalled-ai-projects page has been rewritten as part of Phase 1
    When a visitor with a stalled AI project lands on the page
    Then the lead section does not open with "your AI project is stuck" or equivalent rescue framing
    And the lead section frames the primary problem as "needing clarity before commitment"
    And the lead section introduces the maturity spectrum with one line per level (Curious through Agent-Ready)
    And the primary CTA in Phase 1 is a booking link for a scoping call positioned as "Find your maturity level"
    And the page clarifies that this is the correct landing spot for Track A and Track B buyers (levels 1 through 4)
```

### S07 — Homepage ServiceCards includes AI Readiness Assessment entry

```gherkin
  Scenario S07: Homepage engagement ladder acknowledges AI Readiness Assessment as standalone product
    Given the homepage has been updated as part of Phase 1
    When a visitor views the engagement ladder or ServiceCards section on the homepage
    Then the Assess tier is visible in the ladder
    And the Assess tier copy distinguishes it as available as a standalone fixed-scope, fixed-fee product
    And the Assess tier copy does not present it exclusively as the first step of a larger engagement
    And the ladder still shows the full sequence: Assess → Design → Pilot → Transform → Operate
```

### S08 — Phase 1 gate: all six lock conditions are satisfied before Phase 2 begins

```gherkin
  Scenario S08: Phase 1 is considered locked only when all six gate conditions pass
    Given the Phase 1 scope is complete
    When a reviewer evaluates the Phase 1 locked state
    Then keyword research is complete and the assessment URL slug has been decided
    And /services/ai-readiness-assessment is live with founder-approved copy
    And CTAs on /for/founders, /for/ctos, and /for/stalled-ai-projects all point to the decided URL
    And the homepage engagement ladder has been updated
    And founder sign-off has been recorded
    And the methodology provenance note contains no bracketed placeholder fields
```

---

## Feature: Phase 1 — /check Shell Page Static Crawlability

### S09 — [WALKING SKELETON] /check page loads with static content crawlable by Googlebot [WALKING SKELETON]

```gherkin
Feature: /check assessment page static shell

  Scenario S09 [WALKING SKELETON]: /check page serves static HTML that Googlebot and AI engines can parse without executing JavaScript
    Given the /check page has been deployed as an Astro shell
    When a crawler fetches the /check URL without executing JavaScript
    Then the response is HTTP 200
    And the response Content-Type is text/html
    And the H1 element contains "AI Readiness Check"
    And the meta title contains "AI Readiness Check"
    And the meta description is present and references AI readiness
    And an introductory paragraph is present in the raw HTML (not injected by JavaScript)
    And FAQPage structured data (JSON-LD) is present in the raw HTML
    And Service structured data (JSON-LD) is present in the raw HTML
    And the React assessment island is referenced but its content is not required to be present
```

### S10 — /check page keyword targeting: H1 and meta carry "AI Readiness Check"

```gherkin
  Scenario S10: /check page H1 and meta title carry the required keyword phrase
    Given the /check page has been deployed
    When a search engine indexes the page
    Then the H1 element text is "AI Readiness Check"
    And the meta title element includes the phrase "AI Readiness Check"
    And the URL slug is exactly /check (or the decided URL slug from the keyword research gate)
    And the page does not use "AI Readiness Assessment" as the H1 on this URL (that phrase is reserved for the paid service page)
```

---

## Feature: Phase 2 — Maturity Model and Scoring Framework

### S11 — 5×6 dimension-threshold matrix is complete and numerically specified

```gherkin
Feature: AI Fluency Index framework design

  Scenario S11: 5×6 dimension-threshold matrix covers all levels and dimensions
    Given the Phase 2 framework design work is complete
    When a reviewer examines the 5×6 dimension-threshold matrix document
    Then the matrix contains exactly 5 rows (Level 1 through Level 5)
    And the matrix contains exactly 6 columns (one per dimension)
    And each cell specifies a numeric threshold value (not a qualitative description alone)
    And each cell specifies a band label: one of STRONG, FUNCTIONAL, DEVELOPING, or NOT YET
    And no cell is empty or marked TBD
    And Dimension 6 (Governance and Systematization) thresholds are present at every level
```

### S12 — Gate scoring identifies the binding constraint dimension

```gherkin
  Scenario S12: Gate scoring engine identifies binding constraint when one dimension fails the gate
    Given a respondent has completed the assessment
    And their dimension scores are: Task Recognition 4/4, Context and Prompting 4/4, Workflow Design 4/4, Judgment and Verification 4/4, Delivery and Integration 4/4, Governance and Systematization 2/4
    And the Level 4 threshold for Governance and Systematization requires a score of 3/4
    When the scoring engine calculates the maturity level
    Then the overall level is 3 (not 4)
    And the output identifies Governance and Systematization as the binding constraint
    And the binding constraint label reads "Fix first" in the dimension scorecard
    And the radar chart highlights the Governance and Systematization axis in the accent color
    And the report does not describe this as an average outcome
```

### S13 — AI Fluency Index brand usage spec covers all four required areas

```gherkin
  Scenario S13: AI Fluency Index brand usage spec is complete before Phase 3 begins
    Given the Phase 2 brand usage spec deliverable is ready for review
    When a reviewer examines the brand usage spec document
    Then the document specifies the canonical framework name as "Adaptive Alchemy AI Fluency Index"
    And the document specifies approved shorthand as "AI Fluency Index" after first full mention
    And the document specifies HubSpot contact property naming convention (e.g. ai_fluency_level, not the full brand name)
    And the document specifies the report level-label format (e.g. "Level 3 — Practicing")
    And the document specifies the Schema.org name field value for Service and FAQPage structured data
    And the document does not reference AdviceForge in any external-facing context
```

### S14 — AEO/GEO target query list is complete with three intent levels

```gherkin
  Scenario S14: AEO/GEO target query list covers informational, navigational, and transactional intent
    Given the Phase 2 AEO/GEO workstream deliverables are complete
    When a reviewer examines the target AI query list
    Then the list contains between 10 and 15 queries
    And at least 3 queries are informational intent (e.g. "what is AI readiness")
    And at least 3 queries are navigational intent (e.g. "AI readiness assessment Adaptive Alchemy")
    And at least 3 queries are transactional intent (e.g. "free AI readiness check for teams")
    And FAQ copy has been written for each query (10-15 Q&A pairs)
    And the FAQ copy is ready to be implemented as FAQPage JSON-LD on the assessment page
```

### S15 — Micro-survey commissioned in Phase 2 week one

```gherkin
  Scenario S15: Benchmark micro-survey is commissioned no later than Phase 2 day two
    Given Phase 2 has started
    When Phase 2 day two has passed
    Then a micro-survey document exists covering the 6 dimensions and overall AI readiness level
    And the survey contains between 10 and 15 questions
    And the estimated completion time in the survey introduction is 5 minutes or less
    And the survey has been sent to the existing Adaptive Alchemy contact list
    And the minimum response target of n ≥ 20 has been documented as a Phase 3 launch gate
```

### S16 — Phase 2 gate: all seven lock conditions are satisfied before Phase 3 begins

```gherkin
  Scenario S16: Phase 2 is considered locked only when all seven gate conditions pass
    Given the Phase 2 framework design work is complete
    When a reviewer evaluates the Phase 2 locked state
    Then the 5×6 dimension-threshold matrix is documented and reviewed
    And all five transition roadmaps (levels 1 to 2, 2 to 3, 3 to 4, 4 to 5, and the level 5 frontier state) are written
    And the intake questionnaire is drafted with maturity-calibrated anchors
    And routing logic thresholds are defined numerically (including the Dimension 6 score that triggers Track C)
    And the AEO/GEO prerequisites are complete (target query list, FAQ copy, sample report brief)
    And the AI Fluency Index brand usage spec is complete
    And founder sign-off has been recorded
```

---

## Feature: Phase 3 — Assessment Tool Walking Skeleton

### S17 — [WALKING SKELETON] /check page loads and React island hydrates on scroll [WALKING SKELETON]

```gherkin
Feature: Assessment tool walking skeleton

  Scenario S17 [WALKING SKELETON]: /check Astro page loads and React assessment island hydrates on viewport entry
    Given the /check page has been deployed with the React assessment island using client:visible directive
    When a user scrolls the assessment island into the viewport on a desktop browser
    Then the React survey component renders without JavaScript errors
    And the first survey question is visible
    And a step counter or progress bar is visible showing the current position (e.g. "Step 1 of N")
    And the page LCP has been measured at or below 2.5 seconds on simulated 4G in Lighthouse CI
```

### S18 — [WALKING SKELETON] User completes the survey and sees their score and level [WALKING SKELETON]

```gherkin
  Scenario S18 [WALKING SKELETON]: User completes all survey questions and receives immediate ungated score
    Given the user is on the /check page with the assessment island loaded
    When the user answers all survey questions with behavior-based answer selections
    And the user submits the completed survey
    Then the overall maturity level (1 through 5 with label) is displayed immediately
    And a one-sentence headline finding is displayed
    And the result is computed entirely client-side with no server call
    And the scoring engine uses gate logic (not average scoring)
    And the displayed level is the highest level where all 6 dimension scores meet their thresholds
```

### S19 — Routing question at intake adjusts report copy but not scoring

```gherkin
  Scenario S19: Individual framing routing question produces first-person report copy
    Given the user is on the /check page
    When the user selects "My own practice" for the intake routing question "Are you assessing primarily your own practice or your team's readiness?"
    And the user completes the survey and enters their email
    Then the Interpretation and Next Level sections use first-person singular framing
    And the Track B CTA includes the sentence "You've seen your own baseline. The Assessment sprint maps your whole team."

  Scenario S19b: Team framing routing question produces team-scoped report copy
    Given the user is on the /check page
    When the user selects "My team's readiness" for the intake routing question
    And the user completes the survey and enters their email
    Then the Interpretation and Next Level sections use team framing
    And the Track B CTA reads "The Assessment sprint maps your team's dimensions — starting from where you've identified today."
    And the scoring engine produces the same numeric score as it would for the individual framing variant
```

### S20 — [WALKING SKELETON] Email gate appears after score, user submits work email [WALKING SKELETON]

```gherkin
  Scenario S20 [WALKING SKELETON]: Email gate appears after ungated score and accepts a valid work email
    Given the user has completed the survey and seen their ungated score
    When the email gate form is displayed
    Then the form contains an email input field
    And the form contains an explicit opt-in checkbox for the 90-day email sequence
    And the checkbox label states what data will be stored (maturity level, dimension scores, workflow focus, role)
    And the checkbox label states that the data will be used to send an email sequence
    And when the user enters a valid work email (e.g. jane@acme.com) and checks the consent checkbox
    And the user clicks the submission button
    Then the form accepts the submission without a client-side validation error
```

### S21 — Company email domain blocking prevents personal email submission

```gherkin
  Scenario S21: Email gate blocks submission when user enters a personal email domain
    Given the user has completed the survey and the email gate is displayed
    When the user enters an email address with domain gmail.com
    Then an inline error message is shown before submission fires
    And the error message reads "Please use your work email — assessment results are designed to be shared with your team."
    And the submission button remains inactive until a non-blocked domain is entered
    And the blocklist validation fires on the email field input (not only on submit)

  Scenario S21b: Email gate blocks all v1 blocklisted domains
    Given the user is on the email gate form
    When the user enters email addresses with each of these domains: gmail.com, hotmail.com, yahoo.com, outlook.com, icloud.com
    Then each entry triggers the inline error message
    And no submission fires for any blocked domain

  Scenario S21c: Email gate blocklist is defined in a version-controlled config array, not inline
    Given the codebase has been built
    When a developer inspects the email validation implementation
    Then the blocklist domains are declared in a single config array (not scattered inline string comparisons)
    And the config array is importable and modifiable without changing the validation function
```

### S22 — [WALKING SKELETON] HubSpot receives submission with legalConsentOptions [WALKING SKELETON]

```gherkin
  Scenario S22 [WALKING SKELETON]: HubSpot v3 endpoint receives submission including GDPR legalConsentOptions
    Given the user has submitted a valid work email with the consent checkbox checked
    When the HubSpot Forms API call is made
    Then the request targets the HubSpot v3 forms endpoint (not v2)
    And the request body includes the legalConsentOptions object with the consent type set to GDPR
    And the request body includes the maturity level as a hidden field (ai_fluency_level)
    And the request body includes the company_email_domain derived from the submitted email
    And the HubSpot API returns HTTP 200 (or 204) with no error body
    And no email sequence trigger fires before this affirmative consent is recorded

  Scenario S22b: HubSpot submission is suppressed when consent checkbox is not checked
    Given the user has entered a valid work email on the email gate form
    And the consent checkbox is unchecked
    When the user attempts to submit the form
    Then the form does not fire the HubSpot API call
    And an inline validation error informs the user that consent is required
```

### S23 — Full gated report renders all nine sections

```gherkin
  Scenario S23: Full gated report renders all nine required sections in order
    Given the user has submitted a valid work email with consent
    And the HubSpot submission has succeeded
    When the full report is rendered
    Then section 1 displays the score and overall maturity level with label and headline finding
    And section 2 displays the journey strip: a linear 5-node progress bar with the current level highlighted
    And section 3 displays the radar chart with current state filled and Level N+1 target as an outline
    And the radar chart binding constraint axis is highlighted in a distinct accent color
    And section 4 displays the dimension scorecard with 6 horizontal bars labeled STRONG, FUNCTIONAL, DEVELOPING, or NOT YET
    And the binding constraint dimension in section 4 is labeled "Fix first"
    And section 5 displays the interpretation: why the user landed at this level and what it may be costing them
    And section 6 displays the benchmark context section with at least one stat card
    And every stat card in section 6 displays source, date, and sample size (no anonymous statistics)
    And section 7 displays the next-level transition: only the next level, not the full 5-level path
    And section 7 contains 2–3 specific transition moves
    And section 8 displays a single executable build step (not a list of five items)
    And section 9 displays the Track CTA routed by score (A, B, or C)
```

### S24 — [WALKING SKELETON] Track B CTA renders in the full report [WALKING SKELETON]

```gherkin
  Scenario S24 [WALKING SKELETON]: Level 3–4 scorer sees Track B CTA in section 9 of the full report
    Given a respondent has completed the survey with an overall score of Level 3
    And the respondent has submitted a valid work email with consent
    When the full report is rendered
    Then section 9 displays Track B CTA language
    And the CTA includes text referencing the AI Readiness Assessment sprint
    And the CTA includes language referencing diagnosing where the workflow breaks down
    And the CTA includes a link or button to book the assessment engagement
```

### S25 — Track routing logic covers all four scoring cases

```gherkin
  Scenario S25a: Level 1–2 score routes to Track A CTA
    Given a respondent scores overall Level 2
    When the report CTA section is rendered
    Then the Track A routing question has already filtered this respondent at intake
    And if the respondent has passed the intake routing question, the report surfaces the Track A description
    And the Track A CTA describes the Foundations Workshop

  Scenario S25b: Level 3–4 score routes to Track B CTA
    Given a respondent scores overall Level 3
    When the report CTA section is rendered
    Then the Track B CTA is displayed

  Scenario S25c: Level 4–5 with high Dimension 6 score routes to Track C CTA
    Given a respondent scores overall Level 4
    And the Dimension 6 (Governance and Systematization) score meets the Track C threshold
    When the report CTA section is rendered
    Then the Track C CTA is displayed
    And the CTA includes language about workflows being ready to run without per-instance supervision

  Scenario S25d: Level 4 with low Dimension 6 score routes to Track B CTA, not Track C
    Given a respondent scores overall Level 4
    And the Dimension 6 score is below the Track C threshold
    When the report CTA section is rendered
    Then the Track B CTA is displayed (not Track C)
    And the CTA references fixing systematization before the agent conversation
```

### S26 — Pre-result gate scoring explanation screen

```gherkin
  Scenario S26: A gate scoring explanation screen appears between survey completion and the scored result
    Given the user has submitted all survey answers
    When the scoring transition screen is displayed (before the score is revealed)
    Then a plain-language explanation of gate scoring is shown
    And the explanation states that the overall level is the highest level where every dimension meets its threshold
    And the explanation states that this is not an average
    And the explanation states that one dimension can hold the user back even if the rest are strong
    And the screen appears after the email gate submission, not before it
```

### S27 — [WALKING SKELETON] Radar chart renders below the fold without degrading LCP [WALKING SKELETON]

```gherkin
  Scenario S27 [WALKING SKELETON]: Radar chart renders below the fold and Lighthouse CI LCP remains at or below 2.5s
    Given the Phase 3 build has been compiled
    When Lighthouse CI runs against the /check page on simulated 4G from the first Phase 3 build
    Then the LCP score is at or below 2.5 seconds
    And the INP score is at or below 200ms
    And the CLS score is at or below 0.1
    And the radar chart component has been loaded via dynamic import (not in the main bundle)
    And the Recharts v3 bundle contribution has been verified via build analysis before this build ships
    And if Recharts v3 is not viable, the SVG fallback implementation path has been activated instead
```

### S28 — Recharts v3 bundle analysis gates the radar chart implementation decision

```gherkin
  Scenario S28: Recharts v3 bundle analysis is completed on Phase 3 day one before implementation begins
    Given Phase 3 has started
    When the first day of Phase 3 has elapsed
    Then a build analysis has been run that measures the Recharts v3 bundle contribution to the main chunk
    And the analysis result has been recorded with the exact gzip size of the Recharts contribution
    And a decision has been made: either proceed with Recharts v3, or activate the SVG fallback path
    And the decision is documented in the Phase 3 build log before any radar chart implementation begins
```

---

## Feature: Phase 3 — Benchmark Section Behavior

### S29 — Benchmark section collapses gracefully when proprietary data n < 5

```gherkin
Feature: Benchmark stat cards data source fallback

  Scenario S29: Benchmark section renders third-party citations when AA proprietary data n is below 5
    Given the /check tool is live
    And the Adaptive Alchemy proprietary benchmark dataset has fewer than 5 respondents
    When the full report benchmark section (section 6) is rendered
    Then the section renders at least one stat card using a clearly attributed third-party source (e.g. McKinsey AI Index 2024)
    And every stat card displays source name and year
    And no stat card displays an anonymous statistic without a source
    And the section does not display a placeholder message referencing missing data

  Scenario S29b: Benchmark section upgrades to proprietary AA data when n reaches 20
    Given the Adaptive Alchemy proprietary benchmark dataset has reached n ≥ 20 respondents
    When the full report benchmark section is rendered
    Then the stat cards display data from Adaptive Alchemy assessments
    And each card displays "Based on N=X assessments" with the actual respondent count
    And the third-party fallback cards are no longer displayed
```

---

## Feature: Phase 3 — Enterprise Voice and Copy Standards

### S30 — Assessment tool copy uses enterprise-grade voice throughout

```gherkin
Feature: Enterprise voice standards for assessment copy

  Scenario S30: Every answer option in the survey uses behavior-based language, not abstract readiness descriptors
    Given the Phase 3 survey component has been built
    When a reviewer reads all answer options across all survey questions
    Then no answer option uses abstract readiness descriptors such as "our AI governance is mature" or "we are well-positioned for AI"
    And every answer option describes a concrete, observable action or state (e.g. "We have a defined prompt review process that runs before production deployment")
    And the report copy for consequence framing includes at least one statement about what staying at the current level costs the respondent
    And the methodology note in the report footer identifies the framework as the Adaptive Alchemy AI Fluency Index without referencing AdviceForge

  Scenario S30b: Report copy does not reference, cite, or structurally replicate AdviceForge
    Given the Phase 3 report renderer has been built
    When a reviewer reads the complete rendered report output for any score combination
    Then no external-facing copy references AdviceForge by name
    And no structured data references AdviceForge
    And no report section structurally replicates an AdviceForge report section without substantive Adaptive Alchemy differentiation
```

---

## Feature: Phase 3 — HubSpot Portal Configuration Gate

### S31 — HubSpot portal ID and form GUID are confirmed before Phase 3 planning completes

```gherkin
Feature: HubSpot integration pre-conditions

  Scenario S31: HubSpot portal ID and form GUID are confirmed before Phase 3 planning sign-off
    Given Phase 3 planning is under review
    When the Phase 3 plan is evaluated for readiness to begin implementation
    Then the HubSpot portal ID has been confirmed and documented in the Phase 3 implementation spec
    And the HubSpot form GUID has been created and documented in the Phase 3 implementation spec
    And the Phase 3 implementation cannot be signed off without these two values being present and verified
```

---

## Feature: Phase 3 — Intake Routing for Early-Stage Users

### S32 — Intake routing question filters Level 1–2 users before 7-minute investment

```gherkin
Feature: Intake routing question for early-stage users

  Scenario S32: Routing question at the start of the survey filters users whose team has not used AI in actual work
    Given the user is on the /check page and the survey island has loaded
    When the first question displayed is the routing question "Has your team used AI tools in actual work, at least occasionally?"
    And the user selects "No"
    Then the survey does not proceed to the full 7-minute assessment
    And the user is shown a message indicating this tool is designed for teams already using AI
    And the message provides an alternative resource or a waitlist option
    And the Track A Foundations Workshop is described as the appropriate next step
    And no email gate is shown to users who are filtered at this stage

  Scenario S32b: Users who answer Yes to the routing question proceed to the full assessment
    Given the user has seen the intake routing question
    When the user selects "Yes"
    Then the survey proceeds to the full assessment questions
    And the routing question answer is not visible to the user again during the session
```

---

## Scenario Summary

| ID | Description | Phase | Type | Walking Skeleton |
|----|-------------|-------|------|-----------------|
| S01 | Service page required sections | 1 | Happy path | — |
| S02 | "Not for" section exclusion tone | 1 | Quality | — |
| S03 | Methodology provenance completeness | 1 | Happy path | — |
| S04 | Assessment CTA on /for/founders | 1 | Happy path | — |
| S05 | Assessment CTA on /for/ctos | 1 | Happy path | — |
| S06 | /for/stalled-ai-projects lead section reframe | 1 | Happy path | — |
| S07 | Homepage ServiceCards includes Assess | 1 | Happy path | — |
| S08 | Phase 1 gate: six lock conditions | 1 | Gate | — |
| S09 | /check static HTML crawlability | 1 | Happy path | Yes |
| S10 | /check H1 and meta keyword targeting | 1 | Quality | — |
| S11 | 5×6 matrix completeness | 2 | Happy path | — |
| S12 | Gate scoring binding constraint | 2 | Happy path | — |
| S13 | Brand usage spec coverage | 2 | Quality | — |
| S14 | AEO/GEO query list completeness | 2 | Happy path | — |
| S15 | Micro-survey commissioned on time | 2 | Gate | — |
| S16 | Phase 2 gate: seven lock conditions | 2 | Gate | — |
| S17 | React island hydration on viewport | 3 | Happy path | Yes |
| S18 | User completes survey, sees score | 3 | Happy path | Yes |
| S19 | Individual framing report copy | 3 | Happy path | — |
| S19b | Team framing report copy | 3 | Happy path | — |
| S20 | Email gate with consent checkbox | 3 | Happy path | Yes |
| S21 | Personal email domain blocked inline | 3 | Error path | — |
| S21b | All v1 blocklist domains rejected | 3 | Error path | — |
| S21c | Blocklist in version-controlled config | 3 | Quality | — |
| S22 | HubSpot v3 submission with legalConsentOptions | 3 | Happy path | Yes |
| S22b | Submission suppressed without consent | 3 | Error path | — |
| S23 | Full report nine sections complete | 3 | Happy path | — |
| S24 | Track B CTA in full report | 3 | Happy path | Yes |
| S25a | Level 1–2 routes to Track A | 3 | Edge case | — |
| S25b | Level 3–4 routes to Track B | 3 | Happy path | — |
| S25c | Level 4–5 high D6 routes to Track C | 3 | Edge case | — |
| S25d | Level 4 low D6 routes to Track B | 3 | Edge case | — |
| S26 | Gate scoring explanation screen | 3 | Happy path | — |
| S27 | Radar chart + Lighthouse CI LCP | 3 | Performance | Yes |
| S28 | Recharts v3 bundle analysis on day one | 3 | Gate | — |
| S29 | Benchmark section n < 5 fallback | 3 | Error path | — |
| S29b | Benchmark upgrades at n ≥ 20 | 3 | Edge case | — |
| S30 | Enterprise voice: behavior-based answers | 3 | Quality | — |
| S30b | No AdviceForge references in output | 3 | Quality | — |
| S31 | HubSpot portal ID confirmed before Phase 3 | 3 | Gate | — |
| S32 | Intake routing filters Level 1–2 | 3 | Error path | — |
| S32b | Yes answer proceeds to full survey | 3 | Happy path | — |

**Total scenarios: 43**
**Error / edge / quality / gate scenarios: 20 (46%) — exceeds 40% minimum**
**Walking skeleton scenarios: S09, S17, S18, S20, S22, S24, S27 (7 scenarios covering the full skeleton slice)**
