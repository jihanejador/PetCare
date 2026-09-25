import api from '../api/axios';

export const getServices = (params = {}) => api.get('/services', { params });
export const getProProfile = (id) => api.get(`/pros/${id}`);
export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);
export const getProfile = () => api.get('/profile');
export const updateProfile = (formData) => api.post('/profile', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const getFavorites = () => api.get('/favorites');
export const toggleFavorite = (service_id) => api.post('/favorites/toggle', { service_id });
