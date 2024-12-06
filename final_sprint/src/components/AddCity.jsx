import React, { useState } from 'react';
import { addCity } from '../utills/apiCalls';

const AddCity = ()=>{
    const [cityData, setCityData] = useState({
        name: '',
        province: '',
        population: ''
    })
    const [successMessage,setSuccessMessage] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setCityData({
            ...cityData,
            [name]:value
        })
    }

    const handelSubmit = async (e) =>{
        e.preventDefault();
        try {
           const newCity = await addCity(cityData);
           setSuccessMessage(`${newCity.name} added`)
           setCityData({name: '',
            province: '',
            population: ''})
        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div>
            <h1>add city</h1>
            <form onSubmit={handelSubmit}>
                city name: <input type="text" name='name' value={cityData.name} onChange={handleInputChange} required />
                city province: <input type="text" name='province' value={cityData.province} onChange={handleInputChange} required />
                city population: <input type="number" name='population' value={cityData.population} onChange={handleInputChange} required />
                <button type='submit' disabled={loading}>
                    {loading ? 'adding':'add city'}
                </button>
            </form>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
        </div>
    )

}

export default AddCity