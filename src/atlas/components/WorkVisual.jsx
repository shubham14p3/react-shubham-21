export default function WorkVisual({ kind, compact = false }) {
  return (
    <div
      className={`work-visual visual-${kind} ${compact ? "visual-compact" : ""}`}
      aria-hidden="true"
    >
      <div className="visual-coordinate">
        INTERFACE STUDY /{" "}
        {kind === "system" ? "01" : kind === "performance" ? "02" : "03"}
      </div>
      {kind === "system" ? (
        <div className="system-model">
          <div className="system-products">
            <span>Product A</span>
            <span>Product B</span>
            <span>Product C</span>
          </div>
          <div className="system-connections" />
          <div className="system-platform">
            <span>SHARED INTERFACE LAYER</span>
            <div>
              <i>UI</i>
              <i>State</i>
              <i>Tokens</i>
            </div>
          </div>
          <div className="system-base">REACT / TYPESCRIPT / MONOREPO</div>
        </div>
      ) : kind === "performance" ? (
        <div className="performance-model">
          <div className="performance-window">
            <div>
              <span>RENDER ACTIVITY</span>
              <b>Optimized</b>
            </div>
            <div className="signal-bars">
              {[
                8, 16, 34, 65, 45, 24, 52, 85, 65, 42, 22, 15, 30, 60, 90, 66,
                35, 16, 12, 9, 18, 14, 9, 6,
              ].map((height, i) => (
                <i
                  key={i}
                  style={{ "--bar": `${height}%`, "--delay": `${i * 20}ms` }}
                />
              ))}
            </div>
            <div className="performance-axis">
              <span>INPUT</span>
              <span>RESPONSE</span>
            </div>
          </div>
          <div className="performance-float">
            <b>−35%</b>
            <span>unnecessary re-renders</span>
          </div>
        </div>
      ) : (
        <div className="component-model">
          <div className="component-sheet sheet-back">
            <span>TOKENS</span>
            <div className="token-swatches">
              <i />
              <i />
              <i />
            </div>
            <b>Aa / 01</b>
          </div>
          <div className="component-sheet sheet-front">
            <span>COMPONENT FAMILY</span>
            <div className="sample-input">
              Account overview <i>⌄</i>
            </div>
            <div className="sample-button">
              Continue <i>↗</i>
            </div>
            <div className="sample-row">
              <i /> Ready for review
            </div>
          </div>
        </div>
      )}
      <span className="visual-disclaimer">
        Illustrative interface · no proprietary screens
      </span>
    </div>
  );
}
