import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import EPrescription from "@/pages/admin/e-prescription";
import { flushAsyncUpdates } from "@test/testUtils";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    token: "mock-token",
    userDetails: { organization_id: "org-1" },
  }),
}));
vi.mock("@/hooks/useApi", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { data: [] } }),
    post: vi.fn().mockResolvedValue({}),
  },
}));
vi.mock("react-hot-toast", () => ({ default: { success: vi.fn(), error: vi.fn() } }));
vi.mock("@/common/loader/SweetLoader", () => ({
  default: () => null,
}));
vi.mock("@/pages/admin/e-prescription/prescriptionComposer", () => ({
  default: () => <div data-testid="prescription-composer">Composer</div>,
}));
vi.mock("@/pages/admin/e-prescription/view", () => ({
  PrescriptionViewModal: () => null,
}));

describe("Admin E-Prescription Page", () => {
  it("renders without crashing", async () => {
    render(<EPrescription />);
    await flushAsyncUpdates();
    expect(document.body).toBeTruthy();
  });
});
