import axios from 'axios';

const BASE_URL = 'http://localhost:8080/bookings';

const BookingCalls = {
    createBooking: async (bookingData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await axios.post(`${BASE_URL}`, bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error; 
        }
    }
};

export default BookingCalls;
