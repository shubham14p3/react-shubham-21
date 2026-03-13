import React, { lazy } from "react";
import { Route } from "react-router-dom";

const Home = lazy(() => import("../components/pages/Home"));
const NotFound = lazy(() => import("../components/pages/NotFound"));

export default function PublicRoutes() {
    return (
        <>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
        </>
    );
}