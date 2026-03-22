import React from "react";
import "./Footer.css";

const socials = [
  {
    id: 1,
    href: "https://www.facebook.com/shubham14p3",
    icon: "fab fa-facebook-f",
    label: "Facebook",
  },
  {
    id: 2,
    href: "https://www.linkedin.com/in/shubham14p3/",
    icon: "fab fa-linkedin-in",
    label: "LinkedIn",
  },
  {
    id: 3,
    href: "https://github.com/shubham14p3",
    icon: "fab fa-github",
    label: "GitHub",
  },
  {
    id: 4,
    href: "https://wa.me/918092766575",
    icon: "fab fa-whatsapp",
    label: "WhatsApp",
  },
];


const contactItems = [
  {
    id: "email",
    href: "mailto:shubham14p3@gmail.com",
    icon: "fas fa-envelope",
    label: "Email",
    value: "shubham14p3@gmail.com",
  },
  {
    id: "phone",
    href: "tel:+918092766575",
    icon: "fas fa-phone",
    label: "Phone",
    value: "+91 80927 66575",
  },
  {
    id: "location",
    href: "https://maps.google.com/?q=Jamshedpur,India",
    icon: "fas fa-map-marker-alt",
    label: "Location",
    value: "Jamshedpur, India",
    external: true,
  },
];


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="site-footer section-anchor">
      <div className="container-shell">
        <div className="footer-wrap">
          <div className="footer-main">
            <div className="footer-content">
              <span className="footer-eyebrow">Contact</span>

              <h2 className="footer-title">Let’s build something impactful together.</h2>

              <p className="footer-copy">
                I’m open to senior and lead engineering opportunities where I can contribute through frontend architecture, scalable product development, technical leadership, and user-first digital experiences.</p>

              <div className="footer-actions">
                <a href="mailto:shubham14p3@gmail.com" className="footer-btn footer-btn--primary">
                  <i className="fa fa-envelope" aria-hidden="true" />
                  <span>Email Me</span>
                </a>

                <a
                  href="https://wa.me/918092766575"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="footer-btn footer-btn--ghost"
                >
                  <i className="fa fa-whatsapp" aria-hidden="true" />
                  <span>Let’s Chat</span>
                </a>
              </div>

              <div className="footer-socials" aria-label="Social links">
                {socials.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="footer-social"
                    aria-label={item.label}
                    title={item.label}
                  >
                    <i className={`fa ${item.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-contact-panel">
              {contactItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer noopener" : undefined}
                  className="footer-contact-card"
                >
                  <div className="footer-contact-card__icon">
                    <i className={`fa ${item.icon}`} aria-hidden="true" />
                  </div>

                  <div className="footer-contact-card__text">
                    <span className="footer-contact-card__label">{item.label}</span>
                    <span className="footer-contact-card__value">{item.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {year} Shubham Raj. All rights reserved.</span>
            <span className="footer-bottom__text">
              Built with React, clean UI thinking, and performance in mind.
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}