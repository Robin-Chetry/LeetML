import api from "./axios";

export const signupUser = async (userData) => {
  const response = await api.post("/user/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/user/login", userData);
  return response.data;
};

export const checkAuth = async () => {
  const response = await api.get("/user/check");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/user/profile");
  return response.data;
};