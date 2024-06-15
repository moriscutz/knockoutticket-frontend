import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete, Stack, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import BoxerCalls from '../api/BoxerCalls';
import EventFightNightCalls from '../api/EventFightNightCalls';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import SidebarComponent from '../components/SideBarComponent';

const AddEventToFightNightComponent = ({ fightNightId, eventFightNightDate, eventFightNightStartTime, eventFightNightEndTime, onEventAdded }) => {
    const [boxers, setBoxers] = useState([]);
    const [selectedBoxer1, setSelectedBoxer1] = useState(null);
    const [selectedBoxer2, setSelectedBoxer2] = useState(null);
    const [place, setPlace] = useState('');
    const [status, setStatus] = useState('SCHEDULED');
    const [startTime, setStartTime] = useState(eventFightNightStartTime);
    const [endTime, setEndTime] = useState(eventFightNightEndTime);

    const eventStatusOptions = [
        { value: 'SCHEDULED', label: 'Scheduled' },
        { value: 'ONGOING', label: 'Ongoing' },
        { value: 'COMPLETE', label: 'Complete' },
        { value: 'DRAW', label: 'Draw' },
        { value: 'NO_CONTEST', label: 'No Contest' }
    ];

    useEffect(() => {
        BoxerCalls.getAllBoxers()
            .then(data => {
                setBoxers(data.map(b => b.boxer)); 
            })
            .catch(error => {
                console.error('Failed to fetch boxers:', error);
                toast.error('Failed to load boxers.');
            });
    }, []);

    const handleSubmit = async () => {
        if (!selectedBoxer1 || !selectedBoxer2 || !place || !status) {
            toast.error('Please fill all required fields.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Authentication required.');
                return;
            }

            const startDateTime = dayjs(eventFightNightDate).hour(dayjs(startTime).hour()).minute(dayjs(startTime).minute()).second(0).millisecond(0).toISOString();
            const endDateTime = dayjs(eventFightNightDate).hour(dayjs(endTime).hour()).minute(dayjs(endTime).minute()).second(0).millisecond(0).toISOString();

            const eventData = {
                eventFightNightId: fightNightId,
                boxerId1: selectedBoxer1.id,
                boxerId2: selectedBoxer2.id,
                organizerId: jwtDecode(token).userId,
                startTime: startDateTime,
                endTime: endDateTime,
                status,
                place
            };

            const response = await EventFightNightCalls.addEventToFightNight(eventData);
            toast.success('Event added to Fight Night successfully!');
            onEventAdded();
        } catch (error) {
            console.error('Error adding event to Fight Night:', error);
            toast.error('Failed to add event to Fight Night.');
        }
    };

    return (
        <div>
            <Stack spacing={2}>
                <Autocomplete
                    options={boxers}
                    getOptionLabel={(option) => option.fullName}
                    value={selectedBoxer1}
                    onChange={(event, newValue) => setSelectedBoxer1(newValue)}
                    renderInput={(params) => <TextField {...params} label="Select Boxer 1" />}
                />
                <Autocomplete
                    options={boxers}
                    getOptionLabel={(option) => option.fullName}
                    value={selectedBoxer2}
                    onChange={(event, newValue) => setSelectedBoxer2(newValue)}
                    renderInput={(params) => <TextField {...params} label="Select Boxer 2" />}
                />
                <TextField
                    label="Event Place"
                    margin="normal"
                    value={place}
                    fullWidth
                    onChange={(e) => setPlace(e.target.value)}
                />
                <TextField
                    select
                    label="Event Status"
                    margin="normal"
                    value={status}
                    fullWidth
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {eventStatusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>Add Event to Fight Night</Button>
                <ToastContainer />
                <SidebarComponent/>
            </Stack>
        </div>
    );
};

export default AddEventToFightNightComponent;
