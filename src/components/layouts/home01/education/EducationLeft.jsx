import React from "react";
import image11 from "../../../../assets/images/section/11.png";

const socialLinks = [
  {
    id: 1,
    href: "https://www.facebook.com/shubham14p3",
    icon: "fa-brands fa-facebook-f",
    label: "Facebook",
  },
  {
    id: 2,
    href: "https://www.linkedin.com/in/shubham14p3/",
    icon: "fa-brands fa-linkedin-in",
    label: "LinkedIn",
  },
  {
    id: 3,
    href: "https://github.com/shubham14p3",
    icon: "fa-brands fa-github",
    label: "GitHub",
  },
];

const highlights = [
  {
    id: 1,
    title: "Engineering Base",
    text: "Strong academic grounding in software, systems, and structured problem solving.",
  },
  {
    id: 2,
    title: "Continuous Growth",
    text: "Consistent upskilling through formal education and practical execution.",
  },
  {
    id: 3,
    title: "Frontend Focus",
    text: "Connecting design quality, usability, and engineering discipline.",
  },
  {
    id: 4,
    title: "Collaboration",
    text: "Comfortable across testing, product communication, and delivery workflows.",
  },
];

const academicExtras = [
  {
    id: 1,
    icon: "fa-solid fa-award",
    label: "Academic Strength",
    value: "Built a solid base in engineering fundamentals, software thinking, and structured learning.",
  },
  {
    id: 2,
    icon: "fa-solid fa-code-branch",
    label: "Practical Exposure",
    value: "Applied academic concepts through real-world development, collaboration, and product delivery.",
  },
  {
    id: 3,
    icon: "fa-solid fa-laptop-code",
    label: "Core Areas",
    value: "Frontend engineering, performance, testing quality, scalable systems, and developer workflows.",
  },
  {
    id: 4,
    icon: "fa-solid fa-user-group",
    label: "Collaboration Style",
    value: "Comfortable working across product, QA, engineering, and business-facing discussions.",
  },
];

const quickLinks = [
  {
    id: 1,
    title: "IIT Jodhpur",
    href: "https://iitj.ac.in/",
    icon: "fa-solid fa-arrow-up-right-from-square",
  },
  {
    id: 2,
    title: "BIT Bhilai",
    href: "https://bitdurg.ac.in/",
    icon: "fa-solid fa-arrow-up-right-from-square",
  },
];

export default function EducationLeft() {
  return (
    <aside className="edu-profile">
      <div className="edu-profile__image">
        <img src={image11} alt="Education and career illustration" />
      </div>

      <div className="edu-profile__content">
        <div className="edu-profile__badge">
          <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
          Learning & Growth
        </div>

        <h3 className="edu-profile__title">
          Building technical depth with practical product thinking.
        </h3>

        <p className="edu-profile__text">
          My academic journey combines strong engineering fundamentals with
          continuous growth in modern software development. It has helped me
          build confidence in frontend engineering, performance thinking,
          testing quality, collaboration, and delivering polished user-focused solutions.
        </p>

        <div className="edu-highlights">
          {highlights.map((item) => (
            <div key={item.id} className="edu-highlight">
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="edu-academic-extras">
          {academicExtras.map((item) => (
            <div key={item.id} className="edu-academic-extra">
              <div className="edu-academic-extra__icon">
                <i className={item.icon} aria-hidden="true" />
              </div>
              <div className="edu-academic-extra__content">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="edu-profile__footer">
          <div className="edu-profile__mini-card">
            <span>Highest Qualification</span>
            <strong>M.Tech in Data Engineering</strong>
          </div>

          <div className="edu-profile__mini-card">
            <span>Academic Direction</span>
            <strong>Engineering + Product + UX-minded Delivery</strong>
          </div>
        </div>

        <div className="edu-quick-links">
          {quickLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="edu-quick-link"
            >
              <span>{item.title}</span>
              <i className={item.icon} aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="edu-socials">
          {socialLinks.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noreferrer noopener"
              className="edu-social-link"
              aria-label={item.label}
            >
              <i className={item.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
