import api from "../config/apiConfig";

export const getFlights = async () => {
  try {
    return await api.get("/api/flightboard");
  } catch (error) {
    throw error;
  }
};
