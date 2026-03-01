import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Signup2 from "@/pages/authentication/Signup2";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ authLoading: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Signup2", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Signup2 />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
