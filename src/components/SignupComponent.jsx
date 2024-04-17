import React, { useState } from 'react';
import '../css/LoginComponentStyle.css';
import { Link } from 'react-router-dom';
import UserCalls from '../api/UserCalls.jsx'; 

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await UserCalls.createAppUser(formData);
      console.log(response);
      console.log('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="container">
      <div className="component">
        <div className="form">
          <form className="login-form" onSubmit={handleSubmit} method="post">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Username"
              name="username" 
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password" 
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Create account</button> 
            <p className="message">Already have an account? <Link to="/">Log in</Link></p> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
