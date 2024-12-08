// import { useState } from "react";
import styles from "./PassengerTable.module.css";


const PassengerTable =({passengers})=>{
    if(!passengers||passengers.length ===0){
        return(
            <p>no passengers</p>
        )
    }

    return(
        <div className={styles.board}>
            <div className={styles.header}>
                <div>Name</div>
                <div>phone number</div>
                <div>City</div>
                <div>actions</div>
            </div>
            <div className={styles.passengerList}>
                {passengers.map(passenger=>(
                    <div key={passenger.id} className={styles.passengerRow}>
                        <div className={styles.elements}> {passenger.firstName} {passenger.lastName} </div>
                        <div className={styles.elements}> {passenger.phoneNumber}</div>
                        <div className={styles.elements}>{passenger.city.name} </div>
                    </div>
                ))}
            </div>
        </div>
    )

}






export default PassengerTable