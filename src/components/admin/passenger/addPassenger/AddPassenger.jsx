import { useState } from "react";
import styles from "./AddPassenger.module.css";

const AddPassenger = ({ isOpen, onClose, onSave }) => {
  const [passengerData, setPassengerData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    passengerCity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerData({
      ...passengerData,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const newPassenger = {
      firstName: passengerData.firstName,
      lastName: passengerData.lastName,
      phoneNumber: passengerData.phoneNumber,
      passengerCity: passengerData.passengerCity,
    };
    onSave(newPassenger);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Add New Passenger</h2>
        <form onSubmit={handelSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={passengerData.firstName}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="passengerCity">City</label>
            <input
              type="text"
              id="passengerCity"
              name="passengerCity"
              value={passengerData.passengerCity}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Add Passenger
            </button>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPassenger;
