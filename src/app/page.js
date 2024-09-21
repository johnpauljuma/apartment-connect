"use client";

import { Input, Select } from 'antd';
import { useState } from 'react';
import FeaturedApartments from './components/FeaturedApartments'; 

const { Search } = Input;
const { Option } = Select;

const HomePage = () => {
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

  return (
    <div style={{ marginTop: '20px' }}>
      <div style={{ padding: '5px', marginBottom: '10px', boxShadow:'5px', borderRadius:'5px'}}>
        <Search
          placeholder="Search for town or city..."
          enterButton="Search"
          size="large"
        />
        <div style={{ margin: '20px 0' }}>
          <Select defaultValue="All Types" style={{ width: 120 }}>
            <Option value="all">All Types</Option>
            <Option value="rent">For Rent</Option>
            <Option value="sale">For Sale</Option>
          </Select>
          <Select defaultValue="Bedrooms" style={{ width: 120, marginLeft: '10px' }}>
            <Option value="1">1 Bedroom</Option>
            <Option value="2">2 Bedrooms</Option>
            <Option value="3">3 Bedrooms</Option>
          </Select>
          <Select defaultValue="Bathrooms" style={{ width: 120, marginLeft: '10px' }}>
            <Option value="1">1 Bathroom</Option>
            <Option value="2">2 Bathrooms</Option>
            <Option value="3">3 Bathrooms</Option>
          </Select>
        </div>
      </div>

      {/* Featured Apartments Component */}
      <FeaturedApartments properties={properties} />
    </div>
  );
};

export default HomePage;
