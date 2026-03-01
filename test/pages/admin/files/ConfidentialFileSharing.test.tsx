import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ConfidentialFileSharing from "@/pages/admin/files/ConfidentialFileSharing";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    token: "mock-token",
    userDetails: { user_id: "user-1" },
  }),
}));
vi.mock("axios", () => ({
  default: { get: vi.fn().mockResolvedValue({ data: { data: [] } }) },
}));
vi.mock("@/common/loader", () => ({
  default: () => <div data-testid="loader">Loading</div>,
}));
vi.mock("@/pages/admin/files/ConfidentialShare", () => ({
  default: () => <div data-testid="confidential-share">ConfidentialShare</div>,
}));
vi.mock("@/pages/admin/files/ShareFiles", () => ({
  default: () => <div data-testid="share-files">ShareFiles</div>,
}));
vi.mock("@/pages/admin/files/PdfGrid", () => ({
  default: () => <div data-testid="pdf-grid">PdfGrid</div>,
}));

describe("Admin ConfidentialFileSharing", () => {
  it("renders without crashing", () => {
    render(<ConfidentialFileSharing userId="user-123" />);
    expect(document.body).toBeTruthy();
  });

  it("renders initial step content", () => {
    render(<ConfidentialFileSharing userId="user-123" />);
    const elements = screen.getAllByTestId("confidential-share");
    expect(elements.length).toBeGreaterThan(0);
    expect(elements[0]).toBeInTheDocument();
  });
});
