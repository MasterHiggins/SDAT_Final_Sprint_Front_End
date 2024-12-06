import axios from "axios";
import { BACKEND_BASE_URL } from "../config/baseURL"

export const fetchCity = async ()=>{
    try {
        const res = await axios.get(`${BACKEND_BASE_URL}/cities`)
        return res.data
    } catch (error) {
        console.error('error fetching city',error)
        throw error
    }
}


export const fetchAirport = async ()=>{
    try {
        const res = await axios.get(`${BACKEND_BASE_URL}/airports`)
        return res.data
    } catch (error) {
        console.error('error fetching airport',error)
        throw error
    }
}

export const fetchCityById = async (id)=>{
    try {
        const res = await axios.get(`${BACKEND_BASE_URL}/cities/${id}`)
        return res.data
    } catch (error) {
        console.error('error fetching city',error)
        throw error
    }
}

export const fetchFlight = async ()=>{
    try {
        const res = await axios.get(`${BACKEND_BASE_URL}/flights`)
        return res.data
    } catch (error) {
        console.error('error fetching flights',error)
        throw error
    }
}

export const fetchFlightById = async (id)=>{
    try {
        const res = await axios.get(`${BACKEND_BASE_URL}/flights/${id}`)
        return res.data
    } catch (error) {
        console.error('error fetching flights',error)
        throw error
    }
}

export const addCity = async (cityData)=>{
    try {
        const res = await axios.post(`${BACKEND_BASE_URL}/cities`,cityData,{
            headers:{'Content-Type': 'application/json'}
        })
        console.log("wow")
        return res.data;
    } catch (error) {
        console.error('error when adding city', error)
        throw error
    }
}

