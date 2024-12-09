import { useState, useEffect } from "react";
import styles from "./FlightForm.module.css";
import { toast } from "react-toastify";

function FlightForm({ flight, onClose, onSave }) {
  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    departureAirport: "",
    arrivalAirport: "",
    departureCity: "",
    arrivalCity: "",
    departureGate: "",
    arrivalGate: "",
    departureTime: "",
    arrivalTime: "",
    status: "SCHEDULED",
    numberOfPassengers: 0,
    aircraftCapacity: 0,
  });

  useEffect(() => {
    if (flight) {
      const formattedFlight = {
        ...flight,
        departureTime: formatDateForInput(flight.departureTime),
        arrivalTime: formatDateForInput(flight.arrivalTime),
      };
      setFormData(formattedFlight);
    }
  }, [flight]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 16);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/flights", {
        method: flight ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save flight");

      toast.success(`Flight ${flight ? "updated" : "created"} successfully`);
      onSave();
    } catch (error) {
      console.error("Error saving flight:", error);
      toast.error(`Failed to ${flight ? "update" : "create"} flight`);
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{flight ? "Edit Flight" : "Add New Flight"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Flight Number</label>
              <input
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Airline</label>
              <input
                type="text"
                name="airline"
                value={formData.airline}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Departure Airport</label>
              <input
                type="text"
                name="departureAirport"
                value={formData.departureAirport}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Arrival Airport</label>
              <input
                type="text"
                name="arrivalAirport"
                value={formData.arrivalAirport}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Departure City</label>
              <input
                type="text"
                name="departureCity"
                value={formData.departureCity}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Arrival City</label>
              <input
                type="text"
                name="arrivalCity"
                value={formData.arrivalCity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Departure Gate</label>
              <input
                type="text"
                name="departureGate"
                value={formData.departureGate}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Arrival Gate</label>
              <input
                type="text"
                name="arrivalGate"
                value={formData.arrivalGate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Departure Time</label>
              <input
                type="datetime-local"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Arrival Time</label>
              <input
                type="datetime-local"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Number of Passengers</label>
              <input
                type="number"
                name="numberOfPassengers"
                value={formData.numberOfPassengers}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Aircraft Capacity</label>
              <input
                type="number"
                name="aircraftCapacity"
                value={formData.aircraftCapacity}
                onChange={handleChange}
                required
                min="0"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="SCHEDULED">Scheduled</option>
              <option value="ACTIVE">Active</option>
              <option value="DELAYED">Delayed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {flight ? "Update Flight" : "Add Flight"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FlightForm;
