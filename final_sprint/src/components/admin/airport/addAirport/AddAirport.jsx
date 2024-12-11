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
        <div className={styles.overlay}>
            <div className={styles.content}>
                <h2>Add new Airport</h2>
                <form onSubmit={handelSubmit}>
                <div className={styles.form}>
                    <input type="text" name="name" value={airportData.name} onChange={handleInputChange} required/>
                    <input type="text" name="code" value={airportData.code} onChange={handleInputChange} required/>
                    <select
                            name="cityId"
                            value={airportData.cityId}
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

export default AddAirport;

