// src/api/axiosClient.ts
import axios from 'axios';

/**
 * Base URL:
 * - Reads from Vite env: import.meta.env.VITE_API_BASE_URL
 * - Falls back to localhost:5000
 */
const baseURL =
  import.meta.env.VITE_API_BASE_URL?.toString() || 'http://localhost:5000';

const axiosClient = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: attach JWT if present for protected endpoints
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
export { baseURL };
