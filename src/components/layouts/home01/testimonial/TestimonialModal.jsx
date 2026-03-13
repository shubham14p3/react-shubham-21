import React, { useEffect } from "react";

export default function TestimonialModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="testimonial-modal-overlay" onClick={onClose}>
      <div
        className="testimonial-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="testimonial-modal__close"
          onClick={onClose}
          aria-label="Close testimonial"
        >
          ×
        </button>

        <div className="testimonial-modal__header">
          <img
            src={item.img}
            alt={item.name}
            className="testimonial-modal__avatar"
          />

          <div className="testimonial-modal__meta">
            <span className="testimonial-modal__eyebrow">Recommendation</span>
            <h3 className="testimonial-modal__name">{item.name}</h3>
            <p className="testimonial-modal__headline">{item.headline}</p>
            <p className="testimonial-modal__meta-line">{item.meta}</p>

            {item.linkedin?.enabled && item.linkedin?.url ? (
              <a
                href={item.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="testimonial-modal__linkedin"
              >
                <span className="testimonial-modal__linkedin-icon">in</span>
                <span>View LinkedIn</span>
              </a>
            ) : null}
          </div>
        </div>

        <div className="testimonial-modal__body">
          <span className="testimonial-modal__quote" aria-hidden="true">
            “
          </span>
          <p className="testimonial-modal__text">{item.text}</p>
        </div>
      </div>
    </div>
  );
}