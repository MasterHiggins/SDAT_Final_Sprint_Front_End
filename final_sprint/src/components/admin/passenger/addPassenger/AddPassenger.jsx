import { useState } from "react";
import styles from "./AddPassenger.module.css"



const AddPassenger = ({isOpen,onClose,onSave})=>{
    const [passengerData,setPassengerData] = useState({
        firstName:'',
        lastName:'',
        phoneNumber:'',
        passengerCity:''
    })


    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setPassengerData({
            ...passengerData,
            [name]:value
        })
    }

    const handelSubmit = async (e) =>{
        e.preventDefault(); 
           const newPassenger =  {
            firstName: passengerData.firstName,
            lastName:passengerData.lastName,
            phoneNumber:passengerData.phoneNumber,
            passengerCity:passengerData.passengerCity
           }
           onSave(newPassenger)
           onClose();
    }

    if(!isOpen) return null


    return(
        <div className={styles.overlay}>
            <div className={styles.content}>
                <h2>Add new Passenger</h2>
                <form onSubmit={handelSubmit}>
                <div className={styles.form}>
                    <input type="text" name="firstName" value={passengerData.firstName} onChange={handleInputChange} required/>
                    <input type="text" name="lastName" value={passengerData.lastName} onChange={handleInputChange} required/>
                    <input type="text" name="phoneNumber" value={passengerData.phoneNumber} onChange={handleInputChange} required/>
                    <input type="text" name="passengerCity" value={passengerData.passengerCity} onChange={handleInputChange} required/>
                </div>
                <div className={styles.actions}>
                <button type="submit" className={styles.addButton}>Add</button>
                <button onClick={onClose} className={styles.cancelButton}>
                    cancel
                </button>
                </div>
                </form>
            </div>
        </div>
    )

}

export default AddPassenger;

