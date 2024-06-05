import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Container, Button } from '@mui/material';
import EventCalls from '../api/EventCalls.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const EventListComponent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEventsAndBoxers = async () => {
            try {
                const eventsData = await EventCalls.getAllEvents();

                const eventsWithBoxers = await Promise.all(eventsData.map(async (event) => {

                    try {
                        const { boxer1, boxer2 } = await EventCalls.getEventBoxers(event.event.id);
                        return {
                            ...event,
                            boxer1,
                            boxer2
                        };
                    } catch (boxerError) {
                        console.error('Error fetching boxer details:', boxerError);
                        toast.error('Error fetching boxer details. Please try again later.');
                        return null;
                    }
                }));

                setEvents(eventsWithBoxers.filter(event => event !== null));
            } catch (error) {
                console.error('Error fetching events or boxers:', error);
                toast.error('Error fetching events or boxers. Please try again later.');
            }
        };

        fetchEventsAndBoxers();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Upcoming Events
            </Typography>
            <Grid container spacing={3}>
                {events.map((event) => (
                    <Grid item xs={12} md={6} lg={4} key={event.event.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {event.boxer1.fullName} vs {event.boxer2.fullName}
                                </Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    {`${event.boxer1.wins}-${event.boxer1.losses}-${event.boxer1.draws}`} vs {`${event.boxer2.wins}-${event.boxer2.losses}-${event.boxer2.draws}`}
                                </Typography>
                                <Typography variant="body2" component="p" gutterBottom>
                                    Event Date: {new Date(event.event.date).toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" component="p" gutterBottom>
                                    Place: {event.event.place}
                                </Typography>
                                <Button variant="contained" color="primary" component={Link} to={`/book/${event.event.id}`}>
                                    Book event
                                </Button>
                            </CardContent >
                        </Card >
                    </Grid>
                ))}
            </Grid>
            <ToastContainer />
        </Container>
    );
};

export default EventListComponent;
