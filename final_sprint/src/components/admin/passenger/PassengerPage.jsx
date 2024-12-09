import { useState, useEffect } from "react";
import styles from "./PassengerPage.module.css"
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { addPassenger, getPassengers } from "../../../api/services/passengerService";
import PassengerTable from "./passengerTable/PassengerTable";
import AddPassenger from "./addPassenger/AddPassenger";


const PassengerPage = ()=>{
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddPasenger = async (newPassenger)=>{
    try { 
      // const savedPassenger = await addPassenger(newPassenger)
      // setPassengers([...passengers,savedPassenger])
      await addPassenger(newPassenger)
      await fetchPassengers();
    } catch (error) {
      console.error('failed to save',error.message)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Loading passengers..." />;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
    return(
      <div>
        <div className={styles.container}>
          <button onClick={()=>setIsModalOpen(true)}>Add Passenger</button>
            <h1 className={styles.title}>Passengers Management</h1>
            <PassengerTable passengers={passengers}/>
        </div>
        <AddPassenger isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} onSave={handleAddPasenger}/>
      </div>
    )
}
export default PassengerPage;