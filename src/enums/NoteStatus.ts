/* eslint-disable no-unused-vars -- enum members are used via NoteStatus.* elsewhere */
export enum NoteStatus {
  Draft = "draft",
  SubmitForSignature = "submit_for_signature",
  Submitted = "submitted",
  RequestChange = "request_change",
  Signed = "signed",
  Unlocked = "unlocked",
}

export const NoteList = [
  NoteStatus.Draft,
  NoteStatus.SubmitForSignature,
  NoteStatus.Submitted,
  NoteStatus.RequestChange,
  NoteStatus.Signed,
  NoteStatus.Unlocked,
] as const;
