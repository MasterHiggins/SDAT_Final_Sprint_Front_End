import api from "../config/apiConfig";

const AIRLINE_ENDPOINT = "/airline";

export const airlineApi = {
  getAll: async () => {
    const response = await api.get(AIRLINE_ENDPOINT);
    return response;
  },
};
