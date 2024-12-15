import axios from "axios";

export const BASE_URL =
  "http://Aviation-Mangementv3-env.eba-qzqmmx3p.ca-central-1.elasticbeanstalk.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
  },
});

api.interceptors.request.use(
  (config) => {
    // Any request processing can be added here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || "An error occurred";
    console.error("API Error:", errorMessage);
    return Promise.reject(error);
  }
);

export default api;
