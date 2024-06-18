import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Container, Button } from '@mui/material';
import EventFightNightCalls from '../api/EventFightNightCalls';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import SidebarComponent from '../components/SideBarComponent';
import { jwtDecode } from 'jwt-decode';
import AggregatedBoxerStats from '../components/AggregatedBoxerStats.jsx';

const EventFightNightListPage = () => {
    const [eventFightNights, setEventFightNights] = useState([]);
    const [userRole, setUserRole] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            setUserRole(decodedToken.roles);
        }
    }, []);

    useEffect(() => {
        EventFightNightCalls.getAllEventFightNights()
            .then(setEventFightNights)
            .catch(error => {
                console.error('Failed to fetch event fight nights:', error);
                toast.error('Failed to load event fight nights.');
            });
    }, []);

    const isEventOrganizer = userRole.includes("EVENT_ORGANIZER");
    
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Upcoming Event Fight Nights</Typography>
            <Grid container spacing={3}>
                {eventFightNights.map((eventFightNight) => (
                    <Grid item xs={12} md={6} key={eventFightNight.id}>
                        <Card sx={{height: '250px', width: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardContent>
                                <Typography variant="h5" component="div">{eventFightNight.title}</Typography>
                                <Typography color="textSecondary" gutterBottom>
                                    Date: {new Date(eventFightNight.date).toLocaleDateString()}
                                </Typography>
                                <Button variant="contained" color="secondary" component={Link} to={`/eventFightNight/${eventFightNight.id}`} sx = {{mt:1 , ml: 1}}>
                                    More Details
                                </Button>
                                {isEventOrganizer && (
                                <Button variant="contained" color="primary" component={Link} to={`/ModifyEventFightNight/${eventFightNight.id}`} sx = {{mt:1 , ml: 1}} >
                                    Modify
                                </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <ToastContainer />
            <AggregatedBoxerStats/>
            <SidebarComponent/>
        </Container>
    );
};

export default EventFightNightListPage;
