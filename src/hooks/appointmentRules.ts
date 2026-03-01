import { isBefore, parseISO } from "date-fns";

export function canEditAppointment(appointment: any) {
  if (!appointment?.startDate || !appointment?.time) return false;

  // combine date + time to get the full datetime
  const appointmentDateTime = new Date(`${appointment.startDate}T${appointment.time}`);
  const startUtc = parseISO(appointment.startDate);
  const isPastUTC = isBefore(startUtc, new Date());
  const isPast = appointmentDateTime < new Date();

  const editableStatuses = ["Pending Approval", "Approved"];

  return !isPast && !isPastUTC && editableStatuses.includes(appointment.appointmentStatus);
}