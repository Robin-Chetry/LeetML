import api from "./axios";

export const getProblems = async (params = {}) => {
  const response = await api.get("/problem", {
    params,
  });

  return response.data;
};

export const getProblemById = async (id) => {
  const response = await api.get(`/problem/${id}`);
  return response.data;
};

export const getUserSubmissions = async (params) => {
  const response = await api.get("/problem/mySubmissions", {
    params,
  });

  return response.data;
};

export const getSubmissionById = async (id) => {
  const response = await api.get(
    `/problem/submission/${id}`
  );

  return response.data;
};