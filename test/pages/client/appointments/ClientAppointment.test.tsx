import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ClientAppointment from "@/pages/client/ClientAppointment";

describe("Clients ClientAppointment", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <ClientAppointment />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });

  it("renders children when provided", () => {
    render(
      <MemoryRouter>
        <ClientAppointment>
          <span data-testid="child">Child content</span>
        </ClientAppointment>
      </MemoryRouter>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Child content");
  });
});
