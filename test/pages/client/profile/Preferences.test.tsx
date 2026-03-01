import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Preferences from "@/pages/client/Preferences";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ userDetails: {}, token: "mock" }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Clients Preferences", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Preferences />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
