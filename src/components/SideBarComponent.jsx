import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../css/SideBarStyle.css";
import { jwtDecode } from 'jwt-decode';
import LogoutButton from '../components/LogOutButton';
import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import ListIcon from '@mui/icons-material/List';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import GroupsIcon from '@mui/icons-material/Groups';


const SidebarComponent = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUsername(decodedToken.sub);
      setRole(decodedToken.roles);

      if(decodedToken.roles.includes("EVENT_ORGANIZER"))
        setRole("EVENT_ORGANIZER");
    }
  }, []);

  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('close');
  };
  
  return (
    <nav className="sidebar close">
      <header>
        <p>Hello, {username}!</p>
        <span className="text nav-text">{role}</span>
        <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
      </header>
      <div className="menu-bar">
        <ul className="menu-links">
          <li className="nav-link">
            <Link to="/">
              <HomeIcon className='icon' />
              <span className="text nav-text">Home</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/createboxer">
              <AddBoxIcon className='icon' />
              <span className="text nav-text">Create Boxer</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/createevent">
              <EventIcon className='icon' />
              <span className="text nav-text">Create Event</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/boxerslist">
              <ListIcon className='icon' />
              <span className="text nav-text">Boxers List</span>
            </Link>
          </li>
          {role === "EVENT_ORGANIZER" && (
            <li className="nav-link">
              <Link to="/sendnotification">
                <AddAlertIcon className='icon'/>
                <span className="text nav-text">Send Notifications</span>
              </Link>
            </li>
          )}
          <li className="nav-link">
            <Link to="/users">
              <GroupsIcon className='icon'/>
              <span className="text nav-text">Users list</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/settings">
              <SettingsIcon className='icon' />
              <span className="text nav-text">Settings</span>
            </Link>
          </li>
          <li className="nav-link">
            <LogoutButton />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SidebarComponent;
