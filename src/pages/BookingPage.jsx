import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import BookingFormComponent from '../components/BookingFormComponent.jsx';
import EventCalls from '../api/EventCalls.jsx';
import { useEffect, useState } from 'react';
import SideBarComponent from '../components/SideBarComponent.jsx';

const BookingPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await EventCalls.getEvent(id);
                setEvent(eventData.event);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent();
    }, [id]);

    return (
        <Container>
            {event ? (
                <BookingFormComponent event={event} />
            ) : (
                <Typography variant="h4">Loading event details...</Typography>
            )}
            <SideBarComponent/>
        </Container>
    );
};

export default BookingPage;
