// aircraftSearch.js
import api, { BASE_URL } from "../config/apiConfig";

const AIRCRAFT_ENDPOINT = "/aircraft";

export const aircraftApi = {
  getAll: () => api.get(AIRCRAFT_ENDPOINT),
  create: (data) => api.post(AIRCRAFT_ENDPOINT, data),
  update: (id, data) => api.put(`${AIRCRAFT_ENDPOINT}/${id}`, data),
  delete: (id) => api.delete(`${AIRCRAFT_ENDPOINT}/${id}`),
};
