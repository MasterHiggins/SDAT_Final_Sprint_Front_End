import './App.css';
import {useCallback, useEffect, useState} from "react";
// import {Route, Routes} from "react-router-dom";
import { fetchAirport, fetchCity } from './utills/apiCalls';
import CityList from './components/CityList';
import AirportList from './components/AirportList';
import CitySearch from './components/CitySearch';



function App() {
  const [citys,setCitys] = useState([])

  const loadCity = useCallback(async () => {
    const res = await fetchCity();
    setCitys(res)
  },[])
  useEffect(()=>{
    loadCity().then(r=>console.log('city loaded'))
  },[])  

  const [airports,setAirports] = useState([])

  const loadAirport = useCallback(async () => {
    const res = await fetchAirport();
    setAirports(res)
  },[])
  useEffect(()=>{
    loadAirport().then(r=>console.log('airport loaded'))
  },[])  

  

  return (
        
        // <CityList citys={citys}/> 
      // <AirportList airports={airports}/>
      <CitySearch/>
  );
}

export default App;
