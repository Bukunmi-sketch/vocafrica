import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Calendar from "@/pages/client/Calendar";

describe("Clients Calendar", () => {
  it("renders without crashing", () => {
    render(<Calendar />);
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("New Event")).toBeInTheDocument();
  });

  it("renders calendar grid with weekdays", () => {
    render(<Calendar />);
    expect(screen.getByText("Sun")).toBeInTheDocument();
    expect(screen.getByText("Mon")).toBeInTheDocument();
    expect(screen.getByText("Sat")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<Calendar />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });
});
