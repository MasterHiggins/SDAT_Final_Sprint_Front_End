import { useState, useEffect } from "react";
import AircraftList from "./AircraftList";
import AircraftForm from "./AircraftForm";
import styles from "./AircraftManagement.module.css";
import { toast } from "react-toastify";
import { aircraftApi } from "../../../api/services/aircraftSearch";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner"; // Import LoadingSpinner

const AircraftManagement = () => {
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState(null);

  useEffect(() => {
    loadAircraft();
  }, []);

  const loadAircraft = async () => {
    try {
      const response = await aircraftApi.getAll();
      // Debug log
      console.log("API Response:", response);

      // Check if response.data exists, if not use response directly
      const aircraftData = response.data || response;

      // Validate that we have an array
      if (!Array.isArray(aircraftData)) {
        console.error("Invalid aircraft data format:", aircraftData);
        setAircraft([]);
        toast.error("Invalid data format received");
        return;
      }

      setAircraft(aircraftData);
    } catch (error) {
      console.error("Error loading aircraft:", error);
      setAircraft([]); // Set empty array on error
      toast.error("Failed to load aircraft");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAircraft = () => {
    setSelectedAircraft(null);
    setShowAddForm(true);
  };

  const handleEditAircraft = (aircraft) => {
    setSelectedAircraft(aircraft);
    setShowEditForm(true);
  };

  const handleDeleteAircraft = async (id) => {
    if (window.confirm("Are you sure you want to delete this aircraft?")) {
      try {
        await aircraftApi.delete(id);
        toast.success("Aircraft deleted successfully");
        await loadAircraft();
      } catch (error) {
        console.error("Error deleting aircraft:", error);
        toast.error("Failed to delete aircraft");
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading aircraft..." />; // Use LoadingSpinner

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Aircraft Management</h1>
        <button onClick={handleAddAircraft} className={styles.addButton}>
          Add New Aircraft
        </button>
      </div>

      {showAddForm && (
        <AircraftForm
          aircraft={selectedAircraft}
          onClose={() => setShowAddForm(false)}
          onSave={() => {
            loadAircraft();
            setShowAddForm(false);
          }}
        />
      )}

      {showEditForm && (
        <AircraftForm
          aircraft={selectedAircraft}
          onClose={() => setShowEditForm(false)}
          onSave={() => {
            loadAircraft();
            setShowEditForm(false);
          }}
        />
      )}

      <AircraftList
        aircraft={aircraft}
        onEdit={handleEditAircraft}
        onDelete={handleDeleteAircraft}
      />
    </div>
  );
};

export default AircraftManagement;
