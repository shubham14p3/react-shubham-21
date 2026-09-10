import "../pages.css";
import { Link } from "react-router-dom";
import profile from "../../data/profile.json";
import {
  Action,
  Closing,
  PageIntro,
  SectionLabel,
} from "../components/Primitives";
import { useTilt } from "../hooks/useTilt";
export default function About() {
  const tilt = useTilt(5);
  return (
    <div className="page-wrap">
      <PageIntro
        number="04"
        label="The person behind the interface"
        title={
          <>
            Engineer by trade.
            <br />
            <span>Curious by default.</span>
          </>
        }
      />
      <section className="about-opening">
        <div className="portrait-depth" {...tilt}>
          <span className="portrait-frame" aria-hidden="true" />
          <picture>
            <source
              srcSet="/images/shubham-360.webp 360w, /images/shubham-549.webp 549w"
              type="image/webp"
              sizes="(max-width: 600px) 90vw, 40vw"
            />
            <img
              src="/images/shubham-549.webp"
              width="549"
              height="602"
              alt="Shubham Raj outdoors in a yellow jacket and black cap"
              fetchPriority="high"
            />
          </picture>
          <div className="portrait-caption">
            <span>SHUBHAM RAJ</span>
            <span>INDIA → MEXICO CITY</span>
          </div>
        </div>
        <div className="about-text">
          <SectionLabel number="01">A little context</SectionLabel>
          <h2>
            I care about
            <br />
            <span>how software feels.</span>
          </h2>
          <p>{profile.summary}</p>
          <p>
            My path began in quality engineering. That foundation still shapes
            my work: understand the behavior, think through the edge cases, and
            make the next change easier for the team.
          </p>
          <p>
            Today, I bring that mindset to enterprise UI—connecting React
            architecture, product clarity, performance, and the small
            interaction details that earn trust.
          </p>
          <Action to="/resume" secondary>
            View my résumé
          </Action>
        </div>
      </section>
      <section className="career-timeline" id="experience">
        <SectionLabel number="02">Career progression</SectionLabel>
        <h2>
          Every chapter
          <br />
          <span>changed the way I build.</span>
        </h2>
        {profile.roles.map((role, index) => (
          <article className="career-chapter" key={role.company}>
            <div className="career-date">
              <span>0{profile.roles.length - index}</span>
              <p>{role.dates}</p>
              <small>{role.location}</small>
            </div>
            <div>
              <h3>{role.company}</h3>
              <p className="career-role">{role.title}</p>
              <p className="career-clients">{role.clients}</p>
              <p>{role.summary}</p>
              <details>
                <summary>
                  Explore responsibilities <span>+</span>
                </summary>
                <ul>
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <p className="career-toolkit">{role.stack.join(" / ")}</p>
              </details>
              {index < 2 && (
                <Link
                  to={index === 0 ? "/work/visa" : "/work/discover"}
                  className="text-link"
                >
                  Explore an engineering story ↗
                </Link>
              )}
            </div>
          </article>
        ))}
      </section>
      <section className="philosophy">
        <SectionLabel number="03">The way I work</SectionLabel>
        <div>
          {[
            [
              "Understand before animating.",
              "Interaction should explain the product, acknowledge intent, and help someone move forward.",
            ],
            [
              "Build the next change in.",
              "Good boundaries, reusable components, and readable decisions make a team faster over time.",
            ],
            [
              "Treat speed as a feeling.",
              "Loading, input response, and meaningful feedback are all part of the same experience.",
            ],
          ].map(([title, text], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="learning">
        <SectionLabel number="04">Education & continuous learning</SectionLabel>
        <h2>Keep the curiosity.</h2>
        <div className="education-list">
          {profile.education.map((item) => (
            <article key={item.school}>
              <h3>{item.degree}</h3>
              <p>{item.school}</p>
              {item.dates && <span>{item.dates}</span>}
            </article>
          ))}
        </div>
        <details className="credentials">
          <summary>
            Certifications, courses & modules{" "}
            <span>{profile.certifications.length} ↗</span>
          </summary>
          <ul>
            {profile.certifications.map((item) => (
              <li key={item.name}>
                <span>
                  {item.name}
                  <small>
                    {item.issuer} · {item.type}
                  </small>
                </span>
                <span>{item.date}</span>
              </li>
            ))}
          </ul>
        </details>
      </section>
      <Closing compact />
    </div>
  );
}
