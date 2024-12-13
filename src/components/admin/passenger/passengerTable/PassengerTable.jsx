import { FaEdit, FaPlane, FaTrash } from "react-icons/fa";
import styles from "./PassengerTable.module.css";

const PassengerTable = ({ passengers, onEdit, onDelete, onFlighView }) => {
  if (!passengers || passengers.length === 0) {
    return <p>no passengers</p>;
  }

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <div>Name</div>
        <div>phone number</div>
        <div>City</div>
        <div>actions</div>
      </div>
      <div className={styles.passengerList}>
        {passengers.map((passenger) => (
          <div key={passenger.id} className={styles.passengerRow}>
            <div className={styles.elements}>
              {" "}
              {passenger.firstName} {passenger.lastName}
            </div>
            <div className={styles.elements}> {passenger.phoneNumber}</div>
            <div className={styles.elements}>{passenger.passengerCity} </div>
            <div className={styles.actionButtons}>
              <button
                className={styles.editButton}
                onClick={() => onEdit(passenger)}
                title="Edit Passenger"
              >
                <FaEdit />
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => onDelete(passenger.id)}
                title="Delete Passenger"
              >
                <FaTrash />
              </button>
              <button
                className={styles.viewButton}
                onClick={() => onFlighView(passenger.id)}
                title="View Flights"
              >
                <FaPlane />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassengerTable;
