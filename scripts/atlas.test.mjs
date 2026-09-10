import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import {
  routeMeta,
  origin,
  metadataFor,
  schemasFor,
  headFor,
  serializeSchema,
} from "../src/atlas/seo/routes.js";
import {
  carouselKey,
  filterCommands,
  boundedTilt,
  shouldReduce,
} from "../src/atlas/data/interactions.js";
import { allDestinations } from "../src/atlas/data/atlas.js";

test("carousel keys wrap and support home/end without intercepting unrelated keys", () => {
  assert.equal(carouselKey("ArrowLeft", 0, 3), 2);
  assert.equal(carouselKey("ArrowRight", 2, 3), 0);
  assert.equal(carouselKey("Home", 2, 3), 0);
  assert.equal(carouselKey("End", 0, 3), 2);
  assert.equal(carouselKey("Tab", 1, 3), 1);
});
test("command search connects technical skills and employers to evidence", () => {
  assert.ok(filterCommands(allDestinations, "React").length);
  assert.ok(
    filterCommands(allDestinations, "visa infosys").some(
      (item) => item.to === "/work/visa",
    ),
  );
  assert.deepEqual(filterCommands(allDestinations, "nonexistent"), []);
  assert.equal(
    filterCommands(allDestinations, "  ").length,
    allDestinations.length,
  );
});
test("reduced motion cannot be overridden by the full setting", () => {
  assert.equal(shouldReduce({ preference: "full", media: true }), true);
  assert.equal(shouldReduce({ preference: "auto", cores: 2 }), true);
  assert.equal(shouldReduce({ preference: "auto", saveData: true }), true);
  assert.equal(shouldReduce({ preference: "full", cores: 2 }), false);
  assert.equal(shouldReduce({ preference: "reduced" }), true);
  assert.equal(shouldReduce({ preference: "auto" }), false);
});
test("pointer tilt remains bounded even outside or on a zero-size element", () => {
  for (const args of [
    [-100, 900, 300, 300],
    [900, -100, 300, 300],
    [0, 0, 0, 0],
  ]) {
    const { x, y } = boundedTilt(...args);
    assert.ok(Number.isFinite(x) && Math.abs(x) <= 12);
    assert.ok(Number.isFinite(y) && Math.abs(y) <= 12);
  }
});
test("every canonical route has distinct metadata and a semantically appropriate graph", () => {
  assert.equal(
    new Set(Object.values(routeMeta).map((meta) => meta.title)).size,
    Object.keys(routeMeta).length,
  );
  assert.equal(
    new Set(Object.values(routeMeta).map((meta) => meta.description)).size,
    Object.keys(routeMeta).length,
  );
  for (const [path, meta] of Object.entries(routeMeta)) {
    assert.ok(
      meta.description.length > 90 && meta.description.length < 230,
      path,
    );
    const graph = schemasFor(path)["@graph"];
    assert.equal(graph[0].worksFor.name, "Infosys");
    assert.equal(graph[0].name, "Shubham Raj");
    assert.ok(
      headFor(path).includes(`href="${origin}${path === "/" ? "" : path}"`),
    );
    const breadcrumbs = graph.find(
      (item) => item["@type"] === "BreadcrumbList",
    );
    assert.ok(
      breadcrumbs.itemListElement.every(
        (item, index) => item.position === index + 1,
      ),
    );
    assert.ok(!JSON.stringify(graph).includes("aggregateRating"));
  }
  assert.equal(metadataFor("/not-real").noindex, true);
  assert.equal(metadataFor("/about/").title, routeMeta["/about"].title);
  assert.ok(
    !serializeSchema({ text: "</script><script>alert(1)</script>" }).includes(
      "<",
    ),
  );
});
test("production HTML contains each route’s content, assets, metadata, and a single H1 without JavaScript", async () => {
  for (const path of Object.keys(routeMeta)) {
    const html = await readFile(
      path === "/" ? "dist/index.html" : `dist${path}/index.html`,
      "utf8",
    );
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, path);
    assert.ok(html.includes("<main"), path);
    assert.ok(html.includes('id="atlas-schema"'), path);
    assert.ok(!html.includes("<!--atlas-app-->"), path);
    assert.ok(
      !html.includes("<script>"),
      `No executable inline streaming scripts on ${path}`,
    );
    assert.ok(
      !html.includes('hidden id="S:'),
      `No hidden streaming content on ${path}`,
    );
    assert.ok(!html.includes("Opening this part of the atlas"), path);
    const schema = JSON.parse(
      html.match(/id="atlas-schema">(.*?)<\/script>/s)[1],
    );
    assert.equal(schema["@context"], "https://schema.org");
    for (const match of html.matchAll(
      /(?:src|href)="(\/(?:assets|fonts|images)\/[^"?#]+)"/g,
    )) {
      assert.ok(
        (await stat(`dist${match[1]}`)).size > 0,
        `${path} missing ${match[1]}`,
      );
    }
  }
  const citi = await readFile("dist/work/citi/index.html", "utf8");
  assert.ok(citi.includes("40%"));
  assert.ok(citi.includes("Infosys"));
  const resume = await readFile("dist/resume/index.html", "utf8");
  assert.ok(resume.includes("Senior Associate Consultant"));
  assert.ok(resume.includes("350+"));
  const notFound = await readFile("dist/404.html", "utf8");
  assert.ok(notFound.includes("noindex, follow"));
  assert.ok(notFound.includes("Lost in the"));
});
test("sitemap lists all public pages and excludes the 404 and legacy loaders", async () => {
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  assert.equal(
    (sitemap.match(/<loc>/g) || []).length,
    Object.keys(routeMeta).length,
  );
  for (const path of Object.keys(routeMeta))
    assert.ok(
      sitemap.includes(`<loc>${origin}${path === "/" ? "" : path}</loc>`),
    );
  assert.ok(!sitemap.includes("/404"));
  assert.ok(!sitemap.includes("/loader"));
});
test("the resume remains byte-identical across public and legacy download paths", async () => {
  const [a, b] = await Promise.all([
    readFile("public/shubham-raj-resume.pdf"),
    readFile("src/assets/resume/resume.pdf"),
  ]);
  assert.deepEqual(a, b);
});
