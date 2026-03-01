import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthMenu from "@/pages/authentication/AuthMenu";

describe("AuthMenu", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <AuthMenu />
      </MemoryRouter>
    );
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  it("renders Sign In link to /auth/signin", () => {
    render(
      <MemoryRouter>
        <AuthMenu />
      </MemoryRouter>
    );
    const signInLink = screen.getByRole("link", { name: /sign in/i });
    expect(signInLink).toHaveAttribute("href", "/auth/signin");
  });

  it("renders Telepractice Pro logo", () => {
    render(
      <MemoryRouter>
        <AuthMenu />
      </MemoryRouter>
    );
    const logo = screen.getByAltText("Telepractice Pro");
    expect(logo).toBeInTheDocument();
  });
});
