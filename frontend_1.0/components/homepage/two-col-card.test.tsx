import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TwoColCard from "./two-col-card";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("TwoColCard", () => {
  it("renders CTAs as links", () => {
    render(
      <TwoColCard
        leftHref="/chat-assistant"
        rightHref="/projects"
        leftContent="Chat"
        rightContent="Projects"
      />,
    );
    expect(screen.getByRole("link", { name: "Chat" })).toHaveAttribute(
      "href",
      "/chat-assistant",
    );
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects",
    );
  });
});
