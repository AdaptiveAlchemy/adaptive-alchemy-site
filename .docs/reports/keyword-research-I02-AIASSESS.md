---
report_type: keyword-research
initiative: I02-AIASSESS
agent: gemini (T2 dispatch via dispatch-external.sh)
date: 2026-05-15
task: adaptive-alchemy-site-dj5
status: complete
---

# Keyword Research Report — I02-AIASSESS

**Produced by:** Gemini T2 dispatch  
**Target:** AI Readiness Assessment service + free AI Readiness Check tool  
**Audience:** Founders and CTOs at growth-stage companies (20-500 employees)

---

## 1. Keyword Cluster Analysis

Boutique firms must compete on **specificity** and **problem-relevance** rather than volume. The giants (Gartner, Microsoft) own the "What is" queries; Adaptive Alchemy should own the "Why isn't this working for us" queries.

| Cluster | Search Intent | Competition | Boutique Opportunity |
| :--- | :--- | :--- | :--- |
| **Head Term:** *AI readiness assessment*, *AI maturity model* | Commercial Investigation: Users looking for a formal framework or consultant. | Very High: Dominated by Big Four & Cloud Providers. | Low: Do not expect to rank for the bare term. Use it for on-page SEO to signal relevance. |
| **Practitioner Pain:** *why are my team AI results inconsistent*, *AI pilot worked in demo not production* | Problem Solving: CTOs frustrated by hallucination-heavy or unscalable prototypes. | Low: Big firms rarely write about specific, messy implementation failures. | **High:** These queries represent high-pain moments. Content builds immediate technical credibility. |
| **CTO/Founder Intent:** *how do I know if my team is ready for AI agents*, *assess AI readiness startup* | Strategic Planning: Decision-makers looking for a lean, growth-oriented approach. | Medium: Giants still focused on Enterprise AI (1000+ seats). | **High:** Focusing on AI Agents + Startups/Growth-stage carves out a niche the big players ignore. |
| **Self-Locate / Tool:** *free AI readiness check*, *AI readiness quiz*, *measure AI maturity online* | Transactional (Low Friction): Users wanting a quick benchmark before talking to a human. | Medium/High: Many checklists exist, but few are interactive tools. | **Medium:** A well-designed tool with a clear URL can capture Check traffic from users overwhelmed by Assessments. |
| **Level Cluster:** *move from AI experimenting to systematic*, *AI adoption stages for teams* | Educational: Leaders trying to map current state to a future roadmap. | Medium: Mostly covered by generic digital transformation blogs. | **Medium:** Mapping levels to specific growth-stage milestones (Series B → Series C) adds unique value. |
| **Process/Governance:** *AI governance readiness*, *enterprise AI controls checklist* | Compliance/Risk: CTOs worried about shadow AI or data privacy. | High: High legal and consultancy saturation. | Low: Hard to compete unless angle is Pragmatic Governance for Fast Teams. |

---

## 2. URL Slug Recommendation

### Paid Service Page
**Gemini recommendation:** `/services/ai-readiness-assessment`
**ADR I02-006 decision:** `/services/ai-readiness-assessment` ✓ **Confirmed**

Rationale: Standard commercial term in the services sub-folder. Strongest semantic signal that this is the definitive commercial offering.

### Free Tool Page
**Gemini recommendation:** `/ai-readiness-check` (keyword-rich, specific)  
**ADR I02-006 decision:** `/check` (short, memorable, separate namespace)

**ADR I02-006 position maintained.** Rationale for keeping `/check`:
- Modern SEO: page H1, title tag, and content carry more weight than URL slug alone
- Short, memorable URLs reinforce brand clarity ("Take the Check at adaptivealchemy.com/check")
- `/ai-readiness-check` is redundant with the H1 which will contain that exact phrase
- Founder decision (ADR I02-006 status: accepted)

**Note:** If Gemini's concern about URL keyword density proves meaningful at launch (trackable via Search Console), amending to `/ai-readiness-check` is low-risk migration — one slug change + redirect.

---

## 3. H1 and Meta Title Recommendations

### Paid Service Page (`/services/ai-readiness-assessment`)

| Element | Recommendation |
|---|---|
| **H1** | `AI Readiness Assessment for Growth-Stage Teams` |
| **Meta Title** | `AI Readiness Assessment: Move Beyond Inconsistent Results \| Adaptive Alchemy` |

Strategy: Includes head term but qualifies with "Growth-Stage Teams" and "Inconsistent Results" pain point to attract the right CTO profile.

### Free Tool Page (`/check`)

| Element | Recommendation |
|---|---|
| **H1** | `Free AI Readiness Check: Benchmark Your Team in 5 Minutes` |
| **Meta Title** | `AI Readiness Check \| Free Interactive Maturity Benchmarking Tool` |

Strategy: "Free," "Interactive," and "5 Minutes" maximize CTR for users seeking a low-friction entry point.

---

## 4. Content Opportunities (Next 90 Days)

Low-competition, high-intent content pieces to publish to build authority:

1. **The "Demo to Production" Gap**
   - *Title:* "Why Your AI Pilot Worked in the Demo but Failed in Production: A Readiness Audit"
   - *Target query:* `AI pilot vs production results inconsistent`

2. **Infrastructure for Agents**
   - *Title:* "Are You Ready for AI Agents? 5 Infrastructure Prerequisites for Growth-Stage CTOs"
   - *Target query:* `how to prepare company for AI agents`

3. **The Middle-Market Roadmap**
   - *Title:* "AI Adoption Stages for Teams of 50–200: Moving Beyond Chatbots"
   - *Target query:* `AI maturity levels for mid-market`

4. **Hiring vs. Automating**
   - *Title:* "AI Fluency vs. AI Engineering: How to Assess Your Current Team's Technical Readiness"
   - *Target query:* `assess team AI fluency`

---

## ADR Status After Research

| ADR | Recommendation | Action |
|---|---|---|
| I02-006 (`/check` slug) | Confirmed. Gemini recommended `/ai-readiness-check` but ADR maintained per founder decision. Note for post-launch GSC review. | No change |
| I02-007 (dual-label strategy) | Confirmed. "AI Readiness Assessment" for service, "AI Readiness Check" for tool — Gemini's H1/meta recommendations align exactly. | No change |

---

## Summary for P1-A-2 Decision

- **Service page slug:** `/services/ai-readiness-assessment` ✓ confirmed
- **Free tool slug:** `/check` ✓ confirmed (ADR I02-006 maintained)
- **Service page H1:** `AI Readiness Assessment for Growth-Stage Teams`
- **Free tool H1:** `Free AI Readiness Check: Benchmark Your Team in 5 Minutes`
- **ADRs I02-006 and I02-007:** No amendments required
