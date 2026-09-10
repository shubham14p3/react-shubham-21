import { useState } from "react";
export default function RenderExperiment() {
  const [scoped, setScoped] = useState(false);
  const [cycle, setCycle] = useState(0);
  const names = [
    "App shell",
    "Navigation",
    "Profile",
    "Workspace",
    "Filters",
    "Chart",
    "Legend",
    "Activity",
    "Footer",
  ];
  const affected = scoped ? [4, 5, 6] : names.map((_, i) => i);
  return (
    <div className="render-experiment">
      <div className="render-toolbar">
        <label className="check-control">
          <input
            type="checkbox"
            checked={scoped}
            onChange={(e) => {
              setScoped(e.target.checked);
              setCycle(0);
            }}
          />
          Scope the state update
        </label>
        <button
          type="button"
          className="action action-secondary"
          onClick={() => setCycle((value) => value + 1)}
        >
          Change a chart filter ↗
        </button>
      </div>
      <div
        className="render-tree"
        aria-label="Conceptual component render propagation"
      >
        {names.map((name, index) => (
          <div
            key={`${name}-${cycle}`}
            className={
              cycle && affected.includes(index) ? "render-affected" : ""
            }
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {name}
            <small>
              {cycle
                ? affected.includes(index)
                  ? "updated"
                  : "unchanged"
                : "idle"}
            </small>
          </div>
        ))}
      </div>
      <p className="render-result" role="status">
        {cycle ? (
          <>
            <b>
              {affected.length} / {names.length}
            </b>{" "}
            illustrative components updated.{" "}
            {scoped
              ? "The update stays close to the data that changed."
              : "A broad subscription makes unrelated components work too."}
          </>
        ) : (
          "Trigger a filter change. Then narrow the state boundary and compare."
        )}
      </p>
      <p className="illustration-note">
        A teaching model of render propagation, not a React profiler trace or a
        benchmark. This diagram’s nodes are intentionally controlled by the
        demonstration.
      </p>
    </div>
  );
}
