import { FaEdit,FaPlane,FaTrash } from "react-icons/fa";
import styles from "./AirportTable.module.css";




const AirportTable =({airports,onEdit,onDelete,onFlighView})=>{
    if(!airports||airports.length ===0){
        return(
            <p>no airports</p>
        )
    }

    return(
        <div className={styles.board}>
            <div className={styles.header}>
                <div>Name</div>
                <div>code</div>
                <div>City</div>
                <div>actions</div>
            </div>
            <div className={styles.passengerList}>
                {airports.map(airport=>(
                    <div key={airport.id} className={styles.passengerRow}>
                        <div className={styles.elements}> {airport.name}</div>
                        <div className={styles.elements}> {airport.code}</div>
                        <div className={styles.elements}>{airport.city.name} </div>
                        {/* <div>
                        <FaEdit onClick={()=>{onEdit(passenger)}}/>
                        <FaTrash onClick={()=>onDelete(passenger.id)}/>
                        <FaPlane onClick={()=>onFlighView(passenger.id)}/>
                        </div> */}
                    </div>
                ))}
            </div>
        </div>
    )

}






export default AirportTable