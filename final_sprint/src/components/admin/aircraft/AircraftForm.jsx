import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styles from './AircraftForm.module.css';
import { aircraftApi } from '../../../api/services/aircraftSearch';

const AircraftForm = ({ aircraft, onClose, onSave })=> {
  const [formData, setFormData] = useState({
    type: '',
    capacity: ''
  });

  useEffect(() => {
    if (aircraft) {
      const { status, ...aircraftData } = aircraft;
      setFormData(aircraftData);
    }
  }, [aircraft]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (aircraft) {
        await aircraftApi.update(aircraft.id, formData);
        toast.success('Aircraft updated successfully');
      } else {
        await aircraftApi.create(formData);
        toast.success('Aircraft created successfully');
      }
      onSave();
    } catch (error) {
      console.error('Error saving aircraft:', error);
      toast.error('Failed to save aircraft');
    }
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.formContainer}>
        <h2>{aircraft ? 'Edit Aircraft' : 'Add New Aircraft'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="type">Aircraft Type</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
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

          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {aircraft ? 'Update Aircraft' : 'Add Aircraft'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AircraftForm;
