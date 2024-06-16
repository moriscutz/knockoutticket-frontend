import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, TextField, Button } from '@mui/material';
import BoxerCalls from '../api/BoxerCalls';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBarComponent from './SideBarComponent';
import { jwtDecode } from 'jwt-decode';

const BoxersListComponent = () => {
  const [boxers, setBoxers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    fullName: '',
    minWins: '',
    maxLosses: ''
  });
  const [role, setRole] = useState([]);

  const fetchBoxers = async (filters = {}) => {
    try {
      const boxersData = await BoxerCalls.getAllBoxers(filters);
      const flattenedBoxers = boxersData.map(data => data.boxer);
      setBoxers(flattenedBoxers);
    } catch (error) {
      console.error('Error fetching boxers:', error);
      toast.error('Error fetching boxers. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      
      setRole(decodedToken.roles);
    }
    fetchBoxers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSearch = () => {
    setIsLoading(true);
    fetchBoxers(filters);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  const isEventOrganizerOrAdmin = role.includes("EVENT_ORGANIZER") || role.includes("ADMINISTRATOR");

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Boxers List
      </Typography>
      <Grid container spacing={3} marginBottom={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Full Name"
            name="fullName"
            value={filters.fullName}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Min Wins"
            name="minWins"
            type="number"
            value={filters.minWins}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Max Losses"
            name="maxLosses"
            type="number"
            value={filters.maxLosses}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {boxers.map((boxer) => (
          <Grid item xs={12} md={6} lg={4} key={boxer.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  <Link to={`/modifyboxer/${boxer.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {boxer.fullName}
                  </Link>
                </Typography>
                <Typography color="textSecondary">
                  Wins: {boxer.wins}, Losses: {boxer.losses}, Draws: {boxer.draws}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br/>
      {isEventOrganizerOrAdmin && (
        <Typography variant="h7" gutterBottom>
        Click on the boxer's name to modify the Boxer's data
        </Typography>
      )}
      <ToastContainer />
      <SideBarComponent />
    </Container>
  );
};

export default BoxersListComponent;
