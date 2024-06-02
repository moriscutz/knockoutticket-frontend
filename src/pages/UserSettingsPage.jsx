import React from 'react';
import { Container, Grid } from '@mui/material';
import UserSettings from '../components/UserSettings.jsx';
import SideBarComponent from '../components/SideBarComponent.jsx';

const UserSettingsPage = () => {
  return (
    <Grid container>
      <Grid item xs={3}>
        <SideBarComponent />
      </Grid>
      <Grid item xs={9}>
        <Container>
          <UserSettings />
        </Container>
      </Grid>
    </Grid>
  );
};

export default UserSettingsPage;
