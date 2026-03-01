import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import EmptyState from "@/common/EmptyState";

describe("EmptyState", () => {
  it("renders default title", () => {
    render(<EmptyState />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(
      <EmptyState title="No data" description="There is nothing to show." />
    );
    expect(screen.getByText("No data")).toBeInTheDocument();
    expect(screen.getByText("There is nothing to show.")).toBeInTheDocument();
  });

  it("renders action button when actionLabel and onAction are provided", () => {
    const onAction = vi.fn();
    render(
      <EmptyState actionLabel="Add item" onAction={onAction} />
    );
    const button = screen.getByRole("button", { name: "Add item" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("does not render button when onAction is missing", () => {
    render(<EmptyState actionLabel="Add" />);
    const addButtons = screen.queryAllByRole("button", { name: "Add" });
    expect(addButtons).toHaveLength(0);
  });

  it("renders img with default alt", () => {
    render(<EmptyState />);
    const imgs = screen.getAllByRole("img", { name: "Empty" });
    expect(imgs.length).toBeGreaterThan(0);
    expect(imgs[0]).toBeInTheDocument();
    expect(imgs[0]).toHaveAttribute("src", "/images/icon/empty.png");
  });
});
