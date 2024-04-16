import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginComponent from './components/LoginComponent.jsx';
import SignupComponent from './components/SignupComponent.jsx';
import SideBarComponent from './components/SideBarComponent.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/homepage" element={<HomePage/>} />
          <Route path="/login" element={<LoginComponent/>} />
          <Route path="/signup" element={<SignupComponent/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
