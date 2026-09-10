# Interface Atlas — audit and creative direction

Audited 10 September 2026 before implementation. Base: `feat/portfolio-studio-2026` at `de25eb4`; production/default: `master` at `0df2c6c`.

| Area | Production / master | Studio v1 | V2 decision |
| --- | --- | --- | --- |
| Identity | Color portrait, changing expertise states, substantial personal detail | Stronger positioning; flatter editorial composition | Keep recognizable portrait and active expertise; introduce spatial composition |
| Interaction | Expertise buttons, career accordion/dialogs, moving credentials and recommendations, loader experiments | Functional demo and dialogs, but predictable vertical sections | Meaningful 3D capability map, depth carousel, dedicated Lab, keyboard tools |
| Career | Employer history intact; conflicting 5.5/6.5/7-year labels | Central profile, current Visa/Citi attribution, qualified metrics | Reuse central facts, conservative 6+ years; distinguish client from employer everywhere |
| Assets | Portrait, eight recommendation portraits, original quote text, certificate images, legacy illustrations | Self-hosted licensed fonts; embedded-font ATS PDF | Preserve originals; optimize selected portraits; keep PDF |
| GitHub | Search/filter functionality | URL validation, timeout/abort, pagination, error/retry/cache, known fallback | Reuse robust integration in Code Observatory |
| SEO | Live HTML has generic description, empty React root, no canonical/schema | Canonical, Person, OG text, sitemap/robots | Route-specific static HTML, metadata, schema, sitemap, social artwork |
| Accessibility | Some labels, semantic controls, responsive CSS | Focus-managed dialogs, skip link, reduced motion, semantic actions | Keep these; keyboard scene/carousel, route focus, native dialogs, full reduced experience |
| Performance | Global framework/icon/carousel CSS and animated loader | Removed global legacy CSS; lazy repositories/loaders | Route splits, lazy Three, adaptive DPR, offscreen pause, resource disposal, no intro gate |
| Dependencies | React 19, Vite 8, Router 7, slick, Bootstrap, FontAwesome, web-vitals | No added production dependencies | Add only Three.js for the signature spatial renderer; CSS/WAAPI for UI motion |
| Legacy | `layouts/home01`, loader routes and old image collection | Retained in source; not active on homepage | Archive through git history/source; exclude unused imports from production path |

## Concept: Interface Atlas

A living map of the systems behind memorable interfaces. A graphite architectural stage, warm white type, and signal orange selections. The first viewport is a single spatial composition: large identity, layered interface planes, and evidence-bearing controls. Selecting a plane exposes its role and a path into real work. The homepage is a trailer; substantial reading belongs on dedicated routes.

Interaction hierarchy: (1) spatial selection and work transitions explain relationships, (2) scroll depth supplies context, (3) small springs and focus/hover states supply feedback. No forced loader, particles for their own sake, fabricated corporate screenshots, or constant background motion. Touch gets direct selection, swipe, and rotation controls. Reduced experience remains visually complete and information-equivalent.

## Professional source boundaries

Use `src/data/profile.json` and original recommendation text as the maintained sources. Infosys is the employer for Visa (current) and Citi (prior). Discover / Abu Dhabi Bank figures refer to Capgemini engagements collectively, not a claimed metric for either individual bank. Demo architecture and sample UI are clearly illustrative and do not disclose corporate implementation. No awards or new career results are invented.

Unresolved source conflict: production lists IIT Jodhpur 2024–2026 while previously supplied profile dates were July 2023–December 2025. Keep degree name but omit dates pending owner verification. Preserve the existing documented conflict. Do not infer current hiring availability or work authorization.

## Runtime audit boundary

Production was inspected in the live browser and through its delivered HTML. Master and v1 were inspected through source and branch comparisons. The supervised local preview runs, but the cloud browser returned `ERR_BLOCKED_BY_CLIENT` for its approved address. This is an environment restriction, not evidence that the implementation passes browser/device QA. Record local reproducible tests and remaining manual checks honestly.

## Technical references

Vite's native SSR build supports producing static route HTML without a framework migration: https://vite.dev/guide/ssr.html . Google recommends making critical content available to rendering/indexing and using real links: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics . Three.js renderer lifecycle is documented at https://threejs.org/docs/ .
