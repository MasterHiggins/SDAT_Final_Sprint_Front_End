import { useState } from "react";
import styles from "./BookingModal.module.css";
import {
  checkExistingPassenger,
  createPassenger,
  updatePassenger,
  bookFlight,
} from "../../../../../../../api/services/PassengerBookingService";

const BookingModal = ({ flight, onClose, onBooking }) => {
  // Debug logging with correct field
  console.log("Flight data received:", {
    id: flight?.flightId,
    flightNumber: flight?.flightNumber,
    complete: flight,
  });

  // Update validation to use flightId
  if (!flight?.flightId) {
    console.error("Flight ID missing in:", flight);
  }

  const [passengerData, setPassengerData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: {
      name: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city") {
      // Handle city field differently
      setPassengerData((prev) => ({
        ...prev,
        city: { name: value },
      }));
    } else {
      setPassengerData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Flight object:", flight);

      // Update validation to use flightId
      if (!flight?.flightId) {
        throw new Error("Invalid flight data");
      }

      // 1. Check for existing passenger
      console.log("Checking for existing passenger...");
      const existingPassenger = await checkExistingPassenger(
        passengerData.firstName,
        passengerData.lastName,
        passengerData.phoneNumber
      );

      let passengerId;

      if (existingPassenger) {
        console.log("Using existing passenger ID:", existingPassenger.id);
        passengerId = existingPassenger.id;
      } else {
        console.log("Creating new passenger...");
        const newPassenger = await createPassenger(passengerData);
        console.log("New passenger created:", newPassenger);
        passengerId = newPassenger.id;
      }

      // Use flightId instead of id
      await bookFlight(passengerId, flight.flightId);
      onBooking();
      onClose();
    } catch (error) {
      console.error("Booking error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Book Flight {flight.flightNumber}</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={passengerData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={passengerData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={passengerData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={passengerData.city.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Flight"}
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
