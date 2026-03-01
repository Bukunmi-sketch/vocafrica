import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CompanyForm from "@/pages/authentication/CompanyForm";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ authLoading: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("CompanyForm", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CompanyForm />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
