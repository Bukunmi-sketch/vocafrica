import { describe, it, expect } from "vitest";
import { generateTimeOptions } from "@/pages/utils/generateTimeOptions";

describe("generateTimeOptions", () => {
  it("returns an array of time options", () => {
    const result = generateTimeOptions();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("each option has value and display", () => {
    const result = generateTimeOptions();
    result.forEach((opt) => {
      expect(opt).toHaveProperty("value");
      expect(opt).toHaveProperty("display");
      expect(typeof opt.value).toBe("string");
      expect(typeof opt.display).toBe("string");
    });
  });

  it("value is in HH:mm format (24h)", () => {
    const result = generateTimeOptions();
    const first = result[0];
    expect(first.value).toMatch(/^\d{2}:\d{2}$/);
  });

  it("includes 00:00 and 23:30", () => {
    const result = generateTimeOptions();
    const values = result.map((o) => o.value);
    expect(values).toContain("00:00");
    expect(values).toContain("23:30");
  });

  it("has 48 entries (24 hours * 2 half-hours)", () => {
    const result = generateTimeOptions();
    expect(result).toHaveLength(48);
  });
});
