import React, { useState } from 'react';
import { fetchCityById } from '../utills/apiCalls';


const CitySearch = () => {
    const [cityId, setCityId] = useState('');
    const [citys, setCitys] = useState(null); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handelSearch = async () => {
        if (!cityId || isNaN(cityId)) {
            setError('Please enter a id num');
            return;
        }

        setLoading(true);
        setError('');
        setCitys(null); 

        try {
            const CityData = await fetchCityById(cityId); 
            setCitys(CityData);
        } catch (error) {
            console.error('Error fetching city:', error); 
            setError('City not found or API error');
            setCitys(null); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Search City by ID</h1>
            <input
                type="text"
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
                placeholder="Enter City ID"
            />
            <button onClick={handelSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {citys ? (
                <div className="city-search">
                    <h2>{citys.name}</h2>
                    <p>Province: {citys.province}</p>
                    <p>Population: {citys.population}</p>
                </div>
            ) : (
                !loading && <p>Please enter a city ID.</p>
            )}
        </div>
    );
};

export default CitySearch;