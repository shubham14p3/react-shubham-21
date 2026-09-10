import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { work } from "../data/atlas";
import { carouselKey, wrapIndex } from "../data/interactions";
import { Arrow } from "./Primitives";
import WorkVisual from "./WorkVisual";
import { track } from "../seo/analytics";
export default function WorkCarousel() {
  const [active, setActive] = useState(0);
  const drag = useRef(null);
  const lastWheel = useRef(0);
  const current = work[active];
  const step = (value) =>
    setActive((index) => wrapIndex(index + value, work.length));
  return (
    <div
      className="work-carousel"
      style={{ "--work-accent": current.accent }}
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected engineering stories"
    >
      <div
        className="carousel-stage"
        role="group"
        tabIndex={0}
        aria-label="Work carousel. Use left and right arrow keys, swipe, or the project controls."
        data-cursor="DRAG"
        onKeyDown={(event) => {
          if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            setActive(carouselKey(event.key, active, work.length));
          }
        }}
        onPointerDown={(event) => {
          if (event.target.closest("a,button")) return;
          drag.current = { x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (!drag.current) return;
          const dx = event.clientX - drag.current.x;
          const dy = event.clientY - drag.current.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy))
            step(dx < 0 ? 1 : -1);
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onWheel={(event) => {
          const horizontal =
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
              ? event.deltaX
              : event.shiftKey
                ? event.deltaY
                : 0;
          if (
            Math.abs(horizontal) > 20 &&
            Date.now() - lastWheel.current > 700
          ) {
            step(horizontal > 0 ? 1 : -1);
            lastWheel.current = Date.now();
          }
        }}
      >
        {work.map((item, index) => {
          const offset =
            index === active
              ? 0
              : index === wrapIndex(active + 1, work.length)
                ? 1
                : -1;
          return (
            <article
              key={item.id}
              className={`work-slide ${offset === 0 ? "is-active" : ""}`}
              style={{ "--offset": offset, "--slide-accent": item.accent }}
              aria-hidden={offset !== 0}
              inert={offset !== 0 ? true : undefined}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${work.length}: ${item.client}`}
            >
              <div className="work-slide-top">
                <span>{item.context}</span>
                <span>{item.number} / 03</span>
              </div>
              <WorkVisual kind={item.kind} />
              <div className="work-slide-copy">
                <div>
                  <span>
                    CLIENT ENGAGEMENT THROUGH {item.employer.toUpperCase()}
                  </span>
                  <h3>{item.client}</h3>
                </div>
                <Link
                  to={`/work/${item.id}`}
                  className="round-link"
                  aria-label={`Read ${item.client.replace("\n", " ")} engineering story`}
                  tabIndex={offset === 0 ? 0 : -1}
                  onClick={() => track("project_open", { project: item.id })}
                  data-cursor="OPEN"
                >
                  <Arrow diagonal />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      <div className="carousel-caption">
        <div aria-live="polite" aria-atomic="true">
          <span>{current.number} / ENGINEERING STORY</span>
          <h3>{current.title.replace("\n", " ")}</h3>
          <p>{current.summary}</p>
        </div>
        <div className="carousel-controls">
          <button
            type="button"
            className="icon-button"
            aria-label="Previous project"
            onClick={() => step(-1)}
          >
            ←
          </button>
          <div role="group" aria-label="Choose a project">
            {work.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={index === active ? "active" : ""}
                aria-label={`Show ${item.client.replace("\n", " ")}`}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                {item.number}
              </button>
            ))}
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Next project"
            onClick={() => step(1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
