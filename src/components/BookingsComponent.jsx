import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import BookingCalls from '../api/BookingCalls';
import SidebarComponent from '../components/SideBarComponent';
import { jwtDecode } from 'jwt-decode';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import EventFightNightCalls from '../api/EventFightNightCalls';
import EventCalls from '../api/EventCalls';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 650,
}));

const LoadingContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const BookingsComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [openEventDialog, setOpenEventDialog] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setId(decodedToken.userId);
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (id) {
        try {
          const bookingsData = await BookingCalls.getBookingsForCustomer(id);
          setBookings(bookingsData.bookings);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch bookings', error);
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [id]);

  const handleDelete = async () => {
    try {
      await BookingCalls.deleteBooking(bookingToDelete);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingToDelete));
      setOpenDeleteDialog(false);
      setBookingToDelete(null);
    } catch (error) {
      console.error('Failed to delete booking', error);
    }
  };

  const openDeleteDialogHandler = (bookingId) => {
    setBookingToDelete(bookingId);
    setOpenDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setBookingToDelete(null);
  };

  const fetchEventDetails = async (eventFightNightId) => {
    try {
      const fightNight = await EventFightNightCalls.getEventFightNight(eventFightNightId);
      const eventsWithBoxers = await Promise.all(fightNight.events.map(async (event) => {
        const boxers = await EventCalls.getEventBoxers(event.id);
        return {
          ...event,
          boxer1: boxers.boxer1,
          boxer2: boxers.boxer2
        };
      }));
      setEventDetails({ ...fightNight, events: eventsWithBoxers });
    } catch (error) {
      console.error('Failed to fetch event details', error);
    }
  };

  const openEventDialogHandler = (eventFightNightId) => {
    fetchEventDetails(eventFightNightId);
    setOpenEventDialog(true);
  };

  const closeEventDialog = () => {
    setOpenEventDialog(false);
    setEventDetails(null);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Your Bookings
      </Typography>
      <TableContainer component={Paper}>
        <StyledTable aria-label="bookings table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Event Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell>{booking.eventFightNight.title}</TableCell>
                <TableCell>
                  <Tooltip title="View Event Details">
                    <IconButton onClick={() => openEventDialogHandler(booking.eventFightNight.id)} color="primary">
                      <EventIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Booking">
                    <IconButton onClick={() => openDeleteDialogHandler(booking.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </TableContainer>
      <SidebarComponent />
      <Dialog
        open={openDeleteDialog}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Booking"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEventDialog}
        onClose={closeEventDialog}
        aria-labelledby="event-dialog-title"
      >
        <DialogTitle id="event-dialog-title">Event Details</DialogTitle>
        <DialogContent>
          {eventDetails && (
            <>
              <Typography variant="h6" gutterBottom>{eventDetails.title}</Typography>
              <Typography variant="body1" gutterBottom>Date: {new Date(eventDetails.date).toLocaleDateString()}</Typography>
              <Typography variant="body1" gutterBottom>Start Time: {eventDetails.startTime}</Typography>
              <Typography variant="body1" gutterBottom>End Time: {eventDetails.endTime}</Typography>
              <Typography variant="body1" gutterBottom>Place: {eventDetails.place}</Typography>
              <Grid container spacing={2}>
                {eventDetails.events.map((event) => (
                  <Grid item xs={12} md={6} key={event.id}>
                    <Card sx={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">{event.boxer1.fullName} vs {event.boxer2.fullName}</Typography>
                        <Typography variant="body2" color="textSecondary">{event.boxer1.wins}-{event.boxer1.losses}-{event.boxer1.draws} vs {event.boxer2.wins}-{event.boxer2.losses}-{event.boxer2.draws}</Typography>
                        <Typography variant="body2" color="textSecondary">{event.status}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEventDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default BookingsComponent;
