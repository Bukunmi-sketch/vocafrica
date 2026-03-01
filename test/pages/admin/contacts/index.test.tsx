import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactnReferral from "@/pages/admin/contacts";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({ authLoading: false, userDetails: {}, token: "mock" }),
}));
vi.mock("@/pages/admin/components/sidebar", () => ({
  default: () => <div data-testid="sidebar-admin">Sidebar</div>,
}));
vi.mock("@/pages/admin/components/header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));
vi.mock("@/pages/admin/components/trigger", () => ({
  default: () => <div data-testid="trigger">Trigger</div>,
}));
vi.mock("@/pages/admin/contacts/Contacts", () => ({
  default: () => <div data-testid="contacts-tab">Contacts</div>,
}));
vi.mock("@/pages/admin/contacts/Referral", () => ({
  default: () => <div data-testid="referrals-tab">Referrals</div>,
}));

describe("Admin Contacts & Referrals Page", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <ContactnReferral />
      </MemoryRouter>
    );
    expect(screen.getByTestId("sidebar-admin")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("shows Contacts tab content by default", () => {
    render(
      <MemoryRouter>
        <ContactnReferral />
      </MemoryRouter>
    );
    const contactsTab = screen.getAllByTestId("contacts-tab");
    expect(contactsTab.length).toBeGreaterThan(0);
    expect(contactsTab[0]).toBeInTheDocument();
    const contactsBtns = screen.getAllByRole("button", { name: /Contacts/i });
    const referralsBtns = screen.getAllByRole("button", { name: /Referrals/i });
    expect(contactsBtns.length).toBeGreaterThan(0);
    expect(referralsBtns.length).toBeGreaterThan(0);
    expect(contactsBtns[0]).toBeInTheDocument();
    expect(referralsBtns[0]).toBeInTheDocument();
  });

  it("shows Referrals tab when tab=Referrals in URL", () => {
    render(
      <MemoryRouter initialEntries={["/?tab=Referrals"]}>
        <ContactnReferral />
      </MemoryRouter>
    );
    const refs = screen.getAllByTestId("referrals-tab");
    expect(refs.length).toBeGreaterThan(0);
    expect(refs[0]).toBeInTheDocument();
  });
});
