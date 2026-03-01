import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Session from "@/pages/client/Session";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ authLoading: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Clients Session", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Session />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
