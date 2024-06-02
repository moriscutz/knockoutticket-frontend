import axios from 'axios';

const BASE_URL = 'http://localhost:8080/boxers';

const BoxerCalls = {
  
  createBoxer: async (boxerData) => {
    try {

      const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

      const response = await axios.post(`${BASE_URL}`, boxerData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating boxer: ', error);
      throw error;
    }
  },

  getAllBoxers: async (filters = {}) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: filters
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching boxers: ', error);
      throw error;
    }
},

  getBoxerById: async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.boxer;
    } catch (error) {
      console.error('Error fetching boxer: ', error);
      throw error;
    }
  },

  getAggregatedBoxerStats: async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.get(`${BASE_URL}/aggregated-boxer-stats`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching aggregated boxer stats:", error);
        throw error;
    }
  },

  updateBoxer: async (id, boxerData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      await axios.put(`${BASE_URL}/${id}`, boxerData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error updating boxer:', error);
      throw error;
    }
  },

  deleteBoxer: async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
  
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error deleting boxer:', error);
      throw error;
    }
  }
};

export default BoxerCalls;
