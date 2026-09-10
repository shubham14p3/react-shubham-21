import { Link } from "react-router-dom";
import Atlas from "../scene/Atlas";
import WorkCarousel from "../components/WorkCarousel";
import RecruiterBrief from "../components/RecruiterBrief";
import { Action, Arrow, Closing, SectionLabel } from "../components/Primitives";
import { useExperience } from "../hooks/ExperienceContext";
export default function Home() {
  const { recruiter } = useExperience();
  if (recruiter)
    return (
      <div className="page-wrap">
        <RecruiterBrief />
        <Closing compact />
      </div>
    );
  return (
    <>
      <section
        className="hero-world"
        aria-label="Shubham Raj’s interface atlas"
      >
        <div className="hero-topline">
          <span>Senior Frontend Engineer</span>
          <span>Based in Mexico City · Working globally</span>
        </div>
        <div className="hero-wordmark" aria-hidden="true">
          SHUBHAM RAJ
        </div>
        <Atlas />
        <div className="hero-title">
          <p>REACT / TYPESCRIPT / NEXT.JS</p>
          <h1 tabIndex={-1}>
            Complex systems.
            <br />
            <span>Effortless interfaces.</span>
          </h1>
          <div className="hero-bottom">
            <div className="hero-person">
              <img
                src="/images/shubham-360.webp"
                width="52"
                height="58"
                alt="Shubham Raj"
              />
              <p>
                I’m Shubham. I connect engineering depth
                <br className="desktop-break" /> with the details people feel.
              </p>
            </div>
            <div className="action-row">
              <Action to="/work">Explore my work</Action>
              <Action to="/resume" secondary>
                View résumé
              </Action>
            </div>
          </div>
        </div>
        <nav className="hero-socials" aria-label="Connect with Shubham">
          <a
            href="https://github.com/shubham14p3"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/shubham14p3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>
          <Link to="/contact">Contact ↗</Link>
        </nav>
        <a className="hero-scroll" href="#selected-work">
          <span>SCROLL TO EXPLORE</span>↓
        </a>
      </section>
      <section className="career-signal">
        <span className="signal-caption">
          6+ years.
          <br />
          One evolving obsession.
        </span>
        <p>
          From <Link to="/about#experience">testing what works</Link>
          <br />
          to <Link to="/work">engineering how it feels.</Link>
        </p>
        <div className="signal-route">
          <span>Nagravision</span>
          <i />
          <span>Gammastack</span>
          <i />
          <span>Capgemini</span>
          <i />
          <strong>Infosys</strong>
        </div>
      </section>
      <section className="selected-work" id="selected-work">
        <div className="section-heading">
          <SectionLabel number="02">Selected engineering stories</SectionLabel>
          <Link to="/work">
            All work <Arrow />
          </Link>
        </div>
        <h2 className="section-title">
          The systems behind
          <br />
          <span>the experience.</span>
        </h2>
        <WorkCarousel />
      </section>
      <section className="lab-invitation">
        <div>
          <SectionLabel number="03">The frontend lab</SectionLabel>
          <h2>
            Less “I can.”
            <br />
            <span>More “try it.”</span>
          </h2>
          <p>
            A small collection of working experiments in motion, state,
            interaction, and the details that make software feel good.
          </p>
          <Action to="/lab">Enter the Lab</Action>
        </div>
        <Link
          to="/lab#spring"
          className="lab-portal"
          data-cursor="PLAY"
          aria-label="Try the spring physics Lab"
        >
          <span className="portal-coordinate">
            EXPERIMENT 01 / SPRING DYNAMICS
          </span>
          <div className="portal-track">
            <span />
            <i />
            <b>↗</b>
          </div>
          <div className="portal-footer">
            <span>INPUT</span>
            <span>RESPONSE</span>
          </div>
          <p>
            A little tension.
            <br />A better interaction.
          </p>
        </Link>
      </section>
      <section className="human-note">
        <span aria-hidden="true">“</span>
        <blockquote>
          His ability to turn complex user requirements into clean, efficient,
          and intuitive interfaces is exceptional.
        </blockquote>
        <div>
          <span>
            Excerpt · Bhuvanendra Simbili
            <br />
            <small>Quality Engineering Analyst at Infosys</small>
          </span>
          <Link to="/recommendations">
            The people behind the work <Arrow />
          </Link>
        </div>
      </section>
      <Closing />
    </>
  );
}
