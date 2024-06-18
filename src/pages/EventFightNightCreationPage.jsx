import React, { useState, useEffect } from 'react';
import { TextField, Button, Stack, Container } from '@mui/material';
import { DatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ToastContainer, toast } from 'react-toastify';
import dayjs from 'dayjs';
import EventFightNightCalls from '../api/EventFightNightCalls';
import SideBarComponent from '../components/SideBarComponent';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function EventFightNightCreationPage() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(dayjs());
    const [startTime, setStartTime] = useState(dayjs());
    const [endTime, setEndTime] = useState(dayjs());
    const [place, setPlace] = useState('');
    const [role, setRole] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(storedToken);
        setRole(decodedToken.roles);

        if(role.includes("NORMAL_USER"))
            {
                navigate("/unauthorized");
            }
    });
    
    const handleSubmit = async () => {
        if (!title || !date || !startTime || !endTime || !place) {
            toast.error('Please fill all required fields.');
            return;
        }

        try {
            const eventData = {
                title,
                date: date.toISOString(),
                startTime: startTime.format('HH:mm'),
                endTime: endTime.format('HH:mm'),
                place
            };

            const response = await EventFightNightCalls.createEventFightNight(eventData);
            toast.success('Event Fight Night created successfully');
            console.log('Event Fight Night created:', response);
        } catch (error) {
            console.error('Error creating event fight night:', error);
            toast.error('Failed to create event fight night.');
        }
    };

    return (
        <Container>
            <Stack spacing={2} sx={{ margin: 2 }}>
                <TextField
                    label="Event Fight Night Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Select Date"
                        value={date}
                        onChange={setDate}
                        renderInput={(params) => <TextField {...params} />}
                        minDate={dayjs()}
                    />
                    <TimePicker
                        label="Start Time"
                        value={startTime}
                        onChange={setStartTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TimePicker
                        label="End Time"
                        value={endTime}
                        onChange={setEndTime}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    label="Place"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    fullWidth
                />
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    Create Event Fight Night
                </Button>
                <ToastContainer />
            </Stack>
            <SideBarComponent/>
        </Container>
    );
}
