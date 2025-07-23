import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Optional: attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};
