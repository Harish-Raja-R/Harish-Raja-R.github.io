# Harish Raja R — Personal Portfolio

Official personal engineering portfolio for **Harish Raja R**, AI/ML Engineer and Full-Stack Developer (Integrated M.Sc. AI & ML, Coimbatore Institute of Technology). Built with Astro, Tailwind CSS v4, and modern TypeScript, rendered in a dark grunge aesthetic.

## Tech Stack
- **Framework**: [Astro](https://astro.build/) (Static Site Generation)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Typography**: `@astrojs/fonts` (`Road Rage` Display + `JetBrains Mono` Monospace)
- **Testing**: [Playwright Test](https://playwright.dev/) with native Chromium/Google Chrome execution

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:4321` in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## Automated Browser Testing (Playwright)

Automated testing is configured using Playwright directly hooked into the local real Chrome/Edge browser binary, eliminating flaky remote driver downloads.

### Run All End-to-End Tests
```bash
npm run test:e2e
```

### Capture Responsive Full-Page Screenshots
Generates high-resolution desktop and mobile viewport screenshots into `tests/screenshots/`:
```bash
npm run test:screenshots
```

### Run Visual Regression Snapshots
Compares visual diffs against baseline snapshots in `tests/visual/`:
```bash
npm run test:visual
```

### View Interactive HTML Test Report
```bash
npx playwright show-report
```

---

## License
MIT License &copy; 2026 Harish Raja R. All rights reserved.
