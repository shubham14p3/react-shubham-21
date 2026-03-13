import React, { useEffect, useMemo, useState } from "react";
import "./LoaderNodeNetwork.css";
import { useNavigate } from "react-router-dom";

const nodes = [
  { id: 1, x: 12, y: 28 },
  { id: 2, x: 32, y: 16 },
  { id: 3, x: 56, y: 24 },
  { id: 4, x: 74, y: 40 },
  { id: 5, x: 60, y: 64 },
  { id: 6, x: 30, y: 70 },
  { id: 7, x: 18, y: 50 },
];

const connections = [
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 1],
  [2, 7],
  [3, 5],
];

export default function LoaderNodeNetwork() {
  const [progress, setProgress] = useState(0);
  const [activeCount, setActiveCount] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    let frameId;
    let startTime;
    const duration = 2400;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const next = Math.min(Math.round((elapsed / duration) * 100), 100);

      setProgress(next);
      setActiveCount(
        Math.min(nodes.length, Math.max(1, Math.ceil((next / 100) * nodes.length)))
      );

      if (next < 100) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const activeIds = useMemo(
    () => new Set(nodes.slice(0, activeCount).map((node) => node.id)),
    [activeCount]
  );

  const getNodeById = (id) => nodes.find((node) => node.id === id);

  return (
    <div className="loader-shell loader-shell--network" role="status" aria-live="polite">
      <div className="network-loader-card">
        <div className="network-loader-card__grid" />

        <div className="network-loader">
          <div className="network-loader__map" aria-hidden="true">
            <svg
              className="network-loader__svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {connections.map(([from, to], index) => {
                const start = getNodeById(from);
                const end = getNodeById(to);
                const isActive = activeIds.has(from) && activeIds.has(to);

                return (
                  <line
                    key={`${from}-${to}-${index}`}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    className={`network-loader__connection ${isActive ? "is-active" : ""
                      }`}
                  />
                );
              })}
            </svg>

            {nodes.map((node, index) => (
              <span
                key={node.id}
                className={`network-loader__node ${index < activeCount ? "is-active" : ""
                  }`}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
              >
                <span className="network-loader__node-core" />
              </span>
            ))}
          </div>

          <div className="network-loader__content">
            <p className="network-loader__eyebrow">Connecting interface nodes</p>

            <h1 className="network-loader__title">System Architecture</h1>

            <p className="network-loader__subtitle">
              Routing components into a live experience
            </p>

            <div className="network-loader__bottom">
              <div className="network-loader__meter">
                <div className="network-loader__meter-top">
                  <span>Network Sync</span>
                  <span>{progress}%</span>
                </div>

                <div className="network-loader__track">
                  <div
                    className="network-loader__bar"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="network-loader__stats">
                <span>{activeCount}/{nodes.length} nodes live</span>
              </div>
              <br />
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate("/", { replace: true })}
              >
                Take Me Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}