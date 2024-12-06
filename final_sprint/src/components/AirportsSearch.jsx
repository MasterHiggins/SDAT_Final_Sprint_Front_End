import React, { useState } from 'react';
import { fetchAirport } from '../utills/apiCalls';  //Issue with import?

const AirportSearch = () => {
    const [airportId, setAirportId] = useState('');
    const [airport, setAirport] = useState(null); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!airportId || isNaN(airportId)) {
            setError('Please enter a valid airport ID');
            return;
        }

        setLoading(true);
        setError('');
        setAirport(null); 

        try {
            setAirport(response.data);
        } catch (error) {
            console.error('Error fetching airport:', error); 
            setError('Airport not found or API error');
            setAirport(null); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Search Airport by ID</h1>
            <input
                type="text"
                value={airportId}
                onChange={(e) => setAirportId(e.target.value)}
                placeholder="Enter Airport ID"
            />
            <button onClick={handleSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {airport ? (
                <div>
                    <h2>{airport.name}</h2>
                    <p>Code: {airport.code}</p>
                    <p>City: {airport.city.name}</p>
                </div>
            ) : (
                !loading && <p>Please enter an airport ID.</p>
            )}
        </div>
    );
};

export default AirportSearch;
