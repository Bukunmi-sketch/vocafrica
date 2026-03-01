import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

describe("PrivacyPolicy", () => {
  it("renders without crashing", () => {
    render(<PrivacyPolicy />);
    const h1 = screen.getAllByRole("heading", { name: /privacy policy/i, level: 1 });
    expect(h1.length).toBeGreaterThan(0);
    expect(h1[0]).toBeInTheDocument();
  });

  it("renders Information We Collect section", () => {
    render(<PrivacyPolicy />);
    const headings = screen.getAllByRole("heading", { name: /information we collect/i });
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0]).toBeInTheDocument();
    const texts = screen.getAllByText(/we collect information that you provide directly/i);
    expect(texts.length).toBeGreaterThan(0);
    expect(texts[0]).toBeInTheDocument();
  });

  it("renders How We Use Your Information section", () => {
    render(<PrivacyPolicy />);
    const headings = screen.getAllByRole("heading", { name: /how we use your information/i });
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0]).toBeInTheDocument();
  });

  it("renders Data Security section", () => {
    render(<PrivacyPolicy />);
    const headings = screen.getAllByRole("heading", { name: /data security/i });
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0]).toBeInTheDocument();
  });

  it("renders Your Rights section with Access, Rectification, Erasure, Portability", () => {
    render(<PrivacyPolicy />);
    const headings = screen.getAllByRole("heading", { name: /your rights/i });
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0]).toBeInTheDocument();
    expect(screen.getAllByText("Access")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Rectification")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Erasure")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Portability")[0]).toBeInTheDocument();
  });

  it("renders Contact Us section with email link", () => {
    render(<PrivacyPolicy />);
    const headings = screen.getAllByRole("heading", { name: /contact us/i });
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0]).toBeInTheDocument();
    const emailLinks = screen.getAllByRole("link", { name: /privacy@example\.com/i });
    expect(emailLinks.length).toBeGreaterThan(0);
    expect(emailLinks[0]).toHaveAttribute("href", "mailto:privacy@example.com");
  });
});
