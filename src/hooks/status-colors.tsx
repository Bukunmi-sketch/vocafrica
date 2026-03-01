export const getStatusColor = (status: string): { bg: string; text: string; bgLight: string; textDark: string } => {
  const statusMap: Record<string, { bg: string; text: string; bgLight: string; textDark: string }> = {
    "Pending Approval": {
      bg: "#f59e0b", // Amber
      text: "#ffffff",
      bgLight: "#fef3c7",
      textDark: "#92400e",
    },
    Approved: {
      bg: "#10b981", // Emerald
      text: "#ffffff",
      bgLight: "#d1fae5",
      textDark: "#065f46",
    },
    Rejected: {
      bg: "#ef4444", // Red
      text: "#ffffff",
      bgLight: "#fee2e2",
      textDark: "#7f1d1d",
    },
    Cancelled: {
      bg: "#f97316", // Orange
      text: "#ffffff",
      bgLight: "#ffedd5",
      textDark: "#7c2d12",
    },
    Completed: {
      bg: "#6366f1", // Indigo
      text: "#ffffff",
      bgLight: "#e0e7ff",
      textDark: "#312e81",
    },
    "No-Show": {
      bg: "#6b7280", // Gray
      text: "#ffffff",
      bgLight: "#f3f4f6",
      textDark: "#1f2937",
    },
  }

  return statusMap[status] || statusMap["Pending Approval"]
}
