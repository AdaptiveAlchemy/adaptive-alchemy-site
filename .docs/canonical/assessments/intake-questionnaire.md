---
type: questionnaire-spec
initiative: I02-AIASSESS
version: v1
date: 2026-05-15
status: draft
bdd: [S19, S19b, S30, S32, S32b]
---

# AI Readiness Check — Intake Questionnaire Specification

## 1. Overview

### Purpose

This document specifies the survey instrument for the Adaptive Alchemy AI Readiness Check (`/check`). The questionnaire is the primary data collection mechanism for the Adaptive Alchemy AI Fluency Index scoring engine. It produces six dimension scores that drive gate-scoring into a maturity level (1–5), which in turn routes the respondent into one of three tracks (A, B, C) and generates a personalised report.

This document is a design specification, not implementation code. It defines:

- Question text in both individual and team framing variants (S19 / S19b)
- Answer options with concrete, observable behavioral anchors for every response (S30)
- Failure mode tags on every wrong scenario answer
- Routing logic for intake and framing questions (S32 / S32b)
- Branching decisions and their consequences

### Question Count

| Category | Count | Notes |
|---|---|---|
| Intake routing question | 1 | S32 — first question displayed, no dimension |
| Framing routing question | 1 | S19/S19b — determines first/third-person framing |
| Dimension: Task Recognition | 3 | Likert |
| Dimension: Context and Prompting | 3 | Likert |
| Dimension: Workflow Design | 3 | Likert |
| Dimension: Judgment and Verification | 2 | Likert + 1 scenario |
| Dimension: Delivery and Integration | 2 | Likert |
| Dimension: Governance and Systematization | 3 | Likert |
| Scenario questions | 1 | Additional scenario (Workflow Design dimension) |
| Contextual questions | 3 | Role, work type, primary tools — unscored |
| **Total** | **21** | Within 18–25 target range |

### Flow Summary

```
[Intake Routing Q] (S32)
        │
        ├── No → [Track A Early Exit] (S32b)
        │         Message + Foundations Workshop CTA
        │         No email gate. Stop.
        │
        └── Yes → [Framing Question] (S19 / S19b)
                      │
                      ├── "My own practice"    → individual framing (first-person)
                      └── "My team's readiness" → team framing (third-person)
                              │
                              └── [Dimension Questions] (Q03–Q19)
                                  6 dimensions × 2–3 Likert + 2 scenario questions
                                      │
                                      └── [Contextual Questions] (Q20–Q22)
                                          Role, work type, tools — unscored
                                              │
                                              └── [Score Computed] → [Gate Explanation Screen] →
                                                  [Ungated Score] → [Email Gate] → [Full Report]
```

### Framing Convention

All dimension questions are specified in **individual (first-person) framing** as the primary form. Where team framing differs materially, the variant is noted immediately below the individual version in the format:

> **Team variant:** "My team does X..."

When the text is structurally identical except for pronoun substitution (I → my team, my → our), only the individual form is shown — the team variant follows by rule.

---

## 2. Routing Section

### Q01 — Intake Routing Question

**Question ID:** `q01-intake`
**Type:** routing (not scored, not assigned to a dimension)
**BDD:** S32, S32b

---

**Question text:**

> Do you currently use AI tools as part of your regular work?

**Answer options:**

| Value | Label |
|---|---|
| `yes` | Yes — I use AI tools at least occasionally in my actual work |
| `no` | No — I haven't used AI tools in my work yet, or only tried them once outside a real task |

**Routing:**

- `yes` → proceed to Q02 (framing question)
- `no` → Track A Early Exit (see §2.1 below)

**Design notes:**

- This question is the first thing displayed in the survey island. No preamble question precedes it.
- The `yes` anchor is specific: "at least occasionally in my actual work" distinguishes genuine use from a single demo session.
- The `no` anchor is equally concrete: "only tried them once outside a real task" prevents ambiguous cases from self-routing incorrectly.
- S30 compliance: both options describe observable states, not abstract readiness levels.

---

### 2.1 Track A Early Exit Specification

**Triggered by:** Q01 answer = `no`
**BDD:** S32b

When a user selects No at Q01, the survey stops and the following message is displayed in place of the next question. No further questions are shown. No email gate is shown.

---

**Display block — Track A Early Exit:**

> **This check is built for teams already using AI.**
>
> The AI Readiness Check is calibrated to assess how well AI is integrated into the way you and your team work — so it needs at least some existing use to diagnose accurately.
>
> If you're not yet using AI tools in your day-to-day work, the Foundations Workshop is the right starting point. It's a half-day session designed to get one real workflow running — not a theory of AI, but an actual process change you leave with.
>
> **[Explore the Foundations Workshop →]**

**Implementation requirements:**

- The CTA button links to the Foundations Workshop page or interim booking link (to be confirmed when Track A product is defined)
- No score is computed. No email is captured at this stage.
- The step counter/progress bar should not suggest the user is "done" with an assessment — the display should make clear this is a routing outcome, not a completion
- Analytics event: fire a distinct `assessment_early_exit_track_a` event so filtered users are tracked separately from completers (per charter UQ-10 / AA-8 measurement requirement)

---

### Q02 — Framing Routing Question

**Question ID:** `q02-framing`
**Type:** routing (not scored, not assigned to a dimension)
**BDD:** S19, S19b

---

**Question text:**

> Are you taking this check primarily for yourself or for your team?

**Answer options:**

| Value | Label |
|---|---|
| `individual` | For myself — I want to understand my own AI practice |
| `team` | For my team — I want a baseline for how we use AI as a group |

**Routing:**

- `individual` → framing variant = `individual`; all subsequent dimension questions display in first-person singular ("I do X", "my prompts", "my workflow")
- `team` → framing variant = `team`; all subsequent dimension questions display in team framing ("My team does X", "our prompts", "our workflow")

**Report copy consequences (from charter UQ-19):**

- `individual`: Interpretation and Next Level sections use first-person singular. Track B CTA includes the bridge: *"You've seen your own baseline. The Assessment sprint maps your whole team."*
- `team`: Interpretation and Next Level sections use team framing. Track B CTA reads: *"The Assessment sprint maps your team's dimensions — starting from where you've identified today."*

**Scoring engine:** The framing variant has no effect on dimension scores or maturity level calculation. It affects copy only.

---

## 3. Dimension Questions

Questions Q03–Q19 cover all six dimensions. Each Likert question uses a 1–5 scale. Anchors at 1 and 5 are both specified as concrete, observable behaviors (S30). The midpoint (3) is not anchored — respondents self-locate between the two behavioral poles.

**Scale display label convention:**

> 1 = This describes me least / 5 = This describes me most

Both anchors must appear on screen with the scale. The scale is not labelled "Strongly disagree" / "Strongly agree" — those are abstract. The anchors describe what each extreme looks like in practice.

---

### Dimension 1 — Task Recognition

**Dimension key:** `task-recognition`
**Full name:** Task Recognition and AI Opportunity Mapping
**Questions:** Q03, Q04, Q05

---

#### Q03 — Identifying recurring AI-suitable tasks

**Question ID:** `q03-task-rec-mapping`
**Dimension:** `task-recognition`
**Type:** `likert`

**Individual framing:**
> When I think about my recurring tasks, I can name specific ones where AI assistance would be genuinely useful — not just "writing help," but the particular type of writing, at what point in the process, and with what kind of input.

**Team variant:**
> When we think about our team's recurring tasks, we can name specific ones where AI assistance would be genuinely useful — not just "writing help," but the particular type, at what point in the process, and with what input.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | I know AI tools can help with writing and research in general, but if you asked me to name three of my own tasks where I'd use AI next week, I couldn't give you concrete examples. |
| **5** | I have a running list — even if informal — of specific task types in my work where AI saves me time or improves quality, and I can describe each one with enough detail that I could set it up for a colleague. |

---

#### Q04 — Assessing task suitability before applying AI

**Question ID:** `q04-task-rec-suitability`
**Dimension:** `task-recognition`
**Type:** `likert`

**Individual framing:**
> Before I use AI on a task, I consider whether that task is actually a good fit for AI — meaning I check whether the inputs are clear enough, the error tolerance is appropriate, and a verification step exists.

**Team variant:**
> Before using AI on a task, my team considers whether the task is actually a good fit — checking whether inputs are clear enough, error tolerance is appropriate, and a verification step exists.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | I use AI when it seems like it might help and skip it when it doesn't seem relevant. I haven't thought about criteria for which tasks are good fits. |
| **5** | I can describe the criteria I use to decide whether a task is suitable for AI: I look at whether the input can be specified clearly, what happens if the output is wrong, and whether I can verify the result before it matters. |

---

#### Q05 — Noticing new opportunities over time

**Question ID:** `q05-task-rec-discovery`
**Dimension:** `task-recognition`
**Type:** `likert`

**Individual framing:**
> Over the past three months, I have identified at least one new area of my work where AI could be useful — and I've either tested it or deliberately decided not to pursue it.

**Team variant:**
> Over the past three months, our team has identified at least one new area of our work where AI could be useful — and we've either tested it or deliberately decided not to pursue it.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | My AI use covers the same areas it did six months ago. I haven't actively looked for new applications. |
| **5** | I regularly notice new task types that might benefit from AI and test them deliberately. I can name something I've added to my AI workflow in the last 90 days. |

---

### Dimension 2 — Context and Prompting

**Dimension key:** `context-prompting`
**Full name:** Context Provision and Prompting Quality
**Questions:** Q06, Q07, Q08

---

#### Q06 — Input quality and context preparation

**Question ID:** `q06-ctx-input-quality`
**Dimension:** `context-prompting`
**Type:** `likert`

**Individual framing:**
> When I use AI for a substantive task, I give it the actual materials it needs — not just a description of the task. I paste in the document I'm working with, the constraints I'm operating under, and the format I need the output in.

**Team variant:**
> When our team uses AI for a substantive task, we give it the actual materials — not just a description of the task. We paste in the relevant document, the constraints, and the required output format.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | My typical prompt is a sentence or two describing what I want. I don't usually include the source document, the specific constraints, or the format I need — I describe what I'm trying to do and work with what comes back. |
| **5** | For any substantive AI task, I prepare the input before writing the prompt: I gather the source materials, identify the constraints, and specify the output format. The prompt includes all of this. I rarely have to add missing context after seeing the first response. |

---

#### Q07 — Prompt reuse and template development

**Question ID:** `q07-ctx-prompt-reuse`
**Dimension:** `context-prompting`
**Type:** `likert`

**Individual framing:**
> For tasks I do repeatedly, I have saved prompt templates I return to — and when a prompt works particularly well, I save or refine it rather than recreating it from scratch next time.

**Team variant:**
> For tasks our team does repeatedly, we have saved prompt templates we return to — and when a prompt works particularly well, we save or refine it rather than recreating it from scratch next time.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | Every time I use AI for a recurring task, I write a new prompt from scratch. I don't have saved templates and don't think of prompts as reusable assets. |
| **5** | I maintain a library of prompt templates — even if it's just a document or a folder — for the recurring tasks where I use AI. When a prompt works well, I record it. I can name at least three templates I've used more than once this month. |

---

#### Q08 — Prompt iteration and diagnosis

**Question ID:** `q08-ctx-iteration`
**Dimension:** `context-prompting`
**Type:** `likert`

**Individual framing:**
> When an AI output isn't what I needed, I can usually identify why — and I change something specific in the prompt or context rather than trying random variations until something works.

**Team variant:**
> When an AI output isn't what we needed, we can usually identify why — and we change something specific in the prompt or context rather than trying random variations.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | When an AI output is off, I try rephrasing or ask again. I'm not usually sure what caused the problem — I experiment until I get something usable. |
| **5** | When an AI output misses, I can diagnose the cause: missing context, ambiguous instruction, wrong format specification, or scope that was too broad. I fix that specific thing rather than rewriting the whole prompt. I can explain my prompt decisions to someone else. |

---

### Dimension 3 — Workflow Design

**Dimension key:** `workflow-design`
**Full name:** Workflow Design and AI Integration
**Questions:** Q09, Q10, Q11 (Likert) + Q16 (Scenario)

The scenario question for this dimension (Q16) appears after Q15 in the display sequence, grouped with other scenarios. It is listed here for specification completeness.

---

#### Q09 — AI as a structural step, not an ad hoc shortcut

**Question ID:** `q09-wf-structural`
**Dimension:** `workflow-design`
**Type:** `likert`

**Individual framing:**
> For the tasks where I use AI, it's part of how I always do that task — not something I reach for when I happen to remember it. If AI were unavailable, I would notice a gap in my process, not just miss a convenience.

**Team variant:**
> For the tasks where our team uses AI, it's part of how we always do those tasks — not something we reach for when someone happens to remember it. If AI were unavailable, we would notice a gap in our process.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | I use AI when it occurs to me. There's no point in my process where I always use it — some days I do, some days I don't, and the output quality doesn't noticeably differ. |
| **5** | I can name at least two recurring tasks where AI is a defined step in my process — meaning if I did that task without AI, something would be structurally missing, not just slower. Those tasks have an AI step the same way they have a review step. |

---

#### Q10 — Handoff design between AI steps and human steps

**Question ID:** `q10-wf-handoffs`
**Dimension:** `workflow-design`
**Type:** `likert`

**Individual framing:**
> In the workflows where I use AI, I can describe exactly what the AI produces and what I do with it — there is a defined point where AI output becomes my input, and I know what that handoff looks like.

**Team variant:**
> In the workflows where our team uses AI, we can describe exactly what AI produces and what happens next — there is a defined handoff point, and team members agree on what that looks like.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | AI output goes into my work somewhere, but if you asked me to draw the handoff — where AI stops and I start — I couldn't draw a clean line. It's mixed in throughout rather than structured as distinct steps. |
| **5** | For each AI-integrated workflow I use, I can describe the handoff: AI receives X (format and content), produces Y (format and content), and I take Y and do Z with it. The handoff point is specific enough that I could hand the workflow to someone else with written instructions. |

---

#### Q11 — Designing new workflows with AI from the start

**Question ID:** `q11-wf-design-intent`
**Dimension:** `workflow-design`
**Type:** `likert`

**Individual framing:**
> When I take on a new recurring task or project, I consider from the start whether AI should be part of how I do it — rather than building the process first and adding AI later when it becomes inconvenient not to.

**Team variant:**
> When our team takes on a new recurring task or project, we consider from the start whether AI should be part of how we do it — rather than building the process first and adding AI later.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | I build my process for a new task first, then occasionally notice afterward that I could have used AI somewhere. AI is an add-on I retrofit, not a consideration at the design stage. |
| **5** | When I'm designing how I'll handle a new recurring task, AI is one of the first things I consider alongside the other tools and steps. I can name a process I've built this year where AI was part of the design from the beginning, not added later. |

---

### Dimension 4 — Judgment and Verification

**Dimension key:** `judgment-verification`
**Full name:** Judgment, Verification, and Output Calibration
**Questions:** Q12, Q13 (Likert) + Q17 (Scenario)

---

#### Q12 — Calibrated trust: knowing when to verify

**Question ID:** `q12-jv-calibration`
**Dimension:** `judgment-verification`
**Type:** `likert`

**Individual framing:**
> I have a working sense of which types of AI output I need to verify carefully and which I can use with light checking. My trust level varies by task type — it's not the same for everything I use AI for.

**Team variant:**
> Our team has a working sense of which types of AI output require careful verification and which can be used with light checking. Trust varies by task type — it's not applied uniformly.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | I approach all AI output about the same way — I read it, decide if it seems right, and use it if it does. I don't have distinct verification practices for different task types. |
| **5** | I can describe, for each major task type I use AI for, what my verification step is: what I check, how I check it, and what would cause me to reject or substantially revise the output. My checking is heavier for high-stakes or factual tasks and lighter for low-stakes or structural tasks. |

---

#### Q13 — Recognising AI failure modes in practice

**Question ID:** `q13-jv-failure-modes`
**Dimension:** `judgment-verification`
**Type:** `likert`

**Individual framing:**
> I have encountered situations where AI output looked correct but wasn't — and I have adjusted how I verify AI output based on having caught those errors.

**Team variant:**
> Our team has encountered situations where AI output looked correct but wasn't — and we have adjusted our verification practices based on having caught those errors.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | I trust AI output unless something obviously looks wrong. I haven't encountered a case where it was confidently wrong in a way that wasn't immediately obvious. |
| **5** | I can describe at least one specific case where AI produced a plausible but incorrect output that I caught before it caused a problem. I changed something in how I verify after that experience — either the check itself, the task type, or when in the process I look. |

---

### Dimension 5 — Delivery and Integration

**Dimension key:** `delivery-integration`
**Full name:** Delivery Integration and Artifact Completion
**Questions:** Q14, Q15

---

#### Q14 — AI output completion rate into production artifacts

**Question ID:** `q14-di-completion-rate`
**Dimension:** `delivery-integration`
**Type:** `likert`

**Individual framing:**
> When I use AI to help with a task, the output typically ends up in the final artifact — the sent email, the delivered document, the published content, the shipped code. I'm not regularly generating AI drafts that get discarded or entirely rewritten.

**Team variant:**
> When our team uses AI to help with a task, the output typically ends up in the final artifact. We're not regularly generating AI drafts that get discarded or entirely rewritten before anything ships.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | Most of what AI produces for me gets heavily rewritten or discarded. It's useful for getting started, but the final artifact usually looks very different from what AI generated. |
| **5** | For the task types where I use AI, the output goes directly into the deliverable with editing, not a complete rewrite. I can name a deliverable from last month where AI-generated content made it into the final version with targeted edits rather than being replaced wholesale. |

---

#### Q15 — Artifact fit: AI output matches what the workflow actually needs

**Question ID:** `q15-di-artifact-fit`
**Dimension:** `delivery-integration`
**Type:** `likert`

**Individual framing:**
> The AI output I receive matches the format and register of what the workflow needs — it doesn't require me to reformat, restructure, or substantially change the tone before it's usable.

**Team variant:**
> The AI output our team receives matches the format and register of what the workflow needs — it doesn't require reformatting or substantial rework before it's usable.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | AI output often needs significant reformatting or tonal adjustment before it fits the deliverable. The structure or register is usually off even when the content is close. |
| **5** | For the tasks I've designed AI prompts around, the output matches the format and register I need without major restructuring. I've designed the prompt specifically to produce the output structure that fits the workflow — the formatting and tone are part of the prompt specification. |

---

### Dimension 6 — Governance and Systematization

**Dimension key:** `governance-systematization`
**Full name:** Governance, Systematization, and Auditability
**Questions:** Q16 (shared scenario — see §4), Q18, Q19, Q20

Wait — correcting numbering. Scenarios Q16 and Q17 appear as dedicated scenario questions in §4 below. Dimension 6 Likert questions are Q18, Q19, Q20.

> **Numbering clarification:** The full question sequence is Q01–Q22. Q01–Q02 are routing. Q03–Q15 are Likert dimension questions. Q16–Q17 are scenario questions (covering `workflow-design` and `judgment-verification` respectively). Q18–Q20 are Dimension 6 Likert questions. Q21–Q22–Q23 (displayed as Q20–Q22 externally, since routing questions are not visibly numbered) are contextual questions.

The implementation spec should suppress the visible step number for Q01 and Q02 (routing questions) so the respondent sees questions numbered from 1 at Q03.

---

#### Q18 — Methods are documented and usable by others

**Question ID:** `q18-gov-documentation`
**Dimension:** `governance-systematization`
**Type:** `likert`

**Individual framing:**
> The AI workflows I use regularly are documented well enough that someone joining my team could run them without asking me to walk them through it.

**Team variant:**
> The AI workflows our team uses regularly are documented well enough that a new team member could run them without asking someone to walk them through it.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | My AI workflows are in my head. If someone else needed to run them, I'd have to demonstrate or write them up from scratch — there's nothing they could read to get started. |
| **5** | For each recurring AI workflow I own, there is a written description — even if it's a short document, a notion page, or a template with comments — that describes the input, the prompt or process, and what a good output looks like. A colleague could use it without asking me. |

---

#### Q19 — Data governance and AI-off decisions

**Question ID:** `q19-gov-data-policy`
**Dimension:** `governance-systematization`
**Type:** `likert`

**Individual framing:**
> I have a clear working rule about what information I do not put into AI tools — and I apply it consistently, not just when someone asks me about it.

**Team variant:**
> Our team has a clear shared rule about what information does not go into AI tools — and team members apply it consistently, not just when someone raises it.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | I use my judgment about what to put into AI tools on a case-by-case basis. I don't have a fixed rule and couldn't tell you the specific categories of information I keep out. |
| **5** | I can state, right now, the specific categories of information I never put into AI tools: [e.g., client PII, contract terms not yet signed, internal financial data not approved for external use]. That rule was not invented when you asked — I have applied it in the past month in at least one concrete situation. |

---

#### Q20 — Output accountability

**Question ID:** `q20-gov-accountability`
**Dimension:** `governance-systematization`
**Type:** `likert`

**Individual framing:**
> For the AI-assisted work I produce, it is clear — to me and to anyone receiving it — who is accountable for its accuracy: me, not the AI. I do not use "the AI said so" as a justification for content I deliver.

**Team variant:**
> For the AI-assisted work our team produces, accountability for accuracy is clear: team members own the output, not the tool. We do not use "the AI generated it" as a reason why something was wrong.

**Scale anchors:**

| Position | Anchor text |
|---|---|
| **1** | There is some ambiguity about who owns the accuracy of AI-generated content when it's delivered as part of my work. I'm not sure everyone who receives it knows where it came from or who verified it. |
| **5** | Every AI-assisted output I deliver is something I have reviewed and am prepared to defend as my own work. If it contains an error, that is my error, not the tool's. I have a verification step that makes this claim honest rather than aspirational. |

---

## 4. Scenario Questions

Scenario questions present a realistic work situation and ask the respondent to choose how they would handle it. One answer is the best practice response. Three answers are common failure modes — each tagged with the failure mode it represents.

Scoring: best practice = 4 points; failure mode answers = 0 points (the scoring engine treats scenario questions as binary correct/incorrect, with the score contributing to the dimension total).

### Q16 — Workflow Design Scenario

**Question ID:** `q16-scenario-workflow`
**Dimension:** `workflow-design`
**Type:** `scenario`

**Individual framing:**

> You've been asked to produce the same type of deliverable every two weeks — a competitive analysis summary for your leadership team. The first time, you used AI to draft it and were happy with the result. The second time, you started from scratch again with a new prompt.
>
> What do you do after the second good result?

**Team variant:**

> Your team has been asked to produce the same type of deliverable every two weeks — a competitive analysis summary for leadership. The first time a team member used AI to draft it, the result was good. The second time, a different team member did the same task from scratch with a new prompt.
>
> What does your team do after the second good result?

**Answer options:**

| Option | Label | Tag |
|---|---|---|
| A | I save the prompts from both successful runs, compare what worked, and create a template that includes the framing, context, and format instructions — so the next person running this task starts with a defined starting point rather than a blank page. | `BEST_PRACTICE` |
| B | I make a mental note of what worked this time so I can replicate it next month. | `FAILURE_MODE: recall-not-capture` — relying on memory means the method is not systematized and will degrade across sessions or operators. |
| C | I'm happy with two good results in a row and don't think anything needs to change — if it worked twice, it'll probably work again. | `FAILURE_MODE: no-template` — two successes do not constitute a replicable method; variation in future runs is not addressed. |
| D | I start from scratch each time because the competitive landscape changes — the same prompt wouldn't apply to a different set of competitors anyway. | `FAILURE_MODE: false-uniqueness` — the structure, framing, and format of the prompt are reusable even when the content inputs differ; this conflates content variability with method variability. |

---

### Q17 — Judgment and Verification Scenario

**Question ID:** `q17-scenario-judgment`
**Dimension:** `judgment-verification`
**Type:** `scenario`

**Individual framing:**

> You've asked an AI tool to summarise the key findings from three research reports you'll reference in a proposal. The summary looks detailed, well-structured, and uses language from the original documents. You're under time pressure and the proposal is due in two hours.
>
> What do you do before including this summary in the proposal?

**Team variant:**

> A team member has asked an AI tool to summarise the key findings from three research reports to include in a proposal. The summary looks detailed, well-structured, and uses language from the original documents. The team member is under time pressure — the proposal is due in two hours.
>
> What does your team expect the team member to do before including this summary?

**Answer options:**

| Option | Label | Tag |
|---|---|---|
| A | I read each specific claim or finding in the AI summary against the corresponding section of the source report, marking off each item as verified. I use the summary for what passes this check and rewrite or remove anything I can't verify. | `BEST_PRACTICE` |
| B | The summary uses language from the originals, so I assume it's accurate. I read it for coherence and tone and include it as drafted. | `FAILURE_MODE: surface-plausibility` — stylistic faithfulness is not factual accuracy; AI can reproduce document language while misrepresenting findings. |
| C | I skim the summary to check it doesn't say anything obviously wrong, then include it. Two hours isn't enough time for a full check. | `FAILURE_MODE: time-pressure-rationalization` — time pressure is a known risk factor, not a justification for skipping verification on factual claims going to clients. |
| D | I add a footnote saying the summary was AI-generated so the reader knows to check it themselves. | `FAILURE_MODE: accountability-deflection` — transferring the verification burden to the reader means delivering unverified factual claims; the accountability for what you submit belongs to you, not the AI. |

---

## 5. Contextual Questions

Contextual questions collect information that personalizes the report's interpretation and build step sections. They are not scored and do not contribute to dimension scores or maturity level. They are displayed after the dimension and scenario questions.

All contextual questions use `type: contextual` and `dimension: null`.

---

### Q21 — Role Level

**Question ID:** `q21-ctx-role`
**Dimension:** null (contextual)
**Type:** `contextual`

**Question text (same for both framings):**

> What best describes your role?

**Answer options (string values, not scored):**

| Value | Label |
|---|---|
| `individual-contributor` | Individual contributor — I produce work directly (writing, code, analysis, design, etc.) |
| `team-lead` | Team lead or manager — I direct or review others' work and produce some directly |
| `head-of-function` | Head of function or department — I set direction for a team or practice area |
| `c-suite-founder` | C-suite or founder — I set company-level direction and make resourcing decisions |

**Usage in report:** Report interpretation and build-step copy will be calibrated to the respondent's level. A founder's "build step" will differ from an individual contributor's even at the same maturity level.

---

### Q22 — Primary Work Type

**Question ID:** `q22-ctx-work-type`
**Dimension:** null (contextual)
**Type:** `contextual`

**Question text (same for both framings):**

> Which of these best describes the main type of work where you use AI — or would most like to?

**Answer options (string values, not scored):**

| Value | Label |
|---|---|
| `written-comms` | Written communications — proposals, reports, emails, client-facing documents |
| `research-analysis` | Research and analysis — synthesising information, evaluating options, preparing briefs |
| `product-engineering` | Product or engineering — specification, code review, documentation, technical writing |
| `ops-process` | Operations or process — SOPs, workflow documentation, internal coordination |
| `strategy-planning` | Strategy and planning — roadmaps, prioritisation, stakeholder materials |

**Usage in report:** The build step ("one executable action for this week") is calibrated to work type. A written-comms practitioner at Level 2 receives a different build step than a product-engineering practitioner at Level 2.

---

### Q23 — Primary AI Tools

**Question ID:** `q23-ctx-tools`
**Dimension:** null (contextual)
**Type:** `contextual`

**Question text (same for both framings):**

> Which AI tools do you currently use most in your work? Select all that apply.

**Answer options (multi-select; string values, not scored):**

| Value | Label |
|---|---|
| `chatgpt` | ChatGPT (OpenAI) |
| `claude` | Claude (Anthropic) |
| `gemini` | Gemini (Google) |
| `copilot` | Microsoft Copilot / GitHub Copilot |
| `perplexity` | Perplexity |
| `custom-gpt-agent` | A custom GPT, agent, or internal AI tool |
| `other` | Other |
| `none-yet` | I haven't settled on regular tools yet |

**Usage in report:** Tool context is passed to HubSpot as a contact property. It is not used to adjust the maturity score. In v2, tool context may be used to route to tool-specific prompting resources.

---

## 6. Branching Specification

This table is the canonical routing reference. All routing decisions and their downstream consequences are listed here.

| Question | Answer | Consequence | Notes |
|---|---|---|---|
| Q01 (intake) | `no` | Track A early exit: display message, Foundations Workshop CTA, stop survey | No email gate. No score computed. Fire `assessment_early_exit_track_a` analytics event. |
| Q01 (intake) | `yes` | Proceed to Q02 | — |
| Q02 (framing) | `individual` | Set `framingVariant = 'individual'`; all Q03–Q15, Q18–Q20 display in first-person singular | No scoring change. Copy change only. |
| Q02 (framing) | `team` | Set `framingVariant = 'team'`; all Q03–Q15, Q18–Q20 display in team framing | No scoring change. Copy change only. |
| Q03–Q15, Q18–Q20 | (scored) | Likert value 1–5 → raw dimension score | Scores aggregated per dimension. |
| Q16 (scenario) | Option A | + 4 points to `workflow-design` dimension score | BEST_PRACTICE |
| Q16 (scenario) | Options B, C, or D | + 0 points to `workflow-design` dimension score | Failure mode tagged for potential report insight use in v2 |
| Q17 (scenario) | Option A | + 4 points to `judgment-verification` dimension score | BEST_PRACTICE |
| Q17 (scenario) | Options B, C, or D | + 0 points to `judgment-verification` dimension score | Failure mode tagged |
| Q21–Q23 | (contextual) | Stored as HubSpot contact properties; used to personalise report build step and CTA copy | Not scored. |
| Score: Level 1–2 | — | Track A CTA in report section 9 | Rare post-survey: intake Q01 filters most Level 1–2 users. Level 1–2 score after "yes" is still possible. |
| Score: Level 3–4 | — | Track B CTA in report section 9 | Primary conversion target. |
| Score: Level 4–5 AND D6 ≥ Track C threshold | — | Track C CTA in report section 9 | Track C threshold defined in scoring specification. |
| Score: Level 4 AND D6 < Track C threshold | — | Track B CTA in report section 9 | Systematization fix before agent conversation. |
| `framingVariant = 'individual'` | — | Report Interpretation + Next Level copy uses first-person singular. Track B CTA includes bridge: "You've seen your own baseline. The Assessment sprint maps your whole team." | Copy variant only. |
| `framingVariant = 'team'` | — | Report Interpretation + Next Level copy uses team framing. Track B CTA reads: "The Assessment sprint maps your team's dimensions — starting from where you've identified today." | Copy variant only. |

---

## 7. S30 Compliance Checklist

S30 requires: every answer option uses concrete, observable behaviors — not abstract readiness descriptors.

The following patterns are prohibited in any answer option:

| Prohibited pattern | Example of violation | Reason |
|---|---|---|
| Abstract readiness levels | "Our AI governance is mature" | No observable action; self-report of maturity is circular |
| Vague frequency adverbs | "I frequently use AI" / "I rarely use AI" | Frequency without context is unanchorable |
| Attitude descriptors | "I am open to AI" / "I am enthusiastic about AI tools" | Attitude is not behavior |
| Generic capability claims | "We are well-positioned for AI" | No observable correlate |
| Outcome-only statements | "AI saves us time" | States result without describing the practice that produces it |

Each answer option in this specification describes either:
- A specific action the respondent does or does not take (observable), or
- A specific artifact or output that exists or does not exist (observable), or
- A specific decision criterion the respondent can or cannot articulate (elicitable)

All 1-anchors describe a recognizable state of limited or ad hoc practice. All 5-anchors describe a specific, checkable practice. Mid-scale positions (2, 3, 4) are not anchored — respondents self-locate between the poles.

---

## 8. Implementation Notes

### Step counter display

The step counter displayed to the respondent should count only the scored dimension questions, scenario questions, and contextual questions — not the routing questions. Routing questions (Q01 and Q02) are pre-survey configuration, not assessment steps. The visible counter starts at "Question 1 of 19" when Q03 is displayed.

### Scenario question display

Scenario questions (Q16 and Q17) should be presented identically to Likert questions from the respondent's perspective — as a question with four choices. The failure mode tags are internal data only and must not appear in the UI. Only the scoring engine reads them.

### Framing variant storage

The `framingVariant` value (`individual` or `team`) must be stored in component state from Q02 onwards and passed to:
- The question renderer (to select the correct question text variant for each question)
- The scoring engine (as `AssessmentScore.framingVariant`)
- The report renderer (to select the correct copy variants in Interpretation, Next Level, and Track CTA sections)

### HubSpot properties from contextual questions

| HubSpot property key | Source question | Value type |
|---|---|---|
| `ai_fluency_level` | Scoring engine output | Integer 1–5 |
| `ai_fluency_framing` | Q02 | `individual` or `team` |
| `ai_fluency_role` | Q21 | String (option value) |
| `ai_fluency_work_type` | Q22 | String (option value) |
| `ai_fluency_tools` | Q23 | Comma-separated string |
| `company_email_domain` | Email gate (derived) | String |

### Scoring weight note

All Likert questions are weighted equally within a dimension. Each Likert question contributes 1–5 points to the dimension raw score. Each scenario question contributes 0 or 4 points. Dimension raw scores are normalised against the dimension maximum before being compared to the threshold matrix. The threshold matrix and normalisation formula are defined in the scoring specification (separate Phase 2 deliverable).

---

## 9. BDD Scenario Cross-Reference

| BDD Scenario | How This Document Satisfies It |
|---|---|
| **S19** — Individual framing → first-person report copy | Q02 framing question defined with `individual` option. Branching spec maps `individual` → first-person Interpretation + Next Level + Track B bridge CTA. All Q03–Q20 individual variants specified. |
| **S19b** — Team framing → team-scoped report copy | Q02 framing question defined with `team` option. Branching spec maps `team` → team framing in Interpretation + Next Level + Track B direct CTA. All Q03–Q20 team variants specified. |
| **S30** — All answers use concrete observable behaviors | §7 compliance checklist defines prohibited patterns. Every anchor pair in questions Q03–Q20 uses the observable behavior standard. Scenario options Q16 and Q17 describe specific, named actions. |
| **S32** — Intake routing question displayed first | Q01 is specified as the first question. Answer options are behaviorally anchored: "at least occasionally in my actual work" vs. "only tried them once outside a real task." |
| **S32b** — Track A early exit flow for No at intake | §2.1 specifies the early exit message text, Foundations Workshop CTA, no-email-gate requirement, and analytics event. |

---

## Appendix A — Question Reference Index

| ID | Dimension | Type | Short description |
|---|---|---|---|
| Q01 | — (routing) | routing | Intake: current AI use |
| Q02 | — (routing) | routing | Framing: self vs. team |
| Q03 | task-recognition | likert | Naming specific AI-suitable tasks |
| Q04 | task-recognition | likert | Assessing task suitability before use |
| Q05 | task-recognition | likert | Discovering new opportunities over time |
| Q06 | context-prompting | likert | Input quality and context preparation |
| Q07 | context-prompting | likert | Prompt reuse and template development |
| Q08 | context-prompting | likert | Prompt iteration and diagnosis |
| Q09 | workflow-design | likert | AI as a structural step, not ad hoc |
| Q10 | workflow-design | likert | Handoff design between AI and human steps |
| Q11 | workflow-design | likert | Designing new workflows with AI from the start |
| Q12 | judgment-verification | likert | Calibrated trust: knowing when to verify |
| Q13 | judgment-verification | likert | Recognising AI failure modes in practice |
| Q14 | delivery-integration | likert | AI output completion rate into production |
| Q15 | delivery-integration | likert | Artifact fit: output matches workflow needs |
| Q16 | workflow-design | scenario | Systematising a repeated AI-assisted task |
| Q17 | judgment-verification | scenario | Verifying AI summary under time pressure |
| Q18 | governance-systematization | likert | Methods documented and usable by others |
| Q19 | governance-systematization | likert | Data governance and AI-off decisions |
| Q20 | governance-systematization | likert | Output accountability |
| Q21 | — (contextual) | contextual | Role level |
| Q22 | — (contextual) | contextual | Primary work type |
| Q23 | — (contextual) | contextual | Primary AI tools used |

**Dimension question counts:**

| Dimension | Likert | Scenario | Total scored questions | Max raw score |
|---|---|---|---|---|
| task-recognition | 3 | 0 | 3 | 15 |
| context-prompting | 3 | 0 | 3 | 15 |
| workflow-design | 3 | 1 | 4 | 19 |
| judgment-verification | 2 | 1 | 3 | 14 |
| delivery-integration | 2 | 0 | 2 | 10 |
| governance-systematization | 3 | 0 | 3 | 15 |
| **Total** | **16** | **2** | **18** | **88** |

Note: The unequal max raw scores across dimensions require normalisation before threshold comparison. The scoring specification must define the normalisation method (recommended: express each dimension score as a percentage of its maximum, then apply thresholds as percentages).

---

## Appendix B — Maturity Level to Question Anchor Mapping

This table shows which maturity level each Likert anchor is calibrated to represent. It is a design reference for the scoring team, not visible to respondents.

| Question | 1-Anchor represents | 5-Anchor represents |
|---|---|---|
| Q03 | Level 1 (Curious) — no specific AI opportunity identified | Level 3–4 (Practicing–Systematic) — task library with handoff-ready specification |
| Q04 | Level 1–2 (Curious–Emerging) — no suitability criteria | Level 4 (Systematic) — explicit multi-factor criteria, articulable |
| Q05 | Level 2 (Emerging) — static AI use, no discovery | Level 4 (Systematic) — active discovery with named recent example |
| Q06 | Level 2 (Emerging) — minimal context, describe-only prompts | Level 4 (Systematic) — materials-in-prompt, structured input preparation |
| Q07 | Level 1–2 (Curious–Emerging) — no template concept | Level 3–4 (Practicing–Systematic) — maintained library, active reuse |
| Q08 | Level 2 (Emerging) — random iteration | Level 4 (Systematic) — diagnostic iteration, explainable decisions |
| Q09 | Level 2 (Emerging) — ad hoc use | Level 4 (Systematic) — structural step, gap noticeable without AI |
| Q10 | Level 2–3 (Emerging–Practicing) — mixed in, no defined handoff | Level 4 (Systematic) — handoff specifiable for hand-off to another person |
| Q11 | Level 2–3 (Emerging–Practicing) — retrofit AI after process design | Level 4 (Systematic) — AI in design from start |
| Q12 | Level 2 (Emerging) — uniform trust, no calibration | Level 4 (Systematic) — task-type-differentiated verification |
| Q13 | Level 2 (Emerging) — no caught errors, uniform approach | Level 3–4 (Practicing–Systematic) — caught error, method updated |
| Q14 | Level 2–3 (Emerging–Practicing) — high discard rate | Level 4 (Systematic) — high completion rate with targeted editing |
| Q15 | Level 2–3 (Emerging–Practicing) — format/register mismatch | Level 4 (Systematic) — prompt designed for output fit |
| Q18 | Level 1–2 (Curious–Emerging) — all in head, nothing documented | Level 4–5 (Systematic–Agent-Ready) — documented, colleague-usable |
| Q19 | Level 1–2 (Curious–Emerging) — case-by-case, no rule | Level 4 (Systematic) — explicit, named, applied recently |
| Q20 | Level 2–3 (Emerging–Practicing) — accountability ambiguity | Level 4 (Systematic) — explicit ownership with honest verification backing it |

---

*This document is a Phase 2 deliverable for initiative I02-AIASSESS. It satisfies the intake questionnaire requirement in the Phase 2 gate criteria (UQ-12c: "intake questionnaire drafted with maturity-calibrated anchors"). It is a design specification only — implementation of question rendering, answer storage, and scoring are Phase 3 tasks.*
