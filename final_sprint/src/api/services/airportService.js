import api from "../config/apiConfig";



export const getAirports = async () => {
    try {
      return await api.get("/airports");
    } catch (error) {
      throw error;
    }
  };