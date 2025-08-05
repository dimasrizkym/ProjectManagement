import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}` || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    // You can add any request interceptors here
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default apiClient;
