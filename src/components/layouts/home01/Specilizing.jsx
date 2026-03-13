import React, { useEffect, useRef } from 'react';
import ExpHeadline from '../../hoc/ExpHeadline';

const Specilizing = () => {
    const roles = [
        {
            company: 'Infosys, Bangalore',
            role: 'Senior Associate Consultant',
            date: 'Dec 2024 – Present',
            bullets: [
                'Collaborate with POs/BAs on accurate effort estimates for realistic sprint planning.',
                'Conduct thorough PR reviews; enforce standards and share best practices.',
                'Build POC components to validate technical approaches and reduce delivery risk.',
                'Configure/optimize CI/CD (Jenkins/GitHub Actions) for Citi applications.',
                'Design reusable React components with Redux/Context; performance & accessibility focused.',
                'Coordinate cross-functional teams to unblock issues and deliver on time.',
            ],
        },
        {
            company: 'Capgemini, Kolkata',
            role: 'Consultant',
            date: 'May 2021 – Dec 2024',
            bullets: [
                'Led frontend for Discover Bank; contributed to Abu Dhabi Bank projects.',
                'Shipped 50+ features (React, Hooks, Redux, TS, Vite, MUI); built component libraries.',
                'Refactored 30+ components (HOCs); improved load speed by ~35%.',
                'Introduced Jest/RTL tests; ensured cross-browser compatibility on 140+ components.',
                'Worked across backend/QA/design/product; ran grooming, planning, retros, and reviews.',
            ],
        },
        {
            company: 'Gammastack, Indore',
            role: 'Solution Engineer',
            date: 'May 2020 – Aug 2020',
            bullets: [
                'Built 3+ data-driven apps (React, Next.js with SSR).',
                'Created responsive, global UI components (MUI + custom).',
                'Implemented secure REST integrations with auth & validation.',
                'Deployed to AWS/Vercel/Netlify; managed Webpack/Babel builds.',
                'Added Cypress & Jest coverage for critical flows.',
            ],
        },
        {
            company: 'Nagravision India Pvt. Ltd., Bangalore',
            role: 'Software Engineer',
            date: 'July 2018 – July 2019',
            bullets: [
                'Authored 350+ JS tests in Jenkins; coverage 15% → 85%.',
                'UI automation & regression across devices/browsers.',
                'Aligned testing strategies with FE/BE teams; integrated tests into CI.',
                'Prepared test plans, strategies, and execution reports.',
            ],
        },
    ];

    // Reveal on scroll
    const gridRef = useRef(null);
    useEffect(() => {
        const nodes = gridRef.current?.querySelectorAll('.exp-card');
        if (!nodes || !('IntersectionObserver' in window)) return;
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
            { threshold: 0.12 }
        );
        nodes.forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);

    // Ripple (delegated to container)
    useEffect(() => {
        const root = gridRef.current;
        if (!root) return;

        function createRipple(e) {
            const target = e.target.closest('[data-ripple]');
            if (!target) return;
            const rect = target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            const span = document.createElement('span');
            span.className = 'ripple';
            span.style.width = span.style.height = `${size}px`;
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;
            target.appendChild(span);
            span.addEventListener('animationend', () => span.remove());
        }

        root.addEventListener('click', createRipple);
        return () => root.removeEventListener('click', createRipple);
    }, []);

    // Toggle active state on card click (for subtle “selected” look)
    const onCardClick = (e) => {
        const card = e.currentTarget;
        card.classList.toggle('active');
    };

    return (
        <>
            <style>{`
        :root {
          --bg: #ffffff;
          --txt: #0f172a;
          --muted: #475569;
          --line: #e5e7eb;
          --brand: #2563eb;
          --brand2: #0ea5e9;
          --card: #ffffff;
          --shadow: 0 8px 24px rgba(2, 6, 23, 0.08);
        }
        .slide-dark &,
        .slide-dark :root {
          --bg: #0b1020;
          --txt: #e5e7eb;
          --muted: #94a3b8;
          --line: rgba(148,163,184,0.25);
          --card: #0f172a;
          --shadow: 0 8px 24px rgba(0,0,0,0.45);
        }

        .exp-section { background: var(--bg); color: var(--txt); }

        .exp-heading {
          margin-bottom: clamp(14px, 2.4vw, 24px);
          letter-spacing: .2px;
          font-weight: 800;
        }

        .exp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(14px, 2vw, 24px);
        }
        @media (min-width: 900px) {
          .exp-grid { grid-template-columns: 1fr 1fr; }
        }

        /* Card base */
        .exp-card {
          position: relative;
          isolation: isolate;
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: 16px;
          box-shadow: var(--shadow);
          padding: clamp(16px, 2vw, 22px);
          opacity: 0; transform: translateY(10px);
          transition:
            transform 260ms cubic-bezier(.2,.8,.2,1),
            box-shadow 220ms ease,
            border-color 220ms ease,
            opacity 260ms ease,
            background 220ms ease;
        }
        .exp-card.in { opacity: 1; transform: translateY(0); }

        /* Hover/Focus micro-interactions */
        .exp-card:where(:hover, :focus-within) {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px rgba(2,6,23,0.12);
          border-color: #cbd5e1;
        }
        .exp-card:focus-within { outline: 2px solid var(--brand); outline-offset: 2px; }

        /* Active (clicked) state */
        .exp-card.active {
          border-color: var(--brand);
          box-shadow: 0 18px 40px rgba(37,99,235,0.18);
        }
        .exp-card.active::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          box-shadow: inset 0 0 0 2px rgba(14,165,233,0.25);
        }

        /* Gradient accent border on hover via mask */
        .exp-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(90deg, var(--brand), var(--brand2));
          -webkit-mask: 
            linear-gradient(#000 0 0) content-box, 
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0;
          transition: opacity 220ms ease;
          z-index: -1;
        }
        .exp-card:hover::before,
        .exp-card.active::before {
          opacity: .55;
        }

        .exp-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 6px;
          align-items: baseline;
          margin-bottom: 8px;
        }
        .exp-company { font-weight: 700; font-size: clamp(1rem, 2vw, 1.1rem); }
        .exp-date { color: var(--muted); font-size: 0.95rem; white-space: nowrap; }

        .exp-role {
          margin: 0 0 8px;
          font-size: clamp(1.05rem, 2.2vw, 1.2rem);
          font-weight: 800; line-height: 1.25; letter-spacing: .2px;
          background: linear-gradient(90deg, var(--brand), var(--brand2));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        /* Bullet rows with interactive hover */
        .exp-list { margin: 0; padding: 0; list-style: none; font-size: clamp(0.96rem, 1.9vw, 1rem); line-height: 1.7; }
        .exp-list li {
          position: relative;
          display: grid; grid-template-columns: 20px 1fr; gap: 10px;
          padding: 8px 0;
          border-top: 1px dashed var(--line);
          transition: background-color 180ms ease, padding-left 180ms ease;
        }
        .exp-list li:first-child { border-top: 0; }
        .exp-list li::before {
          content: '';
          width: 6px; height: 6px; border-radius: 50%;
          margin-top: 10px;
          background: var(--muted);
          transform: translateX(0);
          transition: transform 180ms ease, background 180ms ease;
        }
        .exp-list li:hover { background: rgba(37,99,235,0.05); }
        .exp-list li:hover::before { transform: translateX(2px); background: var(--brand); }

        .exp-bullet { display:none; } /* kept for structure, not shown */

        /* Ripple */
        [data-ripple] { position: relative; overflow: hidden; }
        .ripple {
          position: absolute; border-radius: 50%; pointer-events: none; opacity: .25;
          background: currentColor;
          transform: scale(0); animation: ripple 520ms ease-out forwards;
        }
        @keyframes ripple { to { transform: scale(3.2); opacity: 0; } }

        /* CTA */
        .cta { text-align: center; margin-top: clamp(28px,5vw,56px); padding: clamp(16px,3vw,24px);
          border: 1px solid var(--line); border-radius: 16px; background: var(--card); box-shadow: var(--shadow);}
        .cta h3 { margin: 0 0 8px; font-size: clamp(1.05rem,2.4vw,1.4rem); font-weight: 800; }
        .cta p { margin: 0 0 14px; color: var(--muted); }
        .cta-actions { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
        .btn { cursor:pointer; border-radius:12px; padding:10px 16px; font-weight:700; border:1px solid transparent; }
        .btn-primary { background: var(--brand); color:#fff; border-color: var(--brand); }
        .btn-outline { background: transparent; color: var(--brand); border-color: var(--brand); }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .exp-card { transition: none; transform: none; opacity: 1; }
          .exp-list li, .exp-card::before { transition: none; }
        }
      `}</style>

            <div className="section exp-section" style={{ paddingBottom: '100px' }}>
                <section
                    id="experience"
                    style={{
                        maxWidth: 'none',
                        width: '100vw',
                        marginLeft: 'calc(50% - 50vw)',
                        marginRight: 'calc(50% - 50vw)',
                        padding: '24px 16px',
                    }}
                >
                    {/* Responsive container: grows with window, but stays nicely centered */}
                    <div
                        className="container"
                        style={{
                            maxWidth: 'clamp(1180px, 92vw, 1600px)',
                            width: '100%',
                            margin: '0 auto',
                            padding: '24px 16px',
                        }}
                    >
                        <ExpHeadline phrases={['Work Experience', 'I Have Worked At', 'Professional Journey']} />

                        <br />
                        <div className="exp-grid" ref={gridRef}>
                            {roles.map((r, i) => (
                                <article
                                    key={r.company + r.role}
                                    className="exp-card"
                                    style={{ transitionDelay: `${i * 90}ms` }}
                                    onClick={onCardClick}
                                    tabIndex={0}
                                    data-ripple
                                >
                                    <div className="exp-top">
                                        <div className="exp-company">{r.company}</div>
                                        <div className="exp-date">{r.date}</div>
                                    </div>
                                    <h3 className="exp-role">{r.role}</h3>
                                    <ul className="exp-list">
                                        {r.bullets.map((b, idx) => (
                                            <li key={idx}>
                                                <span className="exp-bullet">•</span>
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>

                        <div
                            className="cta"
                            style={{
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 14px 34px rgba(2,6,23,0.12)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            <h3 style={{ transition: 'color 0.3s ease' }}>Let’s build something great</h3>
                            <p style={{ transition: 'color 0.3s ease' }}>
                                Open to impactful frontend roles and consulting engagements.
                            </p>
                            <div
                                className="cta-actions"
                                style={{ marginTop: '12px', display: 'flex', gap: '10px', justifyContent: 'center' }}
                            >
                                <a
                                    className="btn btn-primary"
                                    href="mailto:shubham14p3@gmail.com"
                                    data-ripple
                                    style={{
                                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(37,99,235,0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '';
                                    }}
                                >
                                    Email: shubham14p3@gmail.com
                                </a>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => navigator.clipboard?.writeText('shubham14p3@gmail.com')}
                                    data-ripple
                                    style={{
                                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(14,165,233,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '';
                                    }}
                                >
                                    Copy email
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Specilizing;
