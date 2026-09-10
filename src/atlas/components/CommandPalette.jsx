import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allDestinations } from "../data/atlas";
import { filterCommands, wrapIndex } from "../data/interactions";
import { useExperience } from "../hooks/ExperienceContext";
import DetailDialog from "../../components/studio/DetailDialog";
export default function CommandPalette({ onClose }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const input = useRef(null);
  const navigate = useNavigate();
  const { toggleRecruiter } = useExperience();
  const results = filterCommands(allDestinations, query);
  const secret = query.trim().toLowerCase() === "hello world";
  useEffect(() => {
    const frame = requestAnimationFrame(() => input.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, []);
  function open(item) {
    onClose();
    if (/^https:\/\//.test(item.to))
      window.open(item.to, "_blank", "noopener,noreferrer");
    else navigate(item.to);
  }
  return (
    <DetailDialog
      title="Where shall we go?"
      eyebrow="INTERFACE ATLAS / COMMAND"
      onClose={onClose}
    >
      <div className="command-input">
        <span aria-hidden="true">⌕</span>
        <input
          ref={input}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          placeholder="Search pages, work, skills…"
          aria-label="Search commands"
          role="combobox"
          aria-expanded="true"
          aria-controls="command-results"
          aria-autocomplete="list"
          aria-activedescendant={
            results[selected] ? `command-${selected}` : undefined
          }
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              const next = wrapIndex(
                selected + (event.key === "ArrowDown" ? 1 : -1),
                results.length,
              );
              setSelected(next);
              document
                .getElementById(`command-${next}`)
                ?.scrollIntoView({ block: "nearest" });
            }
            if (event.key === "Enter" && results[selected]) {
              event.preventDefault();
              open(results[selected]);
            }
          }}
        />
        <kbd>ESC</kbd>
      </div>
      <div
        id="command-results"
        className="command-results"
        role="listbox"
        aria-label="Destinations"
      >
        {results.map((item, index) => (
          <div
            role="option"
            aria-selected={selected === index}
            id={`command-${index}`}
            key={`${item.label}-${index}`}
            onMouseMove={() => setSelected(index)}
            onClick={() => open(item)}
            className={selected === index ? "selected" : ""}
          >
            <span>{item.code}</span>
            {item.label}
            <span aria-hidden="true">↵</span>
          </div>
        ))}
      </div>
      {results.length === 0 && (
        <p role="status">
          {secret
            ? "Hello, fellow builder. Curiosity is a feature. ✳"
            : "No destinations found. Try React, Visa, Lab, or résumé."}
        </p>
      )}
      <div className="command-footer">
        <span>↑ ↓ to explore · Enter to open</span>
        <button
          type="button"
          onClick={() => {
            toggleRecruiter();
            onClose();
          }}
        >
          Toggle recruiter mode
        </button>
      </div>
    </DetailDialog>
  );
}
