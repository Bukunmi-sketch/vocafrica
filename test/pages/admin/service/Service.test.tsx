import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Service from "@/pages/admin/Service";

vi.mock("@/pages/admin/components/ServiceList", () => ({
  default: () => <div data-testid="service-list">ServiceList</div>,
}));

describe("Admin Service", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Service />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
