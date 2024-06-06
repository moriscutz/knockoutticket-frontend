import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        const client = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            reconnectDelay: 5000,
            debug: (str) => console.log(str),
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe('/topic/notifications', (message) => {
                    console.log('Notification received:', JSON.parse(message.body));
                });
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
            },
            onStompError: (frame) => {
                console.error(`Broker reported error: ${frame.headers['message']}`);
                console.error(`Additional details: ${frame.body}`);
            },
        });

        client.activate();
        setStompClient(client);

        const subscribeToNotifications = (client) => {
            client.subscribe('/topic/notifications', (message) => {
                console.log('Notification received:', JSON.parse(message.body));
            });
        };


       return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={stompClient}>
            {children}
        </WebSocketContext.Provider>
    );
};
