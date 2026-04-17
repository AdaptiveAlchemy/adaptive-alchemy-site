/** @type {import('@lhci/cli').Config} */
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      url: [
        '/',
        '/about/',
        '/approach/',
        '/services/',
        '/services/technology-strategy-assessment/',
        '/services/investor-readiness/',
        '/services/fractional-cto/',
        '/services/cto-coaching/',
        '/services/agent-first-transformation/',
        '/contact/',
        '/insights/',
        '/for/',
        '/for/pe-vc/',
        '/for/ceos-boards/',
        '/for/founders/',
        '/for/ctos/',
        '/for/stalled-ai-projects/'
      ],
      numberOfRuns: 1
    },
    assert: {
      assertions: {
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
