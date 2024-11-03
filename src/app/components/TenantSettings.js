"use client"

import { useState } from 'react';
import { Avatar, Button, Card, Form, Input, Typography, Divider } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const styles = {
  tenant_details: {
    display: 'inline-flex',
    flexDirection: 'column', 
    alignItems: 'center',    
    textAlign: 'center', 
    margin: '5px',
    padding: '10px',
    borderRadius: '5px',
    width: '30%',
    justifyContent: 'center',
  },
  tenant_card_details: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    width: '100%',
    border: '1px solid #d9d9d9',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    marginBottom: '100px',
    marginTop: '10px',
  },
  divider:{
    borderColor: "#FF5F00", 
    marginTop:'10px', 
    color:'white', 
    fontWeight:'bold',
  },
  texts:{
    fontWeight:'bold',
    color:'#FF5F00'
  }
};


const { Title, Text } = Typography;

const TenantSettings = ({ tenantDetails = {} }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [form] = Form.useForm();

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div style={{ padding: '20px', width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Title level={4}>My Account</Title>
        <Title level={4}>Settings</Title>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <Button 
          type={activeTab === 'profile' ? 'primary' : 'default'} 
          onClick={() => handleTabChange('profile')}
        >
          Profile
        </Button>
        <Button 
          type={activeTab === 'edit' ? 'primary' : 'default'} 
          onClick={() => handleTabChange('edit')}
        >
          Edit Profile
        </Button>
      </div>

      {activeTab === 'profile' ? (
        <Card style={{ textAlign: 'center', backgroundColor:'#002379', display:'flex', flexDirection:'column', width:'100%' }}>
          <Avatar size={64} icon={<UserOutlined />} style={{ margin: '20px auto' }} />
          <Title level={5}>{tenantDetails.name || 'N/A'}</Title>
          <Text type="secondary">Details</Text>

          {/* Profile Details */}
          <div style={{ marginTop: '20px', textAlign: 'left', width:'100%' }}>
            {/* Location Section */}
            <Divider orientation="left" style={styles.divider}>Location</Divider>
            <div style={styles.tenant_card_details}>
                <div style={styles.tenant_details}>
                  <Text style={styles.texts}>County</Text><br /><Text>{tenantDetails.location?.county || 'N/A'}</Text>
                </div>
                <div style={styles.tenant_details}>
                  <Text style={styles.texts}>Country</Text><br /><Text>{tenantDetails.location?.country || 'N/A'}</Text>
                </div>
                <div style={styles.tenant_details}>
                  <Text style={styles.texts}>Address</Text><br /><Text>{tenantDetails.location?.address || 'N/A'}</Text>
                </div>
            </div>

            {/* Contact Section */}
            <Divider orientation="left" style={styles.divider}>Contact</Divider>
            <div style={styles.tenant_card_details}>
              <div style={styles.tenant_details}>
                <Text style={styles.texts}>Phone</Text><br /><Text>{tenantDetails.contact?.phone || 'N/A'}</Text>
              </div>
              <div style={styles.tenant_details}>
                <Text style={styles.texts}>WhatsApp</Text><br /><Text>{tenantDetails.contact?.whatsapp || 'N/A'}</Text>
              </div>
              <div style={styles.tenant_details}>
                <Text style={styles.texts}>Social Media</Text><br /><Text>{tenantDetails.contact?.socialMedia || 'N/A'}</Text>
              </div>
              </div>
          </div>
        </Card>
      ) : (
        <Card style={{ textAlign: 'left' }}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              name: tenantDetails.name || '',
              county: tenantDetails.location?.county || '',
              country: tenantDetails.location?.country || '',
              address: tenantDetails.location?.address || '',
              phone: tenantDetails.contact?.phone || '',
              whatsapp: tenantDetails.contact?.whatsapp || '',
              socialMedia: tenantDetails.contact?.socialMedia || '',
            }}
          >
            <Divider orientation="left">Location</Divider>
            <Card bordered style={styles.tenant_card_details}>
              <Form.Item label="County" name="county">
                <Input placeholder="Enter county" />
              </Form.Item>
              <Form.Item label="Country" name="country">
                <Input placeholder="Enter country" />
              </Form.Item>
              <Form.Item label="Address" name="address">
                <Input placeholder="Enter address" />
              </Form.Item>
            </Card>

            <Divider orientation="left">Contact</Divider>
            <Card bordered style={styles.tenant_card_details}>
              <Form.Item label="Phone" name="phone">
                <Input placeholder="Enter phone number" />
              </Form.Item>
              <Form.Item label="WhatsApp" name="whatsapp">
                <Input placeholder="Enter WhatsApp number" />
              </Form.Item>
              <Form.Item label="Social Media" name="socialMedia">
                <Input placeholder="Enter social media handle" />
              </Form.Item>
            </Card>

            <Button type="primary" style={{ marginTop: '20px' }} onClick={() => form.submit()}>Save Changes</Button>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default TenantSettings;
