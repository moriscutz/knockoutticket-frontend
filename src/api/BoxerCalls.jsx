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

  getAllBoxers: async () => {
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
        console.error('Error fetching boxers: ', error);
        throw error;
    }
}

 
};

export default BoxerCalls;
