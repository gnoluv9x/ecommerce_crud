import { axiosClient } from "./axiosClient";

const dashboardApi = {
  getSummaryDays(params) {
    const url = `/orders/summary-days`;
    return axiosClient.get(url, { params });
  },
  getReportDays(params) {
    const url = `/orders/report-days`;
    return axiosClient.get(url, { params });
  },
};
export default dashboardApi;
