# Handoff: copy-humanization

## Objective
Humanize all site copy by removing AI/LLM tells: manufactured symmetry, consultant jargon, em-dash overuse, defensive binaries, credential theater, filler adjective triples.

## Current Status
- **Done:**
  - Full audit of all copy (5 persona files, 5 service files, 3 page files, 2 components)
  - P0 fixes committed (`a40e7d8`): "We transform X into Y" quad removed, pain point labels rewritten, "not X but Y" binaries removed
  - P1 fixes in same commit: "mobilize trusted operators" replaced, credential theater rewritten, adjective triples broken, "Please-to-thank-you" explanation improved
  - P2 filler sweep: "enterprise-grade", "governance framework", "quick wins", "pressure-test", "stakeholder confidence", "pattern recognition" removed/replaced
  - In-sentence em-dash replacement committed (`7879141` wip): ~50 in-sentence em-dashes replaced with periods, commas, colons, or parentheses across all files. Bullet/step format em-dashes (`**Term** — Description`) intentionally preserved.
- **In progress:** Nothing — em-dash pass is complete, wip commit needs to be squashed/renamed
- **Blocked:** Nothing

## Key Anchors (start here)
- `src/pages/about.astro` :: body paragraphs + "What we believe" — most heavily edited page, P0+P1+P2 all applied
- `src/content/personas/` :: all 5 .md files — pain point labels rewritten, em-dashes replaced, credential sections rewritten
- `src/content/services/` :: all 5 .md files — section H2s renamed, binaries removed, em-dashes replaced
- `src/components/sections/Hero.astro` :: default subheadline — "trusted operators" replaced
- `src/components/sections/CTABand.astro` :: default subheadline — em-dash removed

## Decision Rationale
- **Kept bullet/step em-dashes** (`**Term** — Description` format): Standard structural convention, not an AI tell. Replacing with colons would look worse.
- **Preserved 3 lines**: Hero headline ("Not your anxiety"), stalled-projects credibility ("clean up after the vision"), CTO sounding board quote — all confirmed authentic.
- **WIP commit**: `7879141` is labeled "wip: checkpoint before handoff" — should be amended/renamed to a proper commit message before PR.

## Git State
- **Branch:** main
- **Uncommitted changes:** `?? .github/` (untracked cicd.yml, pre-existing, not related to copy work)
- **Recent commits:**
  - `7879141` wip: checkpoint before handoff (em-dash pass)
  - `a40e7d8` content: humanize copy across site — remove AI/consultant tells
  - `ba8328c` Updated content to not explicitly exclude execution

## Verification
- All pre-commit hooks passed on both commits (lint, format, astro check)
- No test failures

## Next Steps (ordered)
1. Amend or re-commit `7879141` with a proper message, e.g. `content: replace in-sentence em-dashes with periods/commas/colons`
2. Run `pnpm dev` and do a visual pass on `/about`, `/for/founders`, `/services/fractional-cto` — confirm nothing reads awkwardly after em-dash replacements
3. Optional: check `src/consts.ts` FRAMEWORK_LEVELS descriptions for any remaining filler (low priority, not user-facing in obvious way)
4. Optional: review `src/pages/approach.astro` — not audited in this session

## Open Questions
- The wip commit (`7879141`) also picked up deletion of `.github/workflows/ci.yml` and `deploy.yml` (replaced by `cicd.yml` in a prior session). These are legitimate changes but were bundled into the wip commit unintentionally. May want to separate.
