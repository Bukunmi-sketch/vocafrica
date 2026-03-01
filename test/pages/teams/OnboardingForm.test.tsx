import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OnboardingForm from "@/pages/teams/OnboardingForm";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ token: "mock" }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Teams OnboardingForm", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <OnboardingForm />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
