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
} from '@mui/material';
import BookingCalls from '../api/BookingCalls';
import SidebarComponent from '../components/SideBarComponent';
import { jwtDecode } from 'jwt-decode';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

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
  const [open, setOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

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

  const handleOpenDialog = (bookingId) => {
    setBookingToDelete(bookingId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setBookingToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await BookingCalls.deleteBooking(bookingToDelete);
      setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingToDelete));
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to delete booking', error);
      handleCloseDialog();
    }
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell>
                  <Tooltip title="Go to Event">
                    <IconButton component={Link} to={`/eventFightNight/${booking.eventFightNightId}`} color="primary">
                      <EventIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Booking">
                    <IconButton onClick={() => handleOpenDialog(booking.id)} color="secondary">
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
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this booking? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default BookingsComponent;
