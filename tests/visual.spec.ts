import { test, expect } from '@playwright/test';
import { waitForPageReady, setupErrorTracking } from './test-utils';

const coreRoutes = [
  { path: '/', name: 'home' },
  { path: '/works', name: 'works' },
  { path: '/about', name: 'about' },
  { path: '/experience', name: 'experience' },
  { path: '/contact', name: 'contact' }
];

const caseStudies = [
  { path: '/works/neurocollab', name: 'neurocollab' },
  { path: '/works/semirestore-ai', name: 'semirestore-ai' },
  { path: '/works/aura', name: 'aura' },
  { path: '/works/complyone', name: 'complyone' },
  { path: '/works/vultra', name: 'vultra' },
  { path: '/works/scamcheck', name: 'scamcheck' }
];

test.describe('Visual Regression - Core & Case Study Pages', () => {
  const allRoutes = [...coreRoutes, ...caseStudies];

  for (const r of allRoutes) {
    test(`Visual snapshot: ${r.name} desktop (1440x900)`, async ({ page }) => {
      const tracker = setupErrorTracking(page);
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      await expect(page).toHaveScreenshot(`${r.name}-desktop-baseline.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
        animations: 'disabled'
      });

      expect(tracker.consoleErrors).toEqual([]);
      expect(tracker.pageErrors).toEqual([]);
      expect(tracker.failedRequests).toEqual([]);
    });

    test(`Visual snapshot: ${r.name} mobile (390x844)`, async ({ page }) => {
      const tracker = setupErrorTracking(page);
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);

      await expect(page).toHaveScreenshot(`${r.name}-mobile-baseline.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.05,
        animations: 'disabled'
      });

      expect(tracker.consoleErrors).toEqual([]);
      expect(tracker.pageErrors).toEqual([]);
      expect(tracker.failedRequests).toEqual([]);
    });
  }
});

test.describe('Visual Regression - Interactive States', () => {

  test('Visual snapshot: works filter AI/ML', async ({ page }) => {
    const tracker = setupErrorTracking(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/works', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    const aiBtn = page.locator('.filter-btn', { hasText: 'AI/ML' });
    await aiBtn.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('works-filter-ai-baseline.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
      animations: 'disabled'
    });

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

  test('Visual snapshot: works filter FULL-STACK', async ({ page }) => {
    const tracker = setupErrorTracking(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/works', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    const fsBtn = page.locator('.filter-btn', { hasText: 'FULL-STACK' });
    await fsBtn.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('works-filter-fullstack-baseline.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
      animations: 'disabled'
    });

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

  test('Visual snapshot: works filter CYBERSECURITY', async ({ page }) => {
    const tracker = setupErrorTracking(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/works', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    const cyberBtn = page.locator('.filter-btn', { hasText: 'CYBERSECURITY' });
    await cyberBtn.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('works-filter-cybersecurity-baseline.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.05,
      animations: 'disabled'
    });

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

  test('Visual snapshot: project quick-view modal', async ({ page }) => {
    const tracker = setupErrorTracking(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/works', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    const modal = page.locator('#project-modal');
    const firstPreviewBtn = page.locator('.quick-view-btn').first();
    await firstPreviewBtn.click();
    await expect(modal).not.toHaveClass(/hidden/);
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('project-modal-baseline.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled'
    });

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

  test('Visual snapshot: mobile navigation drawer', async ({ page }) => {
    const tracker = setupErrorTracking(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    const openNavBtn = page.locator('#open-nav');
    const mobileNav = page.locator('#mobile-nav');
    await openNavBtn.click();
    await expect(mobileNav).not.toHaveClass(/hidden/);
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('mobile-navigation-open-baseline.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled'
    });

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

  test('Visual snapshot: accordion open state', async ({ page }) => {
    const tracker = setupErrorTracking(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    const firstAccordionTrigger = page.locator('.dropdown-trigger').first();
    await firstAccordionTrigger.click();
    await expect(firstAccordionTrigger).toHaveAttribute('aria-expanded', 'true');
    await firstAccordionTrigger.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('accordion-open-baseline.png', {
      maxDiffPixelRatio: 0.05,
      animations: 'disabled'
    });

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

});
