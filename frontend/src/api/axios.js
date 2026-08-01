import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // replace with your backend port
  withCredentials: true,
});

export default api;