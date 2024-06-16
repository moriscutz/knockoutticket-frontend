import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArchiveCalls from '../api/ArchiveCalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventCalls from '../api/EventCalls';
import BoxerCalls from '../api/BoxerCalls';

const CompleteEventButton = ({ event }) => {
  const [open, setOpen] = useState(false);
  const [boxer1Id, setBoxer1Id] = useState('');
  const [boxer2Id, setBoxer2Id] = useState('');
  const [status, setStatus] = useState('');
  const [selectedWinner, setSelectedWinner] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBoxers = async () => {
      try {
        const boxers = await EventCalls.getEventBoxers(event.id);
        if (boxers) {
          setBoxer1Id(boxers.boxer1.id);
          setBoxer2Id(boxers.boxer2.id);
        }
      } catch (error) {
        console.error('Error fetching boxers:', error);
        toast.error('Failed to load boxers for the event.');
      }
    };

    if (open) {
      fetchBoxers();
    }
  }, [event.id, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCompleteEvent = async () => {
    try {
        console.log(event);
      const archivedEventData = {
        organizerId: event.organizerId,
        date: event.date,
        winnerId: status === 'DRAW' || status === 'NO_CONTEST' ? boxer1Id : (selectedWinner === 'BOXER1' ? boxer1Id : boxer2Id),
        loserId: status === 'DRAW' || status === 'NO_CONTEST' ? boxer2Id : (selectedWinner === 'BOXER1' ? boxer2Id : boxer1Id),
        place: event.place,
        eventId: event.id,
      };
      
      if (status === 'WINNER') {
        const winnerId = selectedWinner === 'BOXER1' ? boxer1Id : boxer2Id;
        const loserId = selectedWinner === 'BOXER1' ? boxer2Id : boxer1Id;

        await BoxerCalls.updateBoxerRecord(winnerId, { id: winnerId, wins: 1, losses: 0, draws: 0 });
        await BoxerCalls.updateBoxerRecord(loserId, { id: loserId, wins: 0, losses: 1, draws: 0 });
      } else if (status === 'DRAW') {
        await BoxerCalls.updateBoxerRecord(boxer1Id, { id: boxer1Id, wins: 0, losses: 0, draws: 1 });
        await BoxerCalls.updateBoxerRecord(boxer2Id, { id: boxer2Id, wins: 0, losses: 0, draws: 1 });
      } 

      await ArchiveCalls.createArchivedEvent(archivedEventData);

      toast.success('Event archived successfully');
      toast.success('Boxer records have been updated successfully!');
    } catch (error) {
      toast.error('Failed to archive event');
    } finally {
      setOpen(false);
    }
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Complete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Complete Event</DialogTitle>
        <DialogContent>
          <Typography>Select the status of the match:</Typography>
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="WINNER">Winner</MenuItem>
            <MenuItem value="DRAW">Draw</MenuItem>
            <MenuItem value="NO_CONTEST">No Contest</MenuItem>
          </TextField>
          {status === 'WINNER' && (
            <Box>
              <TextField
                label="Boxer 1 ID"
                value={boxer1Id}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Boxer 2 ID"
                value={boxer2Id}
                fullWidth
                margin="normal"
                InputProps={{
                  readOnly: true,
                }}
              />
              <Typography variant="h6">Select Winner</Typography>
              <Button
                variant="outlined"
                onClick={() => setSelectedWinner('BOXER1')}
                sx={{ margin: 1 }}
                
              >
                Boxer 1
              </Button>
              <Button
                variant="outlined"
                onClick={() => setSelectedWinner('BOXER2')}
                sx={{ margin: 1 }}
                
              >
                Boxer 2
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCompleteEvent} color="primary">Complete</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default CompleteEventButton;
