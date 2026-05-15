---
type: transition-roadmaps
initiative: I02-AIASSESS
version: v1
date: 2026-05-15
status: draft
bdd: [S16]
---

# AI Fluency Index — Level Transition Roadmaps

## Purpose

This document defines the five transition roadmaps used in AI Fluency Index assessment reports. Each roadmap corresponds to one level transition in the maturity model.

**Report rendering rule:** A respondent sees only the roadmap for their next level — not the full five-level path. A Level 2 respondent sees only the Level 2→3 roadmap. A Level 4 respondent sees only the Level 4→5 roadmap. The report never displays more than one roadmap at a time.

Within each roadmap, the **binding constraint move** is rendered with primary emphasis — it directly addresses the dimension holding the respondent at their current level and is labeled separately so the report can highlight it distinctly from the supporting moves.

---

## Roadmap 1: Level 1 → Level 2 (Curious → Emerging)

### What this transition unlocks

You will have at least 2–3 specific recurring tasks where you use AI by default, making your AI use predictable and repeatable rather than occasional. The question "where would I even start?" becomes answerable — and answered.

### Moves

**Move 1 — Task inventory** *(30 minutes)*

List every recurring task you do more than twice a week. For each one, ask: does it have clear enough inputs and outputs that I could hand it to AI and know whether the result is useful? Mark the tasks that qualify. This produces a concrete shortlist rather than a vague intention to "use AI more."

*Observable when complete:* A written list with at least 5 recurring tasks assessed and 2–3 marked as AI-suitable candidates.

---

**Move 2 — Three-run experiment** *(1 week, ~30 minutes per run)*

Pick the 2 highest-potential tasks from your list. Run each with AI three times this week using whatever prompt approach comes naturally. After each run, write one sentence: what worked, what did not. Six runs total. Six sentences.

*Observable when complete:* Six short notes, one per run, capturing what worked and what did not across both task types.

---

**Move 3 — Save what worked** *(binding constraint move — 15 minutes)*

After the three-run experiment, identify the single best prompt for each task. Save it as a named text file, Notion page, or equivalent. Name the file something you will find again (e.g., `prompt-weekly-status-update.txt`). This is the seed of your prompt library and the act that distinguishes Emerging from Curious.

*Observable when complete:* Two saved, named prompt files — one per task type — that you can locate and reuse next week without starting from scratch.

*Why this is the binding constraint move:* The primary bottleneck at Level 1 is task recognition — the absence of a mental model for which tasks are AI-suitable. The task inventory move builds that model. Saving what worked makes it durable. Without this step, the experiment produces nothing reusable and the next session starts over from zero.

---

## Roadmap 2: Level 2 → Level 3 (Emerging → Practicing)

### What this transition unlocks

The same task done twice will produce similar quality. You will have saved prompts or templates for your most important AI use cases, and a rough sense of which task types AI handles well for you versus which require heavy editing. AI use becomes intentional rather than accidental.

### Moves

**Move 1 — Prompt recovery** *(1–2 hours)*

Open your last 5–10 AI conversations. Find the prompts that produced the best results — the ones where you used the output with minimal editing. Copy those prompts into a single reference document (a Notion page, a Google Doc, or a plain text file). Label each one with the task type it serves.

*Observable when complete:* A single document with at least 5 saved prompts, each labeled by task type, accessible without opening a chat history.

---

**Move 2 — Write one reusable template** *(1–2 hours)*

For your most AI-assisted task type, write a prompt template with placeholder fields for the information you always need to provide. The template should have: a role or context line, a task description, and clearly marked slots where you fill in the variable inputs (e.g., `[TOPIC]`, `[AUDIENCE]`, `[CONSTRAINTS]`). A template with three fill-in slots is sufficient.

*Observable when complete:* One written template for your highest-frequency task type, with named variable slots, that you could hand to a colleague and they could use it for the same task type.

---

**Move 3 — Five-run calibration** *(binding constraint move — 1 week)*

Run your template on five real work examples over the course of a week. After each run, mark whether the output was: usable as-is, needed light editing, or needed heavy revision. After five runs, you should be able to predict before you see the output which category it will fall into — based on the quality of the inputs you provided. If you cannot predict, refine the template and run five more times.

*Observable when complete:* Five documented runs with quality ratings, and a one-sentence statement of what input condition predicts a usable output versus a heavily revised one.

*Why this is the binding constraint move:* The primary bottleneck at Level 2 is context and prompting consistency — each session starts from scratch with variable inputs producing variable outputs. The five-run calibration converts a one-off prompt into a calibrated template with a predictable quality band. This is the specific act that makes AI use reliable rather than "hit or miss."

---

## Roadmap 3: Level 3 → Level 4 (Practicing → Systematic)

### What this transition unlocks

AI-assisted tasks can be handed off, measured, and improved. New team members can ramp onto the same workflows by reading documentation rather than by watching you do it. AI use moves from personal habit to organizational capability.

### Moves

**Move 1 — Draw the full step sequence** *(2 hours)*

Choose your highest-volume AI task. Map the complete workflow: what goes in, what the AI step does, what the human verification step checks, what the output looks like. Write out the verification criterion explicitly — "good output" means what, specifically? This is the move that turns a personal habit into a describable process.

*Observable when complete:* A written step-by-step description of one AI-integrated task, including the input format, the AI step, the named verification criterion, and the output format.

---

**Move 2 — Write the handoff document** *(binding constraint move — 2–4 hours)*

Document the workflow in a format someone else could follow without your help: what inputs are required and where they come from, which prompt template to use (include it in full), what "good output" looks like (use an example), what the edit step involves, and what to do if the output is not usable. This is not a summary — it is operational documentation.

*Observable when complete:* A written workflow document that a colleague who has never run this task with AI could follow and produce an acceptable output on the first attempt.

*Why this is the binding constraint move:* The primary bottleneck at Level 3 is workflow design — AI use sits alongside workflows rather than inside them. Writing a handoff document is the act that forces the workflow to be explicit, sequenced, and transferable. Until it is written down, it cannot be tested, measured, or improved by anyone other than you.

---

**Move 3 — Colleague handoff test** *(1 week)*

Have a colleague run the workflow using only your documentation — no coaching from you. Debrief afterward: what step was unclear, what did they do differently, what broke. Revise the documentation based on the debrief. Repeat until they can run it successfully without questions.

*Observable when complete:* One completed colleague handoff run, a list of gaps they encountered, and a revised documentation version that addresses those gaps.

---

## Roadmap 4: Level 4 → Level 5 (Systematic → Agent-Ready)

### What this transition unlocks

Specific workflows can be delegated to supervised AI agents with defined escalation conditions and predictable outcomes. The team can operate at a level of AI leverage that compounds over time — not because individuals are working harder, but because the workflows are sufficiently specified to run without per-instance supervision.

### Moves

**Move 1 — Write a full workflow specification** *(binding constraint move — 4–8 hours)*

Pick one workflow you currently run reliably and consistently. Write its complete specification: input format and source, output format and quality criteria, verification criteria (the concrete test that confirms a good output), escalation conditions (the specific situations where a human must intervene), and known failure modes (the ways this workflow goes wrong and what catches them). This is distinct from operational documentation — it is specification-depth writing, where ambiguity is a defect.

*Observable when complete:* A workflow specification that answers all six questions without ambiguity: What goes in? What format? What comes out? How do you verify it? When do you escalate? How does it fail?

*Why this is the binding constraint move:* The primary bottleneck at Level 4 is governance and systematization — methods are systematic but not specified precisely enough for supervised automation. A full specification is the concrete act that closes this gap. It is also the first deliverable in any agent delegation conversation: without it, there is nothing to hand to an agent.

---

**Move 2 — Add a governance position to shared documentation** *(2–3 hours)*

Write and publish a brief governance position to your shared team documentation. It should cover: which workflows are currently AI-delegatable (with a link to their specifications), which workflows require human judgment at each step and why, and who is accountable for reviewing AI outputs on each delegatable workflow. A one-page document is sufficient.

*Observable when complete:* A published governance document that any team member can read to understand which AI-assisted workflows can be run independently and which require oversight.

---

**Move 3 — Reproducibility test** *(1 week)*

Have two different team members run the same workflow specification independently — using only the written specification, not coaching from you — and compare their outputs side by side. If the outputs are materially inconsistent, the specification has ambiguity. Identify the source of variation and revise the specification until two independent runs produce outputs that are consistent in structure, quality, and adherence to the output criteria.

*Observable when complete:* Two independently produced outputs from the same specification, a written comparison of where they differed, and a revised specification version that closes the ambiguity.

---

## Level 5 — Agent-Ready: Frontier State

### No next level

A Level 5 respondent has reached the frontier of the AI Fluency Index. There is no next transition roadmap.

### What opens at Level 5

The question shifts from "how do I improve my AI practice?" to "which specific workflows should we consider for supervised automation, and is our practice clean enough to get there?" The work at Level 5 is not self-improvement — it is design work: agent opportunity mapping, architecture design, and governance design for supervised automation.

### What the report shows

A Level 5 respondent sees the Track C CTA in place of a transition roadmap. The CTA surfaces the natural next conversation: identifying which of their already-specified workflows are strong candidates for supervised agent delegation, and what the design and governance of that automation would look like. This is Adaptive Alchemy's core engagement territory.

There is no "Fix first" label in the dimension scorecard for a Level 5 respondent. All six dimensions are at STRONG. The binding constraint field is null.

---

## Cross-Reference

| Reference | Location |
|---|---|
| Framework spec (levels, dimensions, gate scoring) | `.docs/canonical/assessments/ai-fluency-index-v1-spec.md` |
| 5×6 threshold matrix and binding constraint logic | `.docs/canonical/assessments/maturity-model-5x6-matrix.md` |
| BDD scenario S16 (transition roadmap gate condition 2) | `.docs/canonical/charters/charter-I02-AIASSESS-scenarios.md` |
| Track C trigger (Dimension 6 ≥70) | `.docs/canonical/assessments/maturity-model-5x6-matrix.md`, Section 4.2 |
