import axios from 'axios';

const BASE_URL = './api/aircraft';

export const aircraftApi = {
  getAll: () => axios.get(`${BASE_URL}`),
  create: (data) => axios.post(`${BASE_URL}`, data),
  update: (id, data) => axios.put(`${BASE_URL}/${id}`, data),
  delete: (id) => axios.delete(`${BASE_URL}/${id}`)
};
