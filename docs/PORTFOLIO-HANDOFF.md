# Portfolio redesign

Branch: `feat/portfolio-studio-2026`
Production destination: `https://shubhamraj.dev` on Netlify. Deployment is left to Shubham.

## What changed

- A new editorial visual system: ink, lime, ivory, DM Sans, and Instrument Serif.
- A functional UI study with two sample reporting periods, three accent colors, and a light/dark switch. Its data is explicitly illustrative.
- Three contribution summaries for Citi, Visa, and Capgemini's banking engagements. No proprietary client screens, source code, or invented business metrics are presented.
- Responsive navigation, native accessible dialogs, an expandable career timeline, all nine existing certifications/courses, and all eight original recommendations with full text.
- The existing GitHub browser retains search, language filtering, sorting, and pagination. It loads on demand, handles rate limits/timeouts, cancels requests on unmount, and retains a useful source link when the API is unavailable.
- Downloadable two-page PDF and editable Markdown résumé, generated from the same career data used by the website.
- Self-hosted fonts with OFL licenses, explicit Netlify settings, useful metadata, canonical URL, sitemap, favicon, and a no-JavaScript contact/résumé fallback.
- Existing `/loader/*` experiments remain available as lazy-loaded routes. Home no longer depends on a loader screen. Existing package versions and lockfile are retained.

## Content decisions

Career dates and titles come from the résumé already in this repository. The recent Visa engagement and Citi accomplishments come from Shubham's previously supplied professional details. Infosys and Capgemini are identified as employers; Visa, Citi, Discover, and Abu Dhabi Bank are identified as client engagements. Experience is consistently stated as **6+ years**.

The original PDF and site list IIT Jodhpur dates as 2024–2026, while previous supplied details list July 2023–December 2025. The redesign keeps the M.Tech qualification and institution and omits the conflicting dates. No dates or degree details have been invented. Employment gaps have not been filled with invented jobs. The full residential street address has been omitted from the public résumé; city and professional contact details remain.

The downloadable résumé uses a readable single-column layout and embedded fonts. Its text can be selected and extracted. Third-party ATS acceptance varies; this is not a guarantee of any particular screening result.

## Editing

- Career, skills, education, and certification data: `src/data/profile.json`.
- Case summaries: `src/components/studio/caseStudies.js`.
- Page composition: `src/components/pages/Home.jsx`.
- Design tokens and typography: `src/index.css`; component and responsive styles: `src/App.css`.
- Original recommendation text: `src/components/layouts/home01/testimonial/testimonialsData.js`.
- Résumé source: `scripts/build_resume.py`. Install `reportlab` and `fonttools` only if regenerating the PDF, then run `python3 scripts/build_resume.py`. It writes the public PDF, the legacy PDF path, and `docs/Shubham-Raj-Resume.md`.

Legacy layout components remain in the repository for reference, but are not imported by the new homepage. Update the new shared profile data for future homepage/résumé changes.

## Netlify

Use Node 22 (22.12 or newer), `npm ci`, and `npm run build`. Publish directory: `dist`. `netlify.toml` already supplies the build command, Node major, publish directory, and SPA redirect. The checked-in PDF and fonts require no Python step on Netlify.

To deploy this revision, select this branch in Netlify or merge the reviewed branch into the production branch yourself. No production deployment or merge was performed in this task.

## Verification

- Production Vite build.
- Node checks for GitHub pagination, search/filter combinations, rate-limit failures, cancellation, and unsafe project URLs: `node --test scripts/repository-checks.test.mjs`.
- Static checks for internal anchors, local assets, font declarations, and résumé consistency.
- Both PDF pages rendered and visually reviewed; embedded fonts and two-page output checked.

Responsive rules cover compact phones, tablets, laptops, and wide displays, plus touch controls and reduced motion. A browser or physical-device session was not run. Before publishing, visually review at 320, 390, 768, 1024, and 1440 px, including keyboard navigation, the mobile menu, dialogs, PDF download, and the UI study. Also check Safari and 200% zoom. Build success alone does not establish behavior on every device.
