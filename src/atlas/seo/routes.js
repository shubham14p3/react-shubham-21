export const origin = "https://shubhamraj.dev";
export const routeMeta = {
  "/": {
    title: "Shubham Raj — Senior Frontend Engineer | React, TypeScript & UI",
    description:
      "Explore Shubham Raj’s interactive portfolio. Senior Frontend Engineer in Mexico City, building enterprise React, TypeScript, and Next.js interfaces. Current Visa engagement through Infosys.",
    type: "ProfilePage",
  },
  "/work": {
    title: "Frontend Engineering Work — Shubham Raj",
    description:
      "Engineering stories from Shubham Raj’s Visa and Citi engagements through Infosys and banking work through Capgemini. React architecture, performance, and reusable UI.",
    type: "CollectionPage",
  },
  "/work/visa": {
    title: "Visa Engagement: Shared Frontend Architecture — Shubham Raj",
    description:
      "Shubham Raj’s current Visa client engagement through Infosys: enterprise React, TypeScript, shared monorepo architecture, and coordinated frontend delivery.",
    type: "TechArticle",
  },
  "/work/citi": {
    title: "Citi Engagement: React Performance Engineering — Shubham Raj",
    description:
      "Shubham Raj’s Citi engagement through Infosys: 20+ frontend features, 40% better page load performance, and 35% fewer unnecessary re-renders.",
    type: "TechArticle",
  },
  "/work/discover": {
    title: "Banking UI Engineering at Capgemini — Shubham Raj",
    description:
      "Discover and Abu Dhabi Bank client engagements through Capgemini: reusable React interfaces, 50+ features, component refactoring, testing, and performance.",
    type: "TechArticle",
  },
  "/lab": {
    title: "Interactive Frontend Lab — Shubham Raj",
    description:
      "Try Shubham Raj’s frontend experiments: spring physics, CSS 3D interaction, design tokens, render propagation, and human-reviewed AI-assisted engineering.",
    type: "CollectionPage",
  },
  "/about": {
    title: "About Shubham Raj — Senior Frontend Engineer in Mexico City",
    description:
      "Meet Shubham Raj, a frontend engineer with 6+ years across Infosys, Capgemini, Gammastack, and Nagravision. React, TypeScript, Next.js, quality, and product craft.",
    type: "ProfilePage",
  },
  "/stack": {
    title: "React, TypeScript & Frontend Architecture — Shubham Raj",
    description:
      "Explore Shubham Raj’s engineering capabilities and related work: React, Next.js, TypeScript, design systems, state, accessibility, performance, and AI-assisted development.",
    type: "CollectionPage",
  },
  "/recommendations": {
    title: "Professional Recommendations — Shubham Raj",
    description:
      "Read original professional recommendations for Shubham Raj from colleagues, collaborators, and mentors, with their relationship and career context preserved.",
    type: "CollectionPage",
  },
  "/resume": {
    title: "Shubham Raj — Frontend Engineer Résumé & PDF",
    description:
      "Read or download Shubham Raj’s résumé: Senior Frontend Engineer in Mexico City with enterprise React, TypeScript, Next.js, banking, payments, and UI architecture experience.",
    type: "ProfilePage",
  },
  "/contact": {
    title: "Contact Shubham Raj — Senior Frontend Engineer",
    description:
      "Contact Shubham Raj about frontend engineering, enterprise React products, UI architecture, and design systems. Based in Mexico City with experience across India and Mexico.",
    type: "ContactPage",
  },
};
export const normalizePath = (path) =>
  path !== "/" ? path.replace(/\/+$/, "") : "/";
export function metadataFor(path) {
  return (
    routeMeta[normalizePath(path)] || {
      title: "Page Not Found — Shubham Raj",
      description:
        "This route is not part of Shubham Raj’s interface atlas. Explore the work, frontend lab, or contact page.",
      type: "WebPage",
      noindex: true,
    }
  );
}
export function schemasFor(path) {
  const pathname = normalizePath(path);
  const meta = metadataFor(pathname);
  const url = `${origin}${pathname === "/" ? "" : pathname}`;
  const person = {
    "@type": "Person",
    "@id": `${origin}/#person`,
    name: "Shubham Raj",
    url: origin,
    jobTitle: "Senior Frontend Engineer",
    description:
      "Frontend engineer with 6+ years of professional experience. Senior Associate Consultant at Infosys, currently supporting Visa in Mexico City.",
    image: `${origin}/images/shubham-549.webp`,
    worksFor: { "@type": "Organization", name: "Infosys" },
    homeLocation: { "@type": "City", name: "Mexico City" },
    sameAs: [
      "https://github.com/shubham14p3",
      "https://www.linkedin.com/in/shubham14p3/",
    ],
    knowsAbout: [
      "React",
      "JavaScript",
      "TypeScript",
      "Next.js",
      "Frontend Engineering",
      "UI Engineering",
      "Design Systems",
      "Performance",
      "Accessibility",
      "Testing",
      "AI-assisted Engineering",
    ],
  };
  const page = {
    "@type": meta.type,
    "@id": `${url}#page`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: "en",
    isPartOf: { "@id": `${origin}/#website` },
    ...(meta.type === "ProfilePage"
      ? { mainEntity: { "@id": `${origin}/#person` } }
      : { about: { "@id": `${origin}/#person` } }),
    ...(meta.type === "TechArticle"
      ? {
          headline: meta.title,
          author: { "@id": `${origin}/#person` },
          articleSection: "Frontend Engineering",
          copyrightHolder: { "@id": `${origin}/#person` },
        }
      : {}),
  };
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: origin },
  ];
  if (pathname.startsWith("/work/"))
    crumbs.push({
      "@type": "ListItem",
      position: 2,
      name: "Work",
      item: `${origin}/work`,
    });
  if (pathname !== "/" && !meta.noindex)
    crumbs.push({
      "@type": "ListItem",
      position: crumbs.length + 1,
      name: meta.title.split(" — ")[0],
      item: url,
    });
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        name: "Shubham Raj — Interface Atlas",
        url: origin,
        inLanguage: "en",
        publisher: { "@id": `${origin}/#person` },
      },
      page,
      ...(meta.noindex
        ? []
        : [{ "@type": "BreadcrumbList", itemListElement: crumbs }]),
    ],
  };
}
export function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (ch) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        ch
      ],
  );
}
export function serializeSchema(schema) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
export function headFor(path) {
  const meta = metadataFor(path);
  const canonical = `${origin}${normalizePath(path) === "/" ? "" : normalizePath(path)}`;
  const image =
    !path.startsWith("/work/") && !meta.noindex ? `${origin}/og.png` : null;
  return `<title>${escapeHtml(meta.title)}</title>\n<meta name="description" content="${escapeHtml(meta.description)}">\n<meta name="robots" content="${meta.noindex ? "noindex, follow" : "index, follow"}">\n<link rel="canonical" href="${escapeHtml(canonical)}">\n<meta property="og:type" content="${meta.type === "TechArticle" ? "article" : "website"}">\n<meta property="og:site_name" content="Shubham Raj — Interface Atlas">\n<meta property="og:title" content="${escapeHtml(meta.title)}">\n<meta property="og:description" content="${escapeHtml(meta.description)}">\n<meta property="og:url" content="${escapeHtml(canonical)}">\n<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}">\n<meta name="twitter:title" content="${escapeHtml(meta.title)}">\n<meta name="twitter:description" content="${escapeHtml(meta.description)}">\n${image ? `<meta property="og:image" content="${image}">\n<meta property="og:image:alt" content="Shubham Raj, Senior Frontend Engineer — Interface Atlas">\n<meta name="twitter:image" content="${image}">` : ""}\n<script type="application/ld+json" id="atlas-schema">${serializeSchema(schemasFor(path))}</script>`;
}
