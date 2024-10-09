"use client";

import { useState } from 'react';
import { Modal, Card, Row, Col, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, GoogleOutlined, AppleOutlined } from '@ant-design/icons';

const UserTypeModal = () => {
  const [visibleUserTypeModal, setVisibleUserTypeModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [visibleSignUpModal, setVisibleSignUpModal] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [location, setLocation] = useState('');

  const [isHovered, setIsHovered] = useState(false);

  const hoverStyles = isHovered ? { color: '#FF5F00' } : {};

  const showUserTypeModal = () => {
    setVisibleUserTypeModal(true);
  };

  const handleUserTypeCancel = () => {
    setVisibleUserTypeModal(false);
  };

  const handleSelectUserType = (type) => {
    setSelectedUserType(type);
    setVisibleUserTypeModal(false);
    setVisibleSignUpModal(true);
  };

  const handleSignUpCancel = () => {
    setVisibleSignUpModal(false);
    resetForm();
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      message.error('Please fill all required fields');
      return;
    }
    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
          userType: selectedUserType,
          agencyName: selectedUserType === 'agency' ? agencyName : '',
          location: selectedUserType === 'agency' ? location : '',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success("Sign up successful!");
        resetForm();
        handleSignUpCancel();
      } else {
        message.error(data.error);
      }
    } catch (error) {
      console.error("Error during signup: ", error.message);
      message.error('Sign-up failed, please try again');
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setAgencyName('');
    setLocation('');
  };

  const styles = {
    signupBtn: {
      backgroundColor: '#002379',
      color: 'white',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
      fontWeight: 'bold',
    },
    modalTitle: {
      color: 'black',
      textAlign: 'center',
    },
    card: {
      textAlign: 'center',
      backgroundColor: '#002379',
      color: '#fff',
    },
    iconStyle: {
      fontSize: '64px',
      color: '#FF5F00',
      marginTop: '10px',
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
    signUpButton: {
      width: '100%',
      backgroundColor: '#FF5F00',
      borderColor: '#1890ff',
    },
  };

  return (
    <>
      <button
        onClick={showUserTypeModal}
        style={{ ...styles.signupBtn, ...hoverStyles }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Sign Up
      </button>

      <Modal
        visible={visibleUserTypeModal}
        title="What type of user are you?"
        footer={null}
        onCancel={handleUserTypeCancel}
        centered
        width={'50%'}
        style={{ fontSize: '24px' }}
      >
        <Row gutter={16} justify="center">
          <Col span={8}>
            <Card
              hoverable
              style={styles.card}
              cover={<UserOutlined style={styles.iconStyle} />}
              onClick={() => handleSelectUserType('tenant')}
            >
              <p style={{ fontWeight: 'bold' }}>Tenant</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={styles.card}
              cover={<UserOutlined style={styles.iconStyle} />}
              onClick={() => handleSelectUserType('owner')}
            >
              <p style={{ fontWeight: 'bold' }}>Apartment Owner</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              style={styles.card}
              cover={<UserOutlined style={styles.iconStyle} />}
              onClick={() => handleSelectUserType('agency')}
            >
              <p style={{ fontWeight: 'bold' }}>Apartment Agency</p>
            </Card>
          </Col>
        </Row>
      </Modal>

      <Modal
        visible={visibleSignUpModal}
        title="Create your Free Account"
        footer={null}
        onCancel={handleSignUpCancel}
        centered
        width={'35%'}
      >
        <div style={styles.container}>
          <div style={styles.socialButtons}>
            <Button style={styles.socialButton} icon={<GoogleOutlined />}>
              Sign up with Google
            </Button>
            <Button style={styles.socialButton} icon={<AppleOutlined />}>
              Sign up with Apple
            </Button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
            <div style={{ height: '1px', backgroundColor: '#FF5F00', flex: 1, fontWeight: 'bold' }}></div>
            <span style={{ margin: '0 10px', color: '#FF5F00', fontWeight: 'bold' }}>or</span>
            <div style={{ height: '1px', backgroundColor: '#FF5F00', flex: 1, fontWeight: 'bold' }}></div>
          </div>

          {selectedUserType === 'tenant' && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <label>First Name</label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" style={{ marginBottom: '20px' }} />
                </Col>
                <Col span={12}>
                  <label>Last Name</label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" style={{ marginBottom: '20px' }} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <label>Email</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" style={{ marginBottom: '20px' }} />
                </Col>
                <Col span={12}>
                  <label>Phone Number</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" style={{ marginBottom: '20px' }} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <label>Password</label>
                  <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={{ marginBottom: '20px' }} />
                </Col>
                <Col span={12}>
                  <label>Confirm Password</label>
                  <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" style={{ marginBottom: '20px' }} />
                </Col>
              </Row>
            </>
          )}

          {selectedUserType === 'owner' && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <label>First Name</label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" style={{ marginBottom: '20px' }} />
                </Col>
                <Col span={12}>
                  <label>Last Name</label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" style={{ marginBottom: '20px' }} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <label>Email</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" style={{ marginBottom: '20px' }} />
                </Col>
                <Col span={12}>
                  <label>Phone Number</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" style={{ marginBottom: '20px' }} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <label>Password</label>
                  <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={{ marginBottom: '20px' }} />
                </Col>
                <Col span={12}>
                  <label>Confirm Password</label>
                  <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" style={{ marginBottom: '20px' }} />
                </Col>
              </Row>
            </>
          )}

          {selectedUserType === 'agency' && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <label>Agency Name</label>
                  <Input value={agencyName} onChange={(e) => setAgencyName(e.target.value)} placeholder="Enter agency name" style={{ marginBottom: '20px' }} />
                </Col>
                <Col span={12}>
                  <label>Location</label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" style={{ marginBottom: '20px' }} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <label>Email</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" style={{ marginBottom: '20px' }} />
                </Col>
                <Col span={12}>
                  <label>Phone Number</label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter phone number" style={{ marginBottom: '20px' }} />
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <label>Password</label>
                  <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={{ marginBottom: '20px' }} />
                </Col>
                <Col span={12}>
                  <label>Confirm Password</label>
                  <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" style={{ marginBottom: '20px' }} />
                </Col>
              </Row>
            </>
          )}

          <Button onClick={handleSignUp} style={styles.signUpButton}>
            Sign Up
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UserTypeModal;
