import { useState, useEffect } from "react";
import styles from "./PassengerPage.module.css"
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { addPassenger, getPassengers } from "../../../api/services/passengerService";
import PassengerTable from "./passengerTable/PassengerTable";
import AddPassenger from "./addPassenger/AddPassenger";
import EditPassenger from "./updatePassengerButton/EditPassengerButton";


const PassengerPage = ()=>{
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingPassenger,setEditingPassenger] = useState(null)

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
      await addPassenger(newPassenger)
      await fetchPassengers();
    } catch (error) {
      console.error('failed to save',error.message)
    }
  }

  const handleUpdatePassenger = async (updatedPassenger)=>{
    setPassengers((oldData)=>
      oldData.map((o)=>(o.id === updatedPassenger.id?updatedPassenger:o))
    )
    await fetchPassengers();
  }

    const handleEditClick = (passenger)=>{
      setEditingPassenger(passenger)
      setIsEditModalOpen(true)
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
            <PassengerTable passengers={passengers} onEdit={handleEditClick}/>
        </div>
        <AddPassenger isOpen={isAddModalOpen} onClose={()=>setIsModalOpen(false)} onSave={handleAddPasenger}/>
        <EditPassenger isOpen={isEditModalOpen} onClose={()=>setIsEditModalOpen(false)} passenger={editingPassenger} onSave={handleUpdatePassenger}/>
      </div>
    )
}
export default PassengerPage;