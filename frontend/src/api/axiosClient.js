import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: params =>
    queryString.stringify(params, { skipNull: true, skipEmptyString: true }),
  withCredentials: true,
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

// Interceptors
axiosClient.interceptors.request.use(function (config) {
  config.headers = {
    ...config.headers,
    Authorization: Cookies.get("accessToken"),
  };

  return config;
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error?.response?.status === 401 && !window.location.href.includes("/signin")) {
      try {
        const { config } = error;

        const refreshResp = await axiosClient.post("/refreshToken");

        if (refreshResp.data?.accessToken) {
          const user = JSON.parse(localStorage.getItem("user"));
          user.token = refreshResp.data.accessToken;
          localStorage.setItem("user", JSON.stringify(user));
          Cookies.set("accessToken", refreshResp.data.accessToken);
          return axiosClient(config);
        } else {
          throw Error("Không nhận được accessToken");
        }
      } catch (error) {
        console.log("Debug_here error: ", error);
        if (localStorage.getItem("user")) {
          localStorage.removeItem("user");
        }
        localStorage.removeItem("cart");
        localStorage.removeItem("cartNumber");
        localStorage.removeItem("totalPrice");
        dispatchEvent(new Event("storage"));
        Cookies.remove("refreshToken");
        Cookies.remove("accessToken");
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export { axiosClient };
