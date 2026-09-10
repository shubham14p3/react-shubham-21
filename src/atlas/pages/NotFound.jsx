import "../pages.css";
import { useState } from "react";
import { Action } from "../components/Primitives";
export default function NotFound() {
  const [connected, setConnected] = useState(false);
  return (
    <section className="not-found page-wrap">
      <p className="section-label">404 / UNMAPPED TERRITORY</p>
      <div className={`lost-tree ${connected ? "reconnected" : ""}`}>
        <span>App</span>
        <i aria-hidden="true" />
        <button
          type="button"
          onClick={() => setConnected((value) => !value)}
          aria-pressed={connected}
        >
          {connected ? "Connection restored ✓" : "Missing component ?"}
        </button>
      </div>
      <h1 tabIndex={-1}>
        Lost in the
        <br />
        <span>component tree.</span>
      </h1>
      <p>
        This route has no component. Your next good discovery is a click away.
      </p>
      <div className="action-row">
        <Action to="/">Back to the atlas</Action>
        <Action to="/lab" secondary>
          Explore the Lab
        </Action>
      </div>
    </section>
  );
}
