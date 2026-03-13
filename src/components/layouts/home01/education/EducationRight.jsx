import React from "react";

const education = [
  {
    id: 1,
    school: "Indian Institute of Technology (IIT), Jodhpur",
    degree: "M.Tech in Data Engineering",
    year: "2024 – Present",
    text: "Currently pursuing a master’s degree focused on advanced engineering concepts and data-oriented systems.",
  },
  {
    id: 2,
    school: "C.S.V.T.U / Bhilai Institute of Technology",
    degree: "Bachelor of Engineering in Computer Science",
    year: "2014 – 2018",
    text: "Completed undergraduate studies in computer science engineering with a strong foundation in software development.",
  },
  {
    id: 3,
    school: "C.B.S.E.",
    degree: "Intermediate",
    year: "2014",
    text: "Completed higher secondary education under CBSE board.",
  },
  {
    id: 4,
    school: "C.B.S.E.",
    degree: "Matriculation",
    year: "2011",
    text: "Completed secondary education under CBSE board.",
  },
];

export default function EducationRight() {
  return (
    <div className="edu-timeline">
      {education.map((item) => (
        <article key={item.id} className="edu-item glass-card">
          <div className="edu-item__header">
            <span className="edu-item__school">{item.school}</span>
            <span className="edu-item__year">{item.year}</span>
          </div>

          <div className="edu-item__degree">{item.degree}</div>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}