import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateAppointment from "@/pages/client/CreateAppointment";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ authLoading: false, userDetails: {}, token: "mock" }),
}));
vi.mock("@/pages/client/components/AppointmentForm", () => ({
  default: () => <div data-testid="appointment-form">AppointmentForm</div>,
}));

describe("Clients CreateAppointment", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <CreateAppointment />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
