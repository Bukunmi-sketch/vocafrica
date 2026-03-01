import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorState } from "@/common/ErrorState";

describe("ErrorState", () => {
  it("renders default message and subMessage", () => {
    render(<ErrorState />);
    expect(
      screen.getByText("Oops! Unable to fetch your appointment data.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Please check your connection or try again.")
    ).toBeInTheDocument();
  });

  it("renders custom message and subMessage", () => {
    render(
      <ErrorState
        message="Custom error"
        subMessage="Try again later."
      />
    );
    expect(screen.getByText("Custom error")).toBeInTheDocument();
    expect(screen.getByText("Try again later.")).toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);
    const button = screen.getByRole("button", { name: "Refresh" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("shows Refreshing when isRetrying is true", () => {
    render(<ErrorState onRetry={() => {}} isRetrying />);
    expect(screen.getByRole("button", { name: "Refreshing..." })).toBeInTheDocument();
  });

  it("disables button when isRetrying", () => {
    const { container } = render(<ErrorState onRetry={() => {}} isRetrying />);
    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button).toBeDisabled();
  });
});
