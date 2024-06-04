import React, { useState, useEffect } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BoxerCalls from '../api/BoxerCalls';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from '../components/SideBarComponent.jsx';

const ModifyBoxerComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [boxerData, setBoxerData] = useState({
        id: '',
        fullName: '',
        wins: '',
        losses: '',
        draws: ''
    });

    useEffect(() => {
        const fetchBoxerData = async () => {
            try {
                const response = await BoxerCalls.getBoxerById(id);
                setBoxerData(response);
            } catch (error) {
                console.error('Error fetching boxer data:', error);
                toast.error('Error fetching boxer data. Please try again later.');
            }
        };

        fetchBoxerData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoxerData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await BoxerCalls.updateBoxer(boxerData.id, {
                id: boxerData.id,
                fullName: boxerData.fullName,
                wins: boxerData.wins,
                losses: boxerData.losses,
                draws: boxerData.draws
            });
            toast.success('Boxer data updated successfully');
        } catch (error) {
            console.error('Error updating boxer data:', error);
            toast.error('Error updating boxer data. Please try again later.');
        }
    };

    const handleDelete = async (id) => {
        try {
          await BoxerCalls.deleteBoxer(id);
          toast.success('Boxer deleted successfully');
          navigate('/');
        } catch (error) {
          console.error('Error deleting boxer:', error);
          toast.error('Error deleting boxer. Please try again later.');
        }
      };

    
    return (
        <Container>
            <h2>Modify Boxer</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Full Name"
                    name="fullName"
                    value={boxerData.fullName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Wins"
                    name="wins"
                    type="number"
                    value={boxerData.wins}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Losses"
                    name="losses"
                    type="number"
                    value={boxerData.losses}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Draws"
                    name="draws"
                    type="number"
                    value={boxerData.draws}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Update Boxer
                </Button> 
                <Button onClick={() => handleDelete(boxerData.id)} variant="contained" color="primary">
                  Delete
                </Button>
            </form>
            <ToastContainer />
            <SidebarComponent/>
        </Container>
    );
};

export default ModifyBoxerComponent;