import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupComponent from './components/SignupComponent.jsx';
import TestPage from './pages/TestPage.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signup" element={<SignupComponent/>} />
          <Route path="/test" element={<TestPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App
