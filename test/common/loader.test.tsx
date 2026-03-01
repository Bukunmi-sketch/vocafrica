import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loader from "@/common/loader";
import SweetLoader from "@/common/loader/SweetLoader";
import FASpinner from "@/common/loader/FASpinner";

describe("Loader (default from loader/index)", () => {
  it("renders without crashing", () => {
    const { container } = render(<Loader />);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });
});

describe("SweetLoader", () => {
  it("renders loading modal", () => {
    const { container } = render(<SweetLoader />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("FASpinner", () => {
  it("renders spinner", () => {
    const { container } = render(<FASpinner />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
