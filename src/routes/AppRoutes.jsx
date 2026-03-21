import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import LoaderRoutes from "./LoaderRoutes";
import PrivateRoutes from "./PrivateRoutes";
import GameRoutes from "./GameRoutes";
export default function AppRoutes() {
    return (
        <Routes>
            {PublicRoutes()}
            {LoaderRoutes()}
            {GameRoutes()}

            {/* private routes later */}
            {PrivateRoutes()}
        </Routes>
    );
}