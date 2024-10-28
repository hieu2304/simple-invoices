import axios from "axios";
import { API_URL_USER } from "../constant";

const axiosInstance = axios.create({
  baseURL: API_URL_USER,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    const orgToken = localStorage.getItem("org_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (orgToken) {
      config.headers["org_token"] = orgToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
