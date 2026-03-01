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

const NewOtpOnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  usePreventBackNavigation();
  const { verifyOtpCode, authLoading } = useAuth();
  const [code, setCode] = useState<string[]>(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const location = useLocation();
  const { email, userId } = location.state || {};

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
          // sessionStorage.setItem("telepractice_token", response.token || "");
          sessionStorage.setItem('telepractice_token', response.token || '');
          toast.success(response.message || 'Verification successful!');

          navigate('/admin/update-details');
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
    <div className="bg-white min-h-screen text-black">
      {/* Loading Modal */}
      {showLoadingModal && <LoadingModal message={loadingMessage} />}

      {/* Fixed Image (Right Side) */}
      <div className="hidden xl:block fixed top-0 right-0 w-1/2 h-screen">
        <div className="relative h-full w-full">
          <img
            src={'/images/logo/signupimag.png'}
            alt="Alehra Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center text-center text-white p-2 lg:p-6">
            <h2 className="text-base lg:text-sm font-semibold mb-1">
              Over 5,000+ therapy centers worldwide
            </h2>
            <p className="text-xs lg:text-[10px] font-medium">
              Alehra is cost-effective and less stressful for their clients.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-2">
        {/* Left Section - Form */}
        <div className="flex flex-col py-4 px-4 sm:px-6 md:px-10 lg:px-20">
          <div>
            <Link
              className="flex justify-center items-center mt-15 flex-shrink-0 w-full mb-4"
              to="/"
            >
              <img
                src={'/images/logo/telepractice logo.png'}
                alt="Alehra"
                className="ml-4 lg:ml-0 h-8 mt-6 lg:mt-4 mb-4"
              />
            </Link>

            {/* OTP Form Section */}
            <div className="lg:w-4/5 max-w-md w-full my-auto mt-5  mx-auto bg-white p-6 rounded-xl shadow-2xl z-20  backdrop-blur-sm bg-white/85">
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
      </div>

      {/* Right Section - Empty space to balance the layout */}
      <div className="hidden sm:block"></div>
    </div>
  );
};

export default NewOtpOnboardingPage;
