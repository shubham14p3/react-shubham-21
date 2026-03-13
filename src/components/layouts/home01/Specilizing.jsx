import React from "react";
import ExpHeadline from "../../hoc/ExpHeadline";

const roles = [
  {
    company: "Infosys, Bangalore",
    role: "Senior Associate Consultant",
    date: "Dec 2024 – Present",
    bullets: [
      "Collaborate with product owners and business analysts for better estimation and sprint planning.",
      "Review pull requests, improve standards, and guide implementation quality across frontend work.",
      "Build proof-of-concepts and reusable React components with performance and accessibility in mind.",
      "Optimize CI/CD workflows for enterprise applications using Jenkins and GitHub Actions.",
      "Coordinate across teams to unblock delivery and keep releases stable and timely.",
    ],
  },
  {
    company: "Capgemini, Kolkata",
    role: "Consultant",
    date: "May 2021 – Dec 2024",
    bullets: [
      "Led frontend delivery for banking applications and shipped 50+ features using React, Redux, TypeScript, Vite, and Material UI.",
      "Refactored more than 30 components and improved loading performance by around 35%.",
      "Worked closely with QA, design, backend, and product teams during planning, grooming, development, and release cycles.",
      "Introduced testing practices with Jest and React Testing Library and improved confidence across major flows.",
    ],
  },
  {
    company: "Gammastack, Indore",
    role: "Solution Engineer",
    date: "May 2020 – Aug 2020",
    bullets: [
      "Built data-driven applications with React and Next.js including responsive and reusable UI systems.",
      "Integrated APIs with secure validation and deployment workflows across AWS, Vercel, and Netlify.",
      "Improved release quality through testing and modern frontend build tooling.",
    ],
  },
  {
    company: "Nagravision India Pvt. Ltd., Bangalore",
    role: "Software Engineer",
    date: "Jul 2018 – Jul 2019",
    bullets: [
      "Created 350+ JavaScript tests integrated with Jenkins and significantly improved automation coverage.",
      "Contributed to regression quality, browser/device validation, and cross-team testing workflows.",
      "Prepared test plans, execution strategy, and reporting with strong attention to product quality.",
    ],
  },
];

export default function Specilizing() {
  return (
    <section id="experience" className="section-shell section-anchor">
      <div className="container-shell">
        <ExpHeadline
          eyebrow="Career highlights"
          title="Work Experience"
          lead="A progression from quality engineering into modern frontend architecture, product delivery, and enterprise React development."
        />

        <div className="timeline-grid">
          {roles.map((item) => (
            <article key={`${item.company}-${item.role}`} className="timeline-card glass-card">
              <div className="timeline-card__top">
                <div>
                  <h3 className="timeline-card__company">{item.company}</h3>
                </div>
                <span className="timeline-card__date">{item.date}</span>
              </div>

              <p className="timeline-card__role">{item.role}</p>

              <ul className="timeline-list">
                {item.bullets.map((bullet, index) => (
                  <li key={index}>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}