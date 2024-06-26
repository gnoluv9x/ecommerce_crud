import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Orders by month",
    },
  },
};

const OrdersBarChart = () => {
  const [chartData, setchartData] = useState({ labels: [], datasets: [] });

  const { data: reportData } = useSelector(state => state.dashboard.report);

  useEffect(() => {
    if (reportData && reportData.length > 0) {
      const labels = [],
        datasets = [];

      reportData.forEach(item => {
        labels.push(item.dayInMonths);
        datasets.push(item.totalOrders);
      });

      const data = {
        labels,
        datasets: [
          {
            data: datasets,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };

      setchartData(data);
    }
  }, [reportData]);

  return (
    <div className="w-100">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default OrdersBarChart;
