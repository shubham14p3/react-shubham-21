import React, { useEffect, useMemo, useState } from "react";

const bootSteps = [
  "INITIALIZING REACT ARCHITECTURE",
  "LOADING SCALABLE UI MODULES",
  "MOUNTING COMPONENT ECOSYSTEM",
  "CONNECTING STATE MANAGEMENT",
  "OPTIMIZING RENDER PERFORMANCE",
  "HYDRATING DESIGN SYSTEM",
  "SYNCING PRODUCT EXPERIENCE",
  "READY FOR DEPLOYMENT",
];

const nodes = [
  { id: 1, x: "10%", y: "26%" },
  { id: 2, x: "26%", y: "12%" },
  { id: 3, x: "48%", y: "20%" },
  { id: 4, x: "72%", y: "28%" },
  { id: 5, x: "84%", y: "48%" },
  { id: 6, x: "68%", y: "72%" },
  { id: 7, x: "44%", y: "82%" },
  { id: 8, x: "20%", y: "68%" },
  { id: 9, x: "8%", y: "48%" },
];

const words = [
  "React Architecture",
  "Design Systems",
  "Scalable Frontends",
  "Performance",
  "Reusable Components",
  "Frontend Leadership",
  "Clean UI Engineering",
  "State Management",
];

export default function LoaderCombined() {
  const [progress, setProgress] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(1);
  const [activeCount, setActiveCount] = useState(1);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;
    const duration = 5000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const next = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(next);
      setVisibleSteps(
        Math.min(
          bootSteps.length,
          Math.max(1, Math.ceil((next / 100) * bootSteps.length))
        )
      );
      setActiveCount(
        Math.min(
          nodes.length,
          Math.max(1, Math.ceil((next / 100) * nodes.length))
        )
      );

      if (next < 100) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const activeLines = useMemo(
    () => bootSteps.slice(0, visibleSteps),
    [visibleSteps]
  );

  const currentWord = useMemo(() => words[wordIndex], [wordIndex]);

  return (
    <div
      className="loader-shell loader-shell--combined"
      role="status"
      aria-live="polite"
    >
      <div className="combined-loader__bg-grid" aria-hidden="true" />
      <div className="combined-loader__noise" aria-hidden="true" />
      <div
        className="combined-loader__glow combined-loader__glow--one"
        aria-hidden="true"
      />
      <div
        className="combined-loader__glow combined-loader__glow--two"
        aria-hidden="true"
      />
      <div
        className="combined-loader__glow combined-loader__glow--three"
        aria-hidden="true"
      />

      <div className="combined-loader">
        <div className="combined-loader__left">
          <p className="combined-loader__eyebrow">Welcome to my world</p>

          <div
            className="combined-loader__title-wrap"
            style={{ "--fill-level": `${progress}%` }}
          >
            <h1 className="combined-loader__title combined-loader__title--base">
              Shubham Raj<span className="combined-loader__dot">.</span>
            </h1>

            <h1
              className="combined-loader__title combined-loader__title--fill"
              aria-hidden="true"
            >
              <span className="combined-loader__title-fill-text">
                Shubham Raj<span className="combined-loader__dot">.</span>
              </span>
            </h1>

            <div
              className="combined-loader__title-wave"
              aria-hidden="true"
            />
          </div>

          <p className="combined-loader__subtitle">
            Senior React Developer • 7+ years in{" "}
            <span className="combined-loader__word">{currentWord}</span>
          </p>

          <div className="combined-loader__progress-card">
            <div className="combined-loader__progress-top">
              <span>experience loading</span>
              <span>{progress}%</span>
            </div>

            <div className="combined-loader__track">
              <div
                className="combined-loader__bar"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="combined-loader__terminal">
            <div className="combined-loader__terminal-top">
              <span className="combined-loader__terminal-dot combined-loader__terminal-dot--red" />
              <span className="combined-loader__terminal-dot combined-loader__terminal-dot--yellow" />
              <span className="combined-loader__terminal-dot combined-loader__terminal-dot--green" />
            </div>

            <div className="combined-loader__terminal-body">
              <p className="combined-loader__terminal-brand">
                boot@shubham-portfolio:~
              </p>

              {activeLines.map((step, index) => (
                <p key={step} className="combined-loader__terminal-line">
                  <span className="combined-loader__prompt">&gt;</span> {step}
                  {index === activeLines.length - 1 ? (
                    <span className="combined-loader__cursor">_</span>
                  ) : null}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="combined-loader__right">
          <div className="combined-loader__orbit-wrap">
            <div className="combined-loader__ring combined-loader__ring--one" />
            <div className="combined-loader__ring combined-loader__ring--two" />
            <div className="combined-loader__ring combined-loader__ring--three" />
            <div className="combined-loader__core">
              <span>{progress}%</span>
            </div>
          </div>

          <div className="combined-loader__network">
            {nodes.map((node, index) => (
              <span
                key={node.id}
                className={`combined-loader__node ${index < activeCount ? "is-active" : ""
                  }`}
                style={{ left: node.x, top: node.y }}
              />
            ))}

            <span className="combined-loader__line combined-loader__line--1" />
            <span className="combined-loader__line combined-loader__line--2" />
            <span className="combined-loader__line combined-loader__line--3" />
            <span className="combined-loader__line combined-loader__line--4" />
            <span className="combined-loader__line combined-loader__line--5" />
            <span className="combined-loader__line combined-loader__line--6" />
            <span className="combined-loader__line combined-loader__line--7" />
          </div>
        </div>
      </div>
    </div>
  );
}