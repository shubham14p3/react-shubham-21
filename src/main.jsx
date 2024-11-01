const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = './assets/icon/favicon.ico';
document.head.appendChild(favicon);
import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from "react-router-dom";


// Importing CSS files from the assets directory
import 'bootstrap/dist/css/bootstrap.min.css';
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
