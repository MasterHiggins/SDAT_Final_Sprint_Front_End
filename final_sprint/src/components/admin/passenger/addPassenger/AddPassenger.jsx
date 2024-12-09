import { useEffect, useState } from "react";
import styles from "./AddPassenger.module.css"
import { getCities } from "../../../../api/services/passengerService";



const AddPassenger = ({isOpen,onClose,onSave})=>{
    const [passengerData,setPassengerData] = useState({
        firstName:'',
        lastName:'',
        phoneNumber:'',
        cityId:''
    })

    const[cities,setCities] = useState([])

    useEffect(()=>{
        if(isOpen){
            getCities().then(setCities).catch(console.error)
        }
    },[isOpen])

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
            city:{id:passengerData.cityId}
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
                    <select
                            name="cityId"
                            value={passengerData.cityId}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="" disabled>
                                Select City
                            </option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
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

