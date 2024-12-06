import React, { useState } from 'react';
import { fetchFlightById } from '../utills/apiCalls';

const FlightSearch = () => {
    const [flightId, setFlightId] = useState('');
    const [flights, setFlights] = useState(null); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handelSearch = async () => {
        if (!flightId || isNaN(flightId)) {
            setError('Please enter a id num');
            return;
        }

        setLoading(true);
        setError('');
        setFlights(null); 

        try {
            const FlightData = await fetchFlightById(flightId); 
            setFlights(FlightData);
        } catch (error) {
            console.error('Error fetching Flight:', error); 
            setError('Flight not found or API error');
            setFlights(null); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Search Flight by ID</h1>
            <input
                type="text"
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}
                placeholder="Enter Flight ID"
            />
            <button onClick={handelSearch}>Search</button>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {flights ? (
                <div className="flight-card" key={flights.id}>
                <h2>{flights.flightStatus}</h2>
                <p>departureTime {flights.departureTime}</p>
                <p>arrivalTime {flights.arrivalTime}</p>
            </div>
            ) : (
                !loading && <p>Please enter a Flight ID.</p>
            )}
        </div>
    );
};

export default FlightSearch;