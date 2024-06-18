import React, {useEffect, useState} from 'react';
import SideBarComponent from '../components/SideBarComponent';
import CreateBoxerComponent from '../components/CreateBoxerComponent';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const CreateBoxerPage = () => {
    const [role, setRole] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(storedToken);
        setRole(decodedToken.roles);

        if(role.includes("NORMAL_USER"))
            {
                navigate("/unauthorized");
            }
    });

    return(
        <div>  
            <SideBarComponent/>
            <CreateBoxerComponent />
         </div>

    );
};

export default CreateBoxerPage;