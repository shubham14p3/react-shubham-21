# Shubham Raj — portfolio

An editorial portfolio built with React 19 and Vite 8: considered typography, an interactive interface study, enterprise contribution stories, and a readable résumé.

**Production:** [shubhamraj.dev](https://shubhamraj.dev/)
**Redesign branch:** `feat/portfolio-studio-2026`

## Run locally

Use Node 22.12+ (or a compatible newer version).

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

Netlify publishes `dist`. Build settings and the SPA redirect are in `netlify.toml`. Deploying or merging this branch is a separate decision; it does not replace the production branch by itself.

## Verification

```bash
node --test scripts/repository-checks.test.mjs
```

The targeted tests cover repository search, filtering, pagination, cancellation, API failures, and unsafe URL handling. The production build and server rendering have also been checked. A browser/device review remains appropriate before production deployment.

## Content and résumé

- `src/data/profile.json` — professional facts, skills, education, and certifications.
- `src/components/pages/Home.jsx` — page sections and composition.
- `src/components/studio/` — interface study, contribution stories, dialogs, and repository explorer.
- `src/index.css` and `src/App.css` — design tokens, local fonts, component styles, and responsive rules.
- `public/shubham-raj-resume.pdf` — downloadable résumé.
- `docs/Shubham-Raj-Resume.md` — editable text version.

To regenerate the résumé after editing the profile, install Python packages `reportlab` and `fonttools`, then run `python3 scripts/build_resume.py`. Netlify uses the checked-in PDF and does not require Python.

See [the handoff](docs/PORTFOLIO-HANDOFF.md) for the full change summary, content decisions, and publishing notes. Fonts are bundled with their OFL licenses.
