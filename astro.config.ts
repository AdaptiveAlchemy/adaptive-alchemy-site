import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const getSiteURL = () => {
  return process.env.SITE_URL || 'https://www.adaptivealchemy.io'
}

// BASE_PATH is only needed for GitHub Pages sub-path deployments
// (e.g. adaptivealchemy.github.io/repo-name). A custom domain always uses '/'.
const getBasePath = () => {
  return process.env.BASE_PATH || '/'
}

// https://astro.build/config
export default defineConfig({
  site: getSiteURL(),
  base: getBasePath(),
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        return !page.includes('/404')
      }
    })
  ],
  vite: {
    plugins: [...tailwindcss()]
  }
})
