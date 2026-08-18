import { test, expect, devices } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("smoke", () => {
  test("home loads and navigates", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("main")).toBeVisible();
    await page.getByRole("link", { name: /chat/i }).first().click();
    await expect(page).toHaveURL(/\/en\/chat-assistant/);
    await page.goto("/en/projects");
    await expect(page.locator("main")).toBeVisible();
  });

  test("unknown route shows 404 content", async ({ page }) => {
    await page.goto("/en/this-page-does-not-exist");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("german locale home loads", async ({ page }) => {
    await page.goto("/de");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
  });

  test("menu opens on mobile", async ({ browser }) => {
    const context = await browser.newContext({
      ...devices["iPhone 13"],
    });
    const page = await context.newPage();
    await page.goto("/en");
    await page.getByRole("button", { name: /open menu/i }).click();
    await expect(page.getByRole("navigation", { name: /site/i })).toBeVisible();
    await context.close();
  });
});

for (const path of ["/en", "/en/chat-assistant", "/en/projects", "/de"]) {
  test(`axe: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}
