import React, { useEffect, useMemo, useState } from "react";
import resumeOne from "../../../assets/resume/resume.pdf";
import profileImage from "../../../assets/images/section/03.png";
import "./Banner.css";
const roles = ["Frontend Developer", "React Engineer", "UI Performance Specialist"];

const stats = [
  { id: 1, value: "5.5+", label: "Years of experience" },
  { id: 2, value: "50+", label: "Features delivered" },
  { id: 3, value: "35%", label: "Performance improvement" },
];

export default function Banner() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  const currentRole = useMemo(() => roles[roleIndex], [roleIndex]);

  return (
    <section id="home" className="hero section-anchor">
      <div className="container-shell hero__grid">
        <div className="hero__content">
          <div className="hero__eyebrow">
            <span>Available for impactful frontend roles</span>
          </div>

          <h1 className="hero__title">
            Building <span className="gradient-text">fast</span>,{" "}
            <span className="gradient-text">scalable</span>, user-focused web
            experiences.
          </h1>

          <p className="hero__subtitle">
            Hi, I’m <strong>Shubham Raj</strong> — a{" "}
            <strong>{currentRole}</strong> with strong experience across
            enterprise applications, modern React architecture, performance
            optimization, reusable component systems, and clean product-driven
            delivery.
          </p>

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
                <span className="hero-badge__value">Senior Associate Consultant</span>
              </div>

              <div className="hero-badge">
                <span className="hero-badge__label">Core stack</span>
                <span className="hero-badge__value">React · Redux · Next.js</span>
              </div>

              <div className="hero-badge">
                <span className="hero-badge__label">Focus</span>
                <span className="hero-badge__value">
                  Performance · Accessibility · Reusability
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}