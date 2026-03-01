import { describe, it, expect } from "vitest";
import { monthNames } from "@/hooks/months";

describe("months", () => {
  it("exports 12 month names", () => {
    expect(monthNames).toHaveLength(12);
  });

  it("first month is Jan", () => {
    expect(monthNames[0]).toBe("Jan");
  });

  it("last month is Dec", () => {
    expect(monthNames[11]).toBe("Dec");
  });

  it("all entries are non-empty strings", () => {
    monthNames.forEach((m) => {
      expect(typeof m).toBe("string");
      expect(m.length).toBeGreaterThan(0);
    });
  });
});
