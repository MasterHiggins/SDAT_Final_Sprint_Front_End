import { useState, useEffect } from "react";
import styles from "./AirportPage.module.css"
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { getAirports } from "../../../api/services/airportService";
import AirportTable from "./airportTable/AirportTable";


const AirportPage = ()=>{
  const [airports, setAirportss] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [isAddModalOpen, setIsModalOpen] = useState(false);
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

  // const handleAddPasenger = async (newPassenger)=>{
  //   try { 
  //     await addPassenger(newPassenger)
  //     await fetchPassengers();
  //   } catch (error) {
  //     console.error('failed to save',error.message)
  //   }
  // }

  // const handleUpdatePassenger = async (updatedPassenger)=>{
  //   setPassengers((oldData)=>
  //     oldData.map((o)=>(o.id === updatedPassenger.id?updatedPassenger:o))
  //   )
  //   await fetchPassengers();
  // }

  // const handleEditClick = (passenger)=>{
  //   setEditingPassenger(passenger)
  //   setIsEditModalOpen(true)
  // }

  // const handleDeletePassenger = async (id)=>{
  //   await deletePassenger(id)
  //   await fetchPassengers();
  // }

  // const handlePassengerFlights = async (id)=>{
  //   const data = await getPassengerFlights(id)
  //   setFlights(data)
  //   setIsFlightViewOpen(true)
  // }



  if (loading) {
    return <LoadingSpinner message="Loading airports..." />;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
    return(
      <div>
        <div className={styles.container}>
          {/* <button onClick={()=>setIsModalOpen(true)}>Add Passenger</button> */}
            <h1 className={styles.title}>Airport Management</h1>
            <AirportTable airports={airports} />
        </div>
        {/* onEdit={handleEditClick} onDelete={handleDeletePassenger} onFlighView={handlePassengerFlights} */}
        {/* <AddPassenger isOpen={isAddModalOpen} onClose={()=>setIsModalOpen(false)} onSave={handleAddPasenger}/>
        <EditPassenger isOpen={isEditModalOpen} onClose={()=>setIsEditModalOpen(false)} passenger={editingPassenger} onSave={handleUpdatePassenger}/>
        <FlightViewPassengers flights={flights} isOpen={isFlightViewOpen} onClose={()=>setIsFlightViewOpen(false)}/> */}
      </div>
    )
}
export default AirportPage;