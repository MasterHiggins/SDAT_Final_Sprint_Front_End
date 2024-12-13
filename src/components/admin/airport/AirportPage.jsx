import { useState, useEffect } from "react";
import styles from "./AirportPage.module.css"
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { addAirport, deleteAirport, getAirports } from "../../../api/services/airportService";
import AirportTable from "./airportTable/AirportTable";
import AddAirport from "./addAirport/AddAirport";
import EditAirport from "./editAirportButton/EditAirportButton";


const AirportPage = ()=>{
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingAirport,setEditingAirport] = useState(null)

  useEffect(() => {
    fetchAirports();
  }, []);

  const fetchAirports = async () => {
    try {
      setLoading(true);
      setError(null);
      const airportData = await getAirports();
      setAirports(airportData);
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
  const handleUpdateAirport = async (updatedAirport)=>{
    setAirports((oldData)=>
      oldData.map((o)=>(o.id === updatedAirport.id?updatedAirport:o))
    )
    await fetchAirports();
  }

  const handleEditClick = (airport)=>{
    setEditingAirport(airport)
    setIsEditModalOpen(true)
  }
  const handleDeleteAirport = async (id)=>{
    await deleteAirport(id)
    await fetchAirports();
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
            <AirportTable airports={airports} onDelete={handleDeleteAirport}  onEdit={handleEditClick}/>
        </div>

        <AddAirport isOpen={isAddModalOpen} onClose={()=>setIsModalOpen(false)} onSave={handleAddAirport}/>
        <EditAirport isOpen={isEditModalOpen} onClose={()=>setIsEditModalOpen(false)} airport={editingAirport} onSave={handleUpdateAirport}/>
      </div>
    )
}

export default AirportPage;