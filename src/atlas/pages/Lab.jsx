import "../pages.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PageIntro, Closing } from "../components/Primitives";
import MiniTerminal from "../components/MiniTerminal";
import { track } from "../seo/analytics";
const experiments = [
  {
    id: "spring",
    title: "Spring dynamics",
    kind: "MOTION / PHYSICS",
    component: lazy(() => import("../lab/SpringExperiment")),
    problem:
      "Make a response feel attached to user input, not played from a recording.",
    technique:
      "A damped spring integrates velocity toward a pointer or keyboard-controlled target.",
    technology: "React, requestAnimationFrame, CSS transforms.",
    accessibility:
      "Native range controls provide the same destinations without dragging. Reduced motion jumps directly to the target.",
    performance:
      "The animation stops when settled and cancels on unmount. Frame delta is bounded after a pause.",
  },
  {
    id: "depth",
    title: "Depth & hierarchy",
    kind: "PERSPECTIVE / INTERACTION",
    component: lazy(() => import("../lab/TiltExperiment")),
    problem: "Use depth to clarify foreground actions and background context.",
    technique:
      "Separate interface layers in CSS 3D space; map pointer position to a bounded viewing angle.",
    technology: "React, CSS perspective, transform-style.",
    accessibility:
      "Sliders offer a touch and keyboard alternative. Reduced motion keeps a stable composition.",
    performance:
      "Transform-only updates. No textures, models, or WebGL dependency for this experiment.",
  },
  {
    id: "tokens",
    title: "One token, many parts",
    kind: "SYSTEMS / COMPONENTS",
    component: lazy(() => import("../lab/TokenExperiment")),
    problem:
      "Keep a family of components consistent as product requirements change.",
    technique:
      "Change semantic design tokens and let the component family inherit them.",
    technology: "React state and CSS custom properties.",
    accessibility:
      "Labeled native controls, readable accents, and a status message for the demo action.",
    performance:
      "One small state update changes shared CSS variables. No separate theme library.",
  },
  {
    id: "render",
    title: "The cost of a change",
    kind: "STATE / PERFORMANCE",
    component: lazy(() => import("../lab/RenderExperiment")),
    problem:
      "Explain why a small interaction can update too much of an interface.",
    technique:
      "Compare broad and scoped state propagation through a conceptual component tree.",
    technology: "React and CSS state visualization.",
    accessibility:
      "Text labels and a live result describe every state; color is supplementary.",
    performance:
      "A bounded nine-node model. The displayed counts are illustrative, not fabricated benchmark results.",
  },
  {
    id: "human-ai",
    title: "Human × AI engineering",
    kind: "WORKFLOW / OWNERSHIP",
    component: lazy(() => import("../lab/AIExperiment")),
    problem:
      "Accelerate engineering without surrendering architecture and quality decisions.",
    technique:
      "Explore the handoffs from framing and AI assistance to human review and release ownership.",
    technology:
      "React; professional context for Claude Code, Copilot, and Gemini.",
    accessibility:
      "Every stage is a native button with an explicit selected state; review uses a labeled checkbox.",
    performance: "Local state only. No AI service calls or data transmission.",
  },
];
export default function Lab() {
  const location = useLocation();
  const [active, setActive] = useState("spring");
  const current =
    experiments.find((item) => item.id === active) || experiments[0];
  const Experiment = current.component;
  useEffect(() => {
    const id = location.hash.slice(1);
    if (experiments.some((item) => item.id === id)) setActive(id);
  }, [location.hash]);
  return (
    <div className="page-wrap">
      <PageIntro
        number="03"
        label="Frontend lab / interactive studies"
        title={
          <>
            Touch the interface.
            <br />
            <span>See the thinking.</span>
          </>
        }
      >
        <p>
          Five small experiments in the details that matter. Change a parameter.
          Follow a state transition. Feel the difference.
        </p>
      </PageIntro>
      <div className="lab-index" role="group" aria-label="Choose an experiment">
        {experiments.map((item, index) => (
          <button
            type="button"
            key={item.id}
            id={item.id}
            aria-pressed={active === item.id}
            aria-controls="active-experiment"
            onClick={() => {
              setActive(item.id);
              track("lab_interaction", { experiment: item.id });
            }}
          >
            <span>0{index + 1}</span>
            <b>{item.title}</b>
            <small>{item.kind}</small>
          </button>
        ))}
      </div>
      <section
        className="active-experiment"
        id="active-experiment"
        aria-label={current.title}
      >
        <header>
          <span>{current.kind}</span>
          <h2>{current.title}</h2>
          <span>LIVE / INTERACTIVE</span>
        </header>
        <div className="experiment-surface">
          <Suspense
            fallback={
              <p className="experiment-loading" role="status">
                Preparing the experiment…
              </p>
            }
          >
            <Experiment />
          </Suspense>
        </div>
        <details className="experiment-notes" open>
          <summary>
            Under the surface <span>↗</span>
          </summary>
          <dl>
            {[
              ["Problem", current.problem],
              ["Technique", current.technique],
              ["Technology", current.technology],
              ["Accessibility", current.accessibility],
              ["Performance", current.performance],
            ].map(([label, text]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </details>
      </section>
      <section className="lab-catalog" aria-label="All experiment descriptions">
        <h2>
          Small studies.
          <br />
          <span>Useful questions.</span>
        </h2>
        {experiments.map((item, index) => (
          <article key={item.id}>
            <span>0{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.problem}</p>
          </article>
        ))}
      </section>
      <MiniTerminal />
      <Closing compact />
    </div>
  );
}
