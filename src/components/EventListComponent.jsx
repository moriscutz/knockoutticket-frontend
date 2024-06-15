import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Container, Button } from '@mui/material';
import EventFightNightCalls from '../api/EventFightNightCalls';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const EventListComponent = () => {
    const [eventFightNights, setEventFightNights] = useState([]);

    useEffect(() => {
        EventFightNightCalls.getAllEventFightNights()
            .then(data => {
                setEventFightNights(data);
            })
            .catch(error => {
                console.error('Failed to fetch event fight nights:', error);
                toast.error('Failed to load event fight nights.');
            });
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Upcoming Event Fight Nights
            </Typography>
            <Grid container spacing={3}>
                {eventFightNights.map((eventFightNight) => (
                    <Grid item xs={12} md={6} lg={4} key={eventFightNight.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {eventFightNight.title}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    Date: {new Date(eventFightNight.date).toLocaleDateString()}
                                </Typography>
                                <Button variant="contained" color="primary" component={Link} to={`/eventFightNight/${eventFightNight.id}`}>
                                    More Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <ToastContainer />
        </Container>
    );
};

export default EventListComponent;
