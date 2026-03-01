import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardAdminPage from "@/pages/admin/Dashboard";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    userDetails: { is_administrator: true, is_biller: false, is_provider: false, is_provider_administrator: false, is_scheduler: false, is_supervisor: false },
    token: "mock-token",
  }),
}));

vi.mock("@/pages/admin/dashboard/admin/DashboardAdmin", () => ({
  default: () => <div data-testid="dashboard-admin">DashboardAdmin</div>,
}));
vi.mock("@/pages/admin/dashboard/biller/DashboardBiller", () => ({
  default: () => <div data-testid="dashboard-biller">DashboardBiller</div>,
}));
vi.mock("@/pages/admin/dashboard/provider/DashboardProvider", () => ({
  default: () => <div data-testid="dashboard-provider">DashboardProvider</div>,
}));
vi.mock("@/pages/admin/dashboard/provider-admin/DashboardProviderAdmin", () => ({
  default: () => <div data-testid="dashboard-provider-admin">DashboardProviderAdmin</div>,
}));
vi.mock("@/pages/admin/dashboard/scheduler/DashboardScheduler", () => ({
  default: () => <div data-testid="dashboard-scheduler">DashboardScheduler</div>,
}));
vi.mock("@/pages/admin/dashboard/supervisor/DashboardSupervisor", () => ({
  default: () => <div data-testid="dashboard-supervisor">DashboardSupervisor</div>,
}));

describe("Admin Dashboard Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<DashboardAdminPage />);
    const els = screen.getAllByTestId("dashboard-admin");
    expect(els.length).toBeGreaterThan(0);
    expect(els[0]).toBeInTheDocument();
  });

  it("renders DashboardAdmin when user is administrator", () => {
    render(<DashboardAdminPage />);
    const els = screen.getAllByTestId("dashboard-admin");
    expect(els.length).toBeGreaterThan(0);
    expect(els[0]).toBeInTheDocument();
    expect(screen.queryByTestId("dashboard-biller")).not.toBeInTheDocument();
  });
});
