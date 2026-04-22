import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const ctaSchema = z.object({
  label: z.string(),
  href: z.string()
})

const insightsCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    pillar: z
      .enum([
        'technical-due-diligence',
        'fractional-cto',
        'first-time-cto',
        'agent-first',
        'fundraising-exit'
      ])
      .optional(),
    persona: z
      .enum([
        'founders',
        'investors',
        'portfolio-companies',
        'ctos',
        'agent-first'
      ])
      .optional(),
    readingTime: z.string().optional(),
    draft: z.boolean().optional().default(false)
  })
})

const servicesCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    order: z.number(),
    icon: z.string().optional(),
    cta: z.string().optional(),
    ctaLink: z.string().optional()
  })
})

const personasCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/personas' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    navLabel: z.string(),
    cardHeadline: z.string().optional(),
    cardHook: z.string().optional(),

    directAnswer: z.string().optional(),

    hero: z.object({
      eyebrow: z.string(),
      headline: z.string(),
      subheadline: z.string(),
      primaryCta: ctaSchema,
      secondaryCta: ctaSchema.optional()
    }),

    painPoints: z
      .object({
        heading: z.string(),
        subheading: z.string().optional(),
        items: z.array(
          z.object({
            quote: z.string(),
            label: z.string()
          })
        )
      })
      .optional(),

    featureGrid: z
      .object({
        heading: z.string(),
        subheading: z.string().optional(),
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string()
          })
        )
      })
      .optional(),

    numberedOutcomes: z
      .object({
        heading: z.string(),
        items: z.array(
          z.object({
            title: z.string(),
            description: z.string()
          })
        )
      })
      .optional(),

    engagementTiers: z
      .object({
        heading: z.string(),
        items: z.array(
          z.object({
            eyebrow: z.string(),
            title: z.string(),
            description: z.string()
          })
        )
      })
      .optional(),

    credibility: z
      .object({
        heading: z.string(),
        paragraphs: z.array(z.string())
      })
      .optional(),

    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string()
        })
      )
      .optional(),

    ctaBand: z.object({
      headline: z.string(),
      subheadline: z.string(),
      ctaLabel: z.string().optional(),
      ctaHref: z.string().optional()
    })
  })
})

export const collections = {
  insights: insightsCollection,
  services: servicesCollection,
  personas: personasCollection
}
