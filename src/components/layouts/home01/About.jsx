import React from "react";
import "./About.css";
import linkedinIcon from "../../../assets/icon/linkedin.svg";
import githubIcon from "../../../assets/icon/github.svg";
import hackerrankIcon from "../../../assets/icon/hackerrank.svg";
import skypeIcon from "../../../assets/icon/skype.svg";
import facebookIcon from "../../../assets/icon/facebook.svg";
import image03 from "../../../assets/images/section/03.png";

const links = [
  {
    id: 1,
    icon: linkedinIcon,
    label: "LinkedIn",
    note: "Professional profile",
    href: "https://www.linkedin.com/in/shubham14p3/",
  },
  {
    id: 2,
    icon: githubIcon,
    label: "GitHub",
    note: "Code and projects",
    href: "https://github.com/shubham14p3",
  },
  {
    id: 3,
    icon: hackerrankIcon,
    label: "HackerRank",
    note: "Problem solving",
    href: "https://www.hackerrank.com/shubham14p3?hr_r=1",
  },
  {
    id: 4,
    icon: skypeIcon,
    label: "Skype",
    note: "Direct contact",
    href: "https://join.skype.com/invite/UbpHpl5nupqt",
  },
  {
    id: 5,
    icon: facebookIcon,
    label: "Facebook",
    note: "Social profile",
    href: "https://www.facebook.com/shubham14p3/",
  },
];

const skills = [
  "React.js",
  "Redux",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Material UI",
  "Node.js",
  "MongoDB",
  "Jest",
  "RTL",
  "CI/CD",
  "AWS",
  "GCP",
  "Accessibility",
];

export default function About() {
  return (
    <section id="about" className="section-shell section-anchor">
      <div className="container-shell">
        <div className="section-title-wrap">
          <div className="section-eyebrow">About me</div>
          <h2 className="section-title">
            Product-minded frontend engineer with strong execution and clean
            architecture.
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-card glass-card">
            <div className="about-card__image">
              <img src={image03} alt="Shubham Raj portrait" />
            </div>

            <div className="about-card__meta">
              <div className="social-grid">
                {links.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="social-chip"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      width="28"
                      height="28"
                      loading="lazy"
                    />
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.note}</small>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="about-panel glass-card">
            <p className="about-copy">
              I am a frontend developer with <strong>5.5 years</strong> of
              experience building scalable web applications in finance, gaming,
              media, and enterprise environments. My work focuses on
              high-quality user interfaces that are fast, maintainable, and easy
              to extend.
            </p>

            <p className="about-copy">
              I have worked across <strong>Infosys</strong>,{" "}
              <strong>Capgemini</strong>, <strong>Gammastack</strong>, and{" "}
              <strong>Nagravision</strong>, contributing to frontend
              architecture, reusable component libraries, code reviews, CI/CD
              setup, testing quality, and performance improvements.
            </p>

            <p className="about-copy">
              I enjoy solving product problems with a balance of engineering
              rigor and UI sensitivity. My strengths include React ecosystem
              development, cross-team collaboration, accessibility awareness,
              and writing code that is interview-worthy as well as production-ready.
            </p>

            <div className="skill-tags" aria-label="Core skills">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <div className="hero__cta" style={{ marginTop: 22 }}>
              <a href="mailto:shubham14p3@gmail.com" className="btn-primary">
                Let’s Collaborate
              </a>
              <a
                href="https://github.com/shubham14p3"
                target="_blank"
                rel="noreferrer noopener"
                className="btn-secondary"
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}