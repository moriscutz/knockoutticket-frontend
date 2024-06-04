import React, { useEffect, useState } from 'react';
import UserCalls from '../api/UserCalls';
import { Grid, Paper, Button, Typography } from '@mui/material';

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

  const handleDelete = async (id) => {
    try {
      await UserCalls.deleteAppUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
    }
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
                onClick={() => handleDelete(user.id)}
                style={{ marginTop: '8px' }}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserListComponent;
