import React from "react";

function truncateText(text, maxLength = 155) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export default function TestimonialCard({ item, onOpen }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(item);
    }
  };

  return (
    <article
      className="testimonial-card glass-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(item)}
      onKeyDown={handleKeyDown}
      aria-label={`Open testimonial from ${item.name}`}
    >
      <span className="testimonial-card__quote" aria-hidden="true">
        “
      </span>

      <div className="testimonial-card__top">
        <img
          src={item.img}
          alt={item.name}
          className="testimonial-card__avatar"
          loading="lazy"
        />

        <div className="testimonial-card__meta">
          <h3 className="testimonial-card__name">{item.name}</h3>
          <p className="testimonial-card__headline">{item.headline}</p>
          <p className="testimonial-card__meta-line">{item.meta}</p>
        </div>

        {item.linkedin?.enabled && item.linkedin?.url ? (
          <a
            href={item.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className="testimonial-card__linkedin"
            aria-label={`${item.name} LinkedIn`}
            onClick={(event) => event.stopPropagation()}
          >
            <span>in</span>
          </a>
        ) : null}
      </div>

      <p className="testimonial-card__text">{truncateText(item.text)}</p>

      <div className="testimonial-card__footer">
        <span className="testimonial-card__chip">Read full recommendation</span>
      </div>
    </article>
  );
}