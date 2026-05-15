---
report_type: claims-verification
initiative: I02-AIASSESS
agent: claims-verifier
date: 2026-05-15
phase: 0
verdict: PASS_WITH_WARNINGS
blockers: none
---

# Claims Verification Report — I02-AIASSESS Phase 0

**Verdict: PASS WITH WARNINGS** — All critical-path claims verified. No blockers.

## Per-Claim Results

| # | Claim | Status | Critical Path |
|---|-------|--------|---------------|
| 1 | HubSpot Forms API CORS — client-side POST from any origin | VERIFIED (endpoint caveat) | Yes |
| 2 | HubSpot GDPR `legalConsentOptions` required when GDPR notices enabled | VERIFIED | Yes |
| 3 | Recharts 2.x bundle ~430KB min / ~120KB gzipped | UNVERIFIABLE (version stale) | No |
| 4 | `client:visible` hydrates on viewport entry | VERIFIED | Yes |
| 5 | "AI readiness assessment" dominated by enterprise players | VERIFIED | No |

## Warnings (non-blocking)

1. **Endpoint citation stale** — researcher cited v2 legacy endpoint; current is v3 at `developers.hubspot.com`. Artifact body already uses correct v3 URL `https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}`.
2. **Recharts version mismatch** — v3.8.1 is current (not v2.x). Install `recharts@latest` (v3.x), consult migration guide. Bundle size estimate unreliable; verify via build analysis.
3. **GDPR Option 3 nuance** — `legalConsentOptions` required for consent-checkbox forms; not required for notice-only (Option 3). Implementation must branch on HubSpot form configuration.

## Implementation Notes for Phase 3
- Use HubSpot v3 unauthenticated endpoint (not v2 legacy)
- Install `recharts@latest` (v3.x); verify bundle size at build time
- GDPR consent implementation must match the HubSpot form's configured GDPR option type

## Overall Verdict: PASS — proceed to gate
