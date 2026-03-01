import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import InactiveStaff from "@/pages/admin/InactiveStaff";
import { flushAsyncUpdates } from "@test/testUtils";

vi.mock("@/context/AuthContext", () => ({ useAuth: () => ({ authLoading: {} }) }));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Admin InactiveStaff", () => {
  it("renders without crashing", async () => {
    render(
      <MemoryRouter>
        <InactiveStaff />
      </MemoryRouter>
    );
    await flushAsyncUpdates();
    expect(document.body).toBeTruthy();
  });
});
