import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardClient from "@/pages/client/Dashboard";

vi.mock("@/pages/client/components/Middle", () => ({
  default: () => <div data-testid="middle">Middle</div>,
}));

beforeEach(() => {
  Object.defineProperty(global.navigator, "geolocation", {
    value: { getCurrentPosition: vi.fn((cb) => cb?.({ coords: { latitude: 0, longitude: 0 } })) },
    configurable: true,
  });
});

describe("Clients Dashboard", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <DashboardClient />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
