import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { fetchAirport, fetchCity, fetchFlight } from "./utills/apiCalls";
import CityList from "./components/CityList";
import AirportList from "./components/AirportList";
import CitySearch from "./components/CitySearch";
import FlightList from "./components/FlightsList";
import FlightSearch from "./components/FlightsSearch";
import AddCity from "./components/AddCity";



function App() {
  const [citys, setCitys] = useState([]);
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);

  const loadCity = useCallback(async () => {
    const res = await fetchCity();
    setCitys(res);
  }, []);

  useEffect(() => {
    loadCity().then((r) => console.log("city loaded"));
  }, [loadCity]);

  const loadAirport = useCallback(async () => {
    const res = await fetchAirport();
    setAirports(res);
  }, []);

  useEffect(() => {
    loadAirport().then((r) => console.log("airport loaded"));
  }, [loadAirport]);

  const loadFlights = useCallback(async () => {
    const res = await fetchFlight();
    setFlights(res);
  }, []);

  useEffect(() => {
    loadFlights().then((r) => console.log("Flights loaded"));
  }, [loadFlights]);

  return (
    <div>
      <CityList citys={citys} />
      <AirportList airports={airports} />
      <FlightList flights={flights}/>
      <CitySearch />
      <FlightSearch/>
      <AddCity/>
    </div>
  );
}

export default App;
