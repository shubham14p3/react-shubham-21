export const ACTIVE_LOADER = "combined";

/*
Available values:

"neoOrbit"
"terminalBoot"
"glassReveal"
"nodeNetwork"
"combined"
*/

export const DEFAULT_LOADER = "combined";

const LOADER_MAP = {
  combined: "combined",
  neoOrbit: "neoOrbit",
  terminalBoot: "terminalBoot",
  glassReveal: "glassReveal",
  nodeNetwork: "nodeNetwork",
};

const HASH_ALIASES = {
  "#loader-combined": "combined",
  "#loader-neo-orbit": "neoOrbit",
  "#loader-terminal-boot": "terminalBoot",
  "#loader-glass-reveal": "glassReveal",
  "#loader-node-network": "nodeNetwork",
};

const PATH_ALIASES = {
  "/loader/combined": "combined",
  "/loader/neo-orbit": "neoOrbit",
  "/loader/terminal-boot": "terminalBoot",
  "/loader/glass-reveal": "glassReveal",
  "/loader/node-network": "nodeNetwork",
};

function normalizeLoader(value) {
  return LOADER_MAP[value] || DEFAULT_LOADER;
}

export function getActiveLoader() {
  if (typeof window === "undefined") return DEFAULT_LOADER;

  const { pathname, hash, search } = window.location;

  // 1. query param support
  const params = new URLSearchParams(search);
  const queryLoader = params.get("loader");
  if (queryLoader) {
    return normalizeLoader(queryLoader);
  }

  // 2. path route support
  if (PATH_ALIASES[pathname]) {
    return PATH_ALIASES[pathname];
  }

  // 3. old hash support (backward compatible)
  if (HASH_ALIASES[hash]) {
    return HASH_ALIASES[hash];
  }

  // 4. optional direct hash support like #neoOrbit
  const directHash = hash.replace("#", "");
  if (directHash) {
    return normalizeLoader(directHash);
  }

  return DEFAULT_LOADER;
}