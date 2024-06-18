import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import UserCalls from '../api/UserCalls';
import AdminCalls from '../api/AdminCalls'; 
import SidebarComponent from './SideBarComponent';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentRole, setCurrentRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      if (!decodedToken.roles.includes("ADMINISTRATOR")) {
        navigate("/unauthorized");
      }
    }

    const fetchUsers = async () => {
      try {
        const data = await UserCalls.getAppUsers();
        setUsers(data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleDeleteSubmit = async () => {
    try {
      await UserCalls.deleteAppUser(selectedUser.user.id);
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      handleDeleteClose();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setCurrentRole(user.userType); 
    setOpenEditDialog(true);
  };

  const handleRoleChange = (event) => {
    setCurrentRole(event.target.value);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
  };

  const handleEditSubmit = async () => {
    try {
      await AdminCalls.updateUserRoles(selectedUser.user.id, { userType: [currentRole] });
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id ? { ...user, userType: currentRole } : user
      );
      setUsers(updatedUsers);
      handleEditClose();
      window.location.reload();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(dataItem => (
              <TableRow key={dataItem.user.id}>
                <TableCell>{dataItem.user.username}</TableCell>
                <TableCell>{dataItem.user.email}</TableCell>
                <TableCell>{dataItem.user.userType}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(dataItem)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(dataItem)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDeleteDialog} onClose={handleDeleteClose}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={handleDeleteSubmit}>Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a new role for the user.
          </DialogContentText>
          <Select
            label="Role"
            value={currentRole}
            onChange={handleRoleChange}
            fullWidth
          >
            <MenuItem value="ADMINISTRATOR">Administrator</MenuItem>
            <MenuItem value="EVENT_ORGANIZER">Event Organizer</MenuItem>
            <MenuItem value="NORMAL_USER">Normal User</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Update</Button>
        </DialogActions>
      </Dialog>

      <SidebarComponent/>
    </Container>
  );
};

export default AdminDashboard;
