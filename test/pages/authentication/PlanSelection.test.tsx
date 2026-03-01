import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PlanSelection from "@/pages/authentication/PlanSelection";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    userDetails: { organization_id: "org-1", subscription_name: null },
    setUserDetails: vi.fn(),
  }),
}));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});
vi.mock("@/config/env", () => ({ API_BASE_URL: "https://api.test" }));
vi.mock("@/common/loader/SweetLoader", () => ({ default: () => null }));
vi.mock("@/hooks/useApi", () => ({ default: {} }));
vi.mock("@/hooks/usePreventBackNavigation", () => ({ default: () => {} }));

beforeEach(() => {
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue("mock-token");
});

describe("PlanSelection", () => {
  it("renders without crashing", async () => {
    render(
      <MemoryRouter>
        <PlanSelection />
      </MemoryRouter>
    );
    await vi.waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });
});
