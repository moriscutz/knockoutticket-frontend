import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link} from 'react-router-dom';
import { Card, CardContent, Typography, Container, Grid, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import EventFightNightCalls from '../api/EventFightNightCalls';
import EventCalls from '../api/EventCalls';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import SideBarComponent from '../components/SideBarComponent';

const EventFightNightDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [eventFightNight, setEventFightNight] = useState(null);
    const [eventsWithBoxers, setEventsWithBoxers] = useState([]);
    const [userRole, setUserRole] = useState([]);


    const eventStatusOptions = [
        { value: 'SCHEDULED', label: 'Scheduled' },
        { value: 'ONGOING', label: 'Ongoing' },
        { value: 'COMPLETE', label: 'Complete' },
        { value: 'DRAW', label: 'Draw' },
        { value: 'NO_CONTEST', label: 'No Contest' }
    ];

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            setUserRole(decodedToken.roles);
        }
    }, []);

    const fetchEventFightNightDetails = async () => {
        try {
            const fightNight = await EventFightNightCalls.getEventFightNight(id);
            setEventFightNight(fightNight);

            if (fightNight.events && fightNight.events.length > 0) {
                const eventsWithBoxersData = await Promise.all(fightNight.events.map(async event => {
                    if (event.id) {
                        const boxers = await EventCalls.getEventBoxers(event.id);
                        return {
                            ...event,
                            boxer1Name: boxers.boxer1.fullName,
                            boxer2Name: boxers.boxer2.fullName,
                            boxer1Record: `${boxers.boxer1.wins}-${boxers.boxer1.losses}-${boxers.boxer1.draws}`,
                            boxer2Record: `${boxers.boxer2.wins}-${boxers.boxer2.losses}-${boxers.boxer2.draws}`
                        };
                    } else {
                        return null;
                    }
                }));

                setEventsWithBoxers(eventsWithBoxersData.filter(event => event !== null));
            } else {
                setEventsWithBoxers([]);
            }
        } catch (error) {
            console.error('Failed to fetch event fight night details:', error);
            toast.error('Failed to load event fight night details.');
        }
    };

    useEffect(() => {
        fetchEventFightNightDetails();
    }, [id]);

    const isEventOrganizerOrAdmin = userRole.includes("EVENT_ORGANIZER") || userRole.includes("ADMINISTRATOR");


    const getStatusLabel = (value) => {
        const status = eventStatusOptions.find(option => option.value === value);
        return status ? status.label : value;
    };

    const handleBookingClick = () => {
        navigate(`/book/${id}`); 
    };

    if (!eventFightNight) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>{eventFightNight.title}</Typography>
            <Typography variant="h6" gutterBottom>Date: {new Date(eventFightNight.date).toLocaleDateString()}</Typography>
            <Typography variant="h6" gutterBottom>Start Time: {eventFightNight.startTime}</Typography>
            <Typography variant="h6" gutterBottom>End Time: {eventFightNight.endTime}</Typography>
            <Typography variant="h6" gutterBottom>Place: {eventFightNight.place}</Typography>
            <Grid container spacing={2}>
                {eventsWithBoxers.map((event) => (
                    <Grid item xs={12} md={6} key={event.id}>
                        <Card sx={{ height: '200px', width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6">{event.boxer1Name} vs {event.boxer2Name}</Typography>
                                <Typography variant="body2" color="textSecondary">{event.boxer1Record} vs {event.boxer2Record}</Typography>
                                <Typography variant="body2" color="textSecondary">{getStatusLabel(event.status)}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <br/>
            <Button variant="contained" color="secondary" component={Link} to={`/book/${id}`} sx={{ mt: 2 }}>
                Book Event Fight Night
            </Button>
            <ToastContainer />
            <SideBarComponent />
        </Container>
    );
};

export default EventFightNightDetailPage;
