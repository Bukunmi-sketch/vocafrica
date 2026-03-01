import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateAdminAppointment from "@/pages/admin/CreateAdminAppointment";

vi.mock("@/pages/admin/appointments/AppointmentForm", () => ({
  default: () => <div data-testid="appointment-form">AppointmentForm</div>,
}));

describe("Admin CreateAdminAppointment", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CreateAdminAppointment />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
