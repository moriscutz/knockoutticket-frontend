import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/SideBarStyle.css";

const SidebarComponent = () => {
  const toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('close');
  };

  return (
    <nav className="sidebar close">
      <header>
        <p>Hello, Valentin!</p>
        <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
      </header>

      <div className="menu-bar">
        <ul className="menu-links">
          <li className="nav-link">
            <Link to="/">
              <i className='bx bx-home-alt icon'></i>
              <span className="text nav-text">Home</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/about">
              <i className='bx bx-info-circle icon'></i>
              <span className="text nav-text">About</span>
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/contact">
              <i className='bx bx-envelope icon'></i>
              <span className="text nav-text">Contact</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SidebarComponent;
