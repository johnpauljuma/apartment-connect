"use client";

import {useEffect, useState } from 'react';
import SidebarMenu from './components/SidebarMenu';
import Dashboard from './components/Dashboard';
import FeaturedApartments from './components/FeaturedApartments'; 
import SearchAndFilter from './components/SearchAndFilter';

const HomePage = () => {
  const [view, setView] = useState('home');
  useEffect(() => {
    // Load the view from localStorage to maintain the state on page refresh
    const storedView = localStorage.getItem('view');
    if (storedView) {
      setView(storedView);
    }
  }, []);

  const [properties] = useState([
    {
      id: 1,
      title: 'For Rent',
      price: '14,000 monthly',
      imgSrc: '/rent1.png',
    },
    {
      id: 2,
      title: 'For Rent',
      price: '24,000 monthly',
      imgSrc: '/rent2.jpeg',
    },
    {
      id: 3,
      title: 'For Sale',
      price: '4,500,000',
      imgSrc: '/rent4.jpeg',
    },
    {
      id: 4,
      title: 'For Rent',
      price: '14,000 monthly',
      imgSrc: '/rent1.png',
    },
    {
      id: 5,
      title: 'For Rent',
      price: '24,000 monthly',
      imgSrc: '/rent2.jpeg',
    },
    {
      id: 6,
      title: 'For Sale',
      price: '4,500,000',
      imgSrc: '/rent4.jpeg',
    },
  ]);

  // Styles for layout
  const styles = {
    container: {
      marginTop: '10px',
    },
   
  };

  return (
    <div style={styles.container}>
        <>
          <SearchAndFilter />
          <FeaturedApartments properties={properties} />
        </>
      
    </div>
  );
};

export default HomePage;
