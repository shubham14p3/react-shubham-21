import React from "react";

const socials = [
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
  {
    id: 4,
    href: "https://wa.me/918092766575",
    icon: "fa-whatsapp",
    label: "WhatsApp",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="site-footer section-anchor">
      <div className="container-shell">
        <div className="footer-card glass-card">
          <div className="footer-grid">
            <div>
              <div className="section-eyebrow">Contact</div>
              <h2 className="section-title">Let’s build something meaningful.</h2>
              <p className="footer-copy">
                I’m open to frontend, React, and UI-focused opportunities where
                I can contribute through strong engineering, performance-minded
                thinking, and product-quality execution.
              </p>

              <div className="hero__cta" style={{ marginTop: 22 }}>
                {socials.map((item) => (
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
            </div>

            <div className="contact-list">
              <a href="mailto:shubham14p3@gmail.com" className="contact-link">
                <i className="fa fa-envelope" aria-hidden="true" />
                <span>shubham14p3@gmail.com</span>
              </a>

              <a href="tel:+918092766575" className="contact-link">
                <i className="fa fa-phone" aria-hidden="true" />
                <span>+91 80927 66575</span>
              </a>

              <a
                href="https://maps.google.com/?q=Jamshedpur,India"
                target="_blank"
                rel="noreferrer noopener"
                className="contact-link"
              >
                <i className="fa fa-map-marker" aria-hidden="true" />
                <span>Jamshedpur, India</span>
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {year} Shubham Raj. All rights reserved.</span>
            <span>Built with React, performance, and clean UI thinking.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}