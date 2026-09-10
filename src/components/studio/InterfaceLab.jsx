import { useId, useState } from "react";
import Icon from "./Icon";

const samples = {
  week: { label: "This week", total: "$24,680", change: "+12.8%", points: "0,98 44,79 88,87 132,45 176,57 220,27 264,37 308,10", labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
  month: { label: "This month", total: "$96,420", change: "+18.4%", points: "0,102 44,90 88,64 132,77 176,37 220,46 264,21 308,5", labels: ["Week 1", "Week 2", "Week 3", "Week 4"] },
};
const colors = [{ name: "Lime", color: "#d7f774" }, { name: "Lilac", color: "#c6b6f8" }, { name: "Apricot", color: "#ffbd92" }];

export default function InterfaceLab() {
  const [period, setPeriod] = useState("week");
  const [accent, setAccent] = useState(colors[0]);
  const [dark, setDark] = useState(false);
  const gradientId = useId().replace(/:/g, "");
  const data = samples[period];

  return (
    <div className="lab-composition" style={{ "--lab-accent": accent.color }}>
      <div className="lab-kicker"><span className="tiny-cross" aria-hidden="true">+</span> A little proof of craft <span className="lab-index">01 / LIVE UI</span></div>
      <div className="lab-stage">
        <div className="lab-grid" aria-hidden="true" />
        <div className={`lab-window ${dark ? "lab-dark" : ""}`}>
          <div className="lab-window-bar"><span className="lab-wordmark">flow<span>.</span></span><span className="lab-window-label">Your money, in focus.</span><span className="lab-avatar">SR</span></div>
          <div className="lab-heading"><div><span className="lab-muted">A clearer picture.</span><h2>Overview</h2></div><button type="button" className="lab-theme" onClick={() => setDark(!dark)} aria-label={dark ? "Use light demo theme" : "Use dark demo theme"} aria-pressed={dark}><Icon name={dark ? "sun" : "moon"} size={18} /></button></div>
          <div className="lab-period" role="group" aria-label="Demo time period">
            {Object.entries(samples).map(([key, value]) => <button key={key} type="button" aria-pressed={period === key} onClick={() => setPeriod(key)}>{value.label}</button>)}
          </div>
          <div className="lab-total" aria-live="polite" aria-atomic="true"><span className="lab-muted">Total received · {data.label.toLowerCase()}</span><div><strong>{data.total}</strong><span className="lab-growth">{data.change} <Icon name="diagonal" size={12} /></span></div></div>
          <div className="lab-chart">
            <svg viewBox="0 0 308 120" role="img" aria-label={`Illustrative ${data.label.toLowerCase()} trend, ending at ${data.total}. Sample data.`}>
              <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={accent.color} stopOpacity="0.55" /><stop offset="100%" stopColor={accent.color} stopOpacity="0" /></linearGradient></defs>
              <path d="M0 30H308M0 70H308M0 110H308" stroke="currentColor" opacity="0.08" />
              <polygon points={`0,120 ${data.points} 308,120`} fill={`url(#${gradientId})`} />
              <polyline points={data.points} fill="none" stroke={dark ? accent.color : "#3c5720"} strokeWidth="2.6" strokeLinejoin="round" />
            </svg>
            <div className="lab-axis">{data.labels.map(label => <span key={label}>{label}</span>)}</div>
          </div>
          <div className="lab-transaction"><span className="lab-transaction-icon"><Icon name="diagonal" size={18} /></span><div><strong>Project payment</strong><span>Completed · Sample transaction</span></div><b>+$2,400</b></div>
        </div>
        <div className="lab-note"><Icon name="code" size={17} /><span>Thought through.<br /><strong>Down to the details.</strong></span></div>
      </div>
      <div className="lab-controls"><span>Make it yours</span><div className="lab-swatches" role="group" aria-label="Demo accent color">{colors.map(color => <button key={color.name} type="button" style={{ "--swatch": color.color }} aria-label={`${color.name} accent`} aria-pressed={accent.name === color.name} onClick={() => setAccent(color)}>{accent.name === color.name && <Icon name="check" size={14} />}</button>)}</div><span className="sample-label">UI study · sample data</span></div>
    </div>
  );
}
