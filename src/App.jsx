import './App.css'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SignupComponent from './components/SignupComponent.jsx';
import CreateBoxerPage from './pages/CreateBoxerPage.jsx';
import LoginComponent from './components/LoginComponent.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import UserSettingsPage from './pages/UserSettingsPage.jsx';
import ModifyBoxerComponent from './components/ModifyBoxerComponent.jsx';
import BoxersListComponent from './components/BoxersListComponent.jsx';
import UserListPage from './pages/UserListPage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import { WebSocketProvider } from './components/WebSocketContext.jsx';
import { useUser } from './components/UserContext.jsx';
import LayoutComponent from './components/LayoutComponent.jsx';
import EventFightNightCreationPage from './pages/EventFightNightCreationPage.jsx';
import EventFightNightListPage from './pages/EventFightNightListPage.jsx';
import EventFightNightDetailPage from './pages/EventFightNightDetailPage.jsx';
import EventFightNightModificationPage from './pages/EventFightNightModificationPage.jsx';
import { useEffect, useState } from 'react';
import AdminDashboard from './components/AdminDashboard.jsx';
import OrganizerDashboard from './components/OrganizerDashboard.jsx';

function App() {

  const user = useUser();
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReloadKey(prevKey => prevKey + 1);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <WebSocketProvider user ={user}>
        <div className="App">
          <Router>
            <LayoutComponent>
              <Routes>
                <Route path="/signup" element={<SignupComponent/>} />
                <Route path="/login" element= {<LoginComponent/>} />
                

                <Route path="/" element={<ProtectedRoute><EventFightNightListPage /></ProtectedRoute>} />
                <Route path="/homepage" element={<ProtectedRoute><EventFightNightListPage /></ProtectedRoute>} />
                <Route path="/createboxer" element={<ProtectedRoute><CreateBoxerPage/></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><UserSettingsPage /></ProtectedRoute>} />
                <Route path="/modifyboxer/:id" element={<ProtectedRoute><ModifyBoxerComponent/></ProtectedRoute>} />
                <Route path="/boxerslist" element={<ProtectedRoute><BoxersListComponent /></ProtectedRoute>} />
                <Route path="/users" element ={<ProtectedRoute><UserListPage/> </ProtectedRoute>} />
                <Route path="/book/:id" element={<ProtectedRoute><BookingPage/></ProtectedRoute>} />
                <Route path="/sendnotification" element={<ProtectedRoute><NotificationPage/></ProtectedRoute>} />

                <Route path="/createEventFightNight" element={<ProtectedRoute><EventFightNightCreationPage /></ProtectedRoute>} />
                <Route path="/eventFightNights" element={<ProtectedRoute><EventFightNightListPage /></ProtectedRoute>} />
                <Route path="/eventFightNight/:id" element={<ProtectedRoute><EventFightNightDetailPage /></ProtectedRoute>} />
                <Route path="/modifyEventFightNight/:id" element={<ProtectedRoute><EventFightNightModificationPage /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/event-organizer-dashboard" element={<ProtectedRoute><OrganizerDashboard/></ProtectedRoute>} />
                
                <Route path="/unauthorized" element= {<Unauthorized/>} />
              </Routes>
            </LayoutComponent>
          </Router>
        </div>
       
      </WebSocketProvider>
    
  );
}

export default App
