/* eslint-disable no-unused-vars */
import axios from 'axios';
import { API_BASE_URL } from '../config/env';

const AUTH_TOKEN_KEY = 'telepractice_token';
const USER_ID_KEY = 'telepractice_userId';
const REQUEST_TIMEOUT_MS = 15000;

let isRedirecting = false;

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: REQUEST_TIMEOUT_MS,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    // Don't redirect for specific auth endpoints to avoid redirect loops
    const noRedirectPaths = [
      '/auth/signin',
      '/auth/register',
      '/auth/verify-otp',
      '/auth/reset-password',
      '/auth/change-password',
    ];

    const shouldSkipRedirect = noRedirectPaths.some((path) => config?.url?.includes(path));

    // Check for authentication/authorization errors
    const isAuthError =
      response?.status === 401 ||
      // response?.status === 403 ||
      (response?.status === 404 && response?.data?.message?.includes('User session')) ||
      response?.data?.message?.includes('expired') ||
      response?.data?.message?.includes('invalid token') ||
      response?.data?.message?.includes('unauthorized') ||
      response?.data?.message?.includes('Token has expired');

    if (isAuthError && !shouldSkipRedirect && !isRedirecting) {
      isRedirecting = true;

      try {
        sessionStorage.removeItem(AUTH_TOKEN_KEY);
        sessionStorage.removeItem(USER_ID_KEY);
        sessionStorage.removeItem('organization_id');

        // Clear any onboarding/invitation tokens
        sessionStorage.removeItem('invited_team_email');
        sessionStorage.removeItem('invited_team_team_member_id');
        sessionStorage.removeItem('invited_team_userId');
        sessionStorage.removeItem('invited_team_team_member_id');
        sessionStorage.removeItem('invited_team_team_organization_id');
        sessionStorage.removeItem('invited_team_token');
        sessionStorage.removeItem('invited_client_token');
        sessionStorage.removeItem('invited_client_email');
        sessionStorage.removeItem('invited_client_userId');

        // Small delay to ensure storage is cleared
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Use window.location.href for guaranteed redirect
        window.location.href = '/auth/signin';
      } catch (cleanupError) {
        // Still redirect even if cleanup fails
        window.location.href = '/auth/signin';
      }

      return Promise.reject(new Error('Authentication failed - redirecting to login'));
    }

    // Reset redirect flag for non-auth errors
    if (!isAuthError) {
      isRedirecting = false;
    }

    return Promise.reject(error);
  },
);

// Reset redirect flag when page loads
window.addEventListener('load', () => {
  isRedirecting = false;
});

// Also reset on navigation
window.addEventListener('popstate', () => {
  isRedirecting = false;
});

export default api;
