import { useState } from "react";
const variants = {
  visa: [
    [
      "Product surfaces",
      "Multiple enterprise products consume a shared interface foundation. Keep product decisions close to their owners.",
    ],
    [
      "Shared UI",
      "Composable React components express common patterns. A shared change needs clear communication across consumers.",
    ],
    [
      "State & contracts",
      "Typed boundaries make state and data responsibilities easier to understand and review.",
    ],
    [
      "Quality gate",
      "Tests, review, and coordinated delivery protect the teams depending on that foundation.",
    ],
  ],
  citi: [
    [
      "User intent",
      "An interaction should trigger the smallest useful update. Make loading, success, and error states explicit.",
    ],
    [
      "State boundary",
      "Localize state and subscriptions to avoid making unrelated components do unnecessary work.",
    ],
    [
      "Deferred feature",
      "Load features when needed. Split meaningful product boundaries rather than every tiny component.",
    ],
    [
      "Visible response",
      "Measure loading and rendering separately. Faster initial delivery and fewer re-renders solve different problems.",
    ],
  ],
  discover: [
    [
      "Design intent",
      "Translate the recurring user journey into a consistent set of interaction patterns.",
    ],
    [
      "Component family",
      "Reusable React and Material UI patterns let teams extend functionality with less duplication.",
    ],
    [
      "Behavior contract",
      "Document states and exercise them with Jest and React Testing Library.",
    ],
    [
      "Delivery confidence",
      "Cross-browser care, API optimization, code review, and CI checks support reliable feature delivery.",
    ],
  ],
};
export default function ArchitectureExplorer({ variant = "visa" }) {
  const [selected, setSelected] = useState(0);
  const nodes = variants[variant];
  return (
    <div className="architecture-explorer">
      <div className="architecture-toolbar">
        <span>INTERACTIVE SYSTEM VIEW</span>
        <span>Illustrative architecture</span>
      </div>
      <div
        className="architecture-nodes"
        role="group"
        aria-label="Explore architecture responsibilities"
      >
        {nodes.map(([label], index) => (
          <button
            key={label}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <span>0{index + 1}</span>
            <b>{label}</b>
            <i aria-hidden="true">{index < nodes.length - 1 ? "→" : "✓"}</i>
          </button>
        ))}
      </div>
      <div
        className="architecture-detail"
        aria-live="polite"
        aria-atomic="true"
      >
        <span>0{selected + 1} / RESPONSIBILITY</span>
        <h3>{nodes[selected][0]}</h3>
        <p>{nodes[selected][1]}</p>
      </div>
      <p className="illustration-note">
        A conceptual explanation of frontend responsibilities, created for this
        portfolio. It does not document a client’s private system.
      </p>
    </div>
  );
}
