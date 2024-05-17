import React, {useEffect, useState} from 'react';
import SideBarComponent from '../components/SideBarComponent';
import CreateEventComponent from '../components/CreateEventComponent';

const CreateEventPage = () => {
    return(
        <div>  
            <SideBarComponent/>
            <CreateEventComponent />
         </div>

    );
};

export default CreateEventPage;