import { useState, useEffect } from "react";
import styles from "./FlightManagement.module.css";
import LoadingSpinner from "../../../shared/LoadingSpinner/LoadingSpinner";
import FlightList from "./FlightList/FlightList";
import FlightForm from "./FlightForm/FlightForm";
import { flightManagementService } from "../../../../api/services/flightManagementService";

function FlightManagement() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      console.log("Fetching flights...");
      const data = await flightManagementService.getAllFlights();
      console.log("Received flights:", data);
      setFlights(data);
    } catch (error) {
      console.error("Error loading flights:", error);
      setFlights([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleAddFlight = () => {
    setSelectedFlight(null);
    setShowForm(true);
  };

  const handleEditFlight = (flight) => {
    setSelectedFlight(flight);
    setShowForm(true);
  };

  const handleDeleteFlight = async (id) => {
    console.log("Delete requested for flight ID:", id); // Add debug log
    try {
      await flightManagementService.deleteFlight(id);
      loadFlights(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Flight Management</h1>
        <button onClick={handleAddFlight} className={styles.addButton}>
          Add New Flight
        </button>
      </div>

      {showForm && (
        <FlightForm
          flight={selectedFlight}
          onClose={() => setShowForm(false)}
          onSave={() => {
            loadFlights();
            setShowForm(false);
          }}
        />
      )}

      <FlightList
        flights={flights}
        onEdit={handleEditFlight}
        onDelete={handleDeleteFlight}
      />
    </div>
  );
}

export default FlightManagement;
