# Interface Atlas validation and local review

## Completed in this environment

- Audited production in the live browser, including the opening visual composition and semantic page content. Compared `master` and `feat/portfolio-studio-2026` before editing.
- Production Vite build generates 11 canonical route documents plus `404.html`.
- Fourteen Node tests cover interaction utilities, GitHub filtering/pagination/cancellation/error/shape validation, static content, route metadata/schema, sitemap, and résumé consistency.
- React DOM integration tests cover actual component state and navigation: capability selection, keyboard carousel, command palette search/focus/activation, recruiter preference persistence, Lab component state, and unknown routes.
- All 11 generated route documents hydrate without recoverable errors in the DOM test environment. Axe semantic checks pass on all 11; color contrast is deliberately excluded from this DOM-only check and must be checked in a real browser.
- Generated HTML is checked for a visible main tree, one H1, complete assets and parseable JSON-LD. Streaming replacement scripts and hidden Suspense payloads are rejected by the build.
- All npm audit advisories were resolved using compatible updates; the final audit reported zero vulnerabilities. This is a point-in-time registry check, not a guarantee against future findings.
- The existing two-page ATS PDF remains byte-identical across the public and retained legacy source paths. No résumé facts or testimonial wording were invented.
- Original social artwork generated and visually inspected; corrected once for proper name spacing. Portrait derivatives are optimized WebP encodings of existing repository photographs.

## Measured file sizes

See `bundle-report.json` for exact generated filenames, byte sizes, gzip sizes and timestamp. These are distribution-file measurements, not measured browser performance. The Three.js renderer is deferred and intentionally reported separately. Vite's >500 KB raw-chunk warning for that deferred renderer is retained rather than hidden.

The final measured homepage startup is 89,059 bytes of gzip JavaScript (about 87.0 KiB) and 8,906 bytes of gzip CSS (about 8.7 KiB). The separate WebGL chunk is 536,299 raw bytes / 133,031 gzip bytes (about 129.9 KiB gzip). These totals exclude HTML, fonts, images and later route/experiment chunks.

## Browser limitation — unresolved

The supervised local preview started successfully. The approved cloud browser returned `ERR_BLOCKED_BY_CLIENT` for its local preview address. Production itself was accessible, but the new local implementation was not. No alternate browser-control mechanism was used.

Consequently, **the new site's visual acceptance, GPU output, Chrome/Firefox/Safari rendering, real device gestures, 200% zoom, slow network/CPU behavior, native focus containment and Lighthouse/Core Web Vitals remain unverified**. The browser test suite is provided for local execution; it was not passed here. No new-site screenshot or Lighthouse score is claimed. This branch is for local review, not a production sign-off.

Playwright successfully discovers 80 project/test combinations across four browser/device configurations. Discovery verifies that the suite loads; it does not mean those browser tests ran or passed.

## Exact review URLs

After `npm run build` and `npm run preview -- --port 4173`:

- http://localhost:4173/
- http://localhost:4173/work
- http://localhost:4173/work/visa
- http://localhost:4173/work/citi
- http://localhost:4173/work/discover
- http://localhost:4173/lab
- http://localhost:4173/about
- http://localhost:4173/stack
- http://localhost:4173/recommendations
- http://localhost:4173/resume
- http://localhost:4173/contact
- http://localhost:4173/not-a-route

Useful anchors: `/lab#spring`, `/lab#depth`, `/lab#tokens`, `/lab#render`, `/lab#human-ai`, `/about#experience`, `/work/citi#performance`, `/work#github`.

## Ten-point visual and interaction review

1. **Opening:** at 1440 and 1920 px, move over the atlas, select all six layers, and rotate it. Check that the chosen plane and evidence make the same point and that typography does not collide with it.
2. **Small phones:** at 320, 360, 375, 390 and 430 px, read the headline, use every atlas control, and reach résumé/contact without horizontal page scrolling.
3. **Intermediate layouts:** at 768, 1024 and 1280 px, inspect the hero, carousel neighbors, case diagrams, portrait and footer. Check portrait and landscape.
4. **Work reel:** swipe/drag in both directions, try the arrows and Home/End keys, then open each active story. Vertical page scrolling must remain natural.
5. **Routes:** follow internal links, use Back/Forward, reload a deep route, and inspect the transition. Confirm the heading receives keyboard focus and old section bookmarks still land somewhere useful.
6. **Lab:** move the spring, change tension/damping, adjust depth, change design tokens, compare render scopes and step through the AI workflow. Verify clear selected, success and disabled states.
7. **Keyboard and dialogs:** use Tab only, Cmd/Ctrl+K, arrow search and Enter. Open/close the mobile menu and recommendation dialog. Escape must close; focus must return to the trigger.
8. **Reduced/fallback:** enable OS reduced motion, then the explicit Reduced preference. Try unavailable WebGL and a slow device/network. Content and navigation must remain complete without the GPU scene.
9. **Recruiter path and downloads:** enable Recruiter mode from a deep page, reload, review employment/client wording and metrics, open the PDF, and test email/copy/GitHub/LinkedIn. Confirm education dates separately.
10. **Accessibility and delivery:** inspect 200% browser zoom, text contrast, screen-reader labels, Chrome/Firefox/Safari, GitHub error/empty states and 404. Run the provided e2e/axe suite and Lighthouse on the production preview before deployment.

## Local browser and performance commands

```bash
npx playwright install
npm run build
npm run test:e2e
npm run test:e2e -- --project=chromium -g "visual checkpoints"
```

For Lighthouse, keep `npm run preview -- --port 4173` running and use Chrome DevTools → Lighthouse. Audit mobile navigation with default throttling and also record an unthrottled desktop trace. Run three times and report median values, browser/version, CPU/network settings and commit. Inspect LCP, CLS and interaction responsiveness in Performance/Insights; do not present a Lighthouse score as field INP. Test both Full and Reduced preferences, starting with clean local preferences.

Targets remain LCP under 2.5 seconds, CLS under 0.1 and field INP under 200 ms where realistic. Actual field data can only be assessed after enough real traffic exists.
