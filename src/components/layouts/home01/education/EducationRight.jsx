import React from "react";

const education = [
  {
    id: 1,
    type: "Master’s",
    school: "Indian Institute of Technology (IIT), Jodhpur",
    degree: "M.Tech in Data Engineering",
    year: "2024 – 2026",
    status: "Completed",
    campus: "Jodhpur, Rajasthan",
    link: "https://iitj.ac.in/",
    note: "Focused on data engineering, scalable systems, and deeper technical problem solving through structured academic learning and applied engineering work.",
    details: [
      "Worked on advanced data-oriented engineering concepts.",
      "Strengthened system design and structured problem-solving skills.",
      "Built stronger understanding of scalable engineering practices.",
    ],
  },
  {
    id: 2,
    type: "Bachelor’s",
    school: "C.S.V.T.U / Bhilai Institute of Technology",
    degree: "Bachelor of Engineering in Computer Science",
    year: "2014 – 2018",
    status: "Graduated",
    campus: "Durg / Bhilai, Chhattisgarh",
    link: "https://bitdurg.ac.in/",
    note: "Built a strong base in computer science, software engineering, algorithms, application development, and core engineering concepts that shaped my professional foundation.",
    details: [
      "Developed a solid understanding of CS fundamentals and software development.",
      "Built analytical thinking and academic discipline through engineering coursework.",
      "Created the base for later growth in frontend and product-oriented development.",
    ],
  },
  {
    id: 3,
    type: "Higher Secondary",
    school: "C.B.S.E.",
    degree: "Intermediate",
    year: "2014",
    status: "Completed",
    campus: "India",
    link: "#",
    note: "Completed higher secondary education under the CBSE board with emphasis on analytical ability, discipline, and technical learning fundamentals.",
    details: [
      "Strengthened reasoning and structured study habits.",
      "Built confidence in technical and analytical subjects.",
    ],
  },
  {
    id: 4,
    type: "Secondary",
    school: "C.B.S.E.",
    degree: "Matriculation",
    year: "2011",
    status: "Completed",
    campus: "India",
    link: "#",
    note: "Completed secondary education under the CBSE board, establishing the academic consistency and learning mindset that supported later engineering growth.",
    details: [
      "Built the base for future academic growth.",
      "Developed consistency, curiosity, and disciplined learning habits.",
    ],
  },
];

export default function EducationRight() {
  return (
    <div className="edu-timeline">
      {education.map((item) => (
        <article key={item.id} className="edu-item">
          <div className="edu-item__top">
            <div className="edu-item__meta">
              <span className="edu-item__tag">{item.type}</span>
              <span className="edu-item__status">{item.status}</span>
            </div>

            <span className="edu-item__year">
              <i className="fa-solid fa-calendar-days" aria-hidden="true" />
              {item.year}
            </span>
          </div>

          <h3 className="edu-item__school">{item.school}</h3>
          <div className="edu-item__degree">{item.degree}</div>

          <div className="edu-item__submeta">
            <span className="edu-item__campus">
              <i className="fa-solid fa-location-dot" aria-hidden="true" />
              {item.campus}
            </span>

            {item.link !== "#" && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer noopener"
                className="edu-item__link"
              >
                Visit Site
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
              </a>
            )}
          </div>

          <p>{item.note}</p>

          <ul className="edu-item__points">
            {item.details.map((point, index) => (
              <li key={index}>
                <i className="fa-solid fa-check" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
