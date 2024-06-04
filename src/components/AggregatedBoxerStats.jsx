import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import BoxerCalls from '../api/BoxerCalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AggregatedBoxerStats = () => {
    const [stats, setStats] = useState({ averageWins: 0, averageLosses: 0, averageDraws: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await BoxerCalls.getAggregatedBoxerStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching aggregated boxer stats:', error);
                toast.error('Error fetching aggregated boxer stats. Please try again later.');
            }
        };

        fetchStats();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Average of wins and losses of our fighters:
            </Typography>
            <Typography variant="body1">
                Average Wins: {stats.averageWins.toFixed(2)}
            </Typography>
            <Typography variant="body1">
                Average Losses: {stats.averageLosses.toFixed(2)}
            </Typography>
            <ToastContainer />
        </Container>
    );
};

export default AggregatedBoxerStats;