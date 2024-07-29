import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("./index.html");
  await expect(page).toHaveTitle("Medycyna Estetyczna Tychy");
});

test("shows nav bar", async ({ page }) => {
  await page.goto("./index.html");
  await expect(page.getByRole("navigation")).toBeInViewport();
});

test("nav bar disappears after scrolling down", async ({ page }) => {
  await page.goto("./index.html");
  await page.evaluate(() => window.scrollTo(0, 500));
  await expect(page.getByRole("navigation")).not.toBeInViewport();
});

test("nav bar appears after scrolling up", async ({ page }) => {
  await page.goto("./index.html");
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.evaluate(() => window.scrollTo(0, -500));
  await expect(page.getByRole("navigation")).toBeInViewport();
});
