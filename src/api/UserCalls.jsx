import axios from "axios";

const BASE_URL = 'http://localhost:8080/users';

const UserCalls = {
  getAppUsers: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getAppUser: async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  createAppUser: async (userData) => {
    try {
      const response = await axios.post(BASE_URL, userData);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Error creating user: ", error.response.data);
      } else if (error.request) {
        console.error("Error creating user: ", error.request);
      } else {
        console.error("Error creating user: ", error.message);
      }
      throw error;
    }
  },

  updateAppUser: async (id, userData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      await axios.put(`${BASE_URL}/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  }
};

export default UserCalls;
