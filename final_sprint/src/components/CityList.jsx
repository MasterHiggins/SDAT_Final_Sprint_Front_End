import React from "react";


function CityList({citys}) {
    console.log(citys)
    return(
        <div className="city-list">
        {citys.map(city => (
            <div className="city-card" key={city.id}>
                <h2>{city.name}</h2>
                <p>prov {city.province}</p>
                <p>pop {city.population}</p>

               
            </div>
        ))}
    </div>
    )
}

export default CityList