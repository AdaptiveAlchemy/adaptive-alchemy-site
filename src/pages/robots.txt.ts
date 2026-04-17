import type { APIRoute } from 'astro'

import { SITE_URL } from '@/consts'

export const GET: APIRoute = () => {
  const robotsTxt = `
User-agent: *
Allow: /

# AI crawlers — allowed for AEO/GEO visibility
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml
`.trim()

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  })
}
