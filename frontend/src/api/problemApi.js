import api from "./axios";

export const getProblems = async (params = {}) => {
  const response = await api.get("/problem", {
    params,
  });

  return response.data;
};