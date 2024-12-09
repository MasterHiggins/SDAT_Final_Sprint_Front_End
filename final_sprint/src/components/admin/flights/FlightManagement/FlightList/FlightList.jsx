import { FaEdit, FaTrash, FaPlane } from "react-icons/fa";
import styles from "./FlightList.module.css";
import { formatDateTime } from "../../../../../utils/dateUtils";

function FlightList({ flights, onEdit, onDelete }) {
  return (
    <div className={styles.listContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Gates</th>
            <th>Status</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.flightId}>
              <td>{flight.flightNumber}</td>
              <td>{flight.airline}</td>
              <td>{`${flight.departureCity} (${flight.departureAirport})`}</td>
              <td>{`${flight.arrivalCity} (${flight.arrivalAirport})`}</td>
              <td>{formatDateTime(flight.departureTime)}</td>
              <td>{formatDateTime(flight.arrivalTime)}</td>
              <td>{`D: ${flight.departureGate} / A: ${flight.arrivalGate}`}</td>
              <td>
                <span className={styles[flight.status.toLowerCase()]}>
                  {flight.status}
                </span>
              </td>
              <td>{`${flight.numberOfPassengers}/${flight.aircraftCapacity}`}</td>
              <td className={styles.actions}>
                <button
                  onClick={() => onEdit(flight)}
                  className={styles.editButton}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(flight.flightId)}
                  className={styles.deleteButton}
                >
                  <FaTrash />
                </button>
                <button className={styles.detailsButton}>
                  <FaPlane />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FlightList;
