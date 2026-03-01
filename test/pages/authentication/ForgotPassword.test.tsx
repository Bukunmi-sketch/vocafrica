import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ForgotPassword from "@/pages/authentication/ForgotPassword";

const mockNavigate = vi.fn();
const mockForgotPassword = vi.fn();
const mockExecuteRecaptcha = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    authLoading: { forgotPassword: false },
    forgotPassword: mockForgotPassword,
  }),
}));

vi.mock("react-hot-toast", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock("@/config/env", () => ({ API_BASE_URL: "https://api.test" }));
vi.mock("@/common/loader/SweetLoader", () => ({ default: () => null }));
vi.mock("react-google-recaptcha-v3", () => ({
  useGoogleReCaptcha: () => ({ executeRecaptcha: mockExecuteRecaptcha }),
}));

describe("ForgotPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockExecuteRecaptcha.mockResolvedValue("mock-recaptcha-token");
  });

  it("renders forgot password form", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset password/i })).toBeInTheDocument();
  });

  it("renders link back to sign in", () => {
    render(
      <MemoryRouter>
        <ForgotPassword />
      </MemoryRouter>
    );
    const backLinks = screen.getAllByRole("link", { name: /back to sign in/i });
    expect(backLinks.length).toBeGreaterThan(0);
    expect(backLinks[0]).toHaveAttribute("href", "/auth/signin");
  });
});
