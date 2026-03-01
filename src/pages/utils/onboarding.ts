import axios from "axios";
import { API_BASE_URL } from "../../config/env";

interface OnboardingPayload {
  organizationId: string;
  isCompleted?: boolean;
  isAccountCreated?: boolean;
  isBusinessPageCreated?: boolean;
  isSubscriptionSelected?: boolean;
  isPaymentMethodCompleted?: boolean;
}

export async function updateOnboardingStatus(
  payload: OnboardingPayload,
  token: string
)
 {
  const defaultPayload = {
    isCompleted: false,
    isAccountCreated: true,
    isBusinessPageCreated: false,
    isSubscriptionSelected:false,
    isPaymentMethodCompleted: false,
  };

  const finalPayload = {
    onboarding: {
      ...defaultPayload,
      ...payload, 
    },
  };

  return axios.put(
    `${API_BASE_URL}/api/organization/onboarding`,
    finalPayload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
