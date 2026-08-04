import axios from "./axios";

export const runCode = async (problemId, payload) => {
  const response = await axios.post(
    `/submission/run/${problemId}`,
    payload
  );

  return response.data;
};

export const submitCode = async (problemId, payload) => {
  const response = await axios.post(
    `/submission/submit/${problemId}`,
    payload
  );

  return response.data;
};

export const getProblemSubmissions = async (problemId) => {
  const response = await axios.get(
    `/problem/submittedProblem/${problemId}`
  );

  return response.data;
};