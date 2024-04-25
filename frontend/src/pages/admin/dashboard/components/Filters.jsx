import React, { useState } from "react";
import { LIST_MONTHS_IN_YEAR, LIST_YEARS } from "../constants";

const DashboardFilters = ({ filters, onChangeFilters }) => {
  const [currentMonth, setCurrentMonth] = useState(filters.month);
  const [currentYear, setCurrentYear] = useState(filters.year);

  const handleView = () => {
    onChangeFilters({ month: currentMonth, year: currentYear });
  };

  const handleChangeMonth = event => {
    setCurrentMonth(event.target.value);
  };

  const handleChangeYear = event => {
    setCurrentYear(event.target.value);
  };

  return (
    <div className="dashboard-filters mt-2 grid grid-cols-8 gap-2">
      <div className="dashboard-month col-span-1">
        <label for="month" class="block text-sm font-medium text-gray-600 dark:text-white">
          Chọn tháng
        </label>
        <select
          id="month"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full
          p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChangeMonth}
        >
          {LIST_MONTHS_IN_YEAR.map(month => (
            <option value={month.value} selected={month.value === currentMonth}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
      <div className="dashboard-year col-span-1">
        <label for="year" class="block text-sm font-medium text-gray-600 dark:text-white">
          Chọn năm
        </label>
        <select
          id="year"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full
          p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChangeYear}
        >
          {LIST_YEARS.map(year => (
            <option value={year.value} selected={year.value === currentYear}>
              {year.label}
            </option>
          ))}
        </select>
      </div>
      <div className="btn-view flex items-end">
        <button
          type="button"
          class="text-white bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2"
          onClick={handleView}
        >
          Xem
        </button>
      </div>
    </div>
  );
};

export default DashboardFilters;
