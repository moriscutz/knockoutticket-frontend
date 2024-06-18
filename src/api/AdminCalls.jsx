import axios from "axios";

const BASE_URL = 'http://localhost:8080/admin/users';

const AdminCalls = {
  updateUserRoles: async (userId, rolesData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      const response = await axios.put(`${BASE_URL}/${userId}/roles`, rolesData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating user roles for user ${userId}:`, error);
      throw error;
    }
  }
};

export default AdminCalls;
