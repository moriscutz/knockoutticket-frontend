import React, { useState } from 'react';
import '../css/LoginComponentStyle.css';
import { Link } from 'react-router-dom';

const LoginComponent = () => {
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
            <input type="text" placeholder="Username"/>
            <input type="password" placeholder="Password"/>
            <button>login</button>
            <p class="message">Not registered? <Link to="/signup">Create an account</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
