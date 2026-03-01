import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Onboard from "@/pages/authentication/Onboard";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    token: "mock",
    userId: "user-1",
    addTeamMeber: vi.fn(),
    authLoading: { addTeamMember: false },
  }),
}));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn(), useLocation: () => ({ pathname: "/", state: { fromDash: false }, key: "", search: "" }) };
});
vi.mock("@/common/loader/SweetLoader", () => ({ default: () => null }));
vi.mock("react-hot-toast", () => ({ default: { success: vi.fn(), error: vi.fn() } }));

describe("Onboard", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Onboard />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /onboard team member/i })).toBeInTheDocument();
  });
});
