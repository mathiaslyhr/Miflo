---
name: verify
description: Build, serve, and screenshot the Miflo marketing site to verify visual changes at its real surface (the rendered pages).
---

# Verifying the Miflo site

1. Build + serve prod (dev serves stale Turbopack caches — always `rm -rf .next` first):
   ```bash
   rm -rf .next && npm run build && npm start -- -p 3456 &
   ```
2. Screenshot with Playwright. No playwright dep in this repo; install `playwright-core`
   in a scratch dir and launch the cached headless shell directly:
   ```js
   // executablePath: ~/Library/Caches/ms-playwright/chromium_headless_shell-<ver>/chrome-headless-shell-mac-arm64/chrome-headless-shell
   const browser = await chromium.launch({ executablePath, headless: true });
   ```
   (The `chromium-<ver>` cache dirs hold "Google Chrome for Testing.app", not the
   `chrome-mac/Chromium.app` path playwright-core guesses.)
3. Worth capturing: `/` at 1600px (hero floating cards are `lg+` only) and 390px,
   full-page for the games/moments sections, `/faq`, and `/opengraph-image`.
4. Wait ~1.8s after load before screenshotting — hero entrance animations stagger in.
