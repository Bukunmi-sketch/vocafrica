import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Subscribe from "@/pages/authentication/Subscribe";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ authLoading: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Subscribe", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Subscribe />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
