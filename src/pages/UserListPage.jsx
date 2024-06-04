import React from 'react';
import { Grid } from '@mui/material';
import SideBarComponent from '../components/SideBarComponent.jsx';
import UserListComponent from '../components/UserListComponent';

const UserListPage = () => {
  return (
    <div>
        <SideBarComponent />
        <UserListComponent />
    </div>
        
  );
};

export default UserListPage;
