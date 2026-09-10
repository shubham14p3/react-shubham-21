import { useState } from "react";
const accents = [
  { name: "Clay", hex: "#984329" },
  { name: "Forest", hex: "#27604b" },
  { name: "Indigo", hex: "#45458b" },
];
export default function TokenExperiment() {
  const [accent, setAccent] = useState(0);
  const [roundness, setRoundness] = useState(8);
  const [dense, setDense] = useState(false);
  const [sent, setSent] = useState(false);
  const [dark, setDark] = useState(false);
  return (
    <div className="token-experiment">
      <div className="token-controls">
        <fieldset>
          <legend>Accent family</legend>
          {accents.map((item, i) => (
            <button
              key={item.name}
              type="button"
              style={{ "--swatch": item.hex }}
              aria-pressed={accent === i}
              onClick={() => setAccent(i)}
            >
              {item.name}
            </button>
          ))}
        </fieldset>
        <label className="check-control">
          <input
            type="checkbox"
            checked={dense}
            onChange={(e) => setDense(e.target.checked)}
          />
          Compact density
        </label>
        <label className="check-control">
          <input
            type="checkbox"
            checked={dark}
            onChange={(e) => setDark(e.target.checked)}
          />
          Dark surface
        </label>
        <label className="token-radius">
          Corner radius <output>{roundness}px</output>
          <input
            aria-label="Component corner radius"
            type="range"
            min="0"
            max="24"
            value={roundness}
            onChange={(e) => setRoundness(Number(e.target.value))}
          />
        </label>
      </div>
      <div
        className={`token-preview ${dark ? "token-dark" : ""} ${dense ? "token-dense" : ""}`}
        style={{
          "--demo-accent": accents[accent].hex,
          "--demo-radius": `${roundness}px`,
        }}
      >
        <div className="token-preview-head">
          <span>WORKSPACE / PREVIEW</span>
          <span>SR</span>
        </div>
        <h3>
          One decision.
          <br />
          Every component.
        </h3>
        <p>
          Shared tokens keep the whole interface speaking the same language.
        </p>
        <label>
          Project name
          <input value="Interface Atlas" readOnly />
        </label>
        <div className="token-status">
          <span>✓</span>Ready for a human review
        </div>
        <button type="button" onClick={() => setSent((value) => !value)}>
          {sent ? "Review requested ✓" : "Request review ↗"}
        </button>
        <p role="status">
          {sent
            ? "Demo only. No request was sent."
            : "Interactive design-system demonstration."}
        </p>
      </div>
    </div>
  );
}
