/* eslint-disable no-unused-vars -- enum members are used via AppointmentStatus.* elsewhere */
export enum AppointmentStatus {
  Approved = "Approved",
  Rejected = "Rejected",
  Cancelled = "Cancelled",
  Completed = "Completed",
  NoShow = "No-Show",
  PendingApproval = "Pending Approval",
}

export const AppointmentStatusList = [
  AppointmentStatus.Approved,
  AppointmentStatus.Completed,
  AppointmentStatus.Rejected,
  AppointmentStatus.Cancelled,
  AppointmentStatus.PendingApproval,
  AppointmentStatus.NoShow,
] as const;
