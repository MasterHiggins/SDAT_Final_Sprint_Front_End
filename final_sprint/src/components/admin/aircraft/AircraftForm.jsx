import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./AircraftForm.module.css";
import { aircraftApi } from "../../../api/services/aircraftSearch";
import { airlineApi } from "../../../api/services/airlineSearch";

const AircraftForm = ({ aircraft, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    model: "",
    capacity: "",
    airlineId: "",
  });
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        const response = await airlineApi.getAll();
        // Debug log
        console.log("Airlines Response:", response);

        // Handle response data
        const airlinesData = response.data || response;

        if (!Array.isArray(airlinesData)) {
          console.error("Invalid airlines data format:", airlinesData);
          setAirlines([]);
          toast.error("Failed to load airlines data");
          return;
        }

        setAirlines(airlinesData);
      } catch (error) {
        console.error("Error fetching airlines:", error);
        setAirlines([]);
        toast.error("Failed to load airlines");
      }
    };

    fetchAirlines();
  }, []);

  // Separate useEffect for populating form data
  useEffect(() => {
    if (aircraft) {
      setFormData({
        model: aircraft.model,
        capacity: aircraft.capacity,
        airlineId: aircraft.airlineId || "",
      });
    }
  }, [aircraft]);

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
      if (aircraft) {
        // Edit mode
        await aircraftApi.update(aircraft.id, formData);
        toast.success("Aircraft updated successfully");
      } else {
        // Add mode
        await aircraftApi.create(formData);
        toast.success("Aircraft created successfully");
      }
      onSave(); // Call onSave after successful operation
    } catch (error) {
      console.error("Error saving aircraft:", error);
      toast.error("Failed to save aircraft");
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{aircraft ? "Edit Aircraft" : "Add New Aircraft"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="model">Aircraft Model</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="airlineId">Airline</label>
            <select
              id="airlineId"
              name="airlineId"
              value={formData.airlineId}
              onChange={handleChange}
              required
            >
              <option value="">Select an airline</option>
              {airlines.map((airline) => (
                <option key={airline.id} value={airline.id}>
                  {airline.name}
                </option>
              ))}
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
              {aircraft ? "Update Aircraft" : "Add Aircraft"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AircraftForm;
