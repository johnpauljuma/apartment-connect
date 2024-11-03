import React, { useState } from 'react';
import { Card, Input, Button, Row, Col, Typography, Modal } from 'antd';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  PrinterOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;

const ContactUs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ backgroundColor: '#0a1f44', color: '#fff', padding: '20px', textAlign: 'center' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
        <div style={{ fontSize: '1.5rem', color: 'white' }}>Apartment Connect</div>
        <Button type="primary" onClick={showModal}>
          Contact Us
        </Button>
      </header>

      {/* Contact Modal */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="100vw"
        style={{ top: 0 }}
        bodyStyle={{ height: '100vh', padding: '10px', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFAE6', color: '#fff' }}
        closable={true}
        closeIcon={<span style={{ fontSize: '20px', cursor: 'pointer', color: '#FF5F00' }}>✖</span>} // Custom close icon
      >
        {/* Contact Information */}
        <Row gutter={24} style={{ margin: '0', width: '100%', marginTop: '20px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ backgroundColor: '#002379', borderRadius: '8px', color: '#fff' }}>
              <EnvironmentOutlined style={{ fontSize: '2rem', color: '#FF5F00' }} />
              <Title level={4} style={{ color: '#fff', marginTop: '10px' }}>OUR MAIN OFFICE</Title>
              <Text>Nairobi</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ backgroundColor: '#002397', borderRadius: '8px', color: '#fff' }}>
              <PhoneOutlined style={{ fontSize: '2rem', color: '#FF5F00' }} />
              <Title level={4} style={{ color: '#fff', marginTop: '10px' }}>PHONE NUMBER</Title>
              <Text>234-9876-3400 (Toll Free)</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ backgroundColor: '#002379', borderRadius: '8px', color: '#fff' }}>
              <PrinterOutlined style={{ fontSize: '2rem', color: '#FF5F00' }} />
              <Title level={4} style={{ color: '#fff', marginTop: '10px' }}>FAX</Title>
              <Text>1-234-307-8900</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ backgroundColor: '#002379', borderRadius: '8px', color: '#fff' }}>
              <MailOutlined style={{ fontSize: '2rem', color: '#FF5F00' }} />
              <Title level={4} style={{ color: '#fff', marginTop: '10px' }}>EMAIL</Title>
              <Text>hello@theme.com</Text>
            </Card>
          </Col>
        </Row>

        {/* Contact Form */}
        <div style={{
          backgroundColor: '#FF9F66',
          color: '#333',
          padding: '10px',
          margin: '20px auto',
          marginTop: '30px',
          maxWidth: '100%',
          width: '70%%',
          borderRadius: '8px'
        }}>
          <Title level={2} style={{ color: '#fff', marginBottom: '20px' }}>Message Us</Title>
          <Input placeholder="Enter your Name" style={{ marginBottom: '10px', borderRadius: '4px' }} />
          <Input placeholder="Enter a valid email address" style={{ marginBottom: '10px', borderRadius: '4px' }} />
          <TextArea rows={4} placeholder="Your message" style={{ marginBottom: '10px', borderRadius: '4px' }} />
          <Button type="primary" style={{
            backgroundColor: '#002379',
            color: '#fff',
            borderRadius: '4px',
            padding: '5px',
            width: 'fitContent',
            fontSize: '1rem',
            float:'right',
          }}>SUBMIT</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ContactUs;
