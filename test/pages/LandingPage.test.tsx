import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";

describe("LandingPage", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    const buttons = screen.getAllByRole("button", { name: /client signup/i });
    expect(buttons.length).toBeGreaterThan(0);
    expect(buttons[0]).toBeInTheDocument();
  });

  it("renders Client Signup button that links to /client-onboarding/signup", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link", { name: /client signup/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/client-onboarding/signup");
  });

  it("renders General Login button that links to /auth/signin", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link", { name: /general login/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/auth/signin");
  });

  it("renders Business Signup button that links to /auth/admin-onboarding", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    const links = screen.getAllByRole("link", { name: /business signup/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/auth/admin-onboarding");
  });
});
