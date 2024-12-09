import React from "react";
import { CheckCircle, X } from "lucide-react";
import styles from "./BookingConfirmationModal.module.css";

const BookingConfirmationModal = ({ booking, onClose }) => {
  console.log("Full booking data:", JSON.stringify(booking, null, 2));

  // Extract nested passenger data
  const originalPassenger = booking?.passenger?.passenger;
  const bookingDetails = booking?.passenger?.bookingDetails;
  const flightData = booking?.flight;

  if (!originalPassenger || !bookingDetails || !flightData) {
    console.error("Missing booking data:", {
      originalPassenger,
      bookingDetails,
      flightData,
    });
    return null;
  }

  // Get city from multiple sources with logging
  const cityName =
    bookingDetails.passengerCity || // Check existing passenger city first
    originalPassenger.city?.name || // Then check new passenger city
    "Not provided";

  console.log("City data sources:", {
    bookingDetailsCity: bookingDetails.passengerCity,
    originalPassengerCity: originalPassenger.city?.name,
    finalCity: cityName,
  });

  console.log("Processed data:", {
    passenger: originalPassenger,
    bookingDetails,
    city: cityName,
  });

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeIcon} onClick={onClose}>
          <X size={24} />
        </button>
        <div className={styles.header}>
          <CheckCircle size={48} className={styles.successIcon} />
          <h2 className={styles.title}>Booking Confirmed!</h2>
          <p className={styles.subtitle}>
            Your flight has been successfully booked
          </p>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Passenger Details</h3>
          <div className={styles.detailGrid}>
            <span className={styles.label}>Name:</span>
            <span className={styles.value}>
              {`${originalPassenger.firstName || ""} ${
                originalPassenger.lastName || ""
              }`}
            </span>
            <span className={styles.label}>Phone:</span>
            <span className={styles.value}>
              {originalPassenger.phoneNumber}
            </span>
            <span className={styles.label}>City:</span>
            <span className={styles.value}>{cityName}</span>
            <span className={styles.label}>Booking ID:</span>
            <span className={styles.value}>{bookingDetails.id}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Flight Details</h3>
          <div className={styles.detailGrid}>
            <span className={styles.label}>Flight Number:</span>
            <span className={styles.value}>{flightData.flightNumber}</span>
            <span className={styles.label}>From:</span>
            <span className={styles.value}>{`${
              flightData.departureCity || ""
            } (${flightData.departureAirport || ""})`}</span>
            <span className={styles.label}>To:</span>
            <span className={styles.value}>{`${flightData.arrivalCity || ""} (${
              flightData.arrivalAirport || ""
            })`}</span>
            <span className={styles.label}>Gate:</span>
            <span className={styles.value}>
              {flightData.departureGate || "TBA"}
            </span>
            <span className={styles.label}>Date:</span>
            <span className={styles.value}>
              {new Date(flightData.departureTime).toLocaleDateString()}
            </span>
            <span className={styles.label}>Time:</span>
            <span className={styles.value}>
              {new Date(flightData.departureTime).toLocaleTimeString()}
            </span>
          </div>
        </div>

        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
