import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { API_URL } from "./config";

const baseURL = API_URL || "/api";

const api = axios.create({
  baseURL,
});

api.defaults.withCredentials = true;

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data.data;
  },
  (error) => {
    console.error("API error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
