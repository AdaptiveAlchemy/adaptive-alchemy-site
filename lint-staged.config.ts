import type { Configuration } from 'lint-staged'

const config: Configuration = {
  '*.md': ['prettier --write', 'pnpm run lint:md:fix'],
  '{src,scripts}/**/*.{js,jsx,ts,tsx,astro}': () => [
    'pnpm run lint:format:src:fix',
    'pnpm run lint:code:src:fix'
  ],
  'src/**/*.{js,jsx,ts,tsx,astro}': () => ['pnpm run check:astro'],
  '*.{css,astro}': () => [
    'pnpm run lint:format:css:fix',
    'pnpm run lint:styles:fix'
  ]
}

export default config
