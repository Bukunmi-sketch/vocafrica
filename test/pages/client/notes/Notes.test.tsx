import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Notes from "@/pages/client/Notes";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ token: "mock" }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Clients Notes", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Notes />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
