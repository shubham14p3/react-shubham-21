import { useState } from "react";
const steps = [
  {
    title: "Frame the problem",
    owner: "HUMAN",
    text: "Define the user journey, constraints, and what a successful interface needs to do.",
  },
  {
    title: "Explore alternatives",
    owner: "AI-ASSISTED",
    text: "Use Claude Code, GitHub Copilot, or Gemini to explore implementation options and surface tradeoffs.",
  },
  {
    title: "Choose the architecture",
    owner: "HUMAN",
    text: "Evaluate boundaries, dependencies, accessibility, security, and performance. Own the decision.",
  },
  {
    title: "Implement with context",
    owner: "HUMAN × AI",
    text: "Build in small, reviewable increments. Generated code must fit the existing system and its standards.",
  },
  {
    title: "Test & review",
    owner: "HUMAN-VALIDATED",
    text: "Verify behavior and edge cases. Review the diff, dependency impact, and the actual user experience.",
  },
  {
    title: "Release with ownership",
    owner: "HUMAN",
    text: "Production readiness remains an engineering responsibility. AI assistance does not replace accountable delivery.",
  },
];
export default function AIExperiment() {
  const [active, setActive] = useState(0);
  const [reviewed, setReviewed] = useState(false);
  const item = steps[active];
  return (
    <div className="ai-experiment">
      <div
        className="ai-steps"
        role="group"
        aria-label="AI-assisted engineering workflow"
      >
        {steps.map((step, index) => (
          <button
            type="button"
            key={step.title}
            aria-pressed={active === index}
            onClick={() => setActive(index)}
          >
            <span>0{index + 1}</span>
            {step.title}
            <small>{step.owner}</small>
          </button>
        ))}
      </div>
      <div className="ai-step-detail">
        <span className="section-label">
          0{active + 1} / {item.owner}
        </span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        {active === 4 && (
          <label className="check-control">
            <input
              type="checkbox"
              checked={reviewed}
              onChange={(e) => setReviewed(e.target.checked)}
            />
            I’ve reviewed the illustrative change and its tests.
          </label>
        )}
        {active === 5 ? (
          <p className="ai-review-status">
            {reviewed
              ? "Review acknowledged. Ready for a real release decision."
              : "Explore the workflow freely. A real release still needs the review step."}
          </p>
        ) : (
          <button
            className="text-button"
            type="button"
            disabled={active === 4 && !reviewed}
            onClick={() => setActive((value) => value + 1)}
          >
            Next responsibility →
          </button>
        )}
      </div>
      <p className="illustration-note">
        Illustrative workflow. No prompts, source code, or personal information
        leave this page.
      </p>
    </div>
  );
}
