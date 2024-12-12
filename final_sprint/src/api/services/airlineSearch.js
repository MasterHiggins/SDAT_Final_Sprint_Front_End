// src/api/services/airlineSearch.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/airline";

export const airlineApi = {
  getAll: () => axios.get(`${BASE_URL}`),
};
