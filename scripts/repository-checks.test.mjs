import { test } from "node:test";
import assert from "node:assert/strict";
import {
  fetchRepositories,
  safeWebUrl,
  selectRepositories,
} from "../src/components/studio/repositoryUtils.js";

test("project links reject executable URLs but retain valid web addresses", () => {
  for (const value of [
    "javascript:alert(1)",
    "data:text/html,test",
    "file:///etc/passwd",
    "not a url",
    undefined,
  ])
    assert.equal(safeWebUrl(value), "");
  assert.equal(safeWebUrl("www.shubhamraj.dev"), "https://www.shubhamraj.dev/");
  assert.equal(
    safeWebUrl("https://shubhamraj.dev/projects?q=react#work"),
    "https://shubhamraj.dev/projects?q=react#work",
  );
});

test("repository browsing combines search, language, sorting, and fork exclusion", () => {
  const data = [
    {
      name: "dashboard",
      language: "JavaScript",
      description: "Banking UI",
      stargazers_count: 1,
    },
    {
      name: "component-kit",
      language: "JavaScript",
      topics: ["banking"],
      stargazers_count: 3,
    },
    {
      name: "copied-bank",
      language: "JavaScript",
      description: "Banking",
      fork: true,
      stargazers_count: 100,
    },
    {
      name: "research",
      language: "Python",
      description: "Banking data",
      stargazers_count: 5,
    },
  ];
  assert.deepEqual(
    selectRepositories(data, {
      query: " BANKING ",
      language: "JavaScript",
      sort: "stars",
    }).map((repo) => repo.name),
    ["component-kit", "dashboard"],
  );
  assert.equal(
    data[0].name,
    "dashboard",
    "Filtering must not mutate the source list",
  );
  assert.equal(selectRepositories(data, { query: "missing" }).length, 0);
});

test("GitHub pagination preserves all pages and passes cancellation through", async (t) => {
  const calls = [];
  const controller = new AbortController();
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({ url, signal: options.signal });
    return {
      ok: true,
      json: async () =>
        calls.length === 1
          ? Array.from({ length: 100 }, (_, id) => ({
              id,
              name: `repo-${id}`,
              html_url: `https://github.com/shubham14p3/repo-${id}`,
            }))
          : [
              {
                id: 100,
                name: "last",
                html_url: "https://github.com/shubham14p3/last",
              },
            ],
    };
  });
  const result = await fetchRepositories(controller.signal);
  assert.equal(result.length, 101);
  assert.equal(calls.length, 2);
  assert.match(calls[1].url, /page=2$/);
  assert.equal(calls[0].signal, controller.signal);
});

test("rate limits and malformed API responses trigger the recoverable error path", async (t) => {
  const mocked = t.mock.method(globalThis, "fetch", async () => ({
    ok: false,
    status: 403,
  }));
  await assert.rejects(fetchRepositories(), /403/);
  mocked.mock.mockImplementation(async () => ({
    ok: true,
    json: async () => ({ message: "Invalid" }),
  }));
  await assert.rejects(fetchRepositories(), /Unexpected/);
});

test("an aborted request does not continue fetching repository pages", async (t) => {
  const controller = new AbortController();
  controller.abort();
  const mocked = t.mock.method(
    globalThis,
    "fetch",
    async (_url, { signal }) => {
      signal.throwIfAborted();
    },
  );
  await assert.rejects(fetchRepositories(controller.signal), {
    name: "AbortError",
  });
  assert.equal(mocked.mock.callCount(), 1);
});

test("malformed repository records and unsafe links cannot become UI content", async (t) => {
  t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    json: async () => [
      null,
      { id: 1 },
      { name: "bad", html_url: "javascript:alert(1)" },
      {
        name: "valid",
        html_url: "https://github.com/shubham14p3/valid",
        topics: { bad: true },
        description: { bad: true },
        homepage: "data:text/html,unsafe",
      },
    ],
  }));
  const data = await fetchRepositories();
  assert.equal(data.length, 1);
  assert.equal(data[0].name, "valid");
  assert.deepEqual(data[0].topics, []);
  assert.equal(data[0].homepage, "");
  assert.equal(data[0].description, "");
});
