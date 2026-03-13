import React, { useEffect, useMemo, useState } from "react";
import "./Portfolio.css";

const GITHUB_USERNAME = "shubham14p3";
const ITEMS_PER_PAGE = 6;

const ICON_PALETTE = [
  {
    bg: "linear-gradient(135deg, #38bdf8, #2563eb)",
    glow: "rgba(56, 189, 248, 0.35)",
    icon: "⚛",
  },
  {
    bg: "linear-gradient(135deg, #a78bfa, #7c3aed)",
    glow: "rgba(167, 139, 250, 0.35)",
    icon: "◈",
  },
  {
    bg: "linear-gradient(135deg, #34d399, #059669)",
    glow: "rgba(52, 211, 153, 0.35)",
    icon: "⬢",
  },
  {
    bg: "linear-gradient(135deg, #f59e0b, #ea580c)",
    glow: "rgba(245, 158, 11, 0.35)",
    icon: "✦",
  },
  {
    bg: "linear-gradient(135deg, #fb7185, #e11d48)",
    glow: "rgba(251, 113, 133, 0.35)",
    icon: "◆",
  },
  {
    bg: "linear-gradient(135deg, #22c55e, #0f766e)",
    glow: "rgba(34, 197, 94, 0.35)",
    icon: "▣",
  },
];

function normalizeLanguage(language) {
  return language || "Other";
}

function formatDate(dateValue) {
  const date = new Date(dateValue);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getIconTheme(repo) {
  const seed =
    repo.name.split("").reduce((total, char) => total + char.charCodeAt(0), 0) %
    ICON_PALETTE.length;

  return ICON_PALETTE[seed];
}

async function fetchAllRepos(username) {
  let page = 1;
  let allRepos = [];

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      break;
    }

    allRepos = [...allRepos, ...repos];

    if (repos.length < 100) {
      break;
    }

    page += 1;
  }

  return allRepos;
}

function mapRepoToProject(repo) {
  const theme = getIconTheme(repo);

  return {
    id: repo.id,
    title: repo.name,
    category: normalizeLanguage(repo.language),
    meta: repo.language || "Repository",
    description: repo.description || "No description available for this repository.",
    tags: [normalizeLanguage(repo.language), ...(repo.topics || [])].filter(Boolean),
    repoUrl: repo.html_url,
    liveUrl: repo.homepage || "",
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    updatedAt: repo.updated_at,
    updatedLabel: formatDate(repo.updated_at),
    icon: theme.icon,
    accentBg: theme.bg,
    accentGlow: theme.glow,
  };
}

function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="portfolio-pagination" aria-label="Portfolio pagination">
      <button
        type="button"
        className="portfolio-page-btn portfolio-page-btn--nav"
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div className="portfolio-page-list">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`portfolio-page-btn ${currentPage === page ? "active" : ""
              }`}
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="portfolio-page-btn portfolio-page-btn--nav"
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
}

export default function Portfolio() {
  const [repos, setRepos] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadRepos() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAllRepos(GITHUB_USERNAME);

        const mappedRepos = data
          .filter((repo) => !repo.fork)
          .map(mapRepoToProject);

        if (isMounted) {
          setRepos(mappedRepos);
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load GitHub repositories right now.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  const filters = useMemo(() => {
    const languages = Array.from(
      new Set(repos.map((item) => item.category).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));

    return ["All", ...languages];
  }, [repos]);

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const filtered = repos.filter((item) => {
      const matchesFilter =
        activeFilter === "All" ||
        item.category === activeFilter ||
        item.tags.includes(activeFilter);

      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesFilter && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "stars") return b.stars - a.stars;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  }, [repos, activeFilter, searchTerm, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  return (
    <section id="portfolio" className="section-shell section-anchor">
      <div className="container-shell">
        <div className="section-title-wrap">
          <div className="section-eyebrow">GitHub work</div>
          <h2 className="section-title">Repositories and project work.</h2>
          <p className="section-lead">
            Public repositories pulled directly from GitHub with clean filtering,
            search, sorting, and page-based browsing.
          </p>
        </div>

        <div className="portfolio-toolbar">
          <div className="filter-group" aria-label="Portfolio filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="portfolio-toolbar__controls">
            <div className="portfolio-search">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search repositories"
                aria-label="Search repositories"
              />
            </div>

            <div className="portfolio-sort">
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort repositories"
              >
                <option value="updated">Recently updated</option>
                <option value="stars">Most stars</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="portfolio-state glass-card">
            Loading repositories...
          </div>
        ) : error ? (
          <div className="portfolio-state glass-card">{error}</div>
        ) : filteredProjects.length === 0 ? (
          <div className="portfolio-state glass-card">
            No repositories matched your current filter.
          </div>
        ) : (
          <>
            <div className="portfolio-grid">
              {paginatedProjects.map((item) => (
                <article key={item.id} className="portfolio-card glass-card">
                  <div className="portfolio-card__hero">
                    <div
                      className="portfolio-card__icon-shell"
                      style={{
                        background: item.accentBg,
                        boxShadow: `0 18px 40px ${item.accentGlow}`,
                      }}
                    >
                      <span className="portfolio-card__icon">{item.icon}</span>
                    </div>

                    <div className="portfolio-card__hero-meta">
                      <span className="portfolio-card__meta">{item.meta}</span>
                      <span className="portfolio-card__updated">
                        Updated {item.updatedLabel}
                      </span>
                    </div>
                  </div>

                  <div className="portfolio-card__body">
                    <div className="portfolio-card__header">
                      <h3>{item.title}</h3>

                      <div className="portfolio-card__stats">
                        <span>★ {item.stars}</span>
                        <span>⑂ {item.forks}</span>
                      </div>
                    </div>

                    <p>{item.description}</p>

                    <div className="portfolio-tags">
                      {item.tags.slice(0, 5).map((tag) => (
                        <span key={`${item.id}-${tag}`}>{tag}</span>
                      ))}
                    </div>

                    <div className="portfolio-card__actions">
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="portfolio-link"
                      >
                        View Repo
                      </a>

                      {item.liveUrl ? (
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="portfolio-link portfolio-link--secondary"
                        >
                          Live Demo
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </section>
  );
}
