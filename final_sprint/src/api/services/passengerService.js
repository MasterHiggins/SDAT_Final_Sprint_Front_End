import api from "../config/apiConfig";



export const getPassengers = async () => {
  try {
    return await api.get("/passengers");
  } catch (error) {
    throw error;
  }
};


export const addPassenger = async (newPassenger)=>{
  try {
      const res = await api.post("passengers",newPassenger,{
          headers:{'Content-Type': 'application/json'},
      })
      return res.data                                                               
  } catch (error) {
      console.error('error when adding passenger', error)
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



export const updatePassenger = async (id,newPassengerData)=>{
  try {
      const res = await api.put(`passengers/${id}`,newPassengerData,{
          headers:{'Content-Type': 'application/json'},
      })
      return res.data                                                               
  } catch (error) {
      console.error('error when adding passenger', error)
      throw error
  }
}


export const deletePassenger = async (id)=>{
  try {
      const res = await api.delete(`passengers/${id}`,{
          headers:{'Content-Type': 'application/json'},
      })
      return res.data                                                               
  } catch (error) {
      console.error('error when adding passenger', error)
      throw error
  }
}

