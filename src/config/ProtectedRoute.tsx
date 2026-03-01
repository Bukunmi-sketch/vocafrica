/* eslint-disable no-unused-vars */

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import LoadingModal from '../common/loader/SweetLoader';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const {
    token,
    userDetails,
    isLoading,
    getCurrentUser,
    getOnboardingStatus,
    getTeamOnboardingStatus,
    clientOnboardingStatus,
    getClientOnboardingStatus,
  } = useAuth();

  const [isInitializing, setIsInitializing] = useState(true);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [authCheckFailed, setAuthCheckFailed] = useState(false);
  const location = useLocation();

  const authToken = token || sessionStorage.getItem('telepractice_token');

  useEffect(() => {
    const check = async () => {
      try {
        setAuthCheckFailed(false);

        // Early exit if no token at all
        const hasToken =
          sessionStorage.getItem('telepractice_token');
        if (!hasToken) {
          setRedirectPath('/auth/signin');
          return;
        }

        // If we have a token but no user details, try to get current user
        if (hasToken && (!userDetails || Object.keys(userDetails).length === 0)) {
          try {
            const user = await getCurrentUser();
            if (!user) {
              setAuthCheckFailed(true);
              return;
            }
            // User fetched successfully, continue with onboarding checks
          } catch (error) {
            setAuthCheckFailed(true);
            return;
          }
        }

        // Only proceed with role-based redirects if we have valid user details
        if (!userDetails || Object.keys(userDetails).length === 0) {
          setAuthCheckFailed(true);
          return;
        }

        // Role-based onboarding checks
        if (userDetails?.role === 'Admin') {
          if (authToken && userDetails?.is_verified == true) {
            if (authToken && userDetails?.is_organization_onboarding_completed == false) {
              try {
                const onboarding = await getOnboardingStatus();
                if (
                  onboarding?.data &&
                  typeof onboarding.data === 'object' &&
                  Object.keys(onboarding.data).length > 0
                ) {
                  if (!onboarding.data.is_account_created) {
                    setRedirectPath('/admin/verify-otp');
                  } else if (!onboarding.data.is_business_page_created) {
                    // setRedirectPath('/admin/update-details');
                  } else if (!onboarding.data.is_subscription_selected) {
                    setRedirectPath('/auth/subscription');
                  } else if (!onboarding.data.is_payment_method_completed) {
                    setRedirectPath('/auth/add-payment-method');
                  }
                } else {
                  // setRedirectPath('/admin/update-details');
                }
              } catch (error) {
                // setRedirectPath('/admin/update-details');
              }
            } else if (
              (authToken && userDetails?.is_onboarding_completed == false) ||
              userDetails?.is_onboarding_completed == null
            ) {
              // sessionStorage.setItem('profile_uncompleted', 'true');
              // setRedirectPath('/admin/profile');
            }
          }
        } else if (userDetails?.role === 'Team Member') {
          if (authToken && userDetails?.is_onboarding_completed == false) {
            try {
              const status = await getTeamOnboardingStatus(userDetails?.team_member_id);
              if (
                status?.data &&
                typeof status.data === 'object' &&
                Object.keys(status.data).length > 0
              ) {
                if (!status.data.is_account_created)
                  setRedirectPath('/invitation/team-member/setup-password');
                else if (!status.data.is_work_hours_set)
                  setRedirectPath('/invitation/team/info-availablity');
                else if (!status.data.is_verification_done)
                  setRedirectPath('/invitation/team/verify-otp');
                else if (!status.data.is_completed) setRedirectPath('/invitation/team/verify-otp');
              } else {
                setRedirectPath('/');
              }
            } catch (error) {
              setRedirectPath('/');
            }
          }
        } else if (userDetails?.role === 'Client') {
          if (userDetails?.is_onboarding_completed == false) {
            if (!userDetails.is_account_created) setRedirectPath('/client-onboarding/signup');
            else if (!userDetails.is_verification_done)
              setRedirectPath('/invitation/clients/verify-otp');
          } else {
            setRedirectPath(null);
          }
        }
      } catch (error) {
        setAuthCheckFailed(true);
      } finally {
        setIsInitializing(false);
      }
    };

    check();
  }, [userDetails, token, getCurrentUser, getOnboardingStatus, getTeamOnboardingStatus]);

  // Show loading state during initial authentication check
  if (isLoading || isInitializing) {
    return <LoadingModal />;
  }

  // If auth check failed, show loading while we clean up
  if (authCheckFailed) {
    return <LoadingModal />;
  }

  // Redirect to login if not authenticated
  if (!authToken || !userDetails) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Redirect to incomplete step if needed
  if (redirectPath && location.pathname !== redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
