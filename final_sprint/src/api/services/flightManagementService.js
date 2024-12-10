import api from "../config/apiConfig";

// Match backend enum cases exactly
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
    // Transform status to match backend enum
    const payload = {
      ...flightData,
      status: FLIGHT_STATUSES[flightData.status] || "Scheduled",
    };

    console.log("Creating flight with payload:", payload);
    const response = await api.post("/api/flightboard/flight", payload);
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

const deleteFlight = async (id) => {
  try {
    console.log("Deleting flight:", id);
    const response = await api.delete(`/flights/${id}`);
    console.log("Flight deleted:", response);
    return response;
  } catch (error) {
    console.error("Error deleting flight:", error);
    throw error;
  }
};

export const flightManagementService = {
  getAllFlights,
  createFlight,
  updateFlight,
  deleteFlight,
  FLIGHT_STATUSES,
};
