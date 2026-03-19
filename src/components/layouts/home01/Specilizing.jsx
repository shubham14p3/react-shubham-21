import React, { useMemo, useState } from "react";
import ExpHeadline from "../../hoc/ExpHeadline";
import "./Specilizing.css";

const roles = [
  {
    id: 1,
    company: "Infosys",
    companyUrl: "https://www.infosys.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    location: "Bangalore",
    role: "Senior Associate Consultant",
    date: "Dec 2024 – Present",
    short:
      "Driving frontend quality, sprint execution, reusable React architecture, and enterprise delivery stability.",
    bullets: [
      "Collaborate with product owners and business analysts for sharper estimation, planning accuracy, and better sprint outcomes.",
      "Review pull requests, raise frontend engineering standards, and guide implementation quality across shared codebases.",
      "Build proof-of-concepts and reusable React components with performance, accessibility, and maintainability in mind.",
      "Optimize CI/CD workflows for enterprise applications using Jenkins and GitHub Actions.",
      "Coordinate across teams to unblock delivery, reduce bottlenecks, and keep releases stable and timely.",
    ],
    highlights: [
      "React architecture",
      "Code reviews",
      "CI/CD",
      "Accessibility",
    ],
    tech: ["React", "JavaScript", "Jenkins", "GitHub Actions"],
    impact:
      "Improved delivery confidence by strengthening code quality and cross-team execution.",
    metrics: [
      { label: "Focus", value: "Frontend governance" },
      { label: "Delivery", value: "Enterprise releases" },
      { label: "Strength", value: "Code quality" },
    ],
  },
  {
    id: 2,
    company: "Capgemini",
    companyUrl: "https://www.capgemini.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Capgemini_201x_logo.svg",
    location: "Kolkata",
    role: "Consultant",
    date: "May 2021 – Dec 2024",
    short:
      "Led large-scale frontend delivery for banking products with a strong focus on performance, reusability, and release quality.",
    bullets: [
      "Led frontend delivery for banking applications and shipped 50+ features using React, Redux, TypeScript, Vite, and Material UI.",
      "Refactored more than 30 components and improved loading performance by around 35%.",
      "Worked closely with QA, design, backend, and product teams during planning, grooming, development, and release cycles.",
      "Introduced testing practices with Jest and React Testing Library and improved confidence across major user flows.",
    ],
    highlights: [
      "50+ features",
      "35% faster",
      "Banking apps",
      "Team collaboration",
    ],
    tech: ["React", "Redux", "TypeScript", "Vite", "Material UI", "Jest"],
    impact:
      "Delivered major banking features while improving maintainability and page performance.",
    metrics: [
      { label: "Features", value: "50+" },
      { label: "Performance", value: "35% faster" },
      { label: "Domain", value: "Banking" },
    ],
  },
  {
    id: 3,
    company: "Gammastack",
    companyUrl: "https://www.gammastack.com/",
    logo: "https://dummyimage.com/220x80/0f172a/ffffff&text=Gammastack",
    location: "Indore",
    role: "Solution Engineer",
    date: "May 2020 – Aug 2020",
    short:
      "Built data-driven web applications with modern React/Next.js patterns and production deployment workflows.",
    bullets: [
      "Built data-driven applications with React and Next.js including responsive and reusable UI systems.",
      "Integrated APIs with secure validation and deployment workflows across AWS, Vercel, and Netlify.",
      "Improved release quality through testing and modern frontend build tooling.",
    ],
    highlights: ["Next.js", "Reusable UI", "API integration", "Deployment"],
    tech: ["React", "Next.js", "AWS", "Vercel", "Netlify"],
    impact:
      "Strengthened product speed and delivery quality with modern frontend foundations.",
    metrics: [
      { label: "Framework", value: "Next.js" },
      { label: "Focus", value: "Reusable UI" },
      { label: "Deployments", value: "Cloud ready" },
    ],
  },
  {
    id: 4,
    company: "Nagravision India Pvt. Ltd.",
    companyUrl: "https://www.nagra.com/",
    logo: "https://dummyimage.com/220x80/0f172a/ffffff&text=Nagravision",
    location: "Bangalore",
    role: "Software Engineer",
    date: "Jul 2018 – Jul 2019",
    short:
      "Started with strong quality engineering fundamentals, automation coverage, and regression reliability.",
    bullets: [
      "Created 350+ JavaScript tests integrated with Jenkins and significantly improved automation coverage.",
      "Contributed to regression quality, browser/device validation, and cross-team testing workflows.",
      "Prepared test plans, execution strategy, and reporting with strong attention to product quality.",
    ],
    highlights: [
      "350+ tests",
      "Automation",
      "Regression quality",
      "Jenkins",
    ],
    tech: ["JavaScript", "Jenkins", "Automation Testing"],
    impact:
      "Built a strong foundation in engineering discipline, testing rigor, and release reliability.",
    metrics: [
      { label: "Automation", value: "350+ tests" },
      { label: "Platform", value: "Jenkins" },
      { label: "Focus", value: "Quality" },
    ],
  },
];

function ExperienceModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="exp-modal__backdrop" onClick={onClose}>
      <div
        className="exp-modal glass-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="exp-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="exp-modal__close"
          onClick={onClose}
          aria-label="Close details"
        >
          ×
        </button>

        <div className="exp-modal__hero">
          <div className="exp-modal__brand">
            <a
              href={item.companyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="exp-modal__logo-link"
              aria-label={`${item.company} website`}
            >
              <img
                src={item.logo}
                alt={`${item.company} logo`}
                className="exp-modal__logo"
              />
            </a>

            <div className="exp-modal__brand-copy">
              <p className="exp-modal__eyebrow">{item.company}</p>
              <h3 id="exp-modal-title" className="exp-modal__title">
                {item.role}
              </h3>
              <p className="exp-modal__meta">
                <span>{item.location}</span>
                <span className="exp-modal__dot" />
                <span>{item.date}</span>
              </p>
            </div>
          </div>

          <div className="exp-modal__hero-card">
            <p className="exp-modal__hero-label">Role impact</p>
            <p className="exp-modal__impact">{item.impact}</p>
          </div>
        </div>

        <div className="exp-modal__metrics">
          {item.metrics.map((metric) => (
            <div key={metric.label} className="exp-metric-card">
              <span className="exp-metric-card__label">{metric.label}</span>
              <strong className="exp-metric-card__value">{metric.value}</strong>
            </div>
          ))}
        </div>

        <div className="exp-modal__body">
          <div className="exp-modal__main">
            <div className="exp-modal__section">
              <h4>Key contributions</h4>
              <ul className="timeline-list timeline-list--modal">
                {item.bullets.map((bullet, index) => (
                  <li key={index}>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="exp-modal__sidepanel">
            <div className="exp-side-card">
              <h4>Core stack</h4>
              <div className="timeline-tags timeline-tags--modal">
                {item.tech.map((tech) => (
                  <span key={tech} className="timeline-tag timeline-tag--strong">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="exp-side-card">
              <h4>Key themes</h4>
              <div className="timeline-tags timeline-tags--modal">
                {item.highlights.map((tag) => (
                  <span key={tag} className="timeline-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={item.companyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="exp-modal__company-link"
            >
              Visit company website
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [openId, setOpenId] = useState(roles[0].id);
  const [selectedRole, setSelectedRole] = useState(null);

  const totalYearsText = useMemo(() => "7 years of progression", []);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="section-shell section-anchor">
      <div className="container-shell">
        <ExpHeadline
          eyebrow="Career highlights"
          title="Work Experience"
          lead="A journey from quality engineering into modern frontend architecture, enterprise React development, and high-impact product delivery."
        />

        <div className="experience-summary glass-card">
          <div className="experience-summary__left">
            <span className="experience-summary__badge">{totalYearsText}</span>
            <h3>Enterprise frontend delivery with product, performance, and quality focus.</h3>
          </div>

          <div className="experience-summary__stats">
            <div className="experience-summary__stat">
              <strong>50+</strong>
              <span>Features shipped</span>
            </div>
            <div className="experience-summary__stat">
              <strong>35%</strong>
              <span>Performance gain</span>
            </div>
            <div className="experience-summary__stat">
              <strong>350+</strong>
              <span>Automation tests</span>
            </div>
          </div>
        </div>

        <div className="timeline-stack">
          {roles.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <article
                key={item.id}
                className={`timeline-card glass-card ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="timeline-card__trigger"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`exp-panel-${item.id}`}
                >
                  <div className="timeline-card__index">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>

                  <div className="timeline-card__main">
                    <div className="timeline-card__top">
                      <div className="timeline-card__headings">
                        <h3 className="timeline-card__company">{item.company}</h3>
                        <p className="timeline-card__role">{item.role}</p>
                      </div>

                      <div className="timeline-card__side">
                        <span className="timeline-card__location">{item.location}</span>
                        <span className="timeline-card__date">{item.date}</span>
                      </div>
                    </div>

                    <p className="timeline-card__short">{item.short}</p>

                    <div className="timeline-tags timeline-tags--preview">
                      {item.highlights.map((tag) => (
                        <span key={tag} className="timeline-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`timeline-card__icon ${isOpen ? "is-open" : ""}`}>
                    <span />
                    <span />
                  </div>
                </button>

                <div
                  id={`exp-panel-${item.id}`}
                  className={`timeline-card__panel ${isOpen ? "is-open" : ""}`}
                >
                  <div className="timeline-card__panel-inner">
                    <div className="timeline-card__content">
                      <div>
                        <h4 className="timeline-card__section-title">
                          Responsibilities & achievements
                        </h4>

                        <ul className="timeline-list">
                          {item.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex}>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="timeline-card__details">
                        <div>
                          <h4 className="timeline-card__section-title">
                            Core technologies
                          </h4>
                          <div className="timeline-tags">
                            {item.tech.map((tech) => (
                              <span key={tech} className="timeline-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="timeline-card__impact">
                          <h4 className="timeline-card__section-title">Impact</h4>
                          <p>{item.impact}</p>
                        </div>

                        <button
                          type="button"
                          className="timeline-card__modal-btn"
                          onClick={() => setSelectedRole(item)}
                        >
                          View more details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <ExperienceModal item={selectedRole} onClose={() => setSelectedRole(null)} />
    </section>
  );
}