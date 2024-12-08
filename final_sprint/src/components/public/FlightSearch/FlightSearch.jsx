import { useState } from "react";
import styles from "./FlightSearch.module.css";
import SearchForm from "./SearchForm/SearchForm";
import SearchResults from "./SearchForm/SearchResults/SearchResults";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";

const FlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (searchParams) => {
    setLoading(true);
    try {
      // API call will go here
      setLoading(false);
      setSearched(true);
      // Temporarily set empty array until we connect the API
      setFlights([]);
    } catch (error) {
      console.error("Error searching flights:", error);
      setLoading(false);
    }
  };

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
