import React, { useState } from "react";
import menus from "../menus";
import logo from "../../../assets/images/logo/logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Close the menu after scrolling
  };

  return (
    <header id="header" className="header header-style1" style={{ backgroundColor: "black" }}>
      <div className="container">
        <div className="flex-header d-flex justify-content-between align-items-center">
          {/* Logo + Social icons in one row */}
          <div className="socials-list-hd s1 hv1 d-flex align-items-center">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="header-logo d-inline-flex align-items-center"
              aria-label="Home"
            >
              <img src={logo} alt="Logo" className="site-logo" />
            </a>

            {/* Social icons (forced white) */}
            <a
              href="https://www.facebook.com/shubham14p3"
              target="_blank"
              rel="noreferrer noopener"
              className="social-link"
              aria-label="Facebook"
            >
              <i className="fa fa-facebook" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/shubham14p3/"
              target="_blank"
              rel="noreferrer noopener"
              className="social-link"
              aria-label="LinkedIn"
            >
              <i className="fa fa-linkedin" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/shubham14p3"
              target="_blank"
              rel="noreferrer noopener"
              className="social-link"
              aria-label="GitHub"
            >
              <i className="fa fa-github" aria-hidden="true" />
            </a>
            <a
              href="https://wa.me/918092766575"
              target="_blank"
              rel="noreferrer noopener"
              className="social-link"
              aria-label="WhatsApp"
            >
              <i className="fa fa-whatsapp" aria-hidden="true" />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="content-menu d-lg-flex">
            <div className="nav-wrap">
              <nav id="mainnav" className="mainnav">
                <ul className="menu ace-responsive-menu" data-menu-style="horizontal">
                  {menus.map((menu) => (
                    <li key={menu.id}>
                      {menu.external ? (
                        <a href={menu.tomenu} target="_blank" rel="noopener noreferrer">
                          {menu.namemenu}
                        </a>
                      ) : (
                        <a
                          href={menu.tomenu}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(menu.tomenu);
                          }}
                          className="click-model"
                        >
                          {menu.namemenu}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div dir="rtl" className="btn-menu mobile-header__menu-button" onClick={toggleMobileMenu}>
            <div className="line line-1" />
            <div className="line line-2" />
            <div className="line line-3" />
            <div className="line line-4" />
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            <ul>
              {menus.map((menu) => (
                <li key={menu.id}>
                  {menu.external ? (
                    <a
                      href={menu.tomenu}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn-inner border-corner2 lt-sp08 text-white"
                    >
                      {menu.namemenu}
                    </a>
                  ) : (
                    <a
                      href={menu.tomenu}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(menu.tomenu);
                      }}
                      className="btn-inner border-corner2 lt-sp08 text-white"
                    >
                      {menu.namemenu}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Inline CSS */}
      <style>
        {`
          /* --- Align logo + icons on one line with spacing --- */
          .socials-list-hd {
            display: flex;
            align-items: center;
            gap: 14px; /* space between logo and icons */
          }

          /* Responsive logo sizing */
          .site-logo {
            height: clamp(28px, 5vw, 56px); /* dynamic by screen size */
            width: auto;
            display: block;
          }

          /* Slight separation between logo and first icon */
          .header-logo {
            margin-right: 8px;
          }

          /* White icon color ONLY for the social icons (doesn't affect other text) */
          .socials-list-hd .social-link,
          .socials-list-hd .social-link i {
            color: #fff;
            text-decoration: none;
            line-height: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 18px; /* icon size */
          }
          .socials-list-hd .social-link:hover i {
            opacity: 0.9;
          }

          /* Mobile dropdown (kept as in your version) */
          .mobile-dropdown-menu {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: black;
            color: white;
            padding: 10px 0;
            z-index: 999;
          }
          .mobile-dropdown-menu ul {
            list-style: none;
            padding: 0;
            margin: 0;
            text-align: center;
          }
          .mobile-dropdown-menu ul li {
            padding: 10px 0;
          }
          .mobile-dropdown-menu ul li a {
            color: white;
            text-decoration: none;
            font-size: 1.2rem;
          }
          .mobile-dropdown-menu ul li a:hover {
            color: #f1c40f;
          }

          /* Only show dropdown on mobile, hide desktop menu */
          @media (max-width: 992px) {
            .mobile-dropdown-menu {
              display: block;
            }
            .content-menu {
              display: none;
            }
          }

          /* Tighten spacing on very small screens */
          @media (max-width: 576px) {
            .socials-list-hd {
              gap: 12px;
            }
            .socials-list-hd .social-link {
              font-size: 16px;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
