import React, {useState} from 'react';

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
        window.location.href = '/';
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        color: isHovered ? '#808080' : 'white',
        textDecoration: 'none',
        cursor: 'pointer',
        padding: '5px',
        transition: 'color 0.3s ease-in-out',
    };

    return (
        <button style={buttonStyle} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} onClick={handleLogout}>  Logout</button>
    );
};

export default LogOutButton;