import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "@/pages/client/Profile";
import { flushAsyncUpdates } from "@test/testUtils";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    userDetails: { client_id: "c1", user_id: "u1", first_name: "Test", last_name: "User" },
    token: "mock",
    authLoading: { getCurrentUser: false, updateProfile: false },
    getCurrentUser: vi.fn(),
    updateClientProfile: vi.fn(),
    setUserDetails: vi.fn(),
    uploadProfilePic: vi.fn(),
  }),
}));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

describe("Clients Profile", () => {
  it("renders without crashing", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    await flushAsyncUpdates();
    expect(document.body).toBeTruthy();
  });
});
