import { readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const manifest = JSON.parse(await readFile("dist/.vite/manifest.json", "utf8"));
const initial = new Set();
function collect(key) {
  if (initial.has(key) || !manifest[key]) return;
  initial.add(key);
  (manifest[key].imports || []).forEach(collect);
}
collect("index.html");
async function size(file) {
  const data = await readFile(`dist/${file}`);
  return { file, bytes: data.length, gzipBytes: gzipSync(data).length };
}
const startupJs = await Promise.all(
  [...initial]
    .map((key) => manifest[key].file)
    .filter((file) => file.endsWith(".js"))
    .map(size),
);
const startupCss = await Promise.all(
  [...new Set([...initial].flatMap((key) => manifest[key].css || []))].map(
    size,
  ),
);
const renderer = Object.entries(manifest).find(([key]) =>
  key.includes("createAtlasScene"),
);
const report = {
  measuredAt: new Date().toISOString(),
  node: process.version,
  measurement:
    "Local production files and gzip encoding; not browser timings or Lighthouse scores",
  startupJavaScript: startupJs,
  startupJavaScriptGzipBytes: startupJs.reduce(
    (sum, item) => sum + item.gzipBytes,
    0,
  ),
  startupCss,
  startupCssGzipBytes: startupCss.reduce(
    (sum, item) => sum + item.gzipBytes,
    0,
  ),
  deferredWebGL: renderer ? await size(renderer[1].file) : null,
  coreWebVitals: {
    LCP: "not measured",
    CLS: "not measured",
    INP: "not measured",
  },
  lighthouse:
    "not run: approved cloud browser cannot access the supervised local preview",
};
await writeFile(
  "docs/qa/bundle-report.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
