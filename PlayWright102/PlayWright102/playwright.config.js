const { devices } = require('@playwright/test')
const config = {
  testDir: 'tests',
  testMatch: '**/*.spec.js',
  timeout: 120000,
  reporter: [
    ['html', { outputFolder: 'Reports/html-report', open: 'never' }],
    ['json', { outputFile: 'Reports/test-results.json' }],
    ['junit', { outputFile: 'Reports/results.xml' }]
  ],
  use: {
    viewport: null
  },
  workers: 1,
  projects: [
    {
      name: 'chrome:latest@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 }
      }
    },
    {
       name: 'MicrosoftEdge:latest@lambdatest',
      use: {
        viewport: { width: 1280, height: 720 }
      }
    }
        
    
  ]
}

module.exports = config
