/**
 * Environment and API constants (SCREAMING_SNAKE_CASE).
 * Env keys kept for backward compatibility with .env files.
 */
export const JITSI_SCRIPT_URL = import.meta.env["VITE_Jitsi_SCRIPT_URL"];
export const RECAPTCHA_KEY = import.meta.env["VITE_recaptchaKey"];
export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"];
export const CHATBOT_BASE_URL = import.meta.env["VITE_CHATBOT_BASE_URL"];
export const AI_ASSISTANT_BASE_URL = import.meta.env["VITE_AI_ASSISTANT_BASE_URL"];
export const ADMIN_ROLE = import.meta.env["VITE_adminRole"];
export const CLIENT_ROLE = import.meta.env["VITE_clientRole"];
export const TEAM_MEMBER_ROLE = import.meta.env["VITE_teamMemberRole"];
export const STRIPE_PUBLIC_KEY = import.meta.env["VITE_STRIPE_PUBLIC_KEY"];
export const GOOGLE_CLIENT_ID = import.meta.env["VITE_googleClientId"];
export const AUTHORIZE_NET_API_LOGIN_ID =
  import.meta.env["VITE_AUTHOTIZE_NET_API_LOGIN_ID"];
export const AUTHORIZE_NET_CLIENT_KEY =
  import.meta.env["VITE_AUTHOTIZE_NET_CLIENT_KEY"];
export const PAYPAL_CLIENT_ID = import.meta.env["VITE_PAYPAL_CLIENT_ID"];
export const AUTHORIZE_NET_ACCEPT_JS_URL =
  import.meta.env["VITE_AUTHORIZE_NET_ACCEPT_JS_URL"];
