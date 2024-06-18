import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import BoxerCalls from '../api/BoxerCalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AggregatedBoxerStats = () => {
    const [stats, setStats] = useState({ averageWins: 0, averageLosses: 0, averageDraws: 0 });
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await BoxerCalls.getAggregatedBoxerStats();
                setStats(data);
                if (data.averageWins > 0 || data.averageLosses > 0 || data.averageDraws > 0) {
                    setShowStats(true);
                } else {
                    setShowStats(false);
                }
            } catch (error) {
                console.error('Error fetching aggregated boxer stats:', error);
                toast.error('Error fetching aggregated boxer stats. Please try again later.');
            }
        };

        fetchStats();
    }, []);

    if (!showStats) {
        return null;  
    }

    return (
        <Container>
            <br/>
            <br/>
            <Typography variant="h6" gutterBottom>
                Average of wins and losses of our fighters:
            </Typography>
            <Typography variant="body3">
                Average Wins: {stats.averageWins.toFixed(2)}
            </Typography>
            <br/>
            <Typography variant="body3">
                Average Losses: {stats.averageLosses.toFixed(2)}
            </Typography>
            <ToastContainer />
        </Container>
    );
};

export default AggregatedBoxerStats;
