import { useEffect, useState, type ReactNode } from "react";

interface OfflineWrapperProps {
  children: ReactNode;
  offlineImage?: string;
  appName?: string;
  logo?: string;
}

export default function OfflineWrapper({
  children,
  offlineImage = "/offline.jpg",
  appName = "Alehra",
  logo: _logo = "/images/logo/White.png",
}: OfflineWrapperProps) {
  void _logo;
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Set initial state based on browser's navigator.onLine
    setIsOnline(navigator.onLine);

    // Add event listeners for online/offline events
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // If online, render the children
  if (isOnline) {
    return <>{children}</>;
  }

  // If offline, render the offline page
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Logo at top */}
      <div className="absolute top-4 left-4 flex items-center">
        <div className="w-50 h-6 mr-2">
          <img src="/images/logo/telepractice logo.png" alt="Logo" />
        </div>
        {/* <span className="text-gray-600 text-xl font-medium">{appName}</span> */}
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center max-w-md mx-auto text-center">
        {/* Illustration */}
        <div className="mb-6 w-48 h-48 relative">
          <img
            src={offlineImage || "/placeholder.svg"}
            alt="Offline illustration"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        {/* Message */}
        <h1 className="text-3xl font-medium text-gray-800 mb-2">
          You are offline
        </h1>
        <p className="text-gray-600">Go back online to use {appName}</p>
      </div>
    </div>
  );
}
