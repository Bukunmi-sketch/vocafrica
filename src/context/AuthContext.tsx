/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-useless-catch */
import type React from 'react';
import { createContext, useContext, type ReactNode, useState, useEffect, useCallback } from 'react';
import api from '../hooks/useApi';
import type { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/env';
import { User } from '../types/auth';
import { getDeviceId } from '../hooks/deviceId';
import { format, addMonths } from 'date-fns';

interface AuthLoadingState {
  register: boolean;
  login: boolean;
  verify: boolean;
  getCurrentUser: boolean;
  updateProfile: boolean;
  googleAuth: boolean;
  changePassword: boolean;
  [key: string]: boolean;
}

interface AuthContextType {
  registerUser: (data: any) => Promise<AxiosResponse<any, any>>;
  loginUser: (data: any) => Promise<AxiosResponse<any, any>>;
  isAuthenticated: () => boolean;
  forceLogout: () => Promise<any>;
  registerClient: (data: any) => Promise<AxiosResponse<any, any>>;
  verifyOtpCode: (code: string) => Promise<AxiosResponse<any, any>>;
  changePassword: (data: any) => Promise<AxiosResponse<any, any>>;
  forgotPassword: (data: any) => Promise<any>;
  resetPassword: (data: any) => Promise<any>;
  updateClientProfile: (data: any) => Promise<any>;
  updateTeamMemberProfile: (data: any) => Promise<any>;
  updateOrganizationProfile: (data: any) => Promise<any>;
  googleSignin: (data: any) => Promise<any>;
  googleSignup: (data: any) => Promise<any>;
  uploadProfilePic: (data: any) => Promise<any>;
  Logout: () => void;
  LogoutWithoutNavigating: () => void;
  getCurrentUser: () => Promise<User | null>;
  getOnboardingStatus: () => Promise<any>;
  onboardingStatus: any | null;
  getTeamOnboardingStatus: (teamMemberId: string) => Promise<any>;
  teamOnboardingStatus: any | null;
  getClientOnboardingStatus: () => Promise<any>;
  clientOnboardingStatus: any | null;
  metrics: any | null;
  getMetrics: () => Promise<any | null>;
  getOrganizationSubscription: () => Promise<any | null>;
  subscription: any | null;
  getOnboardingInvitationStatus: (token: string, teamMemberId: string) => Promise<any | null>;
  getClientOnboardingInvitationStatus: (token: string, clientId: string) => Promise<any | null>;
  getDashboardMetrics: () => Promise<any>;

  registerOrganization: (data: any) => Promise<AxiosResponse<any, any>>;
  addTeamMeber: (data: any) => Promise<AxiosResponse<any, any>>;
  addClient: (data: any) => Promise<AxiosResponse<any, any>>;
  createAppointment: (data: any) => Promise<any>;
  getOrganizationService: () => Promise<any>;
  getOrganizationAppointemntModes: () => Promise<any>;
  getOrganizationRecurrentModes: () => Promise<any>;
  addPaymentMethod: (data: any) => Promise<any>;
  getPaymentMethod: () => Promise<any>;
  fetchTeamMembers: (page: any) => Promise<any>;
  fetchClientAppointment: (page: any) => Promise<any>;
  rescheduleAppointment: (data: any) => Promise<any>;
  upsertTimezone: (data: any) => Promise<any>;
  deleteAppointment: (appointmentId: any) => Promise<any>;
  deletePaymentMethod: (paymentMethodId: any) => Promise<any>;
  fetchOrganizationLocations: (page: any) => Promise<any>;
  getWorldTimezone: () => Promise<any>;
  getClientMetrics: () => Promise<any>;
  getCurrentLocations: () => Promise<any>;
  getClientTimezone: () => Promise<any>;
  getTherapistAvailability: (data: any) => Promise<AxiosResponse<any, any>>;
  getTeamMemberDaysOfWeekAvailability: (teamMemberId: any) => Promise<AxiosResponse<any, any>>;
  makePaymentDefault: (paymentMethodId: any) => Promise<any>;

  token: string | null;
  userId: string | null;
  userDetails: User | null;
  organizationService: [any] | null;
  organizationAppointmentMode: [any] | null;
  organizationRecurrentMode: [any] | null;
  setUserDetails: React.Dispatch<React.SetStateAction<User | null>>;
  setAuthLoading: React.Dispatch<React.SetStateAction<AuthLoadingState>>;
  setClientOnboardingStatus: React.Dispatch<React.SetStateAction<any | null>>;
  updateUserDetailsCache: (updatedUser: User | null) => void; // New method to update cache
  isLoading: boolean;
  authLoading: AuthLoadingState;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface CacheItem {
  data: any;
  timestamp: number;
}

class RequestCache {
  private cache: Record<string, CacheItem> = {};
  private inProgressRequests: Record<string, boolean> = {};
  private defaultCooldown: number = 10000;

  isRequestInProgress(key: string): boolean {
    return !!this.inProgressRequests[key];
  }

  setRequestInProgress(key: string, status: boolean): void {
    this.inProgressRequests[key] = status;
  }

  getCachedData(key: string, cooldown: number = this.defaultCooldown): any | null {
    const cachedItem = this.cache[key];
    if (cachedItem && Date.now() - cachedItem.timestamp < cooldown) {
      return cachedItem.data;
    }
    return null;
  }

  setCachedData(key: string, data: any): void {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
    };
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState(() => sessionStorage.getItem('telepractice_userId') || '');
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [organizationService, setOrganizationService] = useState(null);
  const [organizationRecurrentMode, setOrganizationRecurrentMode] = useState(null);
  const [organizationAppointmentMode, setOrganizationAppointmentMode] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [onboardingStatus, setOnboardingStatus] = useState<any | null>(null);
  const [teamOnboardingStatus, setTeamOnboardingStatus] = useState<any | null>(null);
  const [clientOnboardingStatus, setClientOnboardingStatus] = useState<any | null>(null);
  const [metrics, setMetrics] = useState<any | null>(null);
  const [subscription, setSubscription] = useState<any | null>(null);

  const [authLoading, setAuthLoading] = useState<AuthLoadingState>({
    register: false,
    login: false,
    verify: false,
    getCurrentUser: true,
    updateProfile: false,
    googleAuth: false,
    changePassword: false,
  });

  const token = sessionStorage.getItem('telepractice_token');
  const navigate = useNavigate();
  const isAuthenticated = useCallback((): boolean => {
    const token = sessionStorage.getItem('telepractice_token');
    return !!(token && userDetails && Object.keys(userDetails).length > 0);
  }, [userDetails]);
  const requestCache = new RequestCache();

  // New method to update the cache when userDetails changes
  const updateUserDetailsCache = useCallback((updatedUser: User | null) => {
    requestCache.setCachedData('currentUser', updatedUser);
  }, []);

  const getCurrentUser = useCallback(async (): Promise<User | null> => {
    const cacheKey = 'currentUser';

    // Check if we even have a token first
    const currentToken = sessionStorage.getItem('telepractice_token');
    if (!currentToken) {
      // No token means no user - clear everything and return
      await forceLogout();
      return null;
    }

    if (requestCache.isRequestInProgress(cacheKey)) {
      return userDetails;
    }

    const cachedData = requestCache.getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      requestCache.setRequestInProgress(cacheKey, true);
      setAuthLoading((prev) => ({ ...prev, getCurrentUser: true }));
      setIsLoading(true);

      const response = await api.get('/auth/me');

      let userData = response.data.data;

      if (response.data.success && userData.organization_id) {
        const orgResponse = await api.get(`/organization/${userData.organization_id}`);
        userData = {
          ...userData,
          organization: orgResponse.data.data,
        };
      }

      if (response.data.success && userData.team_member_id) {
        const orgResponse = await api.get(`/subscription/${userData.organization_id}/addon-plans`);
        userData = {
          ...userData,
          addons: orgResponse.data.data,
        };
      }

      if (response.data.success && (userData.team_member_id || userData.role == 'Team Member')) {
        const teamResponse = await api.get(`/team-member/${userData.team_member_id}`);
        userData = {
          ...userData,
          teamMember: teamResponse.data.data,
        };
      }

      if (response.data.success && userData.client_id) {
        const clientResponse = await api.get(`/client/${userData.client_id}`);
        userData = {
          ...userData,
          client: clientResponse.data.data,
        };
      }

      setUserDetails(userData);
      requestCache.setCachedData(cacheKey, userData);
      return userData;
    } catch (error: any) {
      // Handle specific auth errors that mean the session is invalid
      if (
        error?.response?.status === 401 ||
        error?.response?.status === 404 ||
        error?.response?.data?.message?.includes('User session has expired') ||
        error?.response?.data?.message?.includes('invalid token') ||
        error?.response?.data?.message?.includes('unauthorized')
      ) {
        // Force logout without navigation to avoid infinite loops
        await forceLogout();
        return null;
      }

      // For other errors, don't logout but return null
      return null;
    } finally {
      requestCache.setRequestInProgress(cacheKey, false);
      setAuthLoading((prev) => ({ ...prev, getCurrentUser: false }));
      setIsLoading(false);
    }
  }, [userDetails]);

  const forceLogout = async () => {
    try {
      // Clear all auth data immediately
      await deleteDataFromStorages();

      // Clear request cache
      // requestCache.cache = {};
      // requestCache.inProgressRequests = {};

      // Reset all auth states
      setUserDetails(null);
      setUserId('');
      setOnboardingStatus(null);
      setTeamOnboardingStatus(null);
      setClientOnboardingStatus(null);
      setMetrics(null);
      setSubscription(null);
      setOrganizationService(null);
      setOrganizationAppointmentMode(null);
      setOrganizationRecurrentMode(null);
    } catch (error) {}
  };

  const getOnboardingStatus = useCallback(async (): Promise<any | null> => {
    const orgId =
      sessionStorage.getItem('organization_id') ||
      userDetails?.organization_id ||
      sessionStorage.getItem('organization_id');
    const authToken = sessionStorage.getItem('telepractice_token');

    if (!authToken || !orgId) {
      return null;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/organization/${orgId}/onboarding`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: 'application/json',
        },
      });

      return response.data || null;
    } catch (error) {
      return null;
    }
  }, []);

  const getTeamOnboardingStatus = useCallback(
    async (teamMemberId: string): Promise<any | null> => {
      const authToken = sessionStorage.getItem('telepractice_token');
      if (!authToken || !teamMemberId) {
        return null;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/teamMember/${teamMemberId}/onboarding`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: 'application/json',
            },
          },
        );

        return response.data || null;
      } catch (error) {
        return null;
      }
    },
    [token, teamOnboardingStatus],
  );

  const getOnboardingInvitationStatus = useCallback(
    async (invitedToken: string, teamMemberId: string): Promise<any | null> => {
      if (!invitedToken || !teamMemberId) {
        return null;
      }

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/teamMember/${teamMemberId}/onboarding`,
          {
            headers: {
              Authorization: `Bearer ${invitedToken}`,
              Accept: 'application/json',
            },
          },
        );

        return response.data || null;
      } catch (error) {
        return null;
      }
    },
    [],
  );

  const getClientOnboardingInvitationStatus = useCallback(
    async (invitedToken: string, clientId: string): Promise<any | null> => {
      if (!invitedToken || !clientId) {
        return null;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/client/${clientId}/onboarding`, {
          headers: {
            Authorization: `Bearer ${invitedToken}`,
            Accept: 'application/json',
          },
        });

        return response.data || null;
      } catch (error) {
        return null;
      }
    },
    [],
  );

  const getClientOnboardingStatus = async (): Promise<any | null> => {
    try {
      const response = await api.get(`/client/${userDetails?.client_id}/onboarding`);
      setClientOnboardingStatus(response.data.data);
      return response.data;
    } catch (error) {
      return null;
    }
  };

  const getMetrics = useCallback(async (): Promise<any | null> => {
    if (!userDetails?.organization_id || !token) return null;

    const cacheKey = `metrics_${userDetails.organization_id}`;

    // If a request is already in progress, just return the existing metrics
    if (requestCache.isRequestInProgress(cacheKey)) {
      return metrics;
    }

    // Return cached metrics if available
    const cachedData = requestCache.getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      requestCache.setRequestInProgress(cacheKey, true);

      const response = await fetch(
        `${API_BASE_URL}/api/organization/metrics/${userDetails.organization_id}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch metrics');
      }

      const data = await response.json();

      if (data.success) {
        const metricsData = {
          appointmentCount: Number(data.data.total_appointments) || 0,
          clientCount: Number(data.data.total_clients) || 0,
          providerCount: Number(data.data.total_team_members) || 0,
          serviceCount: Number(data.data.total_services) || 0,
          sessionCount: Number(data.data.total_sessions) || 0,
          noteCount: Number(data.data.total_notes) || 0,
        };

        // Cache the result
        requestCache.setCachedData(cacheKey, metricsData);

        // Save in state
        setMetrics(metricsData);

        return metricsData;
      } else {
        throw new Error('Failed to fetch valid metrics');
      }
    } catch (error) {
      return null;
    } finally {
      requestCache.setRequestInProgress(cacheKey, false);
    }
  }, [userDetails?.organization_id, token, metrics]);

  const getOrganizationSubscription = useCallback(async (): Promise<any | null> => {
    const orgId = userDetails?.organization_id || sessionStorage.getItem('organization_id');
    const cacheKey = `subscription_${orgId}`;

    if (!token || !orgId) return null;

    if (requestCache.isRequestInProgress(cacheKey)) return subscription;

    const cachedData = requestCache.getCachedData(cacheKey);
    if (cachedData) return cachedData;

    try {
      requestCache.setRequestInProgress(cacheKey, true);
      const response = await axios.get(`${API_BASE_URL}/api/subscription/${orgId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      const data = response.data?.data;
      if (response.data.success && data) {
        setSubscription(data);
        requestCache.setCachedData(cacheKey, data);
        return data;
      }

      return null;
    } catch (error) {
      return null;
    } finally {
      requestCache.setRequestInProgress(cacheKey, false);
    }
  }, [token, userDetails?.organization_id, subscription]);

  const registerUser = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, register: true }));
      const result = await api.post('/auth/register', data);
      const userId = result.data.userId;
      sessionStorage.setItem('telepractice_userId', userId);
      setUserId(userId);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, register: false }));
    }
  };

  const loginUser = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, login: true }));
      const result = await axios.post(`${API_BASE_URL}/api/auth/login`, data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, login: false }));
    }
  };

  const registerClient = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, register: true }));
      const result = await api.post('/auth/register', data);
      const userId = result.data.userId;
      sessionStorage.setItem('telepractice_userId', userId);
      setUserId(userId);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, register: false }));
    }
  };

  const verifyOtpCode = async (code: string) => {
    try {
      setAuthLoading((prev) => ({ ...prev, verify: true }));
      const response = await api.post('/auth/verify-otp', { otp: code, userId });
      return response;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, verify: false }));
    }
  };

  const updateClientProfile = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, updateProfile: true }));
      const result = await api.put('/client', data);

      if (userDetails) {
        const updatedUser = { ...userDetails };
        if (updatedUser.client) {
          updatedUser.client = { ...updatedUser.client, ...data };
        }
        setUserDetails(updatedUser);
        requestCache.setCachedData('currentUser', updatedUser);
      }

      return result.data.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, updateProfile: false }));
    }
  };

  const updateTeamMemberProfile = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, updateProfile: true }));
      const result = await api.put('/team-member', data);

      if (userDetails) {
        const updatedUser = { ...userDetails };
        if (updatedUser.teamMember) {
          updatedUser.teamMember = { ...updatedUser.teamMember, ...data };
        }
        setUserDetails(updatedUser);
        requestCache.setCachedData('currentUser', updatedUser);
      }

      return result.data.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, updateProfile: false }));
    }
  };

  const googleSignin = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, googleAuth: true }));

      const deviceId = await getDeviceId();

      const result = await axios.post(`${API_BASE_URL}/api/auth/google-signin`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-device-id': deviceId,
        },
      });
      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, googleAuth: false }));
    }
  };

  const googleSignup = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, googleAuth: true }));

      const deviceId = await getDeviceId();

      const result = await axios.post(`${API_BASE_URL}/api/auth/google-signup`, data, {
        headers: {
          'Content-Type': 'application/json',
          'x-device-id': deviceId,
        },
      });
      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, googleAuth: false }));
    }
  };

  const updateOrganizationProfile = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, updateProfile: true }));
      const result = await api.put('/organization', data);

      if (userDetails && userDetails.organization) {
        const updatedUser = {
          ...userDetails,
          organization: { ...userDetails.organization, ...data },
        };
        setUserDetails(updatedUser);
        requestCache.setCachedData('currentUser', updatedUser);
      }

      return result.data.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, updateProfile: false }));
    }
  };

  const uploadProfilePic = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, uploadPic: true }));
      const result = await api.post('/auth/upload-profile-picture', data);

      return result.data.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, uploadPic: false }));
    }
  };

  const uploadOrganiztionProfilePic = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, uploadPic: true }));
      const result = await api.post('/organization/setting', data);

      if (userDetails && result.data?.data?.picture) {
        const updatedUser = { ...userDetails, picture: result.data.data.picture };
        setUserDetails(updatedUser);
        requestCache.setCachedData('currentUser', updatedUser);
      }

      return result.data.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, uploadPic: false }));
    }
  };

  const changePassword = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, changePassword: true }));
      const result = await api.post('/auth/secured-change-password', data);
      return result.data.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, changePassword: false }));
    }
  };

  const forgotPassword = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, forgotPassword: true }));
      const result = await api.post('/auth/reset-password', data);
      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, forgotPassword: false }));
    }
  };

  const resetPassword = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, resetPassword: true }));
      const result = await api.post('/auth/change-password', data);
      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, resetPassword: false }));
    }
  };

  const deleteDataFromStorages = async () => {
    sessionStorage.removeItem('telepractice_token');
    sessionStorage.removeItem('telepractice_userId');
    sessionStorage.removeItem('organization_id');

    sessionStorage.removeItem('invited_team_email');
    sessionStorage.removeItem('invited_team_team_member_id');
    sessionStorage.removeItem('invited_team_userId');
    sessionStorage.removeItem('invited_team_team_member_id');
    sessionStorage.removeItem('invited_team_team_organization_id');
    sessionStorage.removeItem('invited_team_token');

    sessionStorage.removeItem('invited_client_token');
    sessionStorage.removeItem('invited_client_email');
    sessionStorage.removeItem('invited_client_userId');

    setUserDetails(null);
  };

  const Logout = useCallback(async () => {
    try {
      const deviceId = await getDeviceId();

      // Try to call logout endpoint, but don't let it block the logout process
      try {
        await axios.post(
          `${API_BASE_URL}/api/auth/logout`,
          {},
          {
            headers: {
              'x-device-id': deviceId,
              Authorization: `Bearer ${sessionStorage.getItem('telepractice_token')}`,
            },
            timeout: 5000, // 5 second timeout
          },
        );
      } catch (logoutError) {}

      // Always clear local data regardless of API call success
      await forceLogout();

      // Navigate to signin
      navigate('/auth/signin', { replace: true });
    } catch (error) {
      await forceLogout();
      navigate('/auth/signin', { replace: true });
    }
  }, [navigate]);

  const LogoutWithoutNavigating = async () => {
    const deviceId = await getDeviceId();

    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        {
          headers: {
            'x-device-id': deviceId,
          },
        },
      );

      // Clear sessionStorage & context
      deleteDataFromStorages();
    } catch (error) {}
  };

  const getOrganizationService = async () => {
    const cacheKey = `orgService_${userDetails?.organization_id}`;

    if (requestCache.isRequestInProgress(cacheKey)) {
      return organizationService;
    }

    const cachedData = requestCache.getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      if (!userDetails?.organization_id || !userDetails?.organization?.status) {
        return null;
      }

      requestCache.setRequestInProgress(cacheKey, true);
      setAuthLoading((prev) => ({ ...prev, getOrganizationService: true }));

      const response = await api.get(`/service/organization/${userDetails.organization_id}`);

      if (response.data.success) {
        const data = response.data.data;
        setOrganizationService(data);
        requestCache.setCachedData(cacheKey, data);
        return response.data;
      }
      return null;
    } catch (error) {
      throw error;
    } finally {
      requestCache.setRequestInProgress(cacheKey, false);
      setAuthLoading((prev) => ({ ...prev, getOrganizationService: false }));
    }
  };

  const getOrganizationAppointemntModes = async () => {
    const cacheKey = `orgAppModes_${userDetails?.organization_id}`;

    if (requestCache.isRequestInProgress(cacheKey)) {
      return organizationAppointmentMode;
    }

    const cachedData = requestCache.getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      if (!userDetails?.organization_id || !userDetails?.organization?.status) {
        return null;
      }

      requestCache.setRequestInProgress(cacheKey, true);
      setAuthLoading((prev) => ({ ...prev, getOrganizationAppointemntModes: true }));

      const response = await api.get(`/appointment/modes/${userDetails.organization_id}`);

      if (response.data.success) {
        const data = response.data.data;
        setOrganizationAppointmentMode(data);
        requestCache.setCachedData(cacheKey, data);
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    } finally {
      requestCache.setRequestInProgress(cacheKey, false);
      setAuthLoading((prev) => ({ ...prev, getOrganizationAppointemntModes: false }));
    }
  };

  const getOrganizationRecurrentModes = async () => {
    const cacheKey = `orgRecModes_${userDetails?.organization_id}`;

    if (requestCache.isRequestInProgress(cacheKey)) {
      return organizationRecurrentMode;
    }

    const cachedData = requestCache.getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      if (!userDetails?.organization_id || !userDetails?.organization?.status) {
        return null;
      }

      requestCache.setRequestInProgress(cacheKey, true);
      setAuthLoading((prev) => ({ ...prev, getOrganizationRecurrentModes: true }));

      const response = await api.get(`/appointment/recurrent-rules/${userDetails.organization_id}`);

      if (response.data.success) {
        const data = response.data.data;
        setOrganizationRecurrentMode(data);
        requestCache.setCachedData(cacheKey, data);
        return data;
      }
      return null;
    } catch (error) {
      throw error;
    } finally {
      requestCache.setRequestInProgress(cacheKey, false);
      setAuthLoading((prev) => ({ ...prev, getOrganizationRecurrentModes: false }));
    }
  };

  const createAppointment = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, createAppointment: true }));
      const result = await api.post('/appointment', data);
      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, createAppointment: false }));
    }
  };

  const addPaymentMethod = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, addPaymentMethod: true }));
      const result = await api.post('/payment/payment-method', data);
      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, addPaymentMethod: false }));
    }
  };

  const getPaymentMethod = async () => {
    const cacheKey = `paymentMethod_${userDetails?.user_id}`;

    if (requestCache.isRequestInProgress(cacheKey)) {
      return null;
    }

    const cachedData = requestCache.getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      if (!userDetails?.user_id) {
        return null;
      }

      requestCache.setRequestInProgress(cacheKey, true);
      setAuthLoading((prev) => ({ ...prev, getPaymentMethod: true }));

      const result = await api.get(`/payment/payment-method/user/${userDetails.user_id}`);

      if (result.data) {
        requestCache.setCachedData(cacheKey, result.data);
      }

      return result.data;
    } catch (error) {
      throw error;
    } finally {
      requestCache.setRequestInProgress(cacheKey, false);
      setAuthLoading((prev) => ({ ...prev, getPaymentMethod: false }));
    }
  };

  const registerOrganization = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, registerOrg: true }));
      const result = await api.post('/organization', data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, registerOrg: false }));
    }
  };

  const addTeamMeber = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, addTeamMember: true }));
      const result = await api.post('/team-member/batch', data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, addTeamMember: false }));
    }
  };

  const addClient = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, addClient: true }));
      const result = await api.post('/client/batch', data);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, addClient: false }));
    }
  };

  const getDashboardMetrics = async () => {
    try {
      setAuthLoading((prev) => ({ ...prev, fetchDashboardMetrics: true }));
      const response = await api.get(`/report/client/${userDetails?.client_id}/metrics`);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, fetchDashboardMetrics: false }));
    }
  };

  const fetchTeamMembers = async (page: any) => {
    const cacheKey = `teamMembers_${userDetails?.organization_id}_${page}`;

    if (requestCache.isRequestInProgress(cacheKey)) {
      return null;
    }

    const cachedData = requestCache.getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      if (!userDetails?.organization_id || !userDetails?.organization?.status) {
        return null;
      }

      const limit = 4;
      requestCache.setRequestInProgress(cacheKey, true);
      setAuthLoading((prev) => ({ ...prev, fetchTeamMembers: true }));

      const result = await api.get(
        `/team-member/organization/${userDetails.organization_id}?page=${page}&limit=${limit}`,
      );

      if (result.data.data) {
        requestCache.setCachedData(cacheKey, result.data.data);
      }

      return result.data.data;
    } catch (error) {
      throw error;
    } finally {
      requestCache.setRequestInProgress(cacheKey, false);
      setAuthLoading((prev) => ({ ...prev, fetchTeamMembers: false }));
    }
  };

  const fetchOrganizationLocations = async (page: any) => {
    try {
      const limit = 10;
      setAuthLoading((prev) => ({ ...prev, fetchOrganizationLocations: true }));
      if (userDetails?.organization_id && userDetails?.organization?.status) {
        const result = await api.get(
          `/organization/locations/${userDetails.organization_id}?page=${page}&limit=${limit}`,
        );
        return result.data;
      }
      return null;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, fetchOrganizationLocations: false }));
    }
  };

  const fetchClientAppointment = async (page: any) => {
    try {
      const limit = 1000;
      setAuthLoading((prev) => ({ ...prev, fetchClientAppointment: true }));
      if (userDetails?.client_id) {
        const result = await api.get(
          `/appointment/client/${userDetails.client_id}?page=${page}&limit=${limit}`,
        );
        return result.data.data;
      }
      return null;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, fetchClientAppointment: false }));
    }
  };

  const getClientMetrics = async () => {
    try {
      setAuthLoading((prev) => ({ ...prev, getClientMetrics: true }));
      if (userDetails?.client_id) {
        const result = await api.get(`/client/metrics/${userDetails.client_id}`);
        return result.data.data;
      }
      return null;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, getClientMetrics: false }));
    }
  };

  const rescheduleAppointment = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, rescheduleAppointment: true }));
      const result = await api.put(`/appointment`, data);
      return result.data.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, rescheduleAppointment: false }));
    }
  };

  const deleteAppointment = async (appointmentId: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, deleteAppointment: true }));
      const result = await api.delete(`/appointment/${appointmentId}`);
      return result.data.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, deleteAppointment: false }));
    }
  };

  const deletePaymentMethod = async (paymentMethodId: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, deletePaymentMethod: true }));
      const result = await api.delete(
        `/payment/payment-method/${userDetails?.user_id}/${paymentMethodId}`,
      );

      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, deletePaymentMethod: false }));
    }
  };

  const getCurrentLocations = async () => {
    try {
      const lat = sessionStorage.getItem('latitude');
      const long = sessionStorage.getItem('longitude');
      const result = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=10&addressdetails=1`,
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  };

  const getWorldTimezone = async () => {
    const cacheKey = 'worldTimezones';

    const cachedData = requestCache.getCachedData(cacheKey, 86400000);
    if (cachedData) {
      return cachedData;
    }

    try {
      const result = await axios.get(`https://worldtimeapi.org/api/timezones`);
      requestCache.setCachedData(cacheKey, result.data);
      return result.data;
    } catch (error) {
      throw error;
    }
  };

  const upsertTimezone = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, upsertTimezone: true }));
      const result = await api.post(`/client/timezone`, data);
      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, upsertTimezone: false }));
    }
  };

  const getClientTimezone = async () => {
    const cacheKey = `clientTimezone_${userDetails?.client_id}`;

    if (requestCache.isRequestInProgress(cacheKey)) {
      return null;
    }

    const cachedData = requestCache.getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      if (!userDetails?.client_id) {
        return null;
      }

      requestCache.setRequestInProgress(cacheKey, true);
      setAuthLoading((prev) => ({ ...prev, getClientTimezone: true }));

      const result = await api.get(`/client/timezone/${userDetails.client_id}`);

      if (result.data) {
        requestCache.setCachedData(cacheKey, result.data);
      }

      return result.data;
    } catch (error) {
      throw error;
    } finally {
      requestCache.setRequestInProgress(cacheKey, false);
      setAuthLoading((prev) => ({ ...prev, getClientTimezone: false }));
    }
  };

  const getTherapistAvailability = async (data: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, getTherapistAvailability: true }));

      const rawWindow = userDetails?.organization?.organization_setting?.appointment_window;
      const appointmentWindow = rawWindow && rawWindow > 0 ? rawWindow : 3; // DEFAULT = 3 months

      const today = new Date();
      const formattedToday = format(today, 'yyyy-MM-dd');

      const defaultEndDate = format(addMonths(today, appointmentWindow), 'yyyy-MM-dd');

      const startDate = data?.startDate || formattedToday;
      const endDate = data?.endDate || defaultEndDate;

      // 5. Fetch provider availability
      const result = await api.get(
        `/team-member/${data.teamMemberId}/calendar-availability?startDate=${startDate}&endDate=${endDate}`,
      );

      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, getTherapistAvailability: false }));
    }
  };

  const getTeamMemberDaysOfWeekAvailability = async (teamMemberId: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, getTeamMemberDaysOfWeekAvailability: true }));
      const result = await api.get(`/team-member/${teamMemberId}/availability`);
      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, getTeamMemberDaysOfWeekAvailability: false }));
    }
  };

  const makePaymentDefault = async (paymentMethodId: any) => {
    try {
      setAuthLoading((prev) => ({ ...prev, makePaymentDefault: true }));
      const result = await api.post(
        `/payment/payment-method/${userDetails?.user_id}/${paymentMethodId}/make-default`,
      );
      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setAuthLoading((prev) => ({ ...prev, makePaymentDefault: false }));
    }
  };

  const initializeAuth = async () => {
    if (token && (!userDetails || Object.keys(userDetails).length === 0)) {
      await getCurrentUser();
      if (userDetails?.is_onboarding_completed == false) {
        await getClientOnboardingStatus();
      }
    } else if (!token) {
      setIsLoading(false);
      setAuthLoading((prev) => ({ ...prev, getCurrentUser: false }));
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        registerClient,
        verifyOtpCode,
        updateClientProfile,
        updateTeamMemberProfile,
        updateOrganizationProfile,
        googleSignin,
        forceLogout,
        googleSignup,
        uploadProfilePic,
        changePassword,
        forgotPassword,
        resetPassword,
        Logout,
        isAuthenticated,
        getCurrentUser,
        getOnboardingStatus,
        onboardingStatus,
        getTeamOnboardingStatus,
        teamOnboardingStatus,
        getClientOnboardingStatus,
        clientOnboardingStatus,
        setClientOnboardingStatus,
        metrics,
        getMetrics,
        getOrganizationSubscription,
        subscription,
        getOnboardingInvitationStatus,
        getClientOnboardingInvitationStatus,

        registerOrganization,
        addTeamMeber,
        addClient,
        getOrganizationService,
        getOrganizationAppointemntModes,
        getOrganizationRecurrentModes,
        upsertTimezone,
        getClientTimezone,
        getTherapistAvailability,
        getTeamMemberDaysOfWeekAvailability,
        makePaymentDefault,
        createAppointment,
        addPaymentMethod,
        getPaymentMethod,
        fetchTeamMembers,
        getCurrentLocations,
        fetchClientAppointment,
        getClientMetrics,
        fetchOrganizationLocations,
        rescheduleAppointment,
        deleteAppointment,
        deletePaymentMethod,
        getWorldTimezone,
        LogoutWithoutNavigating,
        getDashboardMetrics,
        token,
        setUserDetails,
        userId,
        userDetails,
        organizationService,
        organizationAppointmentMode,
        organizationRecurrentMode,
        setAuthLoading,
        isLoading,
        authLoading,
        updateUserDetailsCache,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
