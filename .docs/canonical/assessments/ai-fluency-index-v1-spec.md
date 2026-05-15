---
type: framework-spec
initiative: I02-AIASSESS
version: v1
date: 2026-05-15
status: draft
---

# Adaptive Alchemy AI Fluency Index — Framework Specification v1

## 1. Framework Overview

### 1.1 Full Name and Purpose

**Adaptive Alchemy AI Fluency Index** (shorthand: AI Fluency Index after first full mention) is a five-level maturity model for assessing how effectively an individual or team uses AI in their work. It measures practitioner fluency — the degree to which a person or team has internalized deliberate methods for working with AI tools — across six dimensions of practice.

The framework was developed to fill a specific gap: most AI adoption assessments measure organizational infrastructure (tooling, investment, policy) or technical capability (model selection, integration architecture). The AI Fluency Index measures neither of these. It measures whether the humans operating AI tools have developed the judgment, habits, and workflows to extract consistent, verified value from those tools.

### 1.2 What the Framework Measures

The AI Fluency Index measures:

- **Task recognition**: whether practitioners can identify which recurring tasks are suitable candidates for AI assistance
- **Context and prompting quality**: whether practitioners provide AI with the inputs it actually needs to produce useful outputs
- **Workflow design**: whether AI use is integrated into deliberate processes or applied ad hoc
- **Judgment and verification**: whether practitioners have calibrated when to trust, scrutinize, or reject AI outputs
- **Delivery integration**: whether AI-generated work ends up in production artifacts or is discarded before use
- **Governance and systematization**: whether methods are reusable, auditable, and consistent — and whether practitioners understand which work cannot safely be delegated to AI

### 1.3 What the Framework Does Not Measure

The AI Fluency Index does not measure:

- **AI infrastructure**: cloud spend, compute resources, API integrations, model hosting, or vendor contracts
- **Technical AI capability**: ability to fine-tune models, build ML pipelines, or write AI systems
- **Tool selection**: which specific AI tools a team uses, or whether they have adopted the latest models
- **AI strategy maturity**: board-level AI governance, enterprise policy frameworks, or technology roadmap completeness
- **AI output quality in isolation**: the framework assesses human practice around AI use, not the performance of AI systems themselves

A team with sophisticated AI infrastructure but inconsistent human practices will score lower on the AI Fluency Index than a team using commodity tools with disciplined, repeatable methods. The index is agnostic to the AI stack; it assesses the people using it.

### 1.4 Two Framings: Individual and Team

The AI Fluency Index supports two distinct assessment framings that share the same underlying methodology:

**Individual practitioner framing**: Assesses one person's AI fluency across the six dimensions, based on their own recurring tasks and workflows. Produces a personal maturity score and dimension profile. This is the primary framing for the free AI Readiness Check tool. The individual framing is the starting point: it establishes a personal baseline before any team-level diagnosis.

**Team-level framing**: Assesses a team's collective AI practice by aggregating individual signals and adding organizational-layer questions about shared processes, governance structures, and cross-functional consistency. Team-level assessment is the domain of the paid AI Readiness Assessment engagement. The individual free tool creates a discovery channel into the team engagement: "You've seen your own baseline. The Assessment sprint maps your whole team."

Both framings produce the same five-level score and six-dimension profile. The difference is in scope, data collection method, and the interpretation layer: individual framing reads as "here is how you work with AI"; team framing reads as "here is how your team's AI practice holds together under operational conditions."

---

## 2. Five Maturity Levels

### Level 1 — Curious

**Behavioral definition**: A Curious practitioner is aware that AI tools exist and can describe what they are used for, but has not established any recurring pattern of AI use in their own work. They may have tried a chatbot or generative tool once or twice but lack a clear picture of which of their tasks AI could materially change. The question "where would I even start?" is genuine and unanswered.

**Observable outputs**: One-off AI experiments with no saved prompts, no repeated workflows, and no artifacts that originated from AI assistance currently in use. If asked to describe one workflow where they use AI regularly, they cannot.

**Primary bottleneck**: Task recognition. The limiting factor is not skill with prompting or access to tools — it is the absence of a mental model for mapping AI capability to their own work.

**Growth-stage context**: In a growth-stage company, a Level 1 team typically has individuals who have personally tried ChatGPT for writing help but have never discussed AI use as a team, set any norms around it, or identified a single business process where consistent AI use would make a measurable difference. AI is a personal curiosity, not a work practice.

---

### Level 2 — Emerging

**Behavioral definition**: An Emerging practitioner uses AI tools for some tasks but inconsistently — triggered by memory or inspiration rather than by a defined process. They have discovered that AI can help with certain work (summarizing, drafting, researching) but their use is opportunistic. Results are variable because inputs to AI vary widely across sessions; the same task might be done with AI on Tuesday and without AI the following Tuesday with no particular reason for the difference.

**Observable outputs**: A history of AI-assisted drafts, summaries, or research outputs, but no saved prompt templates, no documented process for when or how AI is used, and no mechanism for knowing whether AI-assisted work is better or more efficient than unassisted work.

**Primary bottleneck**: Context and prompting consistency. The Emerging practitioner has identified useful AI applications but has not yet built the prompting discipline and context-preparation habits that produce reliable outputs. Each session effectively starts from scratch.

**Growth-stage context**: In a growth-stage company, a Level 2 team has team members who use AI individually and informally. There may be occasional Slack messages sharing a good prompt. No one has designed a workflow around AI use. The value is real but unreliable — which is how AI gets a reputation for being "hit or miss."

---

### Level 3 — Practicing

**Behavioral definition**: A Practicing practitioner uses AI regularly for specific recurring tasks. They have saved prompts or templates they return to. They have a rough sense of which task types AI handles well for them and which require heavy editing. Their AI use is intentional rather than accidental, but it exists alongside their workflows rather than being integrated into them. Results are good on familiar tasks; unfamiliar applications still produce variable output.

**Observable outputs**: A library of working prompts (even if informal — a Notion doc, a text file). Recurring tasks where AI assistance is the default, not the exception. Artifacts that move from AI output to finished deliverable with a consistent editing step. Time saved on specific, nameable tasks.

**Primary bottleneck**: Workflow design. The Practicing practitioner has the prompting skill and the habits of use, but AI assistance lives in parallel to their process rather than inside it. Moving to the next level requires redesigning workflows to include AI as a structural component, not just a sometimes-used shortcut.

**Growth-stage context**: In a growth-stage company, a Level 3 team has individual contributors who are genuinely faster on certain tasks. But team-level AI use is fragmented: one person has a solid prompting practice for customer-facing copy, another has discovered AI coding assistance, but these practices are not shared, not documented, and not accessible to the rest of the team. The organization is not yet capturing the full value of the individual practice it has.

---

### Level 4 — Systematic

**Behavioral definition**: A Systematic practitioner has deliberately redesigned specific workflows to include AI as a structural component. They use templates, have documented their prompting patterns, measure whether AI-assisted work is actually better (by quality, speed, or both), and can explain which parts of a workflow AI owns, which parts require human judgment, and how handoffs work. Their AI use is not self-improvement — it is operational. They know if it is working.

**Observable outputs**: Documented workflow designs that include AI steps. Prompt libraries maintained as shared team assets, not personal notes. Measurable output: faster turnaround on defined task types, reduction in editing time, improved first-draft quality on specific deliverables. The Systematic practitioner can describe what "good AI output" looks like for each of their AI-integrated tasks and articulate the verification step that confirms it.

**Primary bottleneck**: Governance and systematization. The Systematic practitioner has built effective individual practice. The constraint at this level is whether the methods are sufficiently specified, documented, and governed that they can be handed off, scaled, or — at the frontier — delegated to supervised automation. The bottleneck is specification depth, not skill.

**Growth-stage context**: In a growth-stage company, a Level 4 team has moved from individual AI use to deliberate workflow redesign. Prompt libraries are shared. New team members can ramp onto AI-assisted workflows by reading documentation. The team has an opinion on what AI can and cannot do for them, based on observation rather than assumption. The next question is whether these workflows are specified precisely enough to be operated without per-instance supervision.

---

### Level 5 — Agent-Ready

**Behavioral definition**: An Agent-Ready practitioner has achieved a Systematic practice sufficiently specified, verified, and governed that specific workflows can be safely delegated to supervised AI agents. Agent-Ready does not mean "already running agents" — it means the underlying practice has reached the auditability and specification depth where agent delegation is safe and reproducible. Agent-Ready practitioners can describe, for any AI-integrated workflow, the input format, output format, verification criteria, escalation conditions, and failure modes. They have a governance position on which workflows can be automated and which require human judgment at each step.

**Observable outputs**: Documented workflow specifications that include handoff criteria, verification steps, and escalation conditions — not just prompt templates. An explicit assessment of which workflows are candidates for supervised automation and which are not, with the reasoning documented. Evidence that current AI-assisted workflows produce consistent outputs across operators and sessions (not just in the hands of the practitioner who designed them).

**Primary bottleneck**: At Level 5, there is no single internal bottleneck — the practice is at the frontier. The constraint shifts to organizational: whether the infrastructure exists to run, monitor, and audit agent workflows at scale, and whether the agent design work has been done for specific high-value candidates.

**Growth-stage context**: In a growth-stage company, an Agent-Ready team has reached the point where the question is no longer "are we good at using AI tools?" but "which of our processes should we be considering for supervised automation, and are our methods clean enough to get there?" This is the natural entry point for the broader Adaptive Alchemy engagement: agent opportunity mapping, architecture design, and governance design.

---

## 3. Six Dimensions

### Dimension 1 — Task Recognition

**Dimension key**: `task-recognition`

**Full name**: Task Recognition and AI Opportunity Mapping

**What it measures**: Whether a practitioner can identify which of their recurring tasks are materially suitable for AI assistance — that is, tasks with clear enough inputs and outputs, sufficient volume or frequency, and an acceptable tolerance for AI error given the verification step available.

**Why it matters for team-level AI effectiveness**: A team that cannot reliably identify high-value AI opportunities will either under-use AI (leaving efficiency gains uncaptured) or over-use AI on tasks where errors are costly and hard to detect. Task Recognition is the threshold capacity: without it, the other five dimensions cannot generate value because they are being applied to the wrong work.

---

### Dimension 2 — Context and Prompting

**Dimension key**: `context-prompting`

**Full name**: Context Provision and Prompting Quality

**What it measures**: Whether a practitioner provides AI with the actual inputs it needs to produce useful outputs: real materials (documents, data, constraints), appropriate framing (role, task, format), and sufficient specificity to make the output actionable rather than generic.

**Why it matters for team-level AI effectiveness**: The majority of AI output quality problems originate in the input, not in the model. A team that has developed strong prompting practices can extract consistently higher-quality work from the same AI tools compared to teams that treat prompting as a best-guess activity. This dimension separates teams that get "AI is hit or miss" from teams that get "we know exactly how to set this up."

---

### Dimension 3 — Workflow Design

**Dimension key**: `workflow-design`

**Full name**: Workflow Design and AI Integration

**What it measures**: Whether a practitioner uses AI inside deliberately designed processes — where AI steps are defined, sequenced, and connected to human steps — versus ad hoc, triggered by memory or convenience.

**Why it matters for team-level AI effectiveness**: Individual skill with prompting does not produce team-level value until it is embedded in shared workflows. Workflow Design is the dimension that converts individual AI competence into organizational capability. A team that designs workflows around AI can onboard new members onto those practices, measure their performance, and improve them. A team whose AI use is informal cannot do any of these things.

---

### Dimension 4 — Judgment and Verification

**Dimension key**: `judgment-verification`

**Full name**: Judgment, Verification, and Output Calibration

**What it measures**: Whether a practitioner has calibrated when to trust AI output, when to scrutinize it, and when to reject it — and whether they have a defined verification step for AI-assisted work before it enters production.

**Why it matters for team-level AI effectiveness**: AI output quality is not binary. Every AI-integrated workflow has a failure mode: outputs that are plausible but wrong, confident but outdated, coherent but off-brief. Dimension 4 is the difference between AI use that reduces error and AI use that introduces new classes of error that are harder to catch than the errors they replaced. For teams considering agent workflows, Dimension 4 is prerequisite: you cannot delegate a task to an agent if you cannot specify the verification criteria.

**Why this dimension is not captured by generic AI maturity frameworks**: Most organizational AI maturity models measure tool adoption and output volume. They do not measure whether practitioners have developed the judgment to know when AI is wrong. This is the dimension that distinguishes a team that is "good at AI" from a team that is systematically safer with AI.

---

### Dimension 5 — Delivery and Integration

**Dimension key**: `delivery-integration`

**Full name**: Delivery Integration and Artifact Completion

**What it measures**: Whether AI-generated work ends up in the artifacts people actually use — shipped code, sent communications, published content, finalized documents — rather than being discarded, heavily rewritten, or siloed as experiments that never reach production.

**Why it matters for team-level AI effectiveness**: A team can have excellent prompting practices and thoughtful verification steps but still fail to capture value if the AI-assisted work never completes into the final artifact. Dimension 5 measures the completion rate: how often does AI-assisted work result in work that ships? Low scores on this dimension often indicate a mismatch between what AI produces and what the workflow actually needs — a signal that Dimensions 2 and 3 need attention upstream.

---

### Dimension 6 — Governance and Systematization

**Dimension key**: `governance-systematization`

**Full name**: Governance, Systematization, and Auditability

**What it measures**: Whether a practitioner's AI methods are documented, reusable by others, and governed — including whether there is a clear position on what cannot be delegated to AI (sensitive data, regulated outputs, irreversible decisions), whether output accountability is defined, and whether tool use is approved and consistent.

**Why it matters for team-level AI effectiveness**: Governance and Systematization is the dimension that determines whether a team's AI practice is scalable, transferable, and defensible. Without it, a team's AI capability is locked in individual practitioners' heads and cannot survive headcount changes, client audits, or regulatory scrutiny. For growth-stage companies with enterprise or institutional clients, this dimension is the enterprise-readiness signal.

**Why Dimension 6 is a crosscutting concern**: Governance and Systematization cannot be bypassed by high performance in Dimensions 1–5. A team that is excellent at task recognition, prompting, workflow design, judgment, and delivery — but has no governance position on AI tool approval, no documentation of its methods, and no clear accountability for AI-generated outputs — is a systematization risk, not a mature AI practice. Under gate scoring (see Section 6), a low Dimension 6 score holds the team at its current level regardless of how strong the other five dimensions are.

This is the intentional design of the framework. Governance & Systematization appears at every level of the maturity model, with thresholds calibrated to the complexity of practice at that level. At Level 1, the threshold is low: basic awareness of what cannot go into AI. At Level 4, the threshold is high: methods must be documented, reusable, and auditable. At Level 5, auditability is the criterion: can the workflow be reviewed, modified, and re-run without the original practitioner present?

The natural bridge to agent workflows opens through Dimension 6. The question "can you describe this process precisely enough that someone else could run it the same way every time?" is both the highest Dimension 6 criterion and the first question in any agent delegation conversation. Teams that are stuck at Level 4 because of a low Dimension 6 score are not being penalized — they are being given a specific, actionable next move: systematize the methods you already have.

---

## 4. Agent-Ready Definition

### 4.1 What Agent-Ready Means

Agent-Ready (Level 5) is the frontier state of the AI Fluency Index. It is defined as: **workflows are sufficiently specified, structured, and verified that they can be delegated to supervised AI agents with defined escalation conditions and predictable outcomes.**

Agent-Ready is not a technology claim. It does not require that a team is already running AI agents. A team can be Agent-Ready without a single agent deployed. The designation means that the underlying human practice has reached the auditability and specification depth where agent delegation would be safe — and that the team knows which specific workflows are ready candidates.

The distinction matters because it changes what the next step actually is. For a Systematic (Level 4) team with high Dimension 6 scores, the conversation is not "how do you get better at prompting?" — it is "which of your already-mature workflows are ready to be candidates for supervised automation, and what would the design of that automation look like?" That is a different engagement with a different scope and different return on investment.

### 4.2 Auditability Criteria for Agent-Delegatable Workflows

A workflow is agent-delegatable under the AI Fluency Index when it satisfies all of the following:

**Input specification**: The inputs to the workflow are fully defined — format, source, completeness criteria. An agent can check whether it has received a valid input before beginning. Workflows where "you know a good input when you see it" but cannot specify what makes it good are not ready for agent delegation.

**Output specification**: The expected output format, structure, and quality criteria are defined. The verification step is defined and automatable or delegatable to a designated human reviewer. Workflows where quality is assessed impressionistically after the fact are not ready.

**Escalation conditions**: The conditions under which the agent should stop and escalate to a human are documented. These include but are not limited to: ambiguous inputs, outputs that fail verification, edge cases not covered by the specification, and sensitive-data triggers.

**Failure modes identified**: The known ways the workflow can go wrong are documented, including the AI error modes most likely to occur (confident incorrect outputs, plausible fabrications, format deviations) and the verification steps that catch them.

**Reproducibility**: The workflow produces consistent, acceptable outputs across multiple runs with the same inputs, regardless of which operator runs it. If outputs vary significantly across operators, the workflow is not yet Agent-Ready.

**Accountability assignment**: It is clear who is responsible for reviewing agent outputs, approving exceptions, and maintaining the workflow specification. Accountability cannot be inherited by the agent itself.

### 4.3 What Agent-Ready is Not

Agent-Ready is not:

- **Already using agents**: A team can score Agent-Ready on a workflow they run manually with AI assistance, if that workflow is fully specified and auditable. The designation is about specification maturity, not deployment state.
- **Fully automated**: Agent-Ready workflows are supervised. There is always a human accountability layer — for reviewing outputs, approving edge cases, and maintaining the specification. Unsupervised automation is out of scope for the AI Fluency Index.
- **Universal**: A team can be Agent-Ready on one workflow and Practicing on another. The level assigned by the framework reflects the team's overall distribution, not the best workflow they have ever designed.
- **A permanent certification**: A workflow that is Agent-Ready today can become non-Agent-Ready if the underlying process changes, the AI tool changes, or the human accountability layer degrades. Agent-Readiness is a maintained state, not a one-time achievement.

---

## 5. Distinction from Generic AI Maturity Frameworks

### 5.1 What Generic Frameworks Measure

The dominant AI maturity frameworks from major consultancies (McKinsey AI Index, IBM AI Ladder, Gartner AI Maturity Model) share a common orientation: they assess an organization's readiness to adopt and scale AI at an enterprise level. Their primary variables are organizational infrastructure (AI governance bodies, technology investments, data platforms), talent strategy (AI hiring, reskilling programs, center of excellence), and technology adoption (model usage, API integration, MLOps maturity).

These frameworks are designed for large organizations evaluating whether they have the infrastructure to support AI-driven business transformation. They are useful for board-level strategy reviews, investor due diligence, and enterprise transformation programs. They are not designed for the question that growth-stage founders and CTOs face: "Are my team's AI practices actually working, and where do they break down?"

### 5.2 What Makes the AI Fluency Index Different

**Practitioner fluency, not infrastructure readiness**: The AI Fluency Index assesses how effectively the humans who use AI tools have developed their practice. Infrastructure is not in scope. A team running commodity AI tools with disciplined, verifiable practices will outscore a team with a full AI platform and undisciplined use.

**Growth-stage lens, not enterprise compliance lens**: Generic frameworks are calibrated to large-organization concerns: procurement policy, legal liability at scale, board reporting, and technology governance. The AI Fluency Index is calibrated to the operational reality of growth-stage companies: small teams making high-leverage decisions, AI tools used by individuals in their daily work, and the specific inflection point between "we're experimenting with AI" and "AI is part of how we work."

**Judgment as a first-class dimension**: Dimension 4 (Judgment and Verification) has no equivalent in generic AI maturity frameworks, which typically measure output volume, tool adoption, or process compliance. The AI Fluency Index treats practitioner judgment — knowing when to trust, when to verify, and when to reject AI output — as a core competency, not an afterthought. This is a direct consequence of the growth-stage lens: in small teams, one AI error that goes undetected can be materially damaging.

**Governance as a crosscutting concern, not a compliance checklist**: Generic frameworks treat AI governance as a maturity dimension for large organizations — policy committees, legal review processes, audit trails for regulated outputs. The AI Fluency Index treats Governance and Systematization as the systematization backbone of good AI practice at any scale: can your methods be understood, reproduced, and reviewed by someone who was not in the room when they were created? This is not compliance — it is operational durability.

**The agent frontier is named and specified**: The AI Fluency Index defines Level 5 (Agent-Ready) with concrete auditability criteria that determine when a workflow is genuinely ready for supervised automation. Generic frameworks acknowledge "AI agents" as a trend but do not provide a practitioner-level definition of what readiness for agent deployment actually means. The AI Fluency Index is designed so that Level 5 is the natural discovery point for the agent strategy conversation — not a vague aspiration, but a specified state with measurable criteria.

**Individual-first, team-second**: Most organizational AI maturity frameworks aggregate top-down (surveying policy and infrastructure). The AI Fluency Index starts with individual practitioners and their actual daily workflows, then composes to the team level. This means the framework can surface specific, actionable findings at the dimension level ("your team's workflow design is at Level 2 even though three individuals are at Level 4") rather than producing a single organizational score that no one knows how to act on.

---

## 6. Gate Scoring Introduction

### 6.1 The Scoring Principle

The AI Fluency Index uses **strict gate scoring**, not averaging.

**Level assignment rule**: A respondent's overall maturity level is the highest level at which all six dimension scores meet or exceed the threshold for that level. If any one dimension falls below the threshold, the respondent is held at the level below, regardless of how strong the remaining five dimensions are.

This means: a respondent who scores strongly on five dimensions but below threshold on one dimension does not receive partial credit for the strong dimensions. Their overall level reflects where their practice as a whole can reliably perform — not where their best dimensions perform.

### 6.2 Why Gate Scoring, Not Averaging

Averaging produces a score that is easy to game and hard to act on. A respondent who knows they have weak governance practices can answer Task Recognition and Workflow Design questions honestly, know that the governance questions will drag down their average, and still receive a moderate overall score that provides no specific diagnostic signal.

Gate scoring produces a score that is honest and actionable. The level reflects the practice threshold the respondent has actually cleared — not a blend of strengths and weaknesses. And because the level is held by the lowest-scoring dimension, the report can name exactly what is holding the respondent back.

### 6.3 The Binding Constraint

Under gate scoring, the specific dimension responsible for a level assignment is called the **binding constraint**. If a respondent scores at Level 4 on five dimensions and Level 2 on Governance and Systematization, the binding constraint is Governance and Systematization. The respondent is scored at Level 2 overall.

The binding constraint is surfaced explicitly in the assessment report:

- In the dimension scorecard, the binding constraint dimension is labeled **"Fix first"**
- In the radar chart, the binding constraint axis is highlighted in a distinct accent color
- In the next-level transition roadmap, the binding constraint dimension receives the primary attention — not a generic "here are five things to improve" list

### 6.4 Why This Matters for Actionability

The practical consequence of gate scoring is that every report produces one specific, named problem. Not a vague average to improve. Not a list of twelve recommendations. One dimension, with a specific threshold gap, and a targeted set of moves to close it.

For a Level 3 respondent held at Level 3 by a weak Dimension 6 score, the report does not say "you scored 3.2 out of 5 on average." It says: "Your practice is at Level 3. Governance and Systematization is your binding constraint for Level 4. Here is what Level 4 Governance and Systematization looks like, and here are two specific moves to get there."

This is more demanding than averaging — respondents can score lower than they expect — and more useful. The precision is the point.

### 6.5 Dimension Threshold Matrix

The full 5×6 dimension-threshold matrix (specifying numeric threshold values and band labels for each dimension at each level) is a separate Phase 2 deliverable documented in the scoring specification. The threshold matrix drives the scoring engine, the report renderer, and the next-level roadmap content.

Band labels used across all dimensions and levels: **STRONG** / **FUNCTIONAL** / **DEVELOPING** / **NOT YET**

The binding constraint identification logic — which failing dimension is selected as the primary gate when multiple dimensions fall below threshold — is documented in the scoring specification alongside the threshold matrix.

---

## 7. Two-Label Naming Convention

### 7.1 Framework Name vs. Product Names

The AI Fluency Index is the same underlying methodology regardless of the label under which it is encountered. Three labels are in use, each serving a different context:

**Adaptive Alchemy AI Fluency Index** (shorthand: AI Fluency Index)
- Used in: methodology documentation, report attribution, structured data schema (`name` field in Service and FAQPage JSON-LD), academic or thought-leadership contexts, and any content where the framework is being described as original Adaptive Alchemy methodology
- This is the canonical proper noun. When the framework is being discussed as a methodology — what it measures, how it works, who developed it — this is the name to use
- Approved shorthand: "AI Fluency Index" is acceptable after the first full mention in any document or report

**AI Readiness Assessment**
- Used in: service page H1, URL slug (`/services/ai-readiness-assessment`), meta title, booking CTAs, paid engagement scoping conversations, and all discoverability contexts
- This is the commercial product label for the paid engagement. It is calibrated for search intent: buyers searching for "AI readiness assessment" are looking for what this engagement delivers
- The "AI Readiness Assessment" label does not appear in methodology-first contexts — it is a product name, not a framework name

**AI Readiness Check**
- Used in: the free tool page H1, URL slug (`/check`), meta title, and CTAs referring to the free tool
- This is the product label for the free self-serve tool. It is distinct from "AI Readiness Assessment" to protect the premium positioning of the paid engagement: completing a 7-minute check and receiving a 2–3 week diagnostic sprint are different products
- The free tool and the paid assessment use the same underlying AI Fluency Index scoring methodology; the distinction is scope and depth, not framework

### 7.2 Label Selection Rules

| Context | Label to use |
|---|---|
| Page H1 for paid service page | AI Readiness Assessment |
| Page H1 for free tool page | AI Readiness Check |
| Report footer methodology credit | Adaptive Alchemy AI Fluency Index |
| Report level display (section 1) | Level N — [Level Name] (e.g., "Level 3 — Practicing") |
| Schema.org `name` field | Adaptive Alchemy AI Fluency Index |
| HubSpot contact properties | `ai_fluency_level` (not the full brand name) |
| Body copy describing how the methodology works | Adaptive Alchemy AI Fluency Index / AI Fluency Index |
| Social and outreach copy mentioning the free tool | AI Readiness Check |
| Social and outreach copy mentioning the paid sprint | AI Readiness Assessment |

### 7.3 What Is Not Permitted

- Using "AI Readiness Assessment" and "AI Fluency Index" interchangeably in any single document — they refer to different things (product vs. methodology)
- Using a generic label ("maturity model," "AI assessment," "readiness framework") without proper-noun attribution in contexts where the methodology is being described as Adaptive Alchemy's proprietary work
- Referencing any third-party AI assessment tool or framework in external-facing content, reports, or structured data

---

## Appendix A: Cross-Reference to BDD Scenarios

The following BDD scenarios from `charter-I02-AIASSESS-scenarios.md` are satisfiable from this document:

**S11** (5×6 dimension-threshold matrix): This document names and defines all 5 levels (Level 1 Curious, Level 2 Emerging, Level 3 Practicing, Level 4 Systematic, Level 5 Agent-Ready) and all 6 dimensions (task-recognition, context-prompting, workflow-design, judgment-verification, delivery-integration, governance-systematization) with the framework structure required for a matrix to be populated. The threshold values themselves are a separate scoring specification deliverable (see Section 6.5). Note: S11's scenario tests the matrix document specifically — this spec document is the framework foundation from which the matrix is derived.

**S13** (Brand usage spec coverage): Section 7 of this document specifies: (a) canonical framework name "Adaptive Alchemy AI Fluency Index" and shorthand "AI Fluency Index"; (b) HubSpot contact property naming convention (`ai_fluency_level`); (c) report level-label format ("Level N — [Level Name]", e.g., "Level 3 — Practicing"); (d) Schema.org `name` field value ("Adaptive Alchemy AI Fluency Index"). No AdviceForge references appear in this document.

---

## Appendix B: Framework Version History

| Version | Date | Status | Notes |
|---|---|---|---|
| v1 | 2026-05-15 | draft | Initial specification. Covers all 5 levels, all 6 dimensions, gate scoring model, Agent-Ready definition, and two-label naming convention. |
