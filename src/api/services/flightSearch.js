import api from "../config/apiConfig";

export const searchFlights = async (searchParams) => {
  try {
    console.log("Search params:", searchParams);
    const response = await api.get("/api/flightboard");

    if (!response || !Array.isArray(response)) {
      return [];
    }

    const flights = response;

    // Helper function to format date to YYYY-MM-DD
    const formatDateForComparison = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    };

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

      // Format dates for comparison
      const flightDate = formatDateForComparison(flight.departureTime);
      const searchDate = formatDateForComparison(searchParams.departureDate);

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
