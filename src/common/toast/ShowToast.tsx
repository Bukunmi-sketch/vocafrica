import toast from "react-hot-toast";
import { ReactNode } from "react";

type ToastType = "success" | "error" | "info" | "warning";

export const ShowToast = (
  type: ToastType | "custom",
  message: string | ReactNode,
  duration: number = 6000,
) => {
  const baseStyle =
    "max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 p-4";

  const toastMap = {
    success: toast.success,
    error: toast.error,
    info: toast,
    warning: toast,
  } as const;

  if (type !== "custom") {
    // Cast to Message type safely
    return toastMap[type](message as Parameters<typeof toast.success>[0], {
      duration,
    });
  }

  // For custom advanced UI toasts
  return toast.custom((t) => (
    <div
      className={`${t.visible ? "animate-enter" : "animate-leave"} ${baseStyle}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M12 5a7 7 0 110 14a7 7 0 010-14z"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1 text-gray-900 text-sm">
          <p className="font-bold">Error</p>
          <p className="mt-1 text-gray-700">{message}</p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-4 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
  ));
};
