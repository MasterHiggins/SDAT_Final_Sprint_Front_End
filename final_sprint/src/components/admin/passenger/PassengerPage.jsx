import { useState, useEffect } from "react";
import styles from "./PassengerPage.module.css"
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { getPassengers } from "../../../api/services/passengerService";
import PassengerTable from "./passengerTable/PassengerTable";


const PassengerPage = ()=>{
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = async () => {
    try {
      setLoading(true);
      setError(null);
      const passengerData = await getPassengers();
      setPassengers(passengerData);
    } catch (error) {
      setError("Failed to fetch passengers");
      console.error("Error fetching passengers:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <LoadingSpinner message="Loading passengers..." />;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Passengers Management</h1>
            <PassengerTable passengers={passengers}/>
        </div>
    )
}
export default PassengerPage;