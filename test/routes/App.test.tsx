import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/app/App";

const mockUseAuth = vi.fn();
vi.mock("@/context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

// Avoid actual Toaster and heavy providers in tests
vi.mock("react-hot-toast", () => ({
  Toaster: () => null,
}));

describe("App routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      token: null,
      userDetails: null,
      isLoading: false,
      getCurrentUser: vi.fn(),
      getOnboardingStatus: vi.fn(),
      getTeamOnboardingStatus: vi.fn(),
      clientOnboardingStatus: null,
      getClientOnboardingStatus: vi.fn(),
    });
  });

  it("renders app without crashing at auth route", () => {
    render(
      <MemoryRouter initialEntries={["/auth/signin"]}>
        <App />
      </MemoryRouter>
    );
    expect(document.body.textContent).toBeTruthy();
  });

  it("renders app without crashing at unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route-404"]}>
        <App />
      </MemoryRouter>
    );
    expect(document.body.textContent).toBeTruthy();
  });
});
