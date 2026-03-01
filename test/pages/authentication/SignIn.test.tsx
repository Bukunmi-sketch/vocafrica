import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import SignIn from "@/pages/authentication/SignIn";

const mockNavigate = vi.fn();
const mockGoogleSignin = vi.fn();
const mockExecuteRecaptcha = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    googleSignin: mockGoogleSignin,
    authLoading: { signIn: false, forgotPassword: false },
  }),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/config/env", () => ({ GOOGLE_CLIENT_ID: "test-id", API_BASE_URL: "https://api.test" }));
vi.mock("@/common/loader/SweetLoader", () => ({ default: () => null }));
vi.mock("@/hooks/useApi", () => ({ default: { get: vi.fn(), post: vi.fn() } }));
vi.mock("@/hooks/deviceId", () => ({ getDeviceId: () => "test-device-id" }));
vi.mock("@/common/toast/ShowToast", () => ({ ShowToast: () => null }));
vi.mock("react-google-recaptcha-v3", () => ({
  useGoogleReCaptcha: () => ({ executeRecaptcha: mockExecuteRecaptcha }),
}));

vi.mock("@/pages/admin/components/SignupDropDown", () => ({
  default: () => <div data-testid="signup-dropdown">SignupDropdown</div>,
}));

vi.mock("@react-oauth/google", () => ({
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useGoogleLogin: () => vi.fn(),
}));

describe("SignIn", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders sign in form", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("renders link to forgot password", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    const forgotLink = screen.getByRole("link", { name: /forgot password/i });
    expect(forgotLink).toHaveAttribute("href", "/auth/forgot-password");
  });

  it("renders Sign in with Google button", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /sign in with google/i })).toBeInTheDocument();
  });
});
