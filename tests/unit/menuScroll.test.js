import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { MenuScroll } from "../../src/scripts/menuScroll.js";

describe("MenuScroll", () => {
  test("Root font size is returned as a number", () => {
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
