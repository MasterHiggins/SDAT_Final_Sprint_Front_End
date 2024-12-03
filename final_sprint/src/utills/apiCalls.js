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