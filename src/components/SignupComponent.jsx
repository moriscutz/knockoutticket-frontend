import React, { useState } from 'react';
import '../css/LoginComponentStyle.css';
import { Link } from 'react-router-dom';
const SignupComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
  };

  return (
    <div className="container">
      <div className="component">
        <div class="form">
          <form class="login-form">
            <input type="text" placeholder="Email"/>
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
            <button>create account</button>
            <p class="message">Already have an account? <Link to="/login">Log in</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
