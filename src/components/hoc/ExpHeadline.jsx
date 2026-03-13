import React from "react";

export default function ExpHeadline({
  eyebrow = "Professional journey",
  title = "Work Experience",
  lead,
}) {
  return (
    <div className="section-title-wrap">
      <div className="section-eyebrow">{eyebrow}</div>
      <h2 className="section-title">
        <span className="gradient-text">{title}</span>
      </h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </div>
  );
}