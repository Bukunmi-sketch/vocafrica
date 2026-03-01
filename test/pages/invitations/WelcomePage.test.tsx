import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import WelcomePage from "@/pages/invitations/WelcomePage";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ userDetails: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});
vi.mock("@/hooks/usePreventBackNavigation", () => ({ default: () => {} }));

describe("Invitations WelcomePage", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
