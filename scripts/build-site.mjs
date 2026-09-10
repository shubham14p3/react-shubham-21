import { build } from "vite";
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { routeMeta, headFor, origin } from "../src/atlas/seo/routes.js";
await build({ build: { manifest: true } });
await build({
  build: {
    ssr: "src/entry-server.jsx",
    outDir: ".ssr",
    emptyOutDir: true,
    copyPublicDir: false,
  },
});
const { render } = await import(resolve(".ssr/entry-server.js"));
const template = await readFile("dist/index.html", "utf8");
const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
const entryFor = {
  "/work": "Work",
  "/lab": "Lab",
  "/about": "About",
  "/stack": "Stack",
  "/recommendations": "Recommendations",
  "/resume": "Resume",
  "/contact": "Contact",
  "/404": "NotFound",
};
function routeAssets(path) {
  const name = path.startsWith("/work/") ? "CaseStudy" : entryFor[path];
  if (!name) return "";
  const key = `src/atlas/pages/${name}.jsx`;
  const seen = new Set();
  const css = new Set();
  function collect(id) {
    if (seen.has(id) || !manifest[id]) return;
    seen.add(id);
    const chunk = manifest[id];
    (chunk.css || []).forEach((file) => css.add(file));
    (chunk.imports || []).forEach(collect);
  }
  collect(key);
  return (
    [...css]
      .filter((file) => !template.includes(file))
      .map((file) => `<link rel="stylesheet" href="/${file}">`)
      .join("\n") +
    (manifest[key]
      ? `\n<link rel="modulepreload" href="/${manifest[key].file}">`
      : "")
  );
}
for (const path of [...Object.keys(routeMeta), "/404"]) {
  const app = await render(path);
  if (app.includes("<script>") || app.includes('hidden id="S:'))
    throw new Error(`Streaming output is not valid static content: ${path}`);
  const html = template
    .replace(
      "<!--atlas-head-->",
      () => headFor(path) + "\n" + routeAssets(path),
    )
    .replace("<!--atlas-app-->", () => app);
  const file =
    path === "/"
      ? "dist/index.html"
      : path === "/404"
        ? "dist/404.html"
        : `dist${path}/index.html`;
  await mkdir(resolve(file, ".."), { recursive: true });
  await writeFile(file, html);
  console.log(`Prerendered ${path} (${Buffer.byteLength(html)} bytes)`);
}
const routes = Object.keys(routeMeta);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((path) => `  <url><loc>${origin}${path === "/" ? "" : path}</loc></url>`).join("\n")}\n</urlset>\n`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /loader/\nSitemap: ${origin}/sitemap.xml\n`,
);
await rm(".ssr", { recursive: true, force: true });
