import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getPercentageOfAItem } from "../helper";

ChartJS.register(ArcElement);

const options = {
  plugins: {
    legend: {
      position: "bottom",
    },
    datalabels: {
      color: "#fff",
      formatter: function (_, context) {
        const srcDataSets = context.dataset.data;
        return getPercentageOfAItem(srcDataSets, context.dataIndex);
      },
      font: {
        size: 15,
        weight: 600,
      },
    },
  },
  cutout: "60%",
  responsive: true,
  maintainAspectRatio: true,
};

const textCenter = {
  id: "textCenter",
  beforeDatasetsDraw(chart) {
    const { ctx } = chart;

    ctx.save();

    const x = chart.getDatasetMeta(0).data[0].x;
    const y = chart.getDatasetMeta(0).data[0].y;

    // Style for normal text
    ctx.font = "600 14px sans-serif";
    ctx.fillStyle = "#7E8698";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Style for total number
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#12161C";
    ctx.fillText("Tỉ lệ đơn hàng", x, y);

    ctx.restore();
  },
};

function OrderRate() {
  const { data: summaryData } = useSelector(state => state.dashboard.summary);

  const data = useMemo(() => {
    return {
      labels: ["Thành công", "Chờ duyệt", "Huỷ"],
      datasets: [
        {
          data: [
            summaryData?.totalOrderSuccess || 0,
            summaryData?.totalOrderPending || 0,
            summaryData?.totalOrderCancel || 0,
          ],
          backgroundColor: ["#8ad199", "#ddb78a", "#F63D68"],
          hoverOffset: 3,
        },
      ],
    };
  }, [summaryData]);

  return (
    <div className="w-80 h-80">
      <Doughnut
        data={data}
        options={options}
        plugins={[textCenter, ChartDataLabels, Tooltip, Legend]}
      />
    </div>
  );
}

export default OrderRate;
