import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ServiceCardPage from "@/pages/admin/ServiceCardPage";
import { flushAsyncUpdates } from "@test/testUtils";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ token: "mock-token", userDetails: {}, authLoading: {} }),
}));
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => vi.fn() };
});

const mockService = {
  name: "Test Service",
  description: "Test description",
  amount: 50,
  status: true,
  service_id: "test-123",
  duration: "60 min",
};

beforeEach(() => {
  global.fetch = vi.fn((url: string) =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: mockService }),
    } as Response)
  ) as typeof fetch;
});

describe("Admin ServiceCardPage", () => {
  it("renders without crashing", async () => {
    render(
      <MemoryRouter initialEntries={["/admin/service/test-123"]}>
        <Routes>
          <Route path="/admin/service/:serviceId" element={<ServiceCardPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Test Service/i)).toBeInTheDocument();
    });
    expect(document.body).toBeTruthy();
  });
});
