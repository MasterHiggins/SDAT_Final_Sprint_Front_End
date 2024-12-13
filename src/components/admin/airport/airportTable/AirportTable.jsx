import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./AirportTable.module.css";

const AirportTable = ({ airports, onEdit, onDelete, onFlighView }) => {
  if (!airports || airports.length === 0) {
    return <p>no airports</p>;
  }

  return (
    <div className={styles.board}>
      <div className={styles.header}>
        <div>Name</div>
        <div>code</div>
        <div>City</div>
        <div>actions</div>
      </div>
      <div className={styles.List}>
        {airports.map((airport) => (
          <div key={airport.id} className={styles.Row}>
            <div className={styles.elements}>{airport.name}</div>
            <div className={styles.elements}>{airport.code}</div>
            <div className={styles.elements}>{airport.city.name}</div>
            <div className={styles.actionButtons}>
              <button
                className={styles.editButton}
                onClick={() => onEdit(airport)}
                title="Edit Airport"
              >
                <FaEdit />
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => onDelete(airport.id)}
                title="Delete Airport"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirportTable;
