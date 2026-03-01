/* eslint-disable no-unused-vars */
export enum ReferralStatus {
    Sent = "Sent",
    ViewedByPatient = "ViewedByPatient",
    PatientReportedScheduled = "PatientReportedScheduled",
    PatientReportedUnableToReach = "PatientReportedUnableToReach",
    NotInterested = "NotInterested",
    Closed = "Closed",
  }


  export enum ReferralMode {
    PatientToContact = "patient-to-contact",
    ContactToPatient = "contact-to-patient",
    Both = "both",
  }
