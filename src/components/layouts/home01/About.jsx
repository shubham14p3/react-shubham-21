import React from 'react';

// Import SVG icons
import linkedinIcon from '../../../assets/icon/linkedin.svg';
import githubIcon from '../../../assets/icon/github.svg';
import hackerrankIcon from '../../../assets/icon/hackerrank.svg';
import skypeIcon from '../../../assets/icon/skype.svg';
import facebookIcon from '../../../assets/icon/facebook.svg';
import image03 from '../../../assets/images/section/03.png';

const About = () => {
  const profileLinks = [
    {
      id: 1,
      classname: 'profile-link border-corner2 d-flex align-items-center',
      images: linkedinIcon,
      alt: 'LinkedIn',
      url: 'https://www.linkedin.com/in/shubham14p3/',
      name: 'LinkedIn',
      normal: 'Get in Touch',
    },
    {
      id: 2,
      classname: 'profile-link border-corner2 d-flex align-items-center',
      images: githubIcon,
      alt: 'GitHub',
      url: 'https://github.com/shubham14p3',
      name: 'GitHub',
      normal: 'See My Work',
    },
    {
      id: 3,
      classname: 'profile-link border-corner2 d-flex align-items-center',
      images: hackerrankIcon,
      alt: 'HackerRank',
      url: 'https://www.hackerrank.com/shubham14p3?hr_r=1',
      name: 'HackerRank',
      normal: 'My Skills',
    },
    {
      id: 4,
      classname: 'profile-link border-corner2 d-flex align-items-center',
      images: skypeIcon,
      alt: 'Skype',
      url: 'https://join.skype.com/invite/UbpHpl5nupqt',
      name: 'Skype',
      normal: 'Connect with Me',
    },
    {
      id: 5,
      classname: 'profile-link border-corner2 d-flex align-items-center',
      images: facebookIcon,
      alt: 'Facebook',
      url: 'https://www.facebook.com/shubham14p3/',
      name: 'Facebook',
      normal: 'Connect with Me',
    },
  ];

  return (
    <section className="about-wrap background-white">
      <div className="d-lg-flex about-grid">
        {/* LEFT */}
        <div className="col-left">
          <div
            className="featured-post wow fadeInUp tilt-card"
            data-wow-delay="0.35s"
            aria-label="Profile image"
          >
            <img src={image03} alt="Profile" className="img-about responsive-img" />
            {/* soft glow */}
            <span className="img-glow" aria-hidden />
          </div>

          {/* Social / Profile Links */}
          <div className="profile-list">
            <div
              className="flat-carousel-box data-effect clearfix"
              data-gap="20"
              data-column="4"
              data-column2="3"
              data-column3="3"
              data-column4="2"
              data-column5="1"
              data-dots="false"
              data-auto="false"
              data-nav="false"
              data-loop="true"
            >
              <div className="owl-carousel">
                {profileLinks.map((data) => (
                  <div className={`${data.classname} link-card`} key={data.id}>
                    <a
                      className="featured-post link-hit"
                      href={data.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={data.name}
                    >
                      <img
                        src={data.images}
                        width="48"
                        height="48"
                        alt={data.alt}
                        className="icon-ghost"
                      />
                    </a>
                    <div className="content-inside">
                      <h3 className="name">
                        <a
                          href={data.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="focus-underline"
                        >
                          {data.name}
                        </a>
                      </h3>
                      <span className="t-normal">{data.normal}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-right">
          <div className="flat-spacer" data-desktop="72" data-mobile="36" data-smobile="28" />
          <div className="flat-title t1">
            <div className="wow fadeInDown" data-wow-delay="0.25s">
              <h4 className="sub-title mg-b14">About Me</h4>

              {/* Gradient-filled headline text */}
              <h2 className="title-section mg-b18 gradient-text">
                Hi, I am Shubham<span className="color-d4">.</span>
              </h2>

              {/* Flashy, interactive chip row */}
              <ul className="skill-chips" aria-label="Key skills">
                {[
                  'React.js',
                  'Redux',
                  'Next.js',
                  'JavaScript',
                  'Material-UI',
                  'Node.js',
                  'MongoDB',
                  'CI/CD',
                  'AWS',
                  'Github',
                  'GCP',
                  'Salesforce'
                ].map((chip) => (
                  <li className="chip" key={chip} tabIndex={0} role="button" aria-label={chip}>
                    {chip}
                  </li>
                ))}
              </ul>

              {/* Updated copy */}
              <p className="about-copy">
                I am a Frontend Developer with <strong>5.5 years</strong> of experience in
                delivering high-performance, scalable web applications across{' '}
                <strong>Finance</strong>, <strong>Gaming</strong>, and <strong>Media</strong>{' '}
                domains. Skilled in <strong>React.js</strong>, <strong>Redux</strong>,{' '}
                <strong>Next.js</strong>, <strong>JavaScript</strong>, and{' '}
                <strong>Material-UI</strong>, with additional expertise in <strong>Node.js</strong>{' '}
                and <strong>MongoDB</strong> for backend development.
              </p>

              <p className="about-copy">
                I have a proven track record in <strong>UI performance optimization</strong>,{' '}
                <strong>building reusable component libraries</strong>,{' '}
                <strong>CI/CD pipeline automation</strong>, and <strong>cloud deployments</strong>{' '}
                using <strong>AWS</strong>, <strong>Azure</strong>, and <strong>GCP</strong>. My
                professional journey includes working with <strong>Infosys</strong>,{' '}
                <strong>Capgemini</strong>, <strong>Gammastack</strong>, and{' '}
                <strong>Nagravision</strong>, where I&apos;ve led projects that achieved measurable
                performance improvements and enhanced user experience.
              </p>

              {/* CTA row */}
              <div className="cta-row">
                <a
                  href="mailto:shubham14p3@gmail.com"
                  className="btn-neo"
                  aria-label="Send me an email"
                >
                  Let’s Collaborate
                </a>
                <a
                  href="https://github.com/shubham14p3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  aria-label="View GitHub"
                >
                  View GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* subtle floating shapes for flashiness (performance-safe) */}
      <span className="float-dot fd1" aria-hidden />
      <span className="float-dot fd2" aria-hidden />
      <span className="float-dot fd3" aria-hidden />

      {/* -------- Inline CSS (single-file) -------- */}
      <style>{`
        /* Layout tweaks */
        .about-wrap {
          position: relative;
          overflow: hidden;
          padding: clamp(16px, 3vw, 32px);
        }
        .about-grid {
          gap: clamp(16px, 3vw, 48px);
          flex-wrap: wrap;
        }
        .col-left,
        .col-right {
          flex: 1 1 380px;
          min-width: min(100%, 520px);
        }

        /* Image card with subtle tilt + glow */
        .tilt-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          transform-style: preserve-3d;
          transition: transform 350ms ease, box-shadow 350ms ease;
          box-shadow: 0 12px 28px rgba(0,0,0,0.08);
          will-change: transform;
        }
        .tilt-card:hover { transform: translateY(-4px) rotateX(2deg) rotateY(-2deg); }
        .img-about.responsive-img { width: 100%; height: auto; display: block; }
        .img-glow {
          position: absolute;
          inset: -20%;
          background: radial-gradient(60% 60% at 50% 50%, rgba(99,102,241,0.20), transparent 60%);
          filter: blur(18px);
          pointer-events: none;
        }

        /* Gradient text fill for title */
        .gradient-text {
          background: linear-gradient(90deg, #6ee7f9, #a78bfa, #f472b6, #f59e0b);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          line-height: 1.08;
          font-weight: 800;
          font-size: clamp(28px, 5vw, 44px);
        }

        /* Chips row */
        .skill-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 10px 0 18px;
          padding: 0;
          list-style: none;
        }
        .chip {
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.22);
          font-size: 13.5px;
          transition: transform 220ms ease, background 220ms ease, box-shadow 220ms ease;
          outline: none;
          cursor: default;
        }
        .chip:hover,
        .chip:focus-visible {
          transform: translateY(-2px);
          background: rgba(99,102,241,0.14);
          box-shadow: 0 10px 20px rgba(99,102,241,0.15);
        }

        /* Copy */
        .about-copy {
          font-size: clamp(15px, 2.6vw, 17px);
          line-height: 1.8;
          text-align: justify;
          margin-bottom: 14px;
        }

        /* CTA buttons */
        .cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 12px;
        }
        .btn-neo,
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          border-radius: 12px;
          font-weight: 600;
          transition: transform 180ms ease, box-shadow 220ms ease, background 220ms ease, color 220ms ease;
        }
        .btn-neo {
          color: #0f172a;
          background: linear-gradient(180deg, #ffffff, #f4f4ff);
          border: 1px solid rgba(99,102,241,0.35);
          box-shadow: 0 8px 20px rgba(99,102,241,0.18);
        }
        .btn-neo:hover { transform: translateY(-2px); }
        .btn-ghost {
          color: #4f46e5;
          border: 1px solid rgba(79,70,229,0.45);
          background: rgba(79,70,229,0.06);
        }
        .btn-ghost:hover {
          background: rgba(79,70,229,0.12);
          transform: translateY(-2px);
        }

        /* Social link cards */
        .link-card {
          position: relative;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 14px;
          transition: transform 220ms ease, box-shadow 220ms ease;
          background: rgba(255,255,255,0.7);
          backdrop-filter: saturate(1.2) blur(2px);
        }
        .link-card:hover { transform: translateY(-3px); box-shadow: 0 12px 26px rgba(0,0,0,0.08); }
        .link-hit { display: inline-flex; align-items: center; justify-content: center; }
        .icon-ghost { filter: drop-shadow(0 1px 2px rgba(0,0,0,0.07)); }

        /* Focus styles for a11y */
        .focus-underline:focus-visible,
        .link-card:focus-within,
        .btn-neo:focus-visible,
        .btn-ghost:focus-visible,
        .chip:focus-visible {
          outline: 0;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.35);
          border-color: rgba(99,102,241,0.5);
        }

        /* Floating dots (subtle flashiness) */
        .float-dot {
          position: absolute;
          width: 14px; height: 14px;
          border-radius: 50%;
          opacity: 0.2;
          animation: floaty 12s ease-in-out infinite;
          background: radial-gradient(circle at 30% 30%, #a78bfa, transparent 60%),
                      radial-gradient(circle at 70% 70%, #22d3ee, transparent 60%);
        }
        .fd1 { top: 6%;  left: 4%;  animation-delay: 0s; }
        .fd2 { bottom: 10%; right: 6%; animation-delay: 3s; }
        .fd3 { top: 40%; right: 12%; animation-delay: 6s; }
        @keyframes floaty {
          0%,100% { transform: translateY(0) translateX(0); }
          50%     { transform: translateY(-10px) translateX(6px); }
        }

        /* Small device optimizations */
        @media (max-width: 991px) {
          .about-grid { gap: 24px; }
          .tilt-card:hover { transform: translateY(-2px); } /* reduce tilt on mobile */
        }
      `}</style>
    </section>
  );
};

export default About;
