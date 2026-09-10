# Shubham Raj — Interface Atlas

An interactive frontend portfolio built around an explorable interface stack, engineering stories, and a working frontend Lab. React + Vite remain the application foundation. The build generates complete HTML for each public route; Three.js is a deferred enhancement.

**Review branch:** `feat/immersive-portfolio-v2`. No production deployment or merge is part of this delivery.

## Run locally

Use Node **22.12+** (or a supported newer Node version). The checked-in `.nvmrc` selects Node 22. The lockfile is authoritative.

```bash
git fetch origin
git switch feat/immersive-portfolio-v2
npm ci
npm run dev
```

Open `http://localhost:5173/`. Development uses Vite's client rendering and HMR. Inspect the actual generated HTML and production loading behavior with:

```bash
npm run build
npm run preview -- --port 4173
```

Open `http://localhost:4173/`. Keep that server running while reviewing. Unknown URLs in Vite preview may use its SPA fallback; **Netlify serves the generated 404 with HTTP status 404**.

## Explore

| URL | Purpose |
| --- | --- |
| `/` | Interactive atlas, selected work trailer, recruiter mode |
| `/work` | Perspective work carousel, linked story index, GitHub Code Observatory |
| `/work/visa` | Current Visa engagement through Infosys; shared frontend architecture |
| `/work/citi` | Prior Citi engagement through Infosys; state, feature delivery, performance |
| `/work/discover` | Discover / Abu Dhabi Bank engagements through Capgemini |
| `/lab` | Five working frontend experiments, implementation notes, optional terminal |
| `/about` | Portrait, career progression, philosophy, education, credentials |
| `/stack` | Capability map connecting tools to work |
| `/recommendations` | Eight original recommendations with relationship context |
| `/resume` | Readable web résumé and ATS-oriented PDF |
| `/contact` | Email, copy action, LinkedIn, GitHub |
| Any unknown route | Interactive component-tree 404 |

Try **Cmd/Ctrl + K**, Recruiter mode, the footer's experience setting, the carousel's arrow keys, and the Lab's controls. The optional terminal lives near the bottom of the Lab.

## Architecture

```text
src/atlas/pages/        Route-level experiences
src/atlas/components/  Shared navigation, carousel, diagrams, recruiter brief
src/atlas/scene/        Semantic atlas controls + dynamically imported Three renderer
src/atlas/lab/          Individually loaded interactive studies
src/atlas/hooks/        Experience preferences, tilt, route transitions
src/atlas/data/         Capability/work map, interaction utilities, original recommendations
src/atlas/seo/          Shared metadata/schema registry, client metadata updates, local events
src/data/profile.json  Maintained professional facts
src/entry-server.jsx   React static prerender entry
scripts/build-site.mjs Client build, static render, route assets, sitemap and robots
```

The legacy `layouts/home01`, old page implementations and loaders remain in source history/the repository for reference. They are not imported by the new application entry. Bootstrap, slick, and FontAwesome do not ship as global CSS in the new experience. V1's PDF generator, factual profile, case-study content, dialog behavior, and resilient GitHub utilities are retained.

### Rendering and technical SEO

`npm run build` produces the browser bundle, an intermediate Vite SSR bundle, and then uses React's `prerenderToNodeStream` to resolve each public route at build time. Route-specific HTML contains the visible main content, one H1, canonical URL, metadata, and JSON-LD. Suspense content must remain inline; the build rejects streaming replacement scripts. The intermediate server bundle is deleted. Netlify requires no Node server at runtime.

Route CSS and initial route modules are discovered from Vite's manifest and included in the generated page. The client hydrates the same component tree and updates metadata during navigation. Titles/descriptions are unique. Schema types include Person, WebSite, ProfilePage, CollectionPage, ContactPage, TechArticle and BreadcrumbList. Employer/client distinctions remain explicit.

The build generates the canonical sitemap and robots output. The checked-in public copies are development conveniences; the metadata registry determines production output. The site-wide social card is `public/og.png`. Case studies use their own title/description with text sharing cards: no invented corporate screenshots or misleading inherited artwork.

Primary implementation references: [React static prerendering](https://react.dev/reference/react-dom/static/prerenderToNodeStream), [Vite SSR integration](https://vite.dev/guide/ssr.html), [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

### 3D and motion

Only **Three.js** was added as a production library. Six procedural interface planes represent actual capabilities. Selecting a layer changes depth and exposes a related work link. Pointer movement and the rotation slider change perspective; scrolling changes layer separation. Semantic React controls remain available without WebGL.

The renderer caps DPR at 1.6 desktop / 1.25 compact, uses six small generated UI textures, draws while settling or responding to input, stops offscreen/in hidden tabs, and disposes geometry, materials, textures, observers and listeners. A delayed dynamic import keeps the renderer outside startup JavaScript. Save Data, low core count, system reduced motion, and the explicit Reduced setting select the lighter experience.

CSS tokens control duration/easing. Browser-native View Transitions provide a short spatial wipe on ordinary internal-link navigation. Unsupported browsers retain the route reveal and normal history. The work reel supports pointer drag, touch swipe, arrow/Home/End keys, direct selection, and horizontal wheel intent; vertical scrolling is not captured. There is no autoplay. Reduced motion removes animation and simplifies depth. The contextual cursor supplements the native cursor on desktop only.

Reference: [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition), [Three.js documentation](https://threejs.org/docs/).

### Accessibility and privacy

Semantic landmarks, a skip link, route H1 focus, visible focus styles, native controls, native dialog focus containment, focus restoration, named carousels, inert inactive slides, labeled state changes, and touch alternatives are built in. Reduced motion has priority over the Full preference. The Lab states communicate with text as well as color.

Recruiter/experience preferences are device-local. `atlas:analytics` CustomEvents expose an optional integration point; no analytics service is connected and no tracking scripts are added. Events contain only an allowlisted name and coarse interaction properties. Do not add email addresses, command queries, or private data to analytics. GitHub fetching begins only when the visitor opens the observatory; it supports pagination, safe URLs, shape validation, search/language/sort, timeout, cancellation, caching, retry, empty states and a known repository fallback.

## Edit content

- **Career, skills, education, résumé facts:** `src/data/profile.json`. Update corresponding story copy in `src/components/studio/caseStudies.js` and summary evidence in `src/atlas/data/atlas.js` when facts change. Keep employer and client relationships distinct.
- **Add a project/story:** add its record to `atlas.js` and `caseStudies.js`, add a metadata entry in `src/atlas/seo/routes.js`, and provide its illustrative architecture in `ArchitectureExplorer.jsx`. Existing `CaseStudy` routing handles the slug. Add it to the route test list. Build verifies static output.
- **Add a route:** create its page, add the lazy route in `src/App.jsx`, add metadata and the build's entry map, then link it through navigation/command data where appropriate.
- **Add a Lab experiment:** create a focused component under `src/atlas/lab`, add its lazy loader and five explanatory notes in `pages/Lab.jsx`. Use native controls and a reduced-motion alternative. Do not label illustrative counters as measurements.
- **Recommendations:** `src/atlas/data/recommendations.js` preserves the original wording. Do not silently rewrite quotes or relationships. The historical source remains in `layouts/home01/testimonial`.
- **Design:** base tokens in `src/index.css`, common/home styles in `src/App.css`, route styles in `src/atlas/pages.css`.

To regenerate the PDF after a factual edit, install Python's `reportlab` and `fonttools`, then run `python scripts/build_resume.py`. Re-render and inspect both PDF pages before committing. The current public and legacy PDFs are identical, embedded-font, two-page files retained from v1.

**Factual conflict requiring owner review:** IIT Jodhpur dates differed between supplied profile material and production. The degree is retained with dates omitted. The website does not invent a resolution, awards, availability, work authorization, or extra years of experience. See `docs/IMMERSIVE-AUDIT.md`.

## Validation

```bash
npm run build
npm test
npm run test:ui
npm run test:hydration
npm audit
```

`npm test` checks 14 scenarios including static content, metadata/schema, safe URLs, GitHub failure/cancellation/filtering, preferences, carousel keys and résumé consistency. DOM interaction tests exercise navigation, command search/activation/focus, recruiter persistence, carousel, Lab controls and 404. Hydration tests verify all 11 generated routes without recoverable errors and run semantic axe checks with color contrast excluded. DOM tests do **not** prove visual layout, contrast, browser-native focus containment, real WebGL rendering, or Core Web Vitals.

For real browser testing on your machine:

```bash
npx playwright install
npm run build
npm run test:e2e
```

The Playwright configuration covers Chromium, Firefox, WebKit and an iPhone profile. The suite includes axe checks, mobile navigation, pointer/keyboard behavior, WebGL fallback, GitHub mock failures, and widths from 320 to 1920. It launches Vite preview on port 4173; stop another server on that port first if it is serving a different project.

Capture reference images with:

```bash
npm run test:e2e -- --project=chromium -g "visual checkpoints"
```

Images appear under `test-results/`. Test definitions were prepared here, but the cross-browser suite and screenshots could not be executed through this environment's approved browser connection. See `docs/qa/VALIDATION.md` for exactly what was measured and what remains.

## Netlify deployment — after local approval

Build command: `npm run build`. Publish directory: `dist`. Node: 22.12+ (Netlify's Node 22 environment is configured). Keep the generated route directories and `404.html`; do not replace the Netlify fallback with a universal 200 rewrite. Canonical host is `https://shubhamraj.dev`; `www` redirects to it. Configure that as the primary custom domain and retain HTTPS. Confirm unknown URLs return 404 and direct case-study requests return route HTML.

Security headers allow same-origin assets and the GitHub API. If you later connect analytics or another external service, explicitly review the CSP and privacy behavior. Fingerprinted assets are immutable; fonts use bounded caching. The known production résumé asset URL redirects to the maintained PDF.

After you deploy, inspect canonical/OG tags and status codes on the live domain, submit `/sitemap.xml` in Search Console, and check the Google and social previews. Technical SEO improves crawlability and presentation; rankings are not guaranteed.
