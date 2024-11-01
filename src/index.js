import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Importing CSS files from the assets directory
import "./assets/stylesheet/bootstrap.css"; 
import "./assets/stylesheet/font-awesome.css";
import "./assets/stylesheet/owl.theme.default.min.css";
import "./assets/stylesheet/owl.carousel.min.css";
import "./assets/stylesheet/animate.css";
import "./assets/stylesheet/icomoon.css";
import "./assets/stylesheet/jquery.pagepiling.css";
import "./assets/stylesheet/animation-text.css";
import "./assets/stylesheet/style.css";
import "./assets/stylesheet/shortcodes.css";
import "./assets/stylesheet/responsive.css";
import "./assets/stylesheet/mobile-menu.css";

// Importing slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Get the container for rendering the app
const container = document.getElementById("root");

// Create the root for rendering
const root = ReactDOMClient.createRoot(container);

// Render the app to the root
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
