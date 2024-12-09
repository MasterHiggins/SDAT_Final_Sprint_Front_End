import { useEffect,useState } from "react";
import { updatePassenger } from "../../../../api/services/passengerService";
import styles from "./EditPassengerButton.module.css"

const EditPassenger = ({isOpen,onClose,onSave,passenger})=>{
    const [passengerData,setPassengerData] = useState({
        firstName:'',
        lastName:'',
        phoneNumber:'',
        passengerCity:'',
    })

    useEffect(()=>{
        if(isOpen){
            setPassengerData({
                firstName: passenger.firstName,
                lastName: passenger.lastName,
                phoneNumber: passenger.phoneNumber,
                passengerCity: passenger.passengerCity,
            })
        }
    },[isOpen,passenger])


    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setPassengerData({
            ...passengerData,
            [name]:value
        })
    }

    const handelSubmit = async (e) =>{
        e.preventDefault(); 
           const updatedPassenger =  {
            ...passengerData
           }
           try {   
            await updatePassenger(passenger.id, updatedPassenger)
            onSave(updatedPassenger)
            onClose();
           } catch (error) {
            console.error("error updating",error)
           }
    }

    if(!isOpen) return null


    return(
        <div className={styles.overlay}>
            <div className={styles.content}>
                <h2>Update Passenger</h2>
                <form onSubmit={handelSubmit}>
                <div className={styles.form}>
                    <input type="text" name="firstName" value={passengerData.firstName} onChange={handleInputChange} required/>
                    <input type="text" name="lastName" value={passengerData.lastName} onChange={handleInputChange} required/>
                    <input type="text" name="phoneNumber" value={passengerData.phoneNumber} onChange={handleInputChange} required/>
                    <input type="text" name="passengerCity" value={passengerData.passengerCity} onChange={handleInputChange} required/>
                </div>
                <div className={styles.actions}>
                <button type="submit" className={styles.addButton}>Update</button>
                <button onClick={onClose} className={styles.cancelButton}>
                    cancel
                </button>
                </div>
                </form>
            </div>
        </div>
    )

}

export default EditPassenger

