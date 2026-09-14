import { Page, expect } from '@playwright/test';

export interface ErrorTracker {
  consoleErrors: string[];
  pageErrors: string[];
  failedRequests: { url: string; status: number }[];
}

export function setupErrorTracking(page: Page): ErrorTracker {
  const tracker: ErrorTracker = {
    consoleErrors: [],
    pageErrors: [],
    failedRequests: []
  };

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Filter out harmless browser noise if any
      if (!text.includes('favicon.ico')) {
        tracker.consoleErrors.push(text);
      }
    }
  });

  page.on('pageerror', (err) => {
    tracker.pageErrors.push(err.message);
  });

  page.on('response', (response) => {
    const status = response.status();
    const url = response.url();
    if ((status === 404 || status >= 500) && !url.includes('does-not-exist') && !url.includes('/404')) {
      tracker.failedRequests.push({ url, status });
    }
  });

  return tracker;
}

export async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');

  // Disable smooth scrolling to prevent ongoing scroll momentum during screenshotting
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });

  // Wait for web fonts to complete loading
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
  });

  // Ensure images are loaded and decoded safely with a timeout
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img')).filter(
      (img) => img.src && !img.src.startsWith('data:') && img.src.length > 0
    );
    await Promise.all(
      images.map((img) => {
        return new Promise<void>((resolve) => {
          if (img.complete) {
            if (typeof img.decode === 'function') {
              img.decode().then(() => resolve()).catch(() => resolve());
            } else {
              resolve();
            }
          } else {
            const timer = setTimeout(() => resolve(), 2000);
            img.onload = () => { clearTimeout(timer); resolve(); };
            img.onerror = () => { clearTimeout(timer); resolve(); };
          }
        });
      })
    );
  });

  // Allow network requests to settle for images and assets
  try {
    await page.waitForLoadState('networkidle', { timeout: 3000 });
  } catch {
    // Non-fatal if networkidle doesn't fire immediately
  }

  // Pre-scroll the page to force rendering of offscreen elements on tall case study pages
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 150));
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
}

export async function assertVisualSanity(page: Page, expectedViewportWidth: number): Promise<void> {
  // 1. Assert no horizontal overflow on mobile / desktop
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  
  // Allow at most 1px rounding tolerance
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

  // 2. Assert no forbidden template / placeholder text in page content
  const textContent = await page.evaluate(() => document.body.innerText || '');
  const forbiddenPatterns = ['Peter Jones', 'Lorem ipsum', 'placeholder', 'dummy'];
  for (const pattern of forbiddenPatterns) {
    expect(textContent.toLowerCase()).not.toContain(pattern.toLowerCase());
  }

  // 3. Assert all images have alt attributes
  const imageHealth = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs.map((img) => ({
      src: img.src,
      alt: img.alt,
      hasAlt: img.hasAttribute('alt')
    }));
  });

  for (const img of imageHealth) {
    expect(img.hasAlt).toBe(true);
  }
}
