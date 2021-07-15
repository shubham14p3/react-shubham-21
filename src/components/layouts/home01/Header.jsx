import React from "react";
import { Link } from "react-router-dom";
import links from "../links";
import menus from "../menus";
// eslint-disable-next-line
import bloglinks from "../bloglinks";

const Header = (props) => {
  return (
    <header id="header" className="header header-style1">
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
          </div>
          <div className="content-menu d-lg-flex">
            <div className="nav-wrap">
              <nav id="mainnav" className="mainnav">
                <ul
                  className="menu ace-responsive-menu"
                  data-menu-style="horizontal"
                >
                  <li>
                    <ul className="sub-menu">
                      {links.map((data) => (
                        <li key={data.id}>
                          <Link
                            to={data.tolink}
                            onClick={() => {
                              window.location.href = data.tolink;
                            }}
                            className={data.id === 1 ? "active" : ""}
                          >
                            {data.namelink}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  {menus.map((menu) => (
                    <li key={menu.id}>
                      <Link to={menu.tomenu} className="click-model">
                        {menu.namemenu}
                      </Link>
                    </li>
                  ))}
                  {/* Disabled Blog from Main Header Navbar */}
                  {/* <li>
                    <Link to="#">Blog</Link>
                    <ul className="sub-menu">
                      {bloglinks.map((data) => (
                        <li key={data.id}>
                          <Link
                            to={data.toblog}
                            onClick={() => {
                              window.location.href = data.toblog;
                            }}
                          >
                            {data.nameblog}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li> */}
                </ul>
              </nav>
            </div>
            <div className="hire-me-s1 btn-general btn-hv-common d-lg-flex align-items-center">
              <a href="/resume/resume.pdf" className="btn-inner border-corner2 lt-sp08 text-white"
              >
                Resume
              </a>
            </div>
          </div>
          <div dir="rtl" className="btn-menu mobile-header__menu-button">
            <div className="line line-1" />
            <div className="line line-2" />
            <div className="line line-3" />
            <div className="line line-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
