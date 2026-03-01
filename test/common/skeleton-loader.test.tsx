import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WorkingHoursSkeleton from "@/common/skeleton-loader/WorkingHoursSkeleton";

describe("WorkingHoursSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<WorkingHoursSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("contains animate-pulse for loading state", () => {
    const { container } = render(<WorkingHoursSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});
