import React from "react";
import EducationLeft from "./education/EducationLeft";
import EducationRight from "./education/EducationRight";
import "./Education.css";
export default function Education() {
  return (
    <section id="education" className="section-shell section-anchor">
      <div className="container-shell">
        <div className="section-title-wrap">
          <div className="section-eyebrow">Education</div>
          <h2 className="section-title">Academic foundation that supports my engineering journey.</h2>
        </div>

        <div className="edu-grid">
          <EducationLeft />
          <EducationRight />
        </div>
      </div>
    </section>
  );
}