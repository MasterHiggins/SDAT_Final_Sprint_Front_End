import { useState } from "react";
import styles from "./FlightRow.module.css";

const FlightRow = ({ flight, isExpanded, onToggleExpand }) => {
  const formatTime = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      SCHEDULED: styles.scheduled,
      ACTIVE: styles.active,
      DELAYED: styles.delayed,
      CANCELLED: styles.cancelled,
    };
    return statusClasses[status] || styles.default;
  };

  return (
    <div className={styles.rowContainer}>
      <div
        className={`${styles.row} ${isExpanded ? styles.expanded : ""}`}
        onClick={onToggleExpand}
      >
        <div className={styles.time}>{formatTime(flight.departureTime)}</div>
        <div className={styles.flight}>
          <span className={styles.flightNumber}>{flight.flightNumber}</span>
          <span className={styles.airline}>{flight.airline}</span>
        </div>
        <div className={styles.destination}>{flight.arrivalAirport}</div>
        <div className={styles.gate}>{flight.departureGate}</div>
        <div className={`${styles.status} ${getStatusClass(flight.status)}`}>
          {flight.status}
        </div>
      </div>

      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.detailsGrid}>
            <div className={styles.detailSection}>
              <h4>Departure</h4>
              <p>Time: {formatTime(flight.departureTime)}</p>
              <p>Gate: {flight.departureGate}</p>
              <p>Airport: {flight.departureAirport}</p>
            </div>
            <div className={styles.detailSection}>
              <h4>Arrival</h4>
              <p>Time: {formatTime(flight.arrivalTime)}</p>
              <p>Gate: {flight.arrivalGate}</p>
              <p>Airport: {flight.arrivalAirport}</p>
            </div>
            <div className={styles.detailSection}>
              <h4>Flight Details</h4>
              <p>Aircraft Capacity: {flight.aircraftCapacity}</p>
              <p>Passengers: {flight.numberOfPassengers}</p>
              <p>Airline: {flight.airline}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightRow;
