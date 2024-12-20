import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BoxerCalls from '../api/BoxerCalls';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from '../components/SideBarComponent.jsx';
import { jwtDecode } from 'jwt-decode';

const ModifyBoxerComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [boxerData, setBoxerData] = useState({
        id: '',
        fullName: '',
        wins: '',
        losses: '',
        draws: '',
        age: ''
    });
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [role, setRole] = useState([]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            setRole(decodedToken.roles);

            if (decodedToken.roles.includes("NORMAL_USER")) {
                navigate("/unauthorized");
            }
        }

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
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoxerData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateValues = () => {
        const { wins, losses, draws, age } = boxerData;

        if (wins < 0 || losses < 0 || draws < 0) {
            toast.error('Wins, losses, and draws cannot be negative');
            return false;
        }

        if (wins > 1000 || losses > 1000 || draws > 1000) {
            toast.error('Wins, losses, and draws should not exceed 1000');
            return false;
        }

        if (age < 0) {
            toast.error('Age cannot be negative');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateValues()) {
            return;
        }

        try {
            await BoxerCalls.updateBoxer(boxerData.id, {
                id: boxerData.id,
                fullName: boxerData.fullName,
                wins: boxerData.wins,
                losses: boxerData.losses,
                draws: boxerData.draws,
                age: boxerData.age
            });
            toast.success('Boxer data updated successfully');
        } catch (error) {
            console.error('Error updating boxer data:', error);
            toast.error('Error updating boxer data. Please try again later.');
        }
    };

    const handleDelete = () => {
        setOpenConfirmation(true);
    };

    const confirmDelete = async () => {
        try {
            await BoxerCalls.deleteBoxer(boxerData.id);
            toast.success('Boxer deleted successfully');
            navigate('/');
        } catch (error) {
            console.error('Error deleting boxer:', error);
            toast.error('Error deleting boxer. Please try again later.');
        }
    };

    const cancelDelete = () => {
        setOpenConfirmation(false);
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
                <TextField
                    label="Age"
                    name="age"
                    type="number"
                    value={boxerData.age}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="secondary">
                    Update Boxer
                </Button>
                <Button onClick={handleDelete} variant="contained" color="secondary">
                    Delete
                </Button>
            </form>
            <ToastContainer />
            <SidebarComponent />

            <Dialog open={openConfirmation} onClose={cancelDelete}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to delete this boxer?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ModifyBoxerComponent;
