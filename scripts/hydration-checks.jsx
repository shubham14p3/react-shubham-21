import axe from "axe-core";
import React, { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
import { routeMeta } from "../src/atlas/seo/routes";
import App from "../src/App";
for (const path of Object.keys(routeMeta)) {
  const html = await readFile(
    path === "/" ? "dist/index.html" : `dist${path}/index.html`,
    "utf8",
  );
  const parsed = new JSDOM(html);
  document.documentElement.lang = parsed.window.document.documentElement.lang;
  document.head.innerHTML = parsed.window.document.head.innerHTML;
  document.body.innerHTML = parsed.window.document.body.innerHTML;
  parsed.window.close();
  const errors = [];
  let root;
  await act(async () => {
    root = hydrateRoot(
      document.getElementById("root"),
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>,
      { onRecoverableError: (error) => errors.push(error.message) },
    );
  });
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 80));
  });
  assert.deepEqual(errors, [], `Hydration errors on ${path}`);
  assert.equal(document.querySelectorAll("h1").length, 1, path);
  assert.equal(document.querySelector("main").dataset.route, path);
  const accessibility = await axe.run(document, {
    rules: { "color-contrast": { enabled: false } },
  });
  assert.deepEqual(
    accessibility.violations.map((item) => ({
      id: item.id,
      targets: item.nodes.map((node) => node.target),
    })),
    [],
    `Semantic accessibility violations on ${path}`,
  );
  await act(async () => root.unmount());
}
globalThis.atlasTestDom.window.close();
console.log(
  "PASS: all 11 generated routes hydrate without recoverable errors; semantic axe checks also pass (color contrast requires a real browser).",
);
