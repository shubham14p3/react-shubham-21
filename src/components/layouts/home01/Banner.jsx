import React, { useEffect, useMemo, useState } from "react";
import resumeOne from "../../../assets/resume/resume.pdf";
import profileImage from "../../../assets/images/section/03.png";
import "./Banner.css";

const roles = [
  "Senior Frontend Engineer",
  "React Developer",
  "UI Performance Specialist",
];

const stats = [
  { id: 1, value: "6.5+", label: "Experience" },
  { id: 2, value: "50+", label: "Features" },
  { id: 3, value: "35%", label: "Performance" },
];

const focusAreas = [
  "React Architecture",
  "Performance",
  "Design Systems",
  "Accessibility",
  "Scalable UI",
];

export default function Banner() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  const currentRole = useMemo(() => roles[roleIndex], [roleIndex]);

  return (
    <section id="home" className="hero section-anchor">
      <div className="hero__bg-orb hero__bg-orb--one" />
      <div className="hero__bg-orb hero__bg-orb--two" />

      <div className="container-shell hero__grid">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot" />
            <span>Available for impactful frontend roles</span>
          </div>

          <h1 className="hero__title">
            Building <span className="fancy-highlight">fast</span>,
            <span className="fancy-highlight">scalable,</span>
            <span className="fancy-highlight">user-focused</span> digital
            experiences.
          </h1>

          <p className="hero__subtitle">
            Hi, I’m <strong>Shubham Raj</strong> — a
            <strong className="role-text">{currentRole}</strong> with
            <span className="inline-highlight">6.5+ years</span> of experience
            building enterprise-grade web applications using
            <span className="inline-highlight">React</span>,
            <span className="inline-highlight">Redux</span>,
            <span className="inline-highlight">Next.js</span>, and modern
            frontend architecture across
            <span className="inline-highlight">banking</span>,
            <span className="inline-highlight">fintech</span>, and product
            delivery environments.
          </p>

          <div className="hero__tabs" aria-label="Core expertise">
            {focusAreas.map((item, index) => (
              <button
                key={item}
                type="button"
                className={`hero-tab ${activeTab === index ? "is-active" : ""}`}
                onMouseEnter={() => setActiveTab(index)}
                onFocus={() => setActiveTab(index)}
              >
                <span>{item}</span>
              </button>
            ))}
          </div>

          <div className="hero__cta">
            <a
              href={resumeOne}
              target="_blank"
              rel="noreferrer noopener"
              download
              className="btn-primary"
            >
              Download Resume
            </a>

            <a href="#contact" className="btn-secondary">
              Let’s Talk
            </a>
          </div>

          <div className="hero__stats" aria-label="Career highlights">
            {stats.map((item) => (
              <div key={item.id} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero-card glass-card">
            <div className="hero-card__image">
              <img src={profileImage} alt="Shubham Raj profile" />
            </div>

            <div className="hero-badges">
              <div className="hero-badge">
                <span className="hero-badge__label">Current role</span>
                <span className="hero-badge__value">
                  Senior Associate Consultant
                </span>
              </div>

              <div className="hero-badge">
                <span className="hero-badge__label">Core stack</span>
                <span className="hero-badge__value">
                  React · JavaScript · Next.js · Node.js · Vite
                </span>
              </div>

              <div className="hero-badge">
                <span className="hero-badge__label">Strength</span>
                <span className="hero-badge__value">
                  Performance · Reusability · Quality
                </span>
              </div>
            </div>

            <div className="hero-card__ring" />
          </div>
        </div>
      </div>
    </section>
  );
}