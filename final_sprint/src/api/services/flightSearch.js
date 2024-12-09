import api from "../config/apiConfig";
import { formatDate } from "../../../utils/dateUtils";

export const searchFlights = async (searchParams) => {
  try {
    console.log("Search params:", searchParams);
    const response = await api.get("/api/flightboard");

    if (!response || !Array.isArray(response)) {
      return [];
    }

    const flights = response;

    const filteredFlights = flights.filter((flight) => {
      const searchOrigin = searchParams.origin?.toUpperCase() || "";
      const searchDestination = searchParams.destination?.toUpperCase() || "";

      const matchesOrigin =
        !searchOrigin ||
        flight.departureAirport === searchOrigin ||
        flight.departureCity
          ?.toLowerCase()
          .includes(searchOrigin.toLowerCase());

      const matchesDestination =
        !searchDestination ||
        flight.arrivalAirport === searchDestination ||
        flight.arrivalCity
          ?.toLowerCase()
          .includes(searchDestination.toLowerCase());

      // Use formatDate utility to normalize dates
      const flightDate = formatDate(flight.departureTime);
      const searchDate = formatDate(searchParams.departureDate);

      const matchesDate =
        !searchParams.departureDate || flightDate === searchDate;

      console.log("Date comparison:", {
        flightDate,
        searchDate,
        rawFlightDate: flight.departureTime,
        rawSearchDate: searchParams.departureDate,
        matchesDate,
      });

      return matchesOrigin && matchesDestination && matchesDate;
    });

    console.log("Filtered flights:", filteredFlights);
    return filteredFlights;
  } catch (error) {
    console.error("Search service error:", error);
    return [];
  }
};
