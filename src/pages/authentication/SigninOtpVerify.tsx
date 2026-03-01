/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import type React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import api from '../../hooks/useApi';
import LoadingModal from '../../common/loader/SweetLoader';
import { API_BASE_URL } from '../../config/env';
import { getDeviceId } from '../../hooks/deviceId';
import usePreventBackNavigation from '../../hooks/usePreventBackNavigation';
import { replace } from 'lodash';

const SigninVerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  usePreventBackNavigation();
  const { verifyOtpCode, authLoading } = useAuth();
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const location = useLocation();
  const {
    email,
    role,
    token,
    userId,
    assistant_session_id,
    is_onboarding_completed,
    is_verification_done,
    is_work_hours_set,
    is_payment_method_completed,
    is_account_created,
  } = location.state || {};

  // Show loading modal when either local loading state or auth context loading is active
  const isVerifying = isLoading || authLoading.verify;
  const showLoadingModal = isVerifying || isResending;
  const loadingMessage = isResending ? 'Sending new code...' : 'Verifying your code...';

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setCode(digits);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = useCallback(
    async (codeArray: string[]) => {
      const verificationCode = codeArray.join('');

      if (isLoading || isVerified) return;

      setIsLoading(true);
      try {
        const deviceId = await getDeviceId();

        const result = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-device-id': deviceId,
          },
          body: JSON.stringify({ userId: userId, otp: verificationCode }),
        });

        const response = await result.json();

        if (response.success) {
          setIsVerified(true);
          sessionStorage.setItem('telepractice_token', token || '');
          sessionStorage.setItem('telepractice_token', token || '');

          toast.success(response.message || 'Verification successful!');

          navigate('/organization/update-details');
          if (role === 'Client') {
            if (is_onboarding_completed) {
              navigate('/client/dashboard');
            } else if (!is_account_created)
              navigate('/client-onboarding/signup', { replace: true });
            else if (!is_verification_done)
              navigate('/invitation/clients/verify-otp', { replace: true });
            else if (!is_payment_method_completed)
              navigate('/client/payment-method-details', { replace: true });
          } else {
            navigate('/admin/dashboard');
          }
        } else {
          toast.error('Verification failed. Please try again.');
          setCode(Array(6).fill(''));
          inputRefs.current[0]?.focus();
        }
      } catch (error: any) {
        toast.error(error.response?.message || 'An error occurred. Please try again.');
        setCode(Array(6).fill(''));
        inputRefs.current[0]?.focus();
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, isVerified, verifyOtpCode, navigate],
  );

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (code.every((digit) => digit !== '') && !isLoading && !isVerified) {
      handleSubmit(code);
    }
  }, [code, isLoading, isVerified, handleSubmit]);

  const handleResendCode = async () => {
    if (!isResending) {
      setIsResending(true);
      try {
        await toast.promise(api.post('/auth/request-new-otp', { userId }), {
          loading: 'Sending new code...',
          success: 'New code sent successfully!',
          error: 'Failed to send new code. Please try again.',
        });
      } catch (error) {
      } finally {
        setIsResending(false);
      }
    }
  };

  return (
    <div className="min-h-screen  text-black relative overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/cover/client-bg.png"
        className="absolute top-0 left-0 h-screen w-full object-cover z-0"
        alt="Background"
      />

      {/* Overlay for better readability */}
      <div className="absolute top-0 left-0 h-screen w-full bg-black/10 z-10"></div>

      {/* Loading Modal */}
      {showLoadingModal && <LoadingModal message={loadingMessage} />}

      <div className="w-full h-screen z-20 flex flex-col  items-center p-10">
        <div className="sm:mb-6 z-20 flex md:p-0 flex-col gap-3 items-center sm:flex-row sm:justify-between sm:w-3/4 w-11/12 lg:text-xs lg:mb-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={'/images/logo/White.png'} alt="Alehra" className="h-8 hidden lg:block" />
            <img
              src={'/images/logo/telepractice logo.png'}
              alt="Alehra"
              className="h-8 my-4 lg:hidden"
            />
          </Link>

          <nav className="hidden lg:block">
            <ol className="flex items-center gap-2">
              <li>
                <p className="font-medium text-white ">Don't have an account yet?</p>
              </li>
              <li className="relative font-medium text-green-600">
                <Link to={'/auth/signin'}>
                  <button className="bg-primary border border-primary hover:bg-indigo-900 hover:border-indigo-900 hover:border-2  font-extrabold text-white px-4 py-2 rounded-lg  focus:outline-none">
                    {' '}
                    Sign In{' '}
                  </button>
                </Link>
              </li>
            </ol>
          </nav>
        </div>

        {/* OTP Form Section */}
        <div className="lg:w-2/5 max-w-md w-full my-auto bg-white p-6 rounded-xl shadow-2xl z-20 mx-4 backdrop-blur-sm bg-white/85">
          <h1 className="text-2xl font-bold mb-3 text-center text-gray-800">
            Check your email for a code
          </h1>
          <p className="text-gray-600 mb-8 text-center text-sm leading-relaxed">
            We've sent a 6-character code to{' '}
            <span className="font-semibold text-blue-600">{email}</span>.
            <br />
            The code expires in 5 minutes, so please enter it soon.
          </p>

          <div className="flex justify-center gap-2 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                className={`w-12 h-14 border-2 border-gray-300 text-center rounded-lg text-xl font-bold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                  showLoadingModal ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400'
                }`}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={showLoadingModal || isVerified}
              />
            ))}
          </div>

          {isVerified && (
            <div className="mb-6 text-center p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 font-medium">
                Verification successful! Redirecting...
              </p>
            </div>
          )}

          {!isVerified && (
            <div className="text-center space-y-4">
              <p className="text-gray-600 text-sm font-medium">
                Didn't receive any code?{' '}
                <button
                  onClick={handleResendCode}
                  className={`text-blue-600 hover:text-blue-800 font-semibold ${
                    isResending || isVerifying ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isResending || isVerifying}
                >
                  {isResending ? 'Resending...' : 'Resend'}
                </button>
              </p>
              <p className="text-gray-500 text-xs">
                Still can't find your code? Check your spam folder!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SigninVerifyOtp;
