import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // replace with your backend port
  withCredentials: true,
});

export default api;