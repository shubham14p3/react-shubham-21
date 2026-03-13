import React, { useEffect, useRef, useState } from "react";
// eslint-disable-next-line
import { Link } from "react-router-dom";
import resumeOne from "../../../assets/resume/resume.pdf";

const Banner = () => {
  // --- Typing headline logic ---
  const words = ["Developer!", "Engineer!"];
  const [i, setI] = useState(0); // which word
  const [txt, setTxt] = useState(""); // current shown text
  const [del, setDel] = useState(false); // deleting mode
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const current = words[i % words.length];
    const speed = del ? 45 : 80;

    const tick = setTimeout(() => {
      if (!del) {
        // typing
        const next = current.slice(0, txt.length + 1);
        setTxt(next);
        if (next === current) {
          // hold, then start delete
          setTimeout(() => setDel(true), 1000);
        }
      } else {
        // deleting
        const next = current.slice(0, Math.max(0, txt.length - 1));
        setTxt(next);
        if (next === "") {
          setDel(false);
          setI((v) => (v + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(tick);
  }, [txt, del, i, ready]);

  // --- On-screen activation for entrance animation ---
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "0px 0px -20% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // --- Mouse spotlight (desktop only) ---
  const spotRef = useRef(null);
  useEffect(() => {
    const spot = spotRef.current;
    if (!spot) return;
    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      spot.style.setProperty("--mx", `${x}px`);
      spot.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div className="section slide-personal-Intro-first" role="banner" ref={rootRef}>
        <section className={`banner-section s1 ${inView ? "in" : ""}`} id="home">
          <div className="container">
            <div className="content-text position-relative banner-inner">
              <div className="headline-wrap">
                <h1 className="title text-white">
                  <span className="title-fixed">Software&nbsp;</span>
                  <span className="title-dynamic">
                    <span className={`typed ${del ? "deleting" : ""}`}>
                      {txt}
                      <span className="cursor" aria-hidden="true">|</span>
                    </span>
                  </span>
                </h1>

                <p className="lt-sp03 text-white banner-sub">
                  <strong>Versatile Frontend Developer</strong> with deep expertise in{" "}
                  <span className="color-d4">building</span> high-performance, user-centric web applications.
                  <br />
                  Currently with <span className="color-d4"><b>Infosys</b></span> as a{" "}
                  <span className="color-d4"><b>Senior Associate Consultant</b></span>, delivering enterprise-grade solutions with React, Redux, and modern tooling.
                  <br />
                  Previously contributed to impactful projects at <span className="color-d4">Capgemini</span>,{" "}
                  <span className="color-d4">Nagravision</span>, and{" "}
                  <span className="color-d4">Gammastack</span>.
                  <br />
                  5+ years of hands-on experience in crafting elegant, scalable, and performant UIs with a strong focus on usability and maintainability.
                </p>

              </div>

              <div className="cta-wrap">
                <a
                  href={resumeOne}
                  className="border-corner5 f-w500 lt-sp095 text-white banner-cta"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Resume (PDF)"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          {/* spotlight layer (desktop) */}
          <div className="spotlight" aria-hidden ref={spotRef} />
        </section>
      </div>

      <style>{`
        /* ----- Layout & responsiveness ----- */
        .banner-inner {
          min-height: min(92vh, 900px);
          display: grid;
          align-content: center;
          gap: clamp(16px, 4vw, 28px);
          padding-block: clamp(24px, 7vw, 96px);
        }
        .headline-wrap { 
          max-width: 72rem; 
        }
        .cta-wrap { 
          display: flex; 
          gap: 12px; 
          flex-wrap: wrap; 
        }

        /* ----- Title (mobile-first) ----- */
        .title {
          margin: 0 0 clamp(8px, 3vw, 12px);
          line-height: 1.05;
          letter-spacing: -0.015em;
          font-weight: 800;
          font-size: clamp(1.8rem, 7vw, 4rem);
          text-wrap: balance;
        }
        .title-fixed { opacity: 0.98; }
        .title-dynamic {
          display: inline-block;
          position: relative;
          min-width: 7.4ch;
          white-space: nowrap;
        }

        /* Force 2rem font size below 480px */
        @media (max-width: 480px) {
          .title {
            font-size: 2rem !important;
          }
        }

        /* ----- Typing word effects ----- */
        .typed {
          display: inline-block;
          background: linear-gradient(90deg, #ffd166 0%, #fca311 35%, #ff6b6b 70%, #ffd166 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3.5s linear infinite;
          will-change: background-position;
        }
        .typed.deleting {
          opacity: 0.9;
        }
        @keyframes shimmer {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        .cursor {
          display: inline-block;
          width: 0.06em;
          margin-left: 0.08em;
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }

        /* ----- Subcopy ----- */
        .banner-sub {
          margin: 0;
          max-width: 62ch;
          font-size: clamp(0.98rem, 2.8vw, 1.125rem);
          line-height: 1.65;
          opacity: 0.95;
        }

        /* ----- CTA interactions ----- */
        .banner-cta {
          display: inline-block;
          padding: clamp(12px, 3.2vw, 16px) clamp(18px, 4.2vw, 24px);
          border-radius: 14px;
          text-decoration: none;
          transform: translateY(0);
          transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
          background: rgba(255,255,255,0.08);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
          backdrop-filter: saturate(130%) blur(2px);
        }
        .banner-cta:hover,
        .banner-cta:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.28);
          background: rgba(255,255,255,0.12);
          outline: none;
        }
        .banner-cta:active { transform: translateY(0); }

        /* ----- Section entrance animation ----- */
        .banner-section { 
          opacity: 0; 
          transform: translateY(14px); 
          transition: opacity 500ms ease, transform 500ms ease; 
          position: relative;
          overflow: clip;
        }
        .banner-section.in { 
          opacity: 1; 
          transform: none; 
        }

        /* ----- Spotlight (desktop only) ----- */
        .spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          --mx: 50vw;
          --my: 50vh;
          background: radial-gradient(520px circle at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 60%);
          mix-blend-mode: screen;
        }

        /* ----- Mobile polish ----- */
        @media (max-width: 480px) {
          .content-text { text-align: left; }
          .banner-inner { padding-block: 24px 56px; }
          .spotlight { display: none; }
        }

        /* ----- Accessibility: reduce motion ----- */
        @media (prefers-reduced-motion: reduce) {
          .typed, .cursor, .banner-section, .banner-cta {
            animation: none !important;
            transition: none !important;
          }
          .spotlight { display: none; }
        }
      `}</style>
    </>
  );
};

export default Banner;
