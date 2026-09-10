import { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";
import { fetchRepositories, safeWebUrl, selectRepositories } from "./repositoryUtils";

const fallback = [{ id: "portfolio", name: "react-shubham-21", description: "The source behind this portfolio. React components, responsive layouts, and interface experiments.", language: "JavaScript", html_url: "https://github.com/shubham14p3/react-shubham-21", homepage: "https://shubhamraj.dev", topics: ["portfolio", "react"] }];
let cachedRepositories;

export default function RepositoryExplorer() {
  const [repositories, setRepositories] = useState(cachedRepositories || fallback);
  const [status, setStatus] = useState(cachedRepositories ? "ready" : "loading");
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All");
  const [sort, setSort] = useState("updated");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (cachedRepositories && attempt === 0) return;
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 12000);
    fetchRepositories(controller.signal).then(data => {
      if (!active) return;
      cachedRepositories = data;
      setRepositories(data);
      setStatus("ready");
    }).catch(() => { if (active) setStatus("error"); }).finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [attempt]);

  const languages = useMemo(() => ["All", ...new Set(repositories.filter(repo => !repo.fork).map(repo => repo.language || "Other"))].sort((a, b) => a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)), [repositories]);
  const results = useMemo(() => selectRepositories(repositories, { query, language, sort }), [repositories, query, language, sort]);
  const pageCount = Math.max(1, Math.ceil(results.length / 6));
  const currentPage = Math.min(page, pageCount);
  const visible = results.slice((currentPage - 1) * 6, currentPage * 6);

  return <div className="repository-explorer">
    <div className="repo-toolbar">
      <label className="repo-search"><Icon name="search" /><span className="sr-only">Search repositories</span><input type="search" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} placeholder="Find a project…" /></label>
      <label><span className="sr-only">Repository language</span><select value={language} onChange={event => { setLanguage(event.target.value); setPage(1); }}>{languages.map(item => <option key={item}>{item}</option>)}</select></label>
      <label><span className="sr-only">Sort repositories</span><select value={sort} onChange={event => { setSort(event.target.value); setPage(1); }}><option value="updated">Recently updated</option><option value="name">Name A–Z</option><option value="stars">Most stars</option></select></label>
    </div>
    <p className="repo-status" role="status">{status === "loading" ? "Refreshing public repositories from GitHub…" : status === "error" ? "GitHub is unavailable right now. You can still explore this portfolio’s source." : `${results.length} public ${results.length === 1 ? "repository" : "repositories"}`}{status === "error" && <> <button className="text-button" type="button" onClick={() => { setStatus("loading"); setAttempt(value => value + 1); }}>Try again</button></>}</p>
    <div className="repository-grid">{visible.map(repo => <article className="repository-card" key={repo.id}>
      <div className="repo-card-meta"><Icon name="code" /><span>{repo.language || "Repository"}</span>{repo.stargazers_count > 0 && <span className="repo-stars">{repo.stargazers_count} stars</span>}</div>
      <h3><a href={safeWebUrl(repo.html_url)} target="_blank" rel="noopener noreferrer">{repo.name}<Icon name="diagonal" size={18} /></a></h3>
      <p>{repo.description || `Explore the code and documentation for ${repo.name}.`}</p>
      {safeWebUrl(repo.homepage) && <a className="text-link" href={safeWebUrl(repo.homepage)} target="_blank" rel="noopener noreferrer">Visit project <Icon name="arrow" size={16} /></a>}
    </article>)}</div>
    {results.length === 0 && <div className="repo-empty"><p>No projects match those filters.</p><button className="button button-outline" type="button" onClick={() => { setQuery(""); setLanguage("All"); setPage(1); }}>Clear filters</button></div>}
    {pageCount > 1 && <nav className="repo-pagination" aria-label="Repository pages"><button className="button button-outline" type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>Previous</button><span aria-live="polite">{currentPage} / {pageCount}</span><button className="button button-outline" type="button" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)}>Next</button></nav>}
  </div>;
}
