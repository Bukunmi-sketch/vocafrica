import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import PlanCard from "@/pages/authentication/PlanCard";

const defaultProps = {
  title: "Basic Plan",
  description: "For individuals",
  monthlyPrice: "$10",
  annualPrice: "$100",
  buttonText: "Select",
  selectedPlan: null,
  onSelect: () => {},
};

describe("PlanCard", () => {
  it("renders without crashing", () => {
    render(<PlanCard {...defaultProps} />);
    expect(screen.getByText("Basic Plan")).toBeInTheDocument();
    expect(screen.getByText("For individuals")).toBeInTheDocument();
  });

  it("renders Monthly and Annual toggle when both prices provided", () => {
    render(<PlanCard {...defaultProps} />);
    const monthly = screen.getAllByRole("button", { name: /monthly/i });
    const annual = screen.getAllByRole("button", { name: /annual/i });
    expect(monthly.length).toBeGreaterThan(0);
    expect(annual.length).toBeGreaterThan(0);
    expect(monthly[0]).toBeInTheDocument();
    expect(annual[0]).toBeInTheDocument();
  });

  it("calls onSelect when Select button is clicked", () => {
    const onSelect = vi.fn();
    const { container } = render(<PlanCard {...defaultProps} onSelect={onSelect} />);
    const selectBtn = within(container).getByRole("button", { name: /select/i });
    fireEvent.click(selectBtn);
    expect(onSelect).toHaveBeenCalled();
  });
});
