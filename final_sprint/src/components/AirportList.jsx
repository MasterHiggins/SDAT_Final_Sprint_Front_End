import React from "react";


function AirportList({airports}) {
    console.log(airports)
    return(
        <div className="airports-list">
        {airports.map(airport => (
            <div className="airport-card" key={airport.id}>
                <h2>{airport.name}</h2>
                <p>Code {airport.code}</p>


               
            </div>
        ))}
    </div>
    )
}

export default AirportList