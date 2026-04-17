import type { Config } from 'stylelint'

const config: Config = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    'stylelint-config-astro',
    'stylelint-config-tailwindcss',
    'stylelint-config-alphabetical-order',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'color-no-invalid-hex': true,
    'block-no-empty': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  },
  overrides: [
    {
      files: ['**/*.astro']
    }
  ]
}

export default config
