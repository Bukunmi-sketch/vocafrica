import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PatientInfo from "@/pages/admin/PatientInfoPage";

vi.mock("@/pages/admin/patient/PatientForm", () => ({
  PatientForm: () => <div data-testid="patient-form">PatientForm</div>,
}));

describe("Admin patient-info", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <PatientInfo />
      </MemoryRouter>
    );
    expect(document.body).toBeTruthy();
  });
});
