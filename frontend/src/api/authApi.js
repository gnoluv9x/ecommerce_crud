import { axiosClient } from "./axiosClient";

const authApi = {
  signup(user) {
    const url = "/auth/signup";
    return axiosClient.post(url, user);
  },
  signin(user) {
    const url = "/auth/signin";
    return axiosClient.post(url, user);
  },
  // signout(){
  //     const url ='/signout';
  //     return axiosClient.get(url);
  // }
};
export default authApi;
