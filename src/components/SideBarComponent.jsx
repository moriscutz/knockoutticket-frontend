import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Typography } from '@mui/material';
import { Home as HomeIcon, AddBox as AddBoxIcon, Settings as SettingsIcon, List as ListIcon, AddAlert as AddAlertIcon, Groups as GroupsIcon, EventNote as EventNoteIcon, Menu as MenuIcon } from '@mui/icons-material';
import { jwtDecode } from 'jwt-decode';
import LogoutButton from './LogOutButton';
import '../css/SideBarComponentStyle.css';

const SidebarComponent = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUsername(decodedToken.sub);
      setRole(decodedToken.roles);
    }
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const isEventOrganizerOrAdmin = role.includes("EVENT_ORGANIZER") || role.includes("ADMINISTRATOR");

  return (
    <>
      <div className="menu-button">
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </div>
      <Drawer variant="persistent" anchor="left" open={open} onClose={toggleDrawer}>
        <div>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Hello, {username}!
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {role.join(", ")}
          </Typography>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          {isEventOrganizerOrAdmin && (
            <>
              <ListItem button component={Link} to="/createboxer" onClick={toggleDrawer}>
                <ListItemIcon><AddBoxIcon /></ListItemIcon>
                <ListItemText primary="Create Boxer" />
              </ListItem>
              <ListItem button component={Link} to="/createEventFightNight" onClick={toggleDrawer}>
                <ListItemIcon><EventNoteIcon /></ListItemIcon>
                <ListItemText primary="Create Event Fight Night" />
              </ListItem>
              <ListItem button component={Link} to="/sendnotification" onClick={toggleDrawer}>
                <ListItemIcon><AddAlertIcon /></ListItemIcon>
                <ListItemText primary="Send Notifications" />
              </ListItem>
              <ListItem button component={Link} to="/users" onClick={toggleDrawer}>
                <ListItemIcon><GroupsIcon /></ListItemIcon>
                <ListItemText primary="Users list" />
              </ListItem>
            </>
          )}
          <ListItem button component={Link} to="/boxerslist" onClick={toggleDrawer}>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary="Boxers List" />
          </ListItem>
          <ListItem button component={Link} to="/eventFightNights" onClick={toggleDrawer}>
            <ListItemIcon><EventNoteIcon /></ListItemIcon>
            <ListItemText primary="Event Fight Nights" />
          </ListItem>
          <ListItem button component={Link} to="/settings" onClick={toggleDrawer}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          {role.includes("ADMINISTRATOR") && (
            <ListItem button component={Link} to="/admin" onClick={toggleDrawer}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
          )}
          {role.includes("EVENT_ORGANIZER") && (
            <ListItem button component={Link} to="/event-organizer-dashboard" onClick={toggleDrawer}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Organizer Dashboard" />
          </ListItem>
          )}
          <ListItem>
            <LogoutButton />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default SidebarComponent;
