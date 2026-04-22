# Handoff: who-we-help-cards

## Objective
Session implemented the full I01-CPYMSG copy & messaging update (Tier 1–3), then fixed pre-existing markdownlint CI failures, then removed a fabricated $2.5M claim. Final task in progress: adding a two-layer card design to the "Who We Help" index page (`/for/`). Three agents (product-marketer, seo-strategist, aeo-geo-strategist) unanimously recommended adding a separate `cardHeadline` field (SEO copy) rather than shortening `hero.headline`. User then asked for a second sub-element using the product-marketer's copy as an emotional "kick off" line. Implementation was starting when context limit hit.

## Current Status
- Done: I01-CPYMSG full implementation `27a0a00`, lint fix `65a2334`, $2.5M removal `edc38a5`, wip checkpoint `c9f3cae`
- Progress: Who We Help card redesign — NOT started; approved design confirmed, no files changed yet
- Blocked: 4 commits unpushed (user must approve before push)

## Key Anchors (start here)
- `src/pages/for/index.astro` :: card grid `personas.map(...)` — add `cardHeadline` + `cardHook` rendering here
- `src/content/personas/pe-vc.md` :: frontmatter — add `cardHeadline` + `cardHook` fields
- `src/content/personas/ceos-boards.md` :: frontmatter — same
- `src/content/personas/founders.md` :: frontmatter — same
- `src/content/personas/ctos.md` :: frontmatter — same, also `stalled-ai-projects.md`

## Decision Rationale
- **Add `cardHeadline` + `cardHook`, not shorten `hero.headline`**: h1 on persona pages does persuasion work; card needs a shorter navigational label. AEO agent confirmed h1 length is irrelevant for AI citability — `directAnswer` carries that weight.
- **Two-layer card**: SEO strategist copy = h2 (scannable label), product marketer copy = smaller italic sub-line ("kick off"). User confirmed this exact layout.
- **No push yet**: user explicitly said not to push without permission after session-1 incident.

## Copy to Implement

| Page | `cardHeadline` (SEO, h2) | `cardHook` (PM, sub-line) |
|------|--------------------------|---------------------------|
| PE/VC | AI accountability across your portfolio | AI is running across your portfolio. No one owns the outcomes. |
| CEOs & Boards | AI strategy, not just AI activity | Your board wants an AI strategy. Activity is not one. |
| Founders | Technology decisions that compound for years | The decisions you make in the next twelve months compound for years. |
| CTOs | Senior support from someone who has held the seat | The CTO seat is lonely. Most advisors have never held it. |
| Stalled AI | Rescue for AI pilots that lost momentum | Your pilot did not fail because AI does not work. |

## Git State
- Branch: main | Ahead: 4 commits | Uncommitted: no
- Recent: `c9f3cae` wip checkpoint | `edc38a5` remove $2.5M claim | `65a2334` lint fix | `27a0a00` I01-CPYMSG

## Verification
- Ran: `pnpm build` (clean, 20 pages) | `pnpm lint:md` (clean) | Failures: none

## Next Steps (ordered)
1. Check content schema: `find src/content -name "*.ts" | xargs grep -l "persona\|defineCollection"` — verify whether new fields need Zod schema additions
2. Add `cardHeadline` + `cardHook` to frontmatter of all 5 persona `.md` files (copy table above)
3. Update `src/pages/for/index.astro`: replace `hero.headline` h2 with `cardHeadline`; add `cardHook` as `<p class="mt-2 text-sm italic text-text-muted">` below h2; remove or keep `description` (evaluate card length)
4. Run `pnpm build` + `pnpm lint:md` to verify
5. Commit: `feat: add two-layer card headlines to Who We Help page`
6. Ask user before pushing

## Open Questions
- Does the content schema (Zod) need explicit field declarations for `cardHeadline` and `cardHook`, or does Astro tolerate extra frontmatter fields? Check the schema file before adding fields to avoid type errors.
- Should the existing `description` field remain visible in the card, or does `cardHook` replace it? Card may be too long with all three. User has not specified — default to replacing description with hook (cleaner), and ask if they want it back.
