import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { MenuScroll } from "../../src/scripts/menuScroll.js";
import fs from "fs";
import path from "path";

describe("MenuScroll", () => {
  test("Uses root font size returned as a number", () => {
    vi.spyOn(window, "getComputedStyle").mockImplementation((obj) => {
      if (obj === document.documentElement) {
        return { fontSize: "10px" };
      }
    });
    const fontSize = MenuScroll.getRootFontSize();
    expect(fontSize).toBeTypeOf("number");
    expect(fontSize).greaterThan(0);
  });
});

describe("Burger Menu", () => {
  const htmlPath = path.resolve(__dirname, "..", "..", "index.html");
  const initialHTML = fs.readFileSync(htmlPath, "utf-8");

  beforeEach(async () => {
    document.body.innerHTML = initialHTML;
    MenuScroll.initialize();
  });

  test("toggles to minimized if maximized", () => {
    const spy = vi.spyOn(MenuScroll, "minimizeBurger");
    MenuScroll.state.elements.menuBar.classList.add("maximize");
    MenuScroll.toggleBurger();
    expect(spy).toHaveBeenCalled();
  });

  test("toggles to maximized if minimized", () => {
    const spy = vi.spyOn(MenuScroll, "maximizeBurger");
    MenuScroll.toggleBurger();
    expect(spy).toHaveBeenCalled();
  });
});
