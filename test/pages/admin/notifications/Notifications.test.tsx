import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Notifications from "@/pages/admin/Notifications";

vi.mock("@/pages/admin/notifications/NotificationPage", () => ({
  default: () => <div data-testid="notification-page">NotificationPage</div>,
}));

describe("Admin Notifications", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Notifications />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
