import React from "react";


function FlightList({flights}) {
    console.log(flights)
    return(
        <div className="flight-list">
        {flights.map(flight => (
            <div className="flight-card" key={flight.id}>
                <h2>{flight.flightStatus}</h2>
                <p>departureTime {flight.departureTime}</p>
                <p>arrivalTime {flight.arrivalTime}</p>

               
            </div>
        ))}
    </div>
    )
}

export default FlightList