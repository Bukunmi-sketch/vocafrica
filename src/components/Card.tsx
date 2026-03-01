import React from "react";

interface CardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    // <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
    <div className="rounded-lg border border-stroke bg-white  flex items-center py-6 px-7.5  dark:border-strokedark dark:bg-boxdark">
      <div className="text-indigo-600 text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default Card;
