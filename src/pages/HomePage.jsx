import React, {useState, useEffect} from 'react';
import LoginComponent from "../components/LoginComponent.jsx";
import "../css/HomePageStyle.css";
import EventComponent from "../components/EventComponent.jsx";

const HomePage = () => {
  return (
    <div>
      <EventComponent />
    </div>
  );
};

export default HomePage;
