import { useState,useEffect } from "react";
import styles from "./AddAirport.module.css"
import { getCities } from "../../../../api/services/airportService";



const AddAirport = ({isOpen,onClose,onSave})=>{
    const [airportData,setAirportData] = useState({
        name:'',
        code:'',
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
        setAirportData({
            ...airportData,
            [name]:value
        })
    }

    const handelSubmit = async (e) =>{
        e.preventDefault(); 
           const newAirport =  {
            name: airportData.name,
            code:airportData.code,
            city: {id:airportData.cityId}
           }
           onSave(newAirport)
           onClose();
    }

    if(!isOpen) return null


    return(
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Add new Airport</h2>
                <form onSubmit={handelSubmit}>
                <div className={styles.formGroup}>
                    <input type="text" name="name" value={airportData.name} onChange={handleInputChange} required/>
                    <input type="text" name="code" value={airportData.code} onChange={handleInputChange} required/>
                    <select
                            name="cityId"
                            value={airportData.cityId}
                            onChange={handleInputChange}
                            className={styles.dropdown}
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
                <div className={styles.buttonGroup}>
                <button type="submit" className={styles.submitButton}>Add</button>
                <button onClick={onClose} className={styles.cancelButton}>
                    cancel
                </button>
                </div>
                </form>
            </div>
        </div>
    )

}

export default AddAirport;

