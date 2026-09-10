import { Component } from "react";
export default class RouteBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <section className="not-found page-wrap">
        <p className="section-label">CONNECTION INTERRUPTED</p>
        <h1 tabIndex={-1}>Let’s reconnect.</h1>
        <p>
          This page could not finish loading. Your next visit can start fresh.
        </p>
        <a className="action" href={this.props.path}>
          Reload this page ↗
        </a>
        <p>
          <a className="text-link" href="/shubham-raj-resume.pdf">
            Open the résumé directly
          </a>
        </p>
      </section>
    ) : (
      this.props.children
    );
  }
}
