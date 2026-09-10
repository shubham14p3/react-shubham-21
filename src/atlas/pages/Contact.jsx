import "../pages.css";
import { useState } from "react";
import profile from "../../data/profile.json";
import { Action, PageIntro } from "../components/Primitives";
import { track } from "../seo/analytics";
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setMessage("Email address copied.");
    } catch {
      setMessage(
        "Copy is unavailable here. Select the email address or open your email app.",
      );
    }
  }
  return (
    <div className="page-wrap contact-page">
      <PageIntro
        number="05"
        label="Open a conversation"
        title={
          <>
            Have a complex interface?
            <br />
            <span>Let’s make it click.</span>
          </>
        }
      >
        <p>
          Enterprise product, frontend architecture, or an ambitious user
          experience—tell me what you’re building and where you want to take it.
        </p>
      </PageIntro>
      <div className="contact-channel">
        <span className="channel-label">01 / DIRECT LINE</span>
        <a
          className="contact-email"
          href={`mailto:${profile.email}`}
          onClick={() => track("contact_click", { channel: "email" })}
          data-cursor="SAY HI"
        >
          {profile.email}
          <span>↗</span>
        </a>
        <div className="contact-tools">
          <Action to={`mailto:${profile.email}`} event="contact_click">
            Open email
          </Action>
          <button type="button" className="text-button" onClick={copy}>
            {copied ? "Copied ✓" : "Copy address"}
          </button>
        </div>
        <p className="copy-status" role="status">
          {message}
        </p>
      </div>
      <div className="contact-alternatives">
        <div>
          <span className="channel-label">02 / PROFESSIONAL</span>
          <h2>Find me on LinkedIn.</h2>
          <p>Career context, recommendations, and a place to connect.</p>
          <Action
            to={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            secondary
            event="linkedin_open"
          >
            Open LinkedIn
          </Action>
        </div>
        <div>
          <span className="channel-label">03 / THE CODE</span>
          <h2>Start with the source.</h2>
          <p>
            Explore public repositories and the implementation behind this
            atlas.
          </p>
          <Action
            to={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            secondary
            event="github_open"
          >
            Open GitHub
          </Action>
        </div>
      </div>
      <div className="contact-location">
        <span className="status-dot" />
        <p>
          Based in Mexico City. Experience across teams in India and Mexico.
        </p>
        <span>SR / END OF TRANSMISSION</span>
      </div>
    </div>
  );
}
