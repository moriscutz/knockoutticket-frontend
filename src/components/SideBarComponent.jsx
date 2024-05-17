import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/SideBarStyle.css";
import { jwtDecode } from 'jwt-decode';
import LogoutButton from '../components/LogOutButton';

const SidebarComponent = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUserRole(decodedToken.roles);
    }
  }, []);

  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('close');
  };
  
  return (
    <nav className="sidebar close">
      <header>
        <p>Hello, {userRole}!</p>
        <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <ul className="menu-links">
          <li className="nav-link">
            <Link to="/">
              <i className='bx bx-home-alt icon'></i>
              <span className="text nav-text">Home</span>
            </Link>
            <LogoutButton/>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SidebarComponent;
