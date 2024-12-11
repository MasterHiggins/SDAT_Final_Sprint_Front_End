import api from "../config/apiConfig";



export const getAirports = async () => {
    try {
      return await api.get("/airports");
    } catch (error) {
      throw error;
    }
  };



  export const addAirport = async (newAirport)=>{
    try {
        const res = await api.post("/airports",newAirport,{
            headers:{'Content-Type': 'application/json'},
        })
        return res.data                                                               
    } catch (error) {
        console.error('error when adding airports', error)
        throw error
    }
  }


  export const getCities = async () => {
    try {
      return await api.get("/cities");
    } catch (error) {
      throw error;
    }
  };