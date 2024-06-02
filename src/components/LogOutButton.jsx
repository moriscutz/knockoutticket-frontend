import React, { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

const LogOutButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        color: isHovered ? '#808080' : 'gray',
        textDecoration: 'none',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.3s ease-in-out',
    };

    const iconStyle = {
        marginRight: '5px',
    };

    return (
        <button
            style={buttonStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleLogout}
        >
            <LogoutIcon style={iconStyle} />
        </button>
    );
};

export default LogOutButton;
