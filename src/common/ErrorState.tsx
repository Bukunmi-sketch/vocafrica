import React from "react";
import { MdCloudOff } from "react-icons/md";
import { RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  subMessage?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Oops! Unable to fetch your appointment data.",
  subMessage = "Please check your connection or try again.",
  onRetry,
  isRetrying = false,
}) => {
  return (
    <div className="flex flex-col items-center mt-10 text-center">
      <MdCloudOff className="text-primary text-5xl mb-3" />
      <p className="text-primary font-semibold text-sm mb-1">{message}</p>
      <p className="text-gray-600 text-xs mb-3">{subMessage}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className={`mt-3 px-4 py-2 text-sm text-white bg-primary hover:bg-red-600 rounded-lg flex items-center gap-2 transition-all duration-200 ${
            isRetrying ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <RefreshCw
            className={`${isRetrying ? "animate-spin-slow" : ""}`}
            size={16}
          />
          {isRetrying ? "Refreshing..." : "Refresh"}
        </button>
      )}
    </div>
  );
};
