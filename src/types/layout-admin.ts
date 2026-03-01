import { ReactNode } from "react";

export type DefaultLayoutAdminProps = {
  children: ReactNode;
  Heading?: string;
  text?: string;
  Headingb?:string;
  orgName?: string;
  orgProfilePic?: string;
  setOrgData?: (data: { name: string; profilePic: string }) => void; // Make it optional
  setPersonalData?: (data: { name: string; profilePic: string }) => void;
  personalProfilePic? :string;
  personalName? :string;
  logoUrl?:string;
}