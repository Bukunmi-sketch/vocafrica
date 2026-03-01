import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddLocation from "@/pages/admin/AddLocation";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ userDetails: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});
vi.mock("@/hooks/useApi", () => ({ default: { get: vi.fn(), post: vi.fn() } }));
vi.mock("react-hot-toast", () => ({ default: { success: vi.fn(), error: vi.fn() } }));
vi.mock("@/pages/admin/components/SelectField", () => ({ default: () => null }));
vi.mock("@/data/countryStateData", () => ({ COUNTRY_STATE_DATA: [] }));

describe("Admin AddLocation", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <AddLocation />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
