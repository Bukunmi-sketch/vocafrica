


/* eslint-disable import/extensions */
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "@/config/ProtectedRoute";
import { SocketProvider } from "@/context/SocketContext";
import PageTitle from "@/components/PageTitle";
import DefaultLayoutAdmin from "@/layout/DefaultLayout";
import OfflineWrapper from "@/common/offline/OfflinePage";
import { Toaster } from "react-hot-toast";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { RECAPTCHA_KEY } from "@/config/env";
import KioskManagement from "@/pages/admin/kioskManagement";
import VocaAfrica from "@/pages/admin/VocaAfrica";
import AnalyticsOverview from "@/pages/admin/AnalyticsOverview";
import RegisterKiosk from "@/pages/admin/registerKiosk";
import LoginPage from "@/pages/admin/LoginPage";
import LiveKioskIntervention from "@/pages/admin/LiveKioskIntervention";
import SettingsPage from "@/pages/admin/SettingsPage";
import OTPPage from "@/pages/admin/OTPPage";
import RegisterPage from "@/pages/admin/RegisterPage";
import ForgotPasswordPage from "@/pages/admin/ForgotPasswordPage";

function MainApp() {
  useEffect(() => {
    // reserved for future app boot logic
  }, []);

  return (
    // <OfflineWrapper>
    <>
      <div className="z-999999">
        <Toaster position="bottom-center" />
      </div>

      <SocketProvider>
        <Routes>
          {/* ================= AUTH ================= */}
          <Route
            index
            element={
              <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
              
                <LoginPage />
              </GoogleReCaptchaProvider>
            }
          />

          {/* <Route
            path="/auth/signin"
            element={
              <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
                <PageTitle title="Signin | Alehra" />
                <SignIn />
              </GoogleReCaptchaProvider>
            }
          /> */}

          {/* ================= ONBOARDING ================= */}
    

          {/* ================= ADMIN ================= */}

           <Route
            path="/admin/dashboard"
            element={
              // <ProtectedRoute>
                <DefaultLayoutAdmin Heading="Dashboard" text="Analytics Overview">
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <AnalyticsOverview />
                </DefaultLayoutAdmin>
              // </ProtectedRoute>
            }
          />

           <Route
            path="/admin/settings"
            element={
              // <ProtectedRoute>
                <>
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <SettingsPage />
                </>
              // </ProtectedRoute>
            }
          />


          <Route
            path="/admin/kiosk-management"
            element={
              // <ProtectedRoute>
                <DefaultLayoutAdmin Heading="Kiosk Management">
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <KioskManagement />
                </DefaultLayoutAdmin>
              // </ProtectedRoute>
            }
          />

           <Route
            path="/record"
            element={
              // <ProtectedRoute>
                <>
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <VocaAfrica/>
                </>
              // </ProtectedRoute>
            }
          />

           <Route
            path="/admin/analytics"
            element={
              // <ProtectedRoute>
                <DefaultLayoutAdmin Heading="Dashboard">
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <AnalyticsOverview/>
                </DefaultLayoutAdmin>
              // </ProtectedRoute>
            }
          />

           <Route
            path="/admin/new-kiosk"
            element={
              // <ProtectedRoute>
                <DefaultLayoutAdmin Heading="Register New Kiosk">
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <RegisterKiosk/>
                </DefaultLayoutAdmin>
              // </ProtectedRoute>
            }
          />

           <Route
            path="/auth/signin"
            element={
              <>
            
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <LoginPage/>
              
              </>
            }
          />

           <Route
            path="/auth/register"
            element={
              <>
            
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <RegisterPage/>
              
              </>
            }
          />

           <Route
            path="/auth/otp"
            element={
              <>
            
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <OTPPage/>
              
              </>
            }
          />

            <Route
            path="/auth/forget"
            element={
              <>
            
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <ForgotPasswordPage/>
              
              </>
            }
          />


           <Route
            path="/admin/live"
            element={
              // <ProtectedRoute>
                <>
                  <PageTitle title="VocaAfrica | Kiosk Management" />
                  <LiveKioskIntervention/>
                </>
              // </ProtectedRoute>
            }
          />

          {/* ================= ERRORS ================= */}
          <Route
            path="/403"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  403 - Forbidden
                </h1>
              </div>
            }
          />

          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </SocketProvider>
       {/* </OfflineWrapper> */}
      </>
   
  );
}

export default function App() {
  return <MainApp />;
}