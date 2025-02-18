import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/joke';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const getRandomJoke = () => api.get('/').then((res) => res.data);
export const getJokeById = (id) => api.get(`/${id}`).then((res) => res.data);
export const deleteJokeById = ({ id }) => api.delete(`/${id}`).then((res) => res.data);

export const voteJoke = async ({ id, content }) => {
  try {
    const response = await api.post(`/${id}`, content);
    return response.data;
  } catch (error) {
    console.error('Error voting joke:', error);
    return { success: false, error: error.message };
  }
};

export const updateJoke = async ({ id, content }) => {
  try {
    const response = await api.put(`/${id}`, content);
    return response.data;
  } catch (error) {
    console.error('Error updating joke:', error);
    throw new Error(error.response?.data?.message || 'Failed to update joke');
  }
};

export default { getRandomJoke, getJokeById, voteJoke, updateJoke, deleteJokeById };
