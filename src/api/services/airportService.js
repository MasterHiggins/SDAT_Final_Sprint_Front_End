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



  export const updateAirport = async (id,newAriportData)=>{
    try {
        const res = await api.put(`/airports/${id}`,newAriportData,{
            headers:{'Content-Type': 'application/json'},
        })
        return res.data                                                               
    } catch (error) {
        console.error('error when updating airport', error)
        throw error
    }
  }
  
  
  export const deleteAirport = async (id)=>{
    try {
        const res = await api.delete(`airports/${id}`,{
            headers:{'Content-Type': 'application/json'},
        })
        return res.data                                                               
    } catch (error) {
        console.error('error when removing airports', error)
        throw error
    }
  }
  