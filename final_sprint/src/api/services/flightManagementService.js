import api from "../config/apiConfig";

const FLIGHT_STATUSES = {
  SCHEDULED: "Scheduled",
  ACTIVE: "Active",
  DELAYED: "Delayed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

const getAllFlights = async () => {
  try {
    console.log("Fetching all flights...");
    const response = await api.get("/api/flightboard");
    console.log("Flights fetched:", response);
    return response;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

const createFlight = async (flightData) => {
  try {
    console.log("Creating flight:", flightData);
    const response = await api.post("/api/flightboard/flight", flightData);
    console.log("Flight created:", response);
    return response;
  } catch (error) {
    console.error("Error creating flight:", error);
    throw error;
  }
};

const updateFlight = async (id, flightData) => {
  try {
    const payload = {
      ...flightData,
      status: FLIGHT_STATUSES[flightData.status] || "Scheduled",
    };
    const response = await api.put(`/api/flightboard/flight/${id}`, payload);
    return response;
  } catch (error) {
    console.error("Error updating flight:", error);
    throw error;
  }
};

export const flightManagementService = {
  getAllFlights,
  createFlight,
  updateFlight,
  FLIGHT_STATUSES,
};
