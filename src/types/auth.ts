import { TeamMember } from './team-member';

export interface OrganizationBranding {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  logo_url: string;
  favicon_url: string;
  font_family: string;
  dark_mode_enabled: boolean;
  custom_css: string;
}
export interface ActiveAddon {
  addon_name: string;
  subscription_addon_id: string;
}

export interface Organization {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  status?: boolean;
  organization_branding?: OrganizationBranding;
  active_addons?: ActiveAddon[];

  [key: string]: any;
}

export interface Client {
  client_id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  [key: string]: any;
}
export interface SubscriptionAddonPlan {
  subscription_addon_plan_id: string;
  name: string;
  description: string;
  monthly_cost: string;
  annual_cost: string;
  created_at: string; // ISO date string
  last_update_at: string | null;
  currency: string;
}

export interface User {
  phoneNumber: string;
  first_name: string;
  last_name: string;
  subscription_name: string;
  provider_team_member_id: string;
  middle_name: string;
  title: string;
  email: string;
  organization_id: string;
  preferred_name?: string;
  provider_user_id: string;
  role: string;
  user_id: string;
  client_id: string;

  is_google_user: boolean;
  gender: string;
  picture: string;
  team_member_id: string;
  organization?: Organization;
  client?: Client;
  teamMember: TeamMember;
  addons?: SubscriptionAddonPlan[];
  assistant_session_id?: string;
  is_biller: boolean;
  is_supervisor: boolean;
  is_provider_administrator: boolean;
  is_provider: boolean;
  is_scheduler: boolean;
  is_administrator: boolean;
  is_organization_onboarding_completed: boolean;
  is_onboarding_completed: string | boolean;
  is_payment_method_completed: boolean;
  is_account_created: boolean;
  is_work_hours_set: boolean;
  is_verified: boolean;
  is_verification_done: boolean;
  staff_count: string;
  organization_logo_path: string;
  timezone: string;
  subscription_plan: string;
}

export const normalizeUser = (user: Partial<User>): User => {
  return {
    phoneNumber: user.phoneNumber ?? '',
    first_name: user.first_name ?? '',
    last_name: user.last_name ?? '',
    provider_team_member_id: user.provider_team_member_id ?? '',
    middle_name: user.middle_name ?? '',
    subscription_name: user.subscription_name ?? '',
    title: user.title ?? '',
    email: user.email ?? '',
    organization_id: user.organization_id ?? '',
    preferred_name: user.preferred_name ?? '',
    provider_user_id: user.provider_user_id ?? '',
    role: user.role ?? '',
    user_id: user.user_id ?? '',
    client_id: user.client_id ?? '',
    is_google_user: user.is_google_user ?? false,
    gender: user.gender ?? '',
    picture: user.picture ?? '',
    team_member_id: user.team_member_id ?? '',
    organization: user.organization ?? undefined,
    addons: user.addons ?? undefined,
    client: user.client ?? undefined,
    teamMember: user.teamMember ?? ({} as any),
    assistant_session_id: user.assistant_session_id ?? '',
    is_biller: user.is_biller ?? false,
    is_supervisor: user.is_supervisor ?? false,
    is_provider_administrator: user.is_provider_administrator ?? false,
    is_provider: user.is_provider ?? false,
    is_scheduler: user.is_scheduler ?? false,
    is_administrator: user.is_administrator ?? false,
    is_organization_onboarding_completed: user.is_organization_onboarding_completed ?? false,
    is_onboarding_completed: user.is_onboarding_completed ?? '',
    is_payment_method_completed: user.is_payment_method_completed ?? false,
    is_account_created: user.is_account_created ?? false,
    is_work_hours_set: user.is_work_hours_set ?? false,
    is_verified: user.is_verified ?? false,
    is_verification_done: user.is_verification_done ?? false,
    staff_count: user.staff_count ?? '0',
    organization_logo_path: user.organization_logo_path ?? '',
    timezone: user.timezone ?? '',
    subscription_plan: user.subscription_plan ?? '',
  };
};


