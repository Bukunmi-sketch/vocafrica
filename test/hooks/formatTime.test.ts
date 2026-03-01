import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { formatTime } from "@/hooks/formatTime";

describe("formatTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Just now" for dates less than 1 minute ago', () => {
    const date = new Date("2025-01-15T11:59:30Z").toISOString();
    expect(formatTime(date)).toBe("Just now");
  });

  it('returns "Xm ago" for dates less than 60 minutes ago', () => {
    const date = new Date("2025-01-15T11:30:00Z").toISOString();
    expect(formatTime(date)).toMatch(/\d+m ago/);
  });

  it('returns "Xh ago" for dates less than 24 hours ago', () => {
    const date = new Date("2025-01-15T10:00:00Z").toISOString();
    expect(formatTime(date)).toMatch(/\d+h ago/);
  });

  it("returns formatted date string for older dates", () => {
    const date = new Date("2025-01-10T09:00:00Z").toISOString();
    const result = formatTime(date);
    expect(result).toBeTruthy();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });
});
