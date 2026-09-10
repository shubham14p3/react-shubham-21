import { Link } from "react-router-dom";
import profile from "../../data/profile.json";
import { Action } from "./Primitives";
export default function RecruiterBrief() {
  return (
    <section className="recruiter-brief" aria-label="Recruiter summary">
      <div className="recruiter-lead">
        <p className="section-label">THE 60-SECOND VERSION</p>
        <h1 tabIndex={-1}>
          Shubham Raj.
          <br />
          <span>Senior Frontend Engineer.</span>
        </h1>
        <p>{profile.summary}</p>
        <div className="action-row">
          <Action to="/shubham-raj-resume.pdf" download event="resume_download">
            Download résumé
          </Action>
          <Action to="/contact" secondary>
            Contact Shubham
          </Action>
        </div>
      </div>
      <div className="brief-evidence">
        <div>
          <b>6+</b>
          <span>years of professional experience</span>
        </div>
        <div>
          <b>40%</b>
          <span>better page load performance · Citi</span>
        </div>
        <div>
          <b>50+</b>
          <span>features · Capgemini banking work</span>
        </div>
      </div>
      <div className="brief-columns">
        <div>
          <h2>Current focus</h2>
          <p>
            Senior Associate Consultant at Infosys. Visa engagement in Mexico
            City. React, TypeScript, shared monorepos, and enterprise UI
            architecture.
          </p>
          <Link to="/work/visa">Current engineering story ↗</Link>
        </div>
        <div>
          <h2>Where I’ve worked</h2>
          {profile.roles.map((role) => (
            <p key={role.company}>
              <strong>{role.company}</strong> · {role.dates}
              <br />
              <span>{role.clients}</span>
            </p>
          ))}
          <Link to="/about#experience">Full experience ↗</Link>
        </div>
        <div>
          <h2>Core strengths</h2>
          <p>
            React · TypeScript · Next.js
            <br />
            Design systems · State and data
            <br />
            Performance · Accessibility
            <br />
            Testing · CI/CD · AI-assisted engineering
          </p>
          <Link to="/stack">Skills connected to evidence ↗</Link>
        </div>
      </div>
      <p className="brief-note">
        Based in Mexico City. Contact me to discuss role fit, location, and
        availability.
      </p>
    </section>
  );
}
