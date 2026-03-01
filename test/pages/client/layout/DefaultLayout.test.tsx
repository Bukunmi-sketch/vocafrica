import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DefaultLayout from "@/pages/client/layout/DefaultLayout";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ authLoading: false, userDetails: {}, token: "mock" }),
}));
vi.mock("@/pages/client/components/header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));
vi.mock("@/pages/client/components/sidebar", () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));
vi.mock("@/pages/admin/components/trigger", () => ({
  default: () => null,
}));

describe("Clients DefaultLayout", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <DefaultLayout>
          <span data-testid="child">Child</span>
        </DefaultLayout>
      </MemoryRouter>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
