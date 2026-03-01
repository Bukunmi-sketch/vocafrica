import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardTeam from "@/pages/teams/Dashboard";

vi.mock("@/pages/teams/components/sidebar/Leftbar", () => ({
  default: ({ leftbarOpen, setLeftbarOpen }: { leftbarOpen: boolean; setLeftbarOpen: (v: boolean) => void }) => (
    <aside data-testid="leftbar">
      Leftbar {leftbarOpen ? "open" : "closed"}
      <button type="button" onClick={() => setLeftbarOpen(false)}>
        Close
      </button>
    </aside>
  ),
}));
vi.mock("@/pages/teams/components/DashboardMetrics", () => ({
  default: () => <div data-testid="dashboard-metrics">DashboardMetrics</div>,
}));
vi.mock("@/pages/teams/components/AppointmentTable", () => ({
  default: () => <div data-testid="appointment-table">AppointmentTable</div>,
}));

describe("Teams Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<DashboardTeam />);
    expect(screen.getAllByTestId("leftbar")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("dashboard-metrics")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("appointment-table")[0]).toBeInTheDocument();
  });

  it("renders Invite New Client and Invite Team Provider cards", () => {
    render(<DashboardTeam />);
    const h1 = screen.getAllByRole("heading", { name: /onboard all your client to the platform/i });
    const h2 = screen.getAllByRole("heading", { name: /add team and professional provider/i });
    const b1 = screen.getAllByRole("button", { name: /invite new client/i });
    const b2 = screen.getAllByRole("button", { name: /invite team provider/i });
    expect(h1.length).toBeGreaterThan(0);
    expect(h2.length).toBeGreaterThan(0);
    expect(b1.length).toBeGreaterThan(0);
    expect(b2.length).toBeGreaterThan(0);
    expect(h1[0]).toBeInTheDocument();
    expect(h2[0]).toBeInTheDocument();
    expect(b1[0]).toBeInTheDocument();
    expect(b2[0]).toBeInTheDocument();
  });

});
