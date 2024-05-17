import axios from "axios";

const BASE_URL = 'http://localhost:8080/users';
const UserCalls = {
    getAppUsers: async () => {
      try {
        const response = await axios.get(BASE_URL);
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error; 
      }
    },
  
    createAppUser: async (userData) => {
      try{
        const response= await axios.post(BASE_URL, userData)
        return response.data;
      } catch (error) {
        if(error.response){
          console.error("Error creating user: ", error.response.data);
      } else if (error.request){
          console.error("Error creating user: ", error.request);
      } else{
          console.error("Error creating user: ", error.message);
      }
        throw error;
      }
    }
};

export default UserCalls