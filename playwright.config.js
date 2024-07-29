import { defineConfig, devices } from "@playwright/test";

const BASE_URL = process.env.DEPLOYMENT_URL
  ? new URL(process.env.DEPLOYMENT_URL).href + "/"
  : "http://localhost:5173";

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "tests/E2E",

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  //   Reporter to use
  reporter: "html",

  use: {
    screenshot: "only-on-failure",
    baseURL: BASE_URL,
    trace: "on",
  },

  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], isMobile: false },
    },
    {
      name: "mobile",
      use: { ...devices["iPhone SE"], viewport: { width: 375, height: 667 } },
    },
    {
      name: "tablet",
      use: {
        ...devices["iPad Air portrait"],
        viewport: { width: 820, height: 1180 },
      },
    },
  ],
});
