import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaymentDashboard from "@/pages/client/PaymentDashboard";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ token: "mock" }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Clients PaymentDashboard", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <PaymentDashboard />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
