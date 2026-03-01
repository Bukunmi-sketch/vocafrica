import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Location from "@/pages/admin/Location";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ authLoading: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Admin Location", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Location />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
