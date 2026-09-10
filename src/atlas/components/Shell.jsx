import { normalizePath } from "../seo/routes";
import useRouteTransition from "../hooks/useRouteTransition";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigationType,
  useNavigate,
} from "react-router-dom";
import { navigation, allDestinations } from "../data/atlas";
import { useExperience } from "../hooks/ExperienceContext";
import Icon from "../../components/studio/Icon";
import DetailDialog from "../../components/studio/DetailDialog";
import { track } from "../seo/analytics";
const CommandPalette = lazy(() => import("./CommandPalette"));
const scrollPositions = new Map();
function ContextCursor() {
  const ref = useRef(null);
  const { reduced } = useExperience();
  useEffect(() => {
    if (reduced || !matchMedia("(pointer: fine)").matches) return;
    const move = (event) => {
      const target = event.target.closest("[data-cursor]");
      const node = ref.current;
      if (!node) return;
      node.textContent = target?.dataset.cursor || "";
      node.style.opacity = target ? "1" : "0";
      node.style.transform = `translate3d(${event.clientX + 18}px, ${event.clientY + 18}px, 0)`;
    };
    const hide = () => {
      if (ref.current) ref.current.style.opacity = "0";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
    };
  }, [reduced]);
  return <span className="context-cursor" ref={ref} aria-hidden="true" />;
}
export default function Shell({ children }) {
  useRouteTransition();
  const {
    recruiter,
    toggleRecruiter,
    preference,
    changeExperience,
    systemReduced,
  } = useExperience();
  const [menu, setMenu] = useState(false);
  const [palette, setPalette] = useState(false);
  const location = useLocation();
  const navigationType = useNavigationType();
  const navigate = useNavigate();
  const first = useRef(true);
  const locationRef = useRef(location);
  useEffect(() => {
    const save = () => scrollPositions.set(locationRef.current.key, scrollY);
    window.addEventListener("scroll", save, { passive: true });
    return () => window.removeEventListener("scroll", save);
  }, []);
  useEffect(() => {
    locationRef.current = location;
    setMenu(false);
    setPalette(false);
    if (first.current) {
      first.current = false;
      const legacy = {
        "#about": "/about",
        "#experience": "/about#experience",
        "#recommendations": "/recommendations",
        "#testimonials": "/recommendations",
        "#contact": "/contact",
        "#projects": "/work#github",
        "#education": "/about",
        "#certifications": "/about",
      };
      if (location.pathname === "/" && legacy[location.hash])
        navigate(legacy[location.hash], { replace: true });
      return;
    }
    let cancelled = false;
    let attempts = 0;
    let frame;
    const restore = () => {
      if (cancelled) return;
      const heading = document.querySelector("main h1");
      if (!heading && attempts++ < 90) {
        frame = requestAnimationFrame(restore);
        return;
      }
      if (location.hash) {
        let id = location.hash.slice(1);
        try {
          id = decodeURIComponent(id);
        } catch {
          /* Keep malformed hashes inert. */
        }
        document.getElementById(id)?.scrollIntoView();
      } else
        window.scrollTo(
          0,
          navigationType === "POP" ? scrollPositions.get(location.key) || 0 : 0,
        );
      heading?.focus({ preventScroll: true });
    };
    frame = requestAnimationFrame(restore);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [location, navigationType]);
  useEffect(() => {
    const key = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenu(false);
        setPalette((value) => !value);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="atlas-header">
        <Link to="/" className="brand" aria-label="Shubham Raj — home">
          <span className="brand-mark">
            sr<span>✳</span>
          </span>
          <span>
            SHUBHAM RAJ<small>INTERFACE ATLAS</small>
          </span>
        </Link>
        <div className="header-actions">
          <button
            className="recruiter-toggle"
            type="button"
            aria-pressed={recruiter}
            onClick={() => {
              if (!recruiter) navigate("/");
              toggleRecruiter();
            }}
          >
            <span className="status-dot" />
            Recruiter mode
            <span className="toggle-track" aria-hidden="true" />
          </button>
          <button
            className="command-trigger"
            type="button"
            aria-label="Open command palette"
            onClick={() => setPalette(true)}
          >
            <span>Find anything</span>
            <kbd>⌘ K</kbd>
          </button>
          <button
            className="menu-trigger icon-button"
            type="button"
            aria-label="Open navigation"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>
      <nav className="nav-rail" aria-label="Main navigation">
        {navigation.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"}>
            <span>{item.code}</span>
            <b>{item.label}</b>
          </NavLink>
        ))}
      </nav>
      <main
        id="main"
        className="route-stage"
        data-route={normalizePath(location.pathname)}
        key={location.pathname}
      >
        {children}
      </main>
      <footer className="atlas-footer">
        <Link to="/" className="footer-signature">
          Shubham Raj<span>Frontend engineer · Mexico City</span>
        </Link>
        <nav aria-label="Footer navigation">
          <Link to="/resume">Résumé</Link>
          <Link to="/stack">Capabilities</Link>
          <Link to="/recommendations">Recommendations</Link>
          <a
            href="https://github.com/shubham14p3"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("github_open")}
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/shubham14p3/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("linkedin_open")}
          >
            LinkedIn ↗
          </a>
        </nav>
        <div className="experience-control">
          <label htmlFor="experience-mode">Experience</label>
          <select
            id="experience-mode"
            value={preference}
            onChange={(event) => changeExperience(event.target.value)}
          >
            <option value="auto">Adaptive</option>
            <option value="full">Full</option>
            <option value="reduced">Reduced</option>
          </select>
          {systemReduced && <small>System reduced motion respected.</small>}
        </div>
        <p className="footer-colophon">
          Built to be explored. Engineered to be used.
          <span>Mexico City / Working globally</span>
        </p>
      </footer>
      {menu && (
        <DetailDialog
          className="navigation-dialog"
          title="Choose your direction."
          eyebrow="ATLAS / NAVIGATION"
          onClose={() => setMenu(false)}
        >
          <nav className="mobile-navigation" aria-label="Expanded navigation">
            {allDestinations.slice(0, 9).map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMenu(false)}
              >
                <span>{item.code}</span>
                {item.label}
                <span>↗</span>
              </Link>
            ))}
          </nav>
        </DetailDialog>
      )}
      {palette && (
        <Suspense
          fallback={
            <DetailDialog
              title="Opening command palette…"
              onClose={() => setPalette(false)}
            >
              <p role="status">Loading navigation tools.</p>
            </DetailDialog>
          }
        >
          <CommandPalette onClose={() => setPalette(false)} />
        </Suspense>
      )}
      <ContextCursor />
    </>
  );
}
