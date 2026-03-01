/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AuthStateMonitorOptions {
  enableLogging?: boolean;
  checkInterval?: number;
}

export const useAuthStateMonitor = (options: AuthStateMonitorOptions = {}) => {
  const { token, userDetails, isLoading, forceLogout } = useAuth();

  const navigate = useNavigate();
  const { enableLogging = false, checkInterval = 5000 } = options;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasLoggedLimbo = useRef(false);
  const isMountedRef = useRef(true);

  const log = (message: string, _data?: unknown) => {
    if (enableLogging) {
    }
  };

  const detectLimboState = () => {
    const localToken = sessionStorage.getItem('telepractice_token');
    const sessionToken = sessionStorage.getItem('telepractice_token');
    const hasAnyToken = !!(localToken || sessionToken);
    const hasUserDetails = !!(userDetails && Object.keys(userDetails).length > 0);

    const isInLimbo = hasAnyToken && !hasUserDetails && !isLoading;

    if (isInLimbo && !hasLoggedLimbo.current) {
      log('LIMBO STATE DETECTED', {
        hasLocalToken: !!localToken,
        hasSessionToken: !!sessionToken,
        hasUserDetails,
        isLoading,
        userDetailsKeys: userDetails ? Object.keys(userDetails).length : 0,
      });
      hasLoggedLimbo.current = true;
      return true;
    }

    if (!isInLimbo) {
      hasLoggedLimbo.current = false;
    }

    return isInLimbo;
  };

  const fixLimboState = async () => {
    log('Attempting to fix limbo state...');

    try {
      await forceLogout();

      // Small delay to ensure cleanup completes; only navigate if still mounted
      setTimeout(() => {
        if (isMountedRef.current) {
          navigate('/auth/signin', { replace: true });
        }
      }, 100);

      log('Limbo state fixed - redirected to signin');
    } catch (error) {
      log('Error fixing limbo state:', error);

      // Fallback cleanup
      sessionStorage.removeItem('telepractice_token');
      sessionStorage.removeItem('telepractice_userId');
      sessionStorage.clear();

      if (isMountedRef.current) {
        navigate('/auth/signin', { replace: true });
      }
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // Initial check
    if (detectLimboState()) {
      fixLimboState();
    }

    // Set up periodic monitoring
    intervalRef.current = setInterval(() => {
      if (detectLimboState()) {
        fixLimboState();
      }
    }, checkInterval);

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [token, userDetails, isLoading, forceLogout, navigate, checkInterval]);

  // Return current auth state for debugging
  return {
    isLimboState: detectLimboState(),
    hasToken: !!(
      sessionStorage.getItem('telepractice_token') || sessionStorage.getItem('telepractice_token')
    ),
    hasUserDetails: !!(userDetails && Object.keys(userDetails).length > 0),
    isLoading,
  };
};
