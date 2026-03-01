import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminSession from "@/pages/admin/sessions/AdminSession";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    userDetails: { organization_id: "org-1", is_administrator: true },
    token: "mock-token",
  }),
}));

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("AdminSession", () => {
  it("renders without crashing", async () => {
    render(
      <MemoryRouter>
        <AdminSession />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText("No sessions found.")).toBeInTheDocument());
  });

  it("shows sessions table when data loads", async () => {
    render(
      <MemoryRouter>
        <AdminSession />
      </MemoryRouter>
    );
    await waitFor(() => {
      const clientHeaders = screen.getAllByText("Client");
      expect(clientHeaders.length).toBeGreaterThan(0);
      expect(clientHeaders[0]).toBeInTheDocument();
      const statusHeaders = screen.getAllByText("Session Status");
      expect(statusHeaders.length).toBeGreaterThan(0);
      expect(statusHeaders[0]).toBeInTheDocument();
    });
  });
});
