import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OnboardClient from "@/pages/authentication/OnboardClient";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ authLoading: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("OnboardClient", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <OnboardClient />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
