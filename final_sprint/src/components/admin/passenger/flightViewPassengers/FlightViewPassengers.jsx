import styles from "./FlightViewPassengers.module.css";

const FlightViewPassengers = ({ isOpen, onClose, flights = [] }) => {
  if (!isOpen) return null;

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2>Passenger Flight History</h2>
        <div className={styles.form}>
          {flights.length > 0 ? (
            <ul className={styles.flightList}>
              {flights.map((flight) => (
                <li key={flight.id} className={styles.flightItem}>
                  <span>Flight Number: {flight.flightNumber}</span>
                  <span>Date: {formatDateTime(flight.departureTime)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No flight history to show</p>
          )}
        </div>
        <div className={styles.actions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightViewPassengers;
