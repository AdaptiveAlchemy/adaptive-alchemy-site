---
type: gdpr-spec
initiative: I02-AIASSESS
version: v1
date: 2026-05-15
status: draft
constraints: [C-15, C-17, C-19, C-24]
---

# GDPR Retention & Erasure Spec — I02-AIASSESS

## 1. Overview

### Jurisdiction

This specification applies to all EU/EEA residents who complete the AI Readiness Assessment. Processing is subject to the General Data Protection Regulation (EU) 2016/679.

### Lawful Basis

The lawful basis for processing personal data collected through the assessment is **consent under Art. 6(1)(a) GDPR**. Legitimate interest is explicitly excluded as the lawful basis.

Consent is recorded via HubSpot's `legalConsentOptions` field at the point of form submission (the consent gate, see Section 3). No personal data is processed for report delivery until a valid consent record is confirmed in HubSpot. Consent is freely given, specific, informed, and unambiguous — the respondent chooses to exchange their contact details for the assessment report.

### Controller

Adaptive Alchemy [full legal entity name and address TBD before production launch]. Referred to as "the Controller" throughout this document.

---

## 2. HubSpot Contact Properties

The following contact properties are created or updated in HubSpot when a respondent submits the consent gate form. All properties are scoped to the HubSpot contact record identified by `email`.

| Property | HubSpot Field Name | Purpose | Retention Period | Legal Basis |
|---|---|---|---|---|
| Email address | `email` | Primary identifier; used to deliver the report link and for future communications if opted in | 24 months from last activity | Consent — Art. 6(1)(a) |
| AI fluency level | `ai_fluency_level` | Numeric maturity score (1–5) derived from assessment responses | 24 months from last activity | Consent — Art. 6(1)(a) |
| AI fluency track | `ai_fluency_track` | Track assignment (A, B, or C) derived from maturity level | 24 months from last activity | Consent — Art. 6(1)(a) |
| Binding constraint | `ai_fluency_binding_constraint` | Key identifying the lowest-scoring dimension; used to personalise report recommendations | 24 months from last activity | Consent — Art. 6(1)(a) |
| Company email domain | `company_email_domain` | Derived from `email`; used for enterprise vs. SMB segmentation in aggregate benchmarks | 24 months from last activity | Consent — Art. 6(1)(a) |

**Retention trigger:** "Last activity" is defined as the most recent HubSpot contact activity (email open, form submission, or page view attributed to the contact). If no activity is recorded within 24 months from the initial submission date, the contact record is eligible for deletion.

**No other properties** are written to HubSpot as part of the assessment flow. Raw question responses are not stored in HubSpot contact records.

### Retention Enforcement (Open Action — B06 Wave)

A HubSpot retention enforcement mechanism — either the native GDPR auto-delete feature or a scheduled cleanup workflow — must be configured before production launch. This step is deferred to the B06 wave (Phase 6) and is a launch blocker.

> **Open action (B06):** Configure HubSpot GDPR data retention automation so that contact records inactive for 24 months are automatically deleted or flagged for deletion review. Verify the configuration end-to-end in staging before the production cutover.

---

## 3. Consent Gate Flow (C-15)

The consent gate is the point at which a respondent provides their email address and explicit consent before the assessment report is unlocked.

### Flow

```
Respondent completes final assessment question
        |
        v
Consent gate UI displayed
  - Email input field
  - Consent checkbox: "I agree to receive my report and to Adaptive Alchemy processing
    my contact details in accordance with the Privacy Policy [link]."
  - Submit button
        |
        v
Frontend calls POST /api/assessment/submit
  - Payload: { sessionId, email, answers (already scored client-side), consentGiven: true }
        |
        v
API calls submitToHubSpot({ email, properties, legalConsentOptions })
        |
      / \
   2xx   non-2xx / timeout / network error
    |              |
    v              v
Report unlock   NO unlock — gate remains closed
initiated       Error returned to frontend
                Respondent shown retry prompt
                Report link NOT issued
```

### Strict gate rule (C-15)

**If the HubSpot form submission returns any non-2xx status, or fails to complete (timeout, network error, exception), the report is NOT unlocked.** There is no partial unlock. The consent record must be confirmed in HubSpot before the report delivery mechanism proceeds.

This constraint is absolute. It must not be relaxed for performance, UX, or retry reasons without a documented change to this spec and a corresponding Beads decision record.

### HubSpot `legalConsentOptions` payload

The `submitToHubSpot` call must include a `legalConsentOptions` block conforming to the HubSpot GDPR consent API:

```json
{
  "legalConsentOptions": {
    "consent": {
      "consentToProcess": true,
      "text": "I agree to receive my report and to Adaptive Alchemy processing my contact details in accordance with the Privacy Policy.",
      "communications": [
        {
          "value": true,
          "subscriptionTypeId": <HubSpot subscription type ID — TBD>,
          "text": "I agree to receive the AI Readiness Assessment report."
        }
      ]
    }
  }
}
```

The `subscriptionTypeId` must be configured in HubSpot before the B03-4 implementation step (see Section 6).

### Stub removal requirement (C-24)

During Phase 3 development, `submitToHubSpot` returns a stub response `{ ok: true }` without making a real HubSpot API call. The stub must be replaced with the live implementation before any production traffic is served. Stub removal is tracked as B06-2.

---

## 4. Erasure Request Process (Art. 17)

Respondents have the right to request erasure of their personal data under GDPR Art. 17 (right to be forgotten).

### How to Submit a Request

Respondents submit an erasure request by contacting the Controller at:

> **[Data subject request contact — TBD before production launch]**
> Example placeholder: `privacy@adaptive-alchemy.com`

The request must include the email address used during the assessment so the contact record can be identified.

### Process

| Step | Owner | Deadline |
|---|---|---|
| Receive erasure request | Controller | Day 0 |
| Verify identity of requester (email confirmation or equivalent) | Controller | Day 0–2 |
| Locate HubSpot contact record by email | Controller | Day 2–5 |
| Delete contact record using HubSpot GDPR contact deletion feature (or manual contact deletion if GDPR feature is not enabled) | Controller | Within 30 days of request |
| Confirm deletion to requester | Controller | Within 30 days of request |
| Log the request and outcome in the erasure request log | Controller | Within 30 days of request |

### HubSpot GDPR Contact Deletion

The preferred deletion method is HubSpot's built-in GDPR contact deletion, which permanently removes the contact record and suppresses the email address from future imports. If this feature is not yet configured, a manual contact deletion in HubSpot is acceptable as an interim measure, provided the email is also added to the suppression list.

### Scope of Erasure

Erasure of the HubSpot contact record removes:
- Email address
- AI fluency level, track, and binding constraint
- Company email domain
- All HubSpot activity history for that contact

Erasure does **not** affect:
- Anonymized aggregate benchmark statistics (see Section 5) — these contain no PII and cannot be used to re-identify the respondent
- Report delivery logs that do not contain PII beyond a truncated or hashed identifier (implementation detail to be confirmed in B06)

### Exemptions

Art. 17(3) exemptions (legal obligation, public interest, legal claims) are not anticipated to apply to this use case. Erasure requests should be fulfilled without invoking exemptions unless legal counsel advises otherwise.

---

## 5. Benchmark N-Count Preservation (C-19)

The assessment may display benchmark cards — contextual statistics such as "teams at your maturity level typically score X on dimension Y." These are subject to the following constraints.

### Constraint C-19 — Anonymized Aggregates Only

- Benchmark statistics are derived from **anonymized aggregate data only**. No individual respondent's PII is stored in or derivable from benchmark card content.
- Individual assessment responses are not stored in a form that could be used to re-identify a respondent.
- Benchmark card data is stored separately from HubSpot contact records. The two data stores are not joinable in a way that could reconstruct individual-level data.

### N-Count Threshold

Benchmark cards must not be displayed until a minimum n-count threshold is reached for the relevant cohort (e.g., same maturity level and/or track). The minimum threshold is **[n = TBD — set before benchmark feature is activated]**. This prevents statistical re-identification of respondents in small cohorts.

Until the threshold is reached, benchmark cards display a placeholder: "Benchmark data available once more teams have completed the assessment."

### Aggregate Statistic Storage

Aggregate statistics (means, medians, distributions by level/track/dimension) are stored in a separate data store — not in HubSpot. The schema for this store must be reviewed against PII re-identification risk before the benchmark feature is activated. No schema field in the aggregate store may contain email, name, or any other direct identifier.

### Erasure and Benchmarks

An Art. 17 erasure request for a contact does not require retroactive recomputation of published aggregate statistics, provided:
1. The individual's data was aggregated with at least [n-count threshold] other respondents before being included.
2. The aggregate statistics do not expose the individual's data at a level of precision that enables re-identification.

If either condition is not met, the aggregate must be recomputed or withheld.

---

## 6. Implementation Checklist (C-24 Items)

The following checklist tracks GDPR tooling prerequisites before production launch. Items are ordered by implementation wave.

### B03 Wave (Phase 3 — current)

- [ ] **B03-4 prerequisite:** Verify HubSpot GDPR tools toggle is enabled in the HubSpot portal before implementing the live `submitToHubSpot` call. Do not proceed with B03-4 if the toggle is off.
- [ ] Confirm HubSpot subscription type ID for the assessment consent communication is created and recorded.
- [ ] Confirm HubSpot portal ID and private app token are stored in environment secrets (not hardcoded).

### B06 Wave (Phase 6 — pre-launch)

- [ ] **B06-2:** Remove `submitToHubSpot` stub. Replace with live HubSpot Forms v3 API call including `legalConsentOptions`. Verify end-to-end in staging: form submission → HubSpot contact created → `ai_fluency_*` properties populated → consent recorded.
- [ ] Configure HubSpot GDPR auto-delete or cleanup workflow to enforce the 24-month retention period. Verify automation triggers correctly.
- [ ] Confirm HubSpot GDPR contact deletion feature is enabled and accessible to the Controller.
- [ ] Establish and publish the data subject request contact address (e.g., `privacy@adaptive-alchemy.com`).
- [ ] Draft and publish the Privacy Policy page linked from the consent gate checkbox. Policy must reference: lawful basis (consent), data collected, retention period, erasure process, and controller contact.
- [ ] Conduct a pre-launch review of the aggregate benchmark data store schema against PII re-identification risk (if benchmark feature is active at launch).
- [ ] Set and document the n-count threshold for benchmark card display.
- [ ] Log the first erasure request test (simulated) through the end-to-end process and confirm HubSpot deletion succeeds.

---

## Acceptance Criteria

This spec satisfies the C-17 acceptance requirement when all of the following are documented (check against the body above):

- [x] All HubSpot contact properties listed with retention periods and legal basis
- [x] Consent gate flow documented with strict C-15 gate rule (non-2xx = no unlock)
- [x] Erasure request process documented per GDPR Art. 17, within 30-day deadline
- [x] Benchmark n-count preservation documented per C-19 (anonymized aggregates only, no PII in benchmark cards)
- [x] Lawful basis confirmed as consent Art. 6(1)(a), not legitimate interest
- [x] C-24 stub removal requirement captured in implementation checklist
- [x] Open action for B06 retention enforcement recorded
