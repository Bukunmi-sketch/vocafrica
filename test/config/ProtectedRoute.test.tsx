import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProtectedRoute from "@/config/ProtectedRoute";

const mockUseAuth = vi.fn();
vi.mock("@/context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading when isLoading is true", () => {
    mockUseAuth.mockReturnValue({
      token: "t",
      userDetails: null,
      isLoading: true,
      getCurrentUser: vi.fn(),
      getOnboardingStatus: vi.fn(),
      getTeamOnboardingStatus: vi.fn(),
      clientOnboardingStatus: null,
      getClientOnboardingStatus: vi.fn(),
    });
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("does not render children when no token and not loading", () => {
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
    const getItem = vi.fn().mockReturnValue(null);
    Object.defineProperty(window, "sessionStorage", {
      value: { getItem },
      writable: true,
    });
    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });
});
