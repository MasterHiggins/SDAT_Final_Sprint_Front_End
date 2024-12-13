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

const statusOptions = [
  "Scheduled",
  "Active",
  "Delayed",
  "Cancelled",
  "Completed",
];

const formatDateTimeInput = (dateTimeString) => {
  return dateTimeString ? dateTimeString.slice(0, 16) : "";
};

function FlightForm({ flight, onClose, onSave }) {
  const [formData, setFormData] = useState({
    flightNumber: "",
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
  const [success, setSuccess] = useState(false);

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

  console.log("Current reference data:", referenceData);
  console.log("Loading state:", loading);

  useEffect(() => {
    if (flight) {
      setFormData({
        flightNumber: flight.flightNumber || "",
        airlineId: flight.airlineId || "",
        aircraftId: flight.aircraftId || "",
        departureAirportId: flight.departureAirportId || "",
        arrivalAirportId: flight.arrivalAirportId || "",
        departureGateId: flight.departureGateId || "",
        arrivalGateId: flight.arrivalGateId || "",
        departureTime: formatDateTimeInput(flight.departureTime),
        arrivalTime: formatDateTimeInput(flight.arrivalTime),
        status: flight.status || "Scheduled",
      });
    }
  }, [flight]);

  // const formatDateForInput = (dateString) => {
  //   if (!dateString) return "";
  //   return new Date(dateString).toISOString().slice(0, 16);
  // };

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

    const payload = {
      ...formData,
    };

    try {
      if (flight) {
        // Update existing flight
        await flightFormService.updateFlight(flight.flightId, payload);
      } else {
        // Create new flight
        await flightFormService.createFlight(payload);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error saving flight:", error);
    }
  };

  // Get selected aircraft capacity with null check
  const selectedAircraft =
    formData.aircraftId && referenceData.aircraft
      ? referenceData.aircraft.find(
          (a) => a.id === parseInt(formData.aircraftId)
        )
      : null;

  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        const data = await flightFormService.getReferenceData();
        setReferenceData(data);
      } catch (error) {
        console.error("Error fetching reference data:", error);
      }
    };

    fetchReferenceData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        {success && (
          <div className={styles.success}>Flight saved successfully!</div>
        )}
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
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
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
