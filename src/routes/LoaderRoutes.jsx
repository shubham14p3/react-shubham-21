import React, { lazy } from "react";
import { Route } from "react-router-dom";
const LoaderCombined = lazy(() => import("../components/pages/loaders/LoaderCombined"));
const LoaderNeoOrbit = lazy(() => import("../components/pages/loaders/LoaderNeoOrbit"));
const LoaderTerminalBoot = lazy(() => import("../components/pages/loaders/LoaderTerminalBoot"));
const LoaderGlassReveal = lazy(() => import("../components/pages/loaders/LoaderGlassReveal"));
const LoaderNodeNetwork = lazy(() => import("../components/pages/loaders/LoaderNodeNetwork"));

export default function LoaderRoutes() {
    return (
        <>
            <Route path="/loader/combined" element={<LoaderCombined />} />
            <Route path="/loader/neo-orbit" element={<LoaderNeoOrbit />} />
            <Route path="/loader/terminal-boot" element={<LoaderTerminalBoot />} />
            <Route path="/loader/glass-reveal" element={<LoaderGlassReveal />} />
            <Route path="/loader/node-network" element={<LoaderNodeNetwork />} />
        </>
    );
}
