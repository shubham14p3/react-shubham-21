import React from "react";
import { Route } from "react-router-dom";
import LoaderCombined from "../components/pages/loaders/LoaderCombined";

export default function GameRoutes() {
    return (
        <>
            <Route path="/game/tick-tack-toe" element={<LoaderCombined />} />
        </>
    );
}