import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import menus from "../menus";
import "./Header.css";

const socialLinks = [
  {
    id: "facebook",
    href: "https://www.facebook.com/shubham14p3",
    icon: "fa-brands fa-facebook-f",
    label: "Facebook",
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/shubham14p3/",
    icon: "fa-brands fa-linkedin-in",
    label: "LinkedIn",
  },
  {
    id: "github",
    href: "https://github.com/shubham14p3",
    icon: "fa-brands fa-github",
    label: "GitHub",
  },
  {
    id: "whatsapp",
    href: "https://wa.me/918092766575",
    icon: "fa-brands fa-whatsapp",
    label: "WhatsApp",
  },
];

const roleWords = ["Frontend Engineer", "React Developer", "UI Engineer"];

function scrollToSection(id) {
  const target = document.querySelector(id);
  const header = document.querySelector(".site-header");

  if (!target) return;

  const headerHeight = header?.offsetHeight ?? 84;
  const extraOffset = 18;
  const targetY =
    target.getBoundingClientRect().top + window.scrollY - headerHeight - extraOffset;

  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
}

function getAllInternalHrefs(items) {
  const hrefs = [];

  items.forEach((item) => {
    if (item.href && !item.external) {
      hrefs.push(item.href);
    }

    if (item.children?.length) {
      hrefs.push(...getAllInternalHrefs(item.children));
    }
  });

  return hrefs;
}

function isMenuActive(item, activeId) {
  if (item.href && item.href === activeId) return true;
  if (!item.children) return false;
  return item.children.some((child) => isMenuActive(child, activeId));
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState(
    location.pathname === "/" ? window.location.hash || "#home" : location.pathname
  );
  const [mobileExpanded, setMobileExpanded] = useState({});
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const internalHrefs = useMemo(() => getAllInternalHrefs(menus), []);
  const sectionHrefs = useMemo(
    () => internalHrefs.filter((href) => href.startsWith("#")),
    [internalHrefs]
  );

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const currentWord = roleWords[wordIndex % roleWords.length];
    const speed = isDeleting ? 45 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentWord.slice(0, typedText.length + 1);
        setTypedText(nextText);

        if (nextText === currentWord) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 1200);
        }
      } else {
        const nextText = currentWord.slice(0, Math.max(0, typedText.length - 1));
        setTypedText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % roleWords.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex, isReady]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveId(location.pathname);
      return;
    }

    setActiveId(window.location.hash || "#home");

    const handleHashChange = () => {
      setActiveId(window.location.hash || "#home");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const header = document.querySelector(".site-header");
      const headerHeight = header?.offsetHeight ?? 84;
      const scrollPosition = window.scrollY + headerHeight + 40;

      let currentSection = window.location.hash || "#home";

      for (const href of sectionHrefs) {
        const section = document.querySelector(href);
        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = href;
        }
      }

      setActiveId(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionHrefs, location.pathname]);

  const handleNavClick = (href, external = false) => (event) => {
    if (external) return;

    event.preventDefault();

    if (href.startsWith("#")) {
      setActiveId(href);
      setMobileOpen(false);

      if (location.pathname !== "/") {
        navigate(`/${href}`);
        return;
      }

      window.location.hash = href;
      scrollToSection(href);
      return;
    }

    setActiveId(href);
    setMobileOpen(false);
    navigate(href);
  };

  const toggleMobileGroup = (key) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderDesktopMenu = (item, level = 0) => {
    if (item.external) {
      return (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          className="nav-link"
          download={item.download}
        >
          {item.label}
        </a>
      );
    }

    if (!item.children) {
      return (
        <a
          key={item.id}
          href={item.href}
          onClick={handleNavClick(item.href)}
          className={`nav-link ${isMenuActive(item, activeId) ? "active" : ""}`}
          aria-current={item.href === activeId ? "page" : undefined}
        >
          {item.label}
        </a>
      );
    }

    return (
      <div
        key={item.id}
        className={`nav-dropdown nav-dropdown--level-${level} ${isMenuActive(item, activeId) ? "active" : ""
          }`}
      >
        <button type="button" className="nav-dropdown__trigger">
          <span>{item.label}</span>
          <i className="fa-solid fa-angle-down" aria-hidden="true" />
        </button>

        <div className="nav-dropdown__menu">
          {item.children.map((child) =>
            child.children ? (
              <div key={child.id} className="nav-dropdown nav-dropdown--nested">
                <button
                  type="button"
                  className="nav-dropdown__item nav-dropdown__item--trigger"
                >
                  <span>{child.label}</span>
                  <i className="fa-solid fa-angle-right" aria-hidden="true" />
                </button>

                <div className="nav-dropdown__submenu">
                  {child.children.map((grandChild) => (
                    <a
                      key={grandChild.id}
                      href={grandChild.href}
                      onClick={handleNavClick(grandChild.href)}
                      className={`nav-dropdown__item ${grandChild.href === activeId ? "active" : ""
                        }`}
                    >
                      {grandChild.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={child.id}
                href={child.href}
                onClick={handleNavClick(child.href)}
                className={`nav-dropdown__item ${child.href === activeId ? "active" : ""
                  }`}
              >
                {child.label}
              </a>
            )
          )}
        </div>
      </div>
    );
  };

  const renderMobileMenu = (item, path = item.id) => {
    if (item.external) {
      return (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noreferrer noopener"
          className="mobile-nav-link"
          download={item.download}
          onClick={() => setMobileOpen(false)}
        >
          {item.label}
        </a>
      );
    }

    if (!item.children) {
      return (
        <a
          key={item.id}
          href={item.href}
          className={`mobile-nav-link ${item.href === activeId ? "active" : ""}`}
          onClick={handleNavClick(item.href)}
        >
          {item.label}
        </a>
      );
    }

    const expanded = !!mobileExpanded[path];

    return (
      <div key={item.id} className="mobile-nav-group">
        <button
          type="button"
          className={`mobile-nav-link mobile-nav-link--group ${isMenuActive(item, activeId) ? "active" : ""
            }`}
          onClick={() => toggleMobileGroup(path)}
        >
          <span>{item.label}</span>
          <i
            className={`fa-solid ${expanded ? "fa-angle-up" : "fa-angle-down"}`}
            aria-hidden="true"
          />
        </button>

        {expanded ? (
          <div className="mobile-nav-children">
            {item.children.map((child) => renderMobileMenu(child, `${path}-${child.id}`))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <>
      <header className="site-header" aria-label="Main navigation">
        <div className="navbar-container-shell site-header__inner">
          <a
            href="#home"
            className="site-brand"
            onClick={handleNavClick("#home")}
            aria-label="Go to home section"
          >
            <span className="site-brand__meta">
              <span className="site-brand__name">Shubham Raj</span>

              <span className="site-brand__role">
                <span className={`site-brand__typed ${isDeleting ? "deleting" : ""}`}>
                  {typedText}
                  <span className="site-brand__cursor" aria-hidden="true">
                    |
                  </span>
                </span>
              </span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Desktop navigation">
            {menus.map((item) => renderDesktopMenu(item))}
          </nav>

          <div className="site-header__actions">
            <div className="header-socials" aria-label="Social links">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="icon-link"
                  aria-label={item.label}
                >
                  <i className={item.icon} aria-hidden="true" />
                </a>
              ))}
            </div>

            <button
              type="button"
              className="mobile-menu-btn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <i
                className={mobileOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
          <div className="mobile-menu__inner">
            {menus.map((item) => renderMobileMenu(item))}
          </div>
        </div>
      ) : null}
    </>
  );
}