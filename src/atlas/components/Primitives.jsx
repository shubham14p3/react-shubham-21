import { Link } from "react-router-dom";
import Icon from "../../components/studio/Icon";
import { track } from "../seo/analytics";
export function Arrow({ diagonal = false }) {
  return <Icon name={diagonal ? "diagonal" : "arrow"} size={20} />;
}
export function Action({ to, children, secondary = false, event, ...props }) {
  const className = `action ${secondary ? "action-secondary" : ""} ${props.className || ""}`;
  const attributes = {
    ...props,
    className,
    onClick: (e) => {
      if (event) track(event);
      props.onClick?.(e);
    },
    "data-cursor": "OPEN",
  };
  return to?.startsWith("/") && !to.endsWith(".pdf") ? (
    <Link to={to} {...attributes}>
      {children}
      <Arrow />
    </Link>
  ) : (
    <a href={to} {...attributes}>
      {children}
      <Arrow diagonal />
    </a>
  );
}
export function SectionLabel({ number, children }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}
export function PageIntro({ number, label, title, children }) {
  return (
    <header className="page-intro">
      <SectionLabel number={number}>{label}</SectionLabel>
      <h1 tabIndex={-1}>{title}</h1>
      {children && <div className="page-deck">{children}</div>}
    </header>
  );
}
export function Closing({ compact = false }) {
  return (
    <section className={`closing ${compact ? "closing-compact" : ""}`}>
      <p className="section-label">Next conversation</p>
      <h2>
        Let’s make
        <br />
        <span>something matter.</span>
      </h2>
      <Action to="/contact">Start a conversation</Action>
      <span className="closing-coordinate" aria-hidden="true">
        SR / OPEN CHANNEL ↗
      </span>
    </section>
  );
}
