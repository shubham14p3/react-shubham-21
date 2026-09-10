# Assets and dependency decisions

## Production dependency

**Three.js 0.186.0** supplies the signature procedural interface stack and resource-managed WebGL renderer. Direct Three.js avoids adding React Three Fiber, Drei, GSAP, Motion and another carousel library. CSS handles interface motion and depth; a small bounded spring handles the Lab physics. The existing Router was updated to 7.18.3 and Vite to 8.2.2 with compatible security updates in the lockfile.

## New development dependencies

- `@playwright/test`: reproducible browser, gesture, responsive and navigation checks.
- `@axe-core/playwright`: automated accessibility checks in real browser runs.
- `jsdom`: offline React interaction and hydration checks; it is not a substitute for visual/browser validation.

Legacy Bootstrap, FontAwesome and slick dependencies remain compatible with archived components; the new app does not import their global CSS or use their carousel implementation.

## Existing personal assets

`public/images/shubham-360.webp` and `shubham-549.webp` derive from the existing portrait `src/assets/images/section/03.png`. The eight recommendation thumbnails derive from the original testimonial photographs. No face, clothing, or professional identity was regenerated. Original assets remain in the repository.

DM Sans fonts are self-hosted with their OFL license. The v1 Instrument Serif asset and license remain available, but the new interface does not load that font.

## Social artwork

Final site asset: `public/og.png` (1733 × 907). Generated with the built-in image-generation tool using an asset-only GPT-6 Astra agent; the site code was integrated by the primary agent. One correction clarified the word spacing in “SHUBHAM RAJ.” This is a brand illustration, not a screenshot of the website or a company product.

Original prompt:

> Create one premium landscape portfolio social card, approximately 1.91:1. A near-black graphite architectural studio with a sophisticated 3D stack of machined interface planes, beveled edges and one restrained signal orange (#ff7248) edge. Spacious Swiss-inspired warm ivory typography. Exact text only: “SHUBHAM RAJ”, “Senior Frontend Engineer”, “INTERFACE ATLAS”. Large readable name, clear supporting type, generous margins. No extra text, logos, watermark, portrait, fake companies or awards, UI screenshots, cyberpunk, random particles or neon glow.

Correction: preserve composition, sculpture and other text; show “SHUBHAM RAJ” with a clear word space, reducing the name size slightly if necessary.

Corporate case visuals are abstract UI/system demonstrations implemented as code. Each is labeled illustrative. They do not reproduce confidential enterprise source code or screens.
