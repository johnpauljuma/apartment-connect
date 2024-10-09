"use client";

import { Menu, Drawer, Avatar } from 'antd';
import { useState, useEffect } from 'react';
import SearchAndFilter from './SearchAndFilter';
import FeaturedApartments from './FeaturedApartments';
import Dashboard from './Dashboard';
import HomePage from '../page';


import {
  DashboardOutlined,
  MessageOutlined,
  SaveOutlined,
  SettingOutlined,
  LogoutOutlined,
  PlusOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';

const SidebarMenu = () => {
  const [view, setView] = useState('home');
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(''); 

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
  
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
      const storedUserType = localStorage.getItem('userType');
      const storedUserName = localStorage.getItem('userName');

      if (storedUserType) {
        setUserType(storedUserType);
      }

      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
  };
  // Update handleMenuItemClick function
  const handleMenuItemClick = (key) => {
    switch (key) {
      //case 'tenant-1':
      case 'owner-dashboard':
      case 'agency-dashboard':
        setView('dashboard');
        localStorage.setItem('view', 'dashboard'); 
        break;
    /* case 'tenant-2':
      case 'owner-2':
      case 'agency-2':
        router.push('/messages');
        break;
      case 'tenant-3':
      case 'owner-3':
        router.push('/saved-listings');
        break;
      case 'owner-4':
        router.push('/create-listing');
        break;
      case 'owner-5':
        router.push('/my-listings');
        break;
      case 'agency-3':
        router.push('/create-listing');
        break;
      case 'agency-4':
        router.push('/listings');
        break;
      case 'tenant-4':
      case 'owner-6':
      case 'agency-5':
        router.push('/settings');
        break;*/
      case 'tenant-logout':
      case 'owner-logout':
      case 'agency-logout':
      case 'logout':
        handleLogout(); // Call handleLogout for Logout
        break;
      default:
        break;
    }
  };

  // Menu items with icons
  const menuItems = {
  tenant: [
    { key: 'tenant-dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
    { key: 'tenant-messages', label: 'My Messages', icon: <MessageOutlined /> },
    { key: 'tenant-saved-listings', label: 'Saved Listings', icon: <SaveOutlined /> },
    { key: 'tenant-settings', label: 'Settings', icon: <SettingOutlined /> },
    { key: 'tenant-logout', label: 'Logout', icon: <LogoutOutlined /> },
  ],
  owner: [
    { key: 'owner-dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
    { key: 'owner-messages', label: 'My Messages', icon: <MessageOutlined /> },
    { key: 'owner-saved-listings', label: 'Saved Listings', icon: <SaveOutlined /> },
    { key: 'owner-create-listig', label: 'Create Listing', icon: <PlusOutlined /> },
    { key: 'owner-listings', label: 'My Listings', icon: <ApartmentOutlined /> },
    { key: 'owner-settings', label: 'Settings', icon: <SettingOutlined /> },
    { key: 'owner-logout', label: 'Logout', icon: <LogoutOutlined /> },
  ],
  agency: [
    { key: 'agency-dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
    { key: 'agency-messages', label: 'Messages', icon: <MessageOutlined /> },
    { key: 'agency-create-listing', label: 'Create Listings', icon: <PlusOutlined /> },
    { key: 'agency-listimgs', label: 'Listings', icon: <ApartmentOutlined /> },
    { key: 'agency-settings', label: 'Settings', icon: <SettingOutlined /> },
    { key: 'agency-logout', label: 'Logout', icon: <LogoutOutlined /> },
  ],
};


  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const styles = {
    avatarContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
      cursor: 'pointer',
      backgroundColor: 'black',
      padding: '5px',
    },
    usernameText: {
      color: '#000',
      fontSize: '14px',
      fontWeight: 'bold',
      margin: '0',
      padding: '0',
      textAlign: 'center',
      backgroundColor: 'transparent',
      float:'right'
    },
    drawerTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '0 10px',

    },
  }

  return (
    <>
      <button onClick={showDrawer} style={{ fontSize: '24px',cursor: 'pointer', backgroundColor:'transparent', border:'none'}}>
        ☰
      </button>
      <Drawer
        title={
          <div style={styles.drawerTitle}>
            <Avatar style={{ backgroundColor: '#FF5F00' }}>
              {userName ? userName[0]?.toUpperCase() : ''}{userName?.split(' ')[1]?.[0]?.toUpperCase()}
            </Avatar>

            <div style={styles.usernameText}>{userName}</div>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        visible={visible}
        width={200}
        style={{backgroundColor:'#fffae6', }}
      >
        <Menu
          items={(menuItems[userType] || []).map((item) => ({
            key: item.key,
            icon: item.icon,
            label: (
              <span style={{ color: '#FF5F00', fontWeight: 'bold' }}>
                {item.label}
              </span>
            ),
            onClick: () => handleMenuItemClick(item.key),
            className: 'menuitem',
          }))}
          style={{ border: 'none', margin: "0", backgroundColor: '#fffae6', color: '#fff', padding: '0' }}
        />
      </Drawer>
      
      {view === 'dashboard' && (<Dashboard />)}
    </>
  );
};

export default SidebarMenu;
