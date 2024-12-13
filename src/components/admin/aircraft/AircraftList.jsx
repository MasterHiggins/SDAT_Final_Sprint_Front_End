import { FaEdit, FaTrash, FaCalendarAlt } from "react-icons/fa";
import styles from "./AircraftList.module.css";

function AircraftList({ aircraft, onEdit, onDelete }) {
  return (
    <div className={styles.listContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Model</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {aircraft.map((aircraft) => (
            <tr key={aircraft.id}>
              <td>{aircraft.model}</td>
              <td>{aircraft.capacity}</td>
              <td className={styles.actions}>
                <button
                  onClick={() => onEdit(aircraft)}
                  className={styles.editButton}
                  title="Edit Aircraft"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(aircraft.id)}
                  className={styles.deleteButton}
                  title="Delete Aircraft"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AircraftList;
