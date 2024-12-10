import { useState } from "react";
import { FaEdit, FaTrash, FaPlane } from "react-icons/fa";
import styles from "./FlightList.module.css";
import { formatTime, formatDate } from "../../../../../utils/dateUtils";

function FlightList({ flights, onEdit, onDelete }) {
  const [expandedId, setExpandedId] = useState(null);

  const getStatusClass = (status) => {
    const normalizedStatus = String(status).toUpperCase();
    return `${styles.status} ${
      styles[normalizedStatus.toLowerCase()] || styles.default
    }`;
  };

  const handleDelete = (e, flightId) => {
    e.stopPropagation();
    console.log("Triggering delete for flight ID:", flightId); // Add debug log
    onDelete(flightId);
  };

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <div className={styles.time}>Time</div>
        <div className={styles.flight}>Flight</div>
        <div className={styles.destination}>Location</div>
        <div className={styles.gate}>Gate</div>
        <div className={styles.status}>Status</div>
        <div className={styles.actions}>Actions</div>
      </div>
      <div className={styles.flightsList}>
        {flights.map((flight) => (
          <div key={flight.flightId} className={styles.rowContainer}>
            <div
              className={`${styles.row} ${
                expandedId === flight.flightId ? styles.expanded : ""
              }`}
            >
              <div className={styles.time}>
                <div className={styles.timeValue}>
                  {formatTime(flight.departureTime)}
                </div>
                <div className={styles.date}>
                  {formatDate(flight.departureTime)}
                </div>
              </div>
              <div className={styles.flight}>
                <div className={styles.flightNumber}>{flight.flightNumber}</div>
                <div className={styles.airline}>{flight.airline}</div>
              </div>
              <div className={styles.destination}>
                <div className={styles.cityName}>{flight.arrivalCity}</div>
                <div className={styles.airportCode}>
                  {flight.arrivalAirport}
                </div>
              </div>
              <div className={styles.gate}>
                <div className={styles.gateNumber}>{flight.departureGate}</div>
              </div>
              <div className={getStatusClass(flight.status)}>
                {flight.status}
              </div>
              <div className={styles.actions}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(flight);
                  }}
                  className={`${styles.actionButton} ${styles.editButton}`}
                  title="Edit Flight"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => handleDelete(e, flight.flightId)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  title="Delete Flight"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedId(
                      expandedId === flight.flightId ? null : flight.flightId
                    );
                  }}
                  className={`${styles.actionButton} ${styles.detailsButton}`}
                  title="View Details"
                >
                  <FaPlane />
                </button>
              </div>
            </div>
            {expandedId === flight.flightId && (
              <div className={styles.expandedContent}>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailSection}>
                    <h4>Departure</h4>
                    <p>Time: {formatTime(flight.departureTime)}</p>
                    <p>Date: {formatDate(flight.departureTime)}</p>
                    <p>Airport: {flight.departureAirport}</p>
                    <p>Gate: {flight.departureGate}</p>
                  </div>
                  <div className={styles.detailSection}>
                    <h4>Arrival</h4>
                    <p>Time: {formatTime(flight.arrivalTime)}</p>
                    <p>Date: {formatDate(flight.arrivalTime)}</p>
                    <p>Airport: {flight.arrivalAirport}</p>
                    <p>Gate: {flight.arrivalGate}</p>
                  </div>
                  <div className={styles.detailSection}>
                    <h4>Flight Details</h4>
                    <p>Airline: {flight.airline}</p>
                    <p>Aircraft Capacity: {flight.aircraftCapacity}</p>
                    <p>Passengers: {flight.numberOfPassengers}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FlightList;
