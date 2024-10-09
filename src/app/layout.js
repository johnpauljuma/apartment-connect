"use client";

import { Layout, Menu, Avatar, Drawer } from 'antd';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import UserTypeModal from './components/UserTypeModal';

import {
  DashboardOutlined,
  MessageOutlined,
  SaveOutlined,
  SettingOutlined,
  LogoutOutlined,
  PlusOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const MyLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(''); // State for user type (tenant, apartmentOwner, agency)
  const [userName, setUserName] = useState(''); // Temporary user name
  const [activeKey, setActiveKey] = useState('home'); // Key for the active view
  const [visible, setVisible] = useState(false);

  // Load login state and user info from localStorage when the component mounts
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserType = localStorage.getItem('userType');
    const storedUserName = localStorage.getItem('userName');
    const storedActiveKey = localStorage.getItem('activeKey');

    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
      if (storedUserType) setUserType(storedUserType);
      if (storedUserName) setUserName(storedUserName);
    }

    // Set the active key from localStorage or default to 'home'
    setActiveKey(storedActiveKey || 'home');
  }, []);

  // Function to handle click events for menu items
  const handleMenuClick = (key) => {
    setActiveKey(key);
    localStorage.setItem('activeKey', key); // Persist activeKey in localStorage

    // Logout handling
    if (key === 'tenant-logout' || key === 'owner-logout' || key === 'agency-logout' || key === 'logout') {
      handleLogout();
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveKey('home'); // Reset view to home on logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('activeKey'); // Clear localStorage on logout
  };

  // Define menu items based on user types
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
      { key: 'owner-create-listing', label: 'Create Listing', icon: <PlusOutlined /> },
      { key: 'owner-listings', label: 'My Listings', icon: <ApartmentOutlined /> },
      { key: 'owner-settings', label: 'Settings', icon: <SettingOutlined /> },
      { key: 'owner-logout', label: 'Logout', icon: <LogoutOutlined /> },
    ],
    agency: [
      { key: 'agency-dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
      { key: 'agency-messages', label: 'Messages', icon: <MessageOutlined /> },
      { key: 'agency-create-listing', label: 'Create Listings', icon: <PlusOutlined /> },
      { key: 'agency-listings', label: 'Listings', icon: <ApartmentOutlined /> },
      { key: 'agency-settings', label: 'Settings', icon: <SettingOutlined /> },
      { key: 'agency-logout', label: 'Logout', icon: <LogoutOutlined /> },
    ],
  };

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const styles = {
    signupBtn: {
      color: 'white',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      fontWeight: 'bold',
      marginLeft: 'auto',
    },
    avatarContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      backgroundColor: 'transparent',
    },
    drawerTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: '0 10px',
    },
  };

  return (
    <html>
      <body>
        <Layout className="layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header style={{ backgroundColor: '#002379', display: 'flex', alignItems: 'center' }}>
            <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', letterSpacing: '2px' }}>
              <Link href="/" style={{ color: 'white', textDecoration: 'none' }} onClick={() => handleMenuClick('home')}>
                Apartment <span style={{ color: '#FF5F00' }}>Connect</span>
              </Link>
            </div>

            <Menu theme="light" mode="horizontal" style={{ background: 'transparent', lineHeight: '64px', display: 'inline-flex', float: 'flex-end' }}>
              <Menu.Item key="home" onClick={() => handleMenuClick('home')}>
                Home
              </Menu.Item>
              <Menu.Item key="contact">
                <Link href="/contact" style={styles.signupBtn}>Contact Us</Link>
              </Menu.Item>
            </Menu>

            {isLoggedIn ? (
              <div style={styles.avatarContainer}>
                <Avatar style={{ backgroundColor: '#FF5F00' }}>
                  {userType === 'agency' ? userName?.[0]?.toUpperCase() : `${userName?.[0]?.toUpperCase() || ''}${userName?.split(' ')[1]?.[0]?.toUpperCase() || ''}`}
                </Avatar>
                <button onClick={showDrawer} style={{ fontSize: '24px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}>
                  ☰
                </button>
              </div>
            ) : (
              <>
                <LoginModal style={styles.signupBtn} />
                <UserTypeModal style={styles.signupBtn} />
              </>
            )}
          </Header>

          <Content style={{ padding: '0 50px', flex: '1 0 auto' }}>
            <div className="site-layout-content">
              {/* Conditionally render based on the activeKey */}
              {activeKey === 'home' && children} {/* Home content goes here */}
              {activeKey === 'dashboard' && <Dashboard />}
              {activeKey === 'tenant-dashboard' && <Dashboard />} {/* Custom dashboards for users */}
              {activeKey === 'owner-dashboard' && <Dashboard />}
              {activeKey === 'agency-dashboard' && <Dashboard />}
              {activeKey === 'tenant-messages' && <div>Tenant Messages</div>}
              {activeKey === 'owner-create-listing' && <div>Create Listing</div>}
              {/* You can add more conditional renders based on the activeKey */}
            </div>
          </Content>

          <Footer style={{ textAlign: 'center', flexShrink: 0, backgroundColor: '#FF9F66' }}>
            Apartment Connect ©2024 Created by Juma Omondi John Paul
          </Footer>

          <Drawer
            title={
              <div style={styles.drawerTitle}>
                <Avatar style={{ backgroundColor: '#FF5F00' }}>
                  {userName?.[0]?.toUpperCase()}{userName?.split(' ')[1]?.[0]?.toUpperCase()}
                </Avatar>
                <div>{userName}</div>
              </div>
            }
            placement="right"
            onClose={closeDrawer}
            visible={visible}
            width={200}
          >
            <Menu
              items={(menuItems[userType] || []).map((item) => ({
                key: item.key,
                icon: item.icon,
                label: item.label,
                onClick: () => {handleMenuClick(item.key),
                closeDrawer();}
              }))}
            />
          </Drawer>
        </Layout>
      </body>
    </html>
  );
};

export default MyLayout;
