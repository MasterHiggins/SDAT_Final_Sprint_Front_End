import { useState } from "react";
import styles from "./FlightCard.module.css";
import { formatTime, formatDate } from "../../../../../../utils/dateUtils";
import BookingModal from "./BookingModal/BookingModal";

const FlightCard = ({ flight }) => {
  const [showModal, setShowModal] = useState(false);

  const handleBooking = (passengerData) => {
    // Booking logic will go here
    console.log("Booking flight with passenger data:", passengerData);
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.flightCard}>
        <div className={styles.flightHeader}>
          <span className={styles.flightNumber}>{flight.flightNumber}</span>
          <span className={styles.airline}>{flight.airline}</span>
          <span className={styles.price}>${flight.price}</span>
        </div>
        <div className={styles.flightDetails}>
          <div className={styles.route}>
            <div className={styles.routePoint}>
              <div className={styles.time}>
                {formatTime(flight.departureTime)}
              </div>
              <div className={styles.date}>
                {formatDate(flight.departureTime)}
              </div>
              <div className={styles.city}>{flight.origin}</div>
            </div>
            <div className={styles.duration}>
              <div className={styles.line}></div>
              <div className={styles.durationText}>2h 30m</div>
            </div>
            <div className={styles.routePoint}>
              <div className={styles.time}>
                {formatTime(flight.arrivalTime)}
              </div>
              <div className={styles.date}>
                {formatDate(flight.arrivalTime)}
              </div>
              <div className={styles.city}>{flight.destination}</div>
            </div>
          </div>
          <div className={styles.flightInfo}>
            <span>Gate {flight.gate}</span>
            <span
              className={`${styles.status} ${
                styles[flight.status.toLowerCase()]
              }`}
            >
              {flight.status}
            </span>
          </div>
        </div>
        <button
          className={styles.selectButton}
          onClick={() => setShowModal(true)}
        >
          Select Flight
        </button>
      </div>

      {showModal && (
        <BookingModal
          flight={flight}
          onClose={() => setShowModal(false)}
          onBooking={handleBooking}
        />
      )}
    </>
  );
};

export default FlightCard;
