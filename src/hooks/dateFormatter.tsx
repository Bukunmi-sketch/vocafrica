export const formatDate = (isoString: string | null | undefined) => {
  if (!isoString) return "Invalid date";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "Unknown";

  return date.toLocaleString("en-US", {
    weekday: "long",     // e.g., "Thursday"
    year: "numeric",
    month: "long",       // e.g., "March"
    day: "numeric",
    hour12: true,
  });
};


  

  export const formatTime = (h: number, m: number) => {
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };