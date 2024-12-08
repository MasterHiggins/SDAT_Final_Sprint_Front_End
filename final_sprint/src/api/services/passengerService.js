import api from "../config/apiConfig";

export const getPassengers = async () => {
  try {
    return await api.get("/passengers");
  } catch (error) {
    throw error;
  }
};
