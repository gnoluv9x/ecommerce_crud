import React from "react";
import DashboardReport from "./DashboardReport";

const Dashboard = () => {
  return (
    <div className="h-100">
      <div className="border-b px-5 py-3">
        <h1 className="mt-2 text-3xl uppercase font-medium">Report</h1>
      </div>
      <div className="px-5 py-3">
        <DashboardReport />
      </div>
    </div>
  );
};

export default Dashboard;
