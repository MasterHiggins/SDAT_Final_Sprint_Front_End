import { useState } from "react";
import styles from "./FlightTable.module.css";
import FlightRow from "../FlightRow/FlightRow";

const FlightTable = ({ flights, viewType }) => {
  const [expandedFlights, setExpandedFlights] = useState(new Set());

  const toggleFlightExpansion = (flightNumber) => {
    setExpandedFlights((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(flightNumber)) {
        newExpanded.delete(flightNumber);
      } else {
        newExpanded.add(flightNumber);
      }
      return newExpanded;
    });
  };

  if (!flights || flights.length === 0) {
    return (
      <div className={styles.noFlights}>
        <p>No flights scheduled</p>
      </div>
    );
  }

  // Adjust header text based on view type
  const getLocationHeader = () => {
    if (viewType === "departures") return "Destination";
    if (viewType === "arrivals") return "Origin";
    return "Location";
  };

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <div className={styles.time}>Time</div>
        <div className={styles.flight}>Flight</div>
        <div className={styles.destination}>{getLocationHeader()}</div>
        <div className={styles.gate}>Gate</div>
        <div className={styles.status}>Status</div>
      </div>
      <div className={styles.flightsList}>
        {flights.map((flight) => (
          <FlightRow
            key={flight.flightNumber}
            flight={flight}
            viewType={viewType}
            isExpanded={expandedFlights.has(flight.flightNumber)}
            onToggleExpand={() => toggleFlightExpansion(flight.flightNumber)}
          />
        ))}
      </div>
    </div>
  );
};

export default FlightTable;
