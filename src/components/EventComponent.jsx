import React, { useState } from "react"; 
import { Link } from 'react-router-dom';
import '../css/EventPostStyle.css';

const EventComponent = () => {
    const [formData, setFormData] = useState({
        boxer1: '',
        boxer2: '',
        date: '',
        place: '',
    });
    
    return (
        <div className="container">
    <div className="form">
      <div className="boxer">
        <div className="boxer-info">
          <h2>Boxer 1</h2>
          <p>Record: 25 wins, 2 losses, 1 draw</p>
        </div>
      </div>
      <div className="vs">
        <h2>VS</h2>
      </div>
      <div className="boxer">
        <div className="boxer-info">
          <h2>Boxer 2</h2>
          <p>Record: 20 wins, 5 losses</p>
        </div>
      </div>
    </div>
  </div>
    );
};

export default EventComponent;
