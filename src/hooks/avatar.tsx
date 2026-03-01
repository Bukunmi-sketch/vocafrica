import React from "react";
export const Avatar: React.FC<{
  name: string;
  profilePicture?: string;
  size?: number;
}> = ({ name, profilePicture, size = 45 }) => {
  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : fullName.slice(0, 2).toUpperCase();
  };

  const getDisplayName = (fullName: string) => {
    if (!fullName || fullName.trim() === "") {
      return "Anonymous User"; // Alternative name if first and last name are missing
    }
    return fullName;
  };

  const displayName = getDisplayName(name);

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500  text-white font-semibold`}
      style={{ width: size, height: size }}
    >
      {profilePicture ? (
        <img
          src={profilePicture}
          alt={displayName}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="text-md">{getInitials(displayName)}</span>
      )}
    </div>
  );
};
