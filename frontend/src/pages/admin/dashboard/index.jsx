import React from "react";
import DashboardReport from "./DashboardReport";

const Dashboard = () => {
  return (
    <div className="h-100">
      <div className="px-5 py-3">
        <h1 className="mt-2 text-2xl uppercase font-medium">Báo cáo</h1>
        <DashboardReport />
      </div>
    </div>
  );
};

export default Dashboard;
