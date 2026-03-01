export type Address = {
  street1?: string
  street2?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  street?:string
}

export type TeamMember = {
  team_member_id: string
  title: string
  first_name: string
  last_name: string
  email?: string
  middle_name? :string
  gender?:string
  mobilePhone? :string
  address?: Address
  mobile_phone:string
  teamMemberId: number;
  firstName: string;
  lastName: string;
  is_provider: boolean;
}


export interface TeamMemberProfileTypes {
  team_id: string;
  first_name: string;
  last_name: string;
  gender: string;
  title: string;
  preferred_name: string;
  status: boolean;
  created_at: string;
  email: string;
  phone_number: string;
  total_sessions: string;
}