import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InviteExpired from "@/pages/invitations/InviteExpired";

describe("InviteExpired", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <InviteExpired />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /onboarding link expired/i })).toBeInTheDocument();
  });

  it("renders expiry message", () => {
    render(
      <MemoryRouter>
        <InviteExpired />
      </MemoryRouter>
    );
    const matches = screen.getAllByText(/this onboarding link has expired/i);
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0]).toBeInTheDocument();
  });

  it("renders Return to Login link to /auth/signin", () => {
    render(
      <MemoryRouter>
        <InviteExpired />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link", { name: /return to login/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/auth/signin");
  });

  it("renders logo", () => {
    render(
      <MemoryRouter>
        <InviteExpired />
      </MemoryRouter>
    );
    const logos = screen.getAllByAltText("Logo");
    expect(logos.length).toBeGreaterThan(0);
    expect(logos[0]).toBeInTheDocument();
  });
});
