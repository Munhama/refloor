import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    const s = err?.response?.status;
    const d = err?.response?.data;
    console.error("API error:", s, d || err.message);
    return Promise.reject(err);
  }
);
