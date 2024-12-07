import { useState, useEffect } from "react";
import styles from "./FlightBoard.module.css";
import FlightTable from "./FlightTable/FlightTable";
import FilterButtons from "./FilterButtons/FilterButtons";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { getFlights } from "../../../api/services/flightService";

const FlightBoard = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError(null);
      const flightData = await getFlights();
      setFlights(flightData);
    } catch (error) {
      setError("Failed to fetch flights");
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  // Updated filtering logic based on destination/source airport
  const filteredFlights = flights.filter((flight) => {
    // For now, we'll consider all flights as departures since we're showing destination
    // This can be updated once we have more specific departure/arrival data
    if (activeFilter === "departures") return true;
    if (activeFilter === "arrivals") return false;
    return true; // Show all flights when "all" is selected
  });

  if (loading) {
    return <LoadingSpinner message="Loading flights..." />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Flight Board</h1>
      <FilterButtons
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <FlightTable flights={filteredFlights} />
    </div>
  );
};

export default FlightBoard;
