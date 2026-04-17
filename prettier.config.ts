import type { Config } from 'prettier'

const config: Config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 80,
  tabWidth: 2,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  astroAllowShorthand: false,
  tailwindConfig: './tailwind.config.ts',
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
        htmlWhitespaceSensitivity: 'ignore',
        proseWrap: 'preserve'
      }
    },
    {
      files: '*.{yaml,yml}',
      options: {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: true,
        trailingComma: 'all'
      }
    }
  ]
}

export default config
