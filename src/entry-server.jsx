import React from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import App from "./App";

// Static generation waits for every Suspense boundary. No streaming replacement
// scripts or hidden content are needed to expose the page to users and crawlers.
export async function render(path) {
  let failure;
  const { prelude, postponed } = await prerenderToNodeStream(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
    {
      // Keep these small static pages inline instead of emitting streaming replacement scripts.
      progressiveChunkSize: 1024 * 1024,
      onError(error) {
        failure = error;
      },
    },
  );
  if (failure) throw failure;
  if (postponed) throw new Error(`Incomplete static output for ${path}`);
  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}
