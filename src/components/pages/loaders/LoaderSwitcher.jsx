import React from "react";
import { getActiveLoader } from "./loaderConfig";
import LoaderNeoOrbit from "./LoaderNeoOrbit";
import LoaderTerminalBoot from "./LoaderTerminalBoot";
import LoaderGlassReveal from "./LoaderGlassReveal";
import LoaderNodeNetwork from "./LoaderNodeNetwork";
import LoaderCombined from "./LoaderCombined";
import "./loaders.css";

export default function LoaderSwitcher() {
  const activeLoader = getActiveLoader();

  switch (activeLoader) {
    case "neoOrbit":
      return <LoaderNeoOrbit />;

    case "terminalBoot":
      return <LoaderTerminalBoot />;

    case "glassReveal":
      return <LoaderGlassReveal />;

    case "nodeNetwork":
      return <LoaderNodeNetwork />;

    case "combined":
    default:
      return <LoaderCombined />;
  }
}