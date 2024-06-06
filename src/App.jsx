import { useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupComponent from './components/SignupComponent.jsx';
import CreateBoxerPage from './pages/CreateBoxerPage.jsx';
import LoginComponent from './components/LoginComponent.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateEventPage from './pages/CreateEventPage.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import UserSettingsPage from './pages/UserSettingsPage.jsx';
import ModifyBoxerComponent from './components/ModifyBoxerComponent.jsx';
import BoxersListComponent from './components/BoxersListComponent.jsx';
import UserListPage from './pages/UserListPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import NotificationReceiverComponent from './components/NotificationReceiverComponent.jsx';
import { WebSocketProvider } from './components/WebSocketContext.jsx';
import { useUser, UserProvider } from './components/UserContext.jsx';
import LayoutComponent from './components/LayoutComponent.jsx';
function App() {

  const user = useUser();
  return (
    <WebSocketProvider user ={user}>
      
        <div className="App">
          <Router>
            <LayoutComponent>
              <Routes>
                <Route path="/signup" element={<SignupComponent/>} />
                <Route path="/login" element= {<LoginComponent/>} />
                

                <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
                <Route path="/homepage" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
                <Route path="/createboxer" element={<ProtectedRoute><CreateBoxerPage/></ProtectedRoute>} />
                <Route path="/createevent" element={<ProtectedRoute><CreateEventPage/></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><UserSettingsPage /></ProtectedRoute>} />
                <Route path="/modifyboxer/:id" element={<ProtectedRoute><ModifyBoxerComponent/></ProtectedRoute>} />
                <Route path="/boxerslist" element={<ProtectedRoute><BoxersListComponent /></ProtectedRoute>} />
                <Route path="/users" element ={<ProtectedRoute><UserListPage/> </ProtectedRoute>} />
                <Route path="/book/:id" element={<ProtectedRoute><BookingPage/></ProtectedRoute>} />
                <Route path="/sendnotification" element={<ProtectedRoute><NotificationPage/></ProtectedRoute>} />

                <Route path="/unauthorized" element= {<Unauthorized/>} />
              </Routes>
            </LayoutComponent>
          </Router>
        </div>
       
      </WebSocketProvider>
    
  );
}

export default App
