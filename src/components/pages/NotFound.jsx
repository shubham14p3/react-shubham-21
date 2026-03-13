import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./NonFound.css";

const messages = [
  "404: This page rage-quit.",
  "Oops. The page is on a chai break.",
  "This route is still under construction 🚧",
  "The developer deployed confidence, not this page.",
  "Page missing. Vibes found.",
  "You found a secret area... sadly, it's empty.",
  "This page is probably attending a standup meeting.",
  "The page escaped into production and never came back.",
];

function randomBinary(length = 24) {
  return Array.from({ length }, () => (Math.random() > 0.5 ? "1" : "0")).join("");
}

export default function NotFound() {
  const navigate = useNavigate();

  const randomMessage = useMemo(
    () => messages[Math.floor(Math.random() * messages.length)],
    []
  );

  const glitchCode = useMemo(() => randomBinary(24), []);

  return (
    <main className="not-found-fun">
      <div className="not-found-fun__bg not-found-fun__bg--1" />
      <div className="not-found-fun__bg not-found-fun__bg--2" />
      <div className="not-found-fun__grid" />

      <section className="not-found-fun__card glass-card">
        <div className="not-found-fun__badge">Route Error // 404</div>

        <div className="not-found-fun__hero">
          <span className="not-found-fun__emoji">🛸</span>
          <h1 className="not-found-fun__title">
            This page is under development...
            <br />
            or it vanished dramatically.
          </h1>
        </div>

        <p className="not-found-fun__subtitle">{randomMessage}</p>

        <div className="not-found-fun__console">
          <div className="not-found-fun__console-line">
            <span>&gt;</span> route.lookup("/this-page")
          </div>
          <div className="not-found-fun__console-line not-found-fun__console-line--error">
            <span>&gt;</span> ERROR: page_not_found
          </div>
          <div className="not-found-fun__console-line">
            <span>&gt;</span> signal: {glitchCode}
          </div>
          <div className="not-found-fun__console-line">
            <span>&gt;</span> status: redirect recommended
          </div>
        </div>

        <div className="not-found-fun__actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate("/", { replace: true })}
          >
            Take Me Home
          </button>

          <button
            type="button"
            className="not-found-fun__ghost-btn"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>

        <p className="not-found-fun__footer">
          Friendly advice: when a page disappears, click the safe button.
        </p>
      </section>
    </main>
  );
}