import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ClientInboxPage from "@/pages/admin/message/ClientInboxPage";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    token: "mock-token",
    userDetails: {
      team_member_id: "tm-1",
      organization_id: "org-1",
      role: "provider",
      first_name: "Test",
      last_name: "User",
    },
  }),
}));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});
vi.mock("@/pages/admin/message/ClientDirectInbox", () => ({
  default: () => <div data-testid="client-direct-inbox">ClientDirectInbox</div>,
}));

describe("Admin Message ClientInboxPage", () => {
  it("renders ClientDirectInbox when clientId and clientName are in location state", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/admin/message/client-inbox",
            state: { clientId: "client-1", clientName: "Test Client" },
          },
        ]}
      >
        <ClientInboxPage />
      </MemoryRouter>
    );
    const els = screen.getAllByTestId("client-direct-inbox");
    expect(els.length).toBeGreaterThan(0);
    expect(els[0]).toBeInTheDocument();
  });

  it("renders without crashing with valid state", () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/inbox",
            state: { clientId: "c1", clientName: "Jane Doe" },
          },
        ]}
      >
        <ClientInboxPage />
      </MemoryRouter>
    );
    const els = screen.getAllByTestId("client-direct-inbox");
    expect(els.length).toBeGreaterThan(0);
    expect(els[0]).toBeInTheDocument();
  });
});
