import React from 'react';
import { Container, Grid } from '@mui/material';
import UserSettings from '../components/UserSettings.jsx';
import SideBarComponent from '../components/SideBarComponent.jsx';

const UserSettingsPage = () => {
  return (
    <div>
      <SideBarComponent />
      <UserSettings />
    </div>
        
  );
};

export default UserSettingsPage;
