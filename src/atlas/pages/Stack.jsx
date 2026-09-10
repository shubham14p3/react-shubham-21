import "../pages.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import profile from "../../data/profile.json";
import { capabilities } from "../data/atlas";
import { Action, Closing, PageIntro } from "../components/Primitives";
export default function Stack() {
  const [active, setActive] = useState(0);
  const item = capabilities[active];
  return (
    <div className="page-wrap">
      <PageIntro
        number="06"
        label="Engineering capabilities"
        title={
          <>
            A connected system.
            <br />
            <span>Not a list of logos.</span>
          </>
        }
      >
        <p>
          Tools matter most when they solve a real problem. Follow a capability
          to the work that puts it into practice.
        </p>
      </PageIntro>
      <section className="capability-map">
        <div
          className="capability-orbit"
          role="group"
          aria-label="Choose an engineering capability"
        >
          <div className="orbit-center" aria-hidden="true">
            UI
            <br />
            <span>ENGINEERING</span>
          </div>
          {capabilities.map((node, i) => (
            <button
              type="button"
              key={node.id}
              style={{ "--angle": `${i * 60}deg`, "--node-color": node.color }}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              <b>{node.label}</b>
            </button>
          ))}
        </div>
        <div
          className="capability-detail"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="section-label">
            0{active + 1} / {item.detail}
          </span>
          <h2>{item.title}</h2>
          <p>{item.body}</p>
          <Action to={item.to} secondary>
            {item.evidence}
          </Action>
        </div>
      </section>
      <section className="toolkit-index">
        <h2>The working toolkit.</h2>
        {profile.skillGroups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            <p>{group.items.join(" / ")}</p>
          </div>
        ))}
        <p className="illustration-note">
          Three.js and procedural 3D are demonstrated by this portfolio’s
          interactive atlas. The career stories describe the technologies used
          in those engagements.
        </p>
        <Link to="/lab" className="text-link">
          Explore the tools in action ↗
        </Link>
      </section>
      <Closing compact />
    </div>
  );
}
