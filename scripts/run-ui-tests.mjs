import { build } from "vite";
import { spawnSync } from "node:child_process";
import { rm } from "node:fs/promises";
await build({
  logLevel: "error",
  build: {
    ssr: process.argv.includes("--hydration")
      ? "scripts/hydration-checks.jsx"
      : "scripts/ui-checks.jsx",
    outDir: ".test-build",
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: {
      external: [
        "jsdom",
        "node:assert/strict",
        "react",
        "react-dom/client",
        "react-router-dom",
      ],
    },
  },
});
const result = spawnSync(
  process.execPath,
  [
    "--import",
    "./scripts/ui-environment.mjs",
    process.argv.includes("--hydration")
      ? ".test-build/hydration-checks.js"
      : ".test-build/ui-checks.js",
  ],
  { stdio: "inherit", env: { ...process.env, NODE_ENV: "development" } },
);
await rm(".test-build", { recursive: true, force: true });
process.exitCode = result.status ?? 1;
