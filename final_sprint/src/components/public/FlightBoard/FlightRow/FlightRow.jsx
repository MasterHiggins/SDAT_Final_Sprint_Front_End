import styles from "./FlightRow.module.css";
import { formatTime, formatDate } from "../../../../utils/dateUtils";

const FlightRow = ({ flight, viewType, isExpanded, onToggleExpand }) => {
  const getDisplayTime = () => {
    const datetime =
      viewType === "arrivals" ? flight.arrivalTime : flight.departureTime;
    return {
      time: formatTime(datetime),
      date: formatDate(datetime),
    };
  };

  const getDisplayLocation = () => {
    return viewType === "arrivals"
      ? flight.departureGate // Show origin city for arrivals
      : flight.arrivalGate; // Show destination city for departures
  };

  const getDisplayGate = () => {
    return viewType === "arrivals"
      ? flight.arrivalCity // Show arrival gate (A1)
      : flight.departureCity; // Show departure gate (B2)
  };

  const getStatusClass = (status) => {
    // Ensure status is a string and uppercase
    const normalizedStatus = String(status).toUpperCase();

    const statusClasses = {
      SCHEDULED: `${styles.status} ${styles.scheduled}`,
      ACTIVE: `${styles.status} ${styles.active}`,
      DELAYED: `${styles.status} ${styles.delayed}`,
      CANCELLED: `${styles.status} ${styles.cancelled}`,
    };
    return (
      statusClasses[normalizedStatus] || `${styles.status} ${styles.default}`
    );
  };

  const timeInfo = getDisplayTime();

  return (
    <div className={styles.rowContainer}>
      <div
        className={`${styles.row} ${isExpanded ? styles.expanded : ""}`}
        onClick={onToggleExpand}
      >
        <div className={styles.time}>
          <div className={styles.timeValue}>{timeInfo.time}</div>
          <div className={styles.date}>{timeInfo.date}</div>
        </div>
        <div className={styles.flight}>
          <div className={styles.flightNumber}>{flight.flightNumber}</div>
          <div className={styles.airline}>{flight.airline}</div>
        </div>
        <div className={styles.destination}>{getDisplayLocation()}</div>
        <div className={styles.gate}>{getDisplayGate()}</div>
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
  );
};

export default FlightRow;
