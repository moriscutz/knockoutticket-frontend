import axios from 'axios';

const BASE_URL = 'http://localhost:8080/events';

const EventCalls = {
    createEvent: async (eventData) => {
        try{

            const token = localStorage.getItem('token');
                if(!token) throw new error('No token found');
            
            const response = await axios.post(`${BASE_URL}`, eventData, {
            headers:{
                Authorization: `Bearer ${token}`
            }
            });

            return response.data;
        } catch(error)
        {
            console.error('Error creating event: ', error);
      throw error;
        }
    }
};

export default EventCalls;