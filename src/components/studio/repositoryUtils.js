export function safeWebUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value.startsWith("www.") ? `https://${value}` : value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

export function selectRepositories(
  repositories,
  { query = "", language = "All", sort = "updated" },
) {
  const term = query.trim().toLowerCase();
  return repositories
    .filter(
      (repo) =>
        repo &&
        typeof repo.name === "string" &&
        !repo.fork &&
        (language === "All" || (repo.language || "Other") === language) &&
        (!term ||
          `${repo.name} ${repo.description || ""} ${(Array.isArray(repo.topics) ? repo.topics : []).join(" ")}`
            .toLowerCase()
            .includes(term)),
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "stars")
        return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
    });
}

export async function fetchRepositories(signal) {
  const repositories = [];
  for (let page = 1; page <= 20; page += 1) {
    const response = await fetch(
      `https://api.github.com/users/shubham14p3/repos?sort=updated&per_page=100&page=${page}`,
      { signal, headers: { Accept: "application/vnd.github+json" } },
    );
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const batch = await response.json();
    if (!Array.isArray(batch))
      throw new Error("Unexpected repository response");
    repositories.push(
      ...batch
        .filter(
          (repo) =>
            repo &&
            typeof repo.name === "string" &&
            typeof repo.html_url === "string",
        )
        .map((repo) => ({
          id: repo.id || repo.name,
          name: repo.name,
          description:
            typeof repo.description === "string" ? repo.description : "",
          language: typeof repo.language === "string" ? repo.language : null,
          html_url: safeWebUrl(repo.html_url),
          homepage: safeWebUrl(repo.homepage),
          topics: Array.isArray(repo.topics)
            ? repo.topics.filter((topic) => typeof topic === "string")
            : [],
          fork: Boolean(repo.fork),
          stargazers_count: Number.isFinite(repo.stargazers_count)
            ? repo.stargazers_count
            : 0,
          updated_at:
            typeof repo.updated_at === "string" ? repo.updated_at : "",
        }))
        .filter((repo) => repo.html_url),
    );
    if (batch.length < 100) return repositories;
  }
  return repositories;
}
