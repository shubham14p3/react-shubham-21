import React, { useEffect, useState } from "react";
import "./LoaderGlassReveal.css";
import { useNavigate } from "react-router-dom";

const NAME = "SHUBHAM";

export default function LoaderGlassReveal() {
  const [progress, setProgress] = useState(0);
  const [letters, setLetters] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    let frameId;
    let startTime;
    const duration = 2100;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const next = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(next);
      setLetters(Math.min(NAME.length, Math.ceil((next / 100) * NAME.length)));

      if (next < 100) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="glass-shell" role="status" aria-live="polite">
      <div className="glass-shell__blob glass-shell__blob--one" aria-hidden="true" />
      <div className="glass-shell__blob glass-shell__blob--two" aria-hidden="true" />
      <div className="glass-shell__grid" aria-hidden="true" />

      <div className="glass-loader">
        <div className="glass-loader__shine" aria-hidden="true" />

        <p className="glass-loader__eyebrow">Loading portfolio</p>

        <h1 className="glass-loader__title">
          {NAME.split("").map((char, index) => (
            <span
              key={`${char}-${index}`}
              className={`glass-loader__letter ${index < letters ? "is-visible" : ""
                }`}
            >
              {char}
            </span>
          ))}
        </h1>

        <p className="glass-loader__subtitle">
          Frontend Engineer • React • Product UI
        </p>

        <div className="glass-loader__bottom">
          <div className="glass-loader__track">
            <div
              className="glass-loader__bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="glass-loader__value">{progress}%</span>
        </div>
        <br />
        <button
          type="button"
          className="btn-primary"
          onClick={() => navigate("/", { replace: true })}
        >
          Take Me Home
        </button>
      </div>
    </div>
  );
}