import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { updateOnboardingStatus } from "@/pages/utils/onboarding";

vi.mock("axios");
vi.mock("@/config/env", () => ({
  API_BASE_URL: "https://api.test.com",
}));

describe("onboarding utils", () => {
  beforeEach(() => {
    vi.mocked(axios.put).mockClear();
    vi.mocked(axios.put).mockResolvedValue({ data: {} });
  });

  it("calls PUT with correct URL and payload", async () => {
    await updateOnboardingStatus(
      {
        organizationId: "org-1",
        isCompleted: true,
      },
      "token-123"
    );

    expect(axios.put).toHaveBeenCalledWith(
      "https://api.test.com/api/organization/onboarding",
      expect.objectContaining({
        onboarding: expect.objectContaining({
          organizationId: "org-1",
          isCompleted: true,
          isAccountCreated: true,
        }),
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token-123",
        },
      }
    );
  });

  it("merges payload with defaults", async () => {
    await updateOnboardingStatus(
      {
        organizationId: "org-2",
        isPaymentMethodCompleted: true,
      },
      "token-456"
    );

    expect(axios.put).toHaveBeenCalledTimes(1);
    const call = vi.mocked(axios.put).mock.calls[0];
    const body = call[1] as { onboarding: Record<string, unknown> };
    expect(body.onboarding).toBeDefined();
    expect(body.onboarding.organizationId).toBe("org-2");
    expect(body.onboarding.isPaymentMethodCompleted).toBe(true);
  });
});
