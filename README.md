# Adaptive Alchemy

Marketing site for [adaptivealchemy.io](https://www.adaptivealchemy.io) — a boutique product and technology strategy practice offering fractional CTO leadership, technical due diligence, and agent-first transformation for growth-stage companies and their investors.

## What this site does

The site has three jobs, in order:

1. **Qualify the right buyers.** Five persona pages under `/for/` (PE/VC, CEOs & boards, founders, CTOs, stalled-AI-projects teams) speak directly to each buyer's language and pain points so prospects self-identify before a call.
2. **Explain the engagement model.** Five service pages under `/services/` map to a five-tier ladder — Assess → Design → Pilot → Transform → Operate — so buyers can see exactly what a low-risk starting point looks like and how engagements scale.
3. **Convert intent to conversation.** Every page routes to `/contact` with context-aware CTAs. No gated content, no drip funnels — the site is optimized for a single booked intro call.

Content is organized around buyer language (for SEO and discoverability) rather than proprietary framework names, which live in thought-leadership pieces under `/insights/`.

## Tech stack

| Layer           | Choice                                                       |
| --------------- | ------------------------------------------------------------ |
| Framework       | Astro 6 (static output)                                      |
| UI islands      | React 19 (only where interactivity needed)                   |
| Styles          | Tailwind CSS v4 via `@tailwindcss/vite`                      |
| Content         | Astro content collections (MD/MDX with Zod schemas)          |
| Language        | TypeScript strict mode across all source and configs         |
| Package manager | pnpm 10                                                      |
| Node            | 22+                                                          |
| Hosting         | GitHub Pages (via `gh-pages` branch)                         |
| CI              | GitHub Actions (format, lint, type-check, build, Lighthouse) |

All tool configs are `.ts` where the tool supports it (ESLint, Stylelint, Tailwind, PostCSS, Prettier, lint-staged, Astro). The only exception is `lighthouserc.cjs` — lhci has no native TS loader yet.

## Getting started

```bash
pnpm install
pnpm dev            # http://localhost:4321
```

Common scripts:

| Script            | What it does                                                           |
| ----------------- | ---------------------------------------------------------------------- |
| `pnpm dev`        | Astro dev server with HMR                                              |
| `pnpm build`      | Static build to `dist/`                                                |
| `pnpm preview`    | Serve the built `dist/` locally                                        |
| `pnpm check`      | `astro check` — type-checks `.astro`, `.ts`, content schemas           |
| `pnpm lint`       | Runs prettier check, ESLint, Stylelint, and markdownlint across `src/` |
| `pnpm lint:fix`   | Autofix variant of the above                                           |
| `pnpm lighthouse` | Build + run Lighthouse CI against all routes                           |
| `pnpm a11y`       | Build + run axe-core against the core pages                            |
| `pnpm deploy`     | Build + push `dist/` to `gh-pages` branch                              |

Pre-commit hooks (husky + lint-staged) run format, lint, and type-check on staged files before every commit. If a hook fails, fix the underlying issue — do not use `--no-verify`.

## Repository layout

```text
adaptive-alchemy-site/
├── src/
│   ├── components/
│   │   ├── global/         Header, Footer — shared across all pages
│   │   ├── sections/       Hero, ServiceCards, CTABand — composable page sections
│   │   └── persona/        PersonaHero, PainPoints, FeatureGrid, FAQ, etc.
│   ├── content/            Content collections (see next section)
│   ├── layouts/            Layout.astro, PageLayout.astro
│   ├── pages/              File-based routes
│   │   ├── for/[slug].astro         Dynamic persona pages
│   │   ├── services/[slug].astro    Dynamic service pages
│   │   └── insights/                Thought-leadership index
│   ├── styles/global.css   Tailwind entry + `@theme` tokens + font-face
│   ├── consts.ts           SITE_TITLE, SITE_URL, framework constants
│   └── content.config.ts   Zod schemas for all content collections
├── public/                 Static assets served from `/`
├── astro.config.ts         Integrations: React, Sitemap, Tailwind (via Vite)
├── tailwind.config.ts      Theme tokens, typography plugin, font stacks
├── eslint.config.ts        Flat config — Astro + React + TS + a11y
├── stylelint.config.ts     CSS linting for `.css` and `.astro` style blocks
├── prettier.config.ts      Formatting — includes Astro + Tailwind plugins
├── lint-staged.config.ts   Pre-commit file-type-scoped fixes
├── postcss.config.ts       PostCSS loader (Tailwind via Vite plugin)
├── lighthouserc.cjs        Lighthouse CI thresholds (a11y, perf, SEO)
└── .github/workflows/      CI pipeline
```

## Adding content

All user-visible text (except the `about`/`approach`/`contact` landing copy) lives in content collections defined in `src/content.config.ts`. Adding or editing content means editing Markdown — no component changes required.

### Add a new service

1. Create `src/content/services/my-new-service.md` with frontmatter:

   ```yaml
   ---
   title: 'My New Service'
   description: 'Longer description used in page hero and meta description.'
   shortDescription: 'One-line tagline for the service card grid.'
   order: 6 # Sort order on /services/ index
   cta: 'Ready to get started?' # Optional — CTA headline
   ctaLink: '/contact' # Optional — defaults to /contact
   ---
   ## The problem
   ...
   ## What you get
   ...
   ```

2. The page is live at `/services/my-new-service/` on the next build. No code changes.

### Add a new persona page

Personas are structured (not prose) because each page uses the same layout — hero, pain points, feature grid, engagement tiers, credibility, FAQ, CTA band. Each block is optional; omit what you do not need.

1. Create `src/content/personas/my-persona.md`. Full schema lives in `src/content.config.ts`. Minimum required:

   ```yaml
   ---
   title: 'Page title for <title> and H1'
   description: 'Meta description.'
   navLabel: 'For My Persona' # Label used in nav/linking
   order: 6
   directAnswer: 'Optional — AI/SGE-optimized one-paragraph answer.'

   hero:
     eyebrow: 'For My Persona'
     headline: 'The headline.'
     subheadline: 'The subheadline.'
     primaryCta:
       label: 'Book an Intro Call'
       href: '/contact'

   ctaBand:
     headline: 'Closing CTA headline.'
     subheadline: 'Closing CTA supporting copy.'
   ---
   ```

2. Optional blocks — add as needed:
   - `painPoints` — quote/label pairs used in the "Sound familiar?" grid
   - `featureGrid` — title/description items for capability cards
   - `numberedOutcomes` — numbered list of concrete outcomes
   - `engagementTiers` — the 5-tier engagement ladder, customized per persona
   - `credibility` — paragraphs for the "Why us" section
   - `faq` — question/answer pairs

3. The page is live at `/for/my-persona/` on the next build. Add the persona to nav/footer linking if it should be surfaced globally.

### Add an insights post

1. Create `src/content/insights/my-post.md` (or `.mdx` for components in content):

   ```yaml
   ---
   title: 'Post title'
   description: 'One-paragraph summary for the index and meta.'
   pubDate: 2026-04-17
   updatedDate: 2026-05-01 # Optional
   tags: ['fractional-cto', 'due-diligence']
   pillar: 'technical-due-diligence' # Optional — see schema for enum values
   persona: 'investors' # Optional — see schema for enum values
   heroImage: '/assets/post-hero.jpg' # Optional
   draft: false # Omit or set true to hide
   ---
   Post body in Markdown.
   ```

2. `reading-time` is computed automatically from the body. The post appears on `/insights/` in reverse-chronological order.

### Design tokens

Theme values live in two places:

- **Tailwind utilities** — colors, font sizes, spacing, animations in `tailwind.config.ts` under `theme.extend`.
- **CSS custom properties** — `@theme` block in `src/styles/global.css` for values referenced via `var(--...)`.

When adding a brand color: add it to `tailwind.config.ts` (so Tailwind generates `bg-<name>`, `text-<name>` utilities) and also as a `--color-<name>` custom property if you need to reference it from raw CSS.

## Deploying

The site deploys to GitHub Pages via the `gh-pages` branch:

```bash
pnpm deploy
```

This runs `pnpm build` then pushes `dist/` to the `gh-pages` branch. The CI workflow (`.github/workflows/ci.yml`) runs format, lint, type-check, build, and Lighthouse on every push and PR — keep it green.

Performance budgets are enforced by Lighthouse CI (`lighthouserc.cjs`): accessibility ≥ 0.9 is an error; best-practices and SEO ≥ 0.9 are warnings. Tighten as needed.

## Conventions

- **TypeScript strict mode** everywhere. No `any`. Schemas (Zod) at content boundaries; plain types for internal logic.
- **Immutable data.** No mutation of arrays or objects — use spread.
- **Path aliases.** Import from `@/` (maps to `src/`) for clarity.
- **Astro files use single-quote, no-semi, no-trailing-comma** — enforced by Prettier.
- **Content over code.** If a change is text-only, it should be a content edit, not a component edit. If you find yourself editing `.astro` to change copy, the content schema probably needs a new field instead.
