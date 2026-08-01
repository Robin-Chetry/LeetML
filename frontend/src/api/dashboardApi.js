import api from "./axios";

export const getDashboardStats = async () => {
  const response = await api.get("/user/dashboard");
  return response.data;
};