import React, { useState, useContext, useEffect } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useWebSocket } from './WebSocketContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const NotificationSenderComponent = () => {
    const [message, setMessage] = useState('');
    const stompClient = useWebSocket();
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

    const sendNotification = () => {
        if (stompClient && stompClient.connected) {
            stompClient.publish({
                destination: '/app/sendNotification',
                body: JSON.stringify({ message }),
            });
            console.log("Notification sent:", message);
        } else {
            console.error('Cannot send notification, not connected to WebSocket');
        }
    };

    return (
        <Container component={Paper} elevation={6} sx={{ p: 3, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4">Send Notification</Typography>
            <TextField
                label="Message"
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={sendNotification}>
                Send Notification
            </Button>
        </Container>
    );
};

export default NotificationSenderComponent;