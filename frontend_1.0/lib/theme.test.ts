import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  applyTheme,
  getStoredTheme,
  nextTheme,
  resolveDarkClass,
  THEME_STORAGE_KEY,
} from "./theme";

describe("theme helpers", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "";
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("dark"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );
  });

  it("cycles light → dark → system", () => {
    expect(nextTheme("light")).toBe("dark");
    expect(nextTheme("dark")).toBe("system");
    expect(nextTheme("system")).toBe("light");
  });

  it("resolves system preference against matchMedia", () => {
    expect(resolveDarkClass("light")).toBe(false);
    expect(resolveDarkClass("dark")).toBe(true);
    expect(resolveDarkClass("system")).toBe(true);
  });

  it("reads stored preference and applies class + color-scheme", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    expect(getStoredTheme()).toBe("dark");
    applyTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe("dark");
    applyTheme("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe("light");
  });
});
