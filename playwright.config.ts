import { defineConfig } from '@playwright/test';
import fs from 'node:fs';

// Locate locally installed Google Chrome or Microsoft Edge
const getBrowserExecutable = (): string | undefined => {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return undefined;
};

const browserExecutable = getBrowserExecutable();
console.log('[Playwright Config] Selected real browser executable:', browserExecutable);

export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
      threshold: 0.2,
      animations: 'disabled'
    }
  },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  outputDir: 'test-results/',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
    screenshot: 'off',
    video: 'off',
    channel: 'chrome',
    launchOptions: browserExecutable ? {
      executablePath: browserExecutable
    } : undefined
  },
  webServer: {
    command: 'node serve.js',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    timeout: 30000
  }
});
