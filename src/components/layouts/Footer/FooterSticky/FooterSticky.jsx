import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FooterSticky.css";

export default function FooterSticky() {
    const year = new Date().getFullYear();
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === "/";

    return (
        <footer className="footer-sticky-pro">
            <div className="footer-sticky-pro__inner">

                {/* LEFT */}
                <div className="footer-sticky-pro__left">
                    <span className="footer-sticky-pro__logo">SR</span>

                    <div className="footer-sticky-pro__meta">
                        <span className="footer-sticky-pro__name">
                            Shubham Raj
                        </span>

                        <span className="footer-sticky-pro__status">
                            <span className="status-dot" />
                            Open to opportunities
                        </span>
                    </div>
                </div>

                {/* CENTER */}
                <div className="footer-sticky-pro__center">

                    {/* 🔥 NEW NAV BUTTON */}
                    <button
                        onClick={() => navigate("/")}
                        className={`sticky-pill ${isHome ? "sticky-pill--disabled" : ""}`}
                        disabled={isHome}
                    >
                        <i className="fa fa-home" />
                        <span>{isHome ? "Home" : "Go Home"}</span>
                    </button>

                    {/* Optional Back button */}
                    {!isHome && (
                        <button
                            onClick={() => navigate(-1)}
                            className="sticky-pill"
                        >
                            <i className="fa fa-arrow-left" />
                            <span>Back</span>
                        </button>
                    )}

                    <a href="mailto:shubham14p3@gmail.com" className="sticky-pill">
                        <i className="fa fa-envelope" />
                        <span>Email</span>
                    </a>

                    <a
                        href="https://wa.me/918092766575"
                        target="_blank"
                        rel="noreferrer"
                        className="sticky-pill sticky-pill--highlight"
                    >
                        <i className="fa fa-whatsapp" />
                        <span>Chat</span>
                    </a>

                </div>

                {/* RIGHT */}
                <div className="footer-sticky-pro__right">
                    <a
                        href="https://github.com/shubham14p3"
                        target="_blank"
                        rel="noreferrer"
                        className="sticky-icon"
                    >
                        <i className="fab fa-github" />
                    </a>

                    <a
                        href="https://www.linkedin.com/in/shubham14p3/"
                        target="_blank"
                        rel="noreferrer"
                        className="sticky-icon"
                    >
                        <i className="fab fa-linkedin-in" />
                    </a>

                    <span className="footer-sticky-pro__year">
                        © {year}
                    </span>
                </div>

            </div>
        </footer>
    );
}