import { test, expect } from '@playwright/test';
import path from 'node:path';
import { waitForPageReady, setupErrorTracking, assertVisualSanity } from './test-utils';

const screenshotsDir = path.resolve('tests', 'screenshots');

test.describe('Interactive Feature Verification', () => {

  // TEST 1 — WORK FILTERS
  test('TEST 1: Work Filters on /works', async ({ page }) => {
    const tracker = setupErrorTracking(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/works', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    // Initial state: ALL filter active
    const allCards = page.locator('.project-card');
    const totalCount = await allCards.count();
    expect(totalCount).toBeGreaterThanOrEqual(6);

    await page.screenshot({
      path: path.join(screenshotsDir, 'works-filter-all.png'),
      fullPage: true
    });

    // Filter by AI/ML
    const aiBtn = page.locator('.filter-btn', { hasText: 'AI/ML' });
    await aiBtn.click();
    await page.waitForTimeout(300);

    // Verify visible cards changed
    const visibleAiCards = page.locator('.project-card:visible');
    const aiCount = await visibleAiCards.count();
    expect(aiCount).toBeGreaterThan(0);
    expect(aiCount).toBeLessThan(totalCount);

    await page.screenshot({
      path: path.join(screenshotsDir, 'works-filter-ai.png'),
      fullPage: true
    });

    // Filter by FULL-STACK
    const fullstackBtn = page.locator('.filter-btn', { hasText: 'FULL-STACK' });
    await fullstackBtn.click();
    await page.waitForTimeout(300);

    const visibleFsCards = page.locator('.project-card:visible');
    const fsCount = await visibleFsCards.count();
    expect(fsCount).toBeGreaterThan(0);

    await page.screenshot({
      path: path.join(screenshotsDir, 'works-filter-fullstack.png'),
      fullPage: true
    });

    // Filter by CYBERSECURITY
    const cyberBtn = page.locator('.filter-btn', { hasText: 'CYBERSECURITY' });
    await cyberBtn.click();
    await page.waitForTimeout(300);

    const visibleCyberCards = page.locator('.project-card:visible');
    const cyberCount = await visibleCyberCards.count();
    expect(cyberCount).toBeGreaterThan(0);

    await page.screenshot({
      path: path.join(screenshotsDir, 'works-filter-cybersecurity.png'),
      fullPage: true
    });

    // Re-verify ALL returns all cards
    const allFilterBtn = page.locator('.filter-btn', { hasText: 'ALL' });
    await allFilterBtn.click();
    await page.waitForTimeout(300);
    const restoredCards = await page.locator('.project-card:visible').count();
    expect(restoredCards).toBe(totalCount);

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

  // TEST 2 — PROJECT MODAL
  test('TEST 2: Project Quick-View Modal on /works', async ({ page }) => {
    const tracker = setupErrorTracking(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/works', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    const modal = page.locator('#project-modal');
    await expect(modal).toHaveClass(/hidden/);

    // Click the first PREVIEW button
    const firstPreviewBtn = page.locator('.quick-view-btn').first();
    await firstPreviewBtn.click();

    // Verify modal appears and has appropriate accessibility attributes
    await expect(modal).not.toHaveClass(/hidden/);
    await expect(modal).toHaveAttribute('role', 'dialog');
    await expect(modal).toHaveAttribute('aria-modal', 'true');

    // Verify project title appears
    const modalTitle = page.locator('#modal-title');
    await expect(modalTitle).not.toBeEmpty();

    // Verify technology tags appear
    const techTags = page.locator('#modal-tech-container span');
    await expect(techTags.first()).toBeVisible();

    // Verify case study / repo action appears
    const caseStudyLink = page.locator('#modal-case-study-link');
    await expect(caseStudyLink).toBeVisible();

    // Capture screenshot of open modal
    await page.screenshot({
      path: path.join(screenshotsDir, 'project-modal.png'),
      fullPage: false
    });

    // Press Escape to verify modal closes
    await page.keyboard.press('Escape');
    await expect(modal).toHaveClass(/hidden/);

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

  // TEST 3 — MOBILE NAVIGATION
  test('TEST 3: Mobile Navigation Drawer (390x844)', async ({ page }) => {
    const tracker = setupErrorTracking(page);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    const openNavBtn = page.locator('#open-nav');
    await expect(openNavBtn).toBeVisible();

    const mobileNav = page.locator('#mobile-nav');
    await expect(mobileNav).toHaveClass(/hidden/);

    // Open mobile nav
    await openNavBtn.click();
    await expect(mobileNav).not.toHaveClass(/hidden/);
    await expect(mobileNav).toHaveAttribute('role', 'dialog');
    await expect(mobileNav).toHaveAttribute('aria-modal', 'true');

    // Capture open navigation
    await page.screenshot({
      path: path.join(screenshotsDir, 'mobile-navigation-open.png'),
      fullPage: false
    });

    // Press Escape to verify it closes
    await page.keyboard.press('Escape');
    await expect(mobileNav).toHaveClass(/hidden/);

    // Also verify close button works
    await openNavBtn.click();
    await expect(mobileNav).not.toHaveClass(/hidden/);
    const closeNavBtn = page.locator('#close-nav');
    await closeNavBtn.click();
    await expect(mobileNav).toHaveClass(/hidden/);

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

  // TEST 4 — ACCORDIONS
  test('TEST 4: Capabilities & FAQ Accordions on /', async ({ page }) => {
    const tracker = setupErrorTracking(page);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    const firstAccordionTrigger = page.locator('.dropdown-trigger').first();
    await expect(firstAccordionTrigger).toBeVisible();

    // Verify initial aria-expanded is false
    await expect(firstAccordionTrigger).toHaveAttribute('aria-expanded', 'false');

    // Click accordion
    await firstAccordionTrigger.click();

    // Verify aria-expanded changes to true
    await expect(firstAccordionTrigger).toHaveAttribute('aria-expanded', 'true');

    // Scroll into view if needed and screenshot
    await firstAccordionTrigger.scrollIntoViewIfNeeded();
    await page.screenshot({
      path: path.join(screenshotsDir, 'accordion-open.png'),
      fullPage: false
    });

    // Click again to toggle close
    await firstAccordionTrigger.click();
    await expect(firstAccordionTrigger).toHaveAttribute('aria-expanded', 'false');

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

  // TEST 5 — CONTACT CONSOLE
  test('TEST 5: Contact Console on /contact', async ({ page, context }) => {
    const tracker = setupErrorTracking(page);
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/contact', { waitUntil: 'domcontentloaded' });
    await waitForPageReady(page);

    // Verify email info exists
    const emailText = page.locator('text=harishatgithub@gmail.com').first();
    await expect(emailText).toBeVisible();

    // Verify social links exist and are visible
    const githubLink = page.locator('main a[href="https://github.com/Harish-Raja-R"], footer a[href="https://github.com/Harish-Raja-R"]').first();
    const linkedinLink = page.locator('main a[href="https://linkedin.com/in/harish-raja-r"], footer a[href="https://linkedin.com/in/harish-raja-r"]').first();
    await expect(githubLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();

    // Verify form inputs exist
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#subject')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();

    // Test clipboard copy action
    const copyBtn = page.locator('#copy-email-btn');
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();

    // Check button updated state or clipboard content
    await expect(copyBtn).toContainText('EMAIL COPIED');

    // Capture contact screenshot
    await page.screenshot({
      path: path.join(screenshotsDir, 'contact.png'),
      fullPage: true
    });

    expect(tracker.consoleErrors).toEqual([]);
    expect(tracker.pageErrors).toEqual([]);
    expect(tracker.failedRequests).toEqual([]);
  });

  // TEST 6 — PROJECT CASE STUDIES
  const caseStudies = [
    { slug: 'neurocollab', title: 'NeuroCollab' },
    { slug: 'semirestore-ai', title: 'SemiRestore-AI' },
    { slug: 'aura', title: 'A.U.R.A.' },
    { slug: 'complyone', title: 'ComplyOne' },
    { slug: 'vultra', title: 'Vultra' },
    { slug: 'scamcheck', title: 'ScamCheck' }
  ];

  for (const cs of caseStudies) {
    test(`TEST 6: Project Case Study /works/${cs.slug}`, async ({ page }) => {
      const tracker = setupErrorTracking(page);
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/works/${cs.slug}`, { waitUntil: 'domcontentloaded' });
      await waitForPageReady(page);
      await assertVisualSanity(page, 1440);

      // Verify title (case-insensitive due to font-grunge uppercase styling)
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      await expect(h1).toContainText(cs.title, { ignoreCase: true });

      // Verify description
      const desc = page.locator('.markdown-content, main').first();
      await expect(desc).toBeVisible();

      // Verify verified metrics exist
      const metrics = page.locator('text=VERIFIED BENCHMARK');
      expect(await metrics.count()).toBeGreaterThanOrEqual(1);

      // Verify tech stack pills exist
      const techSection = page.locator('text=ENGINEERING TECH STACK');
      await expect(techSection).toBeVisible();

      // Verify architecture figures exist
      const fig1 = page.locator('text=FIG 01 // SYSTEM ARCHITECTURE');
      await expect(fig1).toBeVisible();

      // Verify repository or case study link exists
      const repoLink = page.locator('a:has-text("GITHUB REPOSITORY"), a:has-text("ALL WORKS")').first();
      await expect(repoLink).toBeVisible();

      // Verify back navigation
      const backLink = page.locator('a[href="/works"]').first();
      await expect(backLink).toBeVisible();

      // Capture full-page screenshot
      await page.screenshot({
        path: path.join(screenshotsDir, `case-study-${cs.slug}.png`),
        fullPage: true
      });

      expect(tracker.consoleErrors).toEqual([]);
      expect(tracker.pageErrors).toEqual([]);
      expect(tracker.failedRequests).toEqual([]);
    });
  }

});
