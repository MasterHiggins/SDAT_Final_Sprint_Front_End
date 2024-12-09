const BASE_URL = "/api";

const getAllFlights = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/flightboard");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const flightManagementService = {
  getAllFlights,
};
