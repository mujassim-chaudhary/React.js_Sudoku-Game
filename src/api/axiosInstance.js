import axios from "axios";
import env from "../config/env";
import apiConfig from "../config/apiconfig";
import { getToken, setToken, removeToken } from "../utils/token";

const axiosInstance = axios.create({
  baseURL: env.API_URL,
  withCredentials: true, // to send refresh token cookies
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
let isRefreshing = false;
let failedRequests = [];

const processQueue = (err, token = null) => {
  failedRequests.forEach((req) => {
    if (err) req.reject(err);
    else req.resolve(token);
  });
  failedRequests = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          env.API_URL + apiConfig.AUTH.REFRESH,
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;

        setToken(newToken);

        processQueue(null, newToken);

        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        removeToken();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
