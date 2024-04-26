import { axiosClient } from "./axiosClient";

const BASE = "/auth";

const authApi = {
  signup(user) {
    const url = `${BASE}/signup`;
    return axiosClient.post(url, user);
  },
  signin(user) {
    const url = `${BASE}/signin`;
    return axiosClient.post(url, user);
  },
  forgotPassword(body) {
    const url = `${BASE}/forgot-password`;
    return axiosClient.post(url, body);
  },
};
export default authApi;
