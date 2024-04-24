import { axiosClient } from "./axiosClient";

export const checkoutApi = {
  create(body) {
    const url = `/checkout/create_payment_url`;
    return axiosClient.post(url, body);
  },
};
export default checkoutApi;
