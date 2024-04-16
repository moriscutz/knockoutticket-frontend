import React, { useState } from 'react';
import '../css/LoginComponentStyle.css';
import { Link } from 'react-router-dom';
import { authService } from '../api/LoginCalls';

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      const response = await authService.loginApi(formData);
      console.log(response); 
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error during login: ', error);
    }
  };

  return (
    <div className="container">
      <div className="component">
        <div className="form">
          {isLoggedIn ? ( 
            <p>You are logged in!</p>
          ) : (
          <form className="login-form" onSubmit={handleSubmit}>
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
            <button type="submit">Login</button> 
            <p className="message">
              Not registered? <Link to="/signup">Create an account</Link>
            </p>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
