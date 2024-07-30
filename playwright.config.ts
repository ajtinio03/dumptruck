import { defineConfig, devices } from '@playwright/test';
require("dotenv").config();
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    retries: process.env.CI ? 3 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['html'], ['junit', { outputFile: 'test-results/junit-results.xml' }]],
    use: {
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'setup',
            testMatch: /.*\.setup\.ts/,
            use: {
                ...devices['Desktop Chrome'],
                headless: true,
                viewport: { width: 1880, height: 930 },
                screenshot: 'only-on-failure',
            },
        },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless: false,
                //maximum time eachg action can take. defaults to 0(no limit)
                actionTimeout: 20000,
                viewport: { width: 1880, height: 930 },
                storageState: 'playwright/.auth/user.json',
                screenshot: 'on',
            },
            dependencies: ['setup'],
        },

        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'], headless:true, viewport: { width: 1880, height: 930 } }
        // },

        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },
    ],

    testIgnore: '**/tests/differentReso.spec.ts',
});
