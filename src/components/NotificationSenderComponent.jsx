import React, { useState, useContext } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import { useWebSocket } from './WebSocketContext';

const NotificationSenderComponent = () => {
    const [message, setMessage] = useState('');
    const stompClient = useWebSocket();

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
            <Button variant="contained" color="primary" onClick={sendNotification}>
                Send Notification
            </Button>
        </Container>
    );
};

export default NotificationSenderComponent;