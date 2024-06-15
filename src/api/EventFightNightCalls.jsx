import axios from 'axios';

const BASE_URL = 'http://localhost:8080/eventFightNights';

const EventFightNightCalls = {
    createEventFightNight: async (eventData) => {

        const token = localStorage.getItem('token');
        if(!token) throw new error('No token found');
        
        const response = await axios.post(BASE_URL, eventData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    getEventFightNight: async (id) => {

        const token = localStorage.getItem('token');
        if(!token) throw new error('No token found');
        
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    getAllEventFightNights: async () => {
        const token = localStorage.getItem('token');
        if(!token) throw new error('No token found');
        
        const response = await axios.get(BASE_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    addEventToFightNight: async (eventData) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.post(`${BASE_URL}/${eventData.eventFightNightId}/addEvent`, eventData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    updateEventFightNight: async (id, eventData) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.put(`${BASE_URL}/${id}`, eventData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },

    deleteEventFightNight: async (id) => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const response = await axios.delete(`${BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
};

export default EventFightNightCalls;
