import React from "react";
import { Route } from "react-router-dom";
import LoaderCombined from "../components/pages/loaders/LoaderCombined";
import LoaderNeoOrbit from "../components/pages/loaders/LoaderNeoOrbit";
import LoaderTerminalBoot from "../components/pages/loaders/LoaderTerminalBoot";
import LoaderGlassReveal from "../components/pages/loaders/LoaderGlassReveal";
import LoaderNodeNetwork from "../components/pages/loaders/LoaderNodeNetwork";

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