import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TelepracticeBookingSystem from "@/pages/admin/public-booking";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    userDetails: { organization_id: "org-123" },
  }),
}));
vi.mock("@/hooks/useApi", () => ({
  default: {
    get: vi.fn().mockResolvedValue({
      data: {
        data: {
          is_public_booking_enabled: false,
          require_insurance: false,
        },
      },
    }),
    put: vi.fn().mockResolvedValue({}),
    patch: vi.fn().mockResolvedValue({}),
  },
}));
vi.mock("react-hot-toast", () => ({ default: { success: vi.fn(), error: vi.fn() } }));

function renderPublicBooking() {
  return render(
    <MemoryRouter>
      <TelepracticeBookingSystem />
    </MemoryRouter>
  );
}

describe("Admin Public Booking (TelepracticeBookingSystem)", () => {
  it("renders without crashing", async () => {
    renderPublicBooking();
    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });

  it("shows loading then Book Now Link tab", async () => {
    renderPublicBooking();
    expect(screen.getByText(/Loading integration settings/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/Book Now Link/i)).toBeInTheDocument();
    });
  });

  it("shows integration options after load", async () => {
    renderPublicBooking();
    await waitFor(() => {
      const iframe = screen.getAllByText(/Embedded iFrame/i);
      const widget = screen.getAllByText(/JavaScript Widget/i);
      expect(iframe.length).toBeGreaterThan(0);
      expect(widget.length).toBeGreaterThan(0);
      expect(iframe[0]).toBeInTheDocument();
      expect(widget[0]).toBeInTheDocument();
    });
  });
});
