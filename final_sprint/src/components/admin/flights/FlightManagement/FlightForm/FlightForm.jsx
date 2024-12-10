import { useState, useEffect } from "react";
import styles from "./FlightForm.module.css";
import flightFormService from "../../../../../api/services/flightFormService";
import LoadingSpinner from "../../../../shared/LoadingSpinner/LoadingSpinner";

const FLIGHT_STATUSES = {
  SCHEDULED: "Scheduled",
  ACTIVE: "Active",
  DELAYED: "Delayed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

function FlightForm({ flight, onClose, onSave }) {
  const [formData, setFormData] = useState({
    flightNumber: "", // Make it editable
    airlineId: "",
    aircraftId: "",
    departureAirportId: "",
    arrivalAirportId: "",
    departureGateId: "",
    arrivalGateId: "",
    departureTime: "",
    arrivalTime: "",
    status: "Scheduled",
  });

  const [referenceData, setReferenceData] = useState({
    airlines: [],
    aircraft: [],
    airports: [],
    gatesByAirport: {},
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadReferenceData = async () => {
    try {
      setLoading(true);
      const data = await flightFormService.getReferenceData();
      console.log("Reference data response:", data);

      if (data) {
        setReferenceData(data);
      } else {
        setError("No reference data received");
      }
    } catch (error) {
      console.error("Error loading reference data:", error);
      setError("Failed to load form data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReferenceData();
  }, []);

  // Add debug logging
  console.log("Current reference data:", referenceData);
  console.log("Loading state:", loading);

  useEffect(() => {
    if (flight) {
      setFormData({
        airlineId: flight.airlineId,
        aircraftId: flight.aircraftId,
        departureAirportId: flight.departureAirportId,
        arrivalAirportId: flight.arrivalAirportId,
        departureGateId: flight.departureGateId,
        arrivalGateId: flight.arrivalGateId,
        departureTime: formatDateForInput(flight.departureTime),
        arrivalTime: formatDateForInput(flight.arrivalTime),
        status: flight.status,
      });
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
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate flight number
    if (!formData.flightNumber.trim()) {
      setError("Flight number is required");
      return;
    }

    try {
      // Log payload for debugging
      console.log("Submitting flight data:", formData);

      const payload = {
        ...formData,
        flightNumber: formData.flightNumber.trim(),
        // Add required fields
        numberOfPassengers: 0, // Default value
        status: FLIGHT_STATUSES[formData.status] || "Scheduled",
      };

      console.log("Final payload:", payload);
      await flightFormService.createFlight(payload);
      onSave();
    } catch (error) {
      console.error("Error saving flight:", error);
      setError(error.response?.data || "Failed to save flight");
    }
  };

  // Get selected aircraft capacity with null check
  const selectedAircraft =
    formData.aircraftId && referenceData.aircraft
      ? referenceData.aircraft.find(
          (a) => a.id === parseInt(formData.aircraftId)
        )
      : null;

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{flight ? "Edit Flight" : "Add New Flight"}</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Airline</label>
              <select
                name="airlineId"
                value={formData.airlineId}
                onChange={handleChange}
                required
              >
                <option value="">Select Airline</option>
                {referenceData.airlines?.map((airline) => (
                  <option key={airline.id} value={airline.id}>
                    {airline.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Aircraft</label>
              <select
                name="aircraftId"
                value={formData.aircraftId}
                onChange={handleChange}
                required
              >
                <option value="">Select Aircraft</option>
                {referenceData.aircraft?.map((aircraft) => (
                  <option key={aircraft.id} value={aircraft.id}>
                    {aircraft.type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              placeholder="Enter flight number"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Departure Airport</label>
              <select
                name="departureAirportId"
                value={formData.departureAirportId}
                onChange={handleChange}
                required
              >
                <option value="">Select Departure Airport</option>
                {referenceData.airports.map((airport) => (
                  <option key={airport.id} value={airport.id}>
                    {airport.city} ({airport.code})
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Arrival Airport</label>
              <select
                name="arrivalAirportId"
                value={formData.arrivalAirportId}
                onChange={handleChange}
                required
              >
                <option value="">Select Arrival Airport</option>
                {referenceData.airports.map((airport) => (
                  <option key={airport.id} value={airport.id}>
                    {airport.city} ({airport.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Departure Gate</label>
              <select
                name="departureGateId"
                value={formData.departureGateId}
                onChange={handleChange}
                required
                disabled={!formData.departureAirportId}
              >
                <option value="">Select Gate</option>
                {referenceData.gatesByAirport[formData.departureAirportId]?.map(
                  (gate) => (
                    <option key={gate.id} value={gate.id}>
                      {gate.gateNumber}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Arrival Gate</label>
              <select
                name="arrivalGateId"
                value={formData.arrivalGateId}
                onChange={handleChange}
                required
                disabled={!formData.arrivalAirportId}
              >
                <option value="">Select Gate</option>
                {referenceData.gatesByAirport[formData.arrivalAirportId]?.map(
                  (gate) => (
                    <option key={gate.id} value={gate.id}>
                      {gate.gateNumber}
                    </option>
                  )
                )}
              </select>
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

          {selectedAircraft && (
            <div className={styles.infoText}>
              Aircraft Capacity: {selectedAircraft.capacity} passengers
            </div>
          )}

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
