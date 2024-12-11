import { useEffect,useState } from "react";
import styles from "./EditAirportButton.module.css"
import { getCities, updateAirport } from "../../../../api/services/airportService";

const EditAirport = ({isOpen,onClose,onSave,airport})=>{
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

    useEffect(()=>{
        if(isOpen){
            setAirportData({
                name: airport.name,
                code: airport.code,
                cityId: airport.city.id,
            })
        }
    },[isOpen,airport])


    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setAirportData({
            ...airportData,
            [name]:value
        })
    }

    const handelSubmit = async (e) =>{
        e.preventDefault(); 
           const updatedAirport =  {
            name: airportData.name,
            code: airportData.code,
            city: {id:airportData.cityId}
           }
           try {   
            await updateAirport(airport.id, updatedAirport)
            onSave(updatedAirport)
            onClose();
           } catch (error) {
            console.error("error updating",error)
           }
    }

    if(!isOpen) return null


    return(
        <div className={styles.overlay}>
            <div className={styles.content}>
                <h2>Update Airport</h2>
                <form onSubmit={handelSubmit}>
                <div className={styles.form}>
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

export default EditAirport

