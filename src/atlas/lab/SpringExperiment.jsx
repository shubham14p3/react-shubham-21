import { useEffect, useRef, useState } from "react";
import { useExperience } from "../hooks/ExperienceContext";
import { track } from "../seo/analytics";
export default function SpringExperiment() {
  const [target, setTarget] = useState(70);
  const [tension, setTension] = useState(130);
  const [damping, setDamping] = useState(15);
  const handle = useRef(null);
  const position = useRef(25);
  const { reduced } = useExperience();
  useEffect(() => {
    if (reduced) {
      position.current = target;
      handle.current?.style.setProperty("--position", `${target}%`);
      return;
    }
    let frame = 0;
    let previous = 0;
    let velocity = 0;
    const tick = (time) => {
      const dt = Math.min(previous ? (time - previous) / 1000 : 1 / 60, 0.032);
      previous = time;
      const force = -tension * (position.current - target) - damping * velocity;
      velocity += force * dt;
      position.current += velocity * dt;
      handle.current?.style.setProperty(
        "--position",
        `${Math.max(0, Math.min(100, position.current))}%`,
      );
      if (
        Math.abs(velocity) > 0.02 ||
        Math.abs(target - position.current) > 0.02
      )
        frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, tension, damping, reduced]);
  const move = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTarget(
      Math.max(
        8,
        Math.min(92, ((event.clientX - rect.left) / rect.width) * 100),
      ),
    );
  };
  return (
    <div className="spring-experiment">
      <div className="experiment-readout">
        <span>F = −kx − cv</span>
        <span>
          {reduced
            ? "DIRECT RESPONSE / REDUCED MOTION"
            : "PHYSICS / NO ANIMATION LIBRARY"}
        </span>
      </div>
      <div
        className="spring-field"
        onPointerDown={(event) => {
          move(event);
          event.currentTarget.setPointerCapture(event.pointerId);
          track("lab_interaction", { experiment: "spring" });
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            move(event);
        }}
      >
        <div className="spring-ruler" aria-hidden="true" />
        <div
          className="spring-target"
          style={{ left: `${target}%` }}
          aria-hidden="true"
        />
        <div
          className="spring-handle"
          ref={handle}
          style={{ "--position": "25%" }}
          aria-hidden="true"
        >
          <span>↔</span>
        </div>
        <p>Drag or tap to set a destination.</p>
      </div>
      <div className="lab-sliders">
        <label>
          Position <output>{Math.round(target)}%</output>
          <input
            aria-label="Spring target position"
            type="range"
            min="8"
            max="92"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          />
        </label>
        <label>
          Tension <output>{tension}</output>
          <input
            aria-label="Spring tension"
            type="range"
            min="60"
            max="240"
            value={tension}
            onChange={(e) => setTension(Number(e.target.value))}
          />
        </label>
        <label>
          Damping <output>{damping}</output>
          <input
            aria-label="Spring damping"
            type="range"
            min="5"
            max="30"
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
          />
        </label>
      </div>
      <button
        type="button"
        className="text-button"
        onClick={() => setTarget((value) => (value > 50 ? 20 : 80))}
      >
        Send to the other side ↔
      </button>
    </div>
  );
}
