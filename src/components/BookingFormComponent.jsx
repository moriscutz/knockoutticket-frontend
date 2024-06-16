import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import BookingCalls from '../api/BookingCalls';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const BookingFormComponent = ({ eventFightNightId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [customerId, setCustomerId] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(storedToken);
        setCustomerId(decodedToken.userId);
    })
    const handleSubmit = async () => {
        if (!name || !email) {
            toast.error('Please fill all required fields.');
            return;
        }

        const bookingData = {
            customerId,
            name,
            email,
            eventFightNightId,

        };

        try {
            const response = await BookingCalls.createBooking(bookingData);
            toast.success('Booking successful!');
        } catch (error) {
            console.error('Error creating booking:', error);
            toast.error('Failed to create booking.');
        }
    };

    return (
        <div>
            <Stack spacing={2}>
                <TextField
                    name='name'
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <TextField
                    name="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    Book Event Fight Night
                </Button>
                <ToastContainer />
            </Stack>
        </div>
    );
};

export default BookingFormComponent;
