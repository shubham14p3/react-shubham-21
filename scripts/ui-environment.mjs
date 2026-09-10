import { JSDOM } from "jsdom";
globalThis.atlasTestDom = new JSDOM(
  '<!doctype html><html><head></head><body><div id="root"></div></body></html>',
  { url: "https://shubhamraj.dev", pretendToBeVisual: true },
);
for (const key of [
  "window",
  "document",
  "HTMLElement",
  "HTMLDialogElement",
  "Event",
  "MouseEvent",
  "KeyboardEvent",
  "CustomEvent",
  "Node",
  "getComputedStyle",
  "localStorage",
])
  globalThis[key] = atlasTestDom.window[key];
Object.defineProperty(globalThis, "navigator", {
  value: atlasTestDom.window.navigator,
  configurable: true,
});
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
globalThis.scrollY = 0;
globalThis.requestAnimationFrame = (callback) =>
  setTimeout(() => callback(Date.now()), 1);
globalThis.cancelAnimationFrame = clearTimeout;
globalThis.matchMedia = () => ({
  matches: true,
  addEventListener() {},
  removeEventListener() {},
});
window.matchMedia = globalThis.matchMedia;
globalThis.IntersectionObserver = class {
  observe() {}
  disconnect() {}
};
globalThis.ResizeObserver = class {
  observe() {}
  disconnect() {}
};
window.scrollTo = () => {};
HTMLElement.prototype.scrollIntoView = function () {};
HTMLDialogElement.prototype.showModal = function () {
  this.open = true;
};
HTMLDialogElement.prototype.close = function () {
  this.open = false;
};
atlasTestDom.virtualConsole.on("jsdomError", (error) => {
  throw error;
});
