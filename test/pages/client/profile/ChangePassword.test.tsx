import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ChangePassword from "@/pages/client/ChangePassword";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ authLoading: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Clients ChangePassword", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
