import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventCalls from '../api/EventCalls';
const BookingFormComponent = ({ event }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [boxer1, setBoxer1] = useState({});
    const [boxer2, setBoxer2] = useState({});

     useEffect(() => {
        const fetchBoxers = async () => {
            try {
                const { boxer1, boxer2 } = await EventCalls.getEventBoxers(event.id);
                setBoxer1(boxer1);
                setBoxer2(boxer2);
            } catch (error) {
                console.error('Error fetching boxer details:', error);
                toast.error('Error fetching boxer details. Please try again later.');
            }
        };

        fetchBoxers();
    }, [event.id]);

    const handleBooking = async () => {
            toast.success('Booking successful!');

    };

    return (
        <Container component={Paper} elevation={3} sx={{ padding: 3, marginTop: 5 }}>
            <Typography variant="h4" gutterBottom>
            Book Event: {boxer1.fullName} vs {boxer2.fullName}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        fullWidth
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth onClick={handleBooking}>
                        Book Now
                    </Button>
                </Grid>
            </Grid>
            <ToastContainer />
        </Container>
    );
};

export default BookingFormComponent;
