import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './src/tests',
  timeout: 60 * 3000,
  //timeout: 60 * 3000,
  expect: {
    timeout: 10000
  },
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['allure-playwright']],
  use: {
    baseURL: 'https://cms-test.cubicservice.ru/',
    trace: 'on-first-retry',
    // video: 'on',
    // screenshot: 'on'
    //storageState: 'state.json',

  },
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        //channel: 'chrome',
        viewport: { width: 1920, height: 1080 }
      }
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     viewport: { width: 1920, height: 1080 },
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     viewport: { width: 1920, height: 1080 },
    //   }
    // }
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
