import React, { useMemo, useState } from "react";

import projectThumb1 from "../../../assets/images/pp/1.jpg";
import projectThumb2 from "../../../assets/images/pp/3.jpg";
import projectThumb3 from "../../../assets/images/pp/5.jpg";
import projectThumb4 from "../../../assets/images/pp/8.jpg";
import projectThumb5 from "../../../assets/images/pp/11.jpg";
import projectThumb6 from "../../../assets/images/pp/14.jpg";

const filters = ["All", "React", "Enterprise", "Performance", "Testing"];

const projects = [
  {
    id: 1,
    title: "Enterprise Banking Frontend",
    category: "Enterprise",
    meta: "Capgemini · Banking",
    image: projectThumb1,
    description:
      "Worked on large-scale banking UI flows with React, Redux, TypeScript, and Material UI, delivering production-grade features and reusable components.",
    tags: ["React", "Redux", "TypeScript", "MUI"],
  },
  {
    id: 2,
    title: "Reusable Component System",
    category: "React",
    meta: "Enterprise UI",
    image: projectThumb2,
    description:
      "Built and improved reusable UI patterns to reduce duplication, increase consistency, and speed up feature delivery across teams.",
    tags: ["Design System", "React", "Accessibility"],
  },
  {
    id: 3,
    title: "Performance Refactor Initiative",
    category: "Performance",
    meta: "Optimization",
    image: projectThumb3,
    description:
      "Refactored existing components and page flows to improve load speed, bundle usage, and overall user experience.",
    tags: ["Optimization", "Vite", "Refactor"],
  },
  {
    id: 4,
    title: "Next.js Data-Driven App",
    category: "React",
    meta: "Gammastack",
    image: projectThumb4,
    description:
      "Developed responsive, server-rendered interfaces using Next.js for better SEO, performance, and dynamic content rendering.",
    tags: ["Next.js", "SSR", "REST API"],
  },
  {
    id: 5,
    title: "Frontend Testing and Quality",
    category: "Testing",
    meta: "Jest · RTL · QA",
    image: projectThumb5,
    description:
      "Introduced structured testing practices and improved release confidence with unit, integration, and UI coverage.",
    tags: ["Jest", "RTL", "Quality"],
  },
  {
    id: 6,
    title: "CI/CD and Delivery Enablement",
    category: "Enterprise",
    meta: "Infosys",
    image: projectThumb6,
    description:
      "Supported smooth enterprise releases by aligning frontend delivery with CI/CD workflows, reviews, and technical proof-of-concepts.",
    tags: ["CI/CD", "Jenkins", "GitHub Actions"],
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter(
      (item) =>
        item.category === activeFilter || item.tags.includes(activeFilter)
    );
  }, [activeFilter]);

  return (
    <section id="portfolio" className="section-shell section-anchor">
      <div className="container-shell">
        <div className="section-title-wrap">
          <div className="section-eyebrow">Selected work</div>
          <h2 className="section-title">Portfolio highlights and impact-driven work.</h2>
          <p className="section-lead">
            These are representative project themes from my professional journey.
            You can later replace them with exact company-safe case studies or
            personal portfolio projects.
          </p>
        </div>

        <div className="portfolio-toolbar">
          <div className="filter-group" aria-label="Portfolio filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-grid">
          {filteredProjects.map((item) => (
            <article key={item.id} className="portfolio-card glass-card">
              <div className="portfolio-card__thumb">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>

              <div className="portfolio-card__body">
                <div className="portfolio-card__meta">{item.meta}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="portfolio-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}