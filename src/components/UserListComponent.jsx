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
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <ToastContainer />
    </div>
  );
};

export default UserListComponent;
