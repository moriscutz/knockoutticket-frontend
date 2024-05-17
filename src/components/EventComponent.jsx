import React, { useState } from "react"; 
import { Link } from 'react-router-dom';
import '../css/HomePageStyle.css';
import '../css/EventStyle.css';

const EventComponent = () => {
    const [formData, setFormData] = useState({
        boxer1: '',
        boxer2: '',
        date: '',
        place: '',
    });
    
    return (
      <div className="box-container">
      <div className="box">
        <div className="box-header">
          <span>test VS test</span>
          <p></p>
          <span>0-0-0 - 0-0-0</span>
        </div>
        <div className="box-details">
          <p>Date: TBD</p>
          <p>Location: TBD</p>
          <button>Buy Tickets</button>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
