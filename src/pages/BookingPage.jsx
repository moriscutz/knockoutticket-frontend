import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import BookingFormComponent from '../components/BookingFormComponent.jsx';
import EventFightNightCalls from '../api/EventFightNightCalls';
import { Link } from 'react-router-dom';
import SideBarComponent from '../components/SideBarComponent.jsx';

const BookingPage = () => {
    const { id } = useParams();
    const [eventFightNight, setEventFightNight] = useState(null);

    useEffect(() => {
        const fetchEventFightNight = async () => {
            try {
                const eventFightNightData = await EventFightNightCalls.getEventFightNight(id);
                setEventFightNight(eventFightNightData);
            } catch (error) {
                console.error('Error fetching Event Fight Night:', error);
            }
        };

        fetchEventFightNight();
    }, [id]);

    return (
        <Container>
            {eventFightNight ? (
                <div>
                    <Typography variant="h4" gutterBottom>
                        {eventFightNight.title}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Date: {new Date(eventFightNight.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Start Time: {eventFightNight.startTime}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        End Time: {eventFightNight.endTime}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Place: {eventFightNight.place}
                    </Typography>
                    <BookingFormComponent eventFightNightId={eventFightNight.id} />
                </div>
            ) : (
                <Typography variant="h4">Loading Event Fight Night details...</Typography>
            )}
            <SideBarComponent />
        </Container>
    );
};

export default BookingPage;
