import { normalizePath } from "./atlas/seo/routes";
import React, { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./App.css";
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
const root = document.getElementById("root");
const renderedPath = root.querySelector("main")?.dataset.route;
if (
  root.children.length > 0 &&
  renderedPath === normalizePath(window.location.pathname)
)
  hydrateRoot(root, app);
else createRoot(root).render(app);
try {
  if (!sessionStorage.getItem("atlas-devtools")) {
    console.info(
      "%cCurious enough to open DevTools? We should probably talk.\n%cShubham Raj · https://github.com/shubham14p3 · shubham14p3@gmail.com",
      "color:#ff825e;font-size:14px",
      "color:#a7adae",
    );
    try {
      sessionStorage.setItem("atlas-devtools", "1");
    } catch {
      /* Private browsing may block persistence. */
    }
  }
} catch {
  /* Session storage is optional; rendering must not depend on it. */
}
