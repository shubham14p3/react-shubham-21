import assert from "node:assert/strict";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";
const root = createRoot(document.getElementById("root"));
const settle = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 70));
  });
};
const click = async (element) => {
  assert.ok(element, "interaction target exists");
  await act(async () => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  await settle();
};
const button = (name) =>
  [...document.querySelectorAll("button")].find(
    (el) =>
      el.textContent.includes(name) || el.getAttribute("aria-label") === name,
  );
const mount = async (path) => {
  await act(async () =>
    root.render(
      <MemoryRouter key={path} initialEntries={[path]}>
        <App />
      </MemoryRouter>,
    ),
  );
  await settle();
};
await mount("/");
assert.ok(document.querySelector("h1").textContent.includes("Complex systems"));
assert.equal(document.documentElement.dataset.motion, "reduced");
assert.equal(document.querySelector("canvas"), null);
await click(button("Next project"));
assert.ok(
  document
    .querySelector(".work-slide.is-active h3")
    .textContent.includes("Citi"),
);
await act(async () =>
  document
    .querySelector(".carousel-stage")
    .dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
    ),
);
assert.ok(
  document
    .querySelector(".work-slide.is-active h3")
    .textContent.includes("Discover"),
);
await click(button("Architecture"));
assert.ok(
  document.getElementById("atlas-evidence").textContent.includes("Visa"),
);
await act(async () =>
  window.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true }),
  ),
);
await settle();
assert.ok(document.querySelector("dialog[open]"));
assert.equal(
  document.activeElement.getAttribute("aria-label"),
  "Search commands",
);
const input = document.querySelector('[aria-label="Search commands"]');
await act(async () => {
  Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value",
  ).set.call(input, "Visa");
  input.dispatchEvent(new Event("input", { bubbles: true }));
});
await settle();
assert.equal(document.querySelectorAll("[role=option]").length, 1);
// The DOM renderer verifies accessible command activation and route arrival; native browser focus trapping is covered by e2e.
await click(
  [...document.querySelectorAll("[role=option]")].find((el) =>
    el.textContent.includes("Visa"),
  ),
);
assert.ok(document.querySelector("h1").textContent.includes("Many products"));
assert.ok(document.title.includes("Visa"));
await click(button("Recruiter mode"));
assert.ok(document.querySelector(".recruiter-brief"));
assert.equal(localStorage.getItem("atlas-recruiter"), "true");
await click(button("Recruiter mode"));
assert.equal(localStorage.getItem("atlas-recruiter"), "false");
await mount("/lab");
await click(button("One token"));
await settle();
assert.ok(document.querySelector(".token-preview"));
await click(button("Request review"));
assert.ok(
  document
    .querySelector(".token-preview")
    .textContent.includes("No request was sent"),
);
await click(button("The cost"));
await click(button("Change a chart filter"));
assert.equal(document.querySelectorAll(".render-affected").length, 9);
await click(document.querySelector(".render-toolbar input"));
await click(button("Change a chart filter"));
assert.equal(document.querySelectorAll(".render-affected").length, 3);
await mount("/work/unknown");
assert.ok(document.querySelector("h1").textContent.includes("component tree"));
assert.equal(
  document.querySelector("meta[name=robots]").content,
  "noindex, follow",
);
await mount("/unknown");
assert.ok(document.querySelector("h1").textContent.includes("component tree"));
await act(async () => root.unmount());
globalThis.atlasTestDom.window.close();
console.log(
  "PASS: DOM interaction checks — navigation, route metadata, keyboard carousel, scene fallback, command activation/focus, recruiter persistence, Lab states, and 404.",
);
