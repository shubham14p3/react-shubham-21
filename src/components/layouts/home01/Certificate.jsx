import React from "react";
import "./Certificate.css";
import udemy from "../../../assets/images/logo/udemy.png";
import istqb from "../../../assets/images/logo/istqb.png";
import iabac from "../../../assets/images/logo/iabac.png";
import upgrad from "../../../assets/images/logo/upgrad.png";
import salesforce from "../../../assets/images/logo/salesforce.png";
import mongo from "../../../assets/images/logo/mongodb.png";
import microverse from "../../../assets/images/logo/microverse.png";

const certificates = [
  {
    id: 1,
    title: "Salesforce JavaScript Developer I",
    issuer: "Salesforce",
    issued: "Jun 2025",
    badge: "Certification",
    logo: salesforce,
  },
  {
    id: 2,
    title: "M001: MongoDB Basics",
    issuer: "MongoDB University",
    issued: "Mar 2021",
    badge: "Course",
    logo: mongo,
  },
  {
    id: 3,
    title: "ISTQB Foundation Level",
    issuer: "ISTQB",
    issued: "Dec 2018",
    badge: "Certification",
    logo: istqb,
  },
  {
    id: 4,
    title: "MERN Fullstack Project",
    issuer: "Udemy",
    issued: "Sep 2023",
    badge: "Course",
    logo: udemy,
  },
  {
    id: 5,
    title: "Microverse JavaScript Module",
    issuer: "Microverse",
    issued: "Aug 2020",
    badge: "Module",
    logo: microverse,
  },
  {
    id: 6,
    title: "Microverse Ruby on Rails",
    issuer: "Microverse",
    issued: "Aug 2020",
    badge: "Module",
    logo: microverse,
  },
  {
    id: 7,
    title: "IABAC Certified Data Scientist",
    issuer: "IABAC",
    issued: "Apr 2019",
    badge: "Certification",
    logo: iabac,
  },
  {
    id: 8,
    title: "IABAC Data Science Foundation",
    issuer: "IABAC",
    issued: "Feb 2019",
    badge: "Certification",
    logo: iabac,
  },
  {
    id: 9,
    title: "Startup India Learning Program",
    issuer: "upGrad",
    issued: "Feb 2017",
    badge: "Program",
    logo: upgrad,
  },
];

const rotateArray = (arr, offset = 0) => {
  if (!arr.length) return arr;
  const safeOffset = ((offset % arr.length) + arr.length) % arr.length;
  return [...arr.slice(safeOffset), ...arr.slice(0, safeOffset)];
};

const buildLoopItems = (arr, offset = 3) => {
  const rotated = rotateArray(arr, offset);

  if (arr.length > 1 && arr[arr.length - 1]?.id === rotated[0]?.id) {
    return [...arr, ...rotateArray(arr, offset + 1)];
  }

  return [...arr, ...rotated];
};

function CertificateCard({ item }) {
  return (
    <article className="cert-card glass-card cert-marquee-card">
      <div className="cert-card__top">
        <div className="cert-card__issuer">
          <img
            className="cert-card__logo"
            src={item.logo}
            alt={item.issuer}
            loading="lazy"
          />
          <div>
            <strong>{item.issuer}</strong>
          </div>
        </div>
        <span className="cert-card__badge">{item.badge}</span>
      </div>

      <h3>{item.title}</h3>
      <p>{item.issuer}</p>
      <small>{item.issued}</small>
    </article>
  );
}

function CertificateRow({ items, direction = "left", duration = 34, offset = 3 }) {
  const loopItems = buildLoopItems(items, offset);

  return (
    <div
      className={`cert-marquee-row ${direction === "right" ? "is-right" : "is-left"
        }`}
      tabIndex={0}
      aria-label="Scrolling certificate row"
    >
      <div
        className="cert-marquee-track"
        style={{ "--marquee-duration": `${duration}s` }}
      >
        {loopItems.map((item, index) => (
          <CertificateCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Certificate() {
  const row1 = certificates;
  const row2 = [...certificates].reverse();
  const row3 = rotateArray(certificates, 2);

  return (
    <section
      id="certificates"
      className="section-shell section-anchor certificates-marquee-section"
    >
      <style>{`
        .certificates-marquee-section {
          position: relative;
          overflow: hidden;
        }

        .certificates-marquee-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .certificates-marquee-shape {
          position: absolute;
          border-radius: 999px;
          filter: blur(8px);
          opacity: 0.45;
        }

        .certificates-marquee-shape.shape-1 {
          width: 18rem;
          height: 18rem;
          top: 4%;
          left: -5rem;
          background: rgba(99, 102, 241, 0.16);
          animation: certFloatOne 18s ease-in-out infinite;
        }

        .certificates-marquee-shape.shape-2 {
          width: 12rem;
          height: 12rem;
          top: 20%;
          right: 8%;
          background: rgba(16, 185, 129, 0.14);
          animation: certFloatTwo 20s ease-in-out infinite;
        }

        .certificates-marquee-shape.shape-3 {
          width: 20rem;
          height: 7rem;
          bottom: 10%;
          left: 15%;
          border-radius: 999px;
          background: rgba(14, 165, 233, 0.12);
          animation: certFloatThree 22s ease-in-out infinite;
        }

        .certificates-marquee-shape.shape-4 {
          width: 10rem;
          height: 10rem;
          right: -2rem;
          bottom: 12%;
          background: rgba(236, 72, 153, 0.12);
          animation: certFloatFour 16s ease-in-out infinite;
        }

        .certificates-marquee-section .container-shell {
          position: relative;
          z-index: 2;
        }

        .cert-marquee-stack {
          position: relative;
          z-index: 2;
          display: grid;
          gap: 1.25rem;
        }

        .cert-marquee-row {
          position: relative;
          overflow: hidden;
          width: 100%;
          border-radius: 1.25rem;
        }

        .cert-marquee-track {
          display: flex;
          align-items: stretch;
          gap: 1rem;
          width: max-content;
          will-change: transform;
          animation: certScrollLeft var(--marquee-duration, 34s) linear infinite;
        }

        .cert-marquee-row.is-right .cert-marquee-track {
          animation-name: certScrollRight;
        }

        .cert-marquee-row:hover .cert-marquee-track,
        .cert-marquee-row:focus-within .cert-marquee-track,
        .cert-marquee-row:focus .cert-marquee-track {
          animation-play-state: paused;
        }

        .cert-marquee-card {
          flex: 0 0 auto;
          min-width: 19rem;
          max-width: 24rem;
        }

        @keyframes certScrollLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes certScrollRight {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes certFloatOne {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(18px);
          }
        }

        @keyframes certFloatTwo {
          0%, 100% {
            transform: translateY(8px) translateX(0px);
          }
          50% {
            transform: translateY(-12px) translateX(-10px);
          }
        }

        @keyframes certFloatThree {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-10px) translateX(8px);
          }
        }

        @keyframes certFloatFour {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        @media (max-width: 768px) {
          .cert-marquee-stack {
            gap: 1rem;
          }

          .cert-marquee-track {
            gap: 0.875rem;
          }

          .cert-marquee-card {
            min-width: 16.5rem;
            max-width: 19rem;
          }
        }

        @media (max-width: 480px) {
          .cert-marquee-card {
            min-width: 80vw;
            max-width: 84vw;
          }

          .cert-marquee-track {
            animation-duration: calc(var(--marquee-duration, 34s) * 1.35);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cert-marquee-track,
          .certificates-marquee-shape {
            animation: none !important;
          }
        }
      `}</style>

      <div className="certificates-marquee-bg" aria-hidden="true">
        <span className="certificates-marquee-shape shape-1" />
        <span className="certificates-marquee-shape shape-2" />
        <span className="certificates-marquee-shape shape-3" />
        <span className="certificates-marquee-shape shape-4" />
      </div>

      <div className="container-shell">
        <div className="section-title-wrap">
          <div className="section-eyebrow">Credentials</div>
          <h2 className="section-title">Certifications and continuous learning.</h2>
          <p className="section-lead">
            A mix of frontend, testing, database, and broader software learning
            milestones that support my engineering breadth.
          </p>
        </div>

        <div className="cert-marquee-stack">
          <CertificateRow items={row1} direction="left" duration={34} offset={3} />
          <CertificateRow items={row2} direction="right" duration={30} offset={4} />
          <CertificateRow items={row3} direction="left" duration={36} offset={5} />
        </div>
      </div>
    </section>
  );
}