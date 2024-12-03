import './App.css';
import {useCallback, useEffect, useState} from "react";
// import {Route, Routes} from "react-router-dom";
import { fetchCity } from './utills/apiCalls';
import CityList from './components/CityList';


function App() {
  const [citys,setCitys] = useState([])

  const loadCity = useCallback(async () => {
    const res = await fetchCity();
    setCitys(res)
  },[])
  useEffect(()=>{
    loadCity().then(r=>console.log('city loaded'))
  })  

  

  return (
          
        <CityList citys={citys}/> 

  );
}

export default App;
