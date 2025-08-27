import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  retries: 1,
  workers: 4,
  reporter: 'html',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    launchOptions: { slowMo: 700 },
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'], headless: false, channel: 'chrome' },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // debug: true,
});
