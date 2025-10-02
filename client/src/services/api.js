import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

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
