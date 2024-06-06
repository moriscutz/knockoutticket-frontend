import React from 'react';
import SidebarComponent from '../components/SideBarComponent.jsx';
import NotificationSenderComponent from '../components/NotificationSenderComponent.jsx';
import { Grid, Container } from '@mui/material';

const NotificationPage = () => {
    return(
        <div>
            <SidebarComponent/>
            <NotificationSenderComponent/>
        </div>
    );
};

export default NotificationPage;