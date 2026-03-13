import React from "react";

const loaderItems = [
  {
    id: "loader-neo-orbit",
    title: "Neo Orbit Loader",
    description: "Modern orbit-based premium loader with centered progress.",
  },
  {
    id: "loader-terminal-boot",
    title: "Terminal Boot Loader",
    description: "Developer-focused boot sequence loader with system feel.",
  },
  {
    id: "loader-glass-reveal",
    title: "Glass Reveal Loader",
    description: "Elegant glassmorphism reveal loader with soft motion.",
  },
  {
    id: "loader-node-network",
    title: "Node Network Loader",
    description: "System architecture inspired loader with active graph nodes.",
  },
  {
    id: "loader-combined",
    title: "Combined Loader",
    description: "A showcase loader combining orbit, boot system, and node network visuals.",
  },
];

export default function ComponentsShowcase() {
  return (
    <section id="components-showcase" className="section-shell section-anchor">
      <div className="container-shell">
        <div className="section-title-wrap">
          <div className="section-eyebrow">Components showcase</div>
          <h2 className="section-title">Custom loaders and reusable UI experiments.</h2>
          <p className="section-lead">
            A section to showcase interactive frontend components built for this portfolio.
          </p>
        </div>

        <div className="cert-grid">
          {loaderItems.map((item) => (
            <article key={item.id} id={item.id} className="cert-card glass-card section-anchor">
              <div className="cert-card__top">
                <div>
                  <strong>{item.title}</strong>
                </div>
                <span className="cert-card__badge">Loader</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>Showcase component</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}