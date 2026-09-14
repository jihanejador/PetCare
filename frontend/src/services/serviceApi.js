import API from './axios'; 

export const getServices = (params = {}) => API.get('/services', { params });

export const getProProfile = (id) => API.get(`/pros/${id}`);

export const createService = (data) => API.post('/services', data);
export const updateService = (id, data) => API.put(`/services/${id}`, data);
export const deleteService = (id) => API.delete(`/services/${id}`);