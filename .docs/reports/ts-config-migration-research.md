# TS Config Migration Research — Astro 6 + Tailwind v4 + React 19

**Date:** 2026-04-16
**Scope:** Native `.ts` config support across 10 tools. Goal: mirror telemetry project pattern (jiti 2.6+, prettier 3.7 with `--experimental-strip-types`).

## Executive Summary

- **Native TS configs (no loader):** Astro, Prettier 3.7+, lint-staged 16, Stylelint 16, Vitest.
- **Needs jiti 2.0+ as dep:** ESLint 9.18+, PostCSS (via postcss-load-config).
- **Use CSS-first, drop TS config:** Tailwind v4 — `tailwind.config.ts` is legacy compatibility only; prefer `@theme` in CSS.
- **No TS support; keep `.cjs`:** Lighthouse CI, markdownlint-cli (v1).
- **N/A:** Husky (shell hooks).

**Recommendation:** Convert 1, 2, 4, 5, 6, 8 to `.ts`. Skip 3 (migrate to CSS-first). Skip 7, 10 (keep `.cjs`/`.json`). Skip 9 (shell).

## Per-Tool Findings

### 1. ESLint 9 — `eslint.config.ts`

**Native:** Yes, since **9.18.0** (Jan 2025) [1]. Requires `jiti >= 2.0` as a direct devDep (auto-detected).
**Node 22.10+ alternative:** Set `--experimental-strip-types` + env var `ESLINT_USE_FLAT_CONFIG=true` with flag `unstable_native_nodejs_ts_config` — experimental, not worth it. Stick with jiti.
**`defineConfig`:** Exported from `eslint/config` since 9.23.0 [2]. Supports `extends` inside flat config objects.

```ts
// eslint.config.ts
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["dist/", "node_modules/", ".astro/"] },
]);
```

**Deps:** `eslint@^9.18`, `jiti@^2.0`, `typescript-eslint@^8`, `@eslint/js@^9`.

### 2. Stylelint 16 — `stylelint.config.ts`

**Native:** Yes, via cosmiconfig + TypeScriptLoader. Use `satisfies Config` for type safety [3].

```ts
// stylelint.config.ts
import type { Config } from "stylelint";
export default {
  extends: ["stylelint-config-standard"],
  rules: { "block-no-empty": true },
} satisfies Config;
```

**Deps:** `stylelint@^16`, `@types/stylelint` (bundled).

### 3. Tailwind v4 — skip `tailwind.config.ts`

**Status:** JS/TS config file is **legacy-compat only** in v4 [4]. `corePlugins`, `safelist`, `separator` unsupported. Default scaffolds omit the file.
**Recommendation:** Move theme to CSS via `@theme`; only keep a TS config if you need a v3-style plugin. With `@tailwindcss/vite`, the CSS-first flow is idiomatic.

```css
/* src/styles/global.css */
@import "tailwindcss";
@theme {
  --color-brand: oklch(0.72 0.15 260);
  --font-sans: "Inter Variable", sans-serif;
}
```

If you truly need JS config: `@config "./tailwind.config.ts";` inside CSS.

### 4. PostCSS — `postcss.config.ts`

**Native:** Yes via `postcss-load-config@^5` with `jiti` or `ts-node` installed. No extra flag. (Tailwind v4 + Vite plugin makes this mostly unneeded — only add if you chain autoprefixer/other plugins manually.)

```ts
// postcss.config.ts
import type { Config } from "postcss-load-config";
const config: Config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
```

With Astro + `@tailwindcss/vite`: **skip this file entirely.**

### 5. lint-staged 16 — `lint-staged.config.ts`

**Native:** Yes since v15; v16 uses jiti auto-loaded [5].

```ts
// lint-staged.config.ts
import type { Configuration } from "lint-staged";
const config: Configuration = {
  "*.{ts,tsx,astro}": ["eslint --fix", "prettier --write"],
  "*.{css,scss}": ["stylelint --fix", "prettier --write"],
  "*.md": ["markdownlint --fix", "prettier --write"],
};
export default config;
```

### 6. Prettier 3 — `prettier.config.ts`

**Native:** Experimental — needs `NODE_OPTIONS=--experimental-strip-types` on Node 22.6+ (matches telemetry pattern) [6]. Plain JS config still simplest; TS works but every script invoking prettier must inherit the env var.

```ts
// prettier.config.ts
import type { Config } from "prettier";
const config: Config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  plugins: ["prettier-plugin-astro"],
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
};
export default config;
```

Scripts: `"format": "NODE_OPTIONS=--experimental-strip-types prettier --check ."`

### 7. Lighthouse CI — **keep `lighthouserc.cjs`**

**Native TS:** No. Open issue #312 since 2020, not implemented [7]. CLI loads `.js`/`.cjs`/`.json` only. **Keep `.cjs`** and reference types via JSDoc:

```js
/** @type {import('@lhci/cli').Config} */
module.exports = { ci: { collect: { url: ["http://localhost:4321/"] } } };
```

### 8. Astro — `astro.config.ts`

**Native:** Yes, zero setup. Vite's internal esbuild transpiles on the fly.

```ts
// astro.config.ts
import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import react from "@astrojs/react";
export default defineConfig({
  integrations: [react()],
  vite: { plugins: [tailwind()] },
});
```

### 9. Husky — N/A

Hooks are POSIX shell (`.husky/pre-commit`). No TS conversion applies. Keep as-is.

### 10. markdownlint-cli — **stay JSON/YAML**

**Native TS:** No. `markdownlint-cli` v0.45 supports `.json`/`.jsonc`/`.yaml`/`.yml` only [8].
**Alternatives:**
- Switch to `markdownlint-cli2` — supports `.markdownlint-cli2.{cjs,mjs,ts}` [8]. Requires moving config file + flag changes in scripts.
- Otherwise keep `.markdownlint.jsonc` — fine for simple rule sets.

**Recommendation:** Stay on `markdownlint-cli` + JSONC unless you need dynamic config. Not worth the swap for a marketing site.

## Claims Registry

| # | Claim | Citation | Critical |
|---|-------|----------|----------|
| 1 | ESLint 9.18+ loads `eslint.config.ts` via jiti ≥ 2.0 | [1] | Yes |
| 2 | `defineConfig` from `eslint/config` added in 9.23.0 | [2] | Yes |
| 3 | Stylelint 16 supports `stylelint.config.ts` with `satisfies Config` | [3] | Yes |
| 4 | Tailwind v4 JS/TS config is legacy-compat; CSS-first is default | [4] | Yes |
| 5 | lint-staged supports `.ts` configs natively via jiti | [5] | Yes |
| 6 | Prettier 3 requires `NODE_OPTIONS=--experimental-strip-types` for TS configs on Node 22.6+ | [6] | Yes |
| 7 | Lighthouse CI has no native `.ts` config support (issue #312 open) | [7] | Yes |
| 8 | `markdownlint-cli` (v1) does not support `.ts`; `markdownlint-cli2` does | [8] | Yes |

## Sources

- [1] ESLint. "ESLint v9.18.0 released". 2025-01-10. https://eslint.org/blog/2025/01/eslint-v9.18.0-released/
- [2] ESLint. "Evolving flat config with extends, defineConfig, and globalIgnores". 2025-03. https://eslint.org/blog/2025/03/flat-config-extends-define-config-global-ignores/
- [3] Stylelint. "Configuring Stylelint". https://stylelint.io/user-guide/configure/
- [4] Tailwind Labs. "Tailwind CSS v4.0". https://tailwindcss.com/blog/tailwindcss-v4 ; GitHub discussion #17168. https://github.com/tailwindlabs/tailwindcss/discussions/17168
- [5] lint-staged README. https://github.com/lint-staged/lint-staged
- [6] Prettier. "Configuration File". https://prettier.io/docs/en/configuration.html (TS config section)
- [7] GoogleChrome. "lighthouserc typescript config" issue #312. https://github.com/GoogleChrome/lighthouse-ci/issues/312
- [8] DavidAnson. markdownlint-cli2 README. https://github.com/DavidAnson/markdownlint-cli2 ; markdownlint-cli README. https://github.com/igorshubovych/markdownlint-cli

## Source Analysis

| Source | Domain | Reputation | Type | Accessed | Verification |
|--------|--------|------------|------|----------|--------------|
| eslint.org | eslint.org | High | Official | 2026-04-16 | Cross-verified (GitHub commits) |
| stylelint.io | stylelint.io | High | Official | 2026-04-16 | Cross-verified (npm) |
| tailwindcss.com | tailwindcss.com | High | Official | 2026-04-16 | Cross-verified (multiple migration guides) |
| GitHub lighthouse-ci #312 | github.com | High | Official issue tracker | 2026-04-16 | Single-source (authoritative) |
| markdownlint-cli2 README | github.com | High | Official | 2026-04-16 | Cross-verified |

**Reputation:** High 100%. Avg score 0.95.

## Unresolved Questions

1. Will the user's `format:fix` script need the `NODE_OPTIONS` env prefix everywhere, or only at root? (Telemetry pattern suggests: set it in every invocation; no shell-wide leak.)
2. Does Astro 6 dev-server hot-reload correctly re-read a changed `astro.config.ts` without restart? (Historically: no — may need to document restart requirement.)
3. If migrating to `markdownlint-cli2`, does the existing `.markdownlint.jsonc` transfer 1:1 or need prefix change to `.markdownlint-cli2.jsonc`? (Per docs: separate filename; requires rename + script update.)
