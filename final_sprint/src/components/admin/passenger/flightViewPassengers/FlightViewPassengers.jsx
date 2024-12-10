
import styles from "./FlightViewPassengers.module.css"

const FlightViewPassengers = ({isOpen,onClose,flights = []})=>{

    if(!isOpen) return null

    return(
        <div className={styles.overlay}>
            <div className={styles.content}>
                <h2>Passenger Flight List</h2>
                {flights.length>0?(
                <ul>
                {flights.map(flight=>(
                    <li key={flight.id}>
                        Model:{flight.model} Capacity:{flight.capacity}
                    </li>
                ))}
                </ul>
                ):(
                    <p>no flight history to show</p>
                )}
               
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )

}


export default FlightViewPassengers

