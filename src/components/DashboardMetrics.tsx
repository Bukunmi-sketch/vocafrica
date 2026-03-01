import React from "react";
import CardDataStats from "./CardDataStats";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";

const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <CardDataStats title="All Appointments" total="320" rate="+20" levelUp> <FaCalendarAlt className="text-black text-2xl" /> </CardDataStats>
      
      <CardDataStats title="Total Clients" total="2500" rate="+20" levelUp> <FaUsers className="text-black text-2xl" /> </CardDataStats>
      <CardDataStats title="Total Providers" total="25" rate="+20" levelUp> <FaUsers className="text-black text-2xl" /> </CardDataStats>
    </div>
  );
};

export default DashboardMetrics;
