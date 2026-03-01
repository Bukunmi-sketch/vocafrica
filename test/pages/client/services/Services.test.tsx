import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Services from "@/pages/client/Services";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ token: "mock" }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Clients Services", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Services />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
