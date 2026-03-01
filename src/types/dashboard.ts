interface Appointment {
  appointment_id: string;
  appointment_mode: string;
  client_id: string;
  client_name: string;
  created_at: string;
  end_date: string;
  location: string;
  recurrent_rule: string;
  service: string;
  start_date: string;
  team_member_picture: string;
  status: string;
  team_member_id: string;
  is_completed: boolean;
  appointment_status: string;
  team_member_name: string;
  duration: string;
  time: string;
}

interface Summary {
  total_appointments: number;
  total_notes: number;
  total_sessions: number;
}

interface Note {
  created_at: string;
  description: string;
  note_id: string;
provider_name: string;
  title: string;
}

interface AppointmentData {
  latest_notes: Note[];
  past_appointments: Appointment[];
  upcoming_appointments: Appointment[];
  summary: Summary;
}
export type { AppointmentData, Appointment, Summary, Note };



export interface SummaryData {
  total_clients: number;
  total_team_members: number;
  total_services: number;
  total_sessions: number;
  total_notes: number;
  total_appointments: number;
}

export interface PaymentEntry {
  month: number;
  amount: number;
  total_amount: number;
}

export interface AppointmentEntry {
  month: number;
  completed_appointments: number;
  scheduled_appointments: number;
}

export interface MetricsData {
  summary: SummaryData;
  monthly_stats: {
    payments: PaymentEntry[];
    appointments: AppointmentEntry[];
  };
}

//biller
export interface BillerDashboardData {
  top_tiles: {
    claims_submitted: number;
    claims_approved: number;
    payments_received: number;
    denials: number;
  };
  monthly_payment_trend: Array<{
    month_start: string;
    month_name: string;
    payments_received: number;
    payments_denied: number;
    completed_count: number;
    denied_count: number;
  }>;
  payer_performance: any[] | null;
}

export interface BillerTopTiles {
  claims_submitted: number;
  claims_approved: number;
  payments_received: number;
  denials: number;
}

//provider
export interface ProviderTopTiles {
  my_patients: number;
  upcoming_appointments: number;
  completed_sessions: number;
  pending_notes: number;
}

export interface ProviderSessionCount {
  session_type: string;
  count: number;
}

export interface ProviderTopClient {
  client_name?: string;
  client_id?: string;
  session_count: number;
}

export interface ProviderDashboardData {
  top_tiles: ProviderTopTiles;
  session_count_chart: ProviderSessionCount[];
  top_clients_by_sessions: ProviderTopClient[] | null;
}



//provider Admin

export interface ProviderAdminDashboardData {
  top_tiles: {
    active_providers: number;
    active_clients: number;
    total_sessions_this_month: number;
    outstanding_payments: number;
  };
  monthly_revenue_trends: Array<{
    month_name: string;
    revenue: number;
  }>;
  appointment_completion_by_provider: Array<{
    provider_name: string;
    total_appointments: number;
    completed_appointments: number;
    completion_rate: number;
  }>;
}


export interface ProviderAdminTopTiles {
  active_providers: number;
  active_clients: number;
  total_sessions_this_month: number;
  outstanding_payments: number;
}


//scheduler
export interface SchedulerDashboardData {
  top_tiles: {
    total_appointments: number;
    upcoming_appointments: number;
    cancellations: number;
    no_show: number;
  };
  daily_appointment_load: Array<{
    appointment_date: string;
    day_of_week: string;
    appointment_count: number;
    completed_count: number;
    cancelled_count: number;
    no_show_count: number;
  }>;
  weekly_appointment_load: Array<{
    week_start: string;
    week_name: string;
    appointment_count: number;
    completed_count: number;
    cancelled_count: number;
  }>;
  provider_availability_summary: Array<{
    provider_name: string;
    scheduled_appointments: number;
    upcoming_appointments: number;
    completed_appointments: number;
  }>;
}


export interface SchedulerTopTiles {
  total_appointments: number;
  upcoming_appointments: number;
  cancellations: number;
  no_show: number;
}

export interface SupervisorData {
  top_tiles: {
    supervised_providers: number;
    compliance_notes_reviewed: number;
    pending_approvals: number;
    escalations: number;
  };
  compliance_completion_rate: {
    total_sessions: number;
    sessions_with_notes: number;
    compliant_notes: number;
    signed_notes: number;
    compliance_rate_percent: number;
  };
  provider_session_hours: Array<{
    provider_name: string;
    total_hours: number;
  }> | null;
}

export interface SupervisorTopTiles {
  supervised_providers: number;
  compliance_notes_reviewed: number;
  pending_approvals: number;
  escalations: number;
}