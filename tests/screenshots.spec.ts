import { test, expect } from '@playwright/test';
import path from 'node:path';
import { waitForPageReady, setupErrorTracking, assertVisualSanity } from './test-utils';

const screenshotsDir = path.resolve('tests', 'screenshots');

const desktopViewports = [
  { name: '1280', width: 1280, height: 800 },
  { name: '1440', width: 1440, height: 900 },
  { name: '1920', width: 1920, height: 1080 }
];

const mobileViewports = [
  { name: '375', width: 375, height: 812 },
  { name: '390', width: 390, height: 844 },
  { name: '430', width: 430, height: 932 }
];

const primaryRoutes = [
  { path: '/', slug: 'home' },
  { path: '/works', slug: 'works' }
];

const secondaryRoutes = [
  { path: '/about', slug: 'about' },
  { path: '/experience', slug: 'experience' },
  { path: '/contact', slug: 'contact' },
  { path: '/404.html', slug: '404' }
];

const caseStudies = [
  { path: '/works/neurocollab', slug: 'neurocollab' },
  { path: '/works/semirestore-ai', slug: 'semirestore-ai' },
  { path: '/works/aura', slug: 'aura' },
  { path: '/works/complyone', slug: 'complyone' },
  { path: '/works/vultra', slug: 'vultra' },
  { path: '/works/scamcheck', slug: 'scamcheck' }
];

test.describe('Desktop Responsive Screenshots', () => {
  for (const vp of desktopViewports) {
    for (const r of primaryRoutes) {
      test(`Capture ${r.slug} on Desktop ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
        const tracker = setupErrorTracking(page);
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(r.path, { waitUntil: 'domcontentloaded' });
        await waitForPageReady(page);
        await assertVisualSanity(page, vp.width);

        const filename = `${r.slug}-desktop-${vp.name}.png`;
        await page.screenshot({
          path: path.join(screenshotsDir, filename),
          fullPage: true
        });

        expect(tracker.consoleErrors).toEqual([]);
        expect(tracker.pageErrors).toEqual([]);
        expect(tracker.failedRequests).toEqual([]);
      });
    }
  }

  // Also capture other pages at standard desktop 1440
  for (const r of [...secondaryRoutes, ...caseStudies]) {
    test(`Capture ${r.slug} on Desktop 1440 (1440x900)`, async ({ page }) => {
      const tracker = setupErrorTracking(page);
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);
      await assertVisualSanity(page, 1440);

      const filename = `${r.slug}-desktop-1440.png`;
      await page.screenshot({
        path: path.join(screenshotsDir, filename),
        fullPage: true
      });

      expect(tracker.consoleErrors).toEqual([]);
      expect(tracker.pageErrors).toEqual([]);
      expect(tracker.failedRequests).toEqual([]);
    });
  }
});

test.describe('Mobile Responsive Screenshots', () => {
  for (const vp of mobileViewports) {
    for (const r of primaryRoutes) {
      test(`Capture ${r.slug} on Mobile ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
        const tracker = setupErrorTracking(page);
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(r.path, { waitUntil: 'domcontentloaded' });
        await waitForPageReady(page);
        await assertVisualSanity(page, vp.width);

        const filename = `${r.slug}-mobile-${vp.name}.png`;
        await page.screenshot({
          path: path.join(screenshotsDir, filename),
          fullPage: true
        });

        expect(tracker.consoleErrors).toEqual([]);
        expect(tracker.pageErrors).toEqual([]);
        expect(tracker.failedRequests).toEqual([]);
      });
    }
  }

  // Also capture secondary routes & all case studies on standard mobile 390
  for (const r of [...secondaryRoutes, ...caseStudies]) {
    test(`Capture ${r.slug} on Mobile 390 (390x844)`, async ({ page }) => {
      const tracker = setupErrorTracking(page);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);
      await assertVisualSanity(page, 390);

      const filename = `${r.slug}-mobile-390.png`;
      await page.screenshot({
        path: path.join(screenshotsDir, filename),
        fullPage: true
      });

      expect(tracker.consoleErrors).toEqual([]);
      expect(tracker.pageErrors).toEqual([]);
      expect(tracker.failedRequests).toEqual([]);
    });
  }
});
