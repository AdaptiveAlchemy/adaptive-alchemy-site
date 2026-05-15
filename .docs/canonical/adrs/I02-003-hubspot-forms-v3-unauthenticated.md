---
type: adr
endeavor: I02-AIASSESS
status: accepted
date: 2026-05-15
decided-by: human+agent
supersedes: []
superseded_by: null
---

# ADR I02-003: HubSpot Forms API v3 Unauthenticated (Not Embed Snippet)

**Date:** 2026-05-15
**Status:** Accepted
**Initiative:** I02-AIASSESS
**Decided-by:** human+agent

**Decision Makers:** Founder (Ariel Perez), architect (Phase 2 design)

**Tags:** architecture, hubspot, forms-api, email-gate, gdpr, cors, static-site

## Context

The assessment tool requires an email gate mid-survey flow: after the survey is complete, the user sees an ungated score summary (maturity level + headline finding), then must submit a work email address and GDPR consent before the full report unlocks.

On successful email submission, the tool must:
1. Create or update a HubSpot contact with the user's email, maturity level, dimension scores, track assignment, binding constraint, framing variant, and company email domain.
2. Trigger the appropriate HubSpot email sequence (Track A/B/C).
3. Unlock the full report renderer in the React island state.

The site is GitHub Pages static — no server runtime exists in v1. All HubSpot integration must be client-side.

HubSpot provides three client-accessible integration options for form submissions:
- The embed snippet (`<script>` + HubSpot Forms JS SDK that renders an iFrame)
- The Forms API v3 unauthenticated endpoint (`POST /submissions/v3/integration/submit/{portalId}/{formGuid}`)
- The Forms API v3 authenticated endpoint (requires a Private App token — incompatible with client-side usage)

## Decision

Use the **HubSpot Forms API v3 unauthenticated endpoint** via a direct `fetch` POST from within `EmailGate.tsx`. The endpoint is:

```
POST https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}
```

CORS is explicitly permitted by HubSpot on this endpoint from any origin — the unauthenticated integration endpoint is designed for client-side use. The portal ID and form GUID are not secrets (they are exposed in any page that uses the HubSpot embed snippet); they serve as identifiers, not as authentication.

The payload must include `legalConsentOptions` with the GDPR consent structure to satisfy AA-3 (GDPR Art. 6 lawful basis = explicit consent). Submissions that do not include this field will not create a valid HubSpot consent record.

`hubspot.ts` is the sole client for this endpoint — a pure function module that accepts a `HubSpotSubmission` typed payload and returns a typed result. It is importable and testable in isolation.

## Alternatives Considered

- **HubSpot embed JS snippet (iFrame):** Renders a HubSpot-styled form inside an iFrame. Loses full control over the gate's UX — the mid-survey placement, the inline domain blocklist validation, the GDPR checkbox wording, and the progression logic (only unlock the report on HubSpot 2xx) all require owning the form DOM. The iFrame renders asynchronously and introduces CLS risk. HubSpot's embed snippet also loads the entire HubSpot Forms JS SDK, adding external script weight. Rejected: UX control requirement and CLS risk are disqualifying.

- **Authenticated HubSpot Forms API v3 (Private App token):** The authenticated endpoint provides additional capabilities (e.g., contacts API) but requires a Private App token as an `Authorization: Bearer` header. Exposing a private app token client-side is a security violation — it would be visible in the browser's network tab and in the compiled JavaScript bundle. The authenticated endpoint also does not support CORS. Rejected: incompatible with static client-side deployment.

- **Third-party form service (Formspree, Netlify Forms, Basin):** Would provide a backend relay without a private token. However, this introduces a dependency on a second CRM-adjacent service with its own GDPR implications, pricing, and data residency questions. HubSpot is already the chosen CRM for track routing and email sequences; routing through a second service creates a fragile two-system integration. Rejected: unnecessary integration complexity.

- **Cloudflare Worker as API proxy:** A Worker could hold the HubSpot Private App token server-side and proxy requests. This eliminates the client-side token exposure problem. However, this adds infrastructure scope to v1 ("no backend required for v1" is an explicit charter constraint — §3.2). The unauthenticated endpoint satisfies all v1 requirements without a Worker. Rejected for v1; retained as the extension path if v2 requires authenticated HubSpot operations.

## Agent Boundary Rules

- **Owns:** `src/lib/assessment/hubspot.ts` (sole HubSpot client), `src/components/assessment/EmailGate.tsx` (sole caller)
- **Cannot touch:** No other component or module may call the HubSpot API directly. All HubSpot submissions route through `hubspot.ts`.
- **Must preserve:** (1) `legalConsentOptions` must be present in every submission payload — omitting it violates AA-3 and creates GDPR-non-compliant contact records. (2) The full report must not render unless `hubspot.ts` returns a 2xx response — no partial unlock on error.
- **Enforcement:** BDD acceptance criteria S22 (consent gate) and S22b (HubSpot error handling); C-15 (consent failure does not deliver report)

## Consequences

### Positive

- Full ownership of the gate UX — domain blocklist validation, GDPR checkbox wording, inline error states, and progression logic are all controlled within the React island.
- No additional infrastructure required for v1.
- `portalId` and `formGuid` are injected via Astro build config — the actual values are environment-specific and can be swapped for staging vs. production without code changes.
- `hubspot.ts` is a pure module — testable in isolation with typed inputs/outputs. No global state, no side effects beyond the `fetch` call.
- CORS is supported on this endpoint — no browser CORS errors.

### Negative

- `portalId` and `formGuid` are visible in the compiled JavaScript bundle and the page source. This is by design for the unauthenticated endpoint (they are identifiers, not credentials), but requires explicit awareness that these values are public.
- The unauthenticated endpoint does not support all HubSpot contact properties or operations — it is limited to form field submission. Any v2 operation requiring the Contacts API (e.g., reading back contact state for re-take comparison) will require the Cloudflare Worker proxy path.
- HubSpot portal ID and form GUID must be created and confirmed before Phase 3 B03-4 can begin (open dependency — see Backlog §Open Pre-Phase-3 Dependencies).
- GDPR tools toggle in HubSpot must be verified from an EU IP before Phase 3 launch (B06-2) — the `legalConsentOptions` payload only creates a valid GDPR record if the portal has GDPR tools enabled.

### Neutral

- The `legalConsentOptions` structure must include the HubSpot email subscription type ID for the 90-day sequence — this ID must be retrieved from the HubSpot portal configuration before B03-4 implementation.
- HubSpot workflows (Track A/B/C routing, sequence enrollment) are triggered server-side by HubSpot on contact creation — no additional client-side logic is required beyond passing the hidden fields (`ai_fluency_level`, `ai_fluency_track`, `ai_fluency_binding_constraint`, `ai_fluency_framing_variant`, and per-dimension scores).

## Implementation Notes

- `hubspot.ts` signature:
  ```typescript
  async function submitToHubSpot(payload: HubSpotSubmission): Promise<{ ok: true } | { ok: false; error: string }>
  ```
- Required hidden fields per submission: `email`, `ai_fluency_level`, `company_email_domain`, `ai_fluency_track`, `ai_fluency_binding_constraint`, `ai_fluency_framing_variant`, plus one field per dimension score key (6 fields)
- `legalConsentOptions` template (required for every submission):
  ```typescript
  legalConsentOptions: {
    consent: {
      consentToProcess: true,
      text: '<checkbox label text>',
      communications: [{ value: true, subscriptionTypeId: <id>, text: '<subscription description>' }]
    }
  }
  ```
- Error handling: any non-2xx from HubSpot → `EmailGate` shows "Unable to save your results — try again." The report does NOT unlock. The user can retry. No partial unlock on error (C-15).
- Portal ID and form GUID injected as Astro env vars: `PUBLIC_HUBSPOT_PORTAL_ID`, `PUBLIC_HUBSPOT_FORM_GUID`

## Validation

- **How to validate:** B06-2 HubSpot integration smoke test — POST to real portal ID from EU IP, verify contact created with all expected properties, verify GDPR consent recorded, verify email sequence enrolled, verify GDPR tools toggle active.
- **Validate by:** B06-2 (Phase 3 quality gate)
- **Current status:** unvalidated

## Related Decisions

- [ADR I02-001] — Island boundary within which `EmailGate.tsx` renders
- [ADR I02-005] — Email-me report delivery (HubSpot email triggered by this same submission)

## References

- Charter §3.2 — No backend required for v1
- Charter §3.4 — HubSpot integration and track routing
- Charter UQ-M / AA-3 — GDPR consent as Phase 3 acceptance criterion
- Charter UQ-11 — Company email domain filtering (both client-side and HubSpot-side)
- Backlog §Consent Gate Flow (C-15 Architecture) — full gate state machine
- Backlog §Interface Contracts — `HubSpotSubmission` type definition
- Backlog §Open Pre-Phase-3 Dependencies — portal ID and form GUID as blocking dependencies
- HubSpot documentation: [Forms API v3](https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3)
