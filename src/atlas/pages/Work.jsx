import "../pages.css";
import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { work } from "../data/atlas";
import {
  Arrow,
  Closing,
  PageIntro,
  SectionLabel,
} from "../components/Primitives";
import WorkCarousel from "../components/WorkCarousel";
const RepositoryExplorer = lazy(
  () => import("../../components/studio/RepositoryExplorer"),
);
export default function Work() {
  const [observatory, setObservatory] = useState(false);
  return (
    <>
      <div className="page-wrap">
        <PageIntro
          number="02"
          label="Selected work"
          title={
            <>
              Real systems.
              <br />
              <span>Real responsibility.</span>
            </>
          }
        >
          <p>
            Payments, banking, and enterprise React. A closer look at the
            decisions behind the interface—and my part in making them work.
          </p>
        </PageIntro>
      </div>
      <h2 className="sr-only">Selected engineering stories</h2>
      <WorkCarousel />
      <div className="page-wrap">
        <section className="work-index" aria-label="All engineering stories">
          {work.map((item) => (
            <Link to={`/work/${item.id}`} key={item.id}>
              <span>{item.number}</span>
              <div>
                <h2>{item.client.replace("\n", " ")}</h2>
                <p>Client engagement through {item.employer}</p>
              </div>
              <span>
                {item.metric}
                <small>{item.metricLabel}</small>
              </span>
              <Arrow diagonal />
            </Link>
          ))}
        </section>
        <section className="observatory" id="github">
          <SectionLabel number="04">Code observatory</SectionLabel>
          <div className="observatory-heading">
            <h2>
              See how
              <br />
              <span>I put it together.</span>
            </h2>
            <p>
              Explore public repositories. Search the code collection, filter by
              language, or open the source behind this experience.
            </p>
          </div>
          <div className="action-row">
            <button
              type="button"
              className="action"
              aria-expanded={observatory}
              onClick={() => setObservatory((value) => !value)}
            >
              {observatory ? "Close observatory" : "Open code observatory"}
              <Arrow />
            </button>
            <a
              href="https://github.com/shubham14p3/react-shubham-21"
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              This portfolio’s source <Arrow diagonal />
            </a>
          </div>
          {observatory && (
            <Suspense
              fallback={
                <p className="repo-status" role="status">
                  Opening the code observatory…
                </p>
              }
            >
              <RepositoryExplorer />
            </Suspense>
          )}
        </section>
        <Closing compact />
      </div>
    </>
  );
}
