import React, { useEffect, useState } from 'react';
import UserCalls from '../api/UserCalls';
import { Grid, Paper, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserListComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserCalls.getAppUsers();
        const userList = data.map(item => item.user); 
        setUsers(userList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await UserCalls.deleteAppUser(id);
      setUsers(users.filter(user => user.id !== id));
      setOpenConfirmation(false);
      toast.success('User deleted successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Error deleting user. Please try again later.');
    }
  };

  const handleOpenConfirmation = (id) => {
    setSelectedUserId(id);
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Typography variant="h4" gutterBottom>User List</Typography>
      <Grid container spacing={3}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" component="div">
                {user.username}
              </Typography>
              <Typography variant="body1" component="div">
                {user.email}
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => handleOpenConfirmation(user.id)}
                style={{ marginTop: '8px' }}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedUserId)} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      <ToastContainer />
    </div>
  );
};

export default UserListComponent;
