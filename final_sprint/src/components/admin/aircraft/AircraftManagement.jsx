import { useState, useEffect } from 'react';
import { aircraftApi } from '../../../api';  //Change to api
import AircraftList from './AircraftList';
import AircraftForm from './AircraftForm';
import styles from './AircraftManagement.module.css';
import { toast } from 'react-toastify';

function AircraftManagement() {
  const [aircraft, setAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState(null);

  useEffect(() => {
    loadAircraft();
  }, []);

  const loadAircraft = async () => {
    try {
      const response = await aircraftApi.getAll();
      setAircraft(response.data);
    } catch (error) {
      console.error('Error loading aircraft:', error);
      toast.error('Failed to load aircraft');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAircraft = () => {
    setSelectedAircraft(null);
    setShowForm(true);
  };

  const handleEditAircraft = (aircraft) => {
    setSelectedAircraft(aircraft);
    setShowForm(true);
  };

  const handleDeleteAircraft = async (id) => {
    if (window.confirm('Are you sure you want to delete this aircraft?')) {
      try {
        await aircraftApi.delete(id);
        toast.success('Aircraft deleted successfully');
        await loadAircraft();
      } catch (error) {
        console.error('Error deleting aircraft:', error);
        toast.error('Failed to delete aircraft');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Aircraft Management</h1>
        <button onClick={handleAddAircraft} className={styles.addButton}>
          Add New Aircraft
        </button>
      </div>
      
      {showForm && (
        <AircraftForm
          aircraft={selectedAircraft}
          onClose={() => setShowForm(false)}
          onSave={() => {
            loadAircraft();
            setShowForm(false);
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
}

export default AircraftManagement;