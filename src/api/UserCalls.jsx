import axios from "axios";

const BASE_URL = 'https://localhost:8080/users';
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
  };
  

export default UserCalls