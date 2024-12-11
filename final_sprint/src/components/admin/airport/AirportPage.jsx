import { useState, useEffect } from "react";
import styles from "./AirportPage.module.css"
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { addAirport, getAirports } from "../../../api/services/airportService";
import AirportTable from "./airportTable/AirportTable";
import AddAirport from "./addAirport/AddAirport";


const AirportPage = ()=>{
  const [airports, setAirportss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  // const [editingPassenger,setEditingPassenger] = useState(null)
  // const [flights,setFlights] = useState([])
  // const [isFlightViewOpen,setIsFlightViewOpen] = useState(false)

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      setLoading(true);
      setError(null);
      const airportData = await getAirports();
      setAirportss(airportData);
    } catch (error) {
      setError("Failed to fetch airports");
      console.error("Error fetching airports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAirport = async (newAirport)=>{
    try { 
      await addAirport(newAirport)
      await fetchAirports();
    } catch (error) {
      console.error('failed to save',error.message)
    }
  }



  if (loading) {
    return <LoadingSpinner message="Loading airports..." />;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
    return(
      <div>
        <div className={styles.container}>
          <button onClick={()=>setIsModalOpen(true)} className={styles.addButton}>Add Airport</button>
            <h1 className={styles.title}>Airport Management</h1>
            <AirportTable airports={airports} />
        </div>

        <AddAirport isOpen={isAddModalOpen} onClose={()=>setIsModalOpen(false)} onSave={handleAddAirport}/>
 
      </div>
    )
}

export default AirportPage;