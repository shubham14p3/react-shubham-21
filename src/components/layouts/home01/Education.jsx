import React from "react";
import EducationLeft from "./education/EducationLeft";
import EducationRight from "./education/EducationRight";
import "./Education.css";

export default function Education() {
  return (
    <section id="education" className="section-shell section-anchor education-section">
      <div className="container-shell">
        <div className="section-title-wrap education-title-wrap">
          <div className="section-eyebrow education-eyebrow">Education</div>
          <h2 className="section-title education-title">
            Academic journey that shaped my engineering mindset.
          </h2>
          <p className="education-subtitle">
            A mix of strong fundamentals, continuous learning, and hands-on growth
            across software engineering, frontend systems, and product-driven development.
          </p>
        </div>

        <div className="edu-grid">
          <EducationLeft />
          <EducationRight />
        </div>
      </div>
    </section>
  );
}
