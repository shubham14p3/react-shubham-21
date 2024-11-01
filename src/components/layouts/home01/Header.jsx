import React, { useState } from "react";
import menus from "../menus";

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
          <div className="socials-list-hd s1 hv1">
            <a href="https://www.facebook.com/shubham14p3" target="_blank" rel="noreferrer noopener">
              <i className="fa fa-facebook" aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/shubham14p3/" target="_blank" rel="noreferrer noopener">
              <i className="fa fa-linkedin" aria-hidden="true" />
            </a>
            <a href="https://github.com/shubham14p3" target="_blank" rel="noreferrer noopener">
              <i className="fa fa-github" aria-hidden="true" />
            </a>
            <a href="https://wa.me/918092766575" target="_blank" rel="noreferrer noopener">
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

      {/* Inline CSS for the dropdown */}
      <style>
        {`
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

          /* Only show dropdown on mobile */
          @media (max-width: 992px) {
            .mobile-dropdown-menu {
              display: block;
            }

            .content-menu {
              display: none;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
