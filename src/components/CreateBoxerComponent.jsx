import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import BoxerCalls from '../api/BoxerCalls.jsx';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const weightClasses = ['HEAVYWEIGHT', 'LIGHT_HEAVYWEIGHT', 'MIDDLEWEIGHT', 'WELTERWEIGHT', 'LIGHTWEIGHT', 'FEATHERWEIGHT'];

const CreateBoxerComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    weightClass: '',
    wins: '',
    losses: '',
    draws: '',
    weight: '',
    age: ''
  });
  const [role, setRole] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.roles);

      if (decodedToken.roles.includes("NORMAL_USER")) {
        navigate("/unauthorized");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateValues = () => {
    const { wins, losses, draws, weight, age } = formData;

    if (wins < 0 || losses < 0 || draws < 0 || weight < 0 || age < 0) {
      toast.error('Wins, losses, draws, weight, and age cannot be negative');
      return false;
    }

    if (wins > 1000 || losses > 1000 || draws > 1000 || weight > 500 || age > 100) {
      toast.error('Invalid input values. Please check the limits.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['fullName', 'weightClass', 'wins', 'losses', 'draws', 'weight', 'age'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!validateValues()) {
      return;
    }

    try {
      await BoxerCalls.createBoxer(formData);
      console.log('Boxer created successfully!');
      toast.success("Boxer created successfully");
    } catch (error) {
      console.error('Error creating boxer: ', error);
      toast.error("There has been an error with creating the boxer");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Create boxer</p>
      <TextField
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Weight Class"
        name="weightClass"
        value={formData.weightClass}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        {weightClasses.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        type="number"
        label="Wins"
        name="wins"
        value={formData.wins}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Losses"
        name="losses"
        value={formData.losses}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Draws"
        name="draws"
        value={formData.draws}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Weight (kgs)"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        type="number"
        label="Age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="secondary">
        Submit
      </Button>
      <ToastContainer />
    </form>
  );
};

export default CreateBoxerComponent;
