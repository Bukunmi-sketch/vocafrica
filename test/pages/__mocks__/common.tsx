import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import { vi } from "vitest";

export const mockNavigate = vi.fn();
export const mockUseAuth = vi.fn(() => ({
  token: "mock-token",
  userId: "mock-user-id",
  userDetails: {
    is_administrator: false,
    is_biller: false,
    is_provider: false,
    is_provider_administrator: false,
    is_scheduler: false,
    is_supervisor: false,
    organization_id: "org-1",
  },
  authLoading: {
    signIn: false,
    forgotPassword: false,
    addTeamMember: false,
  },
  googleSignin: vi.fn(),
  forgotPassword: vi.fn(),
  addTeamMeber: vi.fn(),
  setUserDetails: vi.fn(),
}));

export function renderWithRouter(
  ui: React.ReactElement,
  { route = "/", ...options }: { route?: string } & Omit<RenderOptions, "wrapper"> = {}
) {
  return render(
    <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>,
    options
  );
}

export function createPageMocks(overrides: Record<string, unknown> = {}) {
  return {
    useAuth: mockUseAuth,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: "/", state: null, key: "", search: "" }),
    ...overrides,
  };
}
