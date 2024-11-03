"use client"

import { Modal, Input, Button, Row, Col, Checkbox, message } from 'antd';
import { GoogleOutlined, AppleOutlined } from '@ant-design/icons';
import { useState } from 'react';

const LoginModal = ({ setIsLoggedIn, setUserName, setUserType }) => {
  const [visibleLoginModal, setVisibleLoginModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showLoginModal = () => {
    setVisibleLoginModal(true);
    setEmail('');
    setPassword('');
  };

  const handleLoginCancel = () => {
    setVisibleLoginModal(false);
    setEmail('');
    setPassword('');
  };

  const handleLoginClick = async () => {
    if (!email || !password) {
      message.error('Please fill all required fields');
      return;
    }
  
    // Disable the login button to prevent multiple clicks
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
      loginButton.disabled = true;
    }
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const { uid, email: userEmail, userType, firstName, lastName, agencyName } = data.user;
  
        message.success('Login successful');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', uid);
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userType', userType);
  
        const fullName = userType === 'agency' ? agencyName : `${firstName} ${lastName}`;
        localStorage.setItem('userName', fullName);
        setUserName(fullName);
        setUserType(userType);
        setIsLoggedIn(true);
  
        // Close the modal
        setVisibleLoginModal(false);
  
      } else {
        message.error(data.error || 'Login failed');
      }
    } catch (error) {
      message.error('Error during login, please try again');
    } finally {
      // Re-enable the login button
      if (loginButton) {
        loginButton.disabled = false;
      }
    }
  
    // Clear input fields after login is clicked
    setEmail('');
    setPassword('');
  };
  
  const hoverStyles = isHovered ? { color: '#FF5F00' } : {};

  const styles = {
    loginBtn: {
      backgroundColor: '#002379',
      color: 'white',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      fontWeight: 'bold',
      marginRight: '10px'
    },
    modalTitle: {
      color: 'black',
      textAlign: 'center',
    },
    container: {
      backgroundColor: '#002379',
      padding: '20px',
      borderRadius: '5px',
      width: '100%',
      margin: 'auto',
      color: 'white',
    },
    socialButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    loginButton: {
      width: '100%',
      backgroundColor: '#FF5F00',
      borderColor: '#1890ff',
    },
  };

  return (
    <>
      <button 
        onClick={showLoginModal} 
        style={{ ...styles.loginBtn, ...hoverStyles }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Login
      </button>

      <Modal
        open={visibleLoginModal}
        title="Login to your Account"
        footer={null}
        onCancel={handleLoginCancel}
        centered
        width={'35%'}
      >
        <div style={styles.container}>
          <Row gutter={16}>
            <Col span={24}>
              <label>Email</label>
              <Input 
                placeholder="Enter your email" 
                style={{ marginBottom: '20px' }} 
                value={email}  
                onChange={(e) => setEmail(e.target.value)}  
              />
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <label>Password</label>
              <Input.Password 
                placeholder="Enter your password" 
                style={{ marginBottom: '20px' }} 
                value={password}  
                onChange={(e) => setPassword(e.target.value)}  
              />
            </Col>
          </Row>

          <Checkbox style={{ marginBottom: '20px', color: 'white' }}>
            Remember me
          </Checkbox>

          <Button 
            type="primary" 
            onClick={handleLoginClick} 
            style={styles.loginButton}
          >
            Login
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
            <div style={{ height: '1px', backgroundColor: '#FF5F00', flex: 1 }}></div>
            <span style={{ margin: '0 10px', color: '#FF5F00', fontWeight: 'bold' }}>or</span>
            <div style={{ height: '1px', backgroundColor: '#FF5F00', flex: 1 }}></div>
          </div>
          <div style={styles.socialButtons}>
            <Button style={styles.socialButton} icon={<GoogleOutlined />}>
              Continue with Google
            </Button>
            <Button style={styles.socialButton} icon={<AppleOutlined />}>
              Continue with Apple
            </Button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px', color: '#1890ff' }}>
            Don't have an account? <a href="/signup">Sign up here</a>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
