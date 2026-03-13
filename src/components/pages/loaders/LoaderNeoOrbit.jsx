import React, { useEffect, useState } from "react";
import "./LoaderNeoOrbit.css";
import { useNavigate } from "react-router-dom";

const words = ["React", "UI", "Motion", "Scale"];

export default function LoaderNeoOrbit() {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let frameId;
    let startTime;
    const duration = 2200;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const next = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(next);

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
    }, 650);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="neo-shell" role="status" aria-live="polite">
      <div className="neo-shell__grid" aria-hidden="true" />
      <div className="neo-shell__glow neo-shell__glow--one" aria-hidden="true" />
      <div className="neo-shell__glow neo-shell__glow--two" aria-hidden="true" />

      <div className="neo-card">
        <div className="neo-card__border" />

        <div className="neo-content">
          <div className="neo-orbit-wrap" aria-hidden="true">
            <div className="neo-orbit">
              <div className="neo-orbit__ring neo-orbit__ring--one" />
              <div className="neo-orbit__ring neo-orbit__ring--two" />
              <div className="neo-orbit__ring neo-orbit__ring--three" />
              <div className="neo-orbit__core">
                <span>{progress}%</span>
              </div>
              <div className="neo-orbit__pulse" />
            </div>
          </div>

          <p className="neo-eyebrow">Initializing portfolio experience</p>

          <h1 className="neo-title">
            Shubham Raj<span className="neo-title__dot">.</span>
          </h1>

          <p className="neo-subtitle">
            Building with{" "}
            <span className="neo-word-pill">
              <span className="neo-word">{words[wordIndex]}</span>
            </span>
          </p>

          <div className="neo-progress">
            <div className="neo-progress__top">
              <span>Loading</span>
              <span>{progress}%</span>
            </div>

            <div className="neo-progress__track">
              <div
                className="neo-progress__bar"
                style={{ width: `${progress}%` }}
              />
            </div>

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
    </div>
  );
}