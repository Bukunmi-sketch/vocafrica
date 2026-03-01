import { DateTime } from "luxon";

export const getBrowserTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getUserTimezone = (userTz?: string): string => {
  return userTz || Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const utcToUserTime = (utcString: string, userTz?: string): string => {
  const tz = getUserTimezone(userTz);
  return DateTime.fromISO(utcString, { zone: "utc" })
    .setZone(tz)
    .toFormat("yyyy-MM-dd HH:mm");
};

export const userTimeToUtc = (localString: string, userTz?: string): string => {
  const tz = getUserTimezone(userTz);
  return (
    DateTime.fromFormat(localString, "yyyy-MM-dd HH:mm", { zone: tz })
      .setZone("utc")
      .toISO() || ""
  );
};

export const orgTimeToUTC = (time: string, orgTZ: string): string => {
  return DateTime.fromFormat(time, "HH:mm", { zone: orgTZ })
    .toUTC()
    .toFormat("HH:mm:ss");
};

export const utcToOrgTime = (utcTime: string, orgTZ: string): string => {
  const timeOnly = utcTime.slice(0, 8); // "09:00:00"
  return DateTime.fromFormat(timeOnly, "HH:mm:ss", { zone: "utc" })
    .setZone(orgTZ)
    .toFormat("hh:mm a"); // 12-hour format with AM/PM
};

export const utcToOrgDateTime = (utcISO: string, orgTZ: string): string => {
  return DateTime.fromISO(utcISO, { zone: "utc" })
    .setZone(orgTZ)
    .toFormat("HH:mm");
};

// Convert HH:mm from local timezone to UTC (exported for use elsewhere)
export function localToUTC(timeString: string): string {
  const [hours, minutes] = timeString.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toISOString().slice(11, 19); // returns "HH:mm:ss" in UTC
}

export const utcToDate = (utcIsoString: string, orgTZ: string): string => {
  const result = DateTime.fromISO(utcIsoString, { zone: "utc" })
    .setZone(orgTZ)
    .toISO();

  if (!result) {
    throw new Error(`Invalid date conversion: ${utcIsoString}`);
  }

  return result;
};

export const convertDateToUTC = (
  input: string | Date | number,
  inputZone?: string,
): string => {
  let dt: DateTime;

  if (input instanceof Date) {
    dt = DateTime.fromJSDate(input);
  } else if (typeof input === "number") {
    dt = DateTime.fromMillis(input);
  } else {
    // Try ISO first
    dt = DateTime.fromISO(input, inputZone ? { zone: inputZone } : {});

    // Fallback: SQL format (e.g. "2025-12-09 14:00:00")
    if (!dt.isValid) {
      dt = DateTime.fromSQL(input, inputZone ? { zone: inputZone } : {});
    }
  }

  if (!dt.isValid) {
    throw new Error(`Invalid date input: ${input}`);
  }

  return dt.toUTC().toISO()!;
};

export function utcToLocalISODate(dateStr: string) {
  const isoLike = dateStr.replace(" ", "T");
  const date = new Date(isoLike + "Z");
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDateOnly(dateStr: string) {
  const [date] = dateStr.split(" ");
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d);
}
