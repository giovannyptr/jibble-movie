import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',     
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
  use: { headless: true, baseURL: 'http://localhost:5173' },
})
