import React from 'react';
import SidebarComponent from '../components/SideBarComponent';
import '../css/UnauthorizedStyle.css';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
        <div className="container">
          <div className="title">
          <h1><Link to="/">HOME</Link> </h1>
          </div>
          <div className="ghost">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      <SidebarComponent/>
    </div>
  );
};

export default Unauthorized;
