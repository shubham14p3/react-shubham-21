import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import LoaderRoutes from "./LoaderRoutes";
import PrivateRoutes from "./PrivateRoutes";
export default function AppRoutes() {
    return (
        <Routes>
            {PublicRoutes()}
            {LoaderRoutes()}

            {/* private routes later */}
            {PrivateRoutes()}
        </Routes>
    );
}