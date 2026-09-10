import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/work",
  "/work/visa",
  "/work/citi",
  "/work/discover",
  "/lab",
  "/about",
  "/stack",
  "/recommendations",
  "/resume",
  "/contact",
];
for (const route of routes)
  test(`route and accessibility: ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
      "href",
      `https://shubhamraj.dev${route === "/" ? "" : route}`,
    );
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
test("palette search, keyboard selection, focus return, and browser history", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open command palette" }).click();
  const input = page.getByRole("combobox", { name: "Search commands" });
  await expect(input).toBeFocused();
  await input.fill("Visa");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/work\/visa$/);
  await expect(page.locator("h1")).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await page.getByRole("button", { name: "Open command palette" }).click();
  await input.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Open command palette" }),
  ).toBeFocused();
});
test("recruiter mode persists and gives a fast path from any route", async ({
  page,
}) => {
  await page.goto("/lab");
  await page.getByRole("button", { name: "Recruiter mode" }).click();
  await expect(page.locator(".recruiter-brief")).toBeVisible();
  await page.reload();
  await expect(page.locator(".recruiter-brief")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Download résumé", exact: true }),
  ).toBeVisible();
});
test("carousel keyboard and pointer drag", async ({ page }) => {
  await page.goto("/");
  const carousel = page.locator(".carousel-stage");
  await carousel.focus();
  await carousel.press("ArrowRight");
  await expect(page.locator(".is-active h3")).toHaveText("Citi");
  await carousel.press("End");
  await expect(page.locator(".is-active h3")).toContainText("Discover");
  await carousel.press("Home");
  await expect(page.locator(".is-active h3")).toHaveText("Visa");
  const bounds = await carousel.boundingBox();
  await page.mouse.move(bounds.x + bounds.width * 0.6, bounds.y + 50);
  await page.mouse.down();
  await page.mouse.move(bounds.x + bounds.width * 0.3, bounds.y + 50, {
    steps: 8,
  });
  await page.mouse.up();
  await expect(page.locator(".is-active h3")).toHaveText("Citi");
});
test("reduced motion and unavailable WebGL keep every capability usable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      return /webgl/i.test(type) ? null : original.call(this, type, ...args);
    };
  });
  await page.goto("/");
  await page.getByRole("button", { name: "02 Architecture" }).click();
  await expect(page.locator("#atlas-evidence")).toContainText("Visa");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
  await expect(page.locator(".atlas-render canvas")).toHaveCount(0);
});
test("GitHub failure, retry, filtering and safe external links", async ({
  page,
}) => {
  let fail = true;
  await page.route("https://api.github.com/**", (route) =>
    fail
      ? route.fulfill({ status: 403, body: '{"message":"rate limited"}' })
      : route.fulfill({
          json: [
            {
              id: 1,
              name: "React Atlas",
              description: "UI system",
              language: "JavaScript",
              html_url: "https://github.com/shubham14p3/react-atlas",
              homepage: "javascript:alert(1)",
            },
            {
              id: 2,
              name: "Python Study",
              language: "Python",
              html_url: "https://github.com/shubham14p3/python-study",
            },
          ],
        }),
  );
  await page.goto("/work");
  await page.getByRole("button", { name: "Open code observatory" }).click();
  await expect(page.getByRole("status")).toContainText("GitHub is unavailable");
  fail = false;
  await page.getByRole("button", { name: "Try again" }).click();
  await page
    .getByRole("combobox", { name: "Repository language" })
    .selectOption("Python");
  await expect(page.locator(".repository-card")).toHaveCount(1);
  await page
    .getByRole("searchbox", { name: "Search repositories" })
    .fill("missing");
  await expect(
    page.getByText("No projects match those filters."),
  ).toBeVisible();
  await expect(page.locator('a[href^="javascript:"]')).toHaveCount(0);
});
test("all responsive widths have no page overflow", async ({ page }) => {
  for (const width of [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/work/citi", "/lab", "/stack", "/contact"]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
  }
});
test("Lab controls and mobile navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/lab");
  await page.getByRole("button", { name: /One token/ }).click();
  await page.getByRole("button", { name: "Request review" }).click();
  await expect(page.getByRole("status")).toContainText("No request was sent");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Expanded navigation" })
    .getByRole("link", { name: /Résumé/ })
    .click();
  await expect(page).toHaveURL(/\/resume$/);
});
test("unknown route is a useful noindex page", async ({ page }) => {
  await page.goto("/not-a-route");
  await expect(page.locator("h1")).toContainText("component tree");
  await expect(page.locator("meta[name=robots]")).toHaveAttribute(
    "content",
    "noindex, follow",
  );
});

test("visual checkpoints", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Reference captures use Chromium; other projects cover behavior.",
  );
  for (const [width, height] of [
    [1440, 1000],
    [390, 844],
    [768, 1024],
  ]) {
    await page.setViewportSize({ width, height });
    for (const route of ["/", "/work/citi", "/lab"]) {
      await page.goto(route);
      if (route === "/")
        await page
          .locator(".atlas-ready")
          .waitFor({ timeout: 6000 })
          .catch(() => {});
      await page.screenshot({
        path: testInfo.outputPath(
          `${width}-${route === "/" ? "home" : route.replaceAll("/", "-")}.png`,
        ),
        fullPage: true,
      });
    }
  }
});
