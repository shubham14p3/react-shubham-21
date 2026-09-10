import "../pages.css";
import profile from "../../data/profile.json";
import { Action, PageIntro } from "../components/Primitives";
export default function Resume() {
  return (
    <div className="page-wrap">
      <PageIntro
        number="08"
        label="Résumé"
        title={
          <>
            The story.
            <br />
            <span>Without the scenery.</span>
          </>
        }
      >
        <p>
          A clear account of my experience, responsibilities, and toolkit. The
          downloadable PDF is designed for straightforward reading and ATS
          parsing.
        </p>
      </PageIntro>
      <div className="resume-actions">
        <Action to="/shubham-raj-resume.pdf" download event="resume_download">
          Download PDF résumé
        </Action>
        <button
          className="action action-secondary"
          type="button"
          onClick={() => window.print()}
        >
          Print this page ↗
        </button>
      </div>
      <article className="web-resume">
        <header>
          <h2>{profile.name}</h2>
          <p>
            {profile.headline} · {profile.location}
          </p>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <div>
            <a href={profile.github}>GitHub</a>
            <a href={profile.linkedin}>LinkedIn</a>
            <a href={profile.website}>shubhamraj.dev</a>
          </div>
          <p>{profile.summary}</p>
        </header>
        <section>
          <h2>Experience</h2>
          {profile.roles.map((role) => (
            <article key={role.company}>
              <div className="resume-role-heading">
                <h3>
                  {role.title} · {role.company}
                </h3>
                <span>{role.dates}</span>
              </div>
              <p>
                {role.location} · {role.clients}
              </p>
              <ul>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <p className="resume-stack">{role.stack.join(" · ")}</p>
            </article>
          ))}
        </section>
        <section>
          <h2>Technical capabilities</h2>
          {profile.skillGroups.map((group) => (
            <p key={group.title}>
              <strong>{group.title}:</strong> {group.items.join(", ")}
            </p>
          ))}
        </section>
        <section>
          <h2>Education</h2>
          {profile.education.map((item) => (
            <p key={item.school}>
              <strong>{item.degree}</strong>
              <br />
              {item.school}
              {item.dates ? ` · ${item.dates}` : ""}
            </p>
          ))}
        </section>
        <section>
          <h2>Certifications & learning</h2>
          <ul>
            {profile.certifications.map((item) => (
              <li key={item.name}>
                {item.name} · {item.issuer} · {item.date} ({item.type})
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
