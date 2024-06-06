import React, { useState } from 'react';
import '../css/LoginComponentStyle.css';
import { Link } from 'react-router-dom';
import UserCalls from '../api/UserCalls.jsx'; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignupComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
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

    // Client-side validation
    let isValid = true;
    const errorsCopy = { ...errors };

    if (!formData.email) {
      errorsCopy.email = "Email is required";
      isValid = false;
    } else {
      errorsCopy.email = "";
    }

    if (!formData.username) {
      errorsCopy.username = "Username is required";
      isValid = false;
    } else {
      errorsCopy.username = "";
    }

    if (!formData.password) {
      errorsCopy.password = "Password is required";
      isValid = false;
    } else {
      errorsCopy.password = "";
    }

    setErrors(errorsCopy);

    if (isValid) {
      try {
        const response = await UserCalls.createAppUser(formData);
        console.log(response);
        console.log('User created successfully!');
        toast("Your account has been created");
        navigate("/login");
      } catch (error) {
        console.error('Error creating user:', error);
        toast("There has been an error", error);
      }
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
            {errors.email && <p className="error-message">❌ {errors.email}</p>}
            <input
              type="text"
              placeholder="Username"
              name="username" 
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error-message">❌ {errors.username}</p>}
            <input
              type="password"
              placeholder="Password"
              name="password" 
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-message">❌ {errors.password}</p>}
            <button type="submit">Create account</button> 
            <p className="message">Already have an account? <Link to="/login">Log in</Link></p> 
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default SignupComponent;
