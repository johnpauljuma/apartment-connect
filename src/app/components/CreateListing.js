import { useEffect, useState } from 'react';
import { Form, Input, Select, Upload, Button, Checkbox, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { auth } from '../../../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const { Option } = Select;

const CreateListing = () => {
  const [form] = Form.useForm();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user state if authenticated
      } else {
        setUser(null); // Set to null if not authenticated
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const onFinish = async (values) => {
    const user = auth.currentUser; // Get the current user
  
    if (user) {
      const listingData = {
        ...values,
        userId: user.uid, // Include user ID in the listing data
        createdBy: user.displayName || user.email, // Optional: Include user name or email
      };
  
      try {
        const response = await fetch('/api/createListing', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(listingData), // Use the modified listing data
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log('Success:', data);
          // Handle success (e.g., show a success message, reset form, etc.)
        } else {
          console.error('Error:', data.error);
          // Handle error (e.g., show an error message)
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle fetch error
      }
    } else {
      console.error('No user is logged in.');
      // Handle the case where no user is logged in
    }
  };
  
  
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleCheckboxGroupChange = (checkedValues) => {
    // Update the list of selected features and ensure "Other" state is managed separately
    setSelectedFeatures(checkedValues);
    setIsOtherChecked(checkedValues.includes("other"));
  };

  const handleOtherChange = (e) => {
    // Toggle the "Other" checkbox state and add/remove it from selected features
    const checked = e.target.checked;
    setIsOtherChecked(checked);

    if (checked) {
      setSelectedFeatures([...selectedFeatures, "other"]);
    } else {
      setSelectedFeatures(selectedFeatures.filter((feature) => feature !== "other"));
    }
  };
  

  const styles={
    formContainer:{
      border:'solid 1px', 
      padding:'10px', 
      borderRadius:'20px'
    },
    submitBtn:{
      width:'fit-content',
      marginTop:'10px',
      float:'right',
      backgroundColor:'#002379',
      color:'#fff',
      fontWeight:'bold',
      borderRadius:'10px',
      boxShadow:'0 0 5px'
    }
  }

  return (
    <div style={{ padding: '10px', backgroundColor: '#FFFAE6', color: '#fff', maxWidth: '100%', margin: '0 auto', justfyContent:'center', }}>
      
      <Form form={form} onFinish={onFinish} layout="vertical" style={{margin:'0 auto', padding:'20px', width:'100%', border:"solid 1px", borderRadius:'20px', boxShadow:'0 0 5px', backgroundColor:'#fff'}}>
      <h2 style={{ color: '#FF5F00', margin:'0 auto', width:'fit-content' }}>New Listing</h2>
        <h2 style={{ color: '#FF5F00' }}>Basic Information</h2>
        <div style={styles.formContainer}>
          <Row gutter={24}>
              <Col span={24}>
                  <Form.Item name="apartmentTitle" label="Apartment Title" rules={[{ required: true, message: 'Please enter the property title' }]}>
                      <Input placeholder="E.g 2 bedroom apartment" />
                  </Form.Item>
              </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="name" label="Name" rules={[{ required: true, message:'Please enter name' }]}>
                  <Input placeholder="Enter name" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="apartmentType" label="Apartment Type" rules={[{ required: true, message:'Please select apartment type' }]}>
                <Select placeholder="">
                  <Option value="singleRoom">Single Room</Option>
                  <Option value="oneBedroom">One Bedroom</Option>
                  <Option value="twoRoom">Two Bedroom</Option>
                  <Option value="threeBedroom">Three Bedroom</Option>
                  <Option value="fourBedroom">Four Bedroom</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="location" label="Location" rules={[{ required: true, message:'Please enter location' }]}>
                <Input placeholder="E.g Along Mirema Lane" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter the city' }]}>
                <Input placeholder="E.g Nairobi" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="estate" label="Estate" rules={[{ required: true, message: 'Please enter the property area' }]}>
                <Input placeholder="E.g Kasarani, Nairobi" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="rent" label="Rent" rules={[{ required: true, message: 'Please enter the property location' }]}>
                <Input placeholder="Monthly rent" />
              </Form.Item>
            </Col>
          </Row>
        </div>

        <h2 style={{ color: '#FF5F00' }}>Inclusivity Information</h2>
        <div style={styles.formContainer}>
        <Form.Item
          name="inclusivity"
          rules={[{ required: true, message: 'Please enter the inclusivity information' }]}
          label="Check all tha apply"
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row style={{ width: '100%', backgroundColor: '', padding: 0, margin: 0 }} gutter={0}>
              <Col span={4} style={{ padding: 0 }}>
                <Checkbox value="staircase">Staircase Available</Checkbox>
              </Col>
              <Col span={4} style={{ padding: 0 }}>
                <Checkbox value="ramp">Ramp Available</Checkbox>
              </Col>
              <Col span={4} style={{ padding: 0 }}>
                <Checkbox value="swimmingPool">Lift Available</Checkbox>
              </Col>
              <Col span={4} style={{ padding: 0 }}>
                <Checkbox value="alarmSystem">Escalator Available</Checkbox>
              </Col>
              <Col span={4} style={{ padding: 0 }}>
                <Checkbox value="none">None</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        </div>

        <h2 style={{ color: '#FF5F00' }}>Gallery</h2>
        <div style={styles.formContainer}>
          <Form.Item name="gallery" label="Upload at least 3 images" rules={[{ required: true, message:'Please upload at least 3 images' }]}>
            <Upload action="/upload" listType="picture-card" multiple>
              <div>
                <UploadOutlined />
                <div>Click to upload</div>
              </div>
            </Upload>
          </Form.Item>
        </div>

        <h2 style={{ color: '#FF5F00' }}>Additional Information</h2>
        <div style={styles.formContainer}>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="bedrooms" label="Bedrooms" rules={[{ required: true, message:'Please select the number of bedrooms' }]}>
                <Select placeholder="Bedrooms">
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="bathrooms" label="Bathrooms" rules={[{ required: true, message:'Please select number of bathrooms' }]}>
                <Select placeholder="Bathrooms">
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="fitout" label="Fitout" rules={[{ required: true, message:'Please select the fitout of the apartment' }]}>
                <Select placeholder="Basic">
                  <Option value="basic">Basic</Option>
                  <Option value="furnished">Furnished</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>

        <h2 style={{ color: '#FF5F00' }}>Other Features</h2>
        <div style={styles.formContainer}>
          <Form.Item name="features" label="Features">
            <Checkbox.Group value={selectedFeatures} onChange={handleCheckboxGroupChange}>
              <Row>
                <Col span={8}><Checkbox value="airConditioning">Air Conditioning</Checkbox></Col>
                <Col span={8}><Checkbox value="swimmingPool">Swimming Pool</Checkbox></Col>
                <Col span={8}><Checkbox value="alarmSystem">Alarm System</Checkbox></Col>
                <Col span={8}><Checkbox value="internet">Internet Connection</Checkbox></Col>
                <Col span={8}><Checkbox value="cctv">CCTV</Checkbox></Col>
                <Col span={8}><Checkbox value="powerGenerator">Power Generator (Backup)</Checkbox></Col>
              </Row>
            </Checkbox.Group>
            <Checkbox checked={isOtherChecked} onChange={handleOtherChange} style={{ marginTop: '10px' }}>
              Other
            </Checkbox>
            {isOtherChecked && (
              <Input
                style={{ marginTop: '10px' }}
                placeholder="Please specify other features"
              />
            )}
          </Form.Item>
        </div>
        <Form.Item>
          <Button htmlType="submit" block style={styles.submitBtn}>
            Submit Listing
          </Button>
        </Form.Item>
        
      </Form>
    </div>
  );
};

export default CreateListing;
