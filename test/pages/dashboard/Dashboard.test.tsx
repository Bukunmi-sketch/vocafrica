import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Dashboard from "@/pages/dashboard/Dashboard";

vi.mock("@/components/Sidebar", () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));
vi.mock("@/components/DashboardMetrics", () => ({
  default: () => <div data-testid="dashboard-metrics">DashboardMetrics</div>,
}));
vi.mock("@/components/AppointmentTable", () => ({
  default: () => <div data-testid="appointment-table">AppointmentTable</div>,
}));

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Dashboard />);
    expect(screen.getAllByTestId("sidebar")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("dashboard-metrics")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("appointment-table")[0]).toBeInTheDocument();
  });

  it("renders Invite New Client card and button", () => {
    render(<Dashboard />);
    const headings = screen.getAllByRole("heading", { name: /onboard all your client to the platform/i });
    const buttons = screen.getAllByRole("button", { name: /invite new client/i });
    expect(headings.length).toBeGreaterThan(0);
    expect(buttons.length).toBeGreaterThan(0);
    expect(headings[0]).toBeInTheDocument();
    expect(buttons[0]).toBeInTheDocument();
  });

  it("renders Invite Team Provider card and button", () => {
    render(<Dashboard />);
    const headings = screen.getAllByRole("heading", { name: /add team and professional provider/i });
    const buttons = screen.getAllByRole("button", { name: /invite team provider/i });
    expect(headings.length).toBeGreaterThan(0);
    expect(buttons.length).toBeGreaterThan(0);
    expect(headings[0]).toBeInTheDocument();
    expect(buttons[0]).toBeInTheDocument();
  });
});
