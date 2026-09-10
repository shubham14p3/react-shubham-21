import "../pages.css";
import { useState } from "react";
import testimonials from "../data/recommendations";
import { carouselKey, wrapIndex } from "../data/interactions";
import { Closing, PageIntro } from "../components/Primitives";
import DetailDialog from "../../components/studio/DetailDialog";
export default function Recommendations() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const item = testimonials[active];
  const text =
    item.id === 1
      ? "His ability to turn complex user requirements into clean, efficient, and intuitive interfaces is exceptional."
      : item.text;
  return (
    <div className="page-wrap">
      <PageIntro
        number="07"
        label="Professional recommendations"
        title={
          <>
            The work is technical.
            <br />
            <span>The impact is human.</span>
          </>
        }
      >
        <p>
          Perspectives from colleagues, collaborators, and mentors. Original
          words, preserved with their context.
        </p>
      </PageIntro>
      <section
        className="recommendation-theatre"
        role="region"
        aria-roledescription="carousel"
        aria-label="Recommendations"
      >
        <div className="recommendation-spine">
          <span>IN GOOD COMPANY</span>
          <b>
            {String(active + 1).padStart(2, "0")}
            <small>/ 08</small>
          </b>
        </div>
        <div
          className="quote-stage"
          role="group"
          tabIndex={0}
          aria-label="Recommendation. Use left and right arrow keys to change the speaker."
          onKeyDown={(event) => {
            if (
              ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
            ) {
              event.preventDefault();
              setActive(carouselKey(event.key, active, testimonials.length));
            }
          }}
        >
          <div className="quote-paper" key={item.id}>
            <span className="quote-glyph" aria-hidden="true">
              “
            </span>
            <blockquote>{text}</blockquote>
            <div className="quote-person">
              <img
                src={`/images/recommendation-${String(item.id).padStart(2, "0")}.webp`}
                width="60"
                height="60"
                alt=""
              />
              <div>
                <h2>{item.name}</h2>
                <p>{item.headline}</p>
              </div>
            </div>
            <p className="quote-meta">{item.meta}</p>
            <button
              type="button"
              className="text-button"
              onClick={() => setExpanded(true)}
            >
              {item.id === 1
                ? "Read the full recommendation"
                : "Open original recommendation"}{" "}
              ↗
            </button>
          </div>
        </div>
        <div className="quote-controls">
          <button
            type="button"
            className="icon-button"
            aria-label="Previous recommendation"
            onClick={() =>
              setActive(wrapIndex(active - 1, testimonials.length))
            }
          >
            ←
          </button>
          <p role="status">
            {item.name} · {active + 1} of {testimonials.length}
          </p>
          <button
            type="button"
            className="icon-button"
            aria-label="Next recommendation"
            onClick={() =>
              setActive(wrapIndex(active + 1, testimonials.length))
            }
          >
            →
          </button>
        </div>
        <div
          className="speaker-list"
          role="group"
          aria-label="Choose a recommendation"
        >
          {testimonials.map((person, index) => (
            <button
              key={person.id}
              type="button"
              aria-pressed={index === active}
              onClick={() => setActive(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {person.name}
            </button>
          ))}
        </div>
      </section>
      {expanded && (
        <DetailDialog
          title={item.name}
          eyebrow="ORIGINAL RECOMMENDATION"
          onClose={() => setExpanded(false)}
        >
          <p>{item.headline}</p>
          <p>{item.meta}</p>
          {item.text.split(/\n\s*\n/).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </DetailDialog>
      )}
      <Closing compact />
    </div>
  );
}
