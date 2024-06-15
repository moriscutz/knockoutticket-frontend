import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const decodedToken = jwtDecode(token);
            // jwt expiration is in seconds
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp > currentTime) {
                return true;
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                return false;
            }
        } catch (error) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return false;
        }
    };

    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
