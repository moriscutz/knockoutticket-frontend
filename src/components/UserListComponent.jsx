import React, { useEffect, useState } from 'react';
import UserCalls from '../api/UserCalls';
import { Grid, Paper, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserListComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          <Grid item xs={12} sm={6} md={6} key={user.id}>
           <Paper elevation={3} sx={{ padding: 2, height: '50px', width: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" component="div">
                {user.username}
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
