import api from "../config/apiConfig";

const FLIGHT_STATUSES = {
  SCHEDULED: "Scheduled",
  ACTIVE: "Active",
  DELAYED: "Delayed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

const flightFormService = {
  // Get reference data for form dropdowns
  getReferenceData: async () => {
    try {
      const response = await api.get("/api/flight-management/reference-data");
      console.log("Raw API response:", response);

      // Check if response exists and has data
      if (!response) {
        console.error("No response from API");
        return null;
      }

      // Access data from response (depends on your API interceptor setup)
      const data = response.data || response;
      console.log("Parsed reference data:", data);

      return {
        airlines: data.airlines || [],
        aircraft: data.aircraft || [],
        airports: data.airports || [],
        gatesByAirport: data.gatesByAirport || {},
      };
    } catch (error) {
      console.error("Error fetching reference data:", error);
      throw error;
    }
  },

  // Create new flight
  createFlight: async (flightData) => {
    try {
      console.log("Creating flight with data:", flightData);
      const response = await api.post(
        "/api/flight-management/flights",
        flightData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating flight:", error);
      throw error;
    }
  },

  // Update flight
  updateFlight: async (id, flightData) => {
    try {
      console.log("Updating flight with ID:", id);
      const response = await api.put(
        `/api/flight-management/flights/${id}`,
        flightData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating flight:", error);
      throw error;
    }
  },

  // Helper methods
  getGatesForAirport: (referenceData, airportId) => {
    return referenceData.gatesByAirport[airportId] || [];
  },

  getAircraftCapacity: (referenceData, aircraftId) => {
    const aircraft = referenceData.aircraft.find(
      (a) => a.id === parseInt(aircraftId)
    );
    return aircraft ? aircraft.capacity : null;
  },
};

export default flightFormService;
