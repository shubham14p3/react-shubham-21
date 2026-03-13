import React, { useEffect, useMemo, useState } from "react";
import "./LoaderTerminalBoot.css";
import { useNavigate } from "react-router-dom";

const steps = [
  "INIT UI ENGINE",
  "LOAD ROUTES",
  "BIND COMPONENT TREE",
  "HYDRATE PORTFOLIO",
  "ENABLE INTERACTIONS",
  "READY",
];

export default function LoaderTerminalBoot() {
  const [progress, setProgress] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    let frameId;
    let startTime;
    const duration = 2400;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const next = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(next);

      const mappedSteps = Math.min(
        steps.length,
        Math.max(1, Math.ceil((next / 100) * steps.length)),
      );

      setVisibleSteps(mappedSteps);

      if (next < 100) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const activeLines = useMemo(
    () => steps.slice(0, visibleSteps),
    [visibleSteps],
  );

  return (
    <div className="terminal-shell" role="status" aria-live="polite">
      <div
        className="terminal-shell__glow terminal-shell__glow--one"
        aria-hidden="true"
      />
      <div
        className="terminal-shell__glow terminal-shell__glow--two"
        aria-hidden="true"
      />

      <div className="terminal-loader">
        <div className="terminal-loader__chrome">
          <span className="terminal-loader__dot terminal-loader__dot--red" />
          <span className="terminal-loader__dot terminal-loader__dot--yellow" />
          <span className="terminal-loader__dot terminal-loader__dot--green" />
          <span className="terminal-loader__label">
            shubham-portfolio — boot sequence
          </span>
        </div>

        <div className="terminal-loader__body">
          <p className="terminal-loader__brand">
            <span className="terminal-loader__user">boot</span>
            <span className="terminal-loader__at">@</span>
            <span className="terminal-loader__host">shubham-portfolio</span>
            <span className="terminal-loader__path">:~</span>
          </p>

          <div className="terminal-loader__lines">
            {activeLines.map((step, index) => {
              const isLast = index === activeLines.length - 1;
              const isDone = index < activeLines.length - 1;
              const isReady = step === "READY" && progress === 100;

              return (
                <p
                  key={step}
                  className={`terminal-loader__line ${isDone ? "is-done" : ""} ${isLast ? "is-active" : ""
                    } ${isReady ? "is-ready" : ""}`}
                >
                  <span className="terminal-loader__prompt">&gt;</span>
                  <span className="terminal-loader__text">{step}</span>
                  <span className="terminal-loader__status">
                    {isReady ? "[OK]" : isDone ? "[done]" : "[loading]"}
                  </span>
                  {isLast ? (
                    <span className="terminal-loader__cursor">_</span>
                  ) : null}
                </p>
              );
            })}
          </div>

          <div className="terminal-loader__meter">
            <div className="terminal-loader__meter-top">
              <span>SYSTEM LOAD</span>
              <span>{progress}%</span>
            </div>

            <div className="terminal-loader__track">
              <div
                className="terminal-loader__bar"
                style={{ width: `${progress}%` }}
              />
              <div className="terminal-loader__scan" />
            </div>
          </div>

          <p className="terminal-loader__footer">
            Portfolio runtime initializing...
          </p>
        </div>
      </div>

      <button
        type="button"
        className="btn-primary"
        onClick={() => navigate("/", { replace: true })}
      >
        Take Me Home
      </button>
    </div>
  );
}
