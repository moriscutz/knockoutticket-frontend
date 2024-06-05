import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useWebSocket } from './WebSocketContext';

const NotificationReceiverComponent = () => {
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState('');
    const stompClient = useWebSocket();

    useEffect(() => {
        if (stompClient && stompClient.connected) {  
            const subscription = stompClient.subscribe('/topic/notifications', (message) => {
                setNotification(JSON.parse(message.body).message);
                setOpen(true);
            });

            return () => subscription.unsubscribe();  
        }
    }); 

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  
        >
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                {notification}
            </Alert>
        </Snackbar>
    );
};

export default NotificationReceiverComponent;
