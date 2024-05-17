import React, { useState, useEffect} from 'react';
import '../css/LoginComponentStyle.css';
import { Link } from 'react-router-dom';
import { authService } from '../api/LoginCalls';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode }  from 'jwt-decode';
import {useNavigate} from "react-router-dom";

const LoginComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const decodedToken = JSON.parse(localStorage.getItem('user'));
      if(decodedToken.roles.includes("ADMINISTRATOR"))
        navigate("/createboxer");
      else if(decodedToken.roles.includes("EVENT_ORGANIZER"))
        navigate("/createevent");
      else if (decodedToken.roles.includes("NORMAL_USER"));
      navigate("/");
    }
  }, []);
  
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
      const { accessToken } = response;
      console.log(response); 

      const decodedToken = jwtDecode(accessToken);

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(decodedToken));

      if (decodedToken.roles && decodedToken.roles.includes('ADMINISTRATOR')) {
        navigate('/createboxer');
      } else  if ( decodedToken.roles && decodedToken.roles.includes('NORMAL_USER')) {
        navigate('/');
      } else if (decodedToken.roles && decodedToken.roles.includes('EVENT_ORGANIZER')){
        navigate('/createevent');
      }

      setIsLoggedIn(true);
      toast("You have been logged in")

    } catch (error) {

      console.error('Error during login: ', error);
      toast("There has been an error during the login process")

    }
  };

  return (
    <div className="container">
      <div className="component">
        <div className="form">

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
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginComponent;
