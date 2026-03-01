import React from "react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  iconSrc?: string;
  actionLabel?: string;
  onAction?: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here",
  description = "",
  iconSrc = "/images/icon/empty.png",
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center mt-6 text-center">
      <img
        src={iconSrc}
        alt="Empty"
        className="w-40 h-40 text-xs text-center mx-auto mb-2"
      />
      <p className="font-semibold text-gray-700 mb-1">{title}</p>
      {description && <p className="text-sm text-gray-500 mb-3">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-1 text-sm text-white bg-primary rounded-lg"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;