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
    },

    getAllEvents: async () => {
        try{

            const token = localStorage.getItem('token');
                if(!token) throw new error('No token found');

            const response = await axios.get(`${BASE_URL}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error)
        {
            console.error(`Error getting events:`, error);
            throw error;
        }
    },

    getEventBoxers: async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await axios.post(`${BASE_URL}/${eventId}/boxers`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error getting event boxers:', error);
            throw error;
        }
    }
};

export default EventCalls;