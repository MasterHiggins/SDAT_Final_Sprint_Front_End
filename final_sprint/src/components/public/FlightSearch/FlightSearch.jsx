import { useState } from "react";
import styles from "./FlightSearch.module.css";
import SearchForm from "./SearchForm/SearchForm";
import SearchResults from "./SearchForm/SearchResults/SearchResults";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { searchFlights } from "../../../api/services/flightSearch";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (searchParams) => {
    console.log("Search initiated with params:", searchParams); // Debug log
    setLoading(true);

    try {
      console.log("Calling searchFlights service..."); // Debug log
      const results = await searchFlights(searchParams);
      console.log("Search results:", results); // Debug log

      setFlights(results);
      setSearched(true);
    } catch (error) {
      console.error("Error searching flights:", error);
      // Add more detailed error logging
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  console.log("Current flights state:", flights); // Debug log
  console.log("Loading state:", loading); // Debug log
  console.log("Searched state:", searched); // Debug log

  return (
    <div className={styles.container}>
      <h1>Search Flights</h1>
      <SearchForm onSearch={handleSearch} loading={loading} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        searched && <SearchResults flights={flights} />
      )}
    </div>
  );
};

export default FlightSearch;
