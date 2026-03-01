import { DateTime } from "luxon";


export function formatUtcToLocal(
  utcValue?: string | null,
  format: string = "ff" // Luxon default full format
): string {
  if (!utcValue) return "";

  let dt: DateTime;

  // Case 1: SQL timestamp without timezone (current state)
  if (utcValue.includes(" ")) {
    dt = DateTime.fromSQL(utcValue, { zone: "utc" });
  }
  // Case 2: ISO timestamp with Z or offset (future-proof)
  else {
    dt = DateTime.fromISO(utcValue, { zone: "utc" });
  }

  if (!dt.isValid) return "";

  return dt
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .toFormat(format);
}
