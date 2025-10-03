import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const uploadResume = async (formData) => {
  const response = await axios.post(`${API_URL}/uploadResume`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const startInterview = async (candidateId) => {
  const response = await axios.post(`${API_URL}/startInterview/${candidateId}`);
  return response.data;
};

export const submitAnswer = async (candidateId, questionIndex, answer) => {
  const response = await axios.post(`${API_URL}/submitAnswer/${candidateId}`, {
    questionIndex,
    answer,
  });
  return response.data;
};

export const updateCandidate = async (candidateId, data) => {
  const response = await axios.put(`${API_URL}/candidates/${candidateId}`, data);
  return response.data;
};

export const fetchCandidates = async () => {
  const response = await axios.get(`${API_URL}/candidates`);
  return response.data;
};

export const fetchCandidateById = async (id) => {
  const response = await axios.get(`${API_URL}/candidates/${id}`);
  return response.data;
};
