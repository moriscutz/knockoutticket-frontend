import React, { useState } from "react"; 
import { Link } from 'react-router-dom';
import '../css/EventPostStyle.css';

const EventComponent = () => {
    const [formData, setFormData] = useState({
        boxer1: '',
        boxer2: '',
        date: '',
        place: '',
    });
    
    return (
        <article>
            <section className="card"> 
                <div className="text-content"> 
                    <h3>Boxing match</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>  
                    <a href="#">Join now</a> 
                </div>
            </section> 
        </article>
    );
};

export default EventComponent;
