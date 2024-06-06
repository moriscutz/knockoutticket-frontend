import React, { useState, useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import UserCalls from '../api/UserCalls';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode }from 'jwt-decode';

const UserSettings = () => {
  const [userData, setUserData] = useState({
    id: '',
    username: '',
    email: '',
    password: '',
    userType: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; 
        const username = decodedToken.sub; 

        const userResponse = await UserCalls.getAppUser(userId);
        const user = userResponse.user;
        setUserData({
          id: userId,
          username: user.username, 
          email: user.email,
          password: '', 
          userType: user.userType[0],
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error fetching user data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if at least one field is filled
    const filledFields = Object.values(userData).filter(value => value !== '');
    if (filledFields.length === 0) {
      toast.error('Please fill at least one field');
      return;
    }

    try {
      await UserCalls.updateAppUser(userData.id, {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        userType: userData.userType, 
      });
      toast.success('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
      toast.error('Error updating user data. Please try again later.');
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h2>User Settings</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={userData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled 
        />
        <TextField
          label="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          helperText="Enter a new password if you want to change it"
        />
        <Button type="submit" variant="contained" color="secondary">
          Update
        </Button>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default UserSettings;
