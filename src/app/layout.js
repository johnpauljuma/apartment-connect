"use client";

import { Layout, Menu, Avatar, Drawer, Badge, Modal } from 'antd';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import UserTypeModal from './components/UserTypeModal';
import Messages from './components/Messages';
import FavoritesPage from './components/FavoritesPage';
import Listings from './components/Listings';
import CreateListing from './components/CreateListing';
import ContactUs from './components/ContactUs';
import TenantSettings from './components/TenantSettings';

import {
  DashboardOutlined,
  MessageOutlined,
  SaveOutlined,
  SettingOutlined,
  LogoutOutlined,
  PlusOutlined,
  ApartmentOutlined,
  BellOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const MyLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(''); 
  const [userName, setUserName] = useState(''); 
  const [activeKey, setActiveKey] = useState('home');
  const [visible, setVisible] = useState(false);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

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
    localStorage.setItem('activeKey', key);

    // Open contact modal
    if (key === 'contact') {
      setIsContactModalVisible(true);
    }

    // Logout handling
    if (key === 'tenant-logout' || key === 'owner-logout' || key === 'agency-logout' || key === 'logout') {
      handleLogout();
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveKey('home');

    // Clear localStorage on logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    localStorage.removeItem('activeKey');
  };

  // Define menu items based on user types
  const menuItems = {
    tenant: [
      { key: 'tenant-dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
      { key: 'tenant-messages', label: 'Messages', icon: <MessageOutlined /> },
      { key: 'tenant-favorites', label: 'Favorites', icon: <SaveOutlined /> },
      { key: 'tenant-settings', label: 'Settings', icon: <SettingOutlined /> },
      { key: 'tenant-logout', label: 'Logout', icon: <LogoutOutlined /> },
    ],
    owner: [
      { key: 'owner-dashboard', label: 'Dashboard', icon: <DashboardOutlined /> },
      { key: 'owner-messages', label: 'Messages', icon: <MessageOutlined /> },
      { key: 'owner-favorites', label: 'Favorites', icon: <SaveOutlined /> },
      { key: 'owner-create-listing', label: 'Create Listing', icon: <PlusOutlined /> },
      { key: 'owner-listings', label: 'Listings', icon: <ApartmentOutlined /> },
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
  const closeContactModal = () => setIsContactModalVisible(false);

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
      marginRight:'0',
      float:'right'
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
          <Header style={{ backgroundColor: '#002379', display: 'flex', width:'100%', justifyContent:'space-between'}}>
            <div className="logo" style={{fontSize: '24px', fontWeight: 'bold', color: '#fff', letterSpacing: '2px' }}>
              <Link href="/" style={{ color: 'white', textDecoration: 'none' }} onClick={() => handleMenuClick('home')}>
                Apartment <span style={{ color: '#FF5F00' }}>Connect</span>
              </Link>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px',}}>
              <Menu theme="light" mode="horizontal" style={{ background: 'transparent', lineHeight: '64px', display: 'inline-flex', float: 'flex-end' }}>
                <Menu.Item key="home" onClick={() => handleMenuClick('home')} style={styles.signupBtn}>
                  Home
                </Menu.Item>
                <Menu.Item key="contact" onClick={() => handleMenuClick('contact')} style={styles.signupBtn}>
                  Contact Us
                </Menu.Item>
              </Menu>
              
              {isLoggedIn ? (
                <div style={styles.avatarContainer}>
                  {/* Notification Button */}
                  <Badge count={5}>
                    <BellOutlined
                      style={{ fontSize: '24px', color: '#fff', marginRight: '0px', cursor: 'pointer' }}
                      onClick={() => handleMenuClick('notifications')} 
                    />
                  </Badge>

                  {/* Messages Button */}
                  <Badge count={2}>
                    <MessageOutlined
                      style={{ fontSize: '24px', color: '#fff', marginRight: '0px', cursor: 'pointer' }}
                      onClick={() => handleMenuClick('owner-messages')} 
                    />
                  </Badge>
                  <Avatar style={{ backgroundColor: '#FF5F00' }}>
                    {userType === 'agency' ? userName?.[0]?.toUpperCase() : `${userName?.[0]?.toUpperCase() || ''}${userName?.split(' ')[1]?.[0]?.toUpperCase() || ''}`}
                  </Avatar>
                  <button onClick={showDrawer} style={{ fontSize: '24px', cursor: 'pointer', backgroundColor: 'transparent', border: 'none', }}>
                    ☰
                  </button>
                </div>
              ) : (
                <>
                  <LoginModal style={styles.signupBtn} />
                  <UserTypeModal style={styles.signupBtn} />
                </>
              )}
            </div>
          </Header>

          <Content style={{ padding: '0 50px', flex: '1 0 auto' }}>
            <div className="site-layout-content">
              {/* Conditionally render based on the activeKey */}
              {activeKey === 'home' && children}
              {activeKey === 'tenant-dashboard' && <Dashboard />} 
              {activeKey === 'owner-dashboard' && <Dashboard />}
              {activeKey === 'agency-dashboard' && <Dashboard />}

              {activeKey === 'tenant-messages' && <Messages />}
              {activeKey === 'owner-messages' && <Messages />}
              {activeKey === 'agency-messages' && <Messages />}

              {activeKey === 'tenant-favorites' && <FavoritesPage />}
              {activeKey === 'owner-favorites' && <FavoritesPage />}

              {activeKey === 'owner-create-listing' && <CreateListing />}
              {activeKey === 'agency-create-listing' && <CreateListing />}

              {activeKey === 'owner-listings' && <Listings />}
              {activeKey === 'agency-listings' && <Listings />}

              {activeKey === 'tenant-settings' && <TenantSettings />}
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
                onClick: () => {
                  handleMenuClick(item.key);
                  closeDrawer();
                }
              }))}
            />
          </Drawer>

          {/* Contact Us Modal */}
        <Modal
          title="Contact Us"
          visible={isContactModalVisible}
          onCancel={closeContactModal}
          footer={null}
          closeIcon={<span style={{ fontSize: '20px', cursor: 'pointer', color: '#FF5F00' }}>✖</span>} // Custom close icon
        >
          <ContactUs onClose={closeContactModal} />
        </Modal>
        </Layout>
      </body>
    </html>
  );
};

export default MyLayout;
