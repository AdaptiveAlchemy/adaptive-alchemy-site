import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    '*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        ink: '#0A0A0A',
        surface: '#141414',
        paper: '#F5F0EB',
        'paper-muted': '#E8E0D8',
        // Alchemical gold
        gold: {
          DEFAULT: '#C4A265',
          light: '#D4B87A',
          dim: '#8A7347'
        },
        // Catalyst accent (copper-amber)
        accent: {
          DEFAULT: '#B2603D',
          hover: '#C4714E',
          muted: '#A35A3A'
        },
        // Text
        'text-primary': '#F5F0EB',
        'text-inverse': '#1A1A1A',
        'text-muted': '#9B9490',
        // Semantic
        success: '#5B8C6A',
        warning: '#C4A265',
        error: '#C45B5B',
        info: '#5B7C8C'
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          '"Segoe UI"',
          'sans-serif'
        ],
        mono: ['"JetBrains Mono"', '"SF Mono"', '"Fira Code"', 'monospace']
      },
      fontSize: {
        // Major Third scale (1.250)
        xs: ['0.64rem', { lineHeight: '1.4' }],
        sm: ['0.8rem', { lineHeight: '1.5' }],
        md: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.25rem', { lineHeight: '1.5' }],
        xl: ['1.563rem', { lineHeight: '1.3' }],
        '2xl': ['1.953rem', { lineHeight: '1.2' }],
        '3xl': ['2.441rem', { lineHeight: '1.2' }],
        '4xl': ['3.052rem', { lineHeight: '1.1' }],
        '5xl': ['3.815rem', { lineHeight: '1.1' }],
        '6xl': ['4.768rem', { lineHeight: '1.05' }]
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#1A1A1A',
            '--tw-prose-headings': '#1A1A1A',
            '--tw-prose-links': '#D4764E',
            '--tw-prose-bold': '#1A1A1A',
            '--tw-prose-quotes': '#1A1A1A',
            '--tw-prose-quote-borders': '#C4A265',
            maxWidth: 'none',
            lineHeight: '1.7',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#E08860',
                borderBottomColor: '#D4764E'
              }
            },
            'h1, h2, h3, h4, h5, h6': {
              fontFamily:
                '"DM Serif Display", Georgia, "Times New Roman", serif',
              fontWeight: '400',
              lineHeight: '1.2'
            }
          }
        },
        invert: {
          css: {
            '--tw-prose-body': '#F5F0EB',
            '--tw-prose-headings': '#F5F0EB',
            '--tw-prose-links': '#D4764E',
            '--tw-prose-bold': '#F5F0EB',
            '--tw-prose-quotes': '#F5F0EB',
            '--tw-prose-quote-borders': '#C4A265',
            a: {
              '&:hover': {
                color: '#E08860',
                borderBottomColor: '#D4764E'
              }
            }
          }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease forwards',
        'slide-up': 'slide-up 0.6s ease forwards'
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      }
    }
  },
  plugins: [typography]
}

export default config
