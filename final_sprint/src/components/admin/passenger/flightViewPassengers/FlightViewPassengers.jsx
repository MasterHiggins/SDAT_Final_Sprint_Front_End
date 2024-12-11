import styles from "./FlightViewPassengers.module.css";

const FlightViewPassengers = ({ isOpen, onClose, flights = [] }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2>Passenger Flight History</h2>
        <div className={styles.form}>
          {flights.length > 0 ? (
            <ul className={styles.flightList}>
              {flights.map((flight) => (
                <li key={flight.id} className={styles.flightItem}>
                  <span>Model: {flight.model}</span>
                  <span>Capacity: {flight.capacity}</span>
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
