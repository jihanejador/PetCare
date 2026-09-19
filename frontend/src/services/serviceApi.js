import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getServices = (params = {}) => API.get('/services', { params });
export const getProProfile = (id) => API.get(`/pros/${id}`);
export const createService = (data) => API.post('/services', data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);
export const getProfile = () => API.get('/profile');
export const updateProfile = (formData) => API.post('/profile', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const logout = async () => {
  try {
    await API.post('/logout'); 
  } catch (err) {
    console.error('Erreur Logout:', err);
  } finally {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user');  
    window.location.href = '/login';
  }
};
export const getFavorites = () => API.get('/favorites');
export const toggleFavorite = (service_id) => API.post('/favorites/toggle', { service_id });