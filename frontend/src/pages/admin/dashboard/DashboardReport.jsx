import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Dashboard_report, Dashboard_summary } from "../../../slice/dashboardSlice";
import DashboardFilters from "./components/Filters";
import OrdersBarChart from "./components/OrdersBarChart";
import PricesBarChart from "./components/PricesBarChart";
import DashboardSummary from "./components/DashboardSummary";
import OrderRate from "./components/OrderRate";

const DashboardReport = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(() => {
    const month = dayjs().month() + 1;
    const year = dayjs().year();

    return { month: `0${month}`.slice(-2), year: String(year) };
  });

  const handleChangeFilters = values => {
    setFilters(prevFilters => ({ ...prevFilters, ...values }));
  };

  useEffect(() => {
    const date = filters.month + "/" + filters.year;
    dispatch(Dashboard_report(date));
    dispatch(Dashboard_summary(date));
  }, [filters]);

  return (
    <div className="w-100">
      <DashboardFilters filters={filters} onChangeFilters={handleChangeFilters} />

      <div className="mt-6">
        <DashboardSummary />
      </div>

      <div className="mt-3 flex justify-center">
        <OrderRate />
      </div>

      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <OrdersBarChart />
        </div>
        <div className="col-span-1">
          <PricesBarChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardReport;
