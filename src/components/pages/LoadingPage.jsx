import React, { useEffect, useMemo, useState } from "react";
import "./LoadingPage.css";

const loaderWords = ["React", "UI", "Motion", "Scale"];

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;

    const duration = 2200;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const nextProgress = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(nextProgress);

      if (nextProgress < 100) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % loaderWords.length);
    }, 550);

    return () => clearInterval(interval);
  }, []);

  const currentWord = useMemo(() => loaderWords[wordIndex], [wordIndex]);

  return (
    <div
      className="loading-page"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="loading-page__bg-grid" aria-hidden="true" />
      <div className="loading-page__glow loading-page__glow--one" aria-hidden="true" />
      <div className="loading-page__glow loading-page__glow--two" aria-hidden="true" />

      <div className="loading-page__center">
        <div className="loading-page__orbital" aria-hidden="true">
          <div className="loading-page__ring loading-page__ring--one" />
          <div className="loading-page__ring loading-page__ring--two" />
          <div className="loading-page__core">
            <span>{progress}%</span>
          </div>
        </div>

        <p className="loading-page__eyebrow">Initializing portfolio experience</p>

        <h1 className="loading-page__title">
          Shubham Raj
          <span className="loading-page__dot">.</span>
        </h1>

        <p className="loading-page__roleline">
          Building with <span className="loading-page__word">{currentWord}</span>
        </p>

        <div className="loading-page__progress">
          <div className="loading-page__progress-top">
            <span>loading</span>
            <span>{progress}%</span>
          </div>

          <div className="loading-page__track" aria-hidden="true">
            <div
              className="loading-page__bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}