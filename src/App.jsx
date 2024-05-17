import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupComponent from './components/SignupComponent.jsx';
import TestPage from './pages/TestPage.jsx';
import CreateBoxerPage from './pages/CreateBoxerPage.jsx';
import LoginComponent from './components/LoginComponent.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateEventPage from './pages/CreateEventPage.jsx';
import Unauthorized from './components/Unauthorized.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/test" element={<TestPage/>} />

          <Route path="/signup" element={<SignupComponent/>} />
          <Route path="/login" element= {<LoginComponent/>} />

          <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
          <Route path="/createboxer" element={<ProtectedRoute><CreateBoxerPage/></ProtectedRoute>} />
          <Route path="/createevent" element={<ProtectedRoute><CreateEventPage/></ProtectedRoute>} />

          <Route path="/unauthorized" element= {<Unauthorized/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
