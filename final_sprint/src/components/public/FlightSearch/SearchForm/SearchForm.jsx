import { useState } from "react";
import SearchFields from "./SearchFields/SearchFields";
import DateFields from "./DateFields/DateFields";
import PassengerField from "../PassengerField/PassengerField";
import styles from "./SearchForm.module.css";

const SearchForm = ({ onSearch, loading }) => {
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <SearchFields
        origin={searchParams.origin}
        destination={searchParams.destination}
        onChange={handleChange}
      />

      <DateFields
        departureDate={searchParams.departureDate}
        returnDate={searchParams.returnDate}
        onChange={handleChange}
      />

      <PassengerField
        passengers={searchParams.passengers}
        onChange={handleChange}
      />

      <button type="submit" className={styles.searchButton} disabled={loading}>
        {loading ? "Searching..." : "Search Flights"}
      </button>
    </form>
  );
};

export default SearchForm;
