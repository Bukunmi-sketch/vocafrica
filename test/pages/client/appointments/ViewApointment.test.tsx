import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ViewApointment from "@/pages/client/ViewApointment";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ authLoading: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Clients ViewApointment", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <ViewApointment />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
