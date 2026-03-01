import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingTable from "@/pages/authentication/Pricing";

vi.mock("@/pages/authentication/PlanSelection", () => ({
  default: () => <div data-testid="plan-selection">PlanSelection</div>,
}));

describe("Pricing (PricingTable)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<PricingTable />);
    expect(screen.getByTestId("plan-selection")).toBeInTheDocument();
  });
});
