import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DefaultLayout from "@/pages/teams/layout/DefaultLayout";

vi.mock("@/pages/teams/components/header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));
vi.mock("@/pages/teams/components/sidebar", () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));

describe("Teams DefaultLayout", () => {
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
