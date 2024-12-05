import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { fetchAirport, fetchCity } from "./utills/apiCalls";
import CityList from "./components/CityList";
import AirportList from "./components/AirportList";
import CitySearch from "./components/CitySearch";

function App() {
  const [citys, setCitys] = useState([]);
  const [airports, setAirports] = useState([]);

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

  return (
    <div>
      <CityList citys={citys} />
      <AirportList airports={airports} />
      <CitySearch />
    </div>
  );
}

export default App;
