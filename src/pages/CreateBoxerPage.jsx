import React, {useEffect, useState} from 'react';
import SideBarComponent from '../components/SideBarComponent';
import CreateBoxerComponent from '../components/CreateBoxerComponent';


const CreateBoxerPage = () => {
    return(
        <div>  
            <SideBarComponent/>
            <CreateBoxerComponent />
         </div>

    );
};

export default CreateBoxerPage;