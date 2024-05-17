import React from 'react';
import SideBarComponent from '../components/SideBarComponent';
import SidebarComponent from '../components/SideBarComponent';

const Unauthorized = () => {
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <SidebarComponent/>
    </div>
  );
};

export default Unauthorized;
