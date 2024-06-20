import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Container, Grid, Button, TextField, MenuItem, Box, Paper, Divider } from '@mui/material';
import EventFightNightCalls from '../api/EventFightNightCalls';
import EventCalls from '../api/EventCalls';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import SideBarComponent from '../components/SideBarComponent';
import AddEventToFightNightComponent from '../components/AddEventToFightNightComponent';
import { useNavigate } from 'react-router-dom';
import CompleteEventButton from '../components/CompleteEventButton';

const EventFightNightModificationPage = () => {
    const { id } = useParams();
    const [eventFightNight, setEventFightNight] = useState(null);
    const [eventsWithBoxers, setEventsWithBoxers] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [role, setRole] = useState([]);
    const navigate = useNavigate();

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
            setRole(decodedToken.roles);

            if (role.includes("NORMAL_USER")) {
                navigate("/unauthorized");
            }

        }
    });

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

    const handleFightNightChange = (e) => {
        const { name, value } = e.target;
        setEventFightNight(prev => ({ ...prev, [name]: value }));
    };

    const handleFightNightSave = async () => {
        try {
            await EventFightNightCalls.updateEventFightNight(id, eventFightNight);
            toast.success('Event Fight Night updated successfully');
        } catch (error) {
            console.error('Failed to update event fight night:', error);
            toast.error('Failed to update event fight night.');
        }
    };

    const handleEventStatusChange = async (eventId, status) => {
        try {
            await EventCalls.updateEventStatus(eventId, status);
            fetchEventFightNightDetails();
            toast.success('Event status updated successfully');
        } catch (error) {
            console.error('Failed to update event status:', error);
            toast.error('Failed to update event status.');
        }
    };

    const handleDeleteEventFightNight = async () => {
        try {
            await EventFightNightCalls.deleteEventFightNight(id);
            toast.success('Event Fight Night deleted successfully');

        } catch (error) {
            console.error('Failed to delete event fight night:', error);
            toast.error('Failed to delete event fight night.');
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await EventCalls.deleteEvent(eventId);
            fetchEventFightNightDetails();
            toast.success('Event deleted successfully');
        } catch (error) {
            console.error('Failed to delete event:', error);
            toast.error('Failed to delete event.');
        }
    };

    if (!eventFightNight) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
             <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>Events</Typography>
            <Grid container spacing={3}>
                {eventsWithBoxers.map((event) => (
                    <Grid item xs={12} md={6} lg={4} key={event.id}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>{event.boxer1Name} vs {event.boxer2Name}</Typography>
                                <Typography variant="body2" color="textSecondary">{event.boxer1Record} vs {event.boxer2Record}</Typography>
                                <TextField
                                    select
                                    label="Status"
                                    value={event.status}
                                    onChange={(e) => handleEventStatusChange(event.id, e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                >
                                    {eventStatusOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '6px', marginTop: 2 }}>
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                                    {isEventOrganizerOrAdmin && <CompleteEventButton event={event} />}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <br/>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: 4 }}>Modify Event Fight Night</Typography>
            <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
                <Box component="form" noValidate autoComplete="off">
                    <Typography variant="h6" gutterBottom>Event Fight Night Details</Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <TextField
                        name="title"
                        label="Title"
                        value={eventFightNight.title}
                        onChange={handleFightNightChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        name="place"
                        label="Place"
                        value={eventFightNight.place}
                        onChange={handleFightNightChange}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        name="date"
                        label="Date"
                        value={eventFightNight.date}
                        onChange={handleFightNightChange}
                        fullWidth
                        margin="normal"
                        type="date"
                        variant="outlined"
                    />
                    <TextField
                        name="startTime"
                        label="Start Time"
                        value={eventFightNight.startTime}
                        onChange={handleFightNightChange}
                        fullWidth
                        margin="normal"
                        type="time"
                        variant="outlined"
                    />
                    <TextField
                        name="endTime"
                        label="End Time"
                        value={eventFightNight.endTime}
                        onChange={handleFightNightChange}
                        fullWidth
                        margin="normal"
                        type="time"
                        variant="outlined"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleFightNightSave}>Save Changes</Button>
                        <Button variant="contained" color="secondary" onClick={handleDeleteEventFightNight}>Delete Event Fight Night</Button>
                    </Box>
                </Box>
            </Paper>
            {isEventOrganizerOrAdmin && (
                <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                    <Typography variant="h6" gutterBottom>Add a new event to this Fight Night</Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <AddEventToFightNightComponent fightNightId={id} eventFightNightDate={eventFightNight.date} onEventAdded={fetchEventFightNightDetails} />
                </Paper>
            )}
            <ToastContainer />
            <SideBarComponent />
        </Container>
    );
};

export default EventFightNightModificationPage;
