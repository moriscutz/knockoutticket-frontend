import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginComponent from './components/LoginComponent.jsx';
import SignupComponent from './components/SignupComponent.jsx';
import SideBarComponent from './components/SideBarComponent.jsx';
import EventComponent from './components/EventComponent.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
