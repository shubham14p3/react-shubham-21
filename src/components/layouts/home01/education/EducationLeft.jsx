import React from "react";
import image11 from "../../../../assets/images/section/11.png";

const socialLinks = [
  {
    id: 1,
    href: "https://www.facebook.com/shubham14p3",
    icon: "fa-facebook",
    label: "Facebook",
  },
  {
    id: 2,
    href: "https://www.linkedin.com/in/shubham14p3/",
    icon: "fa-linkedin",
    label: "LinkedIn",
  },
  {
    id: 3,
    href: "https://github.com/shubham14p3",
    icon: "fa-github",
    label: "GitHub",
  },
];

export default function EducationLeft() {
  return (
    <aside className="edu-profile glass-card">
      <div className="edu-profile__image">
        <img src={image11} alt="Education and career illustration" />
      </div>

      <div className="edu-socials">
        {socialLinks.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noreferrer noopener"
            className="icon-link"
            aria-label={item.label}
          >
            <i className={`fa ${item.icon}`} aria-hidden="true" />
          </a>
        ))}
      </div>

      <p className="about-copy" style={{ marginTop: 18 }}>
        My education combines engineering fundamentals with practical software
        development growth. It has helped me work confidently across frontend,
        testing, performance, product thinking, and full-stack collaboration.
      </p>
    </aside>
  );
}