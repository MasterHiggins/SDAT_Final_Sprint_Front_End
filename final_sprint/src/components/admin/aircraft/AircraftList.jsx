import { FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import styles from './AircraftList.module.css';

function AircraftList({ aircraft, onEdit, onDelete }) {
  return (
    <div className={styles.listContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Registration</th>
            <th>Type</th>
            <th>Airline</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {aircraft.map((aircraft) => (
            <tr key={aircraft.id}>
              <td>{aircraft.registration}</td>
              <td>{aircraft.type}</td>
              <td>{aircraft.airline}</td>
              <td>{aircraft.capacity}</td>
              <td>
                <span className={styles[aircraft.status.toLowerCase()]}>
                  {aircraft.status}
                </span>
              </td>
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