import React, {useState, useEffect} from 'react';
import "../css/HomePageStyle.css";
import SidebarComponent from '../components/SideBarComponent.jsx';
import EventListComponent from '../components/EventListComponent.jsx';
import AggregatedBoxerStats from '../components/AggregatedBoxerStats.jsx';

const HomePage = () => {
  return (
    <div>
      <SidebarComponent/>
      <EventListComponent/>
      <AggregatedBoxerStats/>
    </div>
  );
};

export default HomePage;
