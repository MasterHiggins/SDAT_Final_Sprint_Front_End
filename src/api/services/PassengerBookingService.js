import api from "../config/apiConfig";

export const checkExistingPassenger = async (
  firstName,
  lastName,
  phoneNumber
) => {
  try {
    console.log("Checking existing passenger:", {
      firstName,
      lastName,
      phoneNumber,
    });
    const response = await api.get("/passengers");
    console.log("All passengers response:", response);

    const existingPassenger = response.find(
      (passenger) =>
        passenger.firstName.toLowerCase() === firstName.toLowerCase() &&
        passenger.lastName.toLowerCase() === lastName.toLowerCase() &&
        passenger.phoneNumber === phoneNumber
    );

    // Add ID validation logging
    if (existingPassenger) {
      console.log("Found passenger with ID:", existingPassenger.id);
    }

    console.log("Found existing passenger:", existingPassenger);
    return existingPassenger;
  } catch (error) {
    console.error("Error checking existing passenger:", error);
    throw error;
  }
};

export const createPassenger = async (passengerData) => {
  try {
    console.log("Creating passenger with data:", passengerData);

    const payload = {
      firstName: passengerData.firstName,
      lastName: passengerData.lastName,
      phoneNumber: passengerData.phoneNumber,
      passengerCity: passengerData.city, // Changed from city.name
    };

    console.log("Create passenger payload:", payload);
    const response = await api.post("/passengers", payload);
    console.log("Create passenger response:", response);
    return response;
  } catch (error) {
    console.error("Error creating passenger:", error);
    throw error;
  }
};

export const bookFlight = async (passengerId, flightId) => {
  try {
    // Add pre-request validation
    console.log("Attempting to book flight with IDs:", {
      passengerId,
      flightId,
      passengerIdType: typeof passengerId,
      flightIdType: typeof flightId,
    });

    if (!passengerId || !flightId) {
      const error = new Error("Missing passenger ID or flight ID");
      console.error("Validation failed:", error);
      throw error;
    }

    const response = await api.post(
      `/passengers/${passengerId}/book/${flightId}`
    );
    console.log("Booking response:", response);
    return response;
  } catch (error) {
    console.error("Booking error details:", {
      error,
      passengerId,
      flightId,
    });
    throw error;
  }
};

export const updatePassenger = async (id, passengerData) => {
  try {
    const payload = {
      firstName: passengerData.firstName,
      lastName: passengerData.lastName,
      phoneNumber: passengerData.phoneNumber,
      passengerCity: passengerData.city, // Changed from city.name
    };

    const response = await api.put(`/passengers/${id}`, payload);
    return response;
  } catch (error) {
    console.error("Error updating passenger:", error);
    throw error;
  }
};
