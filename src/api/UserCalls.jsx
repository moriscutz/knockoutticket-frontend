import axios from "axios";

const UserCalls = {
    getAppUsers: async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        return response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error; 
      }
    },
  };
  

export default UserCalls