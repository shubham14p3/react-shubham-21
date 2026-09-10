import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { capabilities } from "../data/atlas";
import { useExperience } from "../hooks/ExperienceContext";
import { Arrow } from "../components/Primitives";
export default function Atlas({ standalone = false }) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [rotation, setRotation] = useState(0);
  const host = useRef(null);
  const engine = useRef(null);
  const { reduced } = useExperience();
  const current = capabilities[active];
  useEffect(() => {
    if (reduced || failed) return;
    let cancelled = false;
    let renderer;
    const timer = setTimeout(() => {
      import("./createAtlasScene")
        .then(({ createAtlasScene }) => {
          if (cancelled || !host.current) return;
          renderer = createAtlasScene(host.current, {
            compact: matchMedia("(max-width: 600px)").matches,
            onFailure: () => {
              if (!cancelled) setFailed(true);
            },
          });
          engine.current = renderer;
          setReady(true);
        })
        .catch(() => {
          if (!cancelled) setFailed(true);
        });
    }, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      renderer?.dispose();
      engine.current = null;
      setReady(false);
    };
  }, [reduced, failed]);
  useEffect(() => {
    engine.current?.select(active);
  }, [active, ready]);
  useEffect(() => {
    engine.current?.rotate((rotation * Math.PI) / 180);
  }, [rotation, ready]);
  return (
    <div
      className={`atlas ${standalone ? "atlas-standalone" : ""} ${ready && !failed && !reduced ? "atlas-ready" : "atlas-fallback"}`}
    >
      <div className="atlas-render" ref={host} aria-hidden="true" />
      <div className="atlas-blueprint" aria-hidden="true">
        {capabilities.map((item, i) => (
          <div
            key={item.id}
            className={`blueprint-plane ${active === i ? "chosen" : ""}`}
            style={{ "--layer": i, "--plane-color": item.color }}
          >
            <span>
              0{i + 1} / {item.label}
            </span>
            <b>{item.detail.split(" · ")[0]}</b>
            <div className="blueprint-grid">
              <i />
              <i />
              <i />
            </div>
          </div>
        ))}
      </div>
      <div
        className="atlas-selector"
        role="group"
        aria-label="Explore engineering layers"
      >
        {capabilities.map((item, i) => (
          <button
            type="button"
            key={item.id}
            style={{ "--node-color": item.color }}
            className={active === i ? "selected" : ""}
            aria-pressed={active === i}
            aria-controls="atlas-evidence"
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {item.label}
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
      <div
        className="atlas-evidence"
        id="atlas-evidence"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="evidence-coordinate">LAYER 0{active + 1} / 06</span>
        <p>{current.title}</p>
        <Link to={current.to}>
          {current.evidence}
          <Arrow />
        </Link>
      </div>
      <div className="atlas-instructions">
        <span>
          {reduced || failed
            ? "Select a layer to explore"
            : "Move to shift perspective · Select a layer"}
        </span>
        <label>
          Rotate
          <input
            aria-label="Rotate the interface atlas"
            type="range"
            min="-35"
            max="35"
            step="1"
            value={rotation}
            disabled={reduced || failed}
            onChange={(e) => setRotation(Number(e.target.value))}
          />
        </label>
      </div>
    </div>
  );
}
