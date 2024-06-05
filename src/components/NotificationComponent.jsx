import React, { useState } from 'react';
import { useWebSocket } from './contexts/WebSocketContext';
import { Button, TextField } from '@mui/material';

const NotificationComponent = () => {
    const [message, setMessage] = useState('');
    const stompClient = useWebSocket();

    const handleSendNotification = () => {
        if (stompClient) {
            stompClient.publish({
                destination: '/app/sendNotification',
                body: JSON.stringify({ message }),
            });
        }
    };

    return (
        <div>
            <TextField
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                label="Message"
                variant="outlined"
            />
            <Button onClick={handleSendNotification} color="primary" variant="contained">
                Send Notification
            </Button>
        </div>
    );
};

export default NotificationComponent;
