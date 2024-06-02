import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer, toast } from 'react-toastify';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';
import BoxerCalls from '../api/BoxerCalls';
import EventCalls from '../api/EventCalls';
import { useNavigate } from 'react-router-dom';


const CreateEventComponent = () => {
    const navigate = useNavigate();
    const [boxers, setBoxers] = useState([]);
    const [selectedBoxer1, setSelectedBoxer1] = useState(null);
    const [selectedBoxer2, setSelectedBoxer2] = useState(null);
    const [place, setPlace] = useState('');
    const [eventDate, setEventDate] = useState(dayjs());
    
    useEffect(() => {

        const token = localStorage.getItem('token');
       

        BoxerCalls.getAllBoxers().then(setBoxers).catch(error => {
            console.error('Failed to fetch boxers:', error);
            toast.error('Failed to load boxers.');
        });
    }, [navigate]);

    const handleSubmit = async () => {
        if (!selectedBoxer1 || !selectedBoxer2 || !eventDate || !place) {
            toast.error('Please fill all required fields.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication required.');
                return;
            }

            const decodedToken = jwtDecode(token);
            const organizerId = decodedToken.userId;

            const eventData = {
                boxerId1: selectedBoxer1.boxer.id,
                boxerId2: selectedBoxer2.boxer.id,
                organizerId,
                date: eventDate.toISOString(),
                place
            };

            const response = await EventCalls.createEvent(eventData);
            toast.success('Event created successfully!');
            console.log('Event created:', response);
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error('Failed to create event.',);
        }
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Autocomplete
                    options={boxers}
                    getOptionLabel={(option) => option.boxer.fullName}
                    value={selectedBoxer1}
                    onChange={(event, newValue) => {
                        setSelectedBoxer1(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} label="Select Boxer 1" />}
                />
                <Autocomplete
                    options={boxers}
                    getOptionLabel={(option) => option.boxer.fullName}
                    value={selectedBoxer2}
                    onChange={(event, newValue) => setSelectedBoxer2(newValue)}
                    renderInput={(params) => <TextField {...params} label="Select Boxer 2" />}
                />
                <TextField
                    label="Event Place"
                    value={place}
                    fullWidth
                    onChange={(e) => setPlace(e.target.value)}
                />
                <DatePicker
                    label="Select Date"
                    value={eventDate}
                    onChange={setEventDate}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={dayjs()}
                />
            </LocalizationProvider>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Create Event</Button>
            <ToastContainer />
        </div>
    );
};

export default CreateEventComponent;
