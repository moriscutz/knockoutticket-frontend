import React from 'react';
import NotificationReceiverComponent from './NotificationReceiverComponent';

const LayoutComponent = ({ children })=>{
    return(
        <div>
            <NotificationReceiverComponent/>

            {children}
        </div>
    );
};

export default LayoutComponent;