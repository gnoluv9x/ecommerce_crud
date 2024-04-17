import { axiosClient } from "./axiosClient";

const userApi = {
  list() {
    const url = `/users`;
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/users/${id}`;
    return axiosClient.delete(url);
  },
  update(id, data) {
    const url = `/users/${id}`;
    return axiosClient.put(url, data);
  },
  read(id) {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },
};
export default userApi;
