import "../pages.css";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { caseStudies } from "../../components/studio/caseStudies";
import { work } from "../data/atlas";
import { Action, Arrow, SectionLabel } from "../components/Primitives";
import ArchitectureExplorer from "../components/ArchitectureExplorer";
import WorkVisual from "../components/WorkVisual";
import { track } from "../seo/analytics";
import NotFound from "./NotFound";
export default function CaseStudy() {
  const { slug } = useParams();
  const record = caseStudies.find((item) => item.id === slug);
  const visual = work.find((item) => item.id === slug);
  const end = useRef(null);
  useEffect(() => {
    if (!end.current) return;
    let sent = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sent) {
          track("case_study_complete", { project: slug });
          sent = true;
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(end.current);
    return () => observer.disconnect();
  }, [slug]);
  if (!record || !visual) return <NotFound />;
  const next =
    work[(work.findIndex((item) => item.id === slug) + 1) % work.length];
  return (
    <article
      className="case-study"
      style={{
        "--case-accent": visual.accent,
        "--slide-accent": visual.accent,
      }}
    >
      <header className="case-header page-wrap">
        <Link to="/work" className="back-link">
          ← Selected work
        </Link>
        <div className="case-ident">
          <SectionLabel number={visual.number}>{visual.context}</SectionLabel>
          <span>THROUGH {visual.employer.toUpperCase()}</span>
        </div>
        <h1 tabIndex={-1}>{record.title}</h1>
        <div className="case-subhead">
          <p>{record.description}</p>
          <p>
            <strong>{record.client}</strong>
            <br />
            {record.employer}
          </p>
        </div>
      </header>
      <div className="case-cinematic">
        <WorkVisual kind={visual.kind} />
      </div>
      <div className="page-wrap">
        <div className="case-facts">
          <div>
            <span>CLIENT</span>
            <b>{record.client}</b>
          </div>
          <div>
            <span>EMPLOYER</span>
            <b>{visual.employer}</b>
          </div>
          <div>
            <span>FOCUS</span>
            <b>{record.tags.join(" · ")}</b>
          </div>
        </div>
        <div className="case-body">
          <nav className="case-toc" aria-label="In this engineering story">
            <span>IN THIS STORY</span>
            <a href="#challenge">01 / Challenge</a>
            <a href="#system">02 / System</a>
            <a href="#responsibility">03 / My contribution</a>
            <a href="#performance">04 / Impact & quality</a>
            <a href="#outcome">05 / Outcome</a>
          </nav>
          <div className="case-narrative">
            <section id="challenge">
              <SectionLabel number="01">The challenge</SectionLabel>
              <h2>
                {slug === "visa"
                  ? "One decision. Many dependencies."
                  : slug === "citi"
                    ? "Complexity should not feel slow."
                    : "New features. A coherent experience."}
              </h2>
              <p>{record.challenge}</p>
            </section>
            <section id="system">
              <SectionLabel number="02">Think in systems</SectionLabel>
              <h2>
                The interface is
                <br />
                <span>only the visible layer.</span>
              </h2>
              <ArchitectureExplorer variant={slug} />
            </section>
            <section id="responsibility">
              <SectionLabel number="03">My responsibility</SectionLabel>
              <h2>
                Where I made
                <br />
                <span>the difference.</span>
              </h2>
              <ol className="contribution-list">
                {record.contributions.map((text, index) => (
                  <li key={text}>
                    <span>0{index + 1}</span>
                    <p>{text}</p>
                  </li>
                ))}
              </ol>
            </section>
            <section id="performance">
              <SectionLabel number="04">Impact & quality</SectionLabel>
              <div className="case-impact">
                <strong>{record.metric}</strong>
                <p>{record.metricLabel}</p>
              </div>
              {slug === "citi" ? (
                <>
                  <div className="reported-comparison">
                    <div>
                      <span>Page load performance</span>
                      <b>40% improvement</b>
                      <i style={{ "--amount": "40%" }} />
                    </div>
                    <div>
                      <span>Unnecessary re-renders</span>
                      <b>35% reduction</b>
                      <i style={{ "--amount": "35%" }} />
                    </div>
                  </div>
                  <p className="illustration-note">
                    Reported career outcomes for the Citi engagement. These
                    figures are not this portfolio’s Lighthouse or Core Web
                    Vitals results, and no private performance traces are
                    reproduced.
                  </p>
                </>
              ) : (
                <p>
                  {slug === "visa"
                    ? "This engagement is ongoing. The story emphasizes shared architecture, collaboration, and reusable implementation; no unverified performance result is claimed."
                    : "50+ features, 30+ refactored components, 140+ components tested and optimized, and a 35% loading improvement describe my Capgemini banking work collectively."}
                </p>
              )}
              <div className="case-quality">
                <h3>Quality is part of delivery.</h3>
                <p>
                  {slug === "visa"
                    ? "Cross-project coordination, careful dependency assessment, and human-reviewed AI-assisted implementation support maintainability."
                    : "State and API optimization work alongside regression coverage, code review, and collaboration with QA and product teams."}
                </p>
              </div>
            </section>
            <section id="outcome" ref={end}>
              <SectionLabel number="05">The outcome</SectionLabel>
              <h2>
                Built for what
                <br />
                <span>comes next.</span>
              </h2>
              <p>{record.outcome}</p>
              <div className="case-stack">
                <span>TOOLKIT</span>
                <p>{record.tags.join(" / ")}</p>
              </div>
              <Action to="/contact" secondary>
                Discuss this work
              </Action>
            </section>
          </div>
        </div>
        <Link to={`/work/${next.id}`} className="next-story">
          <span>NEXT ENGINEERING STORY</span>
          <h2>{next.client.replace("\n", " ")}</h2>
          <Arrow diagonal />
        </Link>
      </div>
    </article>
  );
}
