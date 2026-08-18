import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("projects data", () => {
  it("has unique ids", () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("does not reuse the same repoLink across projects", () => {
    const links = projects
      .map((p) => p.repoLink)
      .filter((link): link is string => Boolean(link));
    expect(new Set(links).size).toBe(links.length);
  });

  it("uses corrected Book Recommender naming", () => {
    expect(projects.some((p) => p.name === "Book Recommender")).toBe(true);
    expect(projects.some((p) => p.name.includes("Recommendor"))).toBe(false);
  });
});
